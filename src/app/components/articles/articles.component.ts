import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  readonly articles = [
    '¿Qué tratamiento necesita el agua de mi empresa?',
    '¿Por qué es importante analizar el agua?',
    '¿Cómo funciona un ablandador de agua?',
    '¿Cómo cuidar el agua de una caldera?',
    '¿Qué mantenimiento necesita un sistema de tratamiento?',
    '¿Cómo mejorar el uso del agua en la industria?',
    '¿Cuándo conviene revisar una instalación?',
    '¿Cómo elegir una solución para mi empresa?'
  ];
}
