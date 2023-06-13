import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useNewMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryclient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(
    (newTodo) =>
      fetch("https://todoapplist2.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }),
    {
      onSuccess: () => {
        toast({
          title: "To-Do Creado",
          description: "Se ha creado un nuevo to-do.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
        queryclient.invalidateQueries("todos");
      },
    }
  );
  return { mutation, isLoading, setIsLoading };
};

export default useNewMutation;
