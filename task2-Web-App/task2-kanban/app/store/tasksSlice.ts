// store/boardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Priority = "Low" | "High" | "Completed";

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: "todo" | "inprogress" | "done";
  images?: string[];
  assignees: string[];
  comments: number;
  files: number;
}

export interface Column {
  id: string;
  title: string;
  taskIds: number[];
}

export interface BoardState {
  tasks: Record<number, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

const initialState: BoardState = {
  tasks: {},
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    inprogress: { id: "inprogress", title: "On Progress", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
  columnOrder: ["todo", "inprogress", "done"],
};

type DragPayload = {
  source: { droppableId: string; index: number };
  destination: { droppableId: string; index: number };
  draggableId: string;
};

const boardSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setTasksFromApi(state, action: PayloadAction<Task[]>) {
      const tasks: Record<number, Task> = {};
      const columns = {
        todo: { id: "todo", title: "To Do", taskIds: [] as number[] },
        inprogress: { id: "inprogress", title: "In Progress", taskIds: [] as number[] },
        done: { id: "done", title: "Done", taskIds: [] as number[] },
      };

      action.payload.forEach((task) => {
        tasks[task.id] = task;
        columns[task.status].taskIds.push(task.id);
      });

      state.tasks = tasks;
      state.columns = columns;
    },
    moveTask(state, action: PayloadAction<DragPayload>) {
      const { source, destination, draggableId } = action.payload;
      if (!destination) return;

      const sourceCol = state.columns[source.droppableId];
      const destCol = state.columns[destination.droppableId];
      const taskId = Number(draggableId);

      const newSourceIds = [...sourceCol.taskIds];
      newSourceIds.splice(source.index, 1);

      const newDestIds = [...destCol.taskIds];
      newDestIds.splice(destination.index, 0, taskId);

      state.columns[sourceCol.id].taskIds = newSourceIds;
      state.columns[destCol.id].taskIds = newDestIds;

      state.tasks[taskId].status = destCol.id as Task["status"];
    },
  },
});

export const { setTasksFromApi, moveTask } = boardSlice.actions;
export default boardSlice.reducer;
