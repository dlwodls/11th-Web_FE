import { Link } from "react-router-dom";

const fieldClass =
  "flex min-h-12 items-center gap-[9px] rounded-lg border border-gray-200 bg-white px-[13px] py-3.5";
const inputClass =
  "flex-1 bg-transparent px-0.5 py-px text-sm outline-none placeholder:text-gray-400";

function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <form
        id="signup-form"
        onSubmit={(e) => e.preventDefault()}
        className="flex w-[430px] flex-col gap-4"
      >
        <h1 className="text-[34px] leading-[41px] font-bold tracking-[-1.53px]">
          회원가입
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-email" className="text-[13px] font-extrabold">
            이메일
          </label>
          <div className={fieldClass}>
            <input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              className={inputClass}
            />
            <button type="button" className="text-xs font-extrabold text-primary">
              중복 확인
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-nickname" className="text-[13px] font-extrabold">
            닉네임
          </label>
          <div className={fieldClass}>
            <input
              id="signup-nickname"
              type="text"
              placeholder="2–12자"
              className={inputClass}
            />
            <button type="button" className="text-xs font-extrabold text-primary">
              중복 확인
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="signup-password" className="text-[13px] font-extrabold">
              비밀번호
            </label>
            <div className={fieldClass}>
              <input
                id="signup-password"
                type="password"
                placeholder="8자 이상"
                className={inputClass}
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400">
            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="signup-password-confirm"
            className="text-[13px] font-extrabold"
          >
            비밀번호 확인
          </label>
          <div className={fieldClass}>
            <input
              id="signup-password-confirm"
              type="password"
              placeholder="다시 입력"
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-lg border border-white bg-primary text-sm font-extrabold text-white"
        >
          가입하기
        </button>

        <p className="flex items-end justify-center text-[13px] text-gray-600">
          이미 계정이 있나요?&nbsp;
          <Link to="/login" className="text-xs font-extrabold text-primary">
            로그인
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;
