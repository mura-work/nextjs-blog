import { useState, useEffect } from "react";
import { TodoType, CategoryType } from "types";
import { HeaderComponent } from "components/header";
import { SidebarComponent } from "components/sidebar";
import { TodoListDetail } from "components/TodoLists/TodoListDetail";
import { TodoForm, TodoFormType } from "components/TodoLists/TodoForm";
import { categoriesState } from "state/TodoState";
import { useRecoilState } from "recoil";

export default function TodoListIndex() {
  const [todoLists, setTodoLists] = useState<TodoType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showingTodoList, setShowingTodoList] = useState<TodoType>();
  const [displayTodoForm, setDisplayTodoForm] = useState<boolean>(false);
  const [categoryList, setCategoriesList] =
    useRecoilState<CategoryType[]>(categoriesState);
  const [editingTodo, setEditingTodo] = useState<TodoType | undefined>(
    undefined
  );

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
    setDisplayTodoForm(false);
  };

  const updateTodo = async (targetTodo: TodoFormType, id: number) => {
    const params = {
      title: targetTodo.title,
      content: targetTodo.content ?? "",
      completedDate: new Date(targetTodo.completedDate),
      responsibleUserName: targetTodo.responsibleUserName,
      categories: targetTodo.categoryIds,
      id,
    };
    const updatedTodo: TodoType = await fetch("/api/todo_lists", {
      method: "PATCH",
      body: JSON.stringify(params),
    }).then((res) => res.json());
    setCategoriesList((prevCategories) =>
      prevCategories.map((category) => {
        if (
          // 既存のカテゴリに入っている場合は上書き
          category.todoLists.some((todo) => todo.id === updatedTodo.id) &&
          updatedTodo.categories.some(
            (c: CategoryType) => c.slug === category.slug
          )
        ) {
          const newTodoList = category.todoLists.filter(
            (todo) => todo.id !== updatedTodo.id
          );
          newTodoList.push(updatedTodo)
          return {
            ...category,
            todoLists: newTodoList,
          };
        } else if (
          // 既存のカテゴリに入っておらず、updatedTodoのカテゴリに入っている場合は追加
          !category.todoLists.some((todo) => todo.id === updatedTodo.id) &&
          updatedTodo.categories.some(
            (c: CategoryType) => c.slug === category.slug
          )
        ) {
          return {
            ...category,
            todoLists: [...category.todoLists, updatedTodo],
          };
        } else if (
          // 既存のカテゴリに入っていて、updatedTodoのカテゴリに入っていない場合は除く
          category.todoLists.some((todo) => todo.id === updatedTodo.id) &&
          !updatedTodo.categories.some(
            (c: CategoryType) => c.slug === category.slug
          )
        ) {
          return {
            ...category,
            todoLists: category.todoLists.filter(
              (todo) => todo.id !== updatedTodo.id
            ),
          };
        } else {
          return category;
        }
      })
    );
    setDisplayTodoForm(false);
  };

  const openEditTodo = (editingTodo: TodoType) => {
    if (!editingTodo) return;
    setShowingTodoList(undefined);
    setEditingTodo(editingTodo);
    setDisplayTodoForm(true);
  };

  const deleteTodo = async (targetTodo: TodoType) => {
    if (!targetTodo) return;
    const params = { id: targetTodo.id };
    await fetch("/api/todo_lists", {
      method: "DELETE",
      body: JSON.stringify(params),
    }).then((res) => {
      if (res.status === 200) {
        const newCategoryList = categoryList.map((c) => ({
          ...c,
          todoLists: c.todoLists.filter((todo) => todo.id !== targetTodo.id),
        }));
        setCategoriesList(newCategoryList);
        setShowingTodoList(undefined);
      }
    });
  };

  const MainContent = () => {
    if (displayTodoForm) {
      return (
        <TodoForm
          createTodo={createTodo}
          updateTodo={updateTodo}
          editingTodo={editingTodo}
        />
      );
    } else if (showingTodoList) {
      return (
        <TodoListDetail
          todoList={showingTodoList}
          openEditTodo={(editingTodo) => openEditTodo(editingTodo)}
          deleteTodo={(todo) => deleteTodo(todo)}
        />
      );
    } else {
      return <></>;
    }
  };

  const openDetailTodoList = async (todo: TodoType) => {
    const targetTodo: TodoType = await fetch(`/api/todo_lists/${todo.id}`).then(
      (r) => r.json()
    );
    setShowingTodoList(targetTodo);
  };

  return (
    <div>
      <HeaderComponent openNewTodo={() => setDisplayTodoForm(true)} />
      <div className="flex">
        <SidebarComponent
          categories={categories}
          showTodoList={(todo) => openDetailTodoList(todo)}
        />
        <MainContent />
      </div>
    </div>
  );
}
