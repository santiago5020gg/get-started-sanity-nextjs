// pages/index.js
import client from '../lib/sanity';


export default function IndexPage({ post }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>post</h2>
        {post.length > 0 && (
          <ul>
            {post.map((pet) => (
              <li key={pet._id}>{pet?.title}</li>
            ))}
          </ul>
        )}
        {!post.length > 0 && <p>No post to show</p>}
        {post.length > 0 && (
          <div>
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </div>
        )}
        {!post.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}


export async function getStaticProps() {
  const post = await client.fetch(`*[_type == "post"]`);

  return {
    props: {
      post,
    },
  };
}
