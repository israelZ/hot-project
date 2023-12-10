import axios from 'axios';

export const getAllTasks = async ()=>{
     const res =await axios.get('api/tasks')
     return res

}