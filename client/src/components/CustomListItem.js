import { useState, useEffect } from "react";
import {
    Card,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
    Button,
    Stack,
    Typography
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddJobDialog from './AddJobDialog';

function CustomListItem({ itemType, item, passedFunctions }) {
    const [itemData, setItemData] = useState({
        primaryText: '',
        secondaryText: '',
        buttonType: null,
        buttonHref: ''
      });

    const { primaryText, secondaryText, buttonType, buttonHref } = itemData;

    
    useEffect(() => {
        if (itemType === 'property') {
            setItemData({
                primaryText: item.street_address,
                secondaryText: item.city + ', ' + item.state,
                buttonType: <AddJobDialog property={ item } addJob={ passedFunctions[0] }/>,
                buttonHref: `/property/${item.id}`
            });
        } else if (itemType === 'job') {
            setItemData({
                primaryText: item.title,
                secondaryText: item.timeline,
                buttonType: <Button variant="outlined" color="error" startIcon={<DeleteForeverIcon />} onClick={ handleDelete }>Delete</Button>,
                buttonHref: `/job/${item.id}`
            });
        }
      },[])
    
    const handleDelete = () => {    
        console.log("from custom list deleting job:" + item.id);

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

    // Show loading if jobs is null
   if(!itemData) { return <h3>Loading...</h3> }

    return (
        <Card sx={{ flex: 1 }}>
            <ListItem sx={{ minHeight: 80 }}>
                <ListItemAvatar>
                    <Avatar />
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
                            { itemType === "job" ? <Button size="small" variant="text" disabled> { item.is_accepted ? "Accepted " : "Still Open" } </Button> : null }
                            { buttonType }
                            <IconButton aria-label="share" color="primary" href={ buttonHref }><LaunchIcon /></IconButton>
                        </Stack>
                    </Box>
                </ListItemSecondaryAction>
            </ListItem>
        </Card>
        
    );
};

export default CustomListItem;
