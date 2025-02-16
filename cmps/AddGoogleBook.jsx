const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function AddGoogleBook({ getBookFromGoogle}) {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [BookName, setBookName] = useState('')
    const [Books, setBooks] = useState([])
    //const Books = [{title : "name1"}, {title : "name2"}, {title : "name3"}]
    
    useEffect(() => {
        console.log('useEffect BookName:', BookName)
    }, [BookName,Books])

    function handleChange({ target }) {
        //searchForGoogleBook(target.value)
        setBookName(target.value)
    }

    function searchForGoogleBook(name) {
        console.log('searchForGoogleBook titleName:', name)
        // console.log('bookService.searchForGoogleBook bookToEdit:', bookToEdit)
        //console.log('searchForGoogleBook bookToEdit:', bookToEdit)
        bookService.searchForGoogleBook(name)
            .then((googleBooks) => {
                console.log('searchForGoogleBook googleBook:', googleBooks)
                setBooks(googleBooks)
            })
            .catch(err => {
                console.log('Cannot get GoogleBook:', err)
            })
        
    }

    function onAddBook(volumeInfo) {
        console.log('onAddBook book:', volumeInfo)
        console.log('formatBook:', formatBook(volumeInfo))
        getBookFromGoogle(formatBook(volumeInfo))
        // setBooks(Books => [...Books, book])
    }

    function formatBook(volumeInfo) {
        //const { title, subtitle, authors, publishedDate, description, pageCount, categories,
        //  thumbnail, language, listPrice }
        return {
            //id: book.id,
            title: volumeInfo.title || "No title",
            subtitle: volumeInfo.subtitle || "",
            authors: volumeInfo.authors || [],
            publishedDate: volumeInfo.publishedDate ? parseInt(volumeInfo.publishedDate.substring(0, 4)) : "Unknown",
            description: volumeInfo.description || "No description available",
            pageCount: volumeInfo.pageCount || 0,
            categories: volumeInfo.categories || [],
            thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail || "" : "",
            language: volumeInfo.language || "Unknown",
        };
    }

    const ulAttributes = {
        title: 'Some Pop Up',
        className: 'book-list'
    }
    
  return (
    <section className="add-google-book">
      <label htmlFor="googleBook">search for GoogleBook</label>
        <input value={BookName} onChange={handleChange} type="text" name="googleBook" id="googleBook" />
        <button onClick={() => searchForGoogleBook(BookName)}>Search</button>
        {Books != '' && <ul {...ulAttributes}>
                    {Books.map(book =>
                        <li key={book.id}>
                            <span>{book.volumeInfo.title}</span>
                            <button onClick={()=> onAddBook(book.volumeInfo)}>Add</button>
                            
                            {/* <BookPreview book={book} />
                            <section>
                                <button onClick={() => onRemoveBook(book.id)}> Remove</button>
                                <button><Link to={`/book/${book.id}`}>Details</Link></button>
                                <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                            </section> */}
                        </li>
                    )}
                </ul>}
    </section>
  );
}
