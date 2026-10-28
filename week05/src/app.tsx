import { Route, Routes } from "react-router-dom";
import { movies } from "./data/movies";
import Header from "./components/header";
import MovieListPage from "./pages/movie-list-page";
import MovieDetailPage from "./pages/movie-detail-page";
import MovieSearchPage from "./pages/movie-search-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import MyPage from "./pages/my-page";
import MyPageEdit from "./pages/my-page-edit";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-ink">
      <Header />
      <Routes>
        <Route path="/" element={<MovieListPage movies={movies} />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetailPage movies={movies} />}
        />
        <Route path="/search" element={<MovieSearchPage movies={movies} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my" element={<MyPage movies={movies} />} />
        <Route path="/my/edit" element={<MyPageEdit />} />
      </Routes>
    </div>
  );
}

export default App;
