import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ActionAlerts from './ActionAlerts';

function AddProperty({addPropertyToList}) {
    // State and other variables
    const { user } = useContext(UserContext);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const theme = createTheme();

    const stateAbbreviations = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
    const stateAbbreviationArray = stateAbbreviations.map(stateAbbreviation => <MenuItem key={stateAbbreviation} value={stateAbbreviation}>{stateAbbreviation}</MenuItem>)
    
    const propertyCategories = ['Commercial','Residential'];
    const propertyCategoryArray = propertyCategories.map(propertyCategory => <MenuItem key={propertyCategory} value={propertyCategory}>{propertyCategory}</MenuItem>)

    const [formData, setFormData] = useState({
        street_address_1: '',
        street_address_2: '',
        city: '',
        state_abbr: '',
        zip: '',
        property_category: ''
      });
      
    const { street_address_1, street_address_2, city, state_abbr, zip, property_category } = formData;

    // Handles changes to form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handles form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const search_addr = street_address_1 + ', ' + city + ', ' + state_abbr + ' ' + zip;
        // Fetches Google Places API to convert address into lat/lng for later map usage
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search_addr}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
          .then(res => {
              if(res.ok){
                  res.json().then(data => {
                    // Pulls lat/lng from API
                    
                    const gLat = data.results[0].geometry.location.lat;
                    const gLng = data.results[0].geometry.location.lng;

                    const property = {
                        street_address_1: street_address_1,
                        street_address_2: street_address_2,
                        city: city,
                        state: state_abbr,
                        zip: zip,
                        lat: gLat,
                        lng: gLng,
                        country: 'United States',
                        property_category: property_category,
                        user_id: user.id
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
                                  property_category: ''
                                });
                                addPropertyToList(property);
                            });
                            setSeverity("success");
                            setAlertMessages([[0, "Property Saved!"]]);
                        }else {
                            res.json().then(json => {
                              setSeverity("error");
                              setAlertMessages(Object.entries(json.errors));
                          });
                        }
                      })
                  })
                  .catch(googleFetchError => {
                    console.log(googleFetchError);
                    setSeverity("error");
                    setAlertMessages([[0, "Address is not a valid location."]]);
                });
              } else {
                res.json().then(json => {
                    setSeverity("error");
                    setAlertMessages([[0, "Address is not a valid location."]]);
                }); 
              }
            });
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
                                    name="property_category"
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
                            name="street_address_1"
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
                            name="street_address_2"
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
                                    name="state_abbr"
                                    label="State"
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