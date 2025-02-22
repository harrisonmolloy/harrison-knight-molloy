import { client } from "@/sanity/lib/client";
import { AUTHOR_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const authors = await client.fetch(AUTHOR_QUERY);
  console.log(authors);

  return (
    <>
      <main className="overflow-hidden pt-[140px] pl-10">
        <h1 className="text-base font-normal text-black leading-5">
          HARRI(SON) KNIGHT MOLLOY
        </h1>
        <p className="text-base font-normal text-black leading-5">
          Creative Technologist
        </p>
        <br />
        <a
          href="mailto:mail@harrisonmolloy.com"
          className="text-base font-normal text-black leading-5"
        >
          mail@harrisonmolloy.com
        </a>
        <br />
      </main>
    </>
  );
}
