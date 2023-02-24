import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

export default function JobItem({ job }) {

  // Show loading if job is null
  if(!job) { return <h2>Loading...</h2> }
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar alt={ job.title } src={ "https://logo.clearbit.com/google.com" } />
        }
        title={ job.title }
        subheader={ "to fill in" }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>{ job.title }</b> is consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna. <b>See tips below.</b>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="read more" href={"/jobs-needed/" + job.id }>
          <ReadMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}