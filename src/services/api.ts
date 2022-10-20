import axios from "axios";
import { GET_NEWS, GET_TODOLIST_TASKS, GET_WEATHER } from "./consts";

export const getTodoListTasks = async () => {
  const response = await axios.get(GET_TODOLIST_TASKS);
  return response;
};

export const getNews = async () => {
  const response = await axios.get(GET_NEWS);
  return response;
};

export const getWeather = async () => {
  const response = await axios.get(GET_WEATHER);
  return response;
};
