import React, { Dispatch, SetStateAction } from "react";
import { Card, Box, Input, Typography, Stack, Button } from "@mui/material";
import { TodoListTask } from "../../model";
import TodoListCard from "./TodoListCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
type TodoListProps = {
  todoListTasks: TodoListTask[];
  searchQuery: string;
  onSearch: (value: string) => void;
  title?: string;
  onComplated: (todoListTask: TodoListTask) => void;
  onDelete: (todoListTask: TodoListTask) => void;
  onDragEnd: ({ destination, source }: DropResult) => void;
  onAddTask: () => void;
  onEdit: (todoListTask: TodoListTask) => void;
};

const TodoList = ({
  todoListTasks,
  searchQuery,
  onSearch,
  onDelete,
  onComplated,
  onDragEnd,
  onEdit,
  onAddTask,
  title = "Todo List",
}: TodoListProps) => {
  return (
    <Card
      sx={{
        height: "100vh",
        overflowY: "scroll",
        padding: "20px",
      }}
    >
      <Stack
        flexDirection="row"
        gap="10px"
        alignItems="center"
        justifyContent="center"
      >
        <Stack height="100px" justifyContent="center" alignItems="center">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Stack>
        <Stack height="100px" justifyContent="center" alignItems="center">
          <Button onClick={onAddTask}>Yeni Görev Ekle</Button>
        </Stack>
      </Stack>
      <Box marginBottom="10px">
        <Input
          sx={{ width: "100%" }}
          placeholder="search"
          value={searchQuery}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task12">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoListTasks.map((todoListTask, index) => {
                return (
                  <Draggable
                    draggableId={index.toString()}
                    key={index}
                    index={index}
                  >
                    {(provided) => (
                      <TodoListCard
                        onEdit={onEdit}
                        newRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onComplated={onComplated}
                        onDelete={onDelete}
                        todoListTask={todoListTask}
                        key={index}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
};
export default TodoList;
