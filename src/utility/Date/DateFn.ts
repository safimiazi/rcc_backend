export const DateFn = {
  // Function to create the date range
  createDateRange(date: Date): { startDate: Date; endDate: Date } {
    // Ensure the input is a Date object
    if (!(date instanceof Date)) {
      throw new Error("Invalid date object");
    }

    // Create start date at 12:00 AM
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    // Create end date at 11:59 PM
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
  },
  CreateMonthRange(inputDate: Date): { startDate: Date; endDate: Date } {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    // Start date is the first day of the month
    const startDate = this.createDateRange(new Date(year, month, 1)).startDate;
    // End date is the last day of the month
    const endDate = this.createDateRange(new Date(year, month + 1, 0)).endDate;
    return { startDate, endDate };
  },
  getAllMonthsBetweenDates(startDate: Date, endDate: Date): Date[] {
    const months: Date[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    while (start <= end) {
      // Create a new Date object for the current month and push it to the array
      months.push(new Date(start));
      start.setMonth(start.getMonth() + 1);
    }

    return months;
  },
};
