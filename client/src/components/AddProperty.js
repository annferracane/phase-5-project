import * as React from 'react';
import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { UserContext } from "../context/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ActionAlerts from './ActionAlerts';
// import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function AddProperty() {
    const { user, setUser } = useContext(UserContext);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const theme = createTheme();
    const history = useHistory();

    const stateAbbreviations = ['AL','AK','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
    const stateAbbreviationArray = stateAbbreviations.map(stateAbbreviation => <MenuItem key={stateAbbreviation} value={stateAbbreviation}>{stateAbbreviation}</MenuItem>)
    
    const propertyCategories = ['Commercial','Residential'];
    const propertyCategoryArray = propertyCategories.map(propertyCategory => <MenuItem key={propertyCategory} value={propertyCategory}>{propertyCategory}</MenuItem>)

    const [formData, setFormData] = useState({
        street_address_1: '',
        street_address_2: '',
        city: '',
        state_abbr: '',
        zip: '',
        country: '',
        property_category: ''
      });
      

    const { street_address_1, street_address_2, city, state_abbr, zip, country, property_category } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const property = {
          street_address_1: street_address_1,
          street_address_2: street_address_2,
          city: city,
          state: state_abbr,
          zip: zip,
          country: country,
          property_category: property_category
      };
    
      fetch(`/properties`,{
        method: 'POST', 
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(property)
      })
      .then(res => {
          if(res.ok){
              res.json().then(property => {
                setFormData({
                    street_address_1: '',
                    street_address_2: '',
                    city: '',
                    state_abbr: '',
                    zip: '',
                    country: '',
                    property_category: ''
                  });
                  history.push(`/properties/${property.id}`); // revisit
              })
          }else {
              res.json().then(json => {
                setSeverity("error");
                setAlertMessages(Object.entries(json.errors));
            });
          }
      })
      };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <ActionAlerts messages={alertMessages} severity={severity}/>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="property-category-label">Category</InputLabel>
                                <Select
                                    labelId="property-category-label"
                                    id="property-category"
                                    name="property-category"
                                    label="Category"
                                    value={ property_category }
                                    onChange={ handleChange }
                                >   
                                    { propertyCategoryArray }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="street-address-1"
                            label="Street Address"
                            name="street-address-1"
                            autoComplete="street-address-1"
                            value={ street_address_1 }
                            onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            id="street-address-2"
                            label="Apt / Unit / Suite"
                            name="street-address-2"
                            autoComplete="street-address-2"
                            value={ street_address_2 }
                            onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                            value={ city }
                            onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    id="state"
                                    name="state"
                                    label="Srate"
                                    value={ state_abbr }
                                    onChange={ handleChange }
                                >   
                                    { stateAbbreviationArray }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="zip"
                            label="Zip"
                            name="zip"
                            autoComplete="zip"
                            value={ zip }
                            onChange={ handleChange }
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Add Property
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )

}

export default AddProperty;