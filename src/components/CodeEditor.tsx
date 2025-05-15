import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { useRef, useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const LANGUAGES = [
  { label: 'Python', value: 'python', defaultCode: 'print("Hello, World!")' },
  { label: 'JavaScript', value: 'javascript', defaultCode: 'console.log("Hello, World!")' },
  {
    label: 'C++',
    value: 'cpp',
    defaultCode: '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}',
  },
];

export default function CodeEditor() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(
    LANGUAGES.find((lang) => lang.value === language)?.defaultCode || ''
  );
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<any>(null);
  const containerRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        requestAnimationFrame(() => {
          editorRef.current.layout();
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const runCode = async (code: string, language: string, input: string) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/execute/', {
        code,
        language,
        input,
      });
      const { stdout, stderr, error } = res.data;
      if (error) {
        setOutput(`❌ Error: ${error}`);
      } else {
        setOutput(`${stdout || ''}${stderr || ''}`);
      }
    } catch (err: any) {
      setOutput(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} ref={containerRef}>
      {/* Header Controls */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{
          pl: 3,
          pr: 3,
          pt: 1.5,
          pb: 1.5,
          bgcolor: '#424242',
        }}
      >
        <Select
          value={language}
          onChange={(event) => {
            const newLang = event.target.value;
            setLanguage(newLang);
            const defaultCode =
              LANGUAGES.find((l) => l.value === newLang)?.defaultCode || '';
            setCode(defaultCode);
          }}
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

        <Box>
          <Tooltip title="Save code">
            <IconButton color="success" onClick={() => {}}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => runCode(code, language, input)}
            disabled={loading}
          >
            {loading ? 'Running...' : '▶️ Run Code'}
          </Button>
        </Box>
      </Box>

      {/* Code Editor */}
      <Box sx={{ flexGrow: 1 }}>
        <Editor
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 16,
            automaticLayout: true,
          }}
          width="100%"
          height="100%"
          onMount={handleEditorDidMount}
        />
      </Box>
    </Box>
  );
}
