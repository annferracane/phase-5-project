import * as React from 'react';
import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import {Avatar, Box, Button, Card, Grid, TextField } from '@mui/material';
import ActionAlerts from './ActionAlerts';


function AddComment({ job, addJobComment }) {
    const { user } = useContext(UserContext);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);

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
          comment: comment_text,
          user_id: user.id
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
                    // Add job comment to client
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

    // Show loading if user is null
   if(!user) { return <h2>Loading...</h2> }

    let avatarSrc = "";
    if(user) {
    avatarSrc = <Avatar alt={ "" } src={ "" } />
    if(user.profile) {
        avatarSrc = <Avatar sx={{ mt: 1, mb: 2 }} alt={ user.profile.full_name } src={ user.profile.image } />
    }
    }

    return (
        <>
            <ActionAlerts messages={alertMessages} severity={severity}/>
            <Card>
                <Box component="form" noValidate onSubmit={ handleSubmit } sx={{ p: "15px" }}> 
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            { avatarSrc }
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                multiline
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
                        <Grid item xs={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    )
}

export default AddComment;