import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { CategoryType, TodoType } from "types";

type PropsType = {
  categories: CategoryType[];
  showTodoList: (todo: TodoType) => void;
};

export const SidebarComponent = (props: PropsType) => {
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

  useEffect(() => {
    setCategoriesData(props.categories);
  }, [props.categories]);

  return (
    <div className="max-w-xs">
      <Accordion allowToggle>
        {categoriesData.map((category) => {
          return (
            <AccordionItem key={category.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {category.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {category.todoLists.map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      className="cursor-pointer hover:bg-sky-100"
                      onClick={() => props.showTodoList(todo)}
                    >
                      {todo.title}
                    </div>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
