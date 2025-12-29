'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface LeadDetailProps {
  lead: any;
}

export function LeadDetail({ lead: initialLead }: LeadDetailProps) {
  const [lead, setLead] = useState(initialLead);
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLead({ ...lead, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_he: newNote }),
      });

      if (response.ok) {
        const data = await response.json();
        setLead({
          ...lead,
          notes: [...lead.notes, data],
        });
        setNewNote('');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: newTag }),
      });

      if (response.ok) {
        const data = await response.json();
        setLead({
          ...lead,
          tags: [...lead.tags, data],
        });
        setNewTag('');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark mb-2">
          {lead.name}
        </h1>
        <p className="text-text-medium font-body">
          {lead.phone} {lead.email && `• ${lead.email}`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              פרטים
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-medium">סטטוס</label>
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-accent-sky bg-white mt-1"
                >
                  <option value="new">חדש</option>
                  <option value="in_progress">בטיפול</option>
                  <option value="waiting_for_client">מחכה ללקוח</option>
                  <option value="closed">נסגר</option>
                  <option value="not_relevant">לא רלוונטי</option>
                </select>
              </div>

              {lead.service_requested && (
                <div>
                  <label className="text-sm font-medium text-text-medium">שירות מבוקש</label>
                  <p className="font-body text-text-dark">{lead.service_requested}</p>
                </div>
              )}

              {lead.utm_source && (
                <div>
                  <label className="text-sm font-medium text-text-medium">מקור (UTM)</label>
                  <p className="font-body text-text-dark">
                    {lead.utm_source} / {lead.utm_medium} / {lead.utm_campaign}
                  </p>
                </div>
              )}

              {lead.message && (
                <div>
                  <label className="text-sm font-medium text-text-medium">הודעה</label>
                  <p className="font-body text-text-dark">{lead.message}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              הערות
            </h2>
            <div className="space-y-4 mb-4">
              {lead.notes.map((note: any) => (
                <div key={note.id} className="p-3 bg-gray-50 rounded">
                  <p className="font-body text-text-dark">{note.note_he}</p>
                  <p className="text-xs text-text-medium mt-2">
                    {new Date(note.created_at).toLocaleString('he-IL')}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="הוסף הערה..."
                rows={2}
                className="flex-1"
              />
              <Button onClick={handleAddNote}>הוסף</Button>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              ציר זמן
            </h2>
            <div className="space-y-3">
              {lead.events.map((event: any) => (
                <div key={event.id} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-sky mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-body text-text-dark">{event.description_he}</p>
                    <p className="text-xs text-text-medium">
                      {new Date(event.created_at).toLocaleString('he-IL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              תיוגים
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {lead.tags.map((tag: any) => (
                <Badge key={tag.id} variant="default">
                  {tag.tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="תג חדש"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag}>הוסף</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              משימות
            </h2>
            <div className="space-y-3">
              {lead.tasks.map((task: any) => (
                <div key={task.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      className="mt-1"
                      readOnly
                    />
                    <div className="flex-1">
                      <p className="font-body text-text-dark">{task.title_he}</p>
                      {task.due_date && (
                        <p className="text-xs text-text-medium">
                          עד: {new Date(task.due_date).toLocaleDateString('he-IL')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="w-full mt-4">
              משימה חדשה
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

