import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany();

  res.status(200).json({ name: "Posts Fetched" });
}
