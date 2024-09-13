import { getPost } from "../apiCalls";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../types";
import type { Params } from "react-router-dom";

async function loader({ params }: { params: Params<"postSlug"> }) {
  if (params.postSlug) {
    const post = await getPost(params.postSlug);
    return { post };
  } else {
    return undefined;
  }
}

export default function Post() {
  const { post } = useLoaderData() as { post: IPost };
  return (
    <section>
      <p>a post</p>
      {JSON.stringify(post)}
    </section>
  );
}

Post.loader = loader;
