async function getUsers() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users")

    if (!res.ok) {
        throw new Error("failed to fetch");
    }
    let data = res.json();
    return data;
}

export default async function Users() {
    const users = await getUsers()

    return (
        <section>
            {users.map(user => (
                <article key={user.id}>
                    <p>{user.name}</p>
                </article>
            ))}
        </section>
    )
}