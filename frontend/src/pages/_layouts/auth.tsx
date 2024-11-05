import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid h-screen w-screen grid-cols-2">
      <Outlet />
      <div className="grid size-full place-items-center bg-black">
        <h1 className="px-16 text-[90px] leading-[80px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
      </div>
    </div>
  )
}
