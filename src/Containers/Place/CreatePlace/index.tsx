import { Dispatch, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from "../../../components/Modal";
import { makeSelectLoading, makeSelectPlacesTypes } from '../selectors';
import { getPlacesTypes, createPlace } from '../actions';
import { PlaceType } from '../../../globalTypes';
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import DataList from '../../../components/DataList';


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatch,
    handleCreatePlace: (data: PlaceType) => dispatch(createPlace(data)),
    handleGetPlacesTypes: () => dispatch(getPlacesTypes()),
  };
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  placesTypes: makeSelectPlacesTypes(),
})

const connector = connect(mapStateToProps, mapDispatchToProps);

type CreatePlaceReduxProps = ConnectedProps<typeof connector>;

interface CreatePlaceProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  location: {
    lat: number;
    lng: number;
  }
}

type Props = CreatePlaceReduxProps & CreatePlaceProps;

const CreatePlace = ({ handleCreatePlace, handleGetPlacesTypes, placesTypes, loading, open, setOpen, location }: Props) => {

  useEffect(() => {
    if (placesTypes.length === 0) {
      handleGetPlacesTypes();
    }
  }, [placesTypes, handleGetPlacesTypes]);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState(placesTypes[0]?.name)
  const [query, setQuery] = useState<string>('')
  const [isSubmited, setIsSubmited] = useState<boolean>(false);


  const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (name && selected) {
      const place: PlaceType = {
        name,
        userId: 'id',
        description,
        typeName: selected,
        location: {
          type: "Point",
          coordinates: [location.lng, location.lat]
        }
      }
      handleCreatePlace(place);
      setOpen(false);
    }
  }
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div>
          <h1 className='text-3xl font-semibold'>Create place</h1>
          <p className='text-xs text-gray-300 mb-4'>
            latitud: {location.lat} |
            longitud: {location.lng}
          </p>

          <form>
            <div className="grid gap-10 grid-cols-2">
              <div className="grid gap-y-5">
                <label htmlFor="name">Custom name for place*:
                  <Input
                    name="placeName"
                    type="text"
                    placeholder="ex. My favourite hotel"
                    onChange={(e) => setName(e.target.value)} />
                  <div className='text-errorColor text-sm text-center'>
                    {isSubmited && name === '' && 'Name is required'}
                  </div>
                </label>
                <label htmlFor="description">Description:
                  <Input
                    name="placeDescription"
                    type="text"
                    placeholder="ex. they have a really beautiful view"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>

              </div>

              <div>
                <label htmlFor="placesType">Category of the place*:</label>
                <DataList list={placesTypes} selected={selected} setSelected={setSelected} query={query} setQuery={setQuery} />
              </div>

            </div>

            <br></br><br></br>
            <div className="flex justify-between">
              <Button type='reset' onClick={() => setOpen(false)} className="bg-gray-600 w-1/5 text-gray-50">
                Close
              </Button>
              <Button type="submit" onClick={(e) => handleCreate(e)} className="bg-azul2 w-1/5 text-gray-50">
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      {loading && <Spinner />}
    </>
  );
}

export default compose(connector)(CreatePlace);