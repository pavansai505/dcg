import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointsList',
  standalone: true
})
export class PointsListPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) {
      return ''; // Return an empty string if value is undefined, null, or an empty string
    }

    // Split the string by full stops (periods) and remove any empty strings
    const points = value.split('.').filter(point => point.trim() !== '');

    // Create a list of points with additional styling
    const listItems = points.map((point, index) => `
      <li class="list-group-item d-flex align-items-start">
        <i class="bi bi-check-circle me-2"></i>
        ${index + 1}. ${point.trim()}
      </li>
    `).join('');

    return `
      <div class="card mb-3">
        <div class="card-body">
          <ul class="list-group list-group-flush">
            ${listItems}
          </ul>
        </div>
      </div>
    `;
  }
}
