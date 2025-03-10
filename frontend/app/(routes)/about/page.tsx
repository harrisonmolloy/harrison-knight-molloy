import { getConfig } from "lib/queries";
import { AboutCard } from "components/AboutCard";

export default async function About() {
  const configData = await getConfig();
  return <AboutCard configData={configData} />;
}
