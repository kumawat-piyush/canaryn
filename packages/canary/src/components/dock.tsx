interface DockProps {
  children: React.ReactNode
}

function Root({ ...props }: DockProps) {
  const { children } = props

  return <div className="fixed bottom-0 left-auto right-auto flex items-center justify-center py-6">{children}</div>
}

export { Root }
