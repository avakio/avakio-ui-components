import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Log entry interface
export interface EventLogEntry {
  id: string;
  timestamp: Date;
  componentName: string;
  action: string;
  details: string;
}

// Context interface
interface EventLogContextType {
  logs: EventLogEntry[];
  addLog: (componentName: string, action: string, details: string) => void;
  clearLogs: () => void;
  isLogSidebarOpen: boolean;
  setLogSidebarOpen: (open: boolean) => void;
  toggleLogSidebar: () => void;
}

// Create context
const EventLogContext = createContext<EventLogContextType | undefined>(undefined);

// Generate unique ID
let logIdCounter = 0;
const generateLogId = () => `log-${Date.now()}-${++logIdCounter}`;

// Provider component
interface EventLogProviderProps {
  children: ReactNode;
}

export function EventLogProvider({ children }: EventLogProviderProps) {
  const [logs, setLogs] = useState<EventLogEntry[]>([]);
  const [isLogSidebarOpen, setLogSidebarOpen] = useState(false);

  const addLog = useCallback((componentName: string, action: string, details: string) => {
    const newEntry: EventLogEntry = {
      id: generateLogId(),
      timestamp: new Date(),
      componentName,
      action,
      details,
    };
    
    setLogs(prevLogs => {
      // Keep last 100 logs to prevent memory issues
      const newLogs = [newEntry, ...prevLogs];
      if (newLogs.length > 100) {
        return newLogs.slice(0, 100);
      }
      return newLogs;
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const toggleLogSidebar = useCallback(() => {
    setLogSidebarOpen(prev => !prev);
  }, []);

  const value: EventLogContextType = {
    logs,
    addLog,
    clearLogs,
    isLogSidebarOpen,
    setLogSidebarOpen,
    toggleLogSidebar,
  };

  return (
    <EventLogContext.Provider value={value}>
      {children}
    </EventLogContext.Provider>
  );
}

// Hook to use event log
export function useEventLog() {
  const context = useContext(EventLogContext);
  if (!context) {
    throw new Error('useEventLog must be used within an EventLogProvider');
  }
  return context;
}

// Standalone function for adding logs (for use outside React components)
// This requires the context to be set up properly
let globalAddLog: ((componentName: string, action: string, details: string) => void) | null = null;

export function setGlobalAddLog(fn: (componentName: string, action: string, details: string) => void) {
  globalAddLog = fn;
}

export function addEventLog(componentName: string, action: string, details: string) {
  if (globalAddLog) {
    globalAddLog(componentName, action, details);
  } else {
    console.warn('Event log service not initialized. Make sure EventLogProvider is mounted.');
  }
}
