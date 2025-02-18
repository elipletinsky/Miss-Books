
import { bookService } from "../services/book.service.js"
import { AddGoogleBook } from "../cmps/AddGoogleBook.jsx"
const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {
//car
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [missingFields, setMissingFields] = useState([])

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        console.log("load book")
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Cannot load Book:', err)
            })
            .finally(() => setIsLoading(false))
    }

    async function onSaveBook(ev) {
        ev.preventDefault()
        console.log('bookToEdit:', bookToEdit)
        
        if(!checkFormValidity()){
            return
        }
        if(!bookId){
            if(await isBookExists()){
                alert("This Book already exists in database")
                return
            }
        }
        console.log('trying to save book:', bookToEdit)
        bookService.save(bookToEdit)
            .then(bookToSave => {
                console.log(`Book (${bookToSave.id}) Saved!`)
                alert(`Book (${bookToSave.title}) Saved!`)
            })
            .catch(err => {
                console.log('Cannot save Book:', err)
            })
            .finally(() => navigate('/book'))
    }

    function checkFormValidity() {
        const { 
            title, subtitle, authors, publishedDate, description, pageCount,
             categories, thumbnail, language, listPrice } = bookToEdit
        const missing = []
        console.log('checkFormValidity:')
        setMissingFields(missing)
        if (!title) missing.push('Title')
        if (!subtitle) missing.push('Subtitle')
        if (!authors.length) missing.push('Authors')
        if (!publishedDate) missing.push('Published Date')
        if (!description) missing.push('Description')
        if (!pageCount) missing.push('Page Count')
        if (!categories.length) missing.push('Categories')
        if (!thumbnail) missing.push('Thumbnail')
        if (!language) missing.push('Language')
        if (!listPrice.amount) missing.push('Price Amount')
        if (!listPrice.currencyCode) missing.push('Currency Code')

        if (missing.length) {
            console.log('missing:', missing)
            setMissingFields(missing)
            return false
        }else{
            return true
        }
    }

    async function isBookExists() {
        try {
            const books = await bookService.query();
            const bookExists = books.some(book => 
                book.title === bookToEdit.title &&
                book.subtitle === bookToEdit.subtitle &&
                JSON.stringify(book.authors) === JSON.stringify(bookToEdit.authors)
            );
            
            if (bookExists) {
                console.log("bookToEdit",bookToEdit)
                console.log("Book already exists in database",bookExists);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error checking if book exists:', err);
            return false;
        }
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        if (field.includes('listPrice')) {
            const [_, key] = field.split('.')
            setBookToEdit((prevBook) => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, [key]: target.type === 'checkbox' ? target.checked : value }
            }))
        } else {
            setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
        }
    }

    // function handleChange({ target }) {
    //     let { value, name: field } = target
    //     switch (target.type) {
    //         case 'range':
    //         case 'number':
    //             value = +target.value
    //             break
    //         case 'checkbox':
    //             value = target.checked
    //             break
    //     }
    //     setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    // }

    function handleCategoryChange({ target }) {
        setNewCategory(target.value)
    }

    function handleAuthorChange({ target }) {
        setNewAuthor(target.value)
    }

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase())
    }

    // function addTarget(target) {
    //     if (newCategory.trim()) {
    //         const capitalizedCategory = capitalizeWords(newCategory.trim())
    //         setBookToEdit((prevBook) => ({
    //             ...prevBook,
    //             categories: [...prevBook.categories, capitalizedCategory]
    //         }))
    //         setNewCategory('')
    //     }
    // }

    function addCategory() {
        if (newCategory.trim()) {
            const capitalizedCategory = capitalizeWords(newCategory.trim())
            setBookToEdit((prevBook) => ({
                ...prevBook,
                categories: [...prevBook.categories, capitalizedCategory]
            }))
            setNewCategory('')
        }
    }

    function addAuthor() {
        if (newAuthor.trim()) {
            const capitalizedAuthor = capitalizeWords(newAuthor.trim())
            setBookToEdit((prevBook) => ({
                ...prevBook,
                authors: [...prevBook.authors, capitalizedAuthor]
            }))
            setNewAuthor('')
        }
    }

    function getBookFromGoogle(book) {
        //setBookToEdit(book)
        setBookToEdit((prevBook) => ({
            ...prevBook,
            ...book
        }));
        console.log('bookToEdit:', bookToEdit);
        
        // setNewAuthor(book.authors)
        // setNewCategory(book.categories)
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from(new Array(currentYear - 1900 + 1), (val, index) => 1900 + index).reverse()
    const languages = ["en", "he", "sp", "fr", "de", "it", "ru", "zh", "ja", "ko"]
    
    const { title, subtitle, authors, publishedDate, description, pageCount, categories,
         thumbnail, language, listPrice } = bookToEdit
    const titleName = title != '' ? title : "No Title";
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`book-edit ${loadingClass}`}>
            <AddGoogleBook 
            getBookFromGoogle={getBookFromGoogle}
            ></AddGoogleBook>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <textarea className="title-input" value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="subtitle">Subtitle</label>
                <textarea className="title-input" value={subtitle} onChange={handleChange} type="text" name="subtitle" id="subtitle" />

                <label htmlFor="authors">Authors</label>
                <div style={{display: 'block', flexDirection: 'column', width: '100%', alignSelf: 'center'}}>
                    <textarea className="title-input" value={newAuthor} onChange={handleAuthorChange} type="text" name="newAuthor" id="newAuthor" />
                    <button type="button" onClick={addAuthor}>Add Author</button>
                </div>
                <ul>
                    {bookToEdit.authors && bookToEdit.authors.map((author, idx) => (
                        <li key={idx}>{author}</li>
                    ))}
                </ul>

                <label htmlFor="publishedDate">Published Date</label>
                <select value={publishedDate} onChange={handleChange} name="publishedDate" id="publishedDate">
                <option value="">Select Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <label htmlFor="description">Description</label>
                <textarea className="description-input" value={description} onChange={handleChange} name="description" id="description"></textarea>

                <label htmlFor="pageCount">Page Count</label>
                <input value={pageCount} onChange={handleChange} type="number" name="pageCount" id="pageCount" />

                 <label htmlFor="categories">Categories</label>
                <div style={{display: 'block', flexDirection: 'column', width: '100%', alignSelf: 'center'}}>
                    <textarea className="title-input" value={newCategory} onChange={handleCategoryChange} type="text" name="newCategory" id="newCategory" />
                    <button type="button" onClick={addCategory}>Add Category</button>
                </div>
                <ul>
                    {bookToEdit.categories && bookToEdit.categories.map((category, idx) => (
                        <li key={idx}>{category}</li>
                    ))}
                </ul>

                <label htmlFor="thumbnail">Add Thumbnail Url</label>
                <textarea className="Url-input" value={thumbnail} onChange={handleChange} type="url" name="thumbnail" id="thumbnail" />

                <label htmlFor="language">Language</label>
                {/* language === "" ? 'choose language' : language */}
                <select value={language || ''} onChange={handleChange} name="language" id="language">
                    <option value="">Select Language</option>
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
                
                <label htmlFor="listPrice.amount">Price Amount</label>
                <input value={listPrice.amount} onChange={handleChange} type="number" name="listPrice.amount" id="listPrice.amount" />

                <label htmlFor="listPrice.currencyCode">Currency Code</label>
                <select value={listPrice.currencyCode} onChange={handleChange} name="listPrice.currencyCode" id="listPrice.currencyCode">
                    <option value="">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="ILS">ILS</option>
                    <option value="EUR">EUR</option>
                </select>

                <label htmlFor="listPrice.isOnSale">Is On Sale</label>
                <input checked={listPrice.isOnSale} onChange={handleChange} type="checkbox" name="listPrice.isOnSale" id="listPrice.isOnSale" />
                
                {missingFields.length > 0 && (
                    <div className="missing-fields">
                        <p>Please fill in the following fields:</p>
                        <ul>
                            {missingFields.map((field, idx) => (
                                <li key={idx}>{field}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn"><Link to="/book">Back</Link></button>
                </section>
            </form>
        </section>
    )

}