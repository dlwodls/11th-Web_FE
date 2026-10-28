import { Link, NavLink } from "react-router-dom";
import { cn } from "../lib/cn";
import Icon from "./icon";

const navItems = [
  { to: "/", label: "영화" },
  { to: "/search", label: "검색" },
  { to: "/my", label: "내 정보" },
];

function Header() {
  return (
    <header className="flex h-[91px] w-full items-center justify-between bg-white px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border-2 border-ink">
            <Icon name="movie" />
          </span>
          <span className="text-xl font-black tracking-[-0.7px]">UMCine</span>
        </Link>

        <nav className="flex items-center gap-[30px] text-sm font-bold">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn("text-gray-600", isActive && "text-ink underline")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          to="/search"
          aria-label="영화 검색"
          className="flex size-[42px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
        >
          <Icon name="search" />
        </Link>
        <Link
          to="/login"
          className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-primary px-4 text-sm font-extrabold text-white"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}

export default Header;
