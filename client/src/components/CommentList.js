import * as React from 'react';
import { List } from '@mui/material';
import Comment from "./Comment";

function CommentList({ comments }) {

    const commentArray = comments.map(comment => <Comment key={`comment-${comment.id}`} comment={comment} />)

    // Show loading if jobs is null
   if(!comments) { return <h2>Loading...</h2> }

    return (
        <List dense={ true }>
            { commentArray }
        </List>
    )

};

export default CommentList;
