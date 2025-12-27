'use client';

import { useState, useEffect } from 'react';
import { History, Loader2, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { candidatesApi } from '@/lib/api/candidates';

interface ProfileHistoryEntry {
  _id: string;
  field_name: string;
  old_value: any;
  new_value: any;
  changed_at: string;
  changed_by: string;
}

export function ProfileHistoryViewer() {
  const [history, setHistory] = useState<ProfileHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await candidatesApi.getMyProfileHistory();
      if (response.success && response.data) {
        setHistory(response.data);
      }
    } catch (error) {
      toast.error('Failed to load profile history');
      console.error('Profile history error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && history.length === 0) {
      fetchHistory();
    }
  }, [isOpen]);

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'Not set';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const formatFieldName = (fieldName: string): string => {
    if (!fieldName || typeof fieldName !== 'string') return 'Unknown Field';
    return fieldName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        <History className="mr-2 h-4 w-4" />
        View Profile History
      </Button>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader className="bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              Profile History
            </CardTitle>
            <CardDescription>
              Track all changes made to your profile
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <History className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No profile changes yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={entry._id}
                  className="relative pl-8 pb-4 border-l-2 border-muted last:border-l-0 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-primary border-2 border-background" />

                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {formatFieldName(entry.field_name)}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.changed_at).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Change #{history.length - index}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm bg-muted/50 p-3 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">From:</p>
                        <p className="truncate text-destructive">
                          {formatValue(entry.old_value)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">To:</p>
                        <p className="truncate text-green-600">
                          {formatValue(entry.new_value)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
