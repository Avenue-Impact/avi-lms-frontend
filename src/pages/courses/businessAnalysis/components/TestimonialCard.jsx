import { Star } from 'lucide-react';

export const TestimonialCard = ({
  name,
  role,
  content,
  rating,
  image,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-blue-600 text-sm">{role}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      <blockquote className="text-gray-700 italic">"{content}"</blockquote>
    </div>
  );
};

export default TestimonialCard;
