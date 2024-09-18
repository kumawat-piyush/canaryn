import {
  IFormDefinition,
  IInputDefinition,
  arrayToObjectOutputTransformer,
  objectToArrayInputTransformer,
  shorthandObjectInputTransformer,
  shorthandObjectOutputTransformer,
  unsetEmptyArrayOutputTransformer,
  unsetEmptyObjectOutputTransformer,
  unsetEmptyStringOutputTransformer
} from '@harnessio/forms'
import { InputConfigType, InputType } from '../../components/form-inputs/types'

type IInputConfigWithConfig = IInputDefinition & InputConfigType

const inputs: IInputConfigWithConfig[] = [
  {
    inputType: InputType.text,
    path: 'name',
    label: 'Name',
    outputTransform: unsetEmptyStringOutputTransformer()
  },
  {
    inputType: InputType.select,
    path: 'run.shell',
    label: 'Shell',
    inputConfig: {
      options: [
        { label: 'Sh', value: 'sh' },
        { label: 'Bash', value: 'bash' },
        { label: 'Powershell', value: 'powershell' },
        { label: 'Pwsh', value: 'pwsh' },
        { label: 'Python', value: 'python' }
      ]
    }
  },
  {
    inputType: InputType.textarea,
    path: 'run.script',
    label: 'Script',
    required: true,
    inputTransform: shorthandObjectInputTransformer('run'),
    outputTransform: shorthandObjectOutputTransformer('run')
  },
  {
    inputType: InputType.group,
    path: '',
    label: 'Container',
    inputs: [
      {
        inputType: InputType.text,
        path: 'run.container.image',
        label: 'Image',
        outputTransform: unsetEmptyStringOutputTransformer()
      },
      {
        inputType: InputType.select,
        path: 'run.container.pull',
        label: 'Pull',
        inputConfig: {
          options: [
            { label: 'Always', value: 'always' },
            { label: 'Never', value: 'never' },
            { label: 'If not exists', value: 'if-not-exists' }
          ]
        }
      },
      {
        inputType: InputType.text,
        path: 'run.container.entrypoint',
        label: 'Entrypoint',
        outputTransform: unsetEmptyStringOutputTransformer()
      },
      {
        inputType: InputType.text,
        path: 'run.container.network',
        label: 'Network',
        outputTransform: unsetEmptyStringOutputTransformer()
      },
      {
        inputType: InputType.text,
        path: 'run.container.network-mode',
        label: 'Network mode',
        outputTransform: unsetEmptyStringOutputTransformer()
      },
      {
        inputType: InputType.boolean,
        path: 'run.container.privileged',
        label: 'Privileged'
      },
      {
        inputType: InputType.text,
        path: 'run.container.user',
        label: 'User',
        outputTransform: unsetEmptyStringOutputTransformer()
      },
      {
        inputType: InputType.group,
        path: 'run.container.credentials',
        label: 'Credentials',
        inputs: [
          {
            inputType: InputType.text,
            path: 'run.container.credentials.username',
            label: 'Username',
            outputTransform: unsetEmptyStringOutputTransformer()
          },
          {
            inputType: InputType.text,
            path: 'run.container.credentials.password',
            label: 'Password',
            outputTransform: unsetEmptyStringOutputTransformer()
          }
        ],
        outputTransform: unsetEmptyObjectOutputTransformer()
      }
    ]
  },
  {
    inputType: InputType.list,
    path: 'run.env',
    label: 'Environment',
    inputConfig: {
      layout: 'grid',
      inputs: [
        {
          inputType: InputType.text,
          relativePath: 'key',
          label: 'Key',
          outputTransform: unsetEmptyStringOutputTransformer()
        },
        {
          inputType: InputType.text,
          relativePath: 'value',
          label: 'Value',
          outputTransform: unsetEmptyStringOutputTransformer()
        }
      ]
    },
    inputTransform: objectToArrayInputTransformer(),
    outputTransform: arrayToObjectOutputTransformer({ unsetIfEmpty: true })
  },
  {
    inputType: InputType.list,
    path: 'run.report',
    label: 'Report',
    description: 'Report uploads reports at the provided paths',
    inputConfig: {
      layout: 'grid',
      inputs: [
        {
          inputType: InputType.select,
          relativePath: 'type',
          label: 'Type',
          inputConfig: {
            options: [
              { label: 'junit', value: 'junit' },
              { label: 'xunit', value: 'xunit' },
              { label: 'nunit', value: 'nunit' }
            ]
          }
        },
        {
          inputType: InputType.text,
          relativePath: 'path',
          label: 'Path'
        }
      ]
    },
    outputTransform: unsetEmptyArrayOutputTransformer()
  }
]

export const runStepFormDefinition: IFormDefinition<InputConfigType> = {
  inputs
}
