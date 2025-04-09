import React from 'react'
import { FaStar, FaEyeSlash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const ReviewCard = ({ review, showSpoiler, toggleSpoiler }) => {
  const isSpoilerHidden = review.containsSpoiler && !showSpoiler[review.id]

  return (
    <motion.div
      layout
      key={review.id}
      className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold">{review.username}</div>
        <div className="flex items-center text-yellow-400 font-medium">
          <FaStar className="mr-1" /> {review.rating.toFixed(1)}
        </div>
      </div>
      <p className="text-gray-400 text-sm">{new Date(review.date).toLocaleDateString()}</p>

      <AnimatePresence initial={false}>
        {isSpoilerHidden ? (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-black border border-red-600 p-3 rounded-lg text-red-400 italic"
          >
            <FaEyeSlash className="inline mr-2" />
            Spoiler Contains.
            <button
              onClick={() => toggleSpoiler(review.id)}
              className="text-red-500 underline ml-1"
            >
              Click to reveal
            </button>
          </motion.div>
        ) : (
          <motion.p
            key="visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white"
          >
            {review.content}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ReviewCard