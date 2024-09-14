import { getPost } from "../apiCalls";
import { Await, useLoaderData } from "react-router-dom";
// import { IPost } from "../types";
import type { Params } from "react-router-dom";
import { Suspense } from "react";

async function loader({ params }: { params: Params<"postSlug"> }) {
  if (params.postSlug) {
    const post = getPost(params.postSlug);
    console.log("post in loader", post);
    return { post };
  } else {
    throw new Error("Post slug is required");
  }
}

export default function Post() {
  const data = useLoaderData();
  console.log("data", data);
  return (
    <Suspense fallback={<p>Loading post details...</p>}>
      <Await resolve={data} errorElement={<p>could not load post details!</p>}>
        <section>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>
      </Await>
    </Suspense>
  );
}

Post.loader = loader;
