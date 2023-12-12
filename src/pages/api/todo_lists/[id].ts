import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id;
    const todo = await db.todo.findUnique({
      include: {
        categories: true,
      },
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(todo);
  }
}
