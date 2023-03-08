import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { purple, orange, green } from '@mui/material/colors';
import { Avatar, Box, Button, Card, IconButton, ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddJobDialog from './AddJobDialog';

function CustomListItem({ itemType, item, passedFunctions }) {
    // State and other variables
    const history = useHistory();
    const [itemData, setItemData] = useState({
        primaryText: '',
        secondaryText: '',
        buttonType: null,
        buttonHref: '',
        avatar: ''
      });

    const { avatar, primaryText, secondaryText, buttonType, buttonHref } = itemData;

    // Fetch data depending on if list item is a property or job
    useEffect(() => {
        if (itemType === 'property') {
            setItemData({
                primaryText: item.street_address,
                secondaryText: item.city + ', ' + item.state,
                buttonType: <><AddJobDialog property={ item } addJob={ passedFunctions[0] } /> <Button variant="outlined" color="error" onClick={ handleDeleteProperty }><DeleteForeverIcon /></Button></>,
                buttonHref: `/property/${item.id}`,
                avatar: item.property_category === 'Residential' ? <Avatar sx={{ bgcolor: purple[500] }}><HomeIcon/></Avatar> : <Avatar sx={{ bgcolor: orange[500] }}><BusinessIcon /></Avatar>
            });
        } else if (itemType === 'job') {
            setItemData({
                primaryText: item.title,
                secondaryText: item.timeline,
                buttonType: passedFunctions[0] ? <Button variant="outlined" color="error" onClick={ handleDeleteJob }><DeleteForeverIcon /></Button> : null,
                buttonHref: `/job/${item.id}`,
                avatar: <Avatar sx={{ bgcolor: green[500] }}><ConstructionIcon/></Avatar>
            });
        }
      },[item, itemType, passedFunctions])
    
    // Delete job handler
    const handleDeleteJob = () => {    
        fetch(`/jobs/${item.id}`, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => {
            if(res.ok){
                passedFunctions[0](item.id);
            } else {
                res.json().then(json => {
                console.log(json.errors);
                });
            }
        });
    }

    // Delete property handler
    const handleDeleteProperty = () => {    
        fetch(`/properties/${item.id}`, {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => {
            if(res.ok){
                passedFunctions[1](item.id);
            } else {
                res.json().then(json => {
                console.log(json.errors);
                });
            }
        });
    }

    // Show loading if item passed through props is null
   if(!item) { return <h3>Loading...</h3> }

    return (
        <Card sx={{ flex: 1 }}>
            <ListItem sx={{ minHeight: 80 }}>
                <ListItemAvatar>
                    {avatar}
                </ListItemAvatar>
                <ListItemText
                    primary={ primaryText }
                    secondary={ secondaryText }
                />
                <ListItemSecondaryAction>
                    <Box
                        component="span"
                        sx={{
                            marginRight: '1em',
                            color: 'text.primary',
                        }}
                    >   
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            { itemType === "job" && passedFunctions[0] ? <Button size="small" variant="text" disabled> { item.is_accepted ? "Accepted " : "Still Open" } </Button> : null }
                            { buttonType }
                            <IconButton aria-label="share" color="primary" onClick={ () => history.push(buttonHref) }><LaunchIcon /></IconButton>
                        </Stack>
                    </Box>
                </ListItemSecondaryAction>
            </ListItem>
        </Card>
    );
};

export default CustomListItem;
