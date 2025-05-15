import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

interface TestCase {
  input: string;
  output: string;
}

interface TestCasesProps {
  testCases: TestCase[];
}

export default function TestCases({ testCases }: TestCasesProps) {
  const [testCaseIndex, setTestCaseIndex] = React.useState<number>(0);

  React.useEffect(() => {
    setTestCaseIndex(0); // reset when testCases change
  }, [testCases]);

  const handleTestCaseChange = (index: number) => {
    setTestCaseIndex(index);
  };

  if (testCases.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No test cases available.</Typography>
      </Box>
    );
  }

  const testCase = testCases[testCaseIndex];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Test case selector */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
        sx={{ height: '8vh', bgcolor: '#424242', p: 2, overflowX: 'auto' }}
      >
        {testCases.map((_, i) => (
          <Button
            key={i}
            variant="contained"
            color="success"
            onClick={() => handleTestCaseChange(i)}
            disabled={i === testCaseIndex}
          >
            Test Case {i + 1}
          </Button>
        ))}
      </Box>

      {/* Test case display */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#424242',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: 'white',
          }}
        >
          <Typography variant="h5">
            Test Case {testCaseIndex + 1}
          </Typography>
          <TextField
            label="Input"
            value={testCase.input}
            InputProps={{ readOnly: true }}
            fullWidth
            multiline
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiInputBase-root': { color: 'white' },
            }}
          />
          <TextField
            label="Expected Output"
            value={testCase.output}
            InputProps={{ readOnly: true }}
            fullWidth
            multiline
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiInputBase-root': { color: 'white' },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
