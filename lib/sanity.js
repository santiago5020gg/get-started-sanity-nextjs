import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET_NAME,
  apiVersion: "2021-03-25",
  token:process.env.NEXT_PUBLIC_TOKEN,
  useCdn: false,
});

export default client;
