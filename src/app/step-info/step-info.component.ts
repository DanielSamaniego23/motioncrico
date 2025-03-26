import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-info',
  standalone: true,
  templateUrl: './step-info.component.html',
  styleUrls: ['./step-info.component.css']
})
export class StepInfoComponent {
  @Input() label = '';
  @Input() value = '';
}
