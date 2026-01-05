# AvakioComment

A widget for exchanging comments between users with support for editing, deleting, mentions, and user avatars.

## Features

- **User Avatars & Names**: Display user images or initials with names
- **User Statuses**: Show status indicators (active, away, busy, none)
- **Edit & Delete**: Users can modify or remove their own comments
- **Mentions**: Tag users with @mentions that highlight in text
- **Multiple Modes**: Default (oldest first) or Chat (newest first)
- **Themed Variants**: material, flat, compact, dark, ocean, sunset
- **Read-only Mode**: Display comments without editing capability
- **Load More**: Support for paginated comment loading
- **Ref Methods**: Programmatic control via ref

## Basic Usage

```tsx
import { AvakioComment } from '@/components/avakio/ui-widgets/avakio-comment';

const users = [
  { id: 1, value: 'John Smith', image: '/avatars/john.jpg', status: 'active' },
  { id: 2, value: 'Sarah Johnson', image: '/avatars/sarah.jpg', status: 'away' },
];

const comments = [
  { id: 1, user_id: 1, date: new Date(), text: 'Hello everyone!' },
  { id: 2, user_id: 2, date: new Date(), text: 'Hi there!' },
];

function MyComponent() {
  return (
    <AvakioComment
      data={comments}
      users={users}
      currentUser={1}
      width={400}
      height={350}
    />
  );
}
```

## With Theme

```tsx
<AvakioComment
  theme="material"
  data={comments}
  users={users}
  currentUser={1}
/>
```

## Chat Mode (Newest First)

```tsx
<AvakioComment
  mode="chat"
  data={comments}
  users={users}
  currentUser={1}
/>
```

## Read-only Mode

```tsx
<AvakioComment
  readonly
  data={comments}
  users={users}
/>
```

## With Mentions

```tsx
<AvakioComment
  mentions
  data={comments}
  users={users}
  currentUser={1}
  onUserMentioned={(userId, comment) => {
    console.log(`User ${userId} was mentioned`);
  }}
/>
```

## With Event Handlers

```tsx
<AvakioComment
  data={comments}
  users={users}
  currentUser={1}
  onAdd={(comment) => console.log('Added:', comment)}
  onEdit={(comment) => console.log('Edited:', comment)}
  onDelete={(id) => console.log('Deleted:', id)}
  onLoadMore={() => fetchMoreComments()}
/>
```

## Using Ref Methods

```tsx
import { useRef } from 'react';
import { AvakioComment, AvakioCommentRef } from '@/components/avakio/ui-widgets/avakio-comment';

function MyComponent() {
  const commentRef = useRef<AvakioCommentRef>(null);

  const addComment = () => {
    commentRef.current?.add({
      user_id: 1,
      date: new Date(),
      text: 'New comment added programmatically!'
    });
  };

  const clearAll = () => {
    commentRef.current?.clear();
  };

  return (
    <>
      <AvakioComment
        ref={commentRef}
        data={comments}
        users={users}
        currentUser={1}
      />
      <button onClick={addComment}>Add Comment</button>
      <button onClick={clearAll}>Clear All</button>
    </>
  );
}
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `CommentItem[]` | `[]` | Array of comment objects |
| `users` | `CommentUser[]` | `[]` | Array of user objects |
| `currentUser` | `string \| number` | - | Current user ID (their comments can be edited/deleted) |
| `mode` | `'default' \| 'chat'` | `'default'` | Display mode |
| `readonly` | `boolean` | `false` | Read-only mode |
| `sendAction` | `'enter' \| 'shift+enter'` | `'enter'` | Key to send comment |
| `placeholder` | `string` | `'Write a comment...'` | Input placeholder |
| `mentions` | `boolean` | `false` | Enable @mentions |
| `keepButtonVisible` | `boolean` | `false` | Always show send button |
| `hasMore` | `boolean` | `false` | Show load more button |
| `moreButtonLabel` | `string` | `'Load more comments'` | Load more button text |
| `borderless` | `boolean` | `false` | Remove border |
| `disabled` | `boolean` | `false` | Disable component |
| `theme` | `AvakioCommentTheme` | - | Theme variant |
| `width` | `number \| string` | - | Component width |
| `height` | `number \| string` | - | Component height |
| `onAdd` | `(comment) => void` | - | Callback when comment added |
| `onEdit` | `(comment) => void` | - | Callback when comment edited |
| `onDelete` | `(id) => void` | - | Callback when comment deleted |
| `onLoadMore` | `() => void` | - | Callback for load more |
| `onUserMentioned` | `(userId, comment) => void` | - | Callback when user mentioned |
| `dateFormatter` | `(date) => string` | - | Custom date formatter |
| `renderAvatar` | `(user) => ReactNode` | - | Custom avatar renderer |

## Data Types

### CommentItem

```typescript
interface CommentItem {
  id: string | number;
  user_id?: string | number;  // Optional for anonymous comments
  date: Date | string;
  text: string;
}
```

### CommentUser

```typescript
interface CommentUser {
  id: string | number;
  value: string;              // User's display name
  image?: string;             // Avatar URL
  status?: 'active' | 'away' | 'busy' | 'none';
}
```

## Ref Methods

| Method | Type | Description |
|--------|------|-------------|
| `getNode()` | `() => HTMLDivElement \| null` | Get component DOM node |
| `getComments()` | `() => CommentItem[]` | Get all comments |
| `add(comment)` | `(comment) => void` | Add a new comment |
| `remove(id)` | `(id) => void` | Remove comment by ID |
| `edit(id)` | `(id) => void` | Open edit mode for comment |
| `getUsers()` | `() => CommentUser[]` | Get users data |
| `setCurrentUser(id)` | `(id) => void` | Set current user |
| `focus()` | `() => void` | Focus input area |
| `isEnabled()` | `() => boolean` | Check if enabled |
| `enable()` | `() => void` | Enable component |
| `disable()` | `() => void` | Disable component |
| `clear()` | `() => void` | Clear all comments |

## Theming

The component supports six built-in themes:

- **material**: Default Material Design inspired theme
- **flat**: Clean, flat design with uppercase author names
- **compact**: Smaller, more compact appearance
- **dark**: Dark background with light text
- **ocean**: Blue/teal color scheme with gradient avatars
- **sunset**: Orange/warm color scheme with gradient avatars

## User Statuses

Users can have status indicators displayed on their avatars:

- `active`: Green indicator
- `away`: Orange indicator
- `busy`: Red indicator
- `none`: No indicator

## Mentions

When `mentions` is enabled:

1. Type `@` to see a dropdown of available users
2. Select a user to insert `@"User Name"` into the text
3. Mentions are highlighted in the displayed text
4. Use `onUserMentioned` callback to handle mention notifications
5. Press Enter to send comment (works even with mentions dropdown open)
6. Press Escape to close the mentions dropdown without sending

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Send comment (when `sendAction='enter'`) |
| Shift+Enter | Send comment (when `sendAction='shift+enter'`) or new line |
| Escape | Close mentions dropdown |

## Accessibility

- Keyboard navigation support
- Focus indicators
- Screen reader compatible
- Proper ARIA attributes

## Related Components

- [AvakioText](../../ui-controls/avakio-text/README.md) - Text input
- [AvakioButton](../../ui-controls/avakio-button/README.md) - Buttons
- [AvakioLayout](../../layouts/avakio-layout/README.md) - Layouts

