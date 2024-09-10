import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private model: tf.Sequential;

  constructor() {
    this.model = this.createModel();
  }

  // Função para criar o modelo
  createModel(): tf.Sequential {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [2], units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['accuracy']
    });

    return model;
  }

  // Treinar o modelo
  async trainModel(inputs: number[][], labels: number[]) {
    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    return await this.model.fit(inputTensor, labelTensor, {
      epochs: 10,
      shuffle: true
    });
  }

  // Fazer previsões com o modelo
  predict(input: number[]): number {
    const inputTensor = tf.tensor2d([input], [1, input.length]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    return prediction.dataSync()[0];  // Obtenha o valor de previsão
  }
}
