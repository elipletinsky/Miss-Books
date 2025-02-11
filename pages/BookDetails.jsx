import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setBook(null)
        bookService.get(params.bookId)
            .then((book)=>{setBook(book); console.log('book:', encodeURIComponent(book.thumbnail))})
            .catch(err => {
                console.log('Cannot load Book:', err)
            })
    }

    function onBack() {
        navigate('/book')
    }


    function onPageCount(Count) {
        if (Count > 500) return 'Serious Reading'
        if (Count > 200) return 'Decent Reading'
        if (Count < 100) return 'Light Reading'
    }

    function onPublishDate(date) {
        const currYear = new Date().getFullYear()
        const diff = currYear - date
        if (diff > 10) return 'Vintage'
        if (diff <= 1) return 'New!'
    }
    function onListPrice(price) {
        if (price > 150) return 'red'
        if (price < 20) return 'green'
    }
    if (!book) return <div className="loader">Loading...</div>
    return (
        <section className="book-details">
            <section>
                <h1>{book.title}</h1>
                <h3>{book.subtitle}</h3>
                <LongTxt txt={book.description} length={100} />
                <p style = {{color: onListPrice(book.listPrice.amount)}}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p >
                <p>Pages: {book.pageCount} {onPageCount(book.pageCount)}</p>  
                <p>Published Date: {book.publishedDate} {onPublishDate(book.publishedDate)}</p>
                <p>Language: {book.language}</p>
                <p>Categories: {book.categories.join(', ')}</p>
                <p>Authors: {book.authors.join(', ')}</p>
                <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBook}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBook}`}>Next Book</Link></button>
            </section> 
            </section>
            <section>
                {/* <img src={`../assets/img/${book.title}.jpg`} alt="car-image" /> */}
                <img src={book.thumbnail} onError={(e) => 
                    { e.target.onerror = null;
                        //e.target.src = '../assets/img/react.png';
                       }} alt="book-thumbnail" />
                
                {book.listPrice.isOnSale && <h2>On Sale</h2>}
            </section>
            
            
        </section>
    )
}