import { Text, Tag, Button } from "@chakra-ui/react";
import { TodoType } from "types";

type PropsType = {
  todoList: TodoType | undefined;
  openEditTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
};

export const TodoListDetail = (props: PropsType) => {
  const { todoList, openEditTodo, deleteTodo } = props;

  if (!todoList) return <></>;

  return (
    <div>
      <div className="flex">
        タスク名：<Text>{todoList.title}</Text>
      </div>
      <div className="flex">
        タスク内容：<Text>{todoList.content}</Text>
      </div>
      <div className="flex">
        担当者：<Text>{todoList.responsibleUserName}</Text>
      </div>
      <div className="flex">
        進捗状況：<Text>{todoList.isDone ? "完了" : "未完了"}</Text>
      </div>
      <div className="flex">
        期日：<Text>{todoList.completedDate.toString()}</Text>
      </div>
      <div className="flex">
        登録日：<Text>{todoList.createdAt.toString()}</Text>
      </div>
      <div>
        {todoList.categories?.map((category) => {
          return (
            <Tag
              className="mr-1"
              key={category.id}
              colorScheme={category.color}
            >
              {category.name}
            </Tag>
          );
        })}
      </div>
      <div className="mt-4">
        <Button colorScheme="green" onClick={() => openEditTodo(todoList)}>
          編集
        </Button>
        {todoList.isDone === false && (
          <Button className="ml-4" colorScheme="blue">
            完了に変更
          </Button>
        )}
        <Button className="ml-4" colorScheme="red" onClick={() => deleteTodo(todoList)}>
          削除
        </Button>
      </div>
    </div>
  );
};
