import { Config } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { CONFIG_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const configData: Config = await client.fetch(CONFIG_QUERY);

  return (
    <>
      <main className="overflow-hidden pt-[140px] pl-10">
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
