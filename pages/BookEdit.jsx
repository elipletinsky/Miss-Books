
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {
//car
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Cannot load Book:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(bookToSave => {
                console.log(`Book (${bookToSave.id}) Saved!`)
            })
            .catch(err => {
                console.log('Cannot save Book:', err)
            })
            .finally(() => navigate('/Book'))
    }


    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }


    const { vendor, speed } = bookToEdit
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`car-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="vendor">Vendor</label>
                <input value={vendor} onChange={handleChange} type="text" name="vendor" id="vendor" />

                <label htmlFor="speed">Speed</label>
                <input value={speed} onChange={handleChange} type="number" name="speed" id="speed" />
                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn" ><Link to="/book">Back</Link></button>
                </section>
            </form>
        </section>
    )

}