'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Box, Button, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import { File, FileNode } from '../types/fileTypes'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CustomSnackBar from '../components/CustomSnackBar'
import Navbar from '../components/Navbar'

interface PlaygroundProps { 
  file: File, 
  setClickedFile: React.Dispatch<React.SetStateAction<File | null>>, 
  setFileTree: React.Dispatch<React.SetStateAction<FileNode>>, 
  fileTree: FileNode 
}

const LANGUAGES = [
  { label: 'Python', value: 'python', defaultCode: 'print("Hello, World!")' },
  { label: 'JavaScript', value: 'javascript', defaultCode: 'console.log("Hello, World!")' },
  { label: 'C++', value: 'cpp', defaultCode: '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}' },
]

export default function Playground({ file, setClickedFile, setFileTree, fileTree }: PlaygroundProps) {
  const [language, setLanguage] = useState(file.language || 'python')
  const [code, setCode] = useState(file.content || LANGUAGES.find((lang) => lang.value === language)?.defaultCode || '')
  const [input, setInput] = useState(file.input || '')
  const [output, setOutput] = useState(file.output || '')
  const [snackProps,setSnackProps] = useState<any>({snackMessage: "Default", snackStatus:false, fileCreated: false});

  const [user, setUser] = useState<null | any>(null)

  const handleSave = () => {
    file.content = code
    file.input = input
    file.output = output
    console.log('File saved');
    const newFileTree = structuredClone(fileTree);
    setFileTree(newFileTree);
    setSnackProps({snackMessage: "File saved successfully!", snackStatus: true, fileCreated: true});
  }

  const handleGoBack = () => {
    setClickedFile(null)
  };

  const handleRun = () => {
    setOutput(`🧪 Code:\n${code}\n\n📥 Input:\n${input}\n\n⏳ [Execution simulated]`)
  }
  const handleChangeLanguage = (event: any) => {
    const selectedLanguage = event.target.value as string
    setLanguage(selectedLanguage)
    const defaultCode = LANGUAGES.find((lang) => lang.value === selectedLanguage)?.defaultCode || ''
    setCode(defaultCode)
  }
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
          currentPage="Playground"
          setCurrentPage={() => {}}
          user={null}
          setUser={() => {}}
        />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#333',
              color: '#fff',
              padding: '8px 16px',
            }}
          >
            <Box>
              <Button onClick={handleGoBack}><ArrowBackIosIcon /></Button>
              <Select
                value={language}
                onChange={(event, child) => { return setLanguage((event.target as HTMLInputElement).value)}}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: '#424242',
                  color: 'white',
                  borderRadius: 1,
                  '.MuiSvgIcon-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <Tooltip title={"Save code"}><IconButton color='success' onClick={handleSave}><SaveIcon /></IconButton></Tooltip>
              <Tooltip title={!user ? 'Login to run code' : ''}>
                <span>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRun}
                    disabled={!user}
                  >
                    ▶️ Run Code
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Editor
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{ minimap: { enabled: false } }}
              width="100%"
              height="100%"
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
          <TextField
            fullWidth
            label="Standard Input"
            multiline
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Output"
            multiline
            rows={8}
            value={output}
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Box>

      <CustomSnackBar snackProps={snackProps} setSnackProps={setSnackProps}/>
    </Box>
  )
}
