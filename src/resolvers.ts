import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  RequireFields,
  MutationAddPostArgs,
  Resolver,
  ResolverTypeWrapper,
} from "./generated/graphql";

import { Context } from "./context";

// Ideally this would be an easy typing but its not
// the best we can do is split into Mutation and Query files.
// import the pieces and let TYPESCRIPT CATCH IT THERE.
// probably write the resolver in the file and shift it once it is done

import { Post, Comment, User, PrismaClient } from "@prisma/client";

// RequireFields<MutationAddPostArgs, "body" | "title">

// const AddPost: Resolver<ResolverTypeWrapper<Post>> = async (
//   _,
//   args: RequireFields<MutationAddPostArgs, "body" | "title">,
//   { prisma }: { prisma: PrismaClient }
// ) => {
//   const titleInput = args.title;
//   const bodyInput = args.body;
//   const test = prisma.comment;
//   const newPost = prisma.post.create({
//     data: {
//       title: titleInput,
//       slug: "",
//       body: bodyInput,
//       author: null,
//     },
//   });
//   return newPost;
// };

const AddPost: Resolver<
  ResolverTypeWrapper<Post>,
  {},
  Context,
  RequireFields<MutationAddPostArgs, "title" | "body">
> = async (_, args, { prisma }: { prisma: PrismaClient }) => {
  const titleInput = args.title;
  const bodyInput = args.body;
  const test = prisma.comment;
  const newPost = prisma.post.create({
    data: {
      title: titleInput,
      slug: "",
      body: bodyInput,
      author: null,
    },
  });
  return newPost;
};

const Mutation: MutationResolvers = {
  // AddPost: async (_, args, { prisma }) => {
  //   const newPost = prisma.post.create({
  //     data: {
  //       title: args.title,
  //       slug: "",
  //       body: args.body,
  //       author: null,
  //     },
  //   });
  //   return newPost;
  // },
  AddPost,
};

const Query: QueryResolvers = {};

export const resolvers: Resolvers = {
  Query: {
    AllPosts: async (_, args, context) => {
      // await context.prisma.
      // const users = await context.prisma.user.findMany();
      const test = args;
      const posts = await context.prisma.post.findMany();
      return posts;
    },
  },
  // Mutation: {
  //   AddPost: async (_, args, { prisma }) => {
  //     const newPost = prisma.post.create({
  //       data: {
  //         title: args.title,
  //         slug: "",
  //         body: args.body,
  //         author: null,
  //       },
  //     });
  //     return newPost;
  //   },
  // },
  Mutation,
};
