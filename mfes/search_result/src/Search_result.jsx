import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { FaStar } from "react-icons/fa"
import { TbClockPlus } from "react-icons/tb"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const SEARCH_URL = "https://api.themoviedb.org/3/search/multi"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w154"
const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"

function Search_result() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query")
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (query) fetchResults(query, page)
  }, [query, page])

  const fetchResults = async (query, page) => {
    try {
      setLoading(true)
      const { data } = await axios.get(SEARCH_URL, {
        params: {
          api_key: API_KEY,
          query,
          page,
        },
      })

      const filtered = data.results.filter(item => item.media_type === "movie" || item.media_type === "tv")
      const resultsWithCast = await Promise.all(filtered.map(async (item) => {
        try {
          const { data: credits } = await axios.get(
            `https://api.themoviedb.org/3/${item.media_type}/${item.id}/credits`,
            { params: { api_key: API_KEY } }
          )
          const topCast = credits.cast?.slice(0, 3).map(actor => actor.name).join(", ")
          return { ...item, topCast }
        } catch {
          return { ...item, topCast: "N/A" }
        }
      }))

      setResults(resultsWithCast)
      setTotalPages(data.total_pages)
      setLoading(false)
    } catch (err) {
      console.error("Search error:", err)
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage)
    }
  }

  const renderPagination = () => {
    const visiblePages = []
    const range = 2
    const start = Math.max(1, page - range)
    const end = Math.min(totalPages, page + range)

    for (let i = start; i <= end; i++) {
      visiblePages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            `px-3 py-1 cursor-pointer rounded transition font-medium 
             ${i === page
              ? "bg-white text-black shadow-md"
              : "bg-white/10 text-white hover:bg-white/20"}`
          }
        >
          {i}
        </button>
      )
    }

    return (
      <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded disabled:opacity-30"
        >
          Prev
        </button>

        {visiblePages}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded disabled:opacity-30"
        >
          Next
        </button>
      </div>
    )
  }

  const renderSkeleton = () => (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex gap-4 bg-white/5 animate-pulse rounded-xl p-4">
          <div className="w-24 h-36 bg-white/10 rounded-md" />
          <div className="flex-1 space-y-3 py-2">
            <div className="w-3/4 h-5 bg-white/10 rounded" />
            <div className="w-full h-4 bg-white/10 rounded" />
            <div className="w-1/2 h-4 bg-white/10 rounded" />
            <div className="w-1/4 h-4 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-12 py-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Search Results for "<span className="text-white/80">{query}</span>"
        </h1>
        {totalPages > 1 && renderPagination()}
      </div>

      {loading ? (
        renderSkeleton()
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-6">
          {results.map(item => (
            <motion.div
              onClick={() => navigate(`/content?id=${item.id}&media_type=${item.media_type}`)}
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col sm:flex-row items-start gap-4 bg-white/10 rounded-xl p-4 shadow-md hover:bg-white/20 transition duration-300 cursor-pointer"
            >
              {/* Watchlist Button */}
              <button
                className="absolute top-3 right-3 sm:top-3 sm:right-3 p-1 rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition"
              >
                <TbClockPlus className="h-5 w-5" />
              </button>

              <img
                src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : FALLBACK_IMAGE}
                alt={item.title || item.name}
                className="w-48 lg:w-24 h-72 lg:h-36 object-cover rounded-md self-center sm:self-auto"
              />
              <div className="flex-1 flex flex-col justify-between space-y-1">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    {item.title || item.name} {`(${item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0] || "N/A"})`}
                  </h2>
                  <p className="text-sm text-gray-300 line-clamp-3">{item.overview || "No plot available."}</p>
                  <p className="text-sm text-gray-400 mt-1">Cast: {item.topCast || "N/A"}</p>
                </div>
                {item.vote_average && item.vote_count ? (
                  <div className="flex items-center gap-2 text-yellow-400 font-semibold mt-auto">
                    <FaStar />
                    <span>{item.vote_average?.toFixed(1) || "N/A"}</span>
                    <span className="text-gray-300 font-thin">
                      {item.vote_count !== 0
                        ? item.vote_count >= 1000
                          ? `(${Math.round(item.vote_count / 1000)}k+)`
                          : `(${item.vote_count})`
                        : "N/A"}
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-300 text-sm mt-auto">No rating available</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 p-2 bg-red-500/60 rounded-full hover:bg-red-500/80 transition cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Search_result