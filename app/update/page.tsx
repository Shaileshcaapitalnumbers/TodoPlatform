"use client";
import Link from "next/link";
import { updateTodo } from "../serverActions/action";
import { useForm } from "react-hook-form";

const page = ({ params, searchParams }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    updateTodo(data);
    reset();
  };
  return (
    <div className="flex min-h-screen justify-center items-center bg-slate-50 ">
      <form
        className="bg-slate-300 rounded-3xl py-6  h-[400px] w-[450px] flex flex-col text-slate-800 justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="justify-center items-center  my-4 text-gray-700">
          Current Name = {searchParams.name}
        </span>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter updated name"
          {...register("name")}
        />
        <input
          type="hidden"
          value={searchParams.id}
          readOnly
          {...register("id")}
        />
        <input type="hidden" value="edited" readOnly {...register("status")} />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update
        </button>
        <span className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <Link href={"/"}>Back to Homepage</Link>
        </span>
      </form>
    </div>
  );
};
export default page;
