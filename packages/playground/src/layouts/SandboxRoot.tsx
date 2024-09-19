import React from 'react'
import { SandboxLayout } from '../index'
import { Outlet } from 'react-router-dom'

export const SandboxRoot: React.FC = () => {
  return (
    <SandboxLayout.Root>
      <Outlet />
    </SandboxLayout.Root>
  )
}
