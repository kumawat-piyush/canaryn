import React from 'react'
import { ExecutionDetails } from '../components/execution/execution-details'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@harnessio/canary'
import { ExecutionContextProvider } from '../components/execution/execution-context'

export enum ExecutionTab {
  SUMMARY = 'summary',
  LOG = 'log',
  INPUT = 'input',
  POLICY = 'policy',
  ARTIFACT = 'artifact',
  TEST = 'test',
  SECURITY = 'security'
}
//simple data for rendering
const keyValueMockData = [
  {
    name: 'Input Name',
    value: 'Input Value'
  },
  {
    name: 'identifier',
    value: 'canaryDeployment'
  },
  {
    name: 'name',
    value: 'canaryDeployment'
  },
  {
    name: 'timeout',
    value: '10m'
  },
  {
    name: 'type',
    value: 'K8sCanaryDeploy'
  },
  {
    name: 'type',
    value: 'percentage'
  },
  {
    name: 'identifier',
    value: 'canaryDeployment'
  },
  {
    name: 'name',
    value: 'canaryDeployment'
  },
  {
    name: 'timeout',
    value: '10m'
  },
  {
    name: 'type',
    value: 'K8sCanaryDeploy'
  },
  {
    name: 'type',
    value: 'percentage'
  },
  {
    name: 'identifier',
    value: 'canaryDeployment'
  },
  {
    name: 'name',
    value: 'canaryDeployment'
  },
  {
    name: 'timeout',
    value: '10m'
  },
  {
    name: 'type',
    value: 'K8sCanaryDeploy'
  },
  {
    name: 'type',
    value: 'percentage'
  },
  {
    name: 'identifier',
    value: 'canaryDeployment'
  },
  {
    name: 'name',
    value: 'canaryDeployment'
  },
  {
    name: 'timeout',
    value: '10m'
  },
  {
    name: 'type',
    value: 'K8sCanaryDeploy'
  },
  {
    name: 'type',
    value: 'percentage'
  },
  {
    specs: [{ name: 'spec1', value: 'value1' }]
  },
  {
    specs: [
      {
        name: 'spec2',
        value: 'value2'
      }
    ]
  }
]

export default function ExecutionDetailsPage() {
  return (
    <Tabs variant="navigation" defaultValue={ExecutionTab.LOG}>
      {/* tab height */}
      <TabsList>
        <TabsTrigger value={ExecutionTab.SUMMARY}>Summary</TabsTrigger>
        {/* Need to manually adjust height to make bottom border align with parent */}
        <TabsTrigger className="h-full" value={ExecutionTab.LOG}>
          Logs
        </TabsTrigger>
        <TabsTrigger value={ExecutionTab.INPUT}>Inputs</TabsTrigger>
        <TabsTrigger value={ExecutionTab.POLICY}>Policy Evaluations</TabsTrigger>
        <TabsTrigger value={ExecutionTab.ARTIFACT}>Artifacts</TabsTrigger>
        <TabsTrigger value={ExecutionTab.TEST}>Tests</TabsTrigger>
        <TabsTrigger value={ExecutionTab.SECURITY}>Security Tests</TabsTrigger>
      </TabsList>
      <TabsContent value={ExecutionTab.SUMMARY} />
      <TabsContent value={ExecutionTab.LOG}>
        {/**
         * @TODO replace with actual values
         */}
        <ExecutionContextProvider value={keyValueMockData}>
          <ExecutionDetails executionId={1} pipelineId={1} />
        </ExecutionContextProvider>
      </TabsContent>
    </Tabs>
  )
}
