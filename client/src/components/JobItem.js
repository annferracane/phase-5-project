import * as React from 'react';
import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LaborTags from './LaborTags';
import PanToolIcon from '@mui/icons-material/PanTool';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import EditJobDialog from './EditJobDialog';
import LaunchIcon from '@mui/icons-material/Launch';


function JobItem({ job, jobLaborCategories, addJob, deleteJob, editJob, editJobDetailDisplay, hideSeeJobButton, contractorProfile, releaseJob }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [isAccepted, setIsAccepted] = useState(job.is_accepted);

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

  const handleAcceptRelease = (e) => {

    let acceptedVal = true;
    if (e.target.value === 'release'){
      acceptedVal = false;
    }

    let contractor_id = null;
    if (e.target.value === 'accept'){
      contractor_id = contractorProfile.id;
    }

    const jobUpdate = {
      is_accepted: acceptedVal,
      contractor_profile_id: contractor_id
      // Logic to add contractor id or set to null
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

  const acceptButton = (
    <Button variant="outlined" color="success" value="accept" startIcon={<PanToolIcon />} onClick={handleAcceptRelease}>
      Accept
    </Button>
  );

  const releaseButton = (
    <Button variant="outlined" color="warning" value="release" startIcon={<DoNotTouchIcon />} onClick={handleAcceptRelease}>
      Release
    </Button>
  );

  const acceptReleaseButtons = (
    <>
      { isAccepted ? releaseButton : acceptButton }
    </>
  );

  const editDeleteButtons = (
    <>
      { isAccepted ? releaseButton : null }
      <EditJobDialog job={ job } editJob={ editJob } editJobDetailDisplay={ editJobDetailDisplay }/>
      <Button variant="outlined" color="error" startIcon={<DeleteForeverIcon />} onClick={ handleDelete }>
        Delete
      </Button>
    </>
  );

  const seeJobButton = (
    <Button variant="outlined" color="primary" startIcon={<LaunchIcon />} href={`/job/${job.id}`} >
      See Job
    </Button>
  );
  

  // Show loading if job is null
  if(!job ) { return <h2>Loading...</h2> }

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