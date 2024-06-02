import { t } from "elysia";
import { VistaComponent } from "vista";

export interface BlogPostProps {
  title: string;
  body: string;
  author: string;
}

export default function BlogPost({ title, body, author }: BlogPostProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{body}</p>
      <span>{author}</span>
    </article>
  );
}

export const VistaBlogPost = new VistaComponent(
  BlogPost,
  t.Object({
    title: t.String(),
    body: t.String(),
    author: t.String(),
  })
);
