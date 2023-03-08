import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { Avatar, Box, Button, Card, ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText } from '@mui/material';

function Comment({ comment, deleteJobComment }) {
    // State
    const { user } = useContext(UserContext);
    const [userId] = useState(user ? user.id : null);

    // Delete comment handler
    const handleDelete = () => {
        fetch(`/users/${user.id}/job_comments/${comment.id}`, {
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

    // Creates a delete button on the comment (will later only show if the user is the creator of the comment)
    const deleteButton = (
        <Button variant="contained" onClick={ handleDelete }>Delete</Button>
    );

   // Show loading if comment is null
   if(!comment) { return <h3>Loading...</h3> }

    return (
        <Card sx={{ flex: 1 }}>
            <ListItem sx={{ minHeight: 80 }}>
                <ListItemAvatar style={{display:'flex', justifyContent:'center'}}>
                <Avatar sx={{ mt: 1, mb: 2 }} alt={ comment.user_first_name } src={ comment.user_profile_image } />
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
                        { comment.user_id === userId ? deleteButton : null }
                    </Box>
                </ListItemSecondaryAction>
            </ListItem>
        </Card>
    );
};

export default Comment;
