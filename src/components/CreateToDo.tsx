import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDosState } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDosState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    const newTodos = [{ id: Date.now(), text: toDo, category }, ...toDos];
    setToDos(newTodos);
    localStorage.setItem("toDos", JSON.stringify(newTodos));
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a todo" })}
        placeholder="Write a todo"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
