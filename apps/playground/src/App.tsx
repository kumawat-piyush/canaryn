import React from 'react'
import { noop } from 'lodash-es'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { TooltipProvider } from '@harnessio/canary'
import {
  ThemeProvider,
  SandboxRoot,
  SandboxExecutions,
  SandboxSettings,
  SandboxSettingsAccountPage,
  SandboxSettingsProjectPage,
  SandboxRepoCreatePage,
  RepoSettingsPlaceholderPage,
  SandboxSettingsUserManagementPage,
  SandboxSettingsCreateNewUserPage,
  SignInPage,
  RepoBranchSettingsRulesPage,
  BypassUsersList,
  RepoWebhooksCreatePage,
  SandboxCreatePipelinePage
} from '@harnessio/fragments'
import ErrorPage from './pages/error-page'
import SandboxRepoPipelineListPage from './pages/sandbox-repo-pipeline-list-page'
import ExecutionDetailsPage from './pages/execution-details-page'
import SandboxCommitsListPage from './pages/sandbox-commits-list-page'
import SandboxBranchesListPage from './pages/sandbox-branches-list-page'
import CommitsDetailsPage from './pages/commits-details-page'
import PullRequestChangesPage from './pages/pull-request-changes-page'
import PullRequestChecksPage from './pages/pull-request-checks-page'
import SandboxRepoExecutionsListPage from './pages/sandbox-repo-execution-list-page'
import SandboxRepoWebhooksListPage from './pages/sandbox-repo-webhooks-list-page'
import { SandboxRepo } from './layouts/SandboxRepo'
import { SandboxRepoListPage } from './pages/sandbox-repo-list-page'
import { SandboxRepoSummaryPage } from './pages/sandbox-repo-summary-page'
import { SandboxRepoSinglePage } from './pages/sandbox-repo-single-page'
import { SandboxRepoCodePage } from './pages/sandbox-repo-code-page'
import { SandboxLandingPage } from './pages/sandbox-landing-page'
import { SandboxExecutionSummaryPage } from './pages/sandbox-executions-summary-page'
import { SandboxExecutionLogsPage } from './pages/sandbox-executions-logs-page'
import { SandboxExecutionInputsPage } from './pages/sandbox-executions-inputs-page'
import { SandboxExecutionPolicyEvaluationsPage } from './pages/sandbox-executions-policy-evaluations-page'
import { SandboxExecutionArtifactsPage } from './pages/sandbox-executions-artifacts-page'
import { SandboxExecutionTestsPage } from './pages/sandbox-executions-tests-page'
import { SandboxExecutionSecurityTestsPage } from './pages/sandbox-executions-security-tests-page'
import { SandboxExecutionSecretsPage } from './pages/sandbox-executions-secrets-page'
import { SandboxSettingsAccountKeysPage } from './pages/sandbox-settings-account-keys-page'
import { SandboxSettingsProjectGeneralPage } from './pages/sandbox-settings-project-general-page'
import { SandboxSettingsProjectMembersPage } from './pages/sandbox-settings-project-members-page'
import { RepoSettingsGeneralPlaygroundContainer } from './pages/repo-settings-general-page-playground-container'
import { RepoSettingsCollaborationsPage } from './pages/repo-settings-collaborations-page'
import { RepoSettingsModerationPage } from './pages/repo-settings-moderation-page'
import { SandboxSettingsAccountGeneralPage } from './pages/sandbox-settings-account-general-page'
import { SandboxSettingsCreateNewMemberPage } from './pages/sandbox-settings-create-new-member-page'
import SandboxPullRequestComparePage from './pages/sandbox-pull-request-compare-page'
import { mockBypassUserData, mockStatusChecks } from './pages/mocks/repo-branch-settings/mockData'
import { currentUser } from './pages/mocks/mockCurrentUserData'
import { mockUsersData } from './data/mockUsersData'
import { gitIgnoreOptions, licenseOptions } from './data/mockCreateRepoData'
import SandboxPullRequestLayout from './layouts/SandboxPullrequestLayout'
import { SandboxRepoSettingsPage } from './pages/sandbox-repo-settings-page'

const router = createBrowserRouter([
  // TEMPORARY LAYOUT SANDBOX
  {
    path: '/',
    element: <SandboxRoot currentUser={currentUser} currentSpaceId="spaceId" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':spaceId/repos',
        element: <SandboxRepo />, // Contains the breadcrumbs header
        children: [
          {
            index: true,
            element: <SandboxRepoListPage />
          },
          {
            path: 'create',
            element: (
              <SandboxRepoCreatePage
                apiError=""
                isLoading={false}
                isSuccess={false}
                onFormCancel={noop}
                onFormSubmit={noop}
                licenseOptions={licenseOptions}
                gitIgnoreOptions={gitIgnoreOptions}
              />
            )
          },
          {
            path: ':repoId',
            element: <SandboxRepoSinglePage />, // Contains the nav tabs header AND inherits the breadcrumbs header
            children: [
              {
                path: 'summary',
                element: <SandboxRepoSummaryPage />
              },
              {
                path: 'code',
                element: <SandboxRepoCodePage />
              },
              {
                path: 'pull-requests/compare',
                element: <SandboxPullRequestComparePage />
              },
              // {
              //   path: 'pull-requests',
              //   element: <SandboxPullRequestListPage />
              // },
              {
                path: 'pull-requests/:pullRequestId',
                element: <SandboxPullRequestLayout />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="conversation" />
                  },
                  // {
                  //   path: 'conversation',
                  //   element: <SandboxPullRequestConversationPage />
                  // },
                  {
                    path: 'changes',
                    element: <PullRequestChangesPage />
                  },
                  // {
                  //   path: 'commits',
                  //   element: <PullRequestCommitsPage />
                  // },
                  {
                    path: 'checks',
                    element: <PullRequestChecksPage />
                  }
                ]
              },
              {
                path: 'branches',
                element: <SandboxBranchesListPage />
              },
              {
                path: 'webhooks',
                element: <SandboxRepoWebhooksListPage />
              },
              {
                path: 'webhooks/create',
                element: (
                  <RepoWebhooksCreatePage
                    onFormSubmit={noop}
                    onFormCancel={noop}
                    isLoading={false}
                    preSetWebHookData={null}
                  />
                )
              },
              {
                path: 'pipelines',
                element: <SandboxRepoPipelineListPage />
              },
              {
                path: 'pipelines/create',
                element: <SandboxCreatePipelinePage />
              },
              {
                path: 'pipelines/:pipelineId',
                children: [
                  {
                    index: true,
                    element: <SandboxRepoExecutionsListPage />
                  },
                  // {
                  //   path: 'edit',
                  //   element: <PipelineEdit />
                  // },
                  {
                    path: 'executions',
                    element: <SandboxRepoExecutionsListPage />
                  }
                  // {
                  //   path: 'executions/:executionId',
                  //   element: <ExecutionDetailsPage />
                  // }
                ]
              },
              {
                path: 'commits',
                element: <SandboxCommitsListPage />
              },
              {
                path: 'commits/:commitId',
                element: <CommitsDetailsPage />
              },
              {
                path: 'settings',
                element: <SandboxRepoSettingsPage />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="general" />
                  },
                  {
                    path: 'general',
                    element: <RepoSettingsGeneralPlaygroundContainer />
                  },
                  {
                    path: 'collaborations',
                    element: <RepoSettingsCollaborationsPage />
                  },
                  {
                    path: 'moderation',
                    element: <RepoSettingsModerationPage />
                  },
                  {
                    path: 'rules',
                    element: <RepoSettingsGeneralPlaygroundContainer />
                  },
                  {
                    path: 'rules/create',
                    element: (
                      <RepoBranchSettingsRulesPage
                        handleRuleUpdate={noop}
                        principals={mockBypassUserData as BypassUsersList[]}
                        recentStatusChecks={mockStatusChecks}
                      />
                    )
                  },
                  {
                    path: '*',
                    element: <RepoSettingsPlaceholderPage />
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'executions',
        element: <SandboxExecutions />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="summary" replace />
          },
          {
            path: 'summary',
            element: <SandboxExecutionSummaryPage />
          },
          {
            path: 'logs',
            element: <SandboxExecutionLogsPage />
          },
          {
            path: 'inputs',
            element: <SandboxExecutionInputsPage />
          },
          {
            path: 'policy-evaluations',
            element: <SandboxExecutionPolicyEvaluationsPage />
          },
          {
            path: 'artifacts',
            element: <SandboxExecutionArtifactsPage />
          },
          {
            path: 'tests',
            element: <SandboxExecutionTestsPage />
          },
          {
            path: 'security-tests',
            element: <SandboxExecutionSecurityTestsPage />
          },
          {
            path: 'secrets',
            element: <SandboxExecutionSecretsPage />
          }
        ]
      },
      {
        path: 'settings',
        element: <SandboxSettings />,
        children: [
          {
            path: 'account',
            element: <SandboxSettingsAccountPage />,
            children: [
              {
                index: true,
                element: <Navigate to="general" />
              },
              {
                path: 'general',
                element: <SandboxSettingsAccountGeneralPage />
              },
              {
                path: 'keys',
                element: <SandboxSettingsAccountKeysPage />
              }
            ]
          },
          {
            path: 'project',
            element: <SandboxSettingsProjectPage />,
            children: [
              {
                index: true,
                element: <Navigate to="general" />
              },
              {
                path: 'general',
                element: <SandboxSettingsProjectGeneralPage />
              },
              {
                path: 'members',
                children: [
                  { index: true, element: <SandboxSettingsProjectMembersPage /> },
                  {
                    path: 'create',
                    element: <SandboxSettingsCreateNewMemberPage />
                  }
                ]
              }
            ]
          }
        ]
      },

      {
        path: 'landing',
        element: <SandboxLandingPage />
      },
      {
        path: 'users',
        element: (
          <SandboxSettingsUserManagementPage
            userData={mockUsersData}
            handleDeleteUser={noop}
            handleUpdatePassword={noop}
            handleUpdateUser={noop}
            updateUserAdmin={noop}
            currentPage={1}
            totalPages={1}
            setPage={noop}
          />
        )
      },

      {
        path: 'users/create',
        element: <SandboxSettingsCreateNewUserPage handleCreateUser={noop} isLoading={false} apiError={null} />
      }
    ]
  },

  {
    path: 'signin',
    element: <SignInPage handleSignIn={noop} />
  },
  {
    path: '/old',
    // element: <RootLayout currentUser={currentUser} />,
    element: <Navigate to="/sandbox/" />
    // errorElement: <ErrorPage />,
    // children: [
    //   // LANDING
    //   {
    //     path: '/',
    //     element: <LandingPage />
    //   },
    //   // REPOS
    //   {
    //     path: 'repos',
    //     element: <RepoListPage />
    //   },
    //   {
    //     path: 'repos/:repoId',
    //     element: <RepoLayout />,
    //     children: [
    //       {
    //         index: true,
    //         element: <Navigate to="/sandbox/repos/drone/summary" />
    //       },
    //       {
    //         path: 'summary',
    //         element: <RepoSummaryPage />
    //       },
    //       {
    //         path: 'pipelines',
    //         element: <RepoPipelineListPage />
    //       },
    //       {
    //         path: 'pipelines/create',
    //         element: <CreatePipelinePage />
    //       },
    //       // {
    //       //   path: 'pipelines/:pipelineId',
    //       //   children: [
    //       //     {
    //       //       index: true,
    //       //       element: <RepoExecutionListPage />
    //       //     },
    //       //     {
    //       //       path: 'edit',
    //       //       element: <PipelineEdit />
    //       //     },
    //       //     {
    //       //       path: 'executions',
    //       //       element: <RepoExecutionListPage />
    //       //     },
    //       //     {
    //       //       path: 'executions/:executionId',
    //       //       element: <ExecutionDetailsPage />
    //       //     }
    //       //   ]
    //       // },
    //       {
    //         path: 'pull-requests',
    //         element: <PullRequestListPage />
    //       },
    //       {
    //         path: 'pull-requests/:pullRequestId',
    //         element: <PullRequestLayout />,
    //         children: [
    //           {
    //             index: true,
    //             element: <Navigate to="conversation" />
    //           },
    //           {
    //             path: 'conversation',
    //             element: <PullRequestConversationPage />
    //           },
    //           {
    //             path: 'changes',
    //             element: <PullRequestChangesPage />
    //           },
    //           {
    //             path: 'commits',
    //             element: <PullRequestCommitsPage />
    //           },
    //           {
    //             path: 'checks',
    //             element: <PullRequestChecksPage />
    //           }
    //         ]
    //       },
    //       {
    //         path: 'branches',
    //         element: <BranchesListPage />
    //       },
    //       // {
    //       //   path: 'webhooks',
    //       //   element: <RepoWebhooksListPage />
    //       // },
    //       {
    //         path: 'webhooks/create',
    //         element: (
    //           <RepoWebhooksCreatePage
    //             onFormSubmit={noop}
    //             onFormCancel={noop}
    //             isLoading={false}
    //             preSetWebHookData={null}
    //           />
    //         )
    //       },
    //       {
    //         path: 'commits',
    //         element: <CommitsListPage />
    //       },
    //       {
    //         path: 'commits/:commitId',
    //         element: <CommitsDetailsPage />
    //       }
    //     ]
    //   },
    //   // PIPELINES (OUTSIDE REPOS)
    //   {
    //     path: 'pipelines',
    //     element: <PipelineLayout />,
    //     children: [
    //       {
    //         index: true,
    //         element: <PipelineListPage />
    //       },
    //       {
    //         path: 'create',
    //         element: <CreatePipelinePage />
    //       }
    //     ]
    //   },
    //   // EXECUTIONS (OUTSIDE REPOS)
    //   {
    //     path: 'executions',
    //     element: <Navigate to="/sandbox/executions" />
    //   }
    // ]
  }
])

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  )
}
