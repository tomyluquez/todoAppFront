import { ReactQueryDevtools } from "react-query/devtools";
import { Box, ChakraProvider, Divider, Flex } from "@chakra-ui/react";
import FormTodo from "./components/FormTodo";
import PanelTodos from "./components/PanelTodos";
import useFetchTodos from "../Hooks/useFetchTodos";

function App() {
  const { isLoading, isError, data } = useFetchTodos();
  return (
    <>
      <ChakraProvider>
        <Box bg="gray.100" minH="100vh" py={16}>
          <Flex
            as="main"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
            margin="10 auto"
          >
            <FormTodo isLoading={isLoading} />
            <Divider orientation="horizontal" />
            <PanelTodos isLoading={isLoading} isError={isError} data={data} />
          </Flex>
        </Box>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
