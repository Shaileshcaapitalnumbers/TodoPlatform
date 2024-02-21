"use client"
import Link from "next/link"
import { addTodo } from "../../serverActions/action"
import { useForm } from 'react-hook-form';

const AddTodoComponent = () => {
    const { register, handleSubmit,reset } = useForm();
    const onSubmit = (data:any) => {
        addTodo(data);
        reset() 
    };
    
    return(
        
        <form
        className="bg-slate-300 rounded-3xl py-6  h-[400px] w-[450px] flex flex-col text-slate-800 justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
    >
        <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
            {...register('name')} 
        />
        <input
            type="hidden"
            value="added"
            readOnly
            {...register('status')} 
        />
        <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
            Add to the list
        </button>
    </form>
        
    )
}
export default AddTodoComponent