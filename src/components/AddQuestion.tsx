import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Divider,
} from '@mui/material';
import { addQuestion } from '../db';

interface AddQuestionProps {
  setShowAddQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  refreshQuestions: () => void;
}

export default function AddQuestion({
  setShowAddQuestion,
  refreshQuestions,
}: AddQuestionProps) {
  const [formData, setFormData] = useState({
    question_id: '',
    question_heading: '',
    question_difficulty: '',
    description: '',
    starter_code: '',
    user_code: '',
    code_verify: {},
  });

  const [constraints, setConstraints] = useState<string[]>([]);
  const [constraintInput, setConstraintInput] = useState('');

  const [examples, setExamples] = useState<
    { input: string; output: string; explanation: string }[]
  >([]);
  const [exampleInput, setExampleInput] = useState({
    input: '',
    output: '',
    explanation: '',
  });

  const [testCases, setTestCases] = useState<
    { input: string; output: string }[]
  >([]);
  const [testCaseInput, setTestCaseInput] = useState({ input: '', output: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addConstraint = () => {
    if (constraintInput.trim()) {
      setConstraints([...constraints, constraintInput.trim()]);
      setConstraintInput('');
    }
  };

  const addExample = () => {
    const { input, output, explanation } = exampleInput;
    if (input && output && explanation) {
      setExamples([...examples, exampleInput]);
      setExampleInput({ input: '', output: '', explanation: '' });
    }
  };

  const addTestCase = () => {
    const { input, output } = testCaseInput;
    if (input && output) {
      setTestCases([...testCases, testCaseInput]);
      setTestCaseInput({ input: '', output: '' });
    }
  };

  const handleAdd = async () => {
    const isValid =
      formData.question_id &&
      formData.question_heading &&
      formData.question_difficulty &&
      formData.description &&
      formData.starter_code &&
      constraints.length > 0 &&
      examples.length > 0 &&
      testCases.length > 0;

    if (!isValid) {
      alert('Please fill all required fields.');
      return;
    }

    const finalData = {
      ...formData,
      constraints,
      exampleList: examples,
      test_cases: testCases,
    };

    try {
      await addQuestion(finalData);
      alert('Question added!');
      refreshQuestions();
      setShowAddQuestion(false);
    } catch (err) {
      alert('Error adding question');
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Question
      </Typography>

      <TextField
        required
        fullWidth
        label="Question ID"
        name="question_id"
        value={formData.question_id}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        fullWidth
        label="Heading"
        name="question_heading"
        value={formData.question_heading}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        required
        select
        fullWidth
        label="Difficulty"
        name="question_difficulty"
        value={formData.question_difficulty}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
      </TextField>

      <TextField
        required
        fullWidth
        multiline
        minRows={4}
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        required
        fullWidth
        multiline
        minRows={4}
        label="Starter Code"
        name="starter_code"
        value={formData.starter_code}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* Constraints */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Constraints</Typography>
      <Box display="flex" gap={2} sx={{ my: 1 }}>
        <TextField
          label="Add Constraint"
          fullWidth
          value={constraintInput}
          onChange={(e) => setConstraintInput(e.target.value)}
        />
        <Button variant="outlined" onClick={addConstraint}>
          Add
        </Button>
      </Box>
      <ul>
        {constraints.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      {/* Examples */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Examples</Typography>
      <Box display="flex" flexDirection="column" gap={2} sx={{ my: 1 }}>
        <TextField
          label="Example Input"
          fullWidth
          value={exampleInput.input}
          onChange={(e) =>
            setExampleInput({ ...exampleInput, input: e.target.value })
          }
        />
        <TextField
          label="Example Output"
          fullWidth
          value={exampleInput.output}
          onChange={(e) =>
            setExampleInput({ ...exampleInput, output: e.target.value })
          }
        />
        <TextField
          label="Explanation"
          fullWidth
          value={exampleInput.explanation}
          onChange={(e) =>
            setExampleInput({ ...exampleInput, explanation: e.target.value })
          }
        />
        <Button variant="outlined" onClick={addExample}>
          Add Example
        </Button>
        <ul>
          {examples.map((ex, i) => (
            <li key={i}>
              input: {ex.input}, output: {ex.output}, explanation:{' '}
              {ex.explanation}
            </li>
          ))}
        </ul>
      </Box>

      {/* Test Cases */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Test Cases</Typography>
      <Box display="flex" flexDirection="column" gap={2} sx={{ my: 1 }}>
        <TextField
          label="Test Input"
          fullWidth
          value={testCaseInput.input}
          onChange={(e) =>
            setTestCaseInput({ ...testCaseInput, input: e.target.value })
          }
        />
        <TextField
          label="Test Output"
          fullWidth
          value={testCaseInput.output}
          onChange={(e) =>
            setTestCaseInput({ ...testCaseInput, output: e.target.value })
          }
        />
        <Button variant="outlined" onClick={addTestCase}>
          Add Test Case
        </Button>
        <ul>
          {testCases.map((tc, i) => (
            <li key={i}>
              input: {tc.input}, output: {tc.output}
            </li>
          ))}
        </ul>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button variant="contained" onClick={handleAdd}>
          Save Question
        </Button>
        <Button variant="outlined" onClick={() => setShowAddQuestion(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
