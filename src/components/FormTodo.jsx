import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

const FormTodo = () => {
  const [todo, setTodo] = useState("");
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

  const handlerClick = () => {
    setIsLoading(true);
    mutation.mutate({ description: todo });
    setTodo("");
  };

  return (
    <Box
      maxW="600px"
      w="100%"
      borderWidth="1px"
      borderRight="lg"
      overflow="hidden"
      bg="white"
      padding="10"
      boxShadow="base"
      p="6"
      rounded="md"
      m={5}
    >
      <Flex alignItems="center" justifyContent="center">
        <FormControl id="todo" w="80%">
          <FormLabel>To-do</FormLabel>
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <FormHelperText>Ingresa tu to-do</FormHelperText>
          <Button
            mt="10"
            bg="#7928CA"
            _hover={{ bg: "#9e47f5", fontWeight: "700" }}
            color="white"
            fontWeight="600"
            onClick={handlerClick}
            isDisabled={todo.length === 0 ? true : false}
            isLoading={isLoading ? true : false}
          >
            Crear Todo
          </Button>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default FormTodo;
