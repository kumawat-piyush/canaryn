import React from 'react'

interface CompProps {
  children: React.ReactNode
  className?: string
}

function Root({ ...props }: CompProps) {
  const { children } = props

  return children
}

function Item({ ...props }: CompProps) {
  const { children } = props

  return children
}

function Control({ ...props }: CompProps) {
  const { children } = props

  return children
}

function Caption({ ...props }: CompProps) {
  const { children } = props

  return children
}

function Message({ ...props }: CompProps) {
  const { children } = props

  return children
}

export { Root, Item, Control, Caption, Message }
