import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, toDosState } from "../atoms";
import CreateToDo from "./CreateToDo";
import Todo from "./ToDo";
import Category from "./Category";
import { useEffect } from "react";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  const [allToDos, setAllToDos] = useRecoilState(toDosState);
  useEffect(() => {
    const localToDos = localStorage.getItem("toDos");
    if (localToDos) setAllToDos(JSON.parse(localToDos));
  }, []);

  console.log("allToDos", allToDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <Category />
      <hr />
      <CreateToDo />
      {toDos.map((toDo) => (
        <Todo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
