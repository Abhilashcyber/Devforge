import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

interface TestCase {
  input: string;
  output: string;
}

export default function TestCases() {
  const testCases: TestCase[] = [
    { input: 'input1', output: 'output1' },
    { input: 'input2', output: 'output2' },
    { input: 'input3', output: 'output3' },
    { input: 'input4', output: 'output4' },
  ];

  const [testCase, setTestCase] = React.useState<TestCase>(testCases[0]);
  const [testCaseIndex, setTestCaseIndex] = React.useState<number>(0);

  const handleTestCaseChange = (index: number) => {
    setTestCase(testCases[index]);
    setTestCaseIndex(index);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Test case selector */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        sx={{ height: '8vh', bgcolor: '#424242', p: 2 }}
      >
        {testCases.map((t, i) => (
          <Button
            key={i}
            variant="contained"
            color="success"
            sx={{ mb: 1 }}
            onClick={() => handleTestCaseChange(i)}
            disabled={i === testCaseIndex}
          >
            <Typography variant="body1" color="white">
              Test Case {i + 1}
            </Typography>
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
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
          />
          <TextField
            label="Output"
            value={testCase.output}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{ input: { color: 'white' }, label: { color: 'white' } }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
