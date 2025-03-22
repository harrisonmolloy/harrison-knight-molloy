export const commands: {
  [commandHandlerName: string]: {
    aliases: string[];
    description: string;
    arguments?: { name: string; description: string }[];
    options?: {
      flag: string;
      shortFlag?: string;
      argument?: string;
      description: string;
    }[];
  };
} = {
  exit: {
    aliases: ["exit", "quit", "esc"],
    description: "quits/shutsdown the current pane",
  },

  close: {
    aliases: ["close", "toggle"],
    description: "toggles/closes/minimises the current pane",
  },

  clear: {
    aliases: ["clear", "clr"],
    description: "clears the history/refreshes the current pane",
  },

  about: {
    aliases: ["about", "neofetch"],
    description: "displays metadata",
  },

  contact: {
    aliases: ["contact", "neofetch"],
    description: "displays contact information",
  },

  postList: {
    aliases: ["posts, items"],
    description: "displays all posts",
  },

  postWithId: {
    aliases: ["post", "item", "document"],
    description: "displays the post with the supplied id",
    arguments: [
      {
        name: "id",
        description: "a sanity document id",
      },
    ],
  },

  graph: {
    aliases: ["graph"],
    description: "displays a force graph visualisation of all data",
    options: [
      {
        flag: "inline",
        shortFlag: "i",
        description: "spawn in current pane",
      },
    ],
  },

  help: {
    aliases: ["help"],
    description: "displays help text and available commands",
    arguments: [
      {
        name: "command",
        description: "show help text for specific command",
      },
    ],
  },

  unknown: {
    aliases: ["unknown"],
    description: "Runs when the submitted command is not found",
  },
};
