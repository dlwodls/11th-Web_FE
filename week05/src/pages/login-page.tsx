import { Link } from "react-router-dom";
import Icon from "../components/icon";

function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <form
        id="login-form"
        onSubmit={(e) => e.preventDefault()}
        className="flex w-[430px] flex-col gap-4"
      >
        <h1 className="text-[34px] leading-[41px] font-bold tracking-[-1.53px]">
          로그인
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className="text-[13px] font-extrabold">
            이메일
          </label>
          <div className="flex min-h-12 items-center gap-1 rounded-lg border border-gray-200 bg-white px-[13px] py-3.5 text-gray-600">
            <Icon name="mail" size={16} />
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              className="flex-1 bg-transparent px-0.5 py-px text-sm text-ink outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className="text-[13px] font-extrabold">
            비밀번호
          </label>
          <div className="flex min-h-12 items-center gap-1 rounded-lg border border-gray-200 bg-white px-[13px] py-3.5 text-gray-600">
            <Icon name="lock" size={16} />
            <input
              id="login-password"
              type="password"
              placeholder="비밀번호"
              className="flex-1 bg-transparent px-0.5 py-px text-sm text-ink outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-lg border border-white bg-primary text-sm font-extrabold text-white"
        >
          로그인
        </button>

        <p className="flex items-end justify-center pt-[5px] text-[13px] text-gray-600">
          처음이신가요?&nbsp;
          <Link to="/signup" className="text-xs font-extrabold text-primary">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
