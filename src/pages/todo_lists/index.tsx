import { useState, useEffect } from "react";
import { TodoType, CategoryType } from "types";
import { HeaderComponent } from "components/header";
import { SidebarComponent } from "components/sidebar";
import { TodoListDetail } from "components/TodoLists/TodoListDetail";

export default function TodoListIndex() {
  const [todoLists, setTodoLists] = useState<TodoType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showingTodoList, setShowingTodoList] = useState<TodoType>();

  useEffect(() => {
    fetchTodoLists();
    fetchCategories();
  }, []);

  const fetchTodoLists = async () => {
    const res: TodoType[] = await fetch("/api/todo_lists").then((res) =>
      res.json()
    );
    setTodoLists(res);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories").then((res) => res.json());
    console.log(res);
    setCategories(res.categories);
  };
  return (
    <div>
      <HeaderComponent />
      <div className="flex">
        <SidebarComponent
          categories={categories}
          showTodoList={(todo) => setShowingTodoList(todo)}
        />
        <TodoListDetail todoList={showingTodoList} />
      </div>
    </div>
  );
}
