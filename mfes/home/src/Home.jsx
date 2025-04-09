import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const categories = [
  { title: "Trending This Week", url: "/trending/all/week" },
  { title: "Top 10 Movies of All Time", url: "/movie/top_rated?page=1" },
  { title: "Top 10 TV Shows of All Time", url: "/tv/top_rated?page=1" },
  { 
    title: "Top 10 Anime", 
    url: "/discover/tv?with_genres=16&with_origin_country=JP&vote_count.gte=1000&sort_by=vote_average.desc&page=1" 
  }
];

function formatRating(voteAverage, voteCount) {
  const stars = voteAverage.toFixed(1);
  const formattedCount = voteCount >= 1000 ? (voteCount / 1000).toFixed(1) + "k" : voteCount;
  return `${stars} ★ (${formattedCount})`;
}

function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = {};
      for (const category of categories) {
        try {
          const response = await axios.get(`${BASE_URL}${category.url}`, {
            params: { api_key: API_KEY },
          });
          
          // Sort based on rating and rating count
          const sortedResults = response.data.results
            .sort((a, b) => b.vote_average - a.vote_average || b.vote_count - a.vote_count)
            .slice(0, 10);
          
          results[category.title] = sortedResults;
        } catch (error) {
          console.error(`Error fetching ${category.title}:`, error);
        }
      }
      setData(results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-[85vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full h-[85vh] relative"
        >
          {data["Trending This Week"].map((item) => (
            <SwiperSlide 
            onClick={() => navigate(`/content?id=${item.id}&media_type=${item.media_type}`)}
            key={item.id}>
              <div
                className="w-full h-[85vh] flex items-end p-12 bg-cover cursor-pointer bg-center relative shadow-lg"
                style={{ backgroundImage: `url(${IMAGE_BASE_URL}${item.backdrop_path})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{item.title || item.name}</h1>
                  <p className="text-lg mb-6 line-clamp-3 opacity-90">{item.overview}</p>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 shadow-md">More Info</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="p-6">
        {categories.slice(1).map((category) => (
          <div key={category.title} className="mb-8">
            <h2 className="text-xl lg:text-3xl font-bold mb-4">{category.title}</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="w-40 h-60 bg-gray-700 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={15}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 6 },
                }}
              >
                {data[category.title]?.map((item, index) => (
                  <SwiperSlide 
                    onClick={() => navigate(`/content?id=${item.id}&media_type=${category.title === "Top 10 Anime" ? "tv" : category.title === "Top 10 TV Shows of All Time" ? "tv" : "movie"}`)}
                    key={item.id}
                  >
                    <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                      <img
                        src={`${POSTER_BASE_URL}${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-72 h-max object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                        <h3 className="text-lg font-bold text-white">#{index + 1} {item.title || item.name}</h3>
                        <p className="text-sm text-gray-300">
                          {item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0]}
                        </p>
                        <p className="text-sm text-gray-300">{formatRating(item.vote_average, item.vote_count)}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;