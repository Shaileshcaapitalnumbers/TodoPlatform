"use server"

import { revalidateTag } from "next/cache";

export const addProductToDatabase = async (e: FormData) => {
    "use server";
    const title = e.get("title")?.toString();
    // const status = "added";
    const status = e.get("status")?.toString();

    

    if (!title || !status) return;
    const newProduct: any = {
        title:title,
        status:status,
    };
    await fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "DELETE",
    //   body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("products");
  };