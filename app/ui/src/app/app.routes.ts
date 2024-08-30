import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SigninComponent } from './components/auth/user/signin/signin.component';
import { SignupComponent } from './components/auth/user/signup/signup.component';
import { AdminSigninComponent } from './components/auth/admin/admin-signin/admin-signin.component';
import { CourseHomeComponent } from './components/courses/course-home/course-home.component';
import { CourseSearchComponent } from './components/courses/course-search/course-search.component';
import { CourseInfoComponent } from './components/courses/course-info/course-info.component';
import { CourseLecturesComponent } from './components/courses/course-lectures/course-lectures.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { RoutesComponent } from './components/utilities/routes/routes.component';
import { UserProfileComponent } from './components/user/user-dashboard/user-profile/user-profile.component';
import { AdminProfileComponent } from './components/admin/admin-dashboard/admin-profile/admin-profile.component';
import { AdminStatsComponent } from './components/admin/admin-dashboard/admin-stats/admin-stats.component';
import { authAdminGuard } from './guard/auth-admin.guard';
import { AdminCoursesViewComponent } from './components/admin/admin-dashboard/admin-courses-view/admin-courses-view.component';
import { InstructorDashboardComponent } from './components/instructor/instructor-dashboard/instructor-dashboard.component';
import { InstructorProfileComponent } from './components/instructor/instructor-dashboard/instructor-profile/instructor-profile.component';
import { InstructorCheckStatsComponent } from './components/instructor/instructor-dashboard/instructor-check-stats/instructor-check-stats.component';
import { InstructorMyCoursesComponent } from './components/instructor/instructor-dashboard/instructor-my-courses/instructor-my-courses.component';
import { InstructorModifyCourseComponent } from './components/instructor/instructor-dashboard/instructor-modify-course/instructor-modify-course.component';
import { InstructorAddCourseComponent } from './components/instructor/instructor-dashboard/instructor-add-course/instructor-add-course.component';
import { InstructorAddLessonsComponent } from './components/instructor/instructor-dashboard/instructor-add-lessons/instructor-add-lessons.component';
import { authGuard } from './guard/auth.guard';
import { AdminRejectedCoursesViewComponent } from './components/admin/admin-dashboard/admin-rejected-courses-view/admin-rejected-courses-view.component';
import { AdminPendingCoursesViewComponent } from './components/admin/admin-dashboard/admin-pending-courses-view/admin-pending-courses-view.component';
import { UserCoursesViewComponent } from './components/user/user-dashboard/user-courses-view/user-courses-view.component';
import { authInstructorGuard } from './guard/auth-instructor.guard';
import { ResetPasswordComponent } from './components/auth/user/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/auth/user/forgot-password/forgot-password.component';
import { courseAuthGuard } from './guard/course-auth.guard';
import { AboutComponent } from './components/details/about/about.component';
import { ContactComponent } from './components/details/contact/contact.component';
import { InstructorAddUnitsComponent } from './components/instructor/instructor-dashboard/instructor-add-units/instructor-add-units.component';
import { InstructorAddBadgeComponent } from './components/instructor/instructor-dashboard/instructor-add-badge/instructor-add-badge.component';
import { CoursePaymentComponent } from './components/courses/course-payment/course-payment.component';
import { coursePurchaseAuthGuard } from './guard/course-purchase-auth.guard';
import { titleGuardGuard } from './guard/title-guard.guard'; // Import your guard here

export const routes: Routes = [
  // Home route
  {
    path: '',
    component: CourseHomeComponent,
    data: { title: 'Home' },
    canActivate: [titleGuardGuard]
  },
  {
    path: 'home',
    redirectTo: 'courses',
    pathMatch: 'full'
  },

  // Details page
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About Us' },
    canActivate: [titleGuardGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact Us' },
    canActivate: [titleGuardGuard]
  },

  // Courses
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CourseHomeComponent,
        data: { title: 'Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'home',
        component: CourseHomeComponent,
        data: { title: 'Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'search',
        component: CourseSearchComponent,
        data: { title: 'Course Search' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'course/info/:id',
        component: CourseInfoComponent,
        data: { title: 'Course Details' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'course/:id/lectures',
        component: CourseLecturesComponent,
        data: { title: 'Course Lectures' },
        canActivate: [authGuard, courseAuthGuard, titleGuardGuard]
      },
      {
        path: 'course/:courseCode/payment',
        component: CoursePaymentComponent,
        data: { title: 'Course Payment' },
        canActivate: [authGuard, coursePurchaseAuthGuard, titleGuardGuard]
      }
    ]
  },

  // Authentication pages
  // User authentication paths
  {
    path: 'auth/user/signin',
    component: SigninComponent,
    data: { title: 'User Sign In' },
    canActivate: [titleGuardGuard]
  },
  {
    path: 'auth/user/signup',
    component: SignupComponent,
    data: { title: 'User Sign Up' },
    canActivate: [titleGuardGuard]
  },
  {
    path: 'auth/user/forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' },
    canActivate: [titleGuardGuard]
  },
  {
    path: 'auth/user/reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Reset Password' },
    canActivate: [titleGuardGuard]
  },

  // Admin authentication paths
  {
    path: 'auth/admin/signin',
    component: AdminSigninComponent,
    data: { title: 'Admin Sign In' },
    canActivate: [titleGuardGuard]
  },

  // User pages
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, titleGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { title: 'User Profile' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses',
        component: UserCoursesViewComponent,
        data: { title: 'My Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: '**',
        redirectTo: 'profile'
      }
    ]
  },

  // Instructor pages
  {
    path: 'instructor/dashboard',
    component: InstructorDashboardComponent,
    canActivate: [authInstructorGuard, titleGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: InstructorProfileComponent,
        data: { title: 'Instructor Profile' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'stats',
        component: InstructorCheckStatsComponent,
        data: { title: 'Instructor Stats' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses',
        component: InstructorMyCoursesComponent,
        data: { title: 'My Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/modify',
        component: InstructorModifyCourseComponent,
        data: { title: 'Modify Course' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/add',
        component: InstructorAddCourseComponent,
        data: { title: 'Add New Course' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/units/add',
        component: InstructorAddUnitsComponent,
        data: { title: 'Add Course Units' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/lessons/add',
        component: InstructorAddLessonsComponent,
        data: { title: 'Add Course Lessons' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/badge/add',
        component: InstructorAddBadgeComponent,
        data: { title: 'Add Course Badge' },
        canActivate: [titleGuardGuard]
      }
    ]
  },

  // Admin pages
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authAdminGuard, titleGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
        data: { title: 'Admin Profile' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'stats',
        component: AdminStatsComponent,
        data: { title: 'Admin Stats' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses',
        component: AdminCoursesViewComponent,
        data: { title: 'All Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/approved',
        component: AdminCoursesViewComponent,
        data: { title: 'Approved Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/pending',
        component: AdminPendingCoursesViewComponent,
        data: { title: 'Pending Courses' },
        canActivate: [titleGuardGuard]
      },
      {
        path: 'courses/rejected',
        component: AdminRejectedCoursesViewComponent,
        data: { title: 'Rejected Courses' },
        canActivate: [titleGuardGuard]
      }
    ]
  },
  {
    path: 'admin/stats',
    component: AdminStatsComponent,
    data: { title: 'Admin Stats' },
    canActivate: [titleGuardGuard]
  },

  // Miscellaneous
  {
    path: 'routes',
    component: RoutesComponent,
    data: { title: 'Routes' },
    canActivate: [titleGuardGuard]
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: { title: 'Page Not Found' },
    canActivate: [titleGuardGuard]
  }
];
