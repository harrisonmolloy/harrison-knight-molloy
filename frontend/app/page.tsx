import { client } from "@sanity/client";
import { CONFIG_QUERY } from "@sanity/queries";

export default async function Home() {
  const configData = await client.fetch(CONFIG_QUERY);

  return (
    <>
      <main className="overflow-hidden pt-40 pl-10">
        <h1 className="text-base font-normal leading-5">{configData.title}</h1>
        <p className="text-base font-normal leading-5">{configData.tagline}</p>
        <br />
        <a
          href="mailto:mail@harrisonmolloy.com"
          className="text-base font-normal leading-5"
        >
          mail@harrisonmolloy.com
        </a>
        <br />
      </main>
    </>
  );
}
