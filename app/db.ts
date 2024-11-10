import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export async function toggleTodo(id: string, complet: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complet } });
}
export async function deletTodo(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
  redirect("/");
}
