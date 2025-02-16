import { StarRating } from './StarRating.jsx';
const { useState, useEffect } = React;

export function AddReview({ onAddReview }) {

    const [fullName, setFullName] = useState("");
    const [rating, setRating] = useState(3);
    const [postedAt, setPostedAt] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic here
        console.log({ fullName, rating, postedAt });
        console.log('Date.now():', Date.now());
        onAddReview({ fullName, rating, postedAt });
    }

    return (
        <div className="add-review">
            <h3 >Add a Review</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <label htmlFor="rating">Rating</label>
                <StarRating rating={rating} setRating={setRating} />

                <label htmlFor="postedAt">Read At</label>
                <input
                    type="date"
                    id="postedAt"
                    name="postedAt"
                    value={postedAt}
                    onChange={(e) => setPostedAt(e.target.value)}
                />

                <button type="submit">Add Review</button>
            </form>
        </div>
    )
}