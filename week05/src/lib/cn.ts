import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 조건부 class 를 합치고, 충돌하는 Tailwind class 는 뒤의 값으로 정리
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
