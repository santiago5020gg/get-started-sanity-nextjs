import { useState } from "react";
import { useRouter } from "next/router";
import client from "../lib/sanity";

const NewPost = ({ post }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const router = useRouter();

  console.log('el post ',post);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.SANITY_PROJECT_ID);
    await client.create({
      _type: "post",
      title,
      body,
    });
    router.push("/");
  };

  const uploadImage = (e) => {
    const file = e.target.files;
    setImageUrl(file);
  };

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" onChange={uploadImage} />
        </div>
        <div>Info:</div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export async function getStaticProps() {
  const post = await client.fetch(`*[_type == "post"]`);

  return {
    props: {
      post,
    },
  };
}

export default NewPost;
