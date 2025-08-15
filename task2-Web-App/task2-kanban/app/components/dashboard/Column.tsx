"use client";

import Card from "./Card";
import { Task } from "../../store/tasksSlice";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export default function Column({ id, title, tasks }: ColumnProps) {
  const CUSTOME_CLASS=title.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className="secondary-bg rounded-xl p-5 flex-shrink-0 task_category">
      <div className="flex justify-between items-center mb-4">
        <span className={`flex items-center gap-2 ${CUSTOME_CLASS}`}>
          <span className='h-2 w-2 rounded-full dot'></span>
          <span className="task_list_title">{title}</span>
          <span className="text-sm rounded-full num_task">{tasks.length}</span>
        </span>
      </div>
      <div className={`separator ${CUSTOME_CLASS}_sep mb-4`}/>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex flex-col gap-4 min-h-[50px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
