import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  name = signal('Antonio');
  age = 24;
  steps = [
    'Install Node.js',
    'Install Angular CLI',
    'Create new Angular project',
    'Serve the project',
    'Open the project in the browser'
  ];
  disable = true;
  img = 'https://th.bing.com/th/id/OIP.07FYICs3oQnX6ziP3-PnnQHaEK?rs=1&pid=ImgDetMain';
  person = {
    name: "Wallace",
    age: 15,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  };

  handleClick() {
    alert("Hello world!");
  };

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  };

  handleKeyup(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  handleKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
