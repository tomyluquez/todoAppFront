import useMutations from "../../Hooks/useMutations";
import TodoItem from "./TodoItem";

const Todos = ({ todos }) => {
  const [mutationComplete, mutationDelete] = useMutations();

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
