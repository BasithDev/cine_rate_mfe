import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

function SearchDropdown({ search, results, setSearch, setResults }) {
  const navigate = useNavigate()

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92"
  const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"

  const handle_Srch_Res_Navigation = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`)
    setSearch("")
    setResults([])
  }

  const handle_Content_Navigation = (id, mediaType) => {
    navigate(`/content?id=${id}&media_type=${mediaType}`)
    setSearch("")
    setResults([])
  }

  return (
    <AnimatePresence>
      {search && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-full bg-white text-black mt-2 rounded-lg shadow-lg overflow-hidden z-50"
        >
          <ul className="divide-y divide-gray-200">
            {results.length > 0 ? (
              results.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handle_Content_Navigation(item.id, item.media_type)}
                >
                  <img
                    src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : FALLBACK_IMAGE}
                    alt={item.title || item.name}
                    className="w-12 h-16 object-cover rounded mr-3"
                  />
                  <div>
                    <p className="font-semibold">
                      {item.title || item.name}
                      <span className="text-gray-500 text-sm ml-1">
                        ({item.release_date ? item.release_date.split("-")[0] : item.first_air_date ? item.first_air_date.split("-")[0] : "N/A"})
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.media_type === "movie" ? "🎬 Movie" : "📺 TV Show"}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-center text-gray-500">
                No results found for "<span className="font-semibold">{search}</span>"
              </li>
            )}
            {results.length > 4 && (
              <li
                onClick={() => handle_Srch_Res_Navigation(search)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-center"
              >
                <button className="text-blue-600 font-semibold">
                  See All Results
                </button>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchDropdown