import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoapp';
  name = 'Antonio';
  steps = [
    'Install Node.js',
    'Install Angular CLI',
    'Create new Angular project',
    'Serve the project',
    'Open the project in the browser'
  ];
}
