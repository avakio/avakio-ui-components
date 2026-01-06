import React from 'react';
import { useEventLog, EventLogEntry } from '../../services/event-log-service';
import { AvakioButton } from '../avakio/ui-controls/avakio-button/avakio-button';
import { X, Trash2, Clock, Component, Zap, Info } from 'lucide-react';
import './event-log-sidebar.css';

interface EventLogSidebarProps {
  theme?: string;
}

export function EventLogSidebar({ theme = 'material' }: EventLogSidebarProps) {
  const { logs, clearLogs, isLogSidebarOpen, setLogSidebarOpen } = useEventLog();

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isLogSidebarOpen) {
    return null;
  }

  return (
    <div className="event-log-sidebar" data-admin-theme={theme}>
      <div className="event-log-sidebar-header">
        <div className="event-log-sidebar-title">
          <Clock size={18} />
          <span>Event Logs</span>
          <span className="event-log-count">{logs.length}</span>
        </div>
        <div className="event-log-sidebar-actions">
          <AvakioButton
            variant="ghost"
            size="sm"
            onClick={clearLogs}
            title="Clear all logs"
            autowidth
          >
            <Trash2 size={16} />
          </AvakioButton>
          <AvakioButton
            variant="ghost"
            size="sm"
            onClick={() => setLogSidebarOpen(false)}
            title="Close log panel"
            autowidth
          >
            <X size={16} />
          </AvakioButton>
        </div>
      </div>
      
      <div className="event-log-sidebar-content">
        {logs.length === 0 ? (
          <div className="event-log-empty">
            <Info size={32} />
            <p>No events logged yet</p>
            <p className="event-log-empty-hint">Interact with components to see their events here</p>
          </div>
        ) : (
          <div className="event-log-list">
            {logs.map((log) => (
              <EventLogItem key={log.id} log={log} formatTimestamp={formatTimestamp} formatDate={formatDate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface EventLogItemProps {
  log: EventLogEntry;
  formatTimestamp: (date: Date) => string;
  formatDate: (date: Date) => string;
}

function EventLogItem({ log, formatTimestamp, formatDate }: EventLogItemProps) {
  return (
    <div className="event-log-item">
      <div className="event-log-item-header">
        <div className="event-log-item-component">
          <Component size={12} />
          <span>{log.componentName}</span>
        </div>
        <div className="event-log-item-timestamp">
          <span className="event-log-item-date">{formatDate(log.timestamp)}</span>
          <span className="event-log-item-time">{formatTimestamp(log.timestamp)}</span>
        </div>
      </div>
      <div className="event-log-item-action">
        <Zap size={12} />
        <span>{log.action}</span>
      </div>
      {log.details && (
        <div className="event-log-item-details">
          {log.details}
        </div>
      )}
    </div>
  );
}

export default EventLogSidebar;
