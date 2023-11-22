import { useState, useEffect } from "react";
import { TodoType, CategoryType } from "types";
import { HeaderComponent } from "components/header";
import { SidebarComponent } from "components/sidebar";
import { TodoListDetail } from "components/TodoLists/TodoListDetail";
import { TodoForm } from "components/TodoLists/TodoForm";
import { categoriesState } from "state/TodoState";
import { useRecoilState } from "recoil";

export default function TodoListIndex() {
  const [todoLists, setTodoLists] = useState<TodoType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showingTodoList, setShowingTodoList] = useState<TodoType>();
  const [isNewTodo, setNewTodo] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useRecoilState(categoriesState);

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
    setCategories(res.categories);
		setCategoriesList(res.categories)
  };

  const MainContent = () => {
    if (isNewTodo) {
      return <TodoForm />;
    } else if (showingTodoList) {
      return <TodoListDetail todoList={showingTodoList} />;
    } else {
      return <></>;
    }
  };
  return (
    <div>
      <HeaderComponent openNewTodo={() => setNewTodo(true)} />
      <div className="flex">
        <SidebarComponent
          categories={categories}
          showTodoList={(todo) => setShowingTodoList(todo)}
        />
        <MainContent />
      </div>
    </div>
  );
}
