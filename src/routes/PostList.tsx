// import { preloadQuery } from "../main";
import { useLoaderData, useNavigate, Link, Await } from "react-router-dom";
import { FormEvent, Suspense } from "react";
// import { useReadQuery, gql, QueryRef } from "@apollo/client";
import { IPost } from "../types";
import { getPostList } from "../apiCalls";

// interface ILocation {
//   id: string;
//   name: string;
//   description: string;
//   photo: string;
// }

async function loader() {
  // const GET_LOCATIONS = gql`
  //   query GetLocations {
  //     locations {
  //       id
  //       name
  //       description
  //       photo
  //     }
  //   }
  // `;
  // return preloadQuery(GET_LOCATIONS);
  const postList = getPostList();
  return { postList };
}

export default function PostList() {
  // const queryRef = useLoaderData();
  // const response = useReadQuery<ILocation>(queryRef as QueryRef<ILocation>);
  // console.log(response);
  // return (
  //   <Suspense fallback={<p>Loading package location...</p>}>
  //     <Await
  //       resolve={response.data}
  //       errorElement={<p>Error loading package location!</p>}
  //     >
  //       <pre>{JSON.stringify(response.data, null, 2)}</pre>
  //     </Await>
  //   </Suspense>)
  const navigate = useNavigate();
  const { postList } = useLoaderData() as {
    postList: IPost[];
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      slug: {
        value: string;
      };
    };
    navigate(target.slug.value);
  };

  return (
    <section>
      <p>Post List</p>
      <form onSubmit={handleSubmit}>
        <input name="slug" className="border border-black" />
        <button type="submit">Navigate</button>
      </form>

      <Suspense fallback={<p>Loading posts...</p>}>
        <Await resolve={postList} errorElement={<p>Error loading posts!</p>}>
          {(postList: IPost[]) => (
            <ul>
              {postList.map((item) => (
                <li key={item.slug}>
                  <Link to={item.slug}>{JSON.stringify(item, null, 2)}</Link>
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

PostList.loader = loader;
