import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todoLists = await db.todo.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ todoLists });
  } else if (req.method === "POST") {
    const params = JSON.parse(req.body);
    const newTodo = await db.todo.create({
      data: {
        title: params.title,
        content: params.content,
        completedDate: params.completedDate,
        responsibleUserName: params.responsibleUserName,
        isDone: false,
        categories: {
          connect: params.categories.map((c: number) => ({ id: c })),
        },
      },
      include: {
        categories: true,
      },
    });
    res.status(200).json(newTodo);
  } else if (req.method === "PATCH") {
    const params = JSON.parse(req.body);
    const newTodo = await db.todo.update({
      where: {
        id: params.id,
      },
      data: {
        title: params.title,
        content: params.content,
        completedDate: params.completedDate,
        responsibleUserName: params.responsibleUserName,
        isDone: params.isDone,
        categories: {
          connect: params.categories.map((c: number) => ({ id: c })),
        },
      },
      include: {
        categories: true,
      },
    });
    res.status(200).json(newTodo);
  } else if (req.method === "DELETE") {
    const params = JSON.parse(req.body);
    await db.todo.delete({
      where: {
        id: Number(params.id),
      },
    });
    res.status(200).json({ response: "ok" });
  }
}
