import { connectMongoDB } from "@/libs/connect";
import Todo from "@/modals/todoModel";
import Link from "next/link";
import { Delete } from "./components/delete/Delete";
import AddTodoComponent from "./components/addTodocomponent/addtodocomponent";

async function getTodos() {
  try {
    connectMongoDB();
    const todos = await Todo.find({});
    if (!todos) {
      throw new Error("Couldn't fetch the todos.");
    }
    return todos;
  } catch (error) {
    console.log("error in fetching data");
  }
}
export default async function Home() {
  const data: any = await getTodos();
  return (
    <main className=" flex min-h-screen justify-center items-center bg-slate-50 ">
      <div className="bg-slate-300 rounded-3xl py-6  h-[400px] w-[450px] flex flex-col text-slate-800 justify-center items-center ">
        <h1 className="text-3xl text-center">My Platform</h1>
        <AddTodoComponent />
        <ul className=" h-[300px] flex flex-col w-[100%] overflow-y-auto">
          {data.length > 0 && (
            <div className=" h-[300px] py-4 ">
              {data.map((todo: any) => {
                return (
                  <div
                    className=" flex gap-6  border border-gray-300 bg-white flex justify-center items-center "
                    key={todo.id}
                  >
                    <div className="flex w-2/3 justify-between pl-2">
                      <li className="text-gray-600">{todo.name}</li>
                      <li className="text-gray-600">{todo.status}</li>
                    </div>

                    <div className="flex w-1/3 ">
                      <Delete id={todo._id.toString()} />
                      <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2  me-2 my-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <Link
                          href={{
                            pathname: `/update`,
                            query: { name: todo.name, id: todo._id.toString() },
                          }}
                        >
                          Update
                        </Link>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ul>
      </div>
    </main>
  );
}
