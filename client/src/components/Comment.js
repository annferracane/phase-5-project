import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
    Button,
    Stack,
    Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

function Comment( { comment }) {

    // Show loading if comment is null
   if(!comment) { return <h3>Loading...</h3> }

    return (
        <>
            {/* <ListItem component={Link} to={ url }> */}
            <ListItem>
                <ListItemAvatar>
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
                        <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        >
                            {/* { buttonType }
                            <Button variant="contained" href={ buttonHref }>{ buttonText }</Button> */}
                        </Stack>
                    </Box>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </>
    );
};

export default Comment;
