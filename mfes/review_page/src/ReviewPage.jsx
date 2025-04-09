import { useMemo, useState } from 'react'
import { MdOutlineReviews } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { FaSortAmountDown } from 'react-icons/fa'

import ReviewForm from './ReviewForm'
import ReviewCard from './ReviewCard'

const dummyReviews = [
  {
    id: 1,
    username: 'MovieBuff101',
    content: 'This movie was absolutely fantastic! The visuals were stunning.',
    rating: 4.5,
    date: '2025-04-01',
    containsSpoiler: false,
  },
  {
    id: 2,
    username: 'SpoilerGuy',
    content: 'The ending was insane when [REDACTED] died!',
    rating: 2,
    date: '2025-04-02',
    containsSpoiler: true,
  },
  {
    id: 3,
    username: 'CinephileQueen',
    content: 'The character development was incredible, especially for the protagonist.',
    rating: 5,
    date: '2025-04-03',
    containsSpoiler: false,
  },
  {
    id: 4,
    username: 'HarshCritic',
    content: 'I found the plot to be predictable and the dialogue forced.',
    rating: 2.5,
    date: '2025-04-04',
    containsSpoiler: false,
  },
  {
    id: 5,
    username: 'FilmStudent22',
    content: 'The cinematography deserves an award! Every shot was perfectly composed.',
    rating: 4,
    date: '2025-04-05',
    containsSpoiler: false,
  },
  {
    id: 6,
    username: 'NostalgiaNerd',
    content: 'As a fan of the original, this remake did justice to the source material.',
    rating: 3.5,
    date: '2025-04-06',
    containsSpoiler: false,
  },
  {
    id: 7,
    username:'fjdsklf',
    content: 'This movie was absolutely fantastic! The visuals were stunning.',
    rating: 4.5,
    date: '2025-04-01',
    containsSpoiler: false,
  },
  {
    id: 8,
    username: 'MovieBuff101',
    content: 'This movie was absolutely fantastic! The visuals were stunning.',
    rating: 4.5,
    date: '2025-04-01',
    containsSpoiler: false,
  },
  {
    id: 9,
    username: 'SpoilerGuy',
    content: 'The ending was insane when [REDACTED] died!',
    rating: 2,
    date: '2025-04-02',
    containsSpoiler: true,
  },
  {
    id: 10,
    username: 'CinephileQueen',
    content: 'The character development was incredible, especially for the protagonist.',
    rating: 5,
    date: '2025-04-03',
    containsSpoiler: false,
  },
  {
    id: 11,
    username: 'HarshCritic',
    content: 'I found the plot to be predictable and the dialogue forced.',
    rating: 2.5,
    date: '2025-04-04',
    containsSpoiler: false,
  },
  {
    id: 12,
    username: 'FilmStudent22',
    content: 'The cinematography deserves an award! Every shot was perfectly composed.',
    rating: 4,
    date: '2025-04-05',
    containsSpoiler: false,
  },
  {
    id: 13,
    username: 'NostalgiaNerd',
    content: 'As a fan of the original, this remake did justice to the source material.',
    rating: 3.5,
    date: '2025-04-06',
    containsSpoiler: false,
  },
  {
    id: 14,
    username:'fjdsklf',
    content: 'This movie was absolutely fantastic! The visuals were stunning.',
    rating: 4.5,
    date: '2025-04-01',
    containsSpoiler: false,
  },
]

const ReviewPage = () => {
  const [reviews, setReviews] = useState(dummyReviews)
  const [showSpoiler, setShowSpoiler] = useState({})
  const [sortOption, setSortOption] = useState('newest')
  const [newReview, setNewReview] = useState({ content: '', rating: 0, containsSpoiler: false })
  const [searchQuery, setSearchQuery] = useState('')
  const REVIEWS_PER_PAGE = 5
  const [currentPage, setCurrentPage] = useState(1)

  const toggleSpoiler = (id) => {
    setShowSpoiler((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSort = (option) => {
    setSortOption(option)
    setCurrentPage(1) // Reset to first page when sorting changes
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newReview.content || !newReview.rating) return
  
    const newEntry = {
      ...newReview,
      id: crypto.randomUUID?.() || Date.now(),
      username: 'You',
      date: new Date().toISOString(),
    }
  
    setReviews((prev) => [newEntry, ...prev])
    setNewReview({ content: '', rating: 0, containsSpoiler: false })
    setSortOption('newest') // Force sort to newest so it appears on top
    setCurrentPage(1) // Reset to first page after adding a review
  }
  
  // Sorted reviews
  const sortedReviews = useMemo(() => {
    const sorted = [...reviews]
    if (sortOption === 'newest') sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sortOption === 'oldest') sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
    if (sortOption === 'positive') sorted.sort((a, b) => b.rating - a.rating)
    if (sortOption === 'negative') sorted.sort((a, b) => a.rating - b.rating)
    return sorted
  }, [reviews, sortOption])

  // Filtered + Sorted reviews
  const filteredReviews = useMemo(() => {
    return sortedReviews.filter(
      (review) =>
        review.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [sortedReviews, searchQuery])

  // Paginated reviews
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE
    const end = start + REVIEWS_PER_PAGE
    return filteredReviews.slice(start, end)
  }, [filteredReviews, currentPage])

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE))

  // Reset to page 1 if current page exceeds total pages (happens when filtering reduces results)
  if (currentPage > totalPages) {
    setCurrentPage(1)
  }

  // Generate page number buttons
  const renderPageNumbers = () => {
    // For simplicity, show maximum 5 page numbers
    const pageNumbers = []
    const maxButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxButtons - 1)
    
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${currentPage === i ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300'}`}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  return (
    <div className="bg-black text-white min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <MdOutlineReviews className="text-red-500" /> User Reviews
      </h1>

      <ReviewForm
        newReview={newReview}
        setNewReview={setNewReview}
        handleSubmit={handleSubmit}
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">
          All Reviews ({filteredReviews.length})
        </h2>

        <div className="flex items-center gap-4 md:flex-row flex-col md:gap-2 gap-4">
          {/* Search */}
          <div className="relative w-full md:w-auto">
            <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user or content..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page when search changes
              }}
              className="pl-8 pr-3 py-1 rounded border border-gray-700 bg-black text-white w-full"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <FaSortAmountDown className="text-gray-400" />
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-black border border-gray-700 text-white rounded px-2 py-1 w-full"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {paginatedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            showSpoiler={showSpoiler}
            toggleSpoiler={toggleSpoiler}
          />
        ))}
        {filteredReviews.length === 0 && (
          <p className="text-gray-500">No reviews found.</p>
        )}
      </div>

      {/* Improved Pagination Controls */}
      {filteredReviews.length > REVIEWS_PER_PAGE && (
        <div className="flex justify-center mt-8 gap-2 items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            aria-label="First page"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            &laquo;
          </button>
          
          <div className="flex gap-1">
            {renderPageNumbers()}
          </div>
          
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            &raquo;
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            aria-label="Last page"
          >
            Last
          </button>
        </div>
      )}
      
      {/* Page status indicator */}
      {filteredReviews.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-400">
          Showing {((currentPage - 1) * REVIEWS_PER_PAGE) + 1} - {Math.min(currentPage * REVIEWS_PER_PAGE, filteredReviews.length)} of {filteredReviews.length} reviews
        </div>
      )}
    </div>
  )
}

export default ReviewPage