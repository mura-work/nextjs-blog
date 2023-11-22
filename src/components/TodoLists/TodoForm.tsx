import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Badge,
  Input,
	Button,
} from "@chakra-ui/react";
import categories from "pages/api/categories";
import { useState, useEffect } from "react";
import { CategoryType } from "types";

export type TodoFormType = {
  id?: number;
  title: string;
  content?: string;
  completedDate: string;
  responsibleUserName?: string;
  isDone: boolean;
  categories: CategoryType[];
};

type PropsType = {
  categories: CategoryType[];
};

export const TodoForm = (props: PropsType) => {
  const { categories } = props;
  const [todoForm, setTodoForm] = useState<TodoFormType>({
    title: "",
    content: "",
    completedDate: new Date().toDateString(),
    responsibleUserName: "",
    isDone: false,
    categories: [],
  });
  const [todoFormError, setTodoFormError] = useState<{
    [K in keyof TodoFormType]: boolean;
  }>({
    title: false,
    content: false,
    completedDate: false,
    responsibleUserName: false,
    isDone: false,
    categories: false,
  });

  return (
    <div className="ml-8">
      <FormControl className="mt-4" isInvalid={todoFormError.title}>
        <FormLabel>タスク名</FormLabel>
        <Input
          type="text"
          value={todoForm.title}
          onChange={(e) =>
            setTodoForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <FormErrorMessage>タイトルが入力されていません。</FormErrorMessage>
      </FormControl>
      <FormControl className="mt-4">
        <FormLabel>タスク内容</FormLabel>
        <Textarea
          value={todoForm.content}
          onChange={(e) =>
            setTodoForm((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl className="mt-4">
        <FormLabel>カテゴリ</FormLabel>
        <CheckboxGroup>
          {categories.map((category: CategoryType) => {
            return (
              <Checkbox
                key={category.id}
                isChecked={todoForm.categories.some(
                  (c) => c.id === category.id
                )}
                className="mr-2 my-2"
              >
                <Badge
                  key={category.id}
                  className="px-1 mr-1"
                  colorScheme={category.color}
                >
                  {category.name}
                </Badge>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </FormControl>
      <FormControl className="mt-4">
        <FormLabel>期限日</FormLabel>
        <Input
          type="date"
          value={todoForm.completedDate}
          onChange={(e) =>
            setTodoForm((prev) => ({
              ...prev,
              completedDate: e.target.value,
            }))
          }
        />
      </FormControl>
      {/* いずれユーザー登録機能を作り、ユーザーをプルダウンで表示させたい */}
      <FormControl
        className="mt-4"
        isInvalid={todoFormError.responsibleUserName}
      >
        <FormLabel>担当者</FormLabel>
        <Input
          type="text"
          value={todoForm.responsibleUserName}
          onChange={(e) =>
            setTodoForm((prev) => ({
              ...prev,
              responsibleUserName: e.target.value,
            }))
          }
        />
        <FormErrorMessage>担当者が入力されていません。</FormErrorMessage>
      </FormControl>
			<FormControl>
				<Button>投稿</Button>
			</FormControl>
    </div>
  );
};
