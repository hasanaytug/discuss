// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getServerSession(authOptions);

  const targetUser = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  console.log(targetUser.id);

  if (req.method === "POST") {
    await prisma.post.create({
      data: {
        title: req.body.text,
        userId: targetUser.id,
      },
    });
  }
  res.status(200).json({ name: "Post Created" });
}
