import Image from "next/image";
import React from "react";
import Link from "next/link";
import prisma from "./db";
// import ToDos from "@/src/componnent/ToDos";
import Todo from "@/components/Todo";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";

import ToDos from "@/components/ToDos";

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
        <div className="flex flex-col mt-28 gap-4 p-4 w-full ">
          <AnimatePresence>
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
          </AnimatePresence>
        </div>
      </Suspense>
    </main>
  );
}
