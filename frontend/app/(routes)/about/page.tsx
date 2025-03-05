import { Card, CardRow } from "components/Card";
import { getConfig } from "lib/queries";

export default async function About() {
  const configData = await getConfig();

  if (!configData) {
    return <>Failed to get Config</>;
  }

  return (
    <>
      <Card>
        <CardRow>
          <h1>{configData.title}</h1>
        </CardRow>
        {configData.tagline && (
          <CardRow>
            <p>{configData.tagline || "Tagline"}</p>
          </CardRow>
        )}
        <CardRow>
          <a href="mailto:mail@harrisonmolloy.com">mail@harrisonmolloy.com</a>
        </CardRow>
      </Card>
    </>
  );
}
