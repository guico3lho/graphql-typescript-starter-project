import { makeSchema } from "nexus";
import path from "path";

// TODO: why does not work
// import { userTypes } from "@starter-project/api/graphql/User";
import { userTypes } from "./graphql/User";

const publicSchema = makeSchema({
  types: [userTypes],
  outputs: {
    schema: path.join(__dirname, "generated/schema.gen.graphql"),
    typegen: path.join(__dirname, "generated/nexusTypes.gen.ts"),
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

export const schema = publicSchema;
