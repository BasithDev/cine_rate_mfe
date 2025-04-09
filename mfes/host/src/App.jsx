import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SafeImport } from './components/SafeImport';
import Loader from './components/Loader';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import ContentInfo from './components/ContentInfo';
import ScrollToTop from './components/ScrollToTop';

const Header = SafeImport(() => import('header/Header'), 'Header', 'header');
const Home = SafeImport(() => import('home/Home'), 'Home', 'home');
const Search_result = SafeImport(() => import('search_result/Search_result'), 'Search_result', 'search_result');
const WatchList = SafeImport(() => import('watchlist/WatchList'), 'WatchList', 'watchlist');

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<Loader />}>
          <Header />
        </Suspense>

        <div className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search_result />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/content" element={<ContentInfo />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;