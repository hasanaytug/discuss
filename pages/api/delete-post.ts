import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  await prisma.post.delete({
    where: {
      id: req.body.id,
    },
  });

  res.status(200).json({ name: "Posts Fetched" });
}
