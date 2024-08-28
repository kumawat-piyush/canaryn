import React from 'react'

const RootLayout: React.FC = () => {
  return (
    <div>
      <nav
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-56 lg:overflow-y-auto lg:bg-black lg:pb-4 border-r px-4 py-10 sm:px-6 lg:px-8 lg:py-6"
        role="navigation"
        aria-label="Main Navigation">
        <p>Navbar</p>
        <div className="h-[2000px]" />
        <p>End of navbar</p>
      </nav>
      <div className="lg:pl-56">
        <header
          className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
          role="banner">
          <p>Header</p>
        </header>
        <header
          className="sticky top-16 z-40 flex h-12 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
          role="banner">
          <p>Sub header</p>
        </header>
        <main className="xl:pl-56" role="main">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <p>Main</p>
            <div className="h-[2000px]" />
            <p>End of main</p>
          </div>
        </main>
        <footer
          className="sticky bottom-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-t border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
          role="contentinfo">
          <p>Footer</p>
        </footer>
      </div>
      <aside
        className="fixed bottom-12 left-56 top-28 hidden w-56 overflow-y-auto border-r border-border px-4 py-6 sm:px-6 lg:px-8 xl:block"
        role="complementary">
        <p>Aside</p>
        <div className="h-[2000px]" />
        <p>End of aside</p>
      </aside>
    </div>
  )
}

export default RootLayout
