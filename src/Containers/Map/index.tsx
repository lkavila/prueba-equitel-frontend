import React, { Dispatch, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { compose } from 'redux';
import { makeSelectPlaces } from './selectors';
import { makeSelectUser } from '../User/selectors';
import { startChannel } from './actions';
import { PlaceType } from '../../globalTypes';
import Spinner from '../../components/Spinner';
import CreatePlace from '../Place/CreatePlace';
import PlaceView from '../Place/PlaceAndReview';
import Button from '../../components/Button';

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const center = {
  lat: 37.772,
  lng: -122.214
};

const mapStateToProps = createStructuredSelector(
  {
    places: makeSelectPlaces(),
    user: makeSelectUser()
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

const Map: React.FC<MapProps> = ({ user, places, handleGetPlaces }) => {

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API || "",
  })
  const [place, setPlace] = useState<any>();
  const [openCreatePlace, setOpenCreatePlace] = useState(false);
  const [openViewPlace, setOpenViewPlace] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(center);

  useEffect(() => {
    if (places.length === 0)
      handleGetPlaces()
  }, [places, handleGetPlaces]);

  const openCreatePlaceModal = (latLng: any) => {
    const auxLocation = {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
    setCurrentLocation(auxLocation);
    setOpenCreatePlace(true);
  }

  const openViewPlaceModal = (place: PlaceType) => {
    setPlace(place);
    setOpenViewPlace(true);
  }

  const handleLogOut = () => {
    localStorage.removeItem('redux-user');
    window.location.reload();

    //navigate("/auth/login", { replace: true });
  }
  const RenderMap = () => {

    return (
      <div>
        {openCreatePlace ?
          <CreatePlace open={openCreatePlace} setOpen={setOpenCreatePlace} location={currentLocation} />
          : <></>
        }
        {openViewPlace ?
          <PlaceView open={openViewPlace} setOpen={setOpenViewPlace} place={place} user={user} />
          : <></>
        }

        <div className='fixed z-10 bottom-0'>
          <Button onClick={handleLogOut} className="bg-verde2">Log out user {user.username}</Button>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={(mouseEvent) => openCreatePlaceModal(mouseEvent.latLng)}
        //onLoad={onLoad}
        >
          {
            places?.map((place: PlaceType, index: number) => {
              return <Marker
                key={index}
                position={{
                  lat: Number(place.location.coordinates[1]),
                  lng: Number(place.location.coordinates[0])
                }}
                label={{
                  text: place.name,
                  color: 'black',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  className: 'text-center mb-10'
                }}
                title={place.name}
                onClick={() => openViewPlaceModal(place)}
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