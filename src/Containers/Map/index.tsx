import React, { Dispatch, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useLocation, useNavigate } from 'react-router-dom'
import { compose } from 'redux';
import { makeSelectPlaces } from './selectors';
import { startChannel } from './actions';
import Spinner from '../../Components/Spinner';
import CreatePlace from '../Place/CreatePlace';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 37.772,
  lng: -122.214
};

const mapStateToProps = createStructuredSelector(
  {
    places: makeSelectPlaces(),
  }
);

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatch,
    handleGetPlaces: () => dispatch(startChannel()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type MapProps = ConnectedProps<typeof connector>;

const Map: React.FC<MapProps> = ({ places, handleGetPlaces }) => {

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API || "",
  })

  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(center);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => handleGetPlaces(), []);

  const openModal = (latLng: any) => {
    const auxLocation = {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
    setCurrentLocation(auxLocation);
    setOpen(true);
  }
  const RenderMap = () => {

    return (
      <div>
        <CreatePlace open={open} setOpen={setOpen} location={currentLocation} />

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={(mouseEvent) => openModal(mouseEvent.latLng)}
        //onLoad={onLoad}
        >
          {
            places?.map((place: any, index: number) => {
              return <Marker
                key={index}
                position={{
                  lat: Number(place.location.coordinates[1]),
                  lng: Number(place.location.coordinates[0])
                }}
                label={place.name}
                onClick={() =>
                  navigate(`/place/${place._id}`, { state: { backgroundLocation: location } })
                }
              />
            }
            )

          }
        </GoogleMap>
      </div>
    );
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? RenderMap() : <Spinner />
};

export default React.memo(compose(connector)(Map));