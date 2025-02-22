import { Settings } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const settingsData: Settings = await client.fetch(SETTINGS_QUERY);

  return (
    <>
      <main className="overflow-hidden pt-[140px] pl-10">
        <h1 className="text-base font-normal leading-5">
          {settingsData.title}
        </h1>
        <p className="text-base font-normal leading-5">{settingsData.tagline}</p>
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