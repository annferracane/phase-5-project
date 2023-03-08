import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";
import { Avatar, Box, Button, Card, CardHeader, CardContent, CardActions, Stack, Typography } from '@mui/material';
import EditJobDialog from './EditJobDialog';
import LaborTags from './LaborTags';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PanToolIcon from '@mui/icons-material/PanTool';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import LaunchIcon from '@mui/icons-material/Launch';

function JobItem({ job, jobLaborCategories, addJob, deleteJob, editJob, editJobDetailDisplay, hideSeeJobButton, contractorProfile, releaseJob }) {
  // State
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [isAccepted, setIsAccepted] = useState(job.is_accepted);

  // Handle job delete
  const handleDelete = () => {    
    fetch(`/jobs/${job.id}`, { // need this to be publically available 
      method: 'DELETE',
      headers:{'Content-Type': 'application/json'}
    })
    .then(res => {
        if(res.ok){
          deleteJob(job.id);
          history.push(`/dashboard`);
        } else {
          res.json().then(json => {
            console.log(json.errors);
          });
        }
    });
  }

  // Handle accept/release job actions
  const handleAcceptRelease = (e) => {
    const acceptedVal = e.target.value === 'release' ? false : true;
    const contractor_id = e.target.value === 'release' ? null : contractor_id;

    const jobUpdate = {
      is_accepted: acceptedVal,
      contractor_profile_id: contractor_id
    };

    fetch(`/jobs/${job.id}`, { 
      method: 'PATCH', 
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(jobUpdate)
    })
    .then(res => {
        if(res.ok){
          console.log("success");
          if(acceptedVal) {
            setIsAccepted(true); 
            deleteJob(job.id);
          } else {
            setIsAccepted(false);
            addJob(job);
            releaseJob(job);
          }
        } else {
          res.json().then(json => {
            console.log(json.errors);
          });
        }
    });
  }

  // Accept button
  const acceptButton = (
    <Button variant="outlined" color="success" value="accept" startIcon={<PanToolIcon />} onClick={handleAcceptRelease}>
      Accept
    </Button>
  );

  // Release Button
  const releaseButton = (
    <Button variant="outlined" color="warning" value="release" startIcon={<DoNotTouchIcon />} onClick={handleAcceptRelease}>
      Release
    </Button>
  );

  // Logic to display correct button based on job's status
  const acceptReleaseButtons = (
    <>
      { isAccepted ? releaseButton : acceptButton }
    </>
  );

  // Logic to render edit/delete buttons based on user login
  const editDeleteButtons = (
    <>
      { isAccepted ? releaseButton : null }
      <EditJobDialog job={ job } editJob={ editJob } editJobDetailDisplay={ editJobDetailDisplay }/>
      <Button variant="outlined" color="error" startIcon={<DeleteForeverIcon />} onClick={ handleDelete }>
        Delete
      </Button>
    </>
  );

  // Renders "see job" button
  const seeJobButton = (
    <Button variant="outlined" color="primary" startIcon={<LaunchIcon />} onClick={() => history.push(`/job/${job.id}`)} >
      See Job
    </Button>
  );
  

  // Show loading if job is null
  if(!job ) { return <h2>Loading...</h2> }

  // Job timeline
  const job_timeline_amended = (
    <><b>Needed: </b> {job.timeline}</>
  )
  
  return (
      <Card sx={{ maxWidth: 700, minHeight: 100 }}>
        <CardHeader
          avatar={<Avatar alt={ job.title } src={ job.property.user_profile_image } />}
          title={ job.title }
          subheader={ job_timeline_amended }
        />
        <CardContent>
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary">
            { job.description }
          </Typography>
          <LaborTags laborTags={jobLaborCategories} deleteLaborTag={ null } />
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            { contractorProfile ? acceptReleaseButtons : null }
            { hideSeeJobButton ? null : seeJobButton }
            { user && user.id === job.job_user_id ? editDeleteButtons : null }
          </Stack>
        </CardActions>
      </Card>
  );
}

export default JobItem;