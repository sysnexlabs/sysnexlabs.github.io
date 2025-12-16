import React, { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from '../../contexts/ThemeContext'
import './UvlEditor.css'

// UVL Beispiel-Code - vereinfacht
export const DEFAULT_UVL_EXAMPLE = `namespace Vehicle

features
    Vehicle
        mandatory
            Engine
                alternative
                    GasEngine
                    ElectricMotor
            Transmission
                alternative
                    Manual
                    Automatic
        optional
            AirConditioning
            Navigation

constraints
    ElectricMotor => Automatic
    GasEngine => !ElectricMotor
`

const UVL_EXAMPLES = [
  {
    name: 'Vehicle',
    code: DEFAULT_UVL_EXAMPLE
  },
  {
    name: 'Simple',
    code: `namespace Simple

features
    Root
        mandatory
            FeatureA
            FeatureB
        optional
            FeatureC
`
  }
]

export default function UvlEditor({ onCodeChange }) {
  const [code, setCode] = useState(DEFAULT_UVL_EXAMPLE)
  const [selectedExample, setSelectedExample] = useState('Vehicle')
  const editorRef = useRef(null)
  const { theme } = useTheme()

  // Notify parent of code changes
  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code)
    }
  }, [code, onCodeChange])

  const handleEditorChange = (value) => {
    setCode(value || '')
  }

  const handleExampleChange = (event) => {
    const exampleName = event.target.value
    setSelectedExample(exampleName)
    const example = UVL_EXAMPLES.find(e => e.name === exampleName)
    if (example) {
      setCode(example.code)
    }
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor

    // Store monaco globally for theme updates
    window.monaco = monaco

    // Register UVL language
    monaco.languages.register({ id: 'uvl' })

    // UVL language configuration
    monaco.languages.setLanguageConfiguration('uvl', {
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
      ],
      indentationRules: {
        increaseIndentPattern: /^\s*(features|feature|attributes|constraints|namespace|root).*\{[^}]*$/,
        decreaseIndentPattern: /^\s*\}/
      }
    })

    // UVL syntax highlighting
    monaco.languages.setMonarchTokensProvider('uvl', {
      keywords: [
        'features', 'feature', 'attributes', 'constraints',
        'namespace', 'root', 'abstract', 'optional', 'mandatory',
        'or', 'alternative', 'group', 'card',
        'requires', 'excludes', 'and', 'not'
      ],
      operators: ['=', '==', '!=', '<', '>', '<=', '>=', '&', '|', '!', '=>'],
      tokenizer: {
        root: [
          [/\/\/.*$/, 'comment'],
          [/\/\*[\s\S]*?\*\//, 'comment'],
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string'],
          [/\d+\.\d+/, 'number.float'],
          [/\d+/, 'number'],
          [/features|feature|attributes|constraints|namespace|root/, 'keyword'],
          [/abstract|optional|mandatory/, 'keyword.modifier'],
          [/or|alternative|group|card/, 'keyword.group'],
          [/requires|excludes|and|not/, 'keyword.operator'],
          [/[=+\-*/<>!&|]+/, 'operator'],
          [/[:;.,\[\]{}()]/, 'delimiter'],
          [/[a-zA-Z_$][a-zA-Z0-9_$]*/, 'identifier'],
          [/\s+/, 'white']
        ]
      }
    })

    // Define UVL theme - Dark
    monaco.editor.defineTheme('uvl-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '569cd6' },
        { token: 'keyword.modifier', foreground: '4ec9b0' },
        { token: 'keyword.group', foreground: 'c586c0' },
        { token: 'keyword.operator', foreground: 'd4d4d4' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'comment', foreground: '6a9955' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'operator', foreground: 'd4d4d4' }
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4'
      }
    })
    
    // Define UVL theme - Light
    monaco.editor.defineTheme('uvl-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '0066cc' },
        { token: 'keyword.modifier', foreground: '267f99' },
        { token: 'keyword.group', foreground: '7c3aed' },
        { token: 'keyword.operator', foreground: '000000' },
        { token: 'string', foreground: '008000' },
        { token: 'comment', foreground: '6a9955' },
        { token: 'number', foreground: '098658' },
        { token: 'operator', foreground: '000000' }
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000'
      }
    })

    // Set initial theme based on current theme
    monaco.editor.setTheme(theme === 'light' ? 'uvl-light' : 'uvl-dark')
  }
  
  // Update theme when theme changes
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      const monaco = window.monaco
      monaco.editor.setTheme(theme === 'light' ? 'uvl-light' : 'uvl-dark')
    }
  }, [theme])

  return (
    <div className="uvl-editor try-yourself-editor">
      <div className="uvl-editor-header">
        <h3>UVL Feature Model Editor</h3>
        <div className="uvl-editor-controls example-selector">
          <label htmlFor="uvl-example-select">Example: </label>
          <select
            id="uvl-example-select"
            value={selectedExample}
            onChange={handleExampleChange}
            className="uvl-example-select example-select"
          >
            {UVL_EXAMPLES.map(example => (
              <option key={example.name} value={example.name}>
                {example.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="uvl-editor-container">
        <Editor
          height="100%"
          language="uvl"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={theme === 'light' ? 'uvl-light' : 'uvl-dark'}
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            folding: true,
            lineNumbers: 'on',
            fontSize: 14,
            tabSize: 4,
            automaticLayout: true
          }}
        />
      </div>
    </div>
  )
}

