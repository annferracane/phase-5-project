import * as React from 'react';
import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, List, Stack, Typography  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comment from "./Comment";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';



function CommentList({ comments, deleteJobComment }) {
    const [expanded, setExpanded] = useState('comment-panel');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

   const commentArray = comments.map(comment => <Comment key={`comment-${comment.id}`} comment={comment} deleteJobComment={ deleteJobComment } /> )

    return (
        <Accordion expanded={expanded === 'comment-panel'} onChange={handleChange('comment-panel')}>
            <AccordionSummary aria-controls="comment-paneld-content" id="comment-paneld-header">
                <Typography
                    component="h5"
                    variant="h6"
                >
                    See Comments
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                { expanded ? <ExpandMoreIcon /> : <MenuOpenIcon /> }
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
