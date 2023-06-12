import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleUpdate = () => {
    onUpdateTodo(todo._id, todo.isComplete, editedDescription);
    setIsEditing(false);
  };

  return (
    <motion.div
      style={{ width: "90%", display: "flex", justifyContent: "center" }}
      whileHover={{ scale: 1.05 }}
    >
      <Box
        borderWidth="1px"
        borderRight="lg"
        overflow="hidden"
        bg="white"
        mt={5}
        borderColor={todo.isComplete ? "green" : null}
        maxW="500px"
        w="100%"
      >
        <Box p="6" display="flex" flexDirection="column" minW="300px" w="100%">
          <Flex justify="space-between" alignItems="center">
            {isEditing ? (
              <Input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                onBlur={handleUpdate}
                autoFocus
              />
            ) : (
              <Text onDoubleClick={() => setIsEditing(true)}>
                {todo.description}
              </Text>
            )}
            <FiEdit onClick={() => setIsEditing(true)} />
          </Flex>
          <Flex justify="space-between">
            <Button
              mt="10"
              bg="#7928CA"
              _hover={{ bg: "#9e47f5", fontWeight: "700" }}
              color="white"
              fontWeight="600"
              onClick={() => onUpdateTodo(todo._id, todo.isComplete)}
            >
              {todo.isComplete ? "Completado!!!" : "Completar"}
            </Button>
            <Button
              mt="10"
              bg="#CD5555"
              _hover={{ bg: "#f72a2a", fontWeight: "700" }}
              color="white"
              fontWeight="600"
              onClick={() => onDeleteTodo(todo._id)}
            >
              Eliminar
            </Button>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
};

export default TodoItem;
