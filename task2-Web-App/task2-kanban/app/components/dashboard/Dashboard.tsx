"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Column from "./Column";
import { moveTask, setTasksFromApi } from "../../store/tasksSlice";
import { DragDropContext } from "@hello-pangea/dnd";
import { fetchTasks } from "../../services/taskService";
import Image from "next/image";
import './dashboard.scss';

const ASSIGNEES = [
  '/assets/images/avatar1.png',
  "/assets/images/avatar2.png",
  "/assets/images/avatar3.png",
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const kanban = useSelector((state: RootState) => state.kanban);

  useEffect(() => {
    if (Object.keys(kanban.tasks).length === 0) {
      fetchTasks(12).then((tasks) => {
        dispatch(setTasksFromApi(tasks));
      });
    }
  }, [kanban.tasks, dispatch]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(moveTask(result));
  };

  return (
    <section>
      {/* Dashboard top section start */}
      <div>
        <div className="flex flex-row justify-between">
          <div className="title_section flex gap-2 items-center">
            <span className="dashboard_title">Mobile App</span>
            <div className="flex gap-2">
              <Image
                src="/assets/images/edit.png"
                alt="edit icon"
                width={26}
                height={26}
                className="dash_icon"
              /><Image
                src="/assets/images/attach.png"
                alt="attach icon"
                width={26}
                height={26}
                className="dash_icon"
              />
            </div>
          </div>
          <div className="flex gap-2 assignee_section items-center">
            <Image
              src="/assets/images/add-square.png"
              alt="edit icon"
              width={18}
              height={18}
              className="edit_icon"
            />
            <span className="invite_text">Invite</span>
            <div className="flex -space-x-2">
              {ASSIGNEES.map((avatar, idx) => (
                <Image
                  key={idx}
                  src={avatar}
                  alt="avatar"
                  width={38}
                  height={38}
                  className="rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between my-8">
          <div className="flex gap-4 items-center">
            <div className="w-32 flex items-center">
              <input
                type="text"
                placeholder="Filter"
                className="w-32 border-default rounded-lg px-4 py-2 focus:outline-none text-medium"
              />
              <Image
                src="/assets/images/arrow-down.png"
                alt="Arrow Down Icon"
                width={18}
                height={18}
                className="arrow_down"
              />
            </div>

            <div className="w-32 flex items-center">
              <input
                type="text"
                placeholder="Today"
                className="w-32 border-default rounded-lg px-4 py-2 focus:outline-none text-medium"
              />
              <Image
                src="/assets/images/arrow-down.png"
                alt="Arrow Down Icon"
                width={18}
                height={18}
                className="arrow_down"
              />
            </div>
          </div>


          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center w-24">
              <input
                type="text"
                placeholder="Share"
                className="w-24 border-default rounded-lg px-4 py-2 focus:outline-none text-medium"
              />
              <Image
                src="/assets/images/arrow-down.png"
                alt="Arrow Down Icon"
                width={18}
                height={18}
                className="arrow_down"
              />
            </div>
              <div className="vertical_divider"></div>
            <Image
              src="/assets/images/menu-selected.png"
              alt="menu selected"
              width={40}
              height={40}
              className="menu_selected"
            />
            <Image
              src="/assets/images/selection-view.png"
              alt="view"
              width={21}
              height={21}
              className="view_select"
            />
          </div>
        </div>
      </div>
      {/* Dashboard top section end */}

      {/* Dashboard tasks section start */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row gap-4 min-w-max overflow-x-auto justify-between tasks_list_container">
          {kanban.columnOrder.map((colId) => {
            const column = kanban.columns[colId];
            const tasks = column.taskIds.map((taskId) => kanban.tasks[taskId]);

            return (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={tasks}
              />
            );
          })}
        </div>
      </DragDropContext>
      {/* Dasjboard tasks section end */}
    </section>
  );
}
