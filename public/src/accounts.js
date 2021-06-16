function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
    nameA.name.last > nameB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0;
  books.forEach((book) => {
    book.borrows.forEach((transaction) => {
      if (transaction.id === account.id) {
        counter++;
      }
    });
  });
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      return book.borrows.find((borrow) => {
        if (borrow.returned === false && borrow.id === account.id) {
          return true;
        }
      });
    })
    .map((book) => {
      const lookUp = authors.find((author) => book.authorId === author.id); //find author object
      return { ...book, author: lookUp }; //return obj containing book and author
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
