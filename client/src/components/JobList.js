import * as React from 'react';
import { List, Stack } from '@mui/material';
import CustomListItem from "./CustomListItem";

function JobList({ jobs, deleteJob }) {
    // Array of styled jobs to display
    const jobArray = jobs.map(job => <CustomListItem key={'job-' + job.id} itemType={ 'job' } item={job} passedFunctions={[deleteJob]} />)

    // Show loading if jobs is null
   if(!jobs) { return <h2>Loading...</h2> }

    return (
        <List dense={ true }>
            <Stack spacing={ 2 }>
                { jobArray }
            </Stack>
        </List>
    )

};

export default JobList;
