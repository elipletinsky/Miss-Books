import { bookService } from "../services/book.service.js"

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
            .then(setBook)
            .catch(err => {
                console.log('Cannot load Book:', err)
            })
    }

    function onBack() {
        navigate('/Book')
        // navigate(-1)
    }


    // console.log('Details render')

    if (!book) return <div className="loader">Loading...</div>
    return (
        <section className="book-details">
            <section>
                <h1>{book.title}</h1>
                <h3>{book.subtitle}</h3>
                <p> {book.description}</p>  
                <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section> 
            </section>
            <section>
                <img src={`../assets/img/${book.title}.jpg`} alt="car-image" />
            </section>
            
            
        </section>
    )
}