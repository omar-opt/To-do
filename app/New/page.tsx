import Link from "next/link";
import React from "react";
import prisma from "../db";
import { redirect } from "next/navigation";
async function creatTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length == 0) {
    throw new Error("Invalid type ");
  }

  await prisma.todo.create({ data: { title, complet: false } });
  redirect("/");
}
function page() {
  return (
    <div className="p-2 mt-24">
      {" "}
      <header className="flex justify-between fixed  w-full top-0 items-center px-8 p-4 backdrop-blur-md">
        <div className="text-2xl mt-3">NEW</div>
      </header>
      <form action={creatTodo}>
        <input
          type="text"
          name="title"
          id=""
          className="w-full p-4 rounded-lg text-black text-lg bg-gray-300"
        />
        <div className="justify-end w-full flex gap-2 p-4">
          <Link
            href={"/"}
            className="px-4 py-2 border border-slate-100  rounded-lg text-xl hover:bg-slate-700 focus-within:scale-110 duration-100"
          >
            Cancel
          </Link>
          <button className="px-8 py-2 border border-slate-100  rounded-lg text-xl hover:bg-slate-700 focus-within:scale-110  after:scale-100">
            Creat
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
