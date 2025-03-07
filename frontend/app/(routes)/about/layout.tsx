import CardContainer from "components/CardContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CardContainer>{children}</CardContainer>;
}
