import { Card } from "components/Card";
import { CardRow } from "components/CardRow";
import { CONFIG_QUERYResult } from "lib/sanity.types";

export function AboutCard({ configData }: { configData: CONFIG_QUERYResult }) {
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
