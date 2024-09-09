import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDosState } from "../atoms";

function Todo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDosState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { id, text, category: name };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo as any,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  console.log("all", useRecoilValue(toDosState));
  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (item) =>
          category !== item && (
            <button name={item} onClick={onClick}>
              {item}
            </button>
          )
      )}
    </li>
  );
}

export default Todo;
