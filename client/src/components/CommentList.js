import * as React from 'react';
import { useState, useContext } from "react";
import { Accordion, AccordionSummary, AccordionDetails, List, Stack, Typography  } from '@mui/material';
import Comment from "./Comment";


function CommentList({ comments, deleteJobComment }) {
    const [expanded, setExpanded] = useState('comment-panel');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

   const commentArray = comments.map(comment => <Comment key={`comment-${comment.id}`} comment={comment} deleteJobComment={ deleteJobComment } /> )

    return (
        <Accordion expanded={expanded === 'comment-panel'} onChange={handleChange('comment-panel')}>
        <AccordionSummary aria-controls="comment-paneld-content" id="comment-paneld-header">
          <Typography>See Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List dense={ true } >
                <Stack spacing={ 3 }>
                    { commentArray }
                </Stack>
            </List>
        </AccordionDetails>
      </Accordion>
        
    )

};

export default CommentList;
