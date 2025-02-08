
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Cannot get Books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(Books => Books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Cannot remove Book:', err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="car-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/book/edit">Add Book</Link>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}