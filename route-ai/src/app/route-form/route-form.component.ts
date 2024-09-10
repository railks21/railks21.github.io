import { Component } from '@angular/core';
import { AiService } from '../ai.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent {
  time: number = 0;
  distance: number = 0;
  prediction: number = 0;

  constructor(private aiService: AiService) {}

  // Enviar dados para previsão
  onSubmit() {
    const input = [this.time, this.distance];
    this.prediction = this.aiService.predict(input);
  }
}
