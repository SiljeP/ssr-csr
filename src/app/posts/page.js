

async function getPosts() {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts")

    let data = await res.json()

    return data
}


export default async function Posts() {

    const posts = await getPosts()

    return (
        <section>
            {posts.map(post => (
                <article key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </article>
            ))}
        </section>
    )



}