import { Star } from 'lucide-react';
import './RatingStars.css';

export default function RatingStars({ rating = 4.5, reviewsCount = 0 }) {
  const rounded = Math.round(Number(rating) || 0);

  return (
    <div className="rating-stars" aria-label={`Valoración ${rating} de 5`}>
      <div className="rating-stars__icons">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Star
            key={starIndex}
            size={14}
            className={
              starIndex <= rounded ? 'rating-star rating-star--filled' : 'rating-star'
            }
          />
        ))}
      </div>
      <span className="rating-stars__score">{Number(rating).toFixed(1)}</span>
      {reviewsCount > 0 && (
        <span className="rating-stars__count">({reviewsCount})</span>
      )}
    </div>
  );
}

