import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  name = 'Antonio';
  steps = [
    'Install Node.js',
    'Install Angular CLI',
    'Create new Angular project',
    'Serve the project',
    'Open the project in the browser'
  ];
}
