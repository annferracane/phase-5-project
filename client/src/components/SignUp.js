import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Container, Chip, CssBaseline, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import ActionAlerts from './ActionAlerts';
import Copyright from './Copyright';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

function SignUp() {
  // State and other variables
  const { setUser } = useContext(UserContext);
  const [severity, setSeverity] = useState();
  const [alertMessages, setAlertMessages] = useState([]);
  const history = useHistory();
  const theme = createTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
    // password validation for second field, timepending
  });

  const { email, password } = formData;

  // Google login handler
  const handleGoogleLogin = () => {
    history.push('/auth')
  };

  // Form handler for signup form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
        email: email,
        password: password
    };

    fetch(`/users`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    .then(res => {
        if(res.ok){
            res.json().then(user => {
                setUser(user);
                history.push(`/my-profile`);
            })
        }else {
            res.json().then(json => {
              setSeverity("error");
              setAlertMessages(Object.entries(json.errors));
            });
        }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <ActionAlerts messages={alertMessages} severity={severity}/>
          {/* <Box sx={{ mt: 3, marginBotton: 8 }}>
            <Button
                component={Link}
                startIcon={<GoogleIcon />} 
                onClick={handleGoogleLogin}
                variant="contained"
                >
                Sign Up With Google
            </Button>
          </Box>
          <Box sx={{ mt: 3 }}></Box>
          <Divider style={{width:'100%'}}>
            <Chip label="Or" />
          </Divider> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, alignItems: 'center' }} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={ email } onChange={ handleChange }
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={ password } onChange={ handleChange }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;