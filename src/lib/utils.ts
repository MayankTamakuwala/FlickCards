import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomColorGenerator () {
  // We don't want colors that are whiteish or have white shade
  const r = Math.floor(Math.random() * 220)
  const g = Math.floor(Math.random() * 220)
  const b = Math.floor(Math.random() * 220)
  return `rgb(${r}, ${g}, ${b})`
}