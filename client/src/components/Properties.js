import * as React from 'react';
import { List, Stack } from '@mui/material';
import CustomListItem from "./CustomListItem";

function Properties({ userProperties, addJob, deletePropertyFromList }) {
    // Styled array of properties
    const propertyArray = userProperties.map(property => <CustomListItem key={'property-' + property.id} itemType={ 'property' } item={property} passedFunctions={[addJob, deletePropertyFromList]}/>)

    // Show loading if userProperties is null
   if(!userProperties) { return <h2>Loading...</h2> }

    return (
        <List dense={ true }>
            <Stack spacing={ 2 }>
                { propertyArray }
            </Stack>
        </List>
    )
};

export default Properties;