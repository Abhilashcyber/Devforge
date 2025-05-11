import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(prev => !prev);

  const handleLogin = (e:any) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#1e1e2f',
          color: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {/* Replace with your actual logo */}
          <Typography variant="h4" fontWeight="bold" color="primary">
            DevForge
          </Typography>
        </Box>

        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          Sign in to your account
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            variant="filled"
            slotProps={{
              input: {
                style: { backgroundColor: '#2c2c3e', color: '#fff' },
              },
              inputLabel: { style: { color: '#ccc' } },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end" sx={{ color: '#ccc' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { backgroundColor: '#2c2c3e', color: '#fff' },
              },
              inputLabel: { style: { color: '#ccc' } },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#4c8bf5',
              '&:hover': { backgroundColor: '#3b72d1' },
              fontWeight: 'bold',
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register" color="primary">
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
