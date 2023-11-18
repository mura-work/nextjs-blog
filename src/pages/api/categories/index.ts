import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categories = await db.category.findMany({
    include: {
      todoLists: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json({ categories });
}
