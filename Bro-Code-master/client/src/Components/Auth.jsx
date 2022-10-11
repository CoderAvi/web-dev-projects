import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { Grid, Button, TextField, Typography, Paper, styled } from '@mui/material';
import { Box } from '@mui/system';

import signInImage from '../assets/signup.jpg'

const cookies = new Cookies();

const FormWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    alignItems: 'center',
    justifyContent: 'center'
}))

const PaperBox = styled(Paper)(() => ({
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2rem',
}))

const headingStyle = {
    color: '#2F0662',
    fontSize: '1.5em',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 900,
    margin: '24px 0'
}

const SubmitButton = styled(Button)(({ theme }) => ({
    border: '1px solid primary',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: '500',
    padding: '0.7rem 1.2rem',
    outline: 'none',
    cursor: 'pointer',
    transition: '0.3s ease',
    color: '#fff',
    backgroundColor: theme.palette.primary,
    marginTop: '1rem',
    boxShadow: 'none',
    borderRadius: '8px'
}))

const initialState = {
    fullName: '',
    username: '',
    phoneNumber: '',
    avatarURL: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {

    const [form, setForm] = useState(initialState)
    const [isSignUp, setIsSignUp] = useState(true)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, phoneNumber, avatarURL, password } = form;
        console.log('Submit');
        //  for local host server
        const URL = 'http://localhost:5001/auth';

        const responseData = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
            fullName: form.fullName, username, password, phoneNumber, avatarURL
        })
        const { data: { token, userId, hashedPassword, fullName } } = responseData;
        console.log('Start set cookies');
        cookies.set('token', token)
        cookies.set('userId', userId)
        cookies.set('username', username)
        cookies.set('fullName', fullName)

        if (isSignUp) {
            cookies.set('hashedPassword', hashedPassword)
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
        }
        console.log('cookies set');
        window.location.reload();
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={5}>
                <FormWrapper sx={{ height: 'calc(100% - 4rem)', padding: { xs: '2rem 0.5rem', sm: '2rem' } }}>
                    <PaperBox >
                        <Typography variant="h5" component="p" sx={headingStyle}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

                        <form onSubmit={handleSubmit} style={{ paddingTop: '1.5rem' }}>
                            {isSignUp && (
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Full Name"
                                    size='small'
                                    type="text"
                                    onChange={handleChange}
                                    name='fullName'
                                    sx={{ width: '85%', margin: '13px 0' }}
                                    placeholder='Full Name'
                                />
                            )}
                            <TextField
                                required
                                id="outlined-basic"
                                label="User Name"
                                size='small'
                                type="text"
                                onChange={handleChange}
                                name='username'
                                sx={{ width: '85%', margin: '13px 0' }}
                                placeholder='User Name'
                            />
                            {isSignUp && (
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Phone Number"
                                    size='small'
                                    onChange={handleChange}
                                    type="number"
                                    name='phoneNumber'
                                    sx={{ width: '85%', margin: '13px 0' }}
                                    placeholder='Phone Number'
                                />
                            )}
                            {isSignUp && (
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Avatar URL"
                                    size='small'
                                    onChange={handleChange}
                                    type="text"
                                    name='avatarURL'
                                    sx={{ width: '85%', margin: '13px 0' }}
                                    placeholder='Avatar URL'
                                />
                            )}
                            <TextField
                                required
                                id="outlined-basic"
                                label="Password"
                                size='small'
                                type="password"
                                onChange={handleChange}
                                name='password'
                                sx={{ width: '85%', margin: '13px 0' }}
                                placeholder='Password'
                            />
                            {isSignUp && (
                                <TextField
                                    required
                                    id="outlined-basic"
                                    label="Confirm Password"
                                    size='small'
                                    onChange={handleChange}
                                    type="password"
                                    name='confirmPassword'
                                    sx={{ width: '85%', margin: '13px 0' }}
                                    placeholder='Confirm Password'
                                />
                            )}
                            <div>
                                <SubmitButton type='submit' variant="contained" color='primary'>Submit</SubmitButton>
                            </div>
                        </form>
                        <Typography variant="subtitle2" sx={{ marginTop: '1rem' }} component="p">
                            {isSignUp
                                ? "Already have an account?"
                                : "Don't have an account?"
                            }
                            <span onClick={switchMode}
                                style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 900, color: '#2F0662', cursor: 'pointer' }}>
                                {isSignUp
                                    ? ' Sign In'
                                    : ' Sign Up'
                                }
                            </span>
                        </Typography>

                    </PaperBox>
                </FormWrapper>
            </Grid>
            <Grid item md={7} style={{ height: '99.50%' }} sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src={signInImage} alt="sign in" style={{ width: '100%', height: '100%' }} />
            </Grid>
        </Grid>
    )
}

export default Auth