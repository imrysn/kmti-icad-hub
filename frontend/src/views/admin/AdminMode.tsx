import { XCircle } from 'lucide-react';
import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import '../../styles/AdminMode.css';

// Components
import ErrorBoundary from '../../components/ErrorBoundary';
import { PracticalTrainerDashboard } from '../mentor/components/PracticalTrainerDashboard';
import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminComingSoon } from './components/AdminComingSoon';
import { AccessPlanManagement } from './components/AccessPlanManagement';
import { AssessmentManagement } from './components/AssessmentManagement';
import { AuditLogs } from './components/AuditLogs';
import { BroadcastCenter } from './components/BroadcastCenter';
import { PerformanceDirectory } from './components/PerformanceDirectory';
import { PracticalManagement } from './components/PracticalManagement';
import { SystemAnalytics } from './components/SystemAnalytics';
import { TraineeDetail } from './components/TraineeDetail';
import { UserManagement } from './components/UserManagement';
import { UserModal } from './components/UserModal';
import { AdminAccessDenied } from './components/AdminAccessDenied';
import { RegistrationApprovalManagement } from './components/RegistrationApprovalManagement';
import { InvitationManagement } from './components/InvitationManagement';
import { CurriculumManagement } from './components/CurriculumManagement';
import { CourseDeliveryManagement } from './components/CourseDeliveryManagement';
import { AdminArea, authService, UserAccess } from '../../services/authService';

export type AdminTab =
    | 'curriculum' | 'assessments' | 'knowledge-base' | 'media-translations'
    | 'registration-approvals' | 'invitations' | 'users' | 'instructors' | 'access-plans' | 'reports-broadcasts'
    | 'system-health' | 'audit-records' | 'security' | 'email-integrations' | 'storage-backups' | 'technical-settings'
    | 'overview' | 'progress' | 'practical' | 'logs' | 'trainees';

const AREA_DEFAULT_TAB: Record<AdminArea, AdminTab> = {
    content: 'curriculum',
    organization: 'registration-approvals',
    platform: 'system-health',
};

const TAB_AREA: Partial<Record<AdminTab, AdminArea>> = {
    assessments: 'content',
    practical: 'content',
    curriculum: 'content',
    'knowledge-base': 'content',
    'media-translations': 'content',
    'registration-approvals': 'organization',
    invitations: 'organization',
    users: 'organization',
    instructors: 'organization',
    'access-plans': 'organization',
    'reports-broadcasts': 'organization',
    progress: 'organization',
    'system-health': 'platform',
    'audit-records': 'platform',
    security: 'platform',
    'email-integrations': 'platform',
    'storage-backups': 'platform',
    'technical-settings': 'platform',
    overview: 'platform',
    logs: 'platform',
};

export const AdminMode: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathParts = location.pathname.split('/').filter(Boolean);
    const requestedArea = pathParts[1] as AdminArea | undefined;
    const requestedTab = pathParts[2] as AdminTab | undefined;
    const legacyTab = pathParts.length === 2 ? pathParts[1] as AdminTab : undefined;
    const activeTab = requestedTab || legacyTab || 'registration-approvals';
    const [access, setAccess] = React.useState<UserAccess | null>(null);
    const [accessError, setAccessError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;
        authService.getCurrentUserAccess()
            .then((result) => mounted && setAccess(result))
            .catch(() => mounted && setAccessError('Unable to load your administrative access.'));
        return () => { mounted = false; };
    }, []);

    React.useEffect(() => {
        if (!access) return;
        const firstArea = access.admin_areas[0];
        if ((location.pathname === '/admin' || location.pathname === '/admin/') && firstArea) {
            navigate(`/admin/${firstArea}/${AREA_DEFAULT_TAB[firstArea]}`, { replace: true });
            return;
        }
        if (legacyTab && TAB_AREA[legacyTab]) {
            const area = TAB_AREA[legacyTab]!;
            navigate(`/admin/${area}/${legacyTab}`, { replace: true });
            return;
        }
        if (requestedArea && access.admin_areas.includes(requestedArea) && !requestedTab) {
            navigate(`/admin/${requestedArea}/${AREA_DEFAULT_TAB[requestedArea]}`, { replace: true });
        }
    }, [access, legacyTab, location.pathname, navigate, requestedArea, requestedTab]);

    const {
        stats,
        users,
        progress,
        logs,
        currentUser,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedTrainee,
        setSelectedTrainee,
        heatmap,
        isUserModalOpen,
        setIsUserModalOpen,
        selectedUser,
        setSelectedUser,
        fetchData,
        handleSaveUser,
        handleExport
    } = useAdminDashboard(activeTab);

    // Safe system metric helpers
    const cpuLoad     = stats?.system?.cpu_load     ?? 0;
    const memoryUsage = stats?.system?.memory_usage  ?? 0;
    const sysStatus   = stats?.system?.status        ?? 'Unknown';

    // Prevent full-page flashing/flickering by only displaying overlay when switching to an empty tab
    const isTabDataEmpty =
        ((activeTab === 'overview' || activeTab === 'system-health') && !stats) ||
        (activeTab === 'users' && users.length === 0) ||
        ((activeTab === 'progress' || activeTab === 'reports-broadcasts') && progress.length === 0) ||
        ((activeTab === 'logs' || activeTab === 'audit-records') && logs.length === 0);

    const showLoader = loading && isTabDataEmpty;
    const isRootRoute = pathParts.length === 1;
    const isLegacyRoute = Boolean(legacyTab && TAB_AREA[legacyTab]);
    const isAccessDenied = Boolean(
        access && !isRootRoute && !isLegacyRoute &&
        (!requestedArea || !access.admin_areas.includes(requestedArea) || TAB_AREA[activeTab] !== requestedArea)
    );

    if (!access && !accessError) {
        return <div className="admin-layout"><div className="loading-overlay"><div className="spinner"></div></div></div>;
    }

    if (accessError || !access) {
        return <div className="admin-layout"><AdminAccessDenied area="Admin Panel" /></div>;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar adminAreas={access.admin_areas} />

            <main className="admin-main">
                {isAccessDenied ? (
                    <AdminAccessDenied area={requestedArea || 'requested'} />
                ) : <>
                <AdminHeader activeTab={activeTab} stats={stats} selectedTrainee={selectedTrainee} fetchData={fetchData} loading={loading} />

                <div className={`page-content ${location.search.includes('subtab=assessments') || location.search.includes('subtab=sets') ? 'no-scroll' : ''}`} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    {error && (
                        <div className="admin-error-banner">
                            <XCircle size={18} /> {error}
                        </div>
                    )}

                    <div style={{ display: activeTab === 'system-health' || activeTab === 'overview' ? 'block' : 'none' }}>
                        <ErrorBoundary>
                            {stats && (
                                <div className="dashboard-scrollable">
                                    <SystemAnalytics stats={stats} cpuLoad={cpuLoad} memoryUsage={memoryUsage} sysStatus={sysStatus} heatmap={heatmap} />
                                </div>
                            )}
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'users' ? 'block' : 'none' }}>
                        <ErrorBoundary>
                            <UserManagement users={users} currentUser={currentUser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onRefresh={fetchData} onAddUser={() => {
                                    setSelectedUser(null);
                                    setIsUserModalOpen(true);
                                }}
                                onEditUser={(user) => {
                                    setSelectedUser(user);
                                    setIsUserModalOpen(true);
                                }}
                             />
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'reports-broadcasts' || activeTab === 'progress' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0 }}>
                        <ErrorBoundary>
                            {(() => {
                                const params = new URLSearchParams(location.search);
                                const subtab = params.get('subtab') || 'overview';

                                if (subtab === 'assessments' || subtab === 'sets') {
                                    return <PracticalTrainerDashboard />;
                                }

                                return !selectedTrainee ? (
                                    <PerformanceDirectory progress={progress} setSelectedTrainee={setSelectedTrainee} />
                                ) : (
                                    <TraineeDetail
                                        selectedTrainee={selectedTrainee}
                                        setSelectedTrainee={setSelectedTrainee}
                                        onExport={handleExport}
                                        onRefresh={fetchData}
                                    />
                                );
                            })()}
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'assessments' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0 }}>
                        <ErrorBoundary>
                            <AssessmentManagement />
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'practical' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0 }}>
                        <ErrorBoundary>
                            <PracticalManagement />
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'audit-records' || activeTab === 'logs' ? 'block' : 'none' }}>
                        <ErrorBoundary>
                            <AuditLogs logs={logs} />
                        </ErrorBoundary>
                    </div>

                    {activeTab === 'curriculum' && <CurriculumManagement />}
                    {activeTab === 'knowledge-base' && <AdminComingSoon title="Knowledge-base content" description="Manage the documents used by the training hub knowledge base." available={['Upload, preview, download, delete, and re-index API foundation']} />}
                    {activeTab === 'media-translations' && <AdminComingSoon title="Media and translations" description="Manage reusable images, videos, captions, and translated course content." />}
                    {activeTab === 'registration-approvals' && <RegistrationApprovalManagement />}
                    {activeTab === 'invitations' && <InvitationManagement />}
                    {activeTab === 'instructors' && <CourseDeliveryManagement />}
                    {activeTab === 'access-plans' && <AccessPlanManagement />}
                    {activeTab === 'security' && <AdminComingSoon title="Security" description="Review administrative permissions, session policies, and account-protection settings." available={['Area-based admin permissions and protected routes']} />}
                    {activeTab === 'email-integrations' && <AdminComingSoon title="Email and integrations" description="Configure registration, invitation, notification, and external-service providers." />}
                    {activeTab === 'storage-backups' && <AdminComingSoon title="Storage and backups" description="Monitor file storage and manage backup, retention, and recovery policies." />}
                    {activeTab === 'technical-settings' && <AdminComingSoon title="Technical settings" description="Manage platform-wide operational settings from one controlled location." available={['System-settings API foundation']} />}

                    {showLoader && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
                </>}
            </main>
            {access.admin_areas.includes('organization') && <BroadcastCenter />}

            {access.admin_areas.includes('organization') && <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />}
        </div>
    );
};
