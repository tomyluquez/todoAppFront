import Todos from "./Todos";

const PanelTodos = ({ isLoading, isError, data }) => {
  if (isLoading) {
    return <div>CARGANDO</div>;
  }

  if (isError) {
    return <div>HUBO UN ERROR</div>;
  }

  if (data.data.length > 0) {
    return <Todos todos={data} />;
  }

  return <div>No hay TODOS</div>;
};

export default PanelTodos;
