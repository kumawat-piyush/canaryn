import { Spacer, Text } from '@harnessio/ui/components'
import { SandboxLayout, ThemeSelector } from '@harnessio/ui/views'

const SettingsAccountThemePage: React.FC = () => {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content>
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Theme Selector
        </Text>
        <Spacer size={6} />
        <ThemeSelector />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SettingsAccountThemePage }
