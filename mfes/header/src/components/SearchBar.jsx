import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import axios from "axios"
import SearchDropdown from "./SearchDropdown"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_URL = "https://api.themoviedb.org/3/search/multi"

function SearchBar() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])

  const fetchResults = async (query) => {
    if (!query) return setResults([])

    try {
      const { data } = await axios.get(API_URL, {
        params: { api_key: API_KEY, query },
      })

      const filteredResults = data.results
        .filter(item => item.media_type === "movie" || item.media_type === "tv")
        .slice(0, 5)

      setResults(filteredResults)
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearch(query)
    fetchResults(query)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-lg px-4 py-2 shadow-md relative">
        <FiSearch className="text-gray-300" />
        <input
          type="text"
          placeholder="Search movies, TV shows..."
          className="w-full bg-transparent text-white placeholder-gray-300 px-3 focus:outline-none"
          value={search}
          onChange={handleSearchChange}
        />
        {search && (
          <button
            onClick={() => {
              setSearch("")
              setResults([])
            }}
            className="absolute right-3 text-gray-300 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <SearchDropdown
        search={search}
        results={results}
        setSearch={setSearch}
        setResults={setResults}
      />
    </div>
  )
}

export default SearchBar