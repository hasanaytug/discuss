// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const targetUser = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  console.log(targetUser.id);

  if (req.method === "POST") {
    await prisma.comment.create({
      data: {
        title: req.body.text,
        userId: targetUser.id,
        postId: req.body.postId,
      },
    });
  }
  res.status(200).json({ name: "Comment Created" });
}
