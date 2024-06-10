import Image from "next/image";
import Link from "next/link";
import prisma from "./db";
// import ToDos from "@/src/componnent/ToDos";
import Todo from "@/components/Todo";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/Loading";

async function toggleTodo(id: string, complet: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complet } });
}
async function deletTodo(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
  redirect("/");
}
export default async function Home() {
  const todos = await prisma.todo.findMany();
  // await prisma.todo.create({ data: { title: "red", complet: false } });
  return (
    <main className="">
      <header className="flex justify-between fixed  w-full top-0 items-center px-8 p-4 backdrop-blur-md">
        <div className="text-2xl">To do</div>
        <Link
          href={"/New"}
          className="px-4 py-2 border border-slate-100  rounded-lg text-2xl hover:bg-slate-700 focus-within:scale-110 duration-100"
        >
          New
        </Link>
      </header>
      <Suspense fallback={<Loading />}>
        <ul className="flex flex-col mt-28 gap-4 p-4 w-full ">
          {todos.map((todo) => {
            return (
              <Todo
                {...todo}
                key={todo.id}
                toggleTodo={toggleTodo}
                deletTodo={deletTodo}
              />
            );
          })}{" "}
        </ul>
      </Suspense>
    </main>
  );
}
