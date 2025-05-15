import { Box, Button, Chip, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const difficulty_color = {
  "hard": "error",
  "medium": "warning",
  "easy": "success"
};

interface QuestionProps {
    question:{
        question_id: string,
        question_heading: string,
        question_difficulty: string,
        description: string,
        exampleList: Array<{
            input: any,
            output: any,
            explanation: string
        }>,
        constraints: Array<string>
    };
    setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Question({question, setShowQuestion}: QuestionProps) {
    const {question_heading, question_id, question_difficulty , description, exampleList, constraints} = question;
    const handleGoBack = () =>{
        setShowQuestion(false);
    }
  return (
    <div>
        <Box display={'flex'} flexDirection='row' alignItems='center' justifyContent='space-between' sx={{ mb: 3, mt: 3, ml: 3, mr: 3 }}>
            <Button onClick={handleGoBack}><ArrowBackIcon /></Button>
            <Typography variant='h3'>{question_id}{". "}{question_heading}</Typography>
            <Chip label={question_difficulty[0].toUpperCase() + question_difficulty.slice(1)} color={"error"}></Chip>
        </Box>
        <Typography variant='h4' sx={{ mb: 3, mt: 3, ml: 3 }}>Description:</Typography>
        <Typography variant='h5' color={'text.secondary'} sx={{ mb: 3, mt: 3, ml: 3 }}>
            {description}
        </Typography>
        <Typography variant='h4' sx={{ mb: 3, mt: 3, ml: 3 }}>Examples:</Typography>
        {exampleList.map((example, index) => (
            <Box key={index} sx={{ mb: 3, mt: 3, ml: 3 }}>
                <Typography variant='h5' color={'text.secondary'}>Input: {JSON.stringify(example.input)}</Typography>
                <Typography variant='h5' color={'text.secondary'}>Output: {JSON.stringify(example.output)}</Typography>
                <Typography variant='h5' color={'text.secondary'}>Explanation: {example.explanation}</Typography>
            </Box>
        ))}
        <Typography variant='h4' sx={{ mb: 3, mt: 3, ml: 3 }}>Constraints:</Typography>
        <Box sx={{ mb: 3, mt: 3, ml: 3 }}>
            {constraints.map((constraint, index) => (
                <Typography key={index} variant='h5' color={'text.secondary'}>{constraint}</Typography>
            ))}
        </Box>
    </div>
  )
}
