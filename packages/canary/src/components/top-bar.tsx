import React from 'react'

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grid grid-cols-[1fr_auto] px-8 h-14 gap-6 border-b items-center text-sm font-regular">
      {children}
    </div>
  )
}

function Left({ children }: { children: React.ReactNode }) {
  return <div className="flex order-1 gap-3">{children}</div>
}

function Right({ children }: { children: React.ReactNode }) {
  return <div className="flex order-2 gap-3">{children}</div>
}

export { Root, Left, Right }