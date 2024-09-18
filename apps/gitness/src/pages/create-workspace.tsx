import {
  useCreateSpaceMutation,
  OpenapiCreateSpaceRequest,
  CreateSpaceErrorResponse,
  CreateSpaceOkResponse
} from '@harnessio/code-service-client'
import { CreateWorkspacePage } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export default function CreateWorkspace() {
  const navigate = useNavigate()
  const { addSpace } = useAppContext() // Get the spaces and addSpace function from context

  const handleCreateSpaceError = (error: CreateSpaceErrorResponse) => {
    if (error.message) {
      console.error('API Error:', error.message)
      alert(`Error: ${error.message}`)
      if (error.values) {
        console.log('Error Details:', error.values)
      }
    } else {
      //edge case: unknown error
      console.error('An unknown error occurred.')
      alert('An unknown error occurred. Please try again.')
    }
  }

  // Set up the mutation hook with the form data
  const { mutate, isLoading } = useCreateSpaceMutation(
    {},
    {
      onSuccess: (data: CreateSpaceOkResponse) => {
        //onSuccess in react-query has allowed 200-299
        const spaceData = data?.content || data
        addSpace([spaceData])
        navigate('/') // redirect to the landing page, to let user select the projects
      },
      onError: (error: CreateSpaceErrorResponse) => {
        handleCreateSpaceError(error)
      }
    }
  )

  const handleFormSubmit = (formData: OpenapiCreateSpaceRequest) => {
    // Trigger the mutation with form data as the request body
    // console.log('Form Data:', formData)
    mutate({
      body: {
        identifier: formData.identifier || '',
        //ui interfaces is not ready for this information
        description: formData.description || '',
        is_public: formData.is_public ?? false,
        parent_ref: formData.parent_ref || ''
      }
    })
  }

  return <CreateWorkspacePage onFormSubmit={handleFormSubmit} isLoading={isLoading} />
}
