import { Dispatch, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Modal from "../../../components/Modal";
import { makeSelectLoading, makeSelectPlacesTypes } from '../selectors';
import { getPlacesTypes, updatePlace } from '../actions';
import { PlaceType } from '../../../globalTypes';
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import DataList from '../../../components/DataList';


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatch,
    handleUpdatePlace: (data: PlaceType) => dispatch(updatePlace(data)),
    handleGetPlacesTypes: () => dispatch(getPlacesTypes()),
  };
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  placesTypes: makeSelectPlacesTypes(),
})

const connector = connect(mapStateToProps, mapDispatchToProps);

type UpdatePlaceReduxProps = ConnectedProps<typeof connector>;

interface UpdatePlaceProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  place: PlaceType;
}

type Props = UpdatePlaceReduxProps & UpdatePlaceProps;

const UpdatePlaceComponent = ({ handleUpdatePlace, handleGetPlacesTypes, placesTypes, loading, open, setOpen, place }: Props) => {

  useEffect(() => {
    if (placesTypes.length === 0) {
      handleGetPlacesTypes();
    }
  }, [placesTypes, handleGetPlacesTypes]);

  const [name, setName] = useState(place.name)
  const [description, setDescription] = useState(place.description)
  const [selected, setSelected] = useState(placesTypes.find(item => item._id === place.type?._id)?.name)
  const [query, setQuery] = useState<string>('')
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (name && selected) {
      const updatedPlace: PlaceType = {
        _id: place._id,
        name,
        description,
        user: {
          name: place.user.name,
          username: place.user.username,
        },
        typeName: selected,
        location: {
          type: 'Point',
          coordinates: [place.location.coordinates[0], place.location.coordinates[1]]
        }
      }
      handleUpdatePlace(updatedPlace);
      setOpen(false);
    }
  }
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div>
          <h1 className='text-3xl font-semibold mb-4'>Update place</h1>

          <form>
            <div className="grid gap-10 grid-cols-2">
              <div className="grid gap-y-5">
                <label htmlFor="name">Custom name for place*:
                  <Input
                    name="placeName"
                    type="text"
                    placeholder="ex. My favourite hotel"
                    onChange={(e) => setName(e.target.value)}
                    value={name} />
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
                    value={description}
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
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      {loading && <Spinner />}
    </>
  );
}

export default compose(connector)(UpdatePlaceComponent);