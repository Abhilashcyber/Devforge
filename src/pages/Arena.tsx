import React, { useState } from 'react'
import { Box, Button, Typography, Card, CardContent } from '@mui/material'
import Navbar from '../components/Navbar'
import QuestionSetup from '../components/QuestionSetup'

export default function Arena() {
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('Arena');
  const [showQuestion, setShowQuestion] = useState(false);

  const challenges = [
    { id: 1, name: 'Sorting Challenge', description: 'Sort the given array of numbers.' },
    { id: 2, name: 'Binary Search Challenge', description: 'Implement binary search.' },
  ]

  const handleQuestionSelect = () =>{
    setShowQuestion(true);
  }

  return (
    <>
    {!showQuestion ?
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          user={user}
          setUser={setUser}
        />

        <Box sx={{ display: 'flex', flex: 1, padding: 2 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Arena
            </Typography>
            {challenges.map((challenge) => (
              <Card key={challenge.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{challenge.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {challenge.description}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleQuestionSelect}>
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>:
      <QuestionSetup setShowQuestion={setShowQuestion}/>}
    </>
  )
}
