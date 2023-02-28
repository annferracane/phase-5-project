import * as React from 'react';
import { List } from '@mui/material';
import CustomListItem from "./CustomListItem";

function JobList({ jobs }) {

    const jobArray = jobs.map(job => <CustomListItem key={'job-' + job.id} itemType={ 'job' } item={job} />)

    // Show loading if jobs is null
   if(!jobs) { return <h2>Loading...</h2> }

    return (
        <List dense={ true }>
            { jobArray }
        </List>
    )

};

export default JobList;
