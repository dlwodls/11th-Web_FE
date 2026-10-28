import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { user } from "../data/user";
import Footer from "../components/footer";
import Icon from "../components/icon";
import MovieGrid from "../components/movie-grid";
import Pagination from "../components/pagination";
import { useBookmarkStore } from "../stores/bookmark-store";

interface MyPageProps {
  movies: Movie[];
}

function MyPage({ movies }: MyPageProps) {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const favorites = movies.filter((movie) =>
    bookmarkedMovieIds.includes(movie.id),
  );

  return (
    <>
      <main className="flex w-full flex-1 flex-col items-start gap-7 px-20 py-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[31px] leading-[37px] font-bold tracking-[-1.24px]">
            내 정보
          </h1>
          <Link
            to="/my/edit"
            className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-primary px-4 text-sm font-extrabold text-white"
          >
            정보 수정
          </Link>
        </div>

        <section className="flex w-full flex-col gap-4 border-y border-gray-200 py-3">
          <h2 className="text-[17px] font-bold">기본 정보</h2>
          <div className="flex items-center gap-7">
            <span className="flex size-[82px] items-center justify-center rounded-full bg-gray-200">
              <Icon name="person" size={48} />
            </span>
            <div className="flex w-[760px] max-w-[760px] gap-7">
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-[11px] text-gray-400">닉네임</span>
                <strong className="text-sm font-bold">{user.nickname}</strong>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-[11px] text-gray-400">이메일</span>
                <strong className="text-sm font-bold">{user.email}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4">
          <h2 className="text-[17px] font-bold">내 즐겨찾기</h2>
          {favorites.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-600">
              아직 즐겨찾기한 영화가 없어요.
            </p>
          ) : (
            <MovieGrid movies={favorites} />
          )}
          <Pagination currentPage={1} totalPages={1} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MyPage;
