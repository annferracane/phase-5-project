import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';
import ActionAlerts from './ActionAlerts';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Profile({ profile, updateProfile }) {
  const { user } = useContext(UserContext);
  const [severity, setSeverity] = useState();
  const [alertMessages, setAlertMessages] = useState([]);
  const [email, setEmail] = useState(user ? user.email : '');
  const theme = createTheme();
  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: profile ? profile.first_name : "",
    last_name: profile ? profile.last_name : "",
    image: profile ? profile.image : ""
  });

  const { first_name, last_name, image } = formData;

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let fetchMethod = 'POST';
    if(profile) {
      fetchMethod = 'PATCH'
    }
    const userProfile = {
      first_name: first_name,
      last_name: last_name,
      image: image,
      user_id: user.id
  };

  fetch(`/profile`,{
    method: fetchMethod,
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(userProfile)
  })
  .then(res => {
      if(res.ok){
          res.json()
          .then(user => {
            updateProfile(user);
            if(fetchMethod == "PATCH") {
                setSeverity("success");
                setAlertMessages([[0, "Profile Saved!"]]);
            } else { 
                history.push(`/dashboard`)
            }
          })
      }else {
          res.json().then(json => {
            setSeverity("error");
            setAlertMessages(Object.entries(json.errors));
          });
      }
  })
  };

  // Show loading if user is null
  if(!user) { return <h2>Loading...</h2> }

  return (
    <ThemeProvider theme={ theme }>
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
          {profile ? <Avatar alt={profile.full_name} src={profile.image} sx={{ m: 1, width: 56, height: 56 }} /> : null}
          <Typography component="h1" variant="h5">
            { profile ? "Hi " + profile.first_name + "!" :  "Create Profile" }
          </Typography>
          <ActionAlerts messages={alertMessages} severity={severity}/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={ first_name } 
                  onChange={ handleChange }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={ last_name }
                  onChange={ handleChange }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="image"
                  label="Profile Image"
                  name="image"
                  autoComplete="image"
                  value={ image }
                  onChange={ handleChange }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={ handleChange }
                  value={ email }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              { profile ? "Save Changes" : "Create"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Profile;