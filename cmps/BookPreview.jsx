
export function BookPreview({ book }) {
//assets\img\The Face In The Abyss.jpg
    return (
        <article className="book-preview">
            <img src={`../assets/img/${book.title}.jpg`} alt="car-image" />
            <h2>{book.title}</h2>
            <h4>by {book.authors}</h4>
            <h5>Genres: {book.categories.join(', ')}</h5>
            <h6>price: {book.listPrice.amount}</h6>
            
        </article>
    )
}