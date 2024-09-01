import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private container!: HTMLDivElement;

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer(): void {
    this.container = document.createElement('div');
    this.container.classList.add('toast-container');
    document.body.appendChild(this.container);
  }

  showToast(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info', delay: number = 5000): void {
    // Define color mapping for different types
    const colorMap: { [key: string]: string } = {
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };

    const textColorMap: { [key: string]: string } = {
      success: 'white',
      danger: 'white',
      warning: 'black',
      info: 'white'
    };

    // Create a Toast element
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    toastElement.innerHTML = `
      <div class="toast-header" style="background-color: ${colorMap[type]}; color: ${textColorMap[type]};">
        <strong class="me-auto">Notification</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    this.container.appendChild(toastElement);

    // Initialize and show Toast
    const toastBootstrap = new Toast(toastElement, { delay });
    toastBootstrap.show();
  }
}
