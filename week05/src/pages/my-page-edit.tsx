import { useState } from "react";
import { user } from "../data/user";
import Icon from "../components/icon";

function MyPageEdit() {
  const [nickname, setNickname] = useState(user.nickname);

  return (
    <main className="flex w-full flex-1 flex-col items-start gap-8 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-[9px]">
          <h1 className="text-[31px] leading-[37px] font-bold tracking-[-1.24px]">
            내 정보 수정
          </h1>
          <p className="text-sm leading-[22px] text-gray-600">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>
        <button
          type="submit"
          form="profile-form"
          className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-primary px-4 text-sm font-extrabold text-white"
        >
          변경사항 저장
        </button>
      </div>

      <form
        id="profile-form"
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full items-center"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-1">
          <button
            type="button"
            aria-label="프로필 이미지 변경"
            className="relative flex size-[82px] items-center justify-center rounded-full bg-gray-200"
          >
            <Icon name="person" size={48} />
            <span className="absolute right-0 -bottom-[5px] flex size-6 items-center justify-center rounded-full bg-surface">
              <Icon name="edit" size={24} />
            </span>
          </button>
          <span className="text-[15px] font-bold">프로필 이미지</span>
          <span className="text-[11px] text-gray-400">선택 사항 · 최대 5MB</span>
        </div>

        <div className="flex flex-1 flex-col gap-[17px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="profile-nickname" className="text-[13px] font-extrabold">
              닉네임
            </label>
            <div className="flex min-h-12 items-center gap-2 rounded-lg border border-gray-200 bg-white px-[13px] py-3.5">
              <input
                id="profile-nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="flex-1 bg-transparent px-0.5 py-px text-sm outline-none"
              />
              <button
                id="profile-nickname-check"
                type="button"
                className="text-xs font-extrabold text-primary"
              >
                중복 확인
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-px">
            <label htmlFor="profile-email" className="text-[13px] font-extrabold">
              이메일
            </label>
            <div className="flex min-h-12 items-center rounded-lg border border-gray-200 bg-white px-[13px] py-3.5">
              <input
                id="profile-email"
                type="email"
                value={user.email}
                readOnly
                className="flex-1 bg-transparent px-0.5 py-px text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </form>

      <section className="mt-auto flex w-full items-center justify-between gap-2 rounded-[10px] border border-danger bg-danger/10 p-5 text-danger">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold">회원 탈퇴</h3>
          <p className="text-[11px] leading-4">
            탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
          </p>
        </div>
        <button
          id="open-delete-dialog"
          type="button"
          className="flex h-[42px] items-center justify-center rounded-lg border border-danger bg-white px-4 text-sm font-extrabold"
        >
          회원 탈퇴
        </button>
      </section>
    </main>
  );
}

export default MyPageEdit;
