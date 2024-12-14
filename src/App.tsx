import { Flex } from "@chakra-ui/react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <Flex
        className="h-screen bg-slate-800 w-screen overflow-hidden"
        justifyContent={"center"}
        align={"center"}
      >
        <TodoList />
      </Flex>
    </>
  );
}

export default App;
