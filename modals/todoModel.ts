import mongoose,{Schema} from "mongoose"

const todoSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo",todoSchema);
export default Todo;