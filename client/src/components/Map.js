import { useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapMarkerDialog from './MapMarkerDialog';

function Map({ properties }) {
    // Map container
    const containerStyle = {
        width: '850px',
        height: '400px'
    };
      
    // Map centered on this lat/lng
    const center = {
        lat: 39.8097,
        lng: -98.5556
     };

    // Configs for Map
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    });
    
    /*
    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, []);
  

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, []);
      */

    // Styled array of properties as map markers
    const propertyLocationArray = properties.map(property => {
        if (property.jobs_available > 0) {
            return (
                <MapMarkerDialog key={`marker-prop-${property.id}`} property={property}/>
            )
        } else {
            return null;
        }
    });

    // Builds map and caches it using useMemo
    const buildMap = useMemo(() => {
        return (
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
            >
                { propertyLocationArray }
                
            </GoogleMap>
        )
    }, [propertyLocationArray]);

    if(!properties) return (<h2>Loading...</h2>)

    return isLoaded ? (
        <>{ buildMap }</>
    ) : <></>
}

export default Map;