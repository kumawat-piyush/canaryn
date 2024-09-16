import { Button, ButtonGroup, Icon, ListActions, SearchBox, Spacer, StackedList, Text } from '@harnessio/canary'
import {
  Floating1ColumnLayout,
  FullWidth2ColumnLayout,
  PlaygroundListSettings,
  RepoSummaryPanel,
  BranchChooser
} from '@harnessio/playground'

export const RepoSummary: React.FC = () => {
  return (
    <Floating1ColumnLayout>
      <FullWidth2ColumnLayout
        leftColumn={
          <>
            <Spacer size={6} />
            <ListActions.Root>
              <ListActions.Left>
                <ButtonGroup.Root>
                  <BranchChooser name={'main'} branchList={[]} />
                  <SearchBox.Root placeholder="Search" />
                </ButtonGroup.Root>
              </ListActions.Left>
              <ListActions.Right>
                <ButtonGroup.Root>
                  <Button variant="outline">
                    Add file&nbsp;&nbsp;
                    <Icon name="chevron-down" size={11} className="chevron-down" />
                  </Button>
                  <Button variant="default">Clone repository</Button>
                </ButtonGroup.Root>
              </ListActions.Right>
            </ListActions.Root>
            <Spacer size={5} />
            {/* {renderListContent()} */}
            <Spacer size={12} />
            <StackedList.Root>
              <StackedList.Item isHeader disableHover>
                <StackedList.Field title={<Text color="tertiaryBackground">README.md</Text>} />
              </StackedList.Item>
              <StackedList.Item disableHover>
                {/* Dummy WYSIWYG content */}
                <div className="flex flex-col gap-4 px-3 py-2">
                  <Text size={5} weight="medium">
                    Pixel Point — Web Design and Development
                  </Text>
                  <Text size={3}>Table of Contents</Text>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Text weight="normal" className="text-primary/80">
                        - Welcome
                      </Text>
                    </li>
                    <li>
                      <Text weight="normal" className="text-primary/80">
                        - Getting started
                      </Text>
                    </li>
                    <li>
                      <Text weight="normal" className="text-primary/80">
                        - Usage
                      </Text>
                    </li>
                  </ul>
                  <Text size={3} weight="medium">
                    Welcome
                  </Text>
                  <Text className="text-primary/80">
                    Below you will find some basic information about how to work with this project. If you've spotted a
                    bug, a copywriting mistake or just want to suggest some better solution, please, refer to the
                    contribution section.
                  </Text>
                  <Text className="text-primary/80">
                    Hello there! This repo is a home to Pixel Point, a web agency that designs and develops world-class
                    marketing websites. We made this codebase available to open source community so everyone can get
                    something useful out of our expertise, be it for project structure, code patterns or plugins.
                  </Text>
                </div>
              </StackedList.Item>
            </StackedList.Root>
          </>
        }
        rightColumn={<RepoSummaryPanel title="Summary" timestamp={'May 6, 2024'} details={[]} />}
      />
      <PlaygroundListSettings loadState={'no-data'} setLoadState={() => {}} />
    </Floating1ColumnLayout>
  )
}
