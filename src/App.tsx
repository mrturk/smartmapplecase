import React, { useCallback, useEffect, useState } from "react";
import { Stack, Input, Button, DialogTitle } from "@mui/material";
import NewsList from "./components/News/newsList";
import WeatherList from "./components/Weather/weatherList";
import { News, TodoListTask, Weather } from "./model";
import { getNews, getTodoListTasks, getWeather } from "./services/api";
import TodoList from "./components/TodoList/TodoList";
import { useDispatch } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import TodoTaskDialog from "./components/Dialog/todoTaskDialog";
import { getWeekday } from "./utils";

function App() {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [todoListTasks, setTodoListTasks] = useState<TodoListTask[]>([]);
  const [filteredTodoListTask, setFilteredTodoListTask] = useState<
    TodoListTask[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>();
  const [editOrAdd, setEditOrAdd] = useState<string>("add");
  const [editedTodoListTask, setEditedTodoListTask] = useState<TodoListTask>();

  const dispatch = useDispatch();

  const getAllData = useCallback(async () => {
    const weatherResponse = await getWeather();
    const newsResponse = await getNews();
    const todoListTaskResponse = await getTodoListTasks();
    dispatch({
      type: "SET",
      payload: todoListTaskResponse.data as TodoListTask[],
    });
    setWeather(weatherResponse.data as Weather[]);
    setNews(newsResponse.data as News[]);
    setFilteredTodoListTask(todoListTaskResponse.data as TodoListTask[]);
    setTodoListTasks(todoListTaskResponse.data as TodoListTask[]);
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    console.log(todoListTasks);
    if (searchQuery.trim()) {
      setFilteredTodoListTask(
        todoListTasks.filter((item) =>
          item.subject
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase().trim())
        )
      );
    } else {
      setFilteredTodoListTask(todoListTasks);
    }
  }, [todoListTasks]);

  const onDragEnd = async ({ destination, source }: DropResult) => {
    if (searchQuery.trim()) {
      alert("arama yaparken sıralama yapamazsınız");
      return;
    }
    if (!destination) return;

    const item = Array.from(
      searchQuery.trim() ? filteredTodoListTask : todoListTasks
    );

    const [reorderItem] = item.splice(source.index, 1);
    item.splice(destination.index, 0, reorderItem);
    setFilteredTodoListTask(item as TodoListTask[]);
    setTodoListTasks(
      searchQuery.trim()
        ? (todoListTasks as TodoListTask[])
        : (item as TodoListTask[])
    );
    dispatch({
      type: "SET",
      payload: searchQuery.trim()
        ? (todoListTasks as TodoListTask[])
        : (item as TodoListTask[]),
    });
  };

  return (
    <Stack paddingY="10px" gap="10px" flexDirection="row">
      <Stack
        sx={{
          border: "1px solid black",
          height: "95vh",
          width: "350px",
        }}
      >
        <TodoList
          onAddTask={() => {
            setOpen(true);
            setEditOrAdd("add");
          }}
          onEdit={(value) => {
            setEditedTodoListTask(value);
            setSubject(value.subject);
            const date = new Date(value.endDate);
            setEndDate(date);
            setEditOrAdd("edit");
            setOpen(true);
          }}
          onDragEnd={onDragEnd}
          onComplated={(value) => {
            todoListTasks.forEach((item) => {
              if (item === value) {
                item.isCompleted = !value.isCompleted;
              }
            });
            setTodoListTasks([...todoListTasks]);
            dispatch({ type: "SET", payload: todoListTasks });
          }}
          onDelete={(value) => {
            setFilteredTodoListTask([
              ...filteredTodoListTask.filter((item) => item !== value),
            ]);
            setTodoListTasks([
              ...todoListTasks.filter((item) => item !== value),
            ]);
            dispatch({
              type: "SET",
              payload: [...todoListTasks.filter((item) => item !== value)],
            });
          }}
          searchQuery={searchQuery}
          todoListTasks={filteredTodoListTask}
          onSearch={(value) => {
            setFilteredTodoListTask(
              todoListTasks.filter((item) =>
                item.subject
                  .toLocaleLowerCase()
                  .includes(value.toLocaleLowerCase().trim())
              )
            );
            setSearchQuery(value);
          }}
        />
      </Stack>
      <Stack justifyContent="center" gap="10px" flex={1}>
        <Stack sx={{ border: "1px solid black" }} paddingLeft="10px">
          <WeatherList weathers={weather} />
        </Stack>
        <Stack sx={{ border: "1px solid black" }} paddingLeft="10px">
          <NewsList news={news} />
        </Stack>
      </Stack>

      {/*Add Task Dialog */}
      <TodoTaskDialog
        open={open}
        setOpen={setOpen}
        content={
          <Stack sx={{ width: "500px", padding: "20px" }}>
            <DialogTitle>
              {editOrAdd === "add" ? "Yeni Görev Ekle" : "Görev Düzenle"}
            </DialogTitle>
            {editOrAdd === "add" ? (
              <Stack>
                <Stack>
                  <Input
                    placeholder="Görevi Giriniz"
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                  />
                </Stack>
                <Stack>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setEndDate(date);
                    }}
                  />
                </Stack>
                <Stack justifyContent="center" gap="10px" flexDirection="row">
                  <Button
                    onClick={() => {
                      const date = new Date();
                      const newValue = {
                        subject: subject,
                        isCompleted: false,
                        endDate: endDate
                          ? ((endDate as unknown) as Date)
                          : date,
                      };

                      setTodoListTasks([...todoListTasks, newValue]);
                      dispatch({
                        type: "SET",
                        payload: [...todoListTasks, newValue],
                      });
                      setOpen(false);
                    }}
                  >
                    Ekle
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Vazgeç
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack gap="10px">
                <Stack>
                  <Input
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                  />
                </Stack>
                <Stack>
                  {endDate
                    ? getWeekday(endDate)
                    : editedTodoListTask &&
                      getWeekday(editedTodoListTask.endDate)}
                </Stack>
                <Stack>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setEndDate(date);
                    }}
                  />
                </Stack>
                <Stack justifyContent="center" gap="10px" flexDirection="row">
                  <Button
                    onClick={() => {
                      todoListTasks.forEach((item) => {
                        if (item == editedTodoListTask) {
                          const date = new Date();
                          item.subject = subject;
                          item.isCompleted = item.isCompleted;
                          item.endDate = endDate
                            ? (endDate as Date)
                            : editedTodoListTask.endDate;
                        }
                      });
                      setTodoListTasks([...todoListTasks]);
                      dispatch({ type: "SET", payload: todoListTasks });
                      setOpen(false);
                    }}
                  >
                    Güncelle
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Vazgeç
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        }
      />
    </Stack>
  );
}

export default App;
