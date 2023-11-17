import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todoLists = await db.todo.findMany();
  res.status(200).json({ todoLists });
}
