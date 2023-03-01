import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import LaborTags from './LaborTags';

export default function JobItem({ job }) {

  // Show loading if job is null
  if(!job) { return <h2>Loading...</h2> }

  const job_timeline_amended = (
    <><b>Needed: </b> {job.timeline}</>
  )
  
  return (
    <Link to={`/job/${job.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1'
      }}>
        <CardHeader
          avatar={
            <Avatar alt={ job.title } src={ "https://logo.clearbit.com/google.com" } />
          }
          title={ job.title }
          subheader={ job_timeline_amended }
        />
        <CardContent>
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary">
            { job.description }
          </Typography>
          <LaborTags laborTags={job.labor_categories} deleteLaborTag={ null } />
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="read more" href={"/jobs-needed/" + job.id }>
            <ReadMoreIcon />
          </IconButton> */}
        </CardActions>
      </Card>
    </Link>
  );
}