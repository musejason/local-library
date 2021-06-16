function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = books.reduce((acc, book) => {
    if (!book.borrows[0].returned) acc++;
    return acc;
  }, 0);
  return count;
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => {
    let genreIndex = genres.findIndex((genre) => {
      return genre.name === book.genre;
    });
    if (genreIndex !== -1) {
      genres[genreIndex].count++;
    } else {
      genres.push({ name: book.genre, count: 1 });
    }
  });
  genres.sort((a, b) => b.count - a.count);
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  });
  popularBooks.sort((a, b) => b.count - a.count);
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let counts = books.reduce((acc, book) => {
    if (!acc[book.authorId]) {
      acc[book.authorId] = book.borrows.length;
    } else {
      acc[book.authorId] += book.borrows.length;
    }
    return acc;
  }, {});
  return Object.keys(counts)
    .sort((id1, id2) => counts[id2] - counts[id1])
    .slice(0, 5)
    .map((key) => {
      let author = authors.find((author) => {
        return author.id === parseInt(key);
      });
      let name = `${author.name.first} ${author.name.last}`;
      return { name, count: counts[key] };
    });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
