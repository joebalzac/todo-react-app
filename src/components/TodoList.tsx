import { Button, Card, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "./ui/toaster";
import { TbGridDots } from "react-icons/tb";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { InputGroup } from "./ui/input-group";

const TodoList = ({}) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>("");

  const handleAddTodo = () => {
    if (todo === "") {
      toaster.create({
        title: "Todo cannot be empty",
        type: "error",
      });
      return;
    }
    setTodos([...todos, todo]);
    setTodo("");
    toaster.create({
      title: "Todo added",
      type: "success",
    });
  };

  const handleRemoveTodo = () => {
    const newTodos = todos.filter((_, index) => index !== todos.length - 1);
    setTodos(newTodos);
    toaster.create({
      title: "Todo removed",
      type: "info",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, removed);

    setTodos(reorderedTodos);
  };

  return (
    <Card.Root
      width="600px"
      className="shadow-md bg-slate-950 text-gray-100 min-h-96"
    >
      <Card.Header className="text-1xl text-gray-100"> Todo List </Card.Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="TodoList">
          {(provided) => (
            <Card.Body
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="text-gray-100 gap-2"
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={index}
                  draggableId={`todo-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <Card.Body
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="text-1xl px-4 py-1 bg-slate-800 shadow-sm rounded cursor-pointer max-h-10 flex flex-row items-center"
                      justifyContent="space-between"
                    >
                      {todo}
                      <Flex gap={2}>
                        <span
                          {...provided.dragHandleProps}
                          className="cursor-grab"
                        >
                          <TbGridDots />
                        </span>
                        <CiCircleMinus
                          onClick={() => handleRemoveTodo()}
                          className="text-red-400"
                        />
                      </Flex>
                    </Card.Body>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Card.Body>
          )}
        </Droppable>
      </DragDropContext>

      <Card.Footer justifyContent="flex-end" gap={4}>
        <InputGroup>
          <Flex align={"center"}>
            <Input
              className="border border-gray-800 rounded px-4 relative w-ful"
              placeholder="Add Todo"
              value={todo}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
            />
            <CiCirclePlus
              onClick={handleAddTodo}
              className="text-green-400 absolute right-2 cursor-pointer"
            />
          </Flex>
        </InputGroup>

        <Button
          onClick={handleAddTodo}
          className="bg-slate-900 border text-white py-3 px-4 shadow-sm"
          variant="outline"
        >
          Add
        </Button>
        <Button
          onClick={handleRemoveTodo}
          className="bg-slate-500 text-gray-300 py-3 px-4"
        >
          Remove
        </Button>
        <Toaster />
      </Card.Footer>
    </Card.Root>
  );
};

export default TodoList;
