export interface BlogPostProps {
    title: string;
    body: string;
    author: string;
}

export default function BlogPost({ title, body, author }: BlogPostProps) {
    return (
        <article>
            <h1>{title}</h1>
            <p>{body}</p>
            <span>{author}</span>
        </article>
    )
}