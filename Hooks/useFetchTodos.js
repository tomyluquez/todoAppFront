import { useQuery } from "react-query";

const useFetchTodos = () => {
  const { isLoading, isError, data } = useQuery("todos", () =>
    fetch("https://todoapplist2.onrender.com/api/todos")
      .then((response) => response.json())
      .then((responseData) => {
        const reversedData = responseData.data.reverse();
        return { ...responseData, data: reversedData };
      })
  );
  return { isLoading, isError, data };
};

export default useFetchTodos;
