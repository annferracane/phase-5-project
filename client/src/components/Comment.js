import * as React from 'react';
import { useContext } from "react";
import {
    Card,
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
    Button,
    Stack
} from '@mui/material';

function Comment( { comment, deleteJobComment }) {

    const handleDelete = () => {
        fetch(`/users/1/job_comments/${comment.id}`,{ // fix dynamic user
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
          })
          .then(res => {
              if(res.ok){
                deleteJobComment(comment.id);
              } else {
                res.json().then(json => {
                  console.log(json.errors);
                });
              }
          })
    }

    const deleteButton = (
        <Button variant="contained" onClick={ handleDelete }>Delete</Button>
    );

    // Show loading if comment is null
   if(!comment) { return <h3>Loading...</h3> }

    return (
        <Card
            sx={{
                minHeight: 60
            }}
        >
            <ListItem>
                <ListItemAvatar style={{display:'flex', justifyContent:'center'}}>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary={ comment.comment }
                />
                <ListItemSecondaryAction>
                    <Box
                        component="span"
                        sx={{
                            marginRight: '1em',
                            color: 'text.primary',
                        }}
                    >   
                        
                        { deleteButton }
                        
                    </Box>
                </ListItemSecondaryAction>
            </ListItem>
            </Card>
    );
};

export default Comment;
