import { formatContextTimestamp } from '../components/TaskModal.jsx';

const STAGE_LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
};

/**
 * Serializes a Vibecoding Task + Curated Prompt Context into a structured,
 * paste-ready Markdown briefing for Claude, ChatGPT, Cursor, or other AI tools (M10).
 */
export function serializeTaskPrompt(task) {
  if (!task) return '';

  const stageLabel = STAGE_LABELS[task.status] || task.status || 'To Do';
  const typeLabel = task.type === 'bug' ? 'BUG FIX' : 'FEATURE';
  const toolLabel = task.contextTool || 'Any AI Assistant (Claude / ChatGPT / Cursor)';
  const updatedLabel = formatContextTimestamp(task.contextUpdatedAt) || 'Just now';

  return [
    `# Vibecoding Task Briefing: ${task.title || 'Untitled Task'}`,
    '',
    `- **Project:** VibeFlow (Vibecoding Project Tracker)`,
    `- **Task ID:** \`${task.id || 'draft'}\``,
    `- **Type:** \`${typeLabel}\``,
    `- **Current Stage:** ${stageLabel} (\`${task.status || 'todo'}\`)`,
    `- **Assignee:** ${task.assignee || 'Unassigned'}`,
    `- **Due Date:** ${task.dueDate || 'No deadline set'}`,
    `- **Target AI Tool:** ${toolLabel}`,
    `- **Context Last Updated:** ${updatedLabel}`,
    '',
    `## 1. Task Description`,
    task.description && task.description.trim()
      ? task.description.trim()
      : '_No additional description provided._',
    '',
    `## 2. Curated Prompt Context & Technical Briefing`,
    task.context && task.context.trim()
      ? task.context.trim()
      : '_No specific prompt context recorded yet. Please inspect the relevant files and propose a clean implementation._',
    '',
    `---`,
    `*Copied from VibeFlow · Please review the task description and curated context above, then provide the next code changes or debugging steps.*`,
  ].join('\n');
}

/**
 * Copies text to the clipboard with a fallback for restricted contexts.
 */
export async function copyTextToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy textarea fallback
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}
