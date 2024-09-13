import { getPostList } from "../apiCalls";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { IPost } from "../types";
import { FormEvent } from "react";

async function loader() {
  const postList = await getPostList();
  return { postList };
}

export default function PostList() {
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
      <p>post list </p>
      <form onSubmit={handleSubmit}>
        <input name="slug" className="border border-black" />
        <button type="submit">Navigate</button>
      </form>
      {postList.map((item) => (
        <Link to={item.slug} key={item.slug}>
          {item.title}
        </Link>
      ))}
    </section>
  );
}

PostList.loader = loader;
