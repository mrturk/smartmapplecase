export type Weather = {
  tempeture: string;
  type: string;
  date: Date;
};

export type News = {
  title: string;
  description: string;
  date: Date;
  source: string;
  img_url: string;
};

export type TodoListTask = {
  subject: string;
  isCompleted: boolean;
  endDate: Date;
};
