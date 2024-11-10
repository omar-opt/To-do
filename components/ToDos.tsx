import Todo from "@/components/Todo";
import React from "react";
import { redirect } from "next/navigation";
import prisma from "../app/db";
import { AnimatePresence } from "framer-motion";
async function toggleTodo(id: string, complet: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complet } });
}
async function deletTodo(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
  redirect("/");
}
type Todotype = {
  id: string;
  title: string;
  complet: boolean;
  toggleTodo: (id: string, complet: boolean) => void;
  deletTodo: (id: string) => void;
};

export default async function ToDos() {
  // console.log("kdkdkd", todos);
  const todos = await prisma.todo.findMany();
  return (
    <AnimatePresence>
      <div className="flex flex-col  gap-4 p-4 w-full ">
        {todos.map((todo) => {
          return (
            <Todo
              {...todo}
              key={todo.id}
              toggleTodo={toggleTodo}
              deletTodo={deletTodo}
            />
          );
        })}
      </div>
    </AnimatePresence>
  );
}
