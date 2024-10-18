import { ENV } from "@/config/env";

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // live
  client_id:
    "AWJjPKbtKLnoEt4gZ1WeNfpRx0mbjqBGiM1sNjCybjdfEWFuGJiGvFDOCRxU7KDyFD6ZJOPVzd-2jk6X",
  client_secret:
    "EB3XXzQdsdzJN-aWwBuRYPczQNTV8RlHzqFjIBuR_L73oDDldXcFmZCjWVZQqG0gYaawkd7AIyVvVG-Z",
});

interface PayPalPayment {
  itemName: string;
  sku: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
}

export async function createPayPalPayment(
  paymentDetails: PayPalPayment
): Promise<{ url: string; paymentId: string }> {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: ENV.BASE_URL + "/api/paypal/success",
      cancel_url: ENV.BASE_URL + "/api/paypal/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: paymentDetails.itemName,
              sku: paymentDetails.sku,
              price: paymentDetails.price.toFixed(2),
              currency: paymentDetails.currency,
              quantity: paymentDetails.quantity,
            },
          ],
        },
        amount: {
          currency: paymentDetails.currency,
          total: (paymentDetails.price * paymentDetails.quantity).toFixed(2),
        },
        description: paymentDetails.description,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        const approvalUrl = payment.links.find(
          (link) => link.rel === "approval_url"
        );
        if (approvalUrl) {
          resolve({
            url: approvalUrl.href,
            paymentId: payment.id,
          });
        } else {
          reject(new Error("Approval URL not found"));
        }
      }
    });
  });
}

export async function executePayPalPayment(
  payerId: string,
  paymentId: string,
  amount: number,
  currency: string
): Promise<any> {
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: currency,
          total: amount.toFixed(2),
        },
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      (error, payment) => {
        if (error) {
          console.error(error.response);
          reject(error);
        } else {
          console.log(JSON.stringify(payment));
          resolve(payment);
        }
      }
    );
  });
}
