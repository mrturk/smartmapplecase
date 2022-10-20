import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogTitle } from "@mui/material";
type AddTodoTaskDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  content: JSX.Element;
};

const TodoTaskDialog = ({ open, setOpen, content }: AddTodoTaskDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {content}
    </Dialog>
  );
};

export default TodoTaskDialog;
