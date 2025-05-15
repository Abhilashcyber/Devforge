import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';
import QuestionSetup from '../components/QuestionSetup';
import AddQuestion from '../components/AddQuestion';
import { Question } from '../types/fileTypes';
import { fetchQuestions } from '../db';

export default function Arena() {
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('Arena');
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions().then((res) => {
      setQuestions(res);
    });
  }, []);

  useEffect(() => {
    if (selectedQuestion) {
      setShowQuestion(true);
    }
  }, [selectedQuestion]);

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(questions[index]);
  };

  return (
    <>
      {!showQuestion && !showAddQuestion ? (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
            setUser={setUser}
          />

          <Box sx={{ display: 'flex', flex: 1, padding: 2 }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Arena</Typography>
                <Button variant="outlined" onClick={() => setShowAddQuestion(true)}>
                  Add Question
                </Button>
              </Box>
              {questions.map((question: Question, idx) => (
                <Card key={question.question_id} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{question.question_heading}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {question.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      fullWidth
                      onClick={() => handleQuestionSelect(idx)}
                    >
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      ) : showAddQuestion ? (
        <AddQuestion
          setShowAddQuestion={setShowAddQuestion}
          refreshQuestions={() => fetchQuestions().then(setQuestions)}
        />
      ) : (
        <QuestionSetup setShowQuestion={setShowQuestion} question={selectedQuestion} />
      )}
    </>
  );
}
