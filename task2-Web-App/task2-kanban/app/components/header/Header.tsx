"use client";

import { FaSearch, FaCalendarAlt, FaBell, FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";
import './header.scss';

export default function Header() {
  return (
    <header className="px-6 py-5 flex justify-between items-center border-default header_container">
      {/* Search Section */}
      <div className="flex-1 search_section">
        <div className="relative">
            <Image
            src="/assets/images/searchIcon.png"
            alt="Search icon"
            width={18}
            height={18}
            className="absolute top-3 left-3"
          />
          <input
            type="text"
            placeholder="Search for anything..."
            className="pl-10 pr-4 py-2.5 rounded-md w-full text-sm focus:outline-none border-default secondary-bg"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Image
            src="/assets/images/calendar.png"
            alt="calendar icon"
            width={24}
            height={24}
          />
        <Image
            src="/assets/images/message.png"
            alt="message icon"
            width={24}
            height={24}
          />
        <Image
            src="/assets/images/notification.png"
            alt="notification icon"
            width={24}
            height={24}
          />

        <div className="flex items-center pl-2 gap-4">
          <div className="text-right">
            <p className="profile-name">Anima Agrawal</p>
            <p className="text-primary">U.P, India</p>
          </div>
          <Image
            src="/assets/images/user.png"
            alt="User Avatar"
            width={38}
            height={38}
            className="rounded-full"
          />
          <Image
            src="/assets/images/arrow-down.png"
            alt="Arrow Down Icon"
            width={18}
            height={18}
          />
        </div>
      </div>
    </header>
  );
}
