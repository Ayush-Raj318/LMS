import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { User } from "lucide-react";
const ReviewCard = ({ comment, rating, name, photoUrl, description, courseTitle }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full">
      {/* ⭐ Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <span key={idx}>
              {idx < Number(rating || 0) ? <FaStar/> : <FaRegStar/>}
            </span>
          ))}
      </div>

      {/* 💬 Review Text */}
      <p className="text-gray-700 text-sm mb-5">Review for: <span className="font-semibold">{courseTitle}</span></p>
      <p className="text-gray-700 text-sm mb-5">Review: <span className="font-semibold">{comment}</span></p>

      {/* 👤 Reviewer Info */}
      <div className="flex items-center gap-3">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <User size={20} />
          </div>
        )}
        <div>
          <h2 className="font-semibold text-gray-800 text-sm">{name}</h2>
          <p className="text-xs text-gray-500">{description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
