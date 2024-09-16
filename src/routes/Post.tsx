import { Params, useLoaderData } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
interface ILocation {
  id: string;
  name: string;
  description: string;
  photo: string;
  overallRating: number;
  reviewsForLocation: {
    id: string;
    comment: string;
    rating: number;
  }[];
}

const Location = gql`
  query GetLocationDetails($locationId: ID!) {
    location(id: $locationId) {
      id
      name
      description
      photo
      overallRating
      reviewsForLocation {
        id
        comment
        rating
      }
    }
  }
`;

function loader({ params }: { params: Params<"postSlug"> }) {
  return { postSlug: params.postSlug };
}

export default function Post() {
  const { postSlug } = useLoaderData() as { postSlug: string };
  const { loading, error, data } = useQuery<{ location: ILocation }>(Location, {
    variables: {
      locationId: postSlug,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) throw Error(error.message);
  return (
    <section>
      <h3>{data?.location.name}</h3>
      <img
        width="400"
        height="250"
        alt="location-reference"
        src={`${data?.location.photo}`}
      />
      <br />

      <b>About this location:</b>
      <p>{data?.location.description}</p>
      <br />

      <b>Overall rating:</b>
      <p>{data?.location.overallRating}</p>
      <br />

      <b>Reviews:</b>
      {data?.location.reviewsForLocation.map((review) => {
        return (
          <div key={review.id}>
            <p>
              {review.comment} <b>({review.rating})</b>
            </p>
          </div>
        );
      })}
      <br />
    </section>
  );
}

Post.loader = loader;
