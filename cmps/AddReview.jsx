import { StarRating } from './StarRating.jsx';
// import {util}
const { useState, useEffect } = React;

export function AddReview({ onAddReview }) {

    const [reviewFullName, setReviewFullName] = useState("");
    const [reviewRating, setReviewRating] = useState(3);
    const [reviewPostedAt, setReviewPostedAt] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic here
        console.log({ fullName: reviewFullName, rating: reviewRating, postedAt: reviewPostedAt });
        console.log('Date.now():', Date.now());
        //  title: volumeInfo.title || "No title",
        const review = {id: "",fullName: reviewFullName, rating: reviewRating, postedAt: reviewPostedAt}
        onAddReview(review);
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
                    value={reviewFullName}
                    onChange={(e) => setReviewFullName(e.target.value)}
                />

                <label htmlFor="rating">Rating</label>
                <StarRating rating={reviewRating} setRating={setReviewRating} />

                <label htmlFor="postedAt">Read At</label>
                <input
                    type="date"
                    id="postedAt"
                    name="postedAt"
                    value={reviewPostedAt}
                    onChange={(e) => setReviewPostedAt(e.target.value)}
                />

                <button type="submit">Add Review</button>
            </form>
        </div>
    )
}