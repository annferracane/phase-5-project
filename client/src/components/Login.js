import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";
import { ProfileContext } from "../context/profile";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar,Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ActionAlerts from './ActionAlerts';
import Copyright from './Copyright';

function Login({ updateContractorProfile }) {
  // State and other variables
  const { setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);
  const [severity, setSeverity] = useState();
  const [alertMessages, setAlertMessages] = useState([]);
  const history = useHistory();
  const theme = createTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handles form submit
  function handleSubmit(e){
    e.preventDefault();

    const user = {
        email: email,
        password: password
    };
    
    // Logs in user and creates session
    fetch(`/login`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    .then(res => {
        if(res.ok){
            res.json().then(user => {
                setUser(user);
                setProfile(user.profile ? user.profile : null);
                updateContractorProfile(user.contractor_profile ? user.contractor_profile : null);
            })
            .then(user.contractor_profile ? history.push(`/contractor-dashboard`) : history.push(`/dashboard`));
        } else {
            res.json().then(json => {
              setSeverity("error");
              setAlertMessages([[0, json.errors]]);
            })
        }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?home)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <ActionAlerts messages={alertMessages} severity={severity}/>
            <Box component="form" noValidate onSubmit={ handleSubmit } sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={ email } onChange={ handleChange }
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={ password } onChange={ handleChange }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;