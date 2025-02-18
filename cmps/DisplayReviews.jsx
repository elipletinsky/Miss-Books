import { StarRating } from "./StarRating.jsx";
const { useState, useEffect } = React;
export function DisplayReviews({ reviews ="", onRemoveReview }) {

    const [sortDate, setSortDate] = useState('newest')
    const [displayRating, setDisplayRating] = useState();

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortDate === 'newest') {
          return new Date(b.postedAt) - new Date(a.postedAt);
        } else if (sortDate === 'oldest') {
          return new Date(a.postedAt) - new Date(b.postedAt);
        }
    
        return 0;
      });

      const filteredReviews = displayRating
    ? sortedReviews.filter((review) => review.rating === parseInt(displayRating))
    : sortedReviews;

      return (
        <section className="display-reviews">
          <h3>Reviews</h3>
          <div className="sort-options">
            <label htmlFor="sortDate">Sort by Date:</label>
            <select
              id="sortDate"
              value={sortDate}
              onChange={(e) => setSortDate(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
    
            <button onClick={()=>setDisplayRating('')} value={'Display All'}>Display All</button>
            {/* <input className="forms" type="button" onClick={()=>setDisplayRating('')} value={'Display All'}/> */}
            <div className="filter-by-rating">
                <p>Display Only Rating</p>
                <StarRating size ={60}rating={displayRating} setRating={setDisplayRating} />
            </div>
          </div>
          <ul>
            {filteredReviews && filteredReviews.map((review) => (
              <li key={review.id}>
                <section className="review-item">
                  <p>
                    <strong>Name:</strong> {review.fullName}
                  </p>
                  <p>
                    <strong>Rating:</strong>{" "}
                  </p>
                  <StarRating rating={review.rating} />
                  <p>
                    <strong>Posted At:</strong> {review.postedAt}
                  </p>
                  <button onClick={()=> onRemoveReview(review.id)}>Delete Review</button>
                </section>
              </li>
            ))}
          </ul>
        </section>
      );
//   return (
//     <section className="reviews">
//       <h3>Reviews</h3>
//       <ul>
//         {reviews &&
//           reviews.map((review) => (
//             <li key={review.fullName}>
//               <section className="review-item">
//                 <p>
//                   <strong>Name:</strong> {review.fullName}
//                 </p>
//                 <p>
//                   <strong>Rating:</strong>{" "}
//                 </p>
//                 <StarRating rating={review.rating} />
//                 <p>
//                   <strong>Posted At:</strong> {review.postedAt}
//                 </p>
//               </section>
//             </li>
//           ))}
//       </ul>
//     </section>
//   );
}
