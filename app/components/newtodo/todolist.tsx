"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  complete: boolean;
};

export const TodoItem = (posts: any) => {
  const [todos, setTodos] = useState([]);
  const update = async (todo: Todo) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.complete,
      }),
    });
  };

  const deleteTodo = async (todo: Todo) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    });
  };
  useEffect(() => {
    const get = async () => {
      try {
        const response = await fetch(`/api/blogs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const tododata = await response.json();

        setTodos(tododata.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    get();
  }, []);
  return (
    <>
      {todos?.map((todo: any) => {
        return (
          <li key={todo.id} className="flex px-4">
            <span className="flex gap-2 flex-1">
              <input
                type="checkbox"
                name="check"
                checked={todo.status}
                onChange={() => update(todo)}
                className="peer cursor-pointer accent-slate-300 "
              />
              <label
                htmlFor={todo.id}
                className="peer-checked:line-through peer-checked:text-slate-500 cursor-pointer"
              >
                {todo.title}
              </label>
            </span>
            <button
              onClick={() => deleteTodo(todo)}
              className="text-slate-500  hover:text-slate-800 mr-3"
            >
              X
            </button>
          </li>
        );
      })}
    </>
  );
};
