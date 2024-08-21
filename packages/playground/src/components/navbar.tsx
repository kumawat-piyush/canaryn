import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Navbar, NavbarProjectChooser, NavbarUser } from '@harnessio/canary'

export default function Nav() {
  const primaryMenuItems = [
    {
      text: 'Repositories',
      icon: <Icon name="repositories" />,
      to: '/repos'
    },
    {
      text: 'Pipelines',
      icon: <Icon name="pipelines" />,
      to: '/pipelines'
    },
    {
      text: 'Executions',
      icon: <Icon name="executions" />,
      to: '/executions'
    },
    {
      text: 'Featured Flags',
      icon: <Icon name="featured-flags" />,
      to: '/feature-flags'
    }
  ]

  const pinnedMenuItems = [
    {
      text: 'Chaos Engineering',
      icon: <Icon name="chaos-engineering" />,
      to: '/chaos-engineering'
    },
    {
      text: 'Environment',
      icon: <Icon name="environment" />,
      to: 'environment'
    },
    {
      text: 'Secrets',
      icon: <Icon name="secrets" />,
      to: 'secrets'
    },
    {
      text: 'Connectors',
      icon: <Icon name="connectors" />,
      to: 'connectors'
    },
    {
      text: 'Home Page',
      icon: <Icon name="chaos-engineering" />,
      to: '/'
    },
    {
      text: 'Sign Up',
      icon: <Icon name="environment" />,
      to: '/signup'
    },
    {
      text: 'Sign In',
      icon: <Icon name="secrets" />,
      to: '/signin'
    }
  ]

  const sampleProjectList = [
    {
      title: 'Playground',
      icon: <Icon name="archive" />
    },
    {
      title: 'Drone',
      icon: <Icon name="archive" />
    },
    {
      title: 'Pixel Point',
      icon: <Icon name="archive" />
    }
  ]

  return (
    <Navbar.Root>
      <Navbar.Header>
        <NavbarProjectChooser.Root
          name="Playground"
          avatar={<Icon name="harness" size={16} />}
          projects={sampleProjectList}
        />
      </Navbar.Header>
      <Navbar.Content>
        <Navbar.Group>
          {primaryMenuItems.map((item, idx) => (
            <NavLink key={idx} to={item.to || ''}>
              {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
            </NavLink>
          ))}
          <Navbar.Item text="More" icon={<Icon name="ellipsis" />} />
        </Navbar.Group>
        <Navbar.AccordionGroup title="Pinned">
          {pinnedMenuItems.map((item, idx) => (
            <NavLink key={idx} to={item.to || ''}>
              {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
            </NavLink>
          ))}
        </Navbar.AccordionGroup>
      </Navbar.Content>
      <Navbar.Footer>
        <NavbarUser.Root />
      </Navbar.Footer>
    </Navbar.Root>
  )
}
