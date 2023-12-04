import { useState, useEffect } from "react";
import { TodoType, CategoryType } from "types";
import { HeaderComponent } from "components/header";
import { SidebarComponent } from "components/sidebar";
import { TodoListDetail } from "components/TodoLists/TodoListDetail";
import { TodoForm, TodoFormType } from "components/TodoLists/TodoForm";
import { categoriesState } from "state/TodoState";
import { useSetRecoilState } from "recoil";

export default function TodoListIndex() {
  const [todoLists, setTodoLists] = useState<TodoType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showingTodoList, setShowingTodoList] = useState<TodoType>();
  const [isNewTodo, setNewTodo] = useState<boolean>(false);
  const setCategoriesList = useSetRecoilState<CategoryType[]>(categoriesState);

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
    setCategoriesList(res.categories);
  };

  const createTodo = async (todoFormValues: TodoFormType) => {
    const params = {
      title: todoFormValues.title,
      content: todoFormValues.content ?? "",
      completedDate: new Date(todoFormValues.completedDate),
      responsibleUserName: todoFormValues.responsibleUserName,
      categories: todoFormValues.categoryIds,
    };
    const newTodo: TodoType = await fetch("/api/todo_lists", {
      method: "POST",
      body: JSON.stringify(params),
    }).then((res) => res.json());
    setCategoriesList((prevCategories) =>
      prevCategories.map((category) => {
        if (
          newTodo.categories.some((c: CategoryType) => c.slug === category.slug)
        ) {
          return {
            ...category,
            todoLists: [...category.todoLists, newTodo],
          };
        } else {
          return category;
        }
      })
    );
    setNewTodo(false);
  };

  const openEditTodo = (editingTodo: TodoType) => {};

  const MainContent = () => {
    if (isNewTodo) {
      return <TodoForm createTodo={createTodo} />;
    } else if (showingTodoList) {
      return (
        <TodoListDetail
          todoList={showingTodoList}
          openEditTodo={(editingTodo) => openEditTodo(editingTodo)}
        />
      );
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
