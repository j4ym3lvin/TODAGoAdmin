import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  User,
  Map,
  Car,
  MessageSquareQuote,
  LogOut,
  Menu,
  ChevronLeft,
  Settings,
} from "lucide-react";
import "../App.css";
import logo from "../assets/todagologo.png";

export default function Sidebar() {
  // restore last state (default: open)
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "1" ? false : true;
  });

  // flip body class → drives --sidebar-width in CSS
  useEffect(() => {
    document.body.classList.toggle("is-collapsed", !isOpen);
    localStorage.setItem("sidebar-collapsed", isOpen ? "0" : "1");
  }, [isOpen]);

  return (
    <>
      {/* Sidebar only (no main-content wrapper here) */}
      <aside className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
        {/* Header: Logo + Toggle */}
        <div className="sidebar-header">
          {isOpen && (
            <div className="sidebar-logo">
              <img src={logo} alt="TODA Go Logo" className="sidebar-logo-img" />
            </div>
          )}
          <button className="sidebar-toggle" onClick={() => setIsOpen((v) => !v)}>
            {isOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-links">
          <Link to="/"><Home size={20} />{isOpen && <span>Home</span>}</Link>
          <Link to="/monitor"><Map size={20} />{isOpen && <span>Live Monitor</span>}</Link>
          <Link to="/drivers"><Users size={20} />{isOpen && <span>Drivers</span>}</Link>
          <Link to="/passengers"><User size={20} />{isOpen && <span>Passengers</span>}</Link>
          <Link to="/trips"><Car size={20} />{isOpen && <span>Trips</span>}</Link>
          <Link to="/config"><Settings size={20} />{isOpen && <span>Configuration</span>}</Link>
          <Link to="/reports"><MessageSquareQuote size={20} />{isOpen && <span>Feedback &amp; Complaints</span>}</Link>
          <Link to="/login"><LogOut size={20} />{isOpen && <span>Logout</span>}</Link>
        </nav>
      </aside>
    </>
  );
}
