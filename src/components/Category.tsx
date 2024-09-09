import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import React from "react";
import { categoriesState, categoryState } from "../atoms";

interface IForm {
  id: number;
  category: string;
}

function Category() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ category }: IForm) => {
    setCategories((oldCategories) => [category, ...oldCategories]);
    setValue("category", "");
  };
  return (
    <div>
      <select value={category} onInput={onInput}>
        {categories.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("category", { required: "Please write a category" })}
          placeholder="Write a category"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Category;
