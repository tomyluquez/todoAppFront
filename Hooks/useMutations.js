import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";

const useMutations = () => {
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
  return [mutationComplete, mutationDelete];
};

export default useMutations;
