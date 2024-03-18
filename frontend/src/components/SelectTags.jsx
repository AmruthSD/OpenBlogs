// demo tags
const demotags = ["WebDev", "AI", "ML", "Systems", "OpenSource",];
import { Button } from "@nextui-org/react";
import {Divider} from "@nextui-org/react";

export default function SelectTags() {
  return (
    <div>
      <h1 className=" font-bold text-lg">Filter by tags : (not working yet) </h1>
        <Divider className="my-4"/>
      <div className="flex flex-row flex-wrap gap-2">
        {demotags.map((tag, index) => {
          return (
            <Button
              key={index}
              radius="full"
              color="primary"
              variant="ghost"
              auto
            >
              # {tag}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
