import React from 'react'

interface NavLayoutProps {
  children: React.ReactNode
  customized: string /*based on the current wrapper style and add more your tailwindcss here*/
  className: string /*if you would like to coveror your own wrapper and build on your own responsive style*/
}

// This is empty container with padding without header
const NavLayout: React.FC<NavLayoutProps> = ({ children, customized, className }) => {
  return <div className={`flex gap-2.5 ${customized || className}`}>{children}</div>
}

export default NavLayout
