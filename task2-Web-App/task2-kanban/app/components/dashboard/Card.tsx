"use client";

import { Task } from "../../store/tasksSlice";
import Image from "next/image";

interface CardProps {
  task: Task;
}

const priorityColors: Record<Task["priority"], string> = {
  Low: "bg-orange-100 text-orange-600",
  High: "bg-red-100 text-red-600",
  Completed: "bg-green-100 text-green-600",
};

const ASSIGNEES = [
  '/assets/images/avatar1.png',
  "/assets/images/avatar2.png",
  "/assets/images/avatar3.png",
];

// just mocking it for UI purpose, we will need to get this form API
const IMAGES = [
  '/assets/images/screenshot1.png',
  '/assets/images/screenshot2.png',
]

export default function Card({ task }: CardProps) {
  return (
    <div className="p-4 rounded-xl shadow-sm bg-white">
      <span
        className={`text-xs font-medium px-2 py-1 rounded ${task.priority.toLowerCase()}
        ${task.priority.toLowerCase()=== 'low'? 'bg-[rgba(223,168,116,0.2)]':
          task.priority.toLowerCase()=== 'high'? 'bg-[rgba(216,114,125,0.1)]':
          'bg-[rgba(131,194,157,0.2)]'
        }
        `

      }
      >
        {task.priority}
      </span>
      <h3 className="font-semibold mt-2">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
      {IMAGES && IMAGES.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="relative h-20 w-full overflow-hidden rounded-md"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div className="flex -space-x-2">
          {ASSIGNEES.map((avatar, idx) => (
            <Image
              key={idx}
              src={avatar}
              alt="avatar"
              width={24}
              height={24}
              className="rounded-full border-2 border-white"
            />
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">💬 <span>{task.comments}</span></div>
          <div className="flex items-center gap-1">📁 <span>{task.files}</span></div>
        </div>
      </div>
    </div>
  );
}
