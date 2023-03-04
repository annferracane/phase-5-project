import * as React from 'react';
import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import ActionAlerts from './ActionAlerts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddComment({ job, addJobComment }) {
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
                  // add job comment to client
                  addJobComment(comment);
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
        <Card>
            <Box component="form" noValidate onSubmit={ handleSubmit } sx={{ p: "15px" }}> 
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Avatar />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            multiline
                            minRows={3}
                            placeholder="Add a comment"
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
                    <Grid item xs>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default AddComment;