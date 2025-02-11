
export function BookPreview({ book }) {
//https://coding-academy.org/books-photos/20.jpg
//../assets/img/The Face In The Abyss.jpg
//https://elipletinsky.github.io/assets/img/react.png
    return (
        <article className="book-preview">
            {/* {<img src={`../assets/img/${book.title}.jpg`} /> || <img src={`../assets/img/react.png`} />} */}
            
            <img src={book.thumbnail} onError={(e) => 
                { e.target.onerror = null; console.log("failed to load",book.thumbnail,e); e.target.src = '../assets/img/react.png'; }} alt="book-thumbnail" />
            <h2>{book.title}</h2>
            <h4>by {book.authors}</h4>
            <h5>Genres: {book.categories.join(', ')}</h5>
            <h6>price: {book.listPrice.amount}</h6>
            
        </article>
    )
}