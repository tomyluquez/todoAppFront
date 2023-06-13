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
import useNewMutation from "../../Hooks/useNewMutation";

const FormTodo = () => {
  const [todo, setTodo] = useState("");
  const { mutation, isLoading, setIsLoading } = useNewMutation();

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
