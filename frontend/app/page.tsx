import { Card, CardRow } from "components/Card";
import { getConfig } from "lib/queries";

export default async function Home() {
  const configData = await getConfig();

  if (!configData) {
    return (
      <Card>
        <CardRow>
          <h1>Failed to get Config</h1>
        </CardRow>
      </Card>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-around gap-8 pt-32">
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
    </div>
  );
}
