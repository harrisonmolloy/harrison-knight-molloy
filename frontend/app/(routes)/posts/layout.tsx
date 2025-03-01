import CardContainer from "components/CardContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CardContainer>{children}</CardContainer>
      </body>
    </html>
  );
}
