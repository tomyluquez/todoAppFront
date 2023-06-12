export const fetchData = () => {
  fetch("http://localhost:5050/api/todos").then((response) => response.json());
};
