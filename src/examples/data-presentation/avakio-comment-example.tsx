import React, { useState, useRef } from 'react';
import { AvakioComment, AvakioCommentRef, AvakioCommentTheme, CommentItem, CommentUser } from '../../components/avakio/data-presentation/avakio-comment/avakio-comment';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { addEventLog } from '../../services/event-log-service';
import { 
  MessageSquare,
  Palette,
  Settings2,
  Wand2,
  Book,
  Play,
  Users,
  AtSign,
  Eye,
  MessageCircle,
} from 'lucide-react';
import '../../components/avakio/data-presentation/avakio-comment/avakio-comment.css';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'basic', label: 'Basic Usage', icon: <MessageSquare size={14} /> },
  { id: 'themes', label: 'Themes', icon: <Palette size={14} /> },
  { id: 'options', label: 'Options', icon: <Settings2 size={14} /> },
  { id: 'mentions', label: 'Mentions', icon: <AtSign size={14} /> },
  { id: 'methods', label: 'Ref Methods', icon: <Wand2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

// Sample users
const sampleUsers: CommentUser[] = [
  { id: 1, value: 'John Smith', image: 'https://i.pravatar.cc/150?img=1', status: 'active' },
  { id: 2, value: 'Sarah Johnson', image: 'https://i.pravatar.cc/150?img=2', status: 'away' },
  { id: 3, value: 'Mike Wilson', image: 'https://i.pravatar.cc/150?img=3', status: 'busy' },
  { id: 4, value: 'Emily Brown', image: 'https://i.pravatar.cc/150?img=4', status: 'none' },
  { id: 5, value: 'David Lee', image: 'https://i.pravatar.cc/150?img=5', status: 'active' },
];

// Sample comments
const sampleComments: CommentItem[] = [
  {
    id: 1,
    user_id: 1,
    date: new Date(Date.now() - 86400000 * 2),
    text: "Let's schedule a meeting to discuss the project timeline.",
  },
  {
    id: 2,
    user_id: 2,
    date: new Date(Date.now() - 86400000),
    text: "Sounds good! How about tomorrow at 2 PM?",
  },
  {
    id: 3,
    user_id: 3,
    date: new Date(Date.now() - 3600000 * 5),
    text: "I've reviewed the documents. Everything looks great!",
  },
  {
    id: 4,
    user_id: 4,
    date: new Date(Date.now() - 3600000),
    text: "Perfect, thanks for the feedback everyone.",
  },
  {
    id: 5,
    user_id: 5,
    date: new Date(Date.now() - 3600000),
    text: "OK.",
  },
];

export function AvakioCommentExample() {
  const [activeSection, setActiveSection] = useState<string | number | null>('basic');
  
  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Playground state
  const [playgroundReadonly, setPlaygroundReadonly] = useState(false);
  const [playgroundBorderless, setPlaygroundBorderless] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundHidden, setPlaygroundHidden] = useState(false);
  const [playgroundMentions, setPlaygroundMentions] = useState(true);
  const [playgroundKeepButton, setPlaygroundKeepButton] = useState(false);
  const [playgroundMode, setPlaygroundMode] = useState<string>('default');
  const [playgroundSendAction, setPlaygroundSendAction] = useState<string>('enter');

  // Ref example
  const commentRef = useRef<AvakioCommentRef>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Scroll to section when tab is clicked
  const handleTabChange = (value: string | number | null) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      const element = sectionRefs.current[value as string];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Add to local and global event log
  const addLog = (action: string, details: string = '') => {
    setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()} - ${action}${details ? ': ' + details : ''}`]);
    addEventLog('Comment', action, details);
  };

  // Event handlers
  const handleAdd = (comment: CommentItem) => addLog('onAdd', `"${comment.text.slice(0, 30)}..."`);
  const handleDelete = (id: string | number) => addLog('onDelete', `comment ID: ${id}`);
  const handleEdit = (comment: CommentItem) => addLog('onEdit', `comment ID: ${comment.id}`);
  const handleUserMentioned = (userId: string | number) => {
    const user = sampleUsers.find(u => u.id === userId);
    addLog('onUserMentioned', user?.value || String(userId));
  };

  // Props documentation data
  interface PropDoc {
    id: number;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    from: string;
  }

  const propsData: PropDoc[] = [
    { id: 1, name: 'id', type: 'string', defaultValue: 'undefined', description: 'Component ID', from: 'Base' },
    { id: 2, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test ID for testing purposes', from: 'Base' },
    { id: 3, name: 'data', type: 'CommentItem[]', defaultValue: '[]', description: 'Array of comment objects with id, user_id, date, and text', from: 'Comment' },
    { id: 4, name: 'users', type: 'CommentUser[]', defaultValue: '[]', description: 'Array of user objects with id, value, image, and status', from: 'Comment' },
    { id: 5, name: 'currentUser', type: 'string | number', defaultValue: 'undefined', description: 'Current user ID - their comments can be edited/deleted', from: 'Comment' },
    { id: 6, name: 'mode', type: "'default' | 'chat'", defaultValue: "'default'", description: 'Display mode - default shows oldest first, chat shows newest first', from: 'Comment' },
    { id: 7, name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Read-only mode - hides input and disables editing', from: 'Comment' },
    { id: 8, name: 'sendAction', type: "'enter' | 'shift+enter'", defaultValue: "'enter'", description: 'Key combination to send a comment', from: 'Comment' },
    { id: 9, name: 'placeholder', type: 'string', defaultValue: "'Write a comment...'", description: 'Placeholder text for the input', from: 'Comment' },
    { id: 10, name: 'mentions', type: 'boolean', defaultValue: 'false', description: 'Enable @mentions functionality', from: 'Comment' },
    { id: 11, name: 'keepButtonVisible', type: 'boolean', defaultValue: 'false', description: 'Keep send button always visible', from: 'Comment' },
    { id: 12, name: 'hasMore', type: 'boolean', defaultValue: 'false', description: 'Show "Load more" button', from: 'Comment' },
    { id: 13, name: 'moreButtonLabel', type: 'string', defaultValue: "'Load more comments'", description: 'Label for the more button', from: 'Comment' },
    { id: 14, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove border from component', from: 'Base' },
    { id: 15, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the component', from: 'Base' },
    { id: 16, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Whether the component is hidden', from: 'Base' },
    { id: 17, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: 'undefined', description: 'Theme variant', from: 'Comment' },
    { id: 18, name: 'width', type: 'number | string', defaultValue: 'undefined', description: 'Width of the component', from: 'Base' },
    { id: 19, name: 'height', type: 'number | string', defaultValue: 'undefined', description: 'Height of the component', from: 'Base' },
    { id: 20, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width', from: 'Base' },
    { id: 21, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height', from: 'Base' },
    { id: 22, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width', from: 'Base' },
    { id: 23, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height', from: 'Base' },
    { id: 24, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class name', from: 'Base' },
    { id: 25, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Custom CSS styles', from: 'Base' },
    { id: 26, name: 'onAdd', type: '(comment: CommentItem) => void', defaultValue: 'undefined', description: 'Callback when a comment is added', from: 'Comment' },
    { id: 27, name: 'onDelete', type: '(id: string | number) => void', defaultValue: 'undefined', description: 'Callback when a comment is deleted', from: 'Comment' },
    { id: 28, name: 'onEdit', type: '(comment: CommentItem) => void', defaultValue: 'undefined', description: 'Callback when a comment is edited', from: 'Comment' },
    { id: 29, name: 'onUserMentioned', type: '(userId, comment) => void', defaultValue: 'undefined', description: 'Callback when a user is mentioned', from: 'Comment' },
    { id: 30, name: 'onLoadMore', type: '() => void', defaultValue: 'undefined', description: 'Callback when more comments are requested', from: 'Comment' },
    { id: 31, name: 'dateFormatter', type: '(date: Date | string) => string', defaultValue: 'undefined', description: 'Custom date formatter', from: 'Comment' },
    { id: 32, name: 'renderAvatar', type: '(user?: CommentUser) => ReactNode', defaultValue: 'undefined', description: 'Custom avatar renderer', from: 'Comment' },
  ];

  const refMethodsData: PropDoc[] = [
    { id: 1, name: 'getNode()', type: '() => HTMLDivElement | null', defaultValue: '-', description: 'Get the component DOM node', from: 'Base' },
    { id: 2, name: 'getComments()', type: '() => CommentItem[]', defaultValue: '-', description: 'Get all comments', from: 'Comment' },
    { id: 3, name: 'add(comment)', type: '(comment: Omit<CommentItem, "id">) => void', defaultValue: '-', description: 'Add a new comment', from: 'Comment' },
    { id: 4, name: 'remove(id)', type: '(id: string | number) => void', defaultValue: '-', description: 'Remove a comment by ID', from: 'Comment' },
    { id: 5, name: 'edit(id)', type: '(id: string | number) => void', defaultValue: '-', description: 'Open edit mode for a comment', from: 'Comment' },
    { id: 6, name: 'getUsers()', type: '() => CommentUser[]', defaultValue: '-', description: 'Get users data', from: 'Comment' },
    { id: 7, name: 'setCurrentUser(id)', type: '(id: string | number) => void', defaultValue: '-', description: 'Set the current user', from: 'Comment' },
    { id: 8, name: 'focus()', type: '() => void', defaultValue: '-', description: 'Focus the input area', from: 'Comment' },
    { id: 9, name: 'isEnabled()', type: '() => boolean', defaultValue: '-', description: 'Check if enabled', from: 'Base' },
    { id: 10, name: 'enable()', type: '() => void', defaultValue: '-', description: 'Enable the component', from: 'Base' },
    { id: 11, name: 'disable()', type: '() => void', defaultValue: '-', description: 'Disable the component', from: 'Base' },
    { id: 12, name: 'clear()', type: '() => void', defaultValue: '-', description: 'Clear all comments', from: 'Comment' },
  ];

  const propsColumns: AvakioColumn<PropDoc>[] = [
    { id: 'name', header: 'Property', width: 150 },
    { id: 'type', header: 'Type', width: 280 },
    { id: 'defaultValue', header: 'Default', width: 120 },
    { id: 'description', header: 'Description', width: 380 },
    { id: 'from', header: 'From', width: 100, filterType: 'combo' },
  ];

  const themes: AvakioCommentTheme[] = ['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'];

  return (
    <div className="avakio-comment-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-example-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="UI Widgets"
          title="Comment"                                
          subTitle="A widget for exchanging comments between users with support for editing, deleting, mentions, and user avatars."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-example-tabbar-container">
          <AvakioTabBar
            id="comment-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            padding={[6, 16, 16, 16]} 
            size="sm"
            scrollable
          />
        </div>
      </div>

      {/* Basic Usage Section */}
      <section 
        ref={(el) => { sectionRefs.current['basic'] = el; }}
        className="avakio-comment-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Usage"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="A comment widget displaying user avatars, names, dates, and comment text. Users can add, edit, and delete their own comments."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="basic" style={{ display: 'flex', justifyContent: 'center' }}>
              <AvakioComment
                data={sampleComments}
                users={sampleUsers}
                currentUser={1}
                width={450}
                height={400}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>,
          ]}
        />
      </section>

      {/* Themes Section */}
      <section 
        ref={(el) => { sectionRefs.current['themes'] = el; }}
        className="avakio-comment-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Themes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="The Comment widget supports multiple theme variants: material, flat, compact, dark, ocean, and sunset."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="themes" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
              {themes.map((t) => (
                <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{t}</span>
                  <AvakioComment
                    data={sampleComments.slice(0, 2)}
                    users={sampleUsers}
                    currentUser={1}
                    width={320}
                    height={250}
                    theme={t}
                  />
                </div>
              ))}
            </div>,
          ]}
        />
      </section>

      {/* Options Section */}
      <section 
        ref={(el) => { sectionRefs.current['options'] = el; }}
        className="avakio-comment-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Options"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Customize the Comment widget with various options like readonly mode, chat mode, user statuses, and more."
        />

        {/* Readonly Mode */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="readonly-title"
              type="clean"
              borderType="clean"
              content={<strong>Read-only Mode</strong>}
            />,
            <div key="readonly" style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <AvakioComment
                data={sampleComments.slice(0, 3)}
                users={sampleUsers}
                readonly
                width={400}
                height={280}
              />
            </div>,
          ]}
        />

        {/* Chat Mode */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="chat-title"
              type="clean"
              borderType="clean"
              content={<strong>Chat Mode (Newest First)</strong>}
            />,
            <div key="chat" style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <AvakioComment
                data={sampleComments}
                users={sampleUsers}
                currentUser={1}
                mode="chat"
                width={400}
                height={350}
              />
            </div>,
          ]}
        />

        {/* User Statuses */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="status-title"
              type="clean"
              borderType="clean"
              content={<strong>User Status Indicators</strong>}
            />,
            <AvakioTemplate
              key="status-desc"
              type="clean"
              borderType="clean"
              padding={[8, 0, 0, 0]}
              content="Users can have status indicators: active (green), away (orange), busy (red), or none."
            />,
            <div key="status" style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <AvakioComment
                data={[
                  { id: 1, user_id: 1, date: new Date(), text: "I'm online and active!" },
                  { id: 2, user_id: 2, date: new Date(), text: "I'm away from my desk." },
                  { id: 3, user_id: 3, date: new Date(), text: "I'm busy right now." },
                  { id: 4, user_id: 4, date: new Date(), text: "No status set." },
                ]}
                users={sampleUsers}
                currentUser={1}
                width={400}
                height={350}
              />
            </div>,
          ]}
        />

        {/* Anonymous Users */}
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              key="anon-title"
              type="clean"
              borderType="clean"
              content={<strong>Anonymous Comments</strong>}
            />,
            <div key="anon" style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <AvakioComment
                data={[
                  { id: 1, date: new Date(Date.now() - 86400000), text: "This is an anonymous comment without user_id." },
                  { id: 2, date: new Date(), text: "Another anonymous comment from the community." },
                ]}
                users={[]}
                width={400}
                height={250}
              />
            </div>,
          ]}
        />
      </section>

      {/* Mentions Section */}
      <section 
        ref={(el) => { sectionRefs.current['mentions'] = el; }}
        className="avakio-comment-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Mentions"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content='Enable @mentions to tag users in comments. Type @ followed by a name to see suggestions. Mentions are stored as @"User Name" and highlighted in the text.'
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="mentions" style={{ display: 'flex', justifyContent: 'center' }}>
              <AvakioComment
                data={[
                  { id: 1, user_id: 1, date: new Date(Date.now() - 3600000), text: 'Hey @"Sarah Johnson", can you review this?' },
                  { id: 2, user_id: 2, date: new Date(), text: 'Sure @"John Smith", I\'ll take a look!' },
                ]}
                users={sampleUsers}
                currentUser={1}
                mentions
                width={450}
                height={350}
                onUserMentioned={handleUserMentioned}
              />
            </div>,
          ]}
        />
      </section>

      {/* Ref Methods Section */}
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-comment-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Ref Methods"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Access component methods via ref for programmatic control."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="methods" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <AvakioComment
                ref={commentRef}
                data={sampleComments.slice(0, 2)}
                users={sampleUsers}
                currentUser={1}
                width={400}                
                height={300}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 180 }}>
                <AvakioButton onClick={() => commentRef.current?.focus()}>
                  focus()
                </AvakioButton>
                <AvakioButton onClick={() => {
                  commentRef.current?.add({
                    user_id: 1,
                    date: new Date(),
                    text: 'Programmatically added comment!'
                  });
                }}>
                  add(comment)
                </AvakioButton>
                <AvakioButton onClick={() => {
                  const comments = commentRef.current?.getComments() || [];
                  alert(`Total comments: ${comments.length}`);
                }}>
                  getComments()
                </AvakioButton>
                <AvakioButton onClick={() => commentRef.current?.clear()}>
                  clear()
                </AvakioButton>
                <AvakioButton onClick={() => commentRef.current?.enable()}>
                  enable()
                </AvakioButton>
                <AvakioButton onClick={() => commentRef.current?.disable()}>
                  disable()
                </AvakioButton>                                
              </div>
            </div>,
            <div key="event-log" style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '12px' }}>
              <strong>Event Log:</strong>
              <div style={{ marginTop: '8px', maxHeight: '100px', overflow: 'auto' }}>
                {eventLog.length === 0 ? (<div style={{ color: '#888' }}>No events yet...</div>) : (
                  eventLog.map((log, i) => (
                    <div key={i} style={{ padding: '2px 0', color: '#666' }}>{log}</div>
                  ))
                )}
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Interactive Playground Section */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-comment-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Interactive Playground"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Experiment with different Comment configurations in real-time."
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <div key="playground" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {/* Preview */}
              <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Preview</strong>}
                />
                <div style={{ 
                  padding: '24px', 
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <AvakioComment
                    data={sampleComments}
                    users={sampleUsers}
                    currentUser={1}
                    readonly={playgroundReadonly}
                    borderless={playgroundBorderless}
                    disabled={playgroundDisabled}
                    hidden={playgroundHidden}
                    mentions={playgroundMentions}
                    keepButtonVisible={playgroundKeepButton}
                    mode={playgroundMode as any}
                    sendAction={playgroundSendAction as any}
                    width={400}
                    minWidth={300}
                    height={350}
                  />
                </div>
              </div>

              {/* Controls */}
              <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AvakioTemplate
                  type="clean"
                  borderType="clean"
                  content={<strong>Configuration</strong>}
                />
                <AvakioRichSelect
                  label="Mode"
                  value={playgroundMode}
                  options={[
                    { id: 'default', value: 'Default (oldest first)' },
                    { id: 'chat', value: 'Chat (newest first)' },
                  ]}
                  onChange={(val) => setPlaygroundMode(String(val))}
                />
                <AvakioRichSelect
                  label="Send Action"
                  value={playgroundSendAction}
                  options={[
                    { id: 'enter', value: 'Enter' },
                    { id: 'shift+enter', value: 'Shift + Enter' },
                  ]}
                  onChange={(val) => setPlaygroundSendAction(String(val))}
                />
                <AvakioCheckbox
                  label="Read-only"
                  checked={playgroundReadonly}
                  onChange={setPlaygroundReadonly}
                />
                <AvakioCheckbox
                  label="Borderless"
                  checked={playgroundBorderless}
                  onChange={setPlaygroundBorderless}
                />
                <AvakioCheckbox
                  label="Disabled"
                  checked={playgroundDisabled}
                  onChange={setPlaygroundDisabled}
                />
                <AvakioCheckbox
                  label="Hidden"
                  checked={playgroundHidden}
                  onChange={setPlaygroundHidden}
                />
                <AvakioCheckbox
                  label="Enable Mentions"
                  checked={playgroundMentions}
                  onChange={setPlaygroundMentions}
                />
                <AvakioCheckbox
                  label="Keep Button Visible"
                  checked={playgroundKeepButton}
                  onChange={setPlaygroundKeepButton}
                />
              </div>
            </div>,
          ]}
        />
      </section>

      {/* Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-comment-demo-section"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />

        {/* Props Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[16, 0, 0, 16]}
          content={<strong>Props</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="props-table"
              id="comment-props-table"
              data={propsData}
              columns={propsColumns}
              select={false}
              showRowNum={true}
              height={700}
            />,
          ]}
        />

        {/* Ref Methods Table */}
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[24, 0, 0, 16]}
          content={<strong>Ref Methods</strong>}
        />
        <AvakioLayout
          type="clean"
          borderless={false}
          margin={12}
          padding={0}
          rows={[
            <AvakioDataTable<PropDoc>
              key="methods-table"
              id="comment-methods-table"
              data={refMethodsData}
              columns={propsColumns}
              select={false}
              showRowNum={true}
              height={380}
            />,
          ]}
        />
      </section>
    </div>
  );
}

export default AvakioCommentExample;



















