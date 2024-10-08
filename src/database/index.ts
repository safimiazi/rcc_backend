import { ENV } from "@config/env";
import { logger } from "@utility/logger";
import { Sequelize, HasMany, Transaction } from "sequelize";

import { log } from "console";
import { AdminI, AdminModel } from "./model/Admin";
import { ClientI, ClientModal } from "./model/Client";
import { AccountI, AccountModel } from "./model/Accounts";
import { FundTransferI, FundTransferModel } from "./model/FundTransfer";
import {
  AccountTransactionI,
  AccountTransactionModel,
} from "./model/AccountTransaction";
import { ServiceModel } from "./model/Service";
import { SellsI, SellsModel } from "./model/Sells";
import { InvoiceI, InvoiceModel } from "./model/invoice";
import { InvoiceMoneyReceiptModel } from "./model/InvoiceMoneyReceipt";
import { SellsTemplateModel } from "./model/SellsTemplate";
import { CostCategoryModel } from "./model/CostCategory";
import { ExpenseDetailsModel } from "./model/ExpenseDetails";
import { ExpenseRequestModel } from "./model/ExpenseRequest";
import { AccountBalanceChangeModel } from "./model/AccountsBalanceChange";
import { TransactionChangeModel } from "./model/Transaction_change";
import { IncomeDetailsModel } from "./model/IncomeDetails";
const LogQuery = false;

const sequelize = new Sequelize({
  dialect: "mysql",
  host: ENV.DATABASE_HOST,
  port: ENV.DATABASE_PORT,
  database: ENV.DATABASE_NAME,
  password: ENV.DATABASE_PASSWORD,
  username: ENV.DATABASE_USER,
  // timezone: "+06:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: ENV.NODE_ENV === "development",
  logging:
    ENV.NODE_ENV === "development" && LogQuery
      ? (query, time) => {
          log("\n ☢ " + time + "ms:" + " " + query);
        }
      : false,
  // logging: false,
  benchmark: true,
});

sequelize.authenticate();
const Admin = AdminModel(sequelize);
const Client = ClientModal(sequelize);
const Account = AccountModel(sequelize);
const FundTransfer = FundTransferModel(sequelize);
const AccountTransaction = AccountTransactionModel(sequelize);
const Service = ServiceModel(sequelize);
const Sells = SellsModel(sequelize);
const Invoice = InvoiceModel(sequelize);
const InvoiceMoneyReceipt = InvoiceMoneyReceiptModel(sequelize);
const SellsTemplate = SellsTemplateModel(sequelize);
const CostCategory = CostCategoryModel(sequelize);
const ExpenseDetails = ExpenseDetailsModel(sequelize);
const ExpenseRequest = ExpenseRequestModel(sequelize);
const AccountBalanceChange = AccountBalanceChangeModel(sequelize);
const TransactionChange = TransactionChangeModel(sequelize);
const IncomeDetails = IncomeDetailsModel(sequelize);

// FundTransfer > to account
Account.hasMany<AccountI, FundTransferI>(FundTransfer, {
  foreignKey: "to_account_id",
  onDelete: "SET NULL",
  as: "in_fund",
});
FundTransfer.belongsTo<FundTransferI, AccountI>(Account, {
  foreignKey: "to_account_id",
  onDelete: "SET NULL",
  as: "to_account",
});

//  FundTransfer > from account
Account.hasMany<AccountI, FundTransferI>(FundTransfer, {
  foreignKey: "from_account_id",
  onDelete: "SET NULL",
  as: "out_fund",
});
FundTransfer.belongsTo<FundTransferI, AccountI>(Account, {
  foreignKey: "from_account_id",
  onDelete: "SET NULL",
  as: "from_account",
});

// FundTransfer > Admin
Admin.hasMany<AdminI, FundTransferI>(FundTransfer, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "fund_transfer",
});
FundTransfer.belongsTo<FundTransferI, AdminI>(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "admin",
});

//  AccountTransactionI > ADMIN
Admin.hasMany<AdminI, AccountTransactionI>(AccountTransaction, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "account_transaction",
});
AccountTransaction.belongsTo<AccountTransactionI, AdminI>(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "admin",
});
// AccountTransactionI > account
Account.hasMany<AccountI, AccountTransactionI>(AccountTransaction, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "transactions",
});
AccountTransaction.belongsTo<AccountTransactionI, AccountI>(Account, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "account",
});

// sells

Client.hasMany<ClientI, SellsI>(Sells, {
  foreignKey: "client_id",
  onDelete: "SET NULL",
  as: "sells",
});

Sells.belongsTo<SellsI, ClientI>(Client, {
  foreignKey: "client_id",
  onDelete: "SET NULL",
  as: "client",
});

Invoice.hasMany<InvoiceI, SellsI>(Sells, {
  foreignKey: "invoice_id",
  onDelete: "SET NULL",
  as: "sells",
});

Sells.belongsTo<SellsI, InvoiceI>(Invoice, {
  foreignKey: "invoice_id",
  onDelete: "SET NULL",
  as: "invoice",
});

//invoice relation

Client.hasMany<ClientI, InvoiceI>(Invoice, {
  foreignKey: "client_id",
  onDelete: "SET NULL",
  as: "invoices",
});

Invoice.belongsTo<InvoiceI, ClientI>(Client, {
  foreignKey: "client_id",
  onDelete: "SET NULL",
  as: "client",
});

Admin.hasMany(Invoice, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "Invoices",
});

Invoice.belongsTo(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "admin",
});

// InvoiceMoneyReceipt relation

Admin.hasMany(InvoiceMoneyReceipt, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "Invoice_money_receipt",
});
InvoiceMoneyReceipt.belongsTo(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "admin",
});

Account.hasMany(InvoiceMoneyReceipt, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "invoice_money_receipt",
});

InvoiceMoneyReceipt.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "account",
});

AccountTransaction.hasMany(InvoiceMoneyReceipt, {
  foreignKey: "transaction_id",
  onDelete: "SET NULL",
  as: "invoice_money_receipt",
});

InvoiceMoneyReceipt.belongsTo(AccountTransaction, {
  foreignKey: "transaction_id",
  onDelete: "SET NULL",
  as: "account_transaction",
});

Invoice.hasMany(InvoiceMoneyReceipt, {
  foreignKey: "Invoice_id",
  onDelete: "SET NULL",
  as: "invoice_money_receipt",
});

InvoiceMoneyReceipt.belongsTo(Invoice, {
  foreignKey: "Invoice_id",
  onDelete: "SET NULL",
  as: "invoice",
});

// account < expense details
Account.hasMany(ExpenseDetails, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "expense_details",
});

ExpenseDetails.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "account",
});

// admin < ExpenseDetails

Admin.hasMany(ExpenseDetails, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "expense_details",
});

ExpenseDetails.belongsTo(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "admin",
});

Admin.hasMany(ExpenseDetails, {
  foreignKey: "approve_by_id",
  onDelete: "SET NULL",
  as: "expense_details_approve",
});

ExpenseDetails.belongsTo(Admin, {
  foreignKey: "approve_by_id",
  onDelete: "SET NULL",
  as: "approval_admin",
});

// transaction id - expense details

AccountTransaction.hasOne(ExpenseDetails, {
  foreignKey: "transaction_id",
  as: "expense_details",
  onDelete: "SET NULL",
});

ExpenseDetails.belongsTo(AccountTransaction, {
  foreignKey: "transaction_id",
  onDelete: "SET NULL",
  as: "transaction",
});

// account < expense request
Account.hasMany(ExpenseRequest, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "expense_request",
});

ExpenseRequest.belongsTo(Account, {
  foreignKey: "account_id",
  onDelete: "SET NULL",
  as: "account",
});

// admin < Expense request

Admin.hasMany(ExpenseRequest, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "expense_request",
});

ExpenseRequest.belongsTo(Admin, {
  foreignKey: "admin_id",
  onDelete: "SET NULL",
  as: "admin",
});

// expense request < costcategory
CostCategory.hasMany(ExpenseRequest, {
  foreignKey: "cost_category_id",
  onDelete: "SET NULL",
  as: "expense_request",
});

ExpenseRequest.belongsTo(CostCategory, {
  foreignKey: "cost_category_id",
  onDelete: "SET NULL",
  as: "cost_category",
});

Account.hasMany(AccountBalanceChange, {
  foreignKey: "account_id",
  as: "account_balance_change",
  onDelete: "SET NULL",
});

AccountBalanceChange.belongsTo(Account, {
  foreignKey: "account_id",
  as: "account",
  onDelete: "SET NULL",
});

Admin.hasMany(AccountBalanceChange, {
  foreignKey: "admin_id",
  as: "account_balance_change",
  onDelete: "SET NULL",
});

AccountBalanceChange.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
  onDelete: "SET NULL",
});

AccountTransaction.hasMany(TransactionChange, {
  foreignKey: "transaction_id",
  onDelete: "SET NULL",
  as: "transaction_change",
});

TransactionChange.belongsTo(AccountTransaction, {
  foreignKey: "transaction_id",
  onDelete: "SET NULL",
  as: "transaction",
});

Admin.hasMany(TransactionChange, {
  foreignKey: "admin_id",
  as: "transaction_change",
  onDelete: "SET NULL",
});

TransactionChange.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
  onDelete: "SET NULL",
});

// Account < IncomeDetails
Account.hasMany(IncomeDetails, {
  foreignKey: "account_id",
  as: "income_details",
  onDelete: "SET NULL",
});

IncomeDetails.belongsTo(Account, {
  foreignKey: "account_id",
  as: "account",
  onDelete: "SET NULL",
});

// Admin < IncomeDetails
Admin.hasMany(IncomeDetails, {
  foreignKey: "admin_id",
  as: "income_details",
  onDelete: "SET NULL",
});

IncomeDetails.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "admin",
  onDelete: "SET NULL",
});

// AccountTransaction < IncomeDetails
AccountTransaction.hasMany(IncomeDetails, {
  foreignKey: "account_id",
  as: "income_details",
  onDelete: "SET NULL",
});

IncomeDetails.belongsTo(AccountTransaction, {
  foreignKey: "account_id",
  as: "transaction",
  onDelete: "SET NULL",
});

export const db = {
  sequelize,
  Admin,
  Client,
  Account,
  FundTransfer,
  AccountTransaction,
  Service,
  Sells,
  Invoice,
  InvoiceMoneyReceipt,
  SellsTemplate,
  CostCategory,
  ExpenseDetails,
  ExpenseRequest,
  AccountBalanceChange,
  TransactionChange,
  IncomeDetails,
} as const;
