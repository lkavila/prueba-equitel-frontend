import { RatingView } from 'react-simple-star-rating'
import Avatar from "./Avatar";

interface Props {
  username: string;
  comment: string;
  rating: number;
  createdAt: Date;
}

const ReviewComponent = ({ username, comment, rating, createdAt }: Props) => {
  return (
    <div id="review-container" className="container flex flex-row border-t border-r border-l border-grey-textTwitter border-opacity-25 px-2 py-2 max-w-screen-sm hover:bg-grey-lighter">

      <div id="avatar" className="min-w-max w-16 mr-2">
        <Avatar />
      </div>
      <div id="tweet" className="container max-w-screen-sm">

        <div className="flex flex-row justify-between text-sm text-grey-textTwitter">
          <p>
            {username}
            <span className="mb-4 text-md m-1">.</span>
            <RatingView ratingValue={rating} />
            <span className=""> {createdAt} </span>
          </p>

        </div>
        <div id="content-review">
          <div id="contenido-review" className="max-w-screen-sm">
            <article className={`text-sm text-grey-contentTwitter mb-2.5 whitespace-pre-wrap`} >
              <p>
                {comment}
              </p>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReviewComponent;