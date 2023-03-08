import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { ProfileContext } from "../context/profile";
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import ActionAlerts from './ActionAlerts';

function Profile() {
  // State and other variables
  const { user } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [severity, setSeverity] = useState();
  const [alertMessages, setAlertMessages] = useState([]);
  const [email] = useState(user ? user.email : '');
  const theme = createTheme();
  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: profile ? profile.first_name : "",
    last_name: profile ? profile.last_name : "",
    image: profile ? profile.image : ""
  });

  const { first_name, last_name, image } = formData;
 
  // Change handlers for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Submit handler
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
            setProfile(user.profile);
            if(fetchMethod === "PATCH") {
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