import { deleteTodo } from "@/app/serverActions/action"

export const Delete =({id}:any)=>{
    return(
        <form action={deleteTodo}>
            <input type="hidden" name="id" value={id} />
            <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2  me-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
                Delete
            </button>
        </form>
    )
}