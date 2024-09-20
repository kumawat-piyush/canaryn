import React, { useState } from 'react'
import { pick } from 'lodash-es'
import { Spacer, ListActions, Button, Text, Icon, ButtonGroup } from '@harnessio/canary'
import { Summary } from '../components/repo-summary'
import { BranchSelector } from '../components/branch-chooser'
import { mockFiles } from '../data/mockSummaryFiiles'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'

const mockBranchList = [
  {
    name: 'main'
  },
  {
    name: 'new-feature'
  },
  {
    name: 'test-wip'
  },
  {
    name: 'display-db'
  }
]

function Sidebar() {
  return (
    <div className="w-full grid grid-cols-[1fr] auto-cols-auto grid-flow-col gap-3 items-center">
      <BranchSelector name="main" branchList={mockBranchList} />
      <ButtonGroup.Root
        spacing="0"
        className="shadow-border shadow-[inset_0_0_0_1px] rounded-md h-full overflow-hidden">
        <Button size="sm" variant="ghost" className="rounded-none p-0 w-8">
          <Icon size={15} name="add-folder" className="text-primary/80" />
        </Button>
        <Button size="sm" variant="ghost" borderRadius="0" className="border-l rounded-none p-0 w-8">
          <Icon size={15} name="add-file" className="text-primary/80" />
        </Button>
      </ButtonGroup.Root>
    </div>
  )
}

function SandboxRepoCodePage() {
  const [loadState, setLoadState] = useState('full-sub')

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader hasSubHeader>
          <SandboxLayout.View>
            <Sidebar />
          </SandboxLayout.View>
        </SandboxLayout.LeftSubPanel>
      )}
      <SandboxLayout.Content
        fullWidth={loadState.includes('full')}
        hasLeftPanel
        hasLeftSubPanel={loadState.includes('sub')}
        hasHeader
        hasSubHeader>
        <SandboxLayout.View>
          <ListActions.Root>
            <ListActions.Left>
              <ButtonGroup.Root spacing="2">
                <Text size={2} color="tertiaryBackground">
                  drone
                </Text>
                <Text size={2} color="tertiaryBackground">
                  /
                </Text>
                <Text size={2} color="primary" weight="medium">
                  src
                </Text>
              </ButtonGroup.Root>
            </ListActions.Left>
            <ListActions.Right>
              <Button variant="outline" size="sm">
                Add file&nbsp;&nbsp;
                <Icon name="chevron-down" size={11} className="chevron-down" />
              </Button>
            </ListActions.Right>
          </ListActions.Root>
          <Spacer size={5} />
          <Summary
            files={mockFiles}
            latestFile={pick(mockFiles[0], ['user', 'lastCommitMessage', 'timestamp', 'sha'])}
          />
        </SandboxLayout.View>
      </SandboxLayout.Content>
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxRepoCodePage }
