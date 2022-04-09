import { Dispatch, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Rating } from 'react-simple-star-rating'
import Modal from "../../../components/Modal";
import { makeSelectLoading, makeSelectReviews } from '../selectors';
import { startChannel, createReview } from '../actions';
import { PlaceType, ReviewType } from '../../../globalTypes';
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
import UpdatePlace from '../UpdatePlace';
import ReviewComponent from '../../../components/Review';


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatch,
    handleGetReviews: (placeId: string, page: number) => dispatch(startChannel(placeId, page)),
    handleCreateReview: (review: ReviewType) => dispatch(createReview(review)),
  };
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  reviews: makeSelectReviews(),
})

const connector = connect(mapStateToProps, mapDispatchToProps);

type ViewPlaceReduxProps = ConnectedProps<typeof connector>;

interface ViewPlaceProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  place: PlaceType;
}

type Props = ViewPlaceReduxProps & ViewPlaceProps;

const Place = ({ handleCreateReview, handleGetReviews, reviews, loading, open, setOpen, place }: Props) => {

  const [reviewComment, setReviewComment] = useState<string>('');
  const [rating, setRating] = useState(0) // initial rating value
  const [openUpdatePlace, setOpenUpdatePlace] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (place) {
      console.log("load more reviews")
      handleGetReviews(place._id || '', page);
    }
  }, [place, handleGetReviews, page])

  const handleRating = (rate: number) => {
    setRating(rate);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const review: ReviewType = {
      comment: reviewComment,
      rating: rating,
      placeId: place._id,
      user: {
        username: '',
        _id: '',
      },
    }
    handleCreateReview(review);
  }

  return (
    <>
      <UpdatePlace open={openUpdatePlace} setOpen={setOpenUpdatePlace} place={place} />

      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-row justify-between ">

          <div>
            <h1 className='text-3xl font-semibold'>{place.name}</h1>
            <p className=' mb-4'>{place.type?.name} - Average rating {place.averageRating}</p>
            <p>
              {place.description}
            </p>
          </div>

          <div>
            <div className="mb-4">
              <Button className="bg-errorColor">Delete</Button>
              <Button onClick={() => setOpenUpdatePlace(true)}>Update</Button>
            </div>
          </div>


        </div>

        <div>
          <form>
            <p>My review</p>
            <Rating onClick={handleRating} ratingValue={rating} />
            <label htmlFor="comment">
              <textarea id="comment" value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full" placeholder="Write your comments here" />
            </label>
            <Button onClick={handleSubmit} className="bg-azul2">Submit</Button>
          </form>
        </div>

        <div className='mt-4'>
          <h3 className='text-xl font-semibold mb-4'>Reviews</h3>
          <ul>
            {
              reviews.map((review, index) => (
                <li key={(review._id || review.user.username) + index}>
                  <ReviewComponent
                    username={review.user.username}
                    comment={review.comment || ""}
                    rating={review.rating}
                    createdAt={review.createdAt || new Date()}
                  />
                </li>
              ))
            }
          </ul>
        </div>


        <div className='flex justify-center mt-4'>
          <Button onClick={() => setPage(page + 1)}>Load more</Button>
        </div>

      </Modal>
      {loading && <Spinner />}
    </>
  );
}

export default compose(connector)(Place);