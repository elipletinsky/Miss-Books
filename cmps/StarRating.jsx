
export function StarRating({ size = '40px',rating, setRating }) {
    const stars = [1, 2, 3, 4, 5];
    //console.log('rating:', rating);
    return (
        <div className="star-rating" style={{ fontSize: size }}>
            {stars.map((star) => (
                <span
                    key={star}
                    className={star <= rating ? 'star filled' : 'star'}
                    onClick={() => setRating(star)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
}