import { client } from "@sanity/client";
import { CONFIG_QUERY } from "@/app/lib/sanity/queries";

export default async function Home() {
  const configData = await client.fetch(CONFIG_QUERY);

  return (
    <main className="mt-40 pl-10">
      <h1>{configData.title}</h1>
      <p>{configData.tagline}</p>
      <br />
      <a
        href="mailto:mail@harrisonmolloy.com"
        className="text-base leading-5 font-normal"
      >
        mail@harrisonmolloy.com
      </a>
      <br />
    </main>
  );
}
