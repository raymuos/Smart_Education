// Enhanced JavaScript for Smart Student Hub - Unified SPA
let currentUser = null;
let currentView = 'login';

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show loading screen initially
    showLoadingScreen();
    
    // Initialize after a short delay to show loading
    setTimeout(() => {
        initializeThemeToggle();
        initializeNavigation();
        initializeRoleSelection();
        initializeAnimations();
        initializeInteractiveElements();
        initializeNotifications();
        initializeRouting();
        
        // Hide loading screen
        hideLoadingScreen();
    }, 1500);
}

// Loading Screen Management
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Routing System
function initializeRouting() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard(currentUser.role);
    } else {
        showView('loginView');
    }
}

function showView(viewId) {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    
    // Show target view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
        currentView = viewId;
    }
}

function showDashboard(role) {
    if (role === 'student') {
        showView('studentView');
        showStudentDashboard();
    } else if (role === 'faculty') {
        showView('facultyView');
        showFacultyDashboard();
    } else if (role === 'admin') {
        showView('facultyView'); // Admin uses faculty view for now
        showFacultyDashboard();
    }
}

function showStudentDashboard() {
    // Hide all dashboard contents
    const contents = document.querySelectorAll('#studentView .dashboard-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Show dashboard
    const dashboard = document.getElementById('studentDashboard');
    if (dashboard) {
        dashboard.classList.add('active');
    }
}

function showFacultyDashboard() {
    // Hide all dashboard contents
    const contents = document.querySelectorAll('#facultyView .dashboard-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Show dashboard
    const dashboard = document.getElementById('facultyDashboard');
    if (dashboard) {
        dashboard.classList.add('active');
    }
    
    // Update header based on user role
    updateFacultyHeader();
}

function updateFacultyHeader() {
    if (currentUser) {
        const facultyName = document.getElementById('facultyName');
        const facultyDescription = document.getElementById('facultyDescription');
        const facultyProfileName = document.getElementById('facultyProfileName');
        const facultyProfileRole = document.getElementById('facultyProfileRole');
        
        if (currentUser.role === 'admin') {
            if (facultyName) facultyName.textContent = 'Admin User!';
            if (facultyDescription) facultyDescription.textContent = 'Control website and manage system operations';
            if (facultyProfileName) facultyProfileName.textContent = 'Admin User';
            if (facultyProfileRole) facultyProfileRole.textContent = 'Admin';
        } else {
            if (facultyName) facultyName.textContent = 'Dr. Smith!';
            if (facultyDescription) facultyDescription.textContent = 'Manage student activities and track academic progress';
            if (facultyProfileName) facultyProfileName.textContent = 'Dr. Smith';
            if (facultyProfileRole) facultyProfileRole.textContent = 'Faculty';
        }
    }
}

// Authentication Functions
function login(role) {
    currentUser = {
        role: role,
        name: role === 'student' ? 'Barshita' : role === 'faculty' ? 'Dr. Smith' : 'Admin User',
        email: role === 'student' ? 'barshita@student.edu' : role === 'faculty' ? 'dr.smith@faculty.edu' : 'admin@system.edu',
        loginTime: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Show loading animation
    showNotification(`Welcome ${currentUser.name}!`, 'success');
    
    // Transition to dashboard
    setTimeout(() => {
        showDashboard(role);
    }, 1000);
}

function logout() {
    // Clear user data
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Show notification
    showNotification('Logged out successfully', 'info');
    
    // Return to login
    setTimeout(() => {
        showView('loginView');
    }, 500);
}

// Student Navigation
function showStudentSection(sectionId) {
    // Hide all student dashboard contents
    const contents = document.querySelectorAll('#studentView .dashboard-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('#studentView .nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNavItem = document.querySelector(`#studentView .nav-item[data-view="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Faculty Navigation
function showFacultySection(sectionId) {
    // Hide all faculty dashboard contents
    const contents = document.querySelectorAll('#facultyView .dashboard-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('#facultyView .nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNavItem = document.querySelector(`#facultyView .nav-item[data-view="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}



// Navigation Functionality
function initializeNavigation() {
    // Student navigation
    const studentNavItems = document.querySelectorAll('#studentView .nav-item');
    studentNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const viewId = this.getAttribute('data-view');
            showStudentSection(viewId);
            createRippleEffect(this);
        });
    });
    
    // Faculty navigation
    const facultyNavItems = document.querySelectorAll('#facultyView .nav-item');
    facultyNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const viewId = this.getAttribute('data-view');
            showFacultySection(viewId);
            createRippleEffect(this);
        });
    });
}

// Role Selection for Login Page
function initializeRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            login(role);
        });
    });
}

// Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .activity-item, .portfolio-card, .badge-card, .action-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Portfolio card interactions
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.querySelector('h4').textContent;
            showModal(`Viewing ${projectName}`, 'This is where you would see the full project details, images, and description.');
        });
    });
    
    // Action button interactions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionName = this.querySelector('span').textContent;
            showNotification(`${actionName} clicked!`, 'success');
            createRippleEffect(this);
        });
    });
    
    // Approval buttons
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');
    
    approveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const approvalItem = this.closest('.approval-item');
            const studentName = approvalItem.querySelector('h4').textContent;
            showNotification(`Approved ${studentName}'s submission`, 'success');
            approvalItem.style.opacity = '0.5';
            approvalItem.style.pointerEvents = 'none';
        });
    });
    
    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const approvalItem = this.closest('.approval-item');
            const studentName = approvalItem.querySelector('h4').textContent;
            showNotification(`Rejected ${studentName}'s submission`, 'warning');
            approvalItem.style.opacity = '0.5';
            approvalItem.style.pointerEvents = 'none';
        });
    });
}

// Notification System
function initializeNotifications() {
    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    document.body.appendChild(notificationContainer);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        position: relative;
        overflow: hidden;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <div style="position: absolute; bottom: 0; left: 0; height: 3px; background: rgba(255,255,255,0.3); width: 100%; animation: progress 3s linear forwards;"></div>
    `;
    
    // Add progress bar animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
        }
    `;
    document.head.appendChild(style);
    
    document.getElementById('notification-container').appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        error: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Modal System
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--bg-secondary);
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0; color: var(--text-primary);">${title}</h3>
                <button onclick="this.closest('.modal').remove()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--text-secondary);
                ">&times;</button>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.6;">${content}</p>
            <div style="margin-top: 20px; text-align: right;">
                <button onclick="this.closest('.modal').remove()" style="
                    background: var(--primary-gradient);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 500;
                ">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 100);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Loading Animation
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="
            background: var(--bg-secondary);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid var(--bg-tertiary);
                border-top: 4px solid var(--primary-gradient);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <h3 style="color: var(--text-primary); margin: 0;">Loading...</h3>
            <p style="color: var(--text-secondary); margin: 10px 0 0;">Please wait while we prepare your dashboard</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '1';
    }, 100);
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .score-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize progress bar animation when page loads
window.addEventListener('load', function() {
    setTimeout(animateProgressBars, 1000);
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.remove());
    }
    
    // Ctrl/Cmd + K for quick search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Quick search feature coming soon!', 'info');
    }
});

// Performance Monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

trackPerformance();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Action Functions
function showAddActivity() {
    showModal('Add Activity', 'This feature allows you to add new academic or extracurricular activities to your profile.');
}

function showUploadCertificate() {
    showModal('Upload Certificate', 'Upload your certificates and achievements to build your digital portfolio.');
}

function downloadPortfolio() {
    showNotification('Portfolio download started!', 'success');
    // In a real app, this would trigger a PDF generation
}

function shareProfile() {
    showNotification('Profile link copied to clipboard!', 'success');
    // In a real app, this would copy a shareable link
}

function manageStudents() {
    showFacultySection('facultyStudents');
}

function exportReports() {
    showNotification('Generating reports...', 'info');
    // In a real app, this would generate and download reports
}

function viewAnalytics() {
    showFacultySection('facultyAnalytics');
}

function approveSubmission(button) {
    const approvalItem = button.closest('.approval-item');
    const studentName = approvalItem.querySelector('h4').textContent;
    showNotification(`Approved ${studentName}'s submission`, 'success');
    approvalItem.style.opacity = '0.5';
    approvalItem.style.pointerEvents = 'none';
}

function rejectSubmission(button) {
    const approvalItem = button.closest('.approval-item');
    const studentName = approvalItem.querySelector('h4').textContent;
    showNotification(`Rejected ${studentName}'s submission`, 'warning');
    approvalItem.style.opacity = '0.5';
    approvalItem.style.pointerEvents = 'none';
}

function showHelp() {
    showModal('Help & Support', 'For technical support, please contact our support team at support@smartstudenthub.edu or call +1-800-STUDENT.');
}

// Export functions for global access
window.SmartStudentHub = {
    showNotification,
    showModal,
    createRippleEffect,
    login,
    logout,
    showAddActivity,
    showUploadCertificate,
    downloadPortfolio,
    shareProfile,
    manageStudents,
    exportReports,
    viewAnalytics,
    approveSubmission,
    rejectSubmission,
    showHelp
};
// // Theme Toggle Functionality
// function initializeThemeToggle() {
//     const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleFixed');

//     themeToggles.forEach(toggle => {
//         toggle.addEventListener('change', function () {
//             document.body.classList.toggle('dark-mode');
//             localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');

//             // Add smooth transition effect
//             document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
//             setTimeout(() => {
//                 document.body.style.transition = '';
//             }, 300);
//         });
//     });

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggles = document.querySelectorAll('#themeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme',
                document.body.classList.contains('dark-mode') ? 'dark' : 'light'
            );
            // Smooth transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => { document.body.style.transition = ''; }, 300);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggles.forEach(toggle => toggle.checked = true);
    }
}

// Initialize on page load
initializeThemeToggle();


// Show settings popup
function showSettings(event) {
    event.preventDefault();
    document.getElementById("settingsPopup").style.display = "flex";
}

// Close settings popup
function closeSettings() {
    document.getElementById("settingsPopup").style.display = "none";
}


// Sidebar Toggle
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent body click handler from firing
    sidebar.classList.toggle("open");
});

// Close sidebar if clicked outside
document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn) {
        sidebar.classList.remove("open");
    }
});


// Profile Popup
document.getElementById("profileMenuBtn").addEventListener("click", () => {
    document.getElementById("profilePopup").style.display = "flex";
});

function closeProfilePopup() {
    document.getElementById("profilePopup").style.display = "none";
}
