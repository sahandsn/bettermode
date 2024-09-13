import { IPost } from "./types";

export function getPostList() {
  const postList: IPost[] = [{ slug: "foo", title: "Foo" }];
  return Promise.resolve(postList);
}

export function getPost(slug: string) {
  const post: IPost = { slug: slug, title: slug.toUpperCase() };
  return Promise.resolve(post);
}
