import { client } from "@sanity/client";
import { CONFIG_QUERY } from "@sanity/queries";

export default async function Home() {
  const configData = await client.fetch(CONFIG_QUERY);

  return (
    <>
      <main className="overflow-hidden pt-[140px] pl-10">
        <h1 className="text-base leading-5 font-normal">{configData.title}</h1>
        <p className="text-base leading-5 font-normal">{configData.tagline}</p>
        <br />
        <a
          href="mailto:mail@harrisonmolloy.com"
          className="text-base leading-5 font-normal"
        >
          mail@harrisonmolloy.com
        </a>
        <br />
      </main>
    </>
  );
}
