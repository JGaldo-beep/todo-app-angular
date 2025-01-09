import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Step } from '../../models/step.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  steps = signal<Step[]>([
    {
      id: Date.now(),
      title: "Create proyect",
      completed: false
    },
    {
      id: Date.now(),
      title: "Create components",
      completed: false
    }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newStep = input.value;
    this.addStep(newStep);
  };

  addStep(title: string) {
    const newStep =  {
      id: Date.now(),
      title,
      completed: false
    };
    this.steps.update((steps) => [...steps, newStep]);
  }

  deleteStep(index: Number) {
    this.steps.update((steps) => steps.filter((step, position) => position !== index));
  };

  // checkedHandler(index: number) {
  //   this.steps.update((steps) => {
  //     steps[index].completed = !steps[index].completed;
  //     return steps;
  //   })
  // };

   /* Ummutable method */
  updateStep(index: number) {
    this.steps.update((steps) => {
      return steps.map((steps, position) => {
        if (position === index) {
          return {
            ...steps, 
            completed: !steps.completed
          }
        }
        return steps;
      });
    });
  }
}
