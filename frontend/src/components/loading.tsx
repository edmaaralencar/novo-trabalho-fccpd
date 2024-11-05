import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type LoadingProps = {
  className?: ComponentProps<'div'>['className']
}

export function Loading({ className }: LoadingProps) {
  return (
    <svg
      width="44"
      height="46"
      viewBox="0 0 44 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin text-black', className)}
    >
      <path
        d="M27.1987 3.34084C29.6491 4.28621 31.8893 5.70497 33.7914 7.51612C35.6934 9.32726 37.2202 11.4953 38.2844 13.8965C39.3486 16.2977 39.9294 18.8849 39.9937 21.5106C40.0581 24.1362 39.6046 26.7488 38.6592 29.1992C37.7138 31.6496 36.2951 33.8898 34.4839 35.7919C32.6728 37.694 30.5047 39.2207 28.1036 40.2849C25.7024 41.3491 23.1151 41.93 20.4895 41.9943C17.8638 42.0586 15.2512 41.6051 12.8008 40.6597"
        stroke="currentColor"
        strokeWidth="6.66666"
        strokeLinecap="round"
      />
    </svg>
  )
}
