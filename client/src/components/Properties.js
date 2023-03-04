import * as React from 'react';
import { List } from '@mui/material';
import CustomListItem from "./CustomListItem";

function Properties({ properties, addJob }) {

    const propertyArray = properties.map(property => <CustomListItem key={'property-' + property.id} itemType={ 'property' } item={property} passedFunctions={[addJob]}/>)

    // Show loading if jobs is null
   if(!properties) { return <h2>Loading...</h2> }

    return (
        <List dense={ true }>
            { propertyArray }
        </List>
    )

};

export default Properties;