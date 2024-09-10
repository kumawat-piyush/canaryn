import { Button, Text } from '@harnessio/canary'
import { PaddingListLayout, TopBarWidget } from '@harnessio/playground'
import { NavArrowRight } from '@harnessio/icons-noir'
import { Link } from 'react-router-dom'

export default function PipelineCreate() {
  return (
    <>
      <TopBarWidget />
      <PaddingListLayout>
        <div className="flex justify-between">
          <Text size={5} weight={'medium'}>
            Don’t know where to start? Use a template
          </Text>

          <Button variant="ghost" asChild>
            <Link className="flex gap-2 items-center" to="/pipeline/templates">
              see all templates <NavArrowRight />
            </Link>
          </Button>
        </div>
      </PaddingListLayout>
    </>
  )
}
