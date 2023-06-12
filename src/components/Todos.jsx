import { useMutation, useQueryClient } from "react-query";
import TodoItem from "./TodoItem";
import { useToast } from "@chakra-ui/react";

const Todos = ({ todos }) => {
  const queryclient = useQueryClient();
  const toast = useToast();

  const mutationComplete = useMutation(
    (data) =>
      fetch("https://todoapplist2.onrender.com/api/todos", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        toast({
          title: "To-Do Modificado",
          description: "Se ha modificado el to-do con exito.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        queryclient.invalidateQueries("todos");
      },
    }
  );

  const mutationDelete = useMutation(
    (data) =>
      fetch("https://todoapplist2.onrender.com/api/todos", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        toast({
          title: "To-Do Eliminado",
          description: "Se ha eliminado el to-do con exito.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        queryclient.invalidateQueries("todos");
      },
    }
  );

  const handlerUpdateTodo = (id, isComplete, description) => {
    if (description === undefined) {
      mutationComplete.mutate({ id, isComplete: !isComplete, description });
    } else {
      mutationComplete.mutate({ id, isComplete: false, description });
    }
  };

  const handlerDeleteTodo = (id) => mutationDelete.mutate({ id });

  return (
    <>
      {todos &&
        todos.data.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdateTodo={handlerUpdateTodo}
            onDeleteTodo={handlerDeleteTodo}
          />
        ))}
    </>
  );
};

export default Todos;
