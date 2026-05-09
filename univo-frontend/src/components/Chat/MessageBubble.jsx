import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, isOwn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex w-full", isOwn ? "justify-end" : "justify-start")}
    >
      <div className={cn(
        "max-w-[75%] rounded-2xl p-4 shadow-sm",
        isOwn ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"
      )}>
        {!isOwn && message.sender && (
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-indigo-600">{message.sender.name || 'User'}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{message.sender.role}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <div className={cn(
          "text-[10px] mt-2 text-right font-medium",
          isOwn ? "text-indigo-200" : "text-slate-400"
        )}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {isOwn && (
            <span className="ml-1.5">
              {message.isRead ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
