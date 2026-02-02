import { Star } from 'lucide-react';

export const StarRating = ({ stars, size = 16, className = '' }) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < stars ? 'text-amber-400 fill-amber-400' : 'text-sand-300'}
        />
      ))}
    </div>
  );
};

export const ScoreRating = ({ score, reviewCount, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const getScoreColor = (score) => {
    if (score >= 9) return 'bg-green-500';
    if (score >= 8) return 'bg-green-400';
    if (score >= 7) return 'bg-lime-500';
    if (score >= 6) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return 'Exceptional';
    if (score >= 8) return 'Excellent';
    if (score >= 7) return 'Very Good';
    if (score >= 6) return 'Good';
    return 'Fair';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} ${getScoreColor(score)}
          rounded-lg flex items-center justify-center text-white font-bold
        `}
      >
        {score.toFixed(1)}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-ocean-800">
          {getScoreLabel(score)}
        </span>
        {reviewCount !== undefined && (
          <span className="text-xs text-ocean-500">
            {reviewCount.toLocaleString()} reviews
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;
