'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { quizQuestions } from '@/lib/quizData';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  child_age: string | null;
  message: string | null;
  source: string;
  service_requested: string | null;
  budget: string | null;
  deadline: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  quiz_score: number | null;
  quiz_tier: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

interface QuizResponse {
  id: string;
  question_index: number;
  answer_value: string;
  answer_score: number;
  created_at: string;
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Lead>>({});
  const [quizResponses, setQuizResponses] = useState<QuizResponse[] | null>(null);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [showQuizResponses, setShowQuizResponses] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true since we're loading

  // Load leads from API on mount and auto-refresh every 10 seconds
  useEffect(() => {
    const loadLeads = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/leads');
        if (response.ok) {
          const data = await response.json();
          setLeads(data.leads || []);
        } else {
          console.error('Failed to load leads:', response.status);
          // Fallback to initialLeads if API fails
          if (initialLeads && initialLeads.length > 0) {
            setLeads(initialLeads);
          }
        }
      } catch (error) {
        console.error('Error loading leads:', error);
        // Fallback to initialLeads if API fails
        if (initialLeads && initialLeads.length > 0) {
          setLeads(initialLeads);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Load leads on mount immediately
    loadLeads();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      loadLeads();
    }, 10000); // 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [initialLeads]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'info';
      case 'in_progress':
        return 'default';
      case 'waiting_for_client':
        return 'warning';
      case 'closed':
        return 'success';
      case 'not_relevant':
        return 'warning';
      case 'contacted':
        return 'default';
      case 'converted':
        return 'success';
      case 'archived':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'חדש';
      case 'contacted':
        return 'נוצר קשר';
      case 'converted':
        return 'הומר';
      case 'archived':
        return 'בארכיון';
      default:
        return status;
    }
  };

  const getHeatLevel = (tier: number | null) => {
    if (!tier) return null;
    switch (tier) {
      case 3:
        return { emoji: '🔥🔥🔥', label: 'ליד חם מאוד', color: 'text-red-600', bg: 'bg-red-50' };
      case 2:
        return { emoji: '🔥🔥', label: 'ליד חם', color: 'text-orange-600', bg: 'bg-orange-50' };
      case 1:
        return { emoji: '🔥', label: 'ליד פוטנציאלי', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      default:
        return null;
    }
  };

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setShowQuizResponses(false);
    setQuizResponses(null);
  };

  const handleLoadQuizResponses = async (leadId: string) => {
    if (quizResponses !== null) {
      setShowQuizResponses(!showQuizResponses);
      return;
    }

    setLoadingResponses(true);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/quiz-responses`);
      if (response.ok) {
        const { responses } = await response.json();
        setQuizResponses(responses || []);
        setShowQuizResponses(true);
      } else {
        alert('שגיאה בטעינת התשובות');
      }
    } catch (error) {
      console.error('Error loading quiz responses:', error);
      alert('שגיאה כללית בטעינת התשובות');
    } finally {
      setLoadingResponses(false);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead.id);
    setEditData({
      name: lead.name,
      phone: lead.phone,
      child_age: lead.child_age || '',
      message: lead.message || '',
      status: lead.status,
    });
  };

  const refreshLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error refreshing leads:', error);
    }
  };

  const handleSave = async (leadId: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const { lead } = await response.json();
        setLeads(leads.map(l => l.id === leadId ? lead : l));
        setEditingLead(null);
        setEditData({});
        // Refresh to get latest data
        await refreshLeads();
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה בעדכון הליד');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  const handleCancel = () => {
    setEditingLead(null);
    setEditData({});
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('האם את בטוחה שברצונך למחוק את הליד הזה?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads(leads.filter(l => l.id !== leadId));
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
        // Refresh to get latest data
        await refreshLeads();
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה במחיקת הליד');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const { lead } = await response.json();
        setLeads(leads.map(l => l.id === leadId ? lead : l));
      } else {
        const data = await response.json();
        alert(data.error || 'שגיאה בעדכון הסטטוס');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('שגיאה כללית. נסי שוב מאוחר יותר.');
    }
  };

  if (isLoading && leads.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-text-dark/60 font-body">טוען לידים...</p>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-text-dark/60 font-body">
          הרשימה מתעדכנת אוטומטית כל 10 שניות
        </p>
        <Button variant="secondary" size="sm" onClick={refreshLeads} disabled={isLoading}>
          {isLoading ? 'טוען...' : 'רענון רשימה'}
        </Button>
      </div>
      {leads.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dark/60 font-body mb-4">
            אין לידים להצגה
          </p>
        </Card>
      ) : (
        <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-sky/20">
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  שם
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  טלפון
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  גיל הילד
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  מקור
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  תאריך
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  סטטוס
                </th>
                <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-accent-sky/10 hover:bg-accent-sky/5">
                  {editingLead === lead.id ? (
                    <>
                      <td className="py-4 px-4">
                        <input
                          type="text"
                          value={editData.name || ''}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-2 py-1 border border-accent-sky rounded"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="text"
                          value={editData.phone || ''}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-2 py-1 border border-accent-sky rounded"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="text"
                          value={editData.child_age || ''}
                          onChange={(e) => setEditData({ ...editData, child_age: e.target.value })}
                          className="w-full px-2 py-1 border border-accent-sky rounded"
                        />
                      </td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {lead.source === 'dental_quiz' ? (
                          <span className="text-accent-sky">שאלון</span>
                        ) : (
                          <span>טופס</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {new Date(lead.created_at).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={editData.status || lead.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="px-2 py-1 border border-accent-sky rounded"
                        >
                          <option value="new">חדש</option>
                          <option value="contacted">נוצר קשר</option>
                          <option value="converted">הומר</option>
                          <option value="archived">בארכיון</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(lead.id)}
                            className="text-green-600 hover:text-green-700 font-body text-sm"
                          >
                            שמור
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-700 font-body text-sm"
                          >
                            ביטול
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-4 font-body text-text-dark">{lead.name}</td>
                      <td className="py-4 px-4 font-body text-text-dark">{lead.phone}</td>
                      <td className="py-4 px-4 font-body text-text-dark">{lead.child_age || '-'}</td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {lead.source === 'dental_quiz' ? (
                          <span className="text-accent-sky">שאלון</span>
                        ) : (
                          <span>טופס</span>
                        )}
                        {lead.quiz_tier && (
                          <span className="mr-2 text-accent-lavender">(Tier {lead.quiz_tier})</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-body text-text-dark">
                        {new Date(lead.created_at).toLocaleDateString('he-IL')}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="px-2 py-1 border border-accent-sky rounded text-sm"
                        >
                          <option value="new">חדש</option>
                          <option value="contacted">נוצר קשר</option>
                          <option value="converted">הומר</option>
                          <option value="archived">בארכיון</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleView(lead)}
                            className="text-accent-sky hover:text-accent-lavender font-body text-sm"
                          >
                            צפייה
                          </button>
                          <button
                            onClick={() => handleEdit(lead)}
                            className="text-blue-600 hover:text-blue-700 font-body text-sm"
                          >
                            עריכה
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="text-red-500 hover:text-red-700 font-body text-sm"
                          >
                            מחק
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Card>
      )}

      {/* View Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-text-dark">
                פרטי ליד
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-text-dark/60 hover:text-text-dark text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  שם מלא:
                </label>
                <p className="font-body text-text-dark/80">{selectedLead.name}</p>
              </div>

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  טלפון:
                </label>
                <p className="font-body text-text-dark/80">
                  <a href={`tel:${selectedLead.phone}`} className="text-accent-sky hover:underline">
                    {selectedLead.phone}
                  </a>
                </p>
              </div>

              {selectedLead.child_age && (
                <div>
                  <label className="font-heading font-semibold text-text-dark block mb-2">
                    גיל הילד:
                  </label>
                  <p className="font-body text-text-dark/80">{selectedLead.child_age}</p>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <label className="font-heading font-semibold text-text-dark block mb-2">
                    הודעה:
                  </label>
                  <p className="font-body text-text-dark/80 whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Quiz Score & Heat Level - Prominent Display */}
              {selectedLead.source === 'dental_quiz' && (selectedLead.quiz_score !== null || selectedLead.quiz_tier) && (
                <div className={`p-4 rounded-lg border-2 ${getHeatLevel(selectedLead.quiz_tier)?.bg || 'bg-accent-sky/10'} border-accent-sky/30`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <label className="font-heading font-bold text-text-dark block mb-1">
                        דרגת חום הליד:
                      </label>
                      {getHeatLevel(selectedLead.quiz_tier) && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getHeatLevel(selectedLead.quiz_tier)?.emoji}</span>
                          <span className={`font-heading font-bold text-lg ${getHeatLevel(selectedLead.quiz_tier)?.color}`}>
                            {getHeatLevel(selectedLead.quiz_tier)?.label}
                          </span>
                        </div>
                      )}
                    </div>
                    {selectedLead.quiz_score !== null && (
                      <div className="text-left">
                        <label className="font-heading font-semibold text-text-dark/70 block mb-1 text-sm">
                          ציון שאלון:
                        </label>
                        <span className="text-3xl font-heading font-bold text-accent-sky">
                          {selectedLead.quiz_score}
                        </span>
                        <span className="text-text-dark/60 font-body text-sm mr-1">/ 18</span>
                      </div>
                    )}
                  </div>
                  {selectedLead.quiz_tier && (
                    <p className="text-sm text-text-dark/70 font-body">
                      רמה {selectedLead.quiz_tier} - {selectedLead.quiz_tier === 3 ? 'זקוקים מאוד לשיקום' : selectedLead.quiz_tier === 2 ? 'זקוקים לשיקום' : 'פוטנציאל לשיקום'}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  מקור:
                </label>
                <p className="font-body text-text-dark/80">
                  {selectedLead.source === 'dental_quiz' ? 'שאלון בדיקת שיניים' : 'טופס יצירת קשר'}
                </p>
              </div>

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  סטטוס:
                </label>
                <Badge variant={getStatusBadgeVariant(selectedLead.status)}>
                  {getStatusLabel(selectedLead.status)}
                </Badge>
              </div>

              <div>
                <label className="font-heading font-semibold text-text-dark block mb-2">
                  תאריך יצירה:
                </label>
                <p className="font-body text-text-dark/80">
                  {new Date(selectedLead.created_at).toLocaleString('he-IL')}
                </p>
              </div>

              {selectedLead.updated_at && (
                <div>
                  <label className="font-heading font-semibold text-text-dark block mb-2">
                    תאריך עדכון אחרון:
                  </label>
                  <p className="font-body text-text-dark/80">
                    {new Date(selectedLead.updated_at).toLocaleString('he-IL')}
                  </p>
                </div>
              )}

              {selectedLead.ip_address && (
                <div>
                  <label className="font-heading font-semibold text-text-dark block mb-2">
                    כתובת IP:
                  </label>
                  <p className="font-body text-text-dark/80 text-sm">{selectedLead.ip_address}</p>
                </div>
              )}

              {/* Quiz Responses Section */}
              {selectedLead.source === 'dental_quiz' && (
                <div className="mt-6 pt-6 border-t border-accent-sky/20">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-heading font-semibold text-text-dark">
                      תשובות מפורטות לשאלון:
                    </label>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleLoadQuizResponses(selectedLead.id)}
                      disabled={loadingResponses}
                    >
                      {loadingResponses
                        ? 'טוען...'
                        : showQuizResponses
                        ? 'הסתר תשובות'
                        : 'הצג תשובות'}
                    </Button>
                  </div>

                  {showQuizResponses && quizResponses && (
                    <div className="space-y-4 mt-4">
                      {quizResponses.length === 0 ? (
                        <p className="text-text-dark/60 font-body text-sm">
                          לא נמצאו תשובות מפורטות לשאלון זה
                        </p>
                      ) : (
                        quizResponses.map((response) => {
                          const question = quizQuestions.find((q) => q.id === response.question_index + 1);
                          return (
                            <div
                              key={response.id}
                              className="p-4 bg-accent-sky/5 rounded-lg border border-accent-sky/20"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-heading font-semibold text-text-dark">
                                  {question ? question.text : `שאלה ${response.question_index + 1}`}
                                </h4>
                                <Badge variant="info" className="mr-2">
                                  {response.answer_score} נקודות
                                </Badge>
                              </div>
                              <p className="font-body text-text-dark/80">{response.answer_value}</p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6 pt-6 border-t border-accent-sky/20">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setSelectedLead(null);
                  handleEdit(selectedLead);
                }}
              >
                ערוך ליד
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedLead(null)}
              >
                סגור
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

