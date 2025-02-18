const { useEffect, useState } = React;
const { Link, useSearchParams } = ReactRouterDOM;

import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { getTruthyValues } from "../services/util.service.js";

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSrcParams(searchParams)
  ); //bookService.getDefaultFilter()

  useEffect(() => {
    setSearchParams(getTruthyValues(filterBy));
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log("Cannot get Books:", err);
      });
  }

  

  function onRemoveBook(bookId, title) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((Books) => Books.filter((book) => book.id !== bookId));
        console.log("onRemoveBook(title)", title);
      })
      .catch((err) => {
        console.log("Cannot remove Book:", err);
      });
  }

  function clearBooks() {
    setBooks(bookService.resetBooks());
  }

  function onSetFilter(filterBy) {
    // console.log('filterBy:', filterBy)
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  if (!books) return <div className="loader">Loading...</div>;
  return (
    <section className="book-index">
      <div className="index-actions">
        <button>
          <Link className="button" to="/book/edit">
            Add Book
          </Link>
        </button>
        <button
          onClick={() => {
            clearBooks();
          }}
        >
          Reset Books
        </button>
      </div>
      <div className="list-filter-container">
        <div className="Filter-container">
          <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        </div>
        <div className="list-container">
          <BookList books={books} onRemoveBook={onRemoveBook} />
        </div>
      </div>
    </section>
  );
}
