import { Component } from '@angular/core';
import { StepCounterComponent } from './step-counter/step-counter.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { StepInfoComponent } from './step-info/step-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [StepCounterComponent, ProgressBarComponent, StepInfoComponent]
})
export class AppComponent {
  title = 'myapp'; // Agregar esta línea
}
