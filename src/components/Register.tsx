import React, { useState } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import CustomSnackBar from './CustomSnackBar';
import { createPlaygroundInDb, createUserInDb } from '../db';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackProps,setSnackProps] = React.useState<any>({snackMessage: "Default", snackStatus:false, fileCreated: false});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        console.log('User registered:', user);
        createUserInDb(user,email,fullName);
        createPlaygroundInDb(user.uid);
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSnackProps({snackMessage: "User registered successfully", snackStatus:true, fileCreated: true});

      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSnackProps({snackMessage: errorCode, snackStatus:true, fileCreated: false});
        console.error('Error registering user:', errorCode, errorMessage);
      });
      
    console.log('Register submitted');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            DevForge
          </Typography>
        </Box>

        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
          Create your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            variant="filled"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // Update state on input change
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            variant="filled"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update state on input change
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
          >
            Register
          </Button>
        </Box>
      </Paper>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/" color="primary">
          Sign in
        </Link>
      </Typography>

      <CustomSnackBar snackProps={snackProps} setSnackProps={setSnackProps}/>
    </Container>
  );
};

export default RegisterPage;
