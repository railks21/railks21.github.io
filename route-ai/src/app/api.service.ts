import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  trainModel(inputs: number[][], labels: number[]) {
    return this.http.post('http://localhost:3000/train', { inputs, labels });
  }

  predict(input: number[]) {
    return this.http.post<{ prediction: number }>('http://localhost:3000/predict', { input });
  }
}
