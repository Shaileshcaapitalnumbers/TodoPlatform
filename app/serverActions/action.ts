"use server";
import { z } from "zod";
import { connectMongoDB } from "@/libs/connect";
import Todo from "@/modals/todoModel";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { navigate } from "../components/navigate/navigate";

const todoSchema = z.object({
  name: z.string(),
  status: z.string(),
});
const UpdateTodoSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
});
export async function addTodo(formData: any) {
    try {
        const { name, status } = todoSchema.parse(formData);
        connectMongoDB();
        const newTodo = await Todo.create({ name, status });
        revalidateTag("/");
    } catch (error) {
        return { message: "Failed to create todo" };
    }
}
export async function updateTodo(formData: any) {
  try {
    const { id, name, status } = UpdateTodoSchema.parse(formData);
    connectMongoDB();
    await Todo.findByIdAndUpdate({ _id: id }, { name, status }, { new: true });
    revalidateTag("/");
  } catch (err) {
    return {
      message: "failed to update todo",
    };
  }
  redirect(`/`);
}
export async function deleteTodo(formData: any) {
  try {
    const id = formData.get("id");
    connectMongoDB();
    await Todo.findByIdAndDelete({ _id: id });
    revalidateTag("/");
  } catch (err) {
    return { message: "failed to delte todo" };
  }
}
