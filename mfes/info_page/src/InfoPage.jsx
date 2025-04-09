import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FaStar } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const PROFILE_IMAGE = "https://image.tmdb.org/t/p/w185"
const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"

function InfoPage({ id: propId, mediaType }) {
  const { id: routeId } = useParams()
  const id = propId || routeId

  const [data, setData] = useState(null)
  const [cast, setCast] = useState([])
  const [trailerKey, setTrailerKey] = useState(null)

  useEffect(() => {
    if (!mediaType || !id) return

    const fetchDetails = async () => {
      try {
        const [infoRes, creditsRes, videoRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}`)
        ])
        
        console.log(infoRes.data)
        setData(infoRes.data)
        setCast(creditsRes.data.cast.slice(0, 10))

        const trailer = videoRes.data.results.find((vid) => vid.type === "Trailer" || vid.type === "Teaser")
        if (trailer) setTrailerKey(trailer.key)
      } catch (err) {
        console.error("Failed to fetch media info:", err)
      }
    }

    fetchDetails()
  }, [mediaType, id])

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 h-max-screen bg-black text-white text-left">
      {/* Title & Poster */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : FALLBACK_IMAGE}
          alt={data.title || data.name}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex flex-col justify-start">
          <h1 className="text-4xl font-bold mb-2">
            {data.title || data.name}
            <span className="text-gray-400 text-xl ml-2">
              ({(data.release_date || data.first_air_date)?.split("-")[0]})
            </span>
          </h1>
          <p className="text-gray-400 italic mb-3">{data.tagline}</p>
          <p className="mb-4 leading-relaxed">{data.overview}</p>

          <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
            <li><span className="text-white font-medium">Genres:</span> {data.genres.map((g) => g.name).join(", ")}</li>
            {data.number_of_seasons && <li><span className="text-white font-medium">Seasons:</span> {data.number_of_seasons}</li>}
            {data.number_of_episodes && <li><span className="text-white font-medium">Total Episodes:</span> {data.number_of_episodes}</li>}
            {data.runtime && (
              <li>
                <span className="text-white font-medium">Runtime: </span>
                {data.runtime > 60
                  ? `${Math.floor(data.runtime / 60)}h ${Math.floor(data.runtime % 60)}min`
                  : `${data.runtime}min`}
              </li>
            )}
            {data.episode_run_time && (
              <li>
                <span className="text-white font-medium">Episode Runtime: </span>
                {data.episode_run_time > 60
                  ? `${Math.floor(data.episode_run_time / 60)}h ${Math.floor(data.episode_run_time % 60)}min`
                  : `${data.episode_run_time}min`}
              </li>
            )}
          </ul>

          <div className="flex items-center mt-3">
            <span className="text-white font-medium mr-1">Rating: </span>
            <span className="flex items-center mr-1"><FaStar className="text-yellow-400 mr-1" /> {data.vote_average.toFixed(1)}</span>
            <span className="text-gray-300 font-thin">
              ({data.vote_count >= 1000 ? `${Math.round(data.vote_count / 1000)}k+` : data.vote_count})
            </span>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailerKey && (
        <div className="my-10">
          <h2 className="text-2xl font-semibold mb-4">Trailer / Teaser</h2>
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Cast */}
      {cast.length > 0 && (
        <div className="my-10">
          <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {cast.map((actor) => (
              <div key={actor.id} className="flex flex-col items-start">
                <img
                  src={actor.profile_path ? `${PROFILE_IMAGE}${actor.profile_path}` : FALLBACK_IMAGE}
                  alt={actor.name}
                  className="w-24 h-32 object-cover rounded-lg mb-2"
                />
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-400">as {actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trailer & Cast Not Available Message */}
      {!trailerKey && cast.length === 0 && (
        <div className="my-10">
          <p className="text-center text-gray-400">Trailer and cast details are not available right now.</p>
        </div>
      )}

    </div>
  )
}

export default InfoPage