import { MenuGroupType, MenuGroupTypes } from '@components/navbar/types'

import { i18nextViewsInstance } from '../i18n/i18n'

export const getNavbarMenuData = (): MenuGroupType[] => [
  {
    groupId: 0,
    title: i18nextViewsInstance.t('component:navbar.devops'),
    type: MenuGroupTypes.GENERAL,
    items: [
      {
        id: 0,
        iconName: 'repositories-gradient',
        title: i18nextViewsInstance.t('component:navbar.repositories'),
        description: 'Integrated & familiar git experience.',
        to: '/repos'
      },
      {
        id: 1,
        iconName: 'pipelines-gradient',
        title: i18nextViewsInstance.t('component:navbar.pipelines'),
        description: 'Up to 4X faster than other solutions.',
        to: '/pipelines'
      },
      {
        id: 2,
        iconName: 'execution-gradient',
        title: i18nextViewsInstance.t('component:navbar.executions'),
        description: 'Optimize feature rollout velocity.',
        to: '/executions'
      },
      {
        id: 3,
        iconName: 'database-gradient',
        title: i18nextViewsInstance.t('component:navbar.databases'),
        description: 'Manage all your infrastructure.',
        to: '/databases'
      },
      {
        id: 4,
        iconName: 'artifacts-gradient',
        title: i18nextViewsInstance.t('component:navbar.artifacts'),
        description: 'Validate service resilience.',
        to: '/sandbox/executions/artifacts'
      },
      {
        id: 5,
        iconName: 'infrastructure-gradient',
        title: i18nextViewsInstance.t('component:navbar.infrastructure'),
        description: 'Manage all your infrastructure.',
        to: '/infrastructure'
      },
      {
        id: 6,
        iconName: 'flag-gradient',
        title: i18nextViewsInstance.t('component:navbar.feature-flags'),
        description: 'Optimize feature rollout velocity.',
        to: '/feature-flags'
      }
    ]
  },
  {
    groupId: 1,
    title: 'Devex',
    type: MenuGroupTypes.GENERAL,
    items: [
      {
        id: 7,
        iconName: 'dev-portal-gradient',
        title: i18nextViewsInstance.t('component:navbar.developer-portal'),
        description: 'Built for developers, onboard in minutes.',
        to: '/developer/portal'
      },
      {
        id: 8,
        iconName: 'dev-envs-gradient',
        title: i18nextViewsInstance.t('component:navbar.developer-environments'),
        description: 'Integrated & familiar git experience.',
        to: '/developer/environments'
      },
      {
        id: 9,
        iconName: 'dev-insights-gradient',
        title: i18nextViewsInstance.t('component:navbar.developer-insights'),
        description: 'Actionable insights on SDLC.',
        to: '/developer/insights'
      }
    ]
  },
  {
    groupId: 2,
    title: i18nextViewsInstance.t('component:navbar.secops'),
    type: MenuGroupTypes.GENERAL,
    items: [
      {
        id: 10,
        iconName: 'security-tests-gradient',
        title: i18nextViewsInstance.t('component:navbar.security-tests'),
        description: 'Shift left security testing.',
        to: '/sandbox/executions/security-tests'
      },
      {
        id: 11,
        iconName: 'supply-chain-gradient',
        title: i18nextViewsInstance.t('component:navbar.supply-chain'),
        description: 'Artifact integrity and governance.',
        to: '/supply-chain'
      }
    ]
  },
  {
    groupId: 3,
    title: i18nextViewsInstance.t('component:navbar.finops'),
    type: MenuGroupTypes.GENERAL,
    items: [
      {
        id: 12,
        iconName: 'cloud-costs-gradient',
        title: i18nextViewsInstance.t('component:navbar.cloud-costs'),
        description: 'Intelligent cost management.',
        to: '/cloud-costs'
      }
    ]
  },
  {
    groupId: 4,
    title: i18nextViewsInstance.t('component:navbar.reliability'),
    type: MenuGroupTypes.GENERAL,
    items: [
      {
        id: 13,
        iconName: 'incidents-gradient',
        title: i18nextViewsInstance.t('component:navbar.incidents'),
        description: 'Shift left security testing.',
        to: '/incidents'
      },
      {
        id: 14,
        iconName: 'chaos-engineering-gradient',
        title: i18nextViewsInstance.t('component:navbar.chaos-engineering'),
        description: 'Validate service resilience.',
        to: '/chaos'
      }
    ]
  },
  {
    groupId: 5,
    title: i18nextViewsInstance.t('component:navbar.platform'),
    type: MenuGroupTypes.GENERAL,
    items: [
      {
        id: 15,
        iconName: 'dashboards-gradient',
        title: i18nextViewsInstance.t('component:navbar.dashboards'),
        description: 'Intelligent cost management.',
        to: '/dashboards'
      }
    ]
  },
  {
    groupId: 0,
    title: i18nextViewsInstance.t('component:navbar.general'),
    type: MenuGroupTypes.SETTINGS,
    items: [
      {
        id: 0,
        iconName: 'settings-2',
        title: i18nextViewsInstance.t('component:navbar.settings'),
        to: '/admin/default-settings'
      },
      {
        id: 1,
        iconName: 'notification',
        title: i18nextViewsInstance.t('component:navbar.notifications'),
        to: '/admin/notifications'
      }
    ]
  },
  {
    groupId: 1,
    title: i18nextViewsInstance.t('component:navbar.resources'),
    type: MenuGroupTypes.SETTINGS,
    items: [
      {
        id: 2,
        iconName: 'wrench',
        title: i18nextViewsInstance.t('component:navbar.services'),
        to: '/admin/services'
      },
      {
        id: 3,
        iconName: 'environment',
        title: i18nextViewsInstance.t('component:navbar.environments'),
        to: '/admin/environments'
      },
      {
        id: 4,
        iconName: 'connectors',
        title: i18nextViewsInstance.t('component:navbar.connectors'),
        to: '/admin/connectors'
      },
      {
        id: 5,
        iconName: 'hierarchy',
        title: i18nextViewsInstance.t('component:navbar.delegates'),
        to: '/admin/delegates'
      },
      {
        id: 6,
        iconName: 'key',
        title: i18nextViewsInstance.t('component:navbar.secrets'),
        to: '/admin/secrets'
      },
      {
        id: 7,
        iconName: 'file-icon',
        title: i18nextViewsInstance.t('component:navbar.file-store'),
        to: '/admin/filte-store'
      },
      {
        id: 8,
        iconName: 'sidebar-icon',
        title: i18nextViewsInstance.t('component:navbar.templates'),
        to: '/admin/templates'
      },
      {
        id: 9,
        iconName: 'variable',
        title: i18nextViewsInstance.t('component:navbar.variables'),
        to: '/admin/variables'
      },
      {
        id: 10,
        iconName: 'clock-icon',
        title: i18nextViewsInstance.t('component:navbar.slo-downtime'),
        to: '/admin/slo-downtime'
      },
      {
        id: 11,
        iconName: 'search',
        title: i18nextViewsInstance.t('component:navbar.discovery'),
        to: '/admin/discovery'
      },
      {
        id: 12,
        iconName: 'eye',
        title: i18nextViewsInstance.t('component:navbar.monitored-services'),
        to: '/admin/monitored-services'
      },
      {
        id: 13,
        iconName: 'stack',
        title: i18nextViewsInstance.t('component:navbar.overrides'),
        to: '/admin/overrides'
      },
      {
        id: 14,
        iconName: 'bookmark-icon',
        title: i18nextViewsInstance.t('component:navbar.certificates'),
        to: '/admin/certificates'
      },
      {
        id: 15,
        iconName: 'webhook',
        title: i18nextViewsInstance.t('component:navbar.webhooks'),
        to: '/admin/webhooks'
      }
    ]
  },
  {
    groupId: 2,
    title: i18nextViewsInstance.t('component:navbar.access-control'),
    type: MenuGroupTypes.SETTINGS,
    items: [
      {
        id: 16,
        iconName: 'user',
        title: i18nextViewsInstance.t('component:navbar.users'),
        to: '/admin/users'
      },
      {
        id: 17,
        iconName: 'users',
        title: i18nextViewsInstance.t('component:navbar.user-groups'),
        to: '/admin/users-group'
      },
      {
        id: 18,
        iconName: 'account-icon',
        title: i18nextViewsInstance.t('component:navbar.service-accounts'),
        to: '/admin/service-accounts'
      },
      {
        id: 19,
        iconName: 'folder-icon',
        title: i18nextViewsInstance.t('component:navbar.resource-groups'),
        to: '/admin/resource-groups'
      },
      {
        id: 20,
        iconName: 'briefcase',
        title: i18nextViewsInstance.t('component:navbar.roles'),
        to: '/admin/roles'
      }
    ]
  },
  {
    groupId: 3,
    title: i18nextViewsInstance.t('component:navbar.security-and-governance'),
    type: MenuGroupTypes.SETTINGS,
    items: [
      {
        id: 21,
        iconName: 'shield',
        title: i18nextViewsInstance.t('component:navbar.policies'),
        to: '/admin/policies'
      },
      {
        id: 22,
        iconName: 'snow',
        title: i18nextViewsInstance.t('component:navbar.freeze-windows'),
        to: '/admin/freeze-windows'
      }
    ]
  },
  {
    groupId: 4,
    title: i18nextViewsInstance.t('component:navbar.external-tickets'),
    type: MenuGroupTypes.SETTINGS,
    items: [
      {
        id: 23,
        iconName: 'ticket',
        title: i18nextViewsInstance.t('component:navbar.external-tickets'),
        to: '/admin/external-tickets'
      }
    ]
  }
]
