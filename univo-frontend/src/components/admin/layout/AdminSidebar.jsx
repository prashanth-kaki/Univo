import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Flag,
  BarChart3,
  Activity,
  Settings,
  LogOut
} from 'lucide-react';

import { cn } from '../../../utils/cn';

import { useAuth } from '../../../context/AuthContext';

import { motion } from 'framer-motion';

const AdminSidebar = ({
  isOpen,
  setIsOpen
}) => {

  const { logout } =
    useAuth();

  const navigate =
    useNavigate();

  // ======================================
  // ADMIN MENU ITEMS
  // ======================================

  const menuItems = [

    {
      path:
        '/admin/dashboard',

      icon:
        <LayoutDashboard size={20} />,

      label:
        'Dashboard'
    },

    {
      path:
        '/admin/users',

      icon:
        <Users size={20} />,

      label:
        'Users'
    },

    {
      path:
        '/admin/moderation',

      icon:
        <ShieldAlert size={20} />,

      label:
        'Moderation'
    },

    {
      path:
        '/admin/reports',

      icon:
        <Flag size={20} />,

      label:
        'Reports'
    },

    {
      path:
        '/admin/analytics',

      icon:
        <BarChart3 size={20} />,

      label:
        'Analytics'
    },

    {
      path:
        '/admin/activity',

      icon:
        <Activity size={20} />,

      label:
        'Activity Logs'
    },

    {
      path:
        '/admin/settings',

      icon:
        <Settings size={20} />,

      label:
        'Settings'
    },
  ];

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout =
    () => {

      logout();

      navigate('/login');
    };

  return (

    <motion.div

      initial={false}

      animate={{
        width:
          isOpen
            ? 260
            : 80
      }}

      className="
        fixed
        left-0
        top-0
        h-full
        bg-slate-900
        text-slate-300
        z-50
        flex
        flex-col
        shadow-xl
        overflow-hidden
        transition-all
        duration-300
      "
    >

      {/* HEADER */}

      <div
        className={cn(
          "p-6 flex items-center border-b border-slate-800 h-16",

          isOpen
            ? "justify-start"
            : "justify-center"
        )}
      >

        <div className="flex items-center gap-3 text-indigo-400">

          <ShieldAlert
            size={28}
            className="shrink-0"
          />

          {isOpen && (

            <span className="
              text-xl
              font-bold
              tracking-tight
              text-white
              whitespace-nowrap
            ">
              Admin
            </span>
          )}
        </div>
      </div>

      {/* NAVIGATION */}

      <nav
        className="
          flex-1
          py-6
          overflow-y-auto
          overflow-x-hidden
          flex
          flex-col
          gap-1
          px-3
          custom-scrollbar
        "
      >

        {menuItems.map(
          (item) => (

            <NavLink

              key={item.path}

              to={item.path}

              className={({
                isActive
              }) =>
                cn(

                  "flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group relative",

                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 font-medium"
                    : "hover:bg-slate-800 hover:text-white"
                )
              }

              title={
                !isOpen
                  ? item.label
                  : undefined
              }
            >

              {({
                isActive
              }) => (

                <>

                  <span
                    className={cn(
                      "shrink-0 transition-colors",

                      isActive
                        ? "text-indigo-400"
                        : "group-hover:text-white"
                    )}
                  >
                    {item.icon}
                  </span>

                  {isOpen && (

                    <span className="whitespace-nowrap">

                      {item.label}

                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        )}
      </nav>

      {/* FOOTER */}

      <div className="
        p-4
        mt-auto
        border-t
        border-slate-800
      ">

        <button

          onClick={
            handleLogout
          }

          className={cn(

            "w-full flex items-center gap-4 px-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors group",

            isOpen
              ? "justify-start"
              : "justify-center"
          )}

          title={
            !isOpen
              ? "Logout"
              : undefined
          }
        >

          <LogOut
            size={20}
            className="shrink-0"
          />

          {isOpen && (

            <span className="
              font-medium
              whitespace-nowrap
            ">
              Logout
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;