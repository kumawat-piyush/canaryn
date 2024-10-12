import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import Editor, { Monaco, useMonaco, loader } from '@monaco-editor/react'
import { useTheme } from '../hooks/useTheme'
import { ThemeDefinition } from '../types/themes'

loader.config({ monaco })

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  selectOnLineNumbers: true,
  readOnly: true
}

export interface BlameEditorProps<T> {
  code: string
  language: string
  themeConfig?: { rootElementSelector?: string; defaultTheme?: string; themes?: ThemeDefinition[] }
}

export function BlameEditor<T>(props: BlameEditorProps<T>): JSX.Element {
  const { code, language, themeConfig } = props
  const monaco = useMonaco()
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | undefined>()

  const monacoRef = useRef<typeof monaco>()

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = editor
    monacoRef.current = monaco

    editor.setValue(code)

    setEditor(editor)

    ///////

    var viewZoneId = null
    editor.changeViewZones(function (changeAccessor) {
      var domNode = document.createElement('div')
      // domNode.style.background = "green";

      domNode.style.borderTop = '1px solid red'
      domNode.style.whiteSpace = 'none'
      domNode.style.marginTop = '10px'
      // domNode.style.marginBottom = "10px";

      viewZoneId = changeAccessor.addZone({
        afterLineNumber: 3,
        heightInPx: 20,
        domNode: domNode
      })

      var domNode = document.createElement('div')
      // domNode.style.background = "green";

      domNode.style.borderTop = '1px solid red'
      domNode.style.whiteSpace = 'none'
      domNode.style.marginTop = '10px'
      // domNode.style.marginBottom = "10px";

      viewZoneId = changeAccessor.addZone({
        afterLineNumber: 6,
        heightInPx: 20,
        domNode: domNode
      })
    })

    ///////
  }

  useEffect(() => {
    editor?.setValue(code)
  }, [code])

  const { theme } = useTheme({ monacoRef, themeConfig, editor })

  return <Editor language={language} theme={theme} options={defaultOptions} onMount={handleEditorDidMount} />
}
