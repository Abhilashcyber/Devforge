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
    const question_heading = "Two sum"
    const question_id = "1"
    const question_difficulty = "hard"
    const description = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
    const exampleList = [
        {
            "input": [2, 7, 11, 15],
            "output": [0, 1],
            "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
            "input": [3, 2, 4],
            "output": [1, 2],
            "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
        },
        {
            "input": [3, 3],
            "output": [0, 1],
            "explanation": "Because nums[0] + nums[1] == 6, we return [0, 1]."
        }
    ]

    const constraints = [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
    ]

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
