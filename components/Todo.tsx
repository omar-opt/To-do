"use client";
import { CiTrash } from "react-icons/ci";
type Todotype = {
  id: string;
  title: string;
  complet: boolean;
  toggleTodo: (id: string, complet: boolean) => void;
  deletTodo: (id: string) => void;
};

function Todo({ id, title, complet, toggleTodo, deletTodo }: Todotype) {
  return (
    <li className="flex gap-4 border justify-between border-slate-100 rounded-lg p-4 items-center">
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          className="peer cursor-pointer w-5 h-5"
          id={id}
          defaultChecked={complet}
          onChange={(e) => {
            toggleTodo(id, e.target.checked);
          }}
        />
        <label htmlFor={id} className="text-2xl peer-checked:line-through">
          {title}
        </label>
      </div>
      <CiTrash
        className="text-2xl text-white cursor-pointer"
        onClick={(e) => {
          deletTodo(id);
        }}
      />
    </li>
  );
}

export default Todo;
