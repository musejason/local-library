function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let returned = [];
  books.forEach((book) => {
    if (book.borrows.some((borrow) => borrow.returned === false)) {
      borrowed.push(book);
    } else returned.push(book);
  });
  let results = [borrowed, returned];
  return results;
}

function getBorrowersForBook(book, accounts) {
  let transactions = [];
  book.borrows.forEach((transaction) => {
    const account = accounts.find((account) => account.id === transaction.id);
    transactions.push({ ...transaction, ...account });
  });
  transactions.length = 10;
  return transactions;
}
// this is a comment

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
