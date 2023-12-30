// NestJSの呼び出し
export const fetchTodos = async () => {
  const todos = await fetch("http://localhost:3002/todo").then((res) => res.json());
  console.log({ todos });
};
