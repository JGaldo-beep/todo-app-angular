import { Component, computed, signal, effect, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Step } from '../../models/step.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  steps = signal<Step[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  stepByFilter = computed(() => {
    const filter = this.filter();
    const steps = this.steps();
    if (filter === 'pending') {
      return steps.filter(step => !step.completed);
    }
    if (filter === 'completed') {
      return steps.filter(step => step.completed);
    }
    return steps;
  })

  newStepCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ],
  });

  injector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem('steps');
    if (storage) {
      const steps = JSON.parse(storage);
      this.steps.set(steps);
    };
    this.trackSteps();
  };

  trackSteps() {
    effect(() => {
      const steps = this.steps();
      console.log(steps);
      localStorage.setItem('steps', JSON.stringify(steps));
    }, { injector: this.injector });
  };

  // if (this.newStepCtrl.valid && !this.newStepCtrl.value.startsWith(' ')) { 
  changeHandler() {
    if (this.newStepCtrl.valid) {
      const value = this.newStepCtrl.value.trim();
      if (value != '') {
        this.addStep(value);
        this.newStepCtrl.setValue("");
      }
    }
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

  deleteStepsCompleted() {
    this.steps.update((steps) => steps.filter((step) => !step.completed));
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

  updateStepEditingMode(index: number) {
    this.steps.update(prevState => {
      return prevState.map((step, position) => {
        if (position == index) {
          return {
            ...step,
            editing: true
          }
        }
        return {
          ...step,
          editing: false
        };
      })
    })
  }

  updateStepText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.steps.update(prevState => {
      return prevState.map((step, position) => {
        if (position == index) {
          return {
            ...step,
            title: newValue,
            editing: false
          }
        }
        return step;
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
