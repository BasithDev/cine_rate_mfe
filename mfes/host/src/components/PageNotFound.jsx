import React from 'react'
import { Link } from 'react-router-dom'
import { FaSadTear } from 'react-icons/fa'

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <FaSadTear className="text-6xl text-gray-500 mb-4" />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-xl mb-6 text-gray-400">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-md mb-8 text-gray-500 italic">Maybe it's lost in the multiverse of movies and shows 🎬</p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default PageNotFound
