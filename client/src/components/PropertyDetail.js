import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, Container, Grid } from '@mui/material';
import Jobs from "./Jobs";
import PropertyCard from "./PropertyCard";
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';

function PropertyDetail() {
    const params = useParams();
    const id = params.id;
    const [property, setProperty] = useState(null);
    const [propertyJobs, setPropertyJobs] = useState(null);
    
    // Fetch property detail
    useEffect(() => {
        fetch(`/properties/${id}`)
        .then((r) => r.json())
        .then((property) => setProperty(property));
      }, [id]);

    // Fetch the jobs of that property
    useEffect(() => {
        fetch(`/properties/${id}/jobs`)
        .then((r) => r.json())
        .then((propertyJobs) => setPropertyJobs(propertyJobs));
    }, [id]);

    // Show loading if property or propertyjobs is null
    if(!property || !propertyJobs) { return <h2>Loading...</h2> }

    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} lg={7} > 
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CardHeader title={ "Property Location" } />
                            <Card sx={{ flex: 1 }}>
                                <PropertyCard
                                    to={`/property/${property.id}`}
                                    icon={ property.property_category === 'Residential' ? HomeIcon : BusinessIcon }
                                    title={ property.street_address }
                                    subtitle_one={ property.property_category + ' Property' }
                                    subtitle_two={ property.city_state }
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <CardHeader title={ "Jobs" } />
                            <Jobs jobs={ propertyJobs }/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
};

export default PropertyDetail;