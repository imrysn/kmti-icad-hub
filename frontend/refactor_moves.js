const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const stylesDir = path.join(srcDir, 'styles');

// Helper to move file and create dir if needed
function moveFile(oldPath, newPath) {
    if (fs.existsSync(oldPath)) {
        const dir = path.dirname(newPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.renameSync(oldPath, newPath);
        console.log(`Moved: ${path.relative(__dirname, oldPath)} -> ${path.relative(__dirname, newPath)}`);
    } else {
        console.log(`Not found: ${path.relative(__dirname, oldPath)}`);
    }
}

// 1. Top Level Views
const topLevelViews = [
    { name: 'LoginView', folder: 'Login' },
    { name: 'LandingView', folder: 'Landing' },
    { name: 'RegistrationView', folder: 'Registration' },
    { name: 'AccountCenterView', folder: 'AccountCenter' },
    { name: 'PasswordResetView', folder: 'PasswordReset' },
    { name: 'InvitationAcceptanceView', folder: 'InvitationAcceptance' },
];

topLevelViews.forEach(view => {
    // Move TSX
    moveFile(
        path.join(srcDir, 'views', `${view.name}.tsx`),
        path.join(srcDir, 'views', view.folder, `${view.name}.tsx`)
    );
    // Move Test
    moveFile(
        path.join(srcDir, 'views', '__tests__', `${view.name}.test.tsx`),
        path.join(srcDir, 'views', view.folder, `${view.name}.test.tsx`)
    );
    // Move CSS
    moveFile(
        path.join(stylesDir, `${view.name}.css`),
        path.join(srcDir, 'views', view.folder, `${view.name}.css`)
    );
});

// Some CSS are named slightly differently or used by these views
moveFile(path.join(stylesDir, 'RegistrationVerification.css'), path.join(srcDir, 'views', 'Registration', 'RegistrationVerification.css'));
moveFile(path.join(stylesDir, 'BillingModal.css'), path.join(srcDir, 'views', 'AccountCenter', 'BillingModal.css'));
moveFile(path.join(stylesDir, 'UpgradePlan.css'), path.join(srcDir, 'views', 'AccountCenter', 'UpgradePlan.css'));


// 2. Components CSS
const componentsCssMapping = [
    { css: 'BroadcastBanner.css', dest: 'components/BroadcastBanner.css' },
    { css: 'ConfirmationModal.css', dest: 'components/ConfirmationModal.css' },
    { css: 'ErrorBoundary.css', dest: 'components/ErrorBoundary.css' },
    { css: 'LessonIntroPanel.css', dest: 'components/LessonIntroPanel.css' },
    { css: 'LessonObjective.css', dest: 'components/LessonObjective.css' },
    { css: 'LessonQuestionPanel.css', dest: 'components/LessonQuestionPanel.css' },
    { css: 'LessonVideoSubtitle.css', dest: 'components/LessonVideoSubtitle.css' },
    { css: 'LoadingScreen.css', dest: 'components/LoadingScreen.css' },
    { css: 'Skeleton.css', dest: 'components/Skeleton.css' },
    { css: 'Modal.css', dest: 'components/Modal.css' },
    { css: 'NotificationSystem.css', dest: 'components/NotificationSystem.css' },
    { css: 'ProfileSettings.css', dest: 'components/ProfileSettings.css' },
    { css: 'WindowControls.css', dest: 'components/WindowControls.css' },
    
    // admin css
    { css: 'admin/PracticalManagement.css', dest: 'views/admin/components/PracticalManagement.css' },
    { css: 'AdminMode.css', dest: 'views/admin/AdminMode.css' },
    { css: 'AssistantMode.css', dest: 'views/assistant/AssistantMode.css' },
    { css: 'MentorMode.css', dest: 'views/mentor/MentorMode.css' },

    // mentor css
    { css: 'mentor/PracticalAssessment.css', dest: 'views/mentor/components/PracticalAssessment.css' },
    { css: 'mentor/QuizModal.css', dest: 'views/mentor/components/QuizModal.css' },
    { css: 'mentor/PracticalTrainerDashboard.css', dest: 'views/mentor/components/PracticalTrainerDashboard.css' },
    
    // Other styles found in styles/
    { css: 'AccessPlanManagement.css', dest: 'views/admin/components/AccessPlanManagement.css' },
    { css: 'AccountAccessPanel.css', dest: 'views/admin/components/AccountAccessPanel.css' },
    { css: 'AccountCenter.css', dest: 'views/AccountCenter/AccountCenter.css' },
    { css: 'AssessmentManagement.css', dest: 'views/admin/components/AssessmentManagement.css' },
    { css: 'BroadcastCenter.css', dest: 'views/admin/components/BroadcastCenter.css' },
    { css: 'CourseDeliveryManagement.css', dest: 'views/admin/components/CourseDeliveryManagement.css' },
    { css: 'CurriculumManagement.css', dest: 'views/admin/components/CurriculumManagement.css' },
    { css: 'InvitationAcceptance.css', dest: 'views/InvitationAcceptance/InvitationAcceptance.css' },
    { css: 'InvitationManagement.css', dest: 'views/admin/components/InvitationManagement.css' },
    { css: 'KnowledgeManagement.css', dest: 'views/admin/components/KnowledgeManagement.css' },
    { css: 'PlanAssignmentPanel.css', dest: 'views/admin/components/PlanAssignmentPanel.css' },
    { css: 'RegistrationApprovalManagement.css', dest: 'views/admin/components/RegistrationApprovalManagement.css' },

    // 2D and 3D
    { css: '2D_Drawing/CourseLesson.css', dest: 'components/2D_Drawing/CourseLesson.css' },
    { css: '3D_Modeling/CourseLesson.css', dest: 'components/3D_Modeling/CourseLesson.css' },
    { css: '3D_Modeling/InteractiveImageMap.css', dest: 'components/3D_Modeling/InteractiveImageMap.css' },
    { css: '3D_Modeling/ToolbarExplorer.css', dest: 'components/3D_Modeling/ToolbarExplorer.css' },

    // App
    { css: 'App.css', dest: 'App.css' }
];

componentsCssMapping.forEach(mapping => {
    moveFile(
        path.join(stylesDir, mapping.css),
        path.join(srcDir, mapping.dest)
    );
});

// 3. Asset renaming
const assetsDir = path.join(srcDir, 'assets');
moveFile(path.join(assetsDir, '2D_Image_File'), path.join(assetsDir, '2d-images'));
moveFile(path.join(assetsDir, '3D_Image_File'), path.join(assetsDir, '3d-images'));

console.log("File moves complete. Next run import replacement.");
