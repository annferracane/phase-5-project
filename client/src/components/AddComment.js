import * as React from 'react';
import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ActionAlerts from './ActionAlerts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function AddComment({ job }) {
    const { user, setUser } = useContext(UserContext);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const theme = createTheme();

    const [formData, setFormData] = useState({
        comment_text: ''
      });
      

    const { comment_text } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const comment = {
          job_id: job.id,
          comment: comment_text
      };
    
      fetch(`/jobs/${job.id}/job_comments`,{ 
        method: 'POST', 
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(comment)
      })
      .then(res => {
          if(res.ok){
              res.json().then(comment => {
                setFormData({
                    comment_text: ''
                  });
                  // add comment to client
              })
          } else {
              res.json().then(json => {
                setSeverity("error");
                setAlertMessages(Object.entries(json.errors));
            });
          }
      })
      };



    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <ActionAlerts messages={alertMessages} severity={severity}/>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="comment"
                                label="Comment"
                                name="comment_text"
                                autoComplete="comment"
                                value={ comment_text }
                                onChange={ handleChange }
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Add Comment
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )

}

export default AddComment;