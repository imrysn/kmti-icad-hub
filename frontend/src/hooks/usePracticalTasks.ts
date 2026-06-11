import { useState, useEffect, useCallback } from 'react';
import { assessmentService, AssessmentTask, AssessmentSubmission } from '../services/assessmentService';
import { authService } from '../services/authService';
import { useNotification } from '../context/NotificationContext';

export const usePracticalTasks = () => {
  const { showNotification } = useNotification();
  const [tasks, setTasks] = useState<AssessmentTask[]>([]);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSet, setActiveSet] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<number | null>(null);
  const [uploadingTaskId, setUploadingTaskId] = useState<number | null>(null);

  const fetchData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const [tasksData, submissionsData] = await Promise.all([
        assessmentService.getTasks(),
        assessmentService.getMySubmissions()
      ]);
      setTasks(tasksData);
      setSubmissions(submissionsData);
    } catch (err) {
      if (!isSilent) showNotification('Failed to load assessment data.', 'error');
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchData();
    
    // Polling for updates every 10 seconds (silent background refresh)
    const pollInterval = setInterval(() => fetchData(true), 10000);
    
    const handleRefresh = () => {
      fetchData(true);
    };
    window.addEventListener('kmti-refresh-my-submissions', handleRefresh);
    
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('kmti-refresh-my-submissions', handleRefresh);
    };
  }, [fetchData]);

  const handleOpenInIJCAD = useCallback(async (task: AssessmentTask) => {
    if (window.electronAPI && window.electronAPI.downloadAndOpen) {
      try {
        const url = assessmentService.getDownloadUrl(task.id);
        const filename = `Set${task.set_number}_${task.task_code}_Master.dwg`;
        const token = authService.getToken();

        if (!token) {
          showNotification('Session expired. Please login again.', 'error');
          return;
        }

        showNotification(`Preparing ${task.title}...`, 'info');
        await window.electronAPI.downloadAndOpen({ url, filename, token });
        showNotification(`${task.title} opened in iJCAD.`, 'success');
      } catch (err) {
        console.error('Failed to open in iJCAD:', err);
        showNotification('Failed to launch iJCAD. Please check if it is installed.', 'error');
      }
    } else {
      showNotification('iJCAD integration is only available in the Desktop App.', 'warning');
    }
  }, [showNotification]);

  const handleDownloadTask = useCallback(async (task: AssessmentTask) => {
    const token = authService.getToken();

    if (!token) {
      showNotification('Session expired. Please login again.', 'error');
      return;
    }

    try {
      showNotification('Preparing task template download...', 'info');
      const response = await fetch(assessmentService.getDownloadUrl(task.id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          showNotification('Authentication failed. Please login again.', 'error');
        } else {
          throw new Error('Download failed');
        }
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `Set${task.set_number}_${task.task_code}_Master.dwg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showNotification('Task template download started.', 'success');
    } catch (err) {
      console.error('Download error:', err);
      showNotification('Failed to download task template.', 'error');
    }
  }, [showNotification]);

  const handleDownloadFeedback = useCallback(async (submission: AssessmentSubmission) => {
    if (!submission.feedback || submission.feedback.length === 0) return;
    const feedback = submission.feedback[0];
    const token = authService.getToken();

    if (!token) {
      showNotification('Session expired. Please login again.', 'error');
      return;
    }

    try {
      showNotification('Preparing download...', 'info');
      const response = await fetch(assessmentService.getFeedbackDownloadUrl(feedback.id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          showNotification('Authentication failed. Please login again.', 'error');
        } else {
          throw new Error('Download failed');
        }
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `Checkback_${submission.user?.username}_${submission.task?.task_code}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showNotification('Download started.', 'success');
    } catch (err) {
      console.error('Download error:', err);
      showNotification('Failed to download file.', 'error');
    }
  }, [showNotification]);

  const handleOpenFeedbackExcel = useCallback(async (submission: AssessmentSubmission) => {
    if (!submission.feedback || submission.feedback.length === 0) return;
    const feedback = submission.feedback[0];

    if (window.electronAPI && window.electronAPI.downloadAndOpen) {
      try {
        const url = assessmentService.getFeedbackDownloadUrl(feedback.id);
        const filename = `Checkback_${submission.user?.username}_${submission.task?.task_code}.xlsx`;
        const token = authService.getToken();

        if (!token) return;

        showNotification('Opening checkback file...', 'info');
        await window.electronAPI.downloadAndOpen({ url, filename, token });
      } catch (err) {
        console.error('Failed to open Excel:', err);
        showNotification('Failed to open Excel file.', 'error');
      }
    } else {
      handleDownloadFeedback(submission);
    }
  }, [showNotification, handleDownloadFeedback]);

  const uploadTaskFile = useCallback(async (file: File, task: AssessmentTask, assessmentType: '3D' | '2D' = '3D') => {
    const validExtensions = ['.dwg', '.icd', '.dxf', '.step', '.stp', '.iges', '.igs', '.sat', '.3dm'];
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validExtensions.includes(ext)) {
      showNotification('Please upload a valid CAD file (.dwg, .icd, .dxf, .step, etc.).', 'error');
      return;
    }

    setUploadingTaskId(task.id);
    setIsSubmitting(true);
    try {
      await assessmentService.submitTask(task.id, file, assessmentType);
      showNotification('Task submitted successfully! Awaiting trainer review.', 'success');
      fetchData(true);
    } catch (err) {
      showNotification('Failed to submit task.', 'error');
    } finally {
      setIsSubmitting(false);
      setUploadingTaskId(null);
    }
  }, [showNotification, fetchData]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, task: AssessmentTask, assessmentType: '3D' | '2D' = '3D') => {
    if (!e.target.files?.[0]) return;
    await uploadTaskFile(e.target.files[0], task, assessmentType);
  }, [uploadTaskFile]);

  const handleDeleteSubmission = useCallback(async (subId: number) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        await assessmentService.deleteSubmission(subId);
        showNotification('Submission deleted.', 'success');
        fetchData(true);
      } catch (err) {
        showNotification('Failed to delete.', 'error');
      }
    }
  }, [showNotification, fetchData]);

  const handleReplyToFeedback = useCallback(async (feedbackId: number, text: string) => {
    try {
      await assessmentService.replyToFeedback(feedbackId, text);
      showNotification('Reply sent successfully!', 'success');
      fetchData(true);
    } catch (err: any) {
      const errorData = err.response?.data?.detail;
      const errorMsg = Array.isArray(errorData) 
        ? errorData[0].msg 
        : (typeof errorData === 'string' ? errorData : 'Failed to send reply.');
      showNotification(errorMsg, 'error');
    }
  }, [showNotification, fetchData]);

  return {
    tasks,
    submissions,
    loading,
    activeSet,
    setActiveSet,
    isSubmitting,
    expandedFeedbackId,
    setExpandedFeedbackId,
    uploadingTaskId,
    fetchData,
    handleOpenInIJCAD,
    handleDownloadTask,
    handleOpenFeedbackExcel,
    handleDownloadFeedback,
    handleFileUpload,
    uploadTaskFile,
    handleDeleteSubmission,
    handleReplyToFeedback
  };
};
