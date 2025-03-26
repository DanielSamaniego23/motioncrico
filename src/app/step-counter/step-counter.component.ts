import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-step-counter',
  standalone: true,
  templateUrl: './step-counter.component.html',
  styleUrls: ['./step-counter.component.css']
})
export class StepCounterComponent {
  steps = signal(0);
  magnitude = signal(0);
  isAvailable = signal(false);

  private threshold = 12; // Ajusta este umbral si es necesario
  private cooldownPeriod = 300; // Tiempo de espera entre pasos (en ms)
  private lastStepTime = 0;
  private isPeaking = false;

  constructor() {
    this.resetCounter(); // Inicializar los valores en 0

    // Asegurar que la magnitud comienza en 0
    this.magnitude.set(0);

    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      this.isAvailable.set(true);
      window.addEventListener('devicemotion', this.handleMotion.bind(this));
    }
  }

  handleMotion(event: DeviceMotionEvent) {
    if (!event.accelerationIncludingGravity) return;

    const x = event.accelerationIncludingGravity.x ?? 0;
    const y = event.accelerationIncludingGravity.y ?? 0;
    const z = event.accelerationIncludingGravity.z ?? 0;

    // Calcular la magnitud de la aceleración
    const mag = Math.sqrt(x * x + y * y + z * z);

    // Ignorar si la magnitud es demasiado baja (solo detectar movimientos significativos)
    if (mag < 0.1) return;  // Umbral para considerar solo movimientos reales

    // Asegurarse de que la magnitud siempre sea positiva
    const positiveMag = Math.abs(mag);
    this.magnitude.set(Number(positiveMag.toFixed(2)));

    const now = Date.now();
    if (positiveMag > this.threshold && !this.isPeaking && now - this.lastStepTime > this.cooldownPeriod) {
      this.isPeaking = true;
      this.steps.set(this.steps() + 1);
      this.lastStepTime = now;
    } else if (positiveMag < this.threshold && this.isPeaking) {
      this.isPeaking = false;
    }
  }

  resetCounter() {
    this.steps.set(0);
    this.magnitude.set(0);  // Inicializar magnitud en 0
  }
}
