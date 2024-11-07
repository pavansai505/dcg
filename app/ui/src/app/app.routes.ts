import { Routes } from '@angular/router';
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
import { ContestsComponent } from './components/contests/contests/contests.component';
import { ContestsInfoComponent } from './components/contests/contests-info/contests-info.component';
import { ContestsLeaderboardComponent } from './components/contests/contests-leaderboard/contests-leaderboard.component';
import { contestGuardGuard } from './guard/contest-guard.guard';
import { InstructorInfoComponent } from './components/instructor/instructor-info/instructor-info.component';
import { CourseQuizComponent } from './components/courses/course-quiz/course-quiz.component';
import { UserBadgesComponent } from './components/user/user-dashboard/user-badges/user-badges.component';
import { courseQuizGuard } from './guard/course-quiz.guard';
import { AdminCouponComponent } from './components/admin/admin-dashboard/admin-coupon/admin-coupon.component';
import { AdminCouponListComponent } from './components/admin/admin-dashboard/admin-coupon-list/admin-coupon-list.component';
import { AdminUsersComponent } from './components/admin/admin-dashboard/admin-users/admin-users.component';
import { userNotLoggedInGuard } from './guard/user-not-logged-in.guard';
import { contestQuizGuardGuard } from './guard/contest-quiz-guard.guard';
import { ContestsQuizComponent } from './components/contests/contests-quiz/contests-quiz.component';
import { AdminContestComponent } from './components/admin/admin-dashboard/admin-contest/admin-contest.component';
import { AdminContestStatusComponent } from './components/admin/admin-dashboard/admin-contest-status/admin-contest-status.component';
import { InstructorModifyUnitsComponent } from './components/instructor/instructor-dashboard/instructor-modify-units/instructor-modify-units.component';
import { InstructorModifyLecturesComponent } from './components/instructor/instructor-dashboard/instructor-modify-lectures/instructor-modify-lectures.component';
import { InstructorDeleteUnitsComponent } from './components/instructor/instructor-dashboard/instructor-delete-units/instructor-delete-units.component';
import { AdminAddUsersComponent } from './components/admin/admin-dashboard/admin-add-users/admin-add-users.component';
import { InstructorAddQuizLecturesComponent } from './components/instructor/instructor-dashboard/instructor-add-quiz-lectures/instructor-add-quiz-lectures.component';
import { InstructorDeleteLecturesComponent } from './components/instructor/instructor-dashboard/instructor-delete-lectures/instructor-delete-lectures.component';

export const routes: Routes = [
  // Home route
  {
    path: '',
    component: CourseHomeComponent,
    data: { title: 'Home' },
    canActivate: [titleGuardGuard],
  },
  {
    path: 'home',
    redirectTo: 'courses',
    pathMatch: 'full',
  },

  // Details page
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About Us' },
    canActivate: [titleGuardGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact Us' },
    canActivate: [titleGuardGuard],
  },

  // Courses
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CourseHomeComponent,
        data: { title: 'Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'home',
        component: CourseHomeComponent,
        data: { title: 'Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'search',
        component: CourseSearchComponent,
        data: { title: 'Course Search' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'course/info/:id',
        component: CourseInfoComponent,
        data: { title: 'Course Details' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'course/:id/lectures',
        component: CourseLecturesComponent,
        data: { title: 'Course Lectures' },
        canActivate: [authGuard, courseAuthGuard, titleGuardGuard],
      },
      {
        path: 'course/:courseCode/payment',
        component: CoursePaymentComponent,
        data: { title: 'Course Payment' },
        canActivate: [authGuard, coursePurchaseAuthGuard, titleGuardGuard],
      },
      {
        path: ':id/quiz',
        component: CourseQuizComponent,
        data: { title: 'Quiz' },
        canActivate: [titleGuardGuard, courseQuizGuard],
      },
    ],
  },

  // Authentication pages
  // User authentication paths
  {
    path: 'auth/user/signin',
    component: SigninComponent,
    data: { title: 'User Sign In' },
    canActivate: [titleGuardGuard, userNotLoggedInGuard],
  },
  {
    path: 'auth/user/signup',
    component: SignupComponent,
    data: { title: 'User Sign Up' },
    canActivate: [titleGuardGuard, userNotLoggedInGuard],
  },
  {
    path: 'auth/user/forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' },
    canActivate: [titleGuardGuard],
  },
  {
    path: 'auth/user/reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Reset Password' },
    canActivate: [titleGuardGuard],
  },

  // Admin authentication paths
  // {
  //   path: 'auth/admin/signin',
  //   component: AdminSigninComponent,
  //   data: { title: 'Admin Sign In' },
  //   canActivate: [titleGuardGuard, userNotLoggedInGuard],
  // },

  // User pages
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, titleGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { title: 'User Profile' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'courses',
        component: UserCoursesViewComponent,
        data: { title: 'My Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'badges',
        component: UserBadgesComponent,
        data: { title: 'My Badges' },
        canActivate: [titleGuardGuard],
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },

  // Instructor pages
  {
    path: 'instructor/:id/info',
    component: InstructorInfoComponent,
    data: { title: 'Instructor info' },
    canActivate: [titleGuardGuard],
  },
  {
    path: 'instructor/dashboard',
    component: InstructorDashboardComponent,
    canActivate: [authInstructorGuard, titleGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { title: 'Instructor Profile' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'stats',
        component: InstructorCheckStatsComponent,
        data: { title: 'Courses stats' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: InstructorMyCoursesComponent,
            data: { title: 'My Courses' },
            canActivate: [titleGuardGuard],
          },
          {
            path: 'modify',
            component: InstructorModifyCourseComponent,
            data: { title: 'Modify Course' },
            canActivate: [titleGuardGuard],
          },
          {
            path: 'add',
            component: InstructorAddCourseComponent,
            data: { title: 'Add New Course' },
            canActivate: [titleGuardGuard],
          },
          {
            path: 'units',
            children: [
              {
                path: 'add',
                component: InstructorAddUnitsComponent,
                data: { title: 'Add Course Units' },
                canActivate: [titleGuardGuard],
              },
              {
                path: 'modify',
                component: InstructorModifyUnitsComponent,
                data: { title: 'Modify Course Units' },
                canActivate: [titleGuardGuard],
              },
              {
                path: 'delete',
                component: InstructorDeleteUnitsComponent,
                data: { title: 'Delete Course Units' },
                canActivate: [titleGuardGuard],
              },
            ],
          },
          {
            path: 'lessons',
            children: [
              {
                path: 'add',
                component: InstructorAddLessonsComponent,
                data: { title: 'Add Course Lessons' },
                canActivate: [titleGuardGuard],
              },
              {
                path: 'modify',
                component: InstructorModifyLecturesComponent,
                data: { title: 'Modify Course Lessons' },
                canActivate: [titleGuardGuard],
              },
              {
                path: 'delete',
                component: InstructorDeleteLecturesComponent,
                data: { title: 'Delete Course Lessons' },
                canActivate: [titleGuardGuard],
              },
              {
                path: 'quiz',
                component: InstructorAddQuizLecturesComponent,
                data: { title: 'Add quiz ' },
                canActivate: [titleGuardGuard],
              },
            ],
          },
          {
            path: 'badge',
            children: [
              {
                path: 'add',
                component: InstructorAddBadgeComponent,
                data: { title: 'Add Course Badge' },
                canActivate: [titleGuardGuard],
              },
            ],
          },
        ],
      },
    ],
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
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { title: 'Admin Profile' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'stats',
        component: AdminStatsComponent,
        data: { title: 'Admin Stats' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'courses',
        component: AdminCoursesViewComponent,
        data: { title: 'All Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'courses/approved',
        component: AdminCoursesViewComponent,
        data: { title: 'Approved Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'courses/pending',
        component: AdminPendingCoursesViewComponent,
        data: { title: 'Pending Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'courses/rejected',
        component: AdminRejectedCoursesViewComponent,
        data: { title: 'Rejected Courses' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'coupon',
        component: AdminCouponComponent,
        data: { title: 'Coupon' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'coupon/list',
        component: AdminCouponListComponent,
        data: { title: 'Coupon list' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'users',
        component: AdminUsersComponent,
        data: { title: 'Users' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'users/add',
        component: AdminAddUsersComponent,
        data: { title: 'Add users' },
        canActivate: [titleGuardGuard],
      },
      {
        path: 'contest',
        children: [
          {
            path: 'add',
            component: AdminContestComponent,
            data: { title: 'Create contest' },
            canActivate: [titleGuardGuard],
          },
          {
            path: 'modify',
            component: AdminContestStatusComponent,
            data: { title: 'Users' },
            canActivate: [titleGuardGuard],
          }
        ],
        canActivate: [titleGuardGuard], // Apply the guard to all children if applicable
      }
      
    ],
  },

  // Contests
  {
    path: 'contests',
    children: [
      {
        path: '',
        component: ContestsComponent,
        data: { title: 'Contests' },
        canActivate: [titleGuardGuard],
      },
      {
        path: ':id/info',
        component: ContestsInfoComponent,
        data: { title: 'Contest info' },
        canActivate: [titleGuardGuard,contestGuardGuard],
      },
      {
        path: ':id/quiz',
        component: ContestsQuizComponent,
        data: { title: 'Quiz' },
        canActivate: [titleGuardGuard,contestQuizGuardGuard],
      },
      {
        path: ':id/leaderboard',
        component: ContestsLeaderboardComponent,
        data: { title: 'Leaderboard' },
        canActivate: [titleGuardGuard],
      },
    ],
  },
  // Miscellaneous
  {
    path: 'routes',
    component: RoutesComponent,
    data: { title: 'Routes' },
    canActivate: [titleGuardGuard],
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: { title: 'Page Not Found' },
    canActivate: [titleGuardGuard],
  },
];
