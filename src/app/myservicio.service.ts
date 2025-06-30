import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyservicioService {

  constructor() { }

  login(email: string, password: string): boolean {
    return email === 'admin@lab.cl' && password === '1234';
  }
}
