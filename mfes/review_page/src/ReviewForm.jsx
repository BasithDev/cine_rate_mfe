import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ReviewForm = ({ newReview, setNewReview, handleSubmit }) => {
  const handleStarClick = (value) => {
    setNewReview({ ...newReview, rating: value })
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (newReview.rating >= i) {
        stars.push(
          <FaStar key={i} className="text-yellow-400 cursor-pointer" onClick={() => handleStarClick(i)} />
        )
      } else if (newReview.rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 cursor-pointer" onClick={() => handleStarClick(i - 0.5)} />
        )
      } else {
        stars.push(
          <FaRegStar key={i} className="text-gray-500 cursor-pointer" onClick={() => handleStarClick(i)} />
        )
      }
    }
    return stars
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-xl mb-8 space-y-4">
      <textarea
        rows="4"
        placeholder="Write your review..."
        className="w-full p-3 rounded-md bg-black text-white border border-gray-700 focus:outline-none"
        value={newReview.content}
        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
      />

      <div className="flex flex-col md:flex-row justify-between gap-4 items-center w-full">
        <div className="flex items-center gap-1 text-yellow-400">
          {renderStars()}
          <span className="text-white ml-2 text-sm">({newReview.rating})</span>
        </div>

        <div className="flex items-center gap-2 text-sm w-full md:w-auto">
          <label className="text-sm text-white">Spoiler:</label>
          <button
            type="button"
            onClick={() =>
              setNewReview({ ...newReview, containsSpoiler: !newReview.containsSpoiler })
            }
            className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              newReview.containsSpoiler ? 'bg-red-600' : 'bg-gray-600'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              className={`w-4 h-4 bg-white rounded-full shadow-md transform ${
                newReview.containsSpoiler ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {/* 📩 Submit Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-semibold w-full md:w-auto"
        >
          Submit Review
        </button>
      </div>
    </form>
  )
}

export default ReviewForm