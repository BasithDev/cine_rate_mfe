import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
const FALLBACK_IMAGE = "https://via.placeholder.com/200x300?text=No+Image";

const dummyData = {
  movies: [
    {
      id: 1,
      title: "Interstellar",
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      overview: "A thief who steals corporate secrets through dream-sharing.",
      topCast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
      vote_average: 8.8,
      vote_count: 21000,
      release_date: "2010-07-16",
    },
  ],
  tvShows: [
    {
      id: 2,
      name: "Breaking Bad",
      poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      overview: "A high school chemistry teacher turned meth producer.",
      topCast: "Bryan Cranston, Aaron Paul",
      vote_average: 9.5,
      vote_count: 18000,
      first_air_date: "2008-01-20",
    },
  ],
  others: [
    {
      id: 3,
      name: "Jujutsu Kaisen",
      poster_path: "/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
      overview: "A boy swallows a cursed talisman and joins sorcerers to fight curses.",
      topCast: "Yuuji Itadori, Satoru Gojo",
      vote_average: 8.2,
      vote_count: 10000,
      first_air_date: "2020-10-03",
    },
    {
      id: 4,
      name: "One Piece",
      poster_path: "/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
      overview: "A boy swallows a cursed talisman and joins sorcerers to fight curses.",
      topCast: "Yuuji Itadori, Satoru Gojo",
      vote_average: 8.2,
      vote_count: 10000,
      first_air_date: "2020-10-03",
    },
  ],
};

function WatchList() {
  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Your Watchlist</h1>

      <div className="flex flex-col gap-12">
        {Object.entries(dummyData).map(([section, items]) => (
          <div key={section}>
            <h2 className="text-2xl font-semibold mb-4 capitalize">{section}</h2>
            <div className="flex flex-wrap gap-4">
              {items.map((item) => (
               <motion.div
               key={item.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.3 }}
               className="relative flex items-start gap-4 bg-white/10 rounded-xl p-4 pt-5 shadow-md hover:bg-white/20 transition duration-300 cursor-pointer w-full sm:w-[380px]"
             >            
                  <img
                    src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : FALLBACK_IMAGE}
                    alt={item.title || item.name}
                    className="w-24 h-36 object-cover rounded-md"
                  />

                  <div className="flex flex-col justify-between h-full space-y-1">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold">
                        {item.title || item.name}{" "}
                        {`(${item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0] || "N/A"})`}
                      </h2>
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {item.overview || "No plot available."}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Cast: {item.topCast || "N/A"}
                      </p>
                    </div>

                    {item.vote_average && item.vote_count ? (
                      <div className="flex items-center gap-2 text-yellow-400 font-semibold mt-auto">
                        <FaStar />
                        <span>{item.vote_average?.toFixed(1)}</span>
                        <span className="text-gray-300 font-thin">
                          {item.vote_count >= 1000
                            ? `(${Math.round(item.vote_count / 1000)}k+)`
                            : `(${item.vote_count})`}
                        </span>
                      </div>
                    ) : (
                      <p className="text-gray-300 text-sm mt-auto">No rating available</p>
                    )}
                      <button
                      className="flex items-center justify-center gap-2 mt-3 px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-sm font-bold rounded cursor-pointer transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;