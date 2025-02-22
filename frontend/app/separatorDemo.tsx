import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SeparatorDemo() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="font-normal">Harri(son) Knight Molloy</CardTitle>
        <CardDescription>Designer & Creative Technologist.</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <a href="mailto:mail@harrisonmolloy.com">mail@harrisonmolloy.com</a>
          <Separator orientation="vertical" />
          <a href="https://github.com/harrisonmolloy">GitHub</a>
        </div>
      </CardContent>
    </Card>
  );
}
