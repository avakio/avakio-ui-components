import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { MoreVertical, Send, Edit2, Trash2, X, Check } from 'lucide-react';
import './avakio-comment.css';

export type AvakioCommentTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type UserStatus = 'active' | 'away' | 'busy' | 'none';
export type CommentMode = 'default' | 'chat';
export type SendAction = 'enter' | 'shift+enter';

export interface CommentUser {
  id: string | number;
  value: string;
  image?: string;
  status?: UserStatus;
}

export interface CommentItem {
  id: string | number;
  user_id?: string | number;
  date: Date | string;
  text: string;
}

export interface AvakioCommentProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Theme variant */
  theme?: AvakioCommentTheme;
  /** Array of comments */
  data?: CommentItem[];
  /** Array of users who can comment */
  users?: CommentUser[];
  /** Current user ID - their comments can be edited/deleted */
  currentUser?: string | number;
  /** Display mode - default shows oldest first, chat shows newest first */
  mode?: CommentMode;
  /** Read-only mode - hides input and disables editing */
  readonly?: boolean;
  /** Key combination to send comment */
  sendAction?: SendAction;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Label for the "More comments" button */
  moreButtonLabel?: string;
  /** Show more button if there are more comments */
  hasMore?: boolean;
  /** Enable mentions functionality */
  mentions?: boolean;
  /** Keep send button always visible */
  keepButtonVisible?: boolean;
  /** Border-less mode */
  borderless?: boolean;
  /** Custom CSS styles */
  css?: React.CSSProperties;
  /** Additional CSS class name */
  className?: string;
  /** Width of the component */
  width?: number | string;
  /** Height of the component */
  height?: number | string;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when a comment is added */
  onAdd?: (comment: CommentItem) => void;
  /** Callback when a comment is deleted */
  onDelete?: (commentId: string | number) => void;
  /** Callback when a comment is edited */
  onEdit?: (comment: CommentItem) => void;
  /** Callback when more comments are requested */
  onLoadMore?: () => void;
  /** Callback when a user is mentioned */
  onUserMentioned?: (userId: string | number, comment: CommentItem) => void;
  /** Custom date formatter */
  dateFormatter?: (date: Date | string) => string;
  /** Custom avatar renderer */
  renderAvatar?: (user?: CommentUser) => ReactNode;
}

export interface AvakioCommentRef {
  /** Get the component DOM node */
  getNode: () => HTMLDivElement | null;
  /** Get all comments */
  getComments: () => CommentItem[];
  /** Add a new comment */
  add: (comment: Omit<CommentItem, 'id'>) => void;
  /** Remove a comment by ID */
  remove: (commentId: string | number) => void;
  /** Edit a comment */
  edit: (commentId: string | number) => void;
  /** Get users data */
  getUsers: () => CommentUser[];
  /** Set current user */
  setCurrentUser: (userId: string | number) => void;
  /** Focus the input area */
  focus: () => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Enable the component */
  enable: () => void;
  /** Disable the component */
  disable: () => void;
  /** Clear all comments */
  clear: () => void;
}

// Default date formatter
const defaultDateFormatter = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return d.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

// Generate unique ID
const generateId = () => `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const AvakioComment = forwardRef<AvakioCommentRef, AvakioCommentProps>(
  (
    {
      id,
      testId,
      theme,
      data: initialData = [],
      users = [],
      currentUser,
      mode = 'default',
      readonly = false,
      sendAction = 'enter',
      placeholder = 'Write a comment...',
      moreButtonLabel = 'Load more comments',
      hasMore = false,
      mentions = false,
      keepButtonVisible = false,
      borderless = false,
      css,
      className = '',
      width,
      height,
      disabled: disabledProp = false,
      onAdd,
      onDelete,
      onEdit,
      onLoadMore,
      onUserMentioned,
      dateFormatter = defaultDateFormatter,
      renderAvatar,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    
    const [comments, setComments] = useState<CommentItem[]>(initialData);
    const [disabled, setDisabled] = useState(disabledProp);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [activeMenuId, setActiveMenuId] = useState<string | number | null>(null);
    const [showMentions, setShowMentions] = useState(false);
    const [mentionSearch, setMentionSearch] = useState('');
    const [currentUserId, setCurrentUserId] = useState<string | number | undefined>(currentUser);

    // Sync with props
    useEffect(() => {
      setComments(initialData);
    }, [initialData]);

    useEffect(() => {
      setDisabled(disabledProp);
    }, [disabledProp]);

    useEffect(() => {
      setCurrentUserId(currentUser);
    }, [currentUser]);

    // Sort comments based on mode
    const sortedComments = useMemo(() => {
      const sorted = [...comments].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return mode === 'chat' ? dateB - dateA : dateA - dateB;
      });
      return mode === 'chat' ? sorted.reverse() : sorted;
    }, [comments, mode]);

    // Get user by ID
    const getUserById = useCallback((userId?: string | number): CommentUser | undefined => {
      if (!userId) return undefined;
      return users.find(u => u.id === userId);
    }, [users]);

    // Filter users for mentions
    const filteredMentionUsers = useMemo(() => {
      if (!mentionSearch) return users;
      const search = mentionSearch.toLowerCase();
      return users.filter(u => u.value.toLowerCase().includes(search));
    }, [users, mentionSearch]);

    // Handle sending a comment
    const handleSend = useCallback(() => {
      if (!inputValue.trim() || disabled || readonly) return;

      const newComment: CommentItem = {
        id: generateId(),
        user_id: currentUserId,
        date: new Date(),
        text: inputValue.trim(),
      };

      setComments(prev => [...prev, newComment]);
      setInputValue('');
      onAdd?.(newComment);

      // Check for mentions
      if (mentions) {
        const mentionRegex = /@"([^"]+)"/g;
        let match: RegExpExecArray | null;
        while ((match = mentionRegex.exec(newComment.text)) !== null) {
          const mentionedUser = users.find(u => u.value === match![1]);
          if (mentionedUser) {
            onUserMentioned?.(mentionedUser.id, newComment);
          }
        }
      }

      // Scroll to bottom/top based on mode
      setTimeout(() => {
        if (listRef.current) {
          if (mode === 'chat') {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          } else {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        }
      }, 100);
    }, [inputValue, disabled, readonly, currentUserId, mentions, users, mode, onAdd, onUserMentioned]);

    // Handle key press in input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (sendAction === 'enter' && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      } else if (sendAction === 'shift+enter' && e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        handleSend();
      }

      // Handle mentions
      if (mentions && e.key === '@') {
        setShowMentions(true);
        setMentionSearch('');
      }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInputValue(value);

      // Handle mention search
      if (mentions && showMentions) {
        const atIndex = value.lastIndexOf('@');
        if (atIndex !== -1) {
          setMentionSearch(value.slice(atIndex + 1));
        }
      }
    };

    // Insert mention
    const insertMention = (user: CommentUser) => {
      const atIndex = inputValue.lastIndexOf('@');
      if (atIndex !== -1) {
        const newValue = inputValue.slice(0, atIndex) + `@"${user.value}" `;
        setInputValue(newValue);
      }
      setShowMentions(false);
      setMentionSearch('');
      inputRef.current?.focus();
    };

    // Handle delete
    const handleDelete = (commentId: string | number) => {
      setComments(prev => prev.filter(c => c.id !== commentId));
      setActiveMenuId(null);
      onDelete?.(commentId);
    };

    // Handle edit start
    const handleEditStart = (comment: CommentItem) => {
      setEditingId(comment.id);
      setEditValue(comment.text);
      setActiveMenuId(null);
    };

    // Handle edit save
    const handleEditSave = (commentId: string | number) => {
      if (!editValue.trim()) return;
      
      setComments(prev => prev.map(c => 
        c.id === commentId ? { ...c, text: editValue.trim() } : c
      ));
      
      const updatedComment = comments.find(c => c.id === commentId);
      if (updatedComment) {
        onEdit?.({ ...updatedComment, text: editValue.trim() });
      }
      
      setEditingId(null);
      setEditValue('');
    };

    // Handle edit cancel
    const handleEditCancel = () => {
      setEditingId(null);
      setEditValue('');
    };

    // Default avatar renderer
    const defaultRenderAvatar = (user?: CommentUser): ReactNode => {
      if (user?.image) {
        return <img src={user.image} alt={user.value} className="avakio-comment-avatar-img" />;
      }
      
      const initials = user?.value
        ? user.value.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';
      
      return <span className="avakio-comment-avatar-initials">{initials}</span>;
    };

    // Render text with mentions highlighted
    const renderText = (text: string): ReactNode => {
      if (!mentions) return text;
      
      const parts = text.split(/(@"[^"]+")/).filter(Boolean);
      return parts.map((part, i) => {
        if (part.startsWith('@"') && part.endsWith('"')) {
          const name = part.slice(2, -1);
          return (
            <span key={i} className="avakio-comment-mention">
              @{name}
            </span>
          );
        }
        return part;
      });
    };

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getNode: () => containerRef.current,
      getComments: () => comments,
      add: (comment) => {
        const newComment: CommentItem = {
          ...comment,
          id: generateId(),
        };
        setComments(prev => [...prev, newComment]);
        onAdd?.(newComment);
      },
      remove: (commentId) => {
        setComments(prev => prev.filter(c => c.id !== commentId));
        onDelete?.(commentId);
      },
      edit: (commentId) => {
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
          handleEditStart(comment);
        }
      },
      getUsers: () => users,
      setCurrentUser: (userId) => setCurrentUserId(userId),
      focus: () => inputRef.current?.focus(),
      isEnabled: () => !disabled,
      enable: () => setDisabled(false),
      disable: () => setDisabled(true),
      clear: () => setComments([]),
    }), [comments, users, disabled, onAdd, onDelete]);

    // Build class names
    const containerClassNames = [
      'avakio-comment',
      theme && `avakio-comment-theme-${theme}`,
      mode === 'chat' && 'avakio-comment-mode-chat',
      borderless && 'avakio-comment-borderless',
      disabled && 'avakio-comment-disabled',
      readonly && 'avakio-comment-readonly',
      className,
    ].filter(Boolean).join(' ');

    // Build styles
    const containerStyles: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        data-admin-theme={theme}
        className={containerClassNames}
        style={containerStyles}
      >
        {/* Comment List */}
        <div ref={listRef} className="avakio-comment-list">
          {/* More button at top for chat mode */}
          {mode === 'chat' && hasMore && (
            <button 
              className="avakio-comment-more-btn"
              onClick={onLoadMore}
              disabled={disabled}
            >
              {moreButtonLabel}
            </button>
          )}

          {sortedComments.map((comment) => {
            const user = getUserById(comment.user_id);
            const isOwner = currentUserId !== undefined && comment.user_id === currentUserId;
            const isEditing = editingId === comment.id;

            return (
              <div key={comment.id} className="avakio-comment-item">
                {/* Avatar */}
                <div className="avakio-comment-avatar">
                  {renderAvatar ? renderAvatar(user) : defaultRenderAvatar(user)}
                  {user?.status && user.status !== 'none' && (
                    <span className={`avakio-comment-status avakio-comment-status-${user.status}`} />
                  )}
                </div>

                {/* Content */}
                <div className="avakio-comment-content">
                  <div className="avakio-comment-header">
                    <span className="avakio-comment-author">
                      {user?.value || 'Anonymous'}
                    </span>
                    <span className="avakio-comment-date">
                      {dateFormatter(comment.date)}
                    </span>
                    
                    {/* Menu for owner */}
                    {isOwner && !readonly && !isEditing && (
                      <div className="avakio-comment-menu-wrapper">
                        <button
                          className="avakio-comment-menu-btn"
                          onClick={() => setActiveMenuId(activeMenuId === comment.id ? null : comment.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        {activeMenuId === comment.id && (
                          <div className="avakio-comment-menu">
                            <button onClick={() => handleEditStart(comment)}>
                              <Edit2 size={14} />
                              Edit
                            </button>
                            <button onClick={() => handleDelete(comment.id)}>
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Comment text or edit mode */}
                  {isEditing ? (
                    <div className="avakio-comment-edit">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="avakio-comment-edit-input"
                        autoFocus
                      />
                      <div className="avakio-comment-edit-actions">
                        <button 
                          className="avakio-comment-edit-save"
                          onClick={() => handleEditSave(comment.id)}
                        >
                          <Check size={14} />
                        </button>
                        <button 
                          className="avakio-comment-edit-cancel"
                          onClick={handleEditCancel}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="avakio-comment-text">
                      {renderText(comment.text)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* More button at bottom for default mode */}
          {mode === 'default' && hasMore && (
            <button 
              className="avakio-comment-more-btn"
              onClick={onLoadMore}
              disabled={disabled}
            >
              {moreButtonLabel}
            </button>
          )}

          {/* Empty state */}
          {sortedComments.length === 0 && (
            <div className="avakio-comment-empty">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>

        {/* Input area */}
        {!readonly && (
          <div className="avakio-comment-input-area">
            <div className="avakio-comment-input-wrapper">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="avakio-comment-input"
                disabled={disabled}
                rows={1}
              />
              
              {/* Mentions dropdown */}
              {showMentions && filteredMentionUsers.length > 0 && (
                <div className="avakio-comment-mentions">
                  {filteredMentionUsers.map(user => (
                    <button
                      key={user.id}
                      className="avakio-comment-mention-item"
                      onClick={() => insertMention(user)}
                    >
                      <div className="avakio-comment-mention-avatar">
                        {defaultRenderAvatar(user)}
                      </div>
                      <span>{user.value}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {(keepButtonVisible || inputValue.trim()) && (
              <button
                className="avakio-comment-send-btn"
                onClick={handleSend}
                disabled={disabled || !inputValue.trim()}
              >
                <Send size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

AvakioComment.displayName = 'AvakioComment';

export default AvakioComment;











