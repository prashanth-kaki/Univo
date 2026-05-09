const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { sendSuccess, sendError } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');
const AIChatLog = require('../models/AIChatLog');
const Resource = require('../models/Resource');
const Task = require('../models/Task');

// Simple rule-based AI for academic queries (replace with LLM API later)
const processAIQuery = async (message, user) => {
  const lower = message.toLowerCase();

  // Schedule/timetable queries
  if (lower.includes('schedule') || lower.includes('timetable') || lower.includes('next class')) {
    return 'Your timetable can be found in the Resources section under your subjects. Please check there for your current schedule.';
  }

  // Task/assignment queries
  if (lower.includes('assignment') || lower.includes('task') || lower.includes('due')) {
    const tasks = await Task.find({
      branch: user.branch,
      targetYear: user.year,
      isActive: true,
      deadline: { $gte: new Date() },
    }).populate('subject', 'name').sort({ deadline: 1 }).limit(5);

    if (tasks.length === 0) return 'You have no pending tasks at the moment!';

    const taskList = tasks.map((t) => `• ${t.title} (Due: ${new Date(t.deadline).toLocaleDateString()})`).join('\n');
    return `Your upcoming tasks:\n${taskList}`;
  }

  // Notes/resources queries
  if (lower.includes('notes') || lower.includes('materials') || lower.includes('resources')) {
    return 'You can access all study materials in the Subjects section. Select a subject to view lecture notes, assignments, and question papers uploaded by your faculty.';
  }

  // Mid exam prep
  if (lower.includes('mid') || lower.includes('exam') || lower.includes('prepare')) {
    const resources = await Resource.find({
      type: { $in: ['mid_questions', 'internal_questions'] },
    }).populate('subject', 'name').sort({ createdAt: -1 }).limit(5);

    if (resources.length === 0) return 'No mid-exam question papers have been uploaded yet. Check back closer to exam time!';

    const list = resources.map((r) => `• ${r.title} - ${r.subject?.name}`).join('\n');
    return `Available exam preparation materials:\n${list}`;
  }

  // Circular queries
  if (lower.includes('circular') || lower.includes('notice') || lower.includes('announcement')) {
    return 'Check the Announcements and Circulars sections for all official notices and updates from your HOD and faculty members.';
  }

  // Greeting
  if (lower.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return `Hello ${user.name}! I'm your Univo AI assistant. I can help you with:\n• Checking your tasks and deadlines\n• Finding study resources\n• Exam preparation materials\n• Navigation help\n\nWhat would you like to know?`;
  }

  return `I can help you with academic queries about:\n• Tasks & deadlines\n• Study resources & notes\n• Exam preparation\n• Announcements & circulars\n\nPlease ask something related to your academics!`;
};

// @GET /api/ai/history
router.get('/history', protect, async (req, res, next) => {
  try {
    const logs = await AIChatLog.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    sendSuccess(res, { logs });
  } catch (err) { next(err); }
});

// @POST /api/ai/chat
router.post(
  '/chat',
  protect,
  [body('message').trim().notEmpty().withMessage('Message required')],
  validate,
  async (req, res, next) => {
    try {
      const { message, sessionId } = req.body;
      const sid = sessionId || uuidv4();

      const reply = await processAIQuery(message, req.user);

      // Log the conversation
      let log = await AIChatLog.findOne({ user: req.user._id, sessionId: sid });

      if (log) {
        log.messages.push({ role: 'user', content: message });
        log.messages.push({ role: 'assistant', content: reply });
        await log.save();
      } else {
        log = await AIChatLog.create({
          user: req.user._id,
          sessionId: sid,
          messages: [
            { role: 'user', content: message },
            { role: 'assistant', content: reply },
          ],
        });
      }

      sendSuccess(res, { reply, sessionId: sid });
    } catch (err) { next(err); }
  }
);

// @DELETE /api/ai/history/:sessionId
router.delete('/history/:sessionId', protect, async (req, res, next) => {
  try {
    await AIChatLog.findOneAndDelete({ user: req.user._id, sessionId: req.params.sessionId });
    sendSuccess(res, {}, 'Chat history cleared');
  } catch (err) { next(err); }
});

module.exports = router;
