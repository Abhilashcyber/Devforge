import React, { useState } from 'react'
import { Box, Button, Typography, Card, CardContent } from '@mui/material'
import Navbar from '../components/Navbar'

export default function Battleground() {
  const [user, setUser] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState('Battleground')

  const battles = [
    { id: 1, name: 'Battle 1', description: 'Fight with player 1.', timeRemaining: '15:00' },
    { id: 2, name: 'Battle 2', description: 'Fight with player 2.', timeRemaining: '12:30' },
  ]

  return (
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
            Battleground
          </Typography>
          {battles.map((battle) => (
            <Card key={battle.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{battle.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {battle.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time Remaining: {battle.timeRemaining}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} fullWidth>
                  Join Battle
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
