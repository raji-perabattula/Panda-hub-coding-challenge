import api from "./api";
import { Task } from "../store/tasksSlice";

// export const RANDOM_USER_IMAGE = 'https://randomuser.me/api/portraits/men/1.jpg';

export async function fetchTasks(limit = 10): Promise<Task[]> {
  const res = await api.get(`/todos?_limit=${limit}`);
  return res.data.map((t: any) => ({
    id: t.id,
    title: t.title,
    description: "",
    priority: t.completed ? "Completed" : "Low",
    status: t.completed ? "done" : "todo",
    images: [],
    assignees: [],
    comments: Math.floor(Math.random() * 10),
    files: Math.floor(Math.random() * 5),
  }));
}
