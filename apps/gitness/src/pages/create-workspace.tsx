import { useCreateSpaceMutation, OpenapiCreateSpaceRequest } from '@harnessio/code-service-client'
import { CreateWorkspacePage } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export default function CreateWorkspace() {
  const navigate = useNavigate()
  const { addSpace } = useAppContext() // Get the spaces and addSpace function from context

  // Set up the mutation hook with the form data
  const { mutate, isLoading } = useCreateSpaceMutation(
    {},
    {
      onSuccess: data => {
        //onSuccess in react-query has allowed 200-299
        console.log('api response:', data)
        addSpace(data)
        navigate('/') // redirect to the landing page, to let user select the projects
      },
      onError: (error: unknown) => {
        console.error('Error creating space:', error) //temporary error message, no response of the error message from the api call
      }
    }
  )

  const handleFormSubmit = (formData: OpenapiCreateSpaceRequest) => {
    // Trigger the mutation with form data as the request body
    mutate({
      body: {
        identifier: formData.identifier,
        //ui interfaces is not ready for this information
        description: '',
        is_public: false, //temporary set to false
        parent_ref: '' //temporary set to null
      }
    })
  }

  return <CreateWorkspacePage onFormSubmit={handleFormSubmit} isLoading={isLoading} />
}
