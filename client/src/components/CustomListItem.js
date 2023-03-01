import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
    Button,
    Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddJobDialog from './AddJobDialog';

function CustomListItem({ itemType, item, passedFunction }) {
    const [itemData, setItemData] = useState({
        url: '',
        primaryText: '',
        secondaryText: '',
        buttonType: null,
        buttonHref: '',
        buttonText: ''
      });

    const { url, primaryText, secondaryText, buttonType, buttonHref, buttonText } = itemData;

    useEffect(() => {
        if (itemType === 'property') {
            setItemData({
                url: `/properties/${item.id}`,
                primaryText: item.street_address_1 + ' ' + item.street_address_2,
                secondaryText: item.city + ', ' + item.state,
                buttonType: <AddJobDialog property={ item } addJobToList={ passedFunction }/>,
                buttonHref: '/',
                buttonText: 'See Property'
            });
        } else if (itemType === 'job') {
            setItemData({
                url: `/jobs/${item.id}`,
                primaryText: item.title,
                secondaryText: item.timeline,
                buttonType: null,
                buttonHref: '/',
                buttonText: 'See Job'
            });
        }
      },[])

    // Show loading if jobs is null
   if(!itemData) { return <h3>Loading...</h3> }

    return (
        <ListItem component={Link} to={ url }>
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
                        { buttonType }
                        <Button variant="contained" href={ buttonHref }>{ buttonText }</Button>
                    </Stack>
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default CustomListItem;
