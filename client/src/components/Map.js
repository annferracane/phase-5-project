import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapMarkerDialog from './MapMarkerDialog';


function Map({ properties }) {

    const containerStyle = {
        width: '850px',
        height: '400px'
    };
      
    const center = {
        lat: 39.8097,
        lng: -98.5556
     };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBhrX6UkpT0rr5RXNLk3JIFZU2lJGSlZHo" 
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        //const bounds = new window.google.maps.LatLngBounds(center);
        //map.fitBounds(bounds);

        //setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);


    if(!properties) return (<h2>Loading...</h2>)

    const propertyLocationArray = properties.map(property => {

        if (property.jobs_available > 0) {
            return (
                <MapMarkerDialog key={`marker-prop-${property.id}`} property={property}/>
            )
        } else {
            return null;
        }
    });

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { propertyLocationArray }
        </GoogleMap>
    ) : <></>
}

export default Map;