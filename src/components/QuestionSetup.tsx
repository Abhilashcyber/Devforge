import { Box } from '@mui/material';
import React, { useState, useRef } from 'react';
import Question from './Question';
import CodeEditor from './CodeEditor';
import TestCases from './TestCases';
import { Question as QuestionType } from '../types/fileTypes';

interface QuestionSetupProps{
  setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  question: QuestionType | null
}

export default function QuestionSetup({setShowQuestion, question}:QuestionSetupProps) {
  console.log(question)
  const [editorHeight, setEditorHeight] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerHeight = containerRef.current.offsetHeight;
    const offsetY = e.clientY - containerRef.current.getBoundingClientRect().top;
    const newEditorHeight = (offsetY / containerHeight) * 100;
    if (newEditorHeight > 10 && newEditorHeight < 90) {
      setEditorHeight(newEditorHeight);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if(!question){
    return <></>
  }

  return (
    <Box display="flex" sx={{ width: '100%' }}>
      <Box sx={{ width: '50%' }}>
        <Question
          question={question}
          setShowQuestion={setShowQuestion}
        />
      </Box>

      <Box
        ref={containerRef}
        display="flex"
        flexDirection="column"
        sx={{ width: '50%', height: '100vh' }}
      >
        <Box sx={{ height: `${editorHeight}%`, overflow: 'hidden' }}>
          <CodeEditor />
        </Box>

        <Box
          sx={{
            height: '5px',
            backgroundColor: '#ccc',
            cursor: 'row-resize',
            zIndex: 10,
          }}
          onMouseDown={handleMouseDown}
        />

        <Box sx={{ height: `${100 - editorHeight}%`, overflow: 'hidden' }}>
          <TestCases testCases={question?.test_cases || []} />
        </Box>
      </Box>
    </Box>
  );
}
