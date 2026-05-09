import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { hodSidebarData } from '../../data/hodSidebar';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const HodSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.div 
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed left-0 top-0 h-screen bg-slate-900 text-slate-300 z-50 flex flex-col shadow-2xl overflow-hidden"
    >
      <div className={cn("p-6 flex items-center border-b border-slate-800 h-16 relative", isOpen ? "justify-start" : "justify-center")}>
        <div className="flex items-center gap-3 text-emerald-400">
          <Building2 className="w-8 h-8 shrink-0" />
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xl font-bold tracking-tight text-white whitespace-nowrap"
            >
              HOD Portal
            </motion.span>
          )}
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-colors shadow-md z-50 opacity-0 group-hover:opacity-100 hidden md:flex"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden flex flex-col gap-1.5 px-3 custom-scrollbar">
        {hodSidebarData.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              isActive 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                : "hover:bg-slate-800 hover:text-slate-100"
            )}
            title={!isOpen ? item.title : undefined}
          >
            {({ isActive }) => {
              const Icon = item.icon;
              return (
                <>
                  <span className={cn("shrink-0 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400")}>
                    <Icon className="w-5 h-5" />
                  </span>
                  
                  {isOpen && (
                    <span className="font-medium whitespace-nowrap text-sm">
                      {item.title}
                    </span>
                  )}
                  
                  {!isOpen && isActive && (
                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
      
      {/* Bottom section */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-4 px-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors group",
            isOpen ? "justify-start" : "justify-center"
          )}
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span className="font-medium whitespace-nowrap text-sm">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default HodSidebar;
