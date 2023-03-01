import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, List } from '@mui/material';
import PropertyCard from "./PropertyCard";
import JobList from "./JobList";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DollarIcon from '@mui/icons-material/AttachMoney';

function PropertyDetail() {
    const params = useParams();
    const id = params.id;
    const [property, setProperty] = useState(null);
    const [propertyJobs, setPropertyJobs] = useState(null);
    
    useEffect(() => {
        fetch(`/properties/${id}`)
          .then((r) => r.json())
          .then((property) => setProperty(property));
      }, []);

      useEffect(() => {
        fetch(`/properties/${id}/jobs`)
          .then((r) => r.json())
          .then((propertyJobs) => setPropertyJobs(propertyJobs));
      }, []);

    // Show loading if property is null
    if(!property || !propertyJobs) { return <h2>Loading...</h2> }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} lg={7} > 
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CardHeader title={ "Property Location" } />
                            <Card sx={{ flex: 1 }}>
                                <PropertyCard
                                    to="/"
                                    icon={DollarIcon}
                                    title={ property.street_address }
                                    subtitle_one={ property.property_category + ' Property' }
                                    subtitle_two={ property.city_state }
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card sx={{ flex: 1 }}>
                                <CardHeader title={ "Jobs" } />
                                <List dense={ true }>
                                    <JobList jobs={ propertyJobs } />
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )

};

export default PropertyDetail;