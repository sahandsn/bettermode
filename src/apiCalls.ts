import { IPost } from "./types";

export function getPostList() {
  const postList: IPost[] = [{ slug: "foo", title: "FOO" }];

  return new Promise<IPost[]>((resolve) => {
    setTimeout(() => {
      resolve(postList);
    }, 2000);
  });
}

export function getPost(slug: string) {
  const post: IPost = { slug, title: slug.toUpperCase() };

  return new Promise<IPost>((resolve) => {
    setTimeout(() => {
      resolve(post);
    }, 2000);
  });
}
