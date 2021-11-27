import { Context } from "@starter-project/api/context";
import {
  arg,
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
  queryField,
  intArg,
} from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id", { description: 'Unique identifier for the resource' });
    t.string("name", { description: 'User\'s name' });
    t.nonNull.string("email", { description: 'User\'s best email address' });
  },
  description: 'Represents a person'
});

export const queryAllUsers = queryField((t) => {
  t.nonNull.list.nonNull.field("allUsers", {
    type: "User",
    resolve: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany();
    },
    description: 'Fetches All Users from db'
  });
})

export const queryOneUser = queryField((t) => {
  t.field("user", {
    type: User,
    args: {
      data: nonNull(arg({ type: UserWhereInput })),
    },
    resolve: (_parent, args, context: Context) => {
      return context.prisma.user.findFirst({
        where: {
          id: args.data.id ?? undefined,
          name: args.data.name,
          email: args.data.email ?? undefined,
        },
      });
    },
    description: 'Fetches One User from db using any of its field as search key'
  });
});

export const createUser = mutationField((t) => {
  t.field("createUser", {
    type: User,
    args: {
      data: nonNull(arg({ type: UserCreateInput })),
    },
    resolve: (_parent, args, context: Context) => {
      return context.prisma.user.create({ data: args.data });
    },
    description: 'Creates One User on db'
  });
});

export const patchUser = mutationField((t) => {
  t.field("editUser", {
    type: User,
    args: {
      id: intArg(),
      data: nonNull(arg({ type: UserUpdateInput })),
    },
    resolve: (_parent, args, context: Context) => {
      return context.prisma.user.update({
        where: {
          id: args.id || undefined,
        },
        data: {
          name: args.data.name,
          email: args.data.email ?? undefined,
        },
      });
    },
    description: 'Updates One User info on db using its id as search key'
  });
});

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.string("name");
    t.nonNull.string("email");
  },
  description: 'Type definition for creating a User'
});

export const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.string("name");
    t.string("email");
  },
  description: 'Type definition for updating a User'
});

export const UserWhereInput = inputObjectType({
  name: "UserWhereInput",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
  },
  description: 'Type definition for searching (where) a User'
});

export const userTypes = {
  User,
  queryAllUsers,
  queryOneUser,
  createUser,
  patchUser,
  UserCreateInput,
  UserUpdateInput,
  UserWhereInput,
};
