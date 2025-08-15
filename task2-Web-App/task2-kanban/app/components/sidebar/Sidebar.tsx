"use client";

import { FaHome, FaComments, FaTasks, FaUsers, FaCog } from "react-icons/fa";
import Image from "next/image";
import './sidebar.scss';
import React from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

    const projects = [
        { color: "bg-green-500", label: "Mobile App" },
        { color: "bg-orange-400", label: "Website Redesign" },
        { color: "bg-purple-300", label: "Design System" },
        { color: "bg-blue-400", label: "Wireframes" },
    ];

    return (
        <aside className="px-5 py-8 flex flex-col justify-between sidebar">
            {/* Top Section */}
            <div>
                {/* Project Logo + Collapse Button */}
                <div className="flex items-center mb-5 justify-between project-section">
                    <div className="flex items-center gap-2 pl-5">
                        <Image
                            src="/assets/images/project.png"
                            alt="project icon"
                            width={24}
                            height={24}
                        />
                        <h1 className="project-title">Project M.</h1>
                    </div>
                    <Image
                        src="/assets/images/collapse.png"
                        alt="collapse icon"
                        width={26}
                        height={20}
                        className="mr-5"
                    />
                </div>

                {/* Navigation */}
                <nav className="space-y-5">
                    <a className="flex items-center gap-5 cursor-pointer">
                        <FaHome />
                        <span className="text-medium">Home</span>
                    </a>
                    <a className="flex items-center gap-5 cursor-pointer">
                        <FaComments />
                        <span className="text-medium">Messages</span>
                    </a>
                    <a className="flex items-center gap-5 cursor-pointer">
                        <FaTasks />
                        <span className="text-medium">Tasks</span>
                    </a>
                    <a className="flex items-center gap-5 cursor-pointer">
                        <FaUsers />
                        <span className="text-medium">Members</span>
                    </a>
                    <a className="flex items-center gap-5 cursor-pointer">
                        <FaCog />
                        <span className="text-medium">Settings</span>
                    </a>
                </nav>

                {/* Divider */}
                <div className="divider" />

                {/* My Projects */}
                <div>
                    <div className="flex justify-between items-center mb-5">
                        <span className="uppercase my_projects">
                            My Projects
                        </span>
                        <button className="flex items-center border-default add_projects rounded-lg">+</button>
                    </div>

                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <SidebarItem
                                key={index}
                                color={proj.color}
                                label={proj.label}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Thoughts Box */}
            {/* 
            this is for a lamp on the card, need to work on styling issue
            
            <div className="w-16 h-16 absolute rounded-full bulb_cont">
            </div>
            <Image
                src="/assets/images/bulb.png"
                alt="bulb icon"
                width={26}
                height={26}
                className="absolute bulb_icon"
            /> */}
            <div className="flex flex-col items-center p-5 rounded-lg mt-6 secondary-bg">
                <h4 className="text-sm mb-2">Thoughts Time</h4>
                <p className="text-primary-small">
                    We don’t have any notice for you, till then you can share your
                    thoughts with your peers.
                </p>
                <button className="py-2 mt-4 w-full bg-white text-sm py-1 rounded-lg hover:bg-gray-100">
                    Write a message
                </button>
            </div>
        </aside>
    );
}
