import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringValidator = (str: string, min = 2, max = 50) =>
  str.length >= min && str.length <= max

export const emailValidator = (str: string) => {
  if (!stringValidator(str, 2, 50)) {
    return false
  }

  return str
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export const passwordValidator = (str: string) => {
  if (!stringValidator(str, 6, 20)) {
    return false
  }

  const numbers = str.match(/[0-9]/g)
  if (numbers === null || numbers.length < 2) {
    return false
  }

  const specials = str.match(/[^0-9A-Za-z]/g)
  if (specials === null || specials.length < 2) {
    return false
  }
  return true
}
