import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

interface ILocation {
  id: string;
  name: string;
  description: string;
  photo: string;
}

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export default function PostList() {
  const { loading, error, data } = useQuery<{ locations: ILocation[] }>(
    GET_LOCATIONS
  );
  if (loading) return <p>Loading...</p>;
  if (error) throw Error(error.message);

  return data?.locations.map(({ id, name, description, photo }) => (
    <section key={id}>
      <Link to={id}>{name}</Link>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </section>
  ));
}
