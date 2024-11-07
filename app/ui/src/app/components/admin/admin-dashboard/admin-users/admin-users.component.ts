import { Component } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';
import { User } from '../../../../models/user/user';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ToastService } from '../../../../services/toast/toast.service';
import { ExcelService } from '../../../../services/utilities/excel.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent {
  users!: User[];

  constructor(
    private userService: UserDetailsService,
    private toast: ToastService,
    private excel: ExcelService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  exportToExcel() {
    const processedUserData = this.users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdDate: this.formatDateToDDMMYYYY(user.createdDate),
      lastModifiedDate: this.formatDateToDDMMYYYY(user.lastModifiedDate),
      disabled: user.disabled,
      roles: user.roles.map((role) => role.name).join(', '), // Join roles into a single string
      registeredCourses: user.courses.length, // Get the length of the courses array
    }));

    this.excel.downloadExcel(processedUserData, 'users');
  }
  formatDateToDDMMYYYY = (dateString: string |null) => {
    if(!dateString) return 
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with '0' if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  promoteToInstructor(user: User) {
    this.userService.promoteUser(user.id, 'ROLE_INSTRUCTOR').subscribe({
      next: () => {
        user.roles.push({ id: 2, name: 'ROLE_INSTRUCTOR' });
      },
      error: (err) =>
        console.error('Error promoting user to instructor: ', err),
    });
  }

  promoteToAdmin(user: User) {
    this.userService.promoteUser(user.id, 'ROLE_ADMIN').subscribe({
      next: () => {
        user.roles.push({ id: 1, name: 'ROLE_ADMIN' });
      },
      error: (err) => console.error('Error promoting user to admin: ', err),
    });
  }

  removeInstructor(user: User) {
    this.userService.removeRole(user.id, 'ROLE_INSTRUCTOR').subscribe({
      next: () => {
        user.roles = user.roles.filter(
          (role) => role.name !== 'ROLE_INSTRUCTOR'
        );
      },
      error: (err) => console.error('Error removing instructor role: ', err),
    });
  }

  removeAdmin(user: User) {
    this.userService.removeRole(user.id, 'ROLE_ADMIN').subscribe({
      next: () => {
        user.roles = user.roles.filter((role) => role.name !== 'ROLE_ADMIN');
      },
      error: (err) => console.error('Error removing admin role: ', err),
    });
  }

  // Method to check if the user has a specific role
  hasRole(user: User, roleName: string): boolean {
    return user.roles.some((role) => role.name === roleName);
  }
  toggleUserStatus(id: number): void {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      // Toggle the disabled field
      user.disabled = !user.disabled;

      // Update the server with the new disabled state
      this.userService.toggleUserStatus(id).subscribe({
        next: (response) => {
          console.log('Contest status updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating contest status:', error);
          user.disabled = !user.disabled; // Revert the change if needed
          this.toast.showToast('Error');
        },
      });
    } else {
      console.log(`Contest with id ${id} not found.`);
    }
  }
}
