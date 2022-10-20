import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TodoListTask } from "../../model";
import { getWeekday } from "../../utils";

type TodoListCardProps = {
  todoListTask: TodoListTask;
  onComplated: (todoListTask: TodoListTask) => void;
  onDelete: (todoListTask: TodoListTask) => void;
  newRef?: any;
  onEdit: (todoListTask: TodoListTask) => void;
};

const TodoListCard = ({
  todoListTask,
  onComplated,
  onDelete,
  onEdit,
  newRef,
  ...props
}: TodoListCardProps) => {
  return (
    <Card
      ref={newRef}
      {...props}
      sx={{ maxWidth: "345px", marginBottom: "10px" }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            textDecoration: todoListTask.isCompleted
              ? "line-through"
              : "inherit",
          }}
          component="div"
        >
          {todoListTask.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Son Gün:{getWeekday(todoListTask.endDate)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            onComplated(todoListTask);
          }}
          size="small"
        >
          {todoListTask.isCompleted ? "Yapılmadı" : "Yapıldı"}
        </Button>
        <Button
          onClick={() => {
            onEdit(todoListTask);
          }}
          size="small"
        >
          Düzenle
        </Button>
        <Button
          onClick={() => {
            onDelete(todoListTask);
          }}
          size="small"
        >
          Sil
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoListCard;
