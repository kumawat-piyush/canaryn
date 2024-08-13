import React from 'react'
import PipelineList from '../components/pipeline-list/pipeline-list'

const pipelines = []

export default function PipelineListPage() {
    return <div>
        <PipelineList pipelines={pipelines} />
    </div>
}