import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  readonly articles: { title: string; paragraphs: string[] }[] = [
    {
      "title": "¿Qué bomba de agua necesito para un pozo?",
      "paragraphs": [
        "La elección de la bomba que se necesita para un pozo se debe basar en los siguientes puntos fundamentales A) profundidad del pozo, diferencia de altura y distancia con el lugar de destino del agua.",
        "B) Caudal del pozo C) Destino del agua a utilizar D) Lógica de diseño de la instalación E) Calidad de agua",
        "Con estos datos se podrá determinar la presión de trabajo y el caudal de la bomba del pozo a elegir. Un dato no menor es que de acuerdo a la calidad de agua del pozo se recomendará la utilización de un sistema de mejora de su calidad y esto afectará la presión y el caudal en el punto de uso, cualquier sistema de purificación de agua como los ablandadores y dosificadores de cloro tienen requerimientos específicos en cuanto a presión y caudal."
      ]
    },
    {
      "title": "Cómo elegir una bomba de agua para una chacra",
      "paragraphs": [
        "La primera cosa que debemos tener en cuenta es que la bomba del pozo es el corazón del establecimiento permite el suministro para las personas que lo habitan, animales de cría, y todo cuanto se haya plantado en el mismo. Debe cumplir con las características de funcionamiento que cumplan requerimientos en el agua de suministro al establecimiento: presión y caudal. Se deberá contar con tanques de almacenamiento de acuerdo a las necesidades de consumo y preveer la instalación de un sistema de potabilización de agua como ablandadores y dosificación de cloro."
      ]
    },
    {
      "title": "¿Qué es un ablandador de agua y cuándo lo necesito?",
      "paragraphs": [
        "Un ablandador de agua es un equipo de filtración basado en intercambio iónico que retiene calcio y magnesio, transformando el agua dura (con calcio y magnesio) en blanda (sin calcio y magnesio). Su uso está recomendado siempre que se disponga de agua con alta salinidad y con un contenido de dureza (calcio y magnesio) alto, se recomienda para aguas de pozo. La presencia de dureza provoca la formación de depósitos de sarro en todas la instalaciones que funcionen con agua, sobre todo aquellas que intercambian calor, Calentadores o enfriadores de agua, lavarropas, lavavajillas, piscinas, grifería y paredes y pisos de baños y cocinas. Elevada dureza en el agua provoca resequedad en la piel y el cabello, daña la ropa, calefactores , calefones y todos los electrodomésticos que funcionen con agua."
      ]
    },
    {
      "title": "Agua de pozo con sarro: causas y soluciones",
      "paragraphs": [
        "Las aguas de lluvia al filtrarse en el terreno se van cargando de minerales hasta llegar a las napas y acuíferos, es normal que aumente el contenido de sales minerales a medida que realiza su recorrido. Entre los minerales que va adquiriendo se encuentran el calcio y magnesio que integran lo que llamamos “dureza” , que ocasionan daños materiales en instalaciones sanitarias, electrodomésticos, provoca mayor gasto de energía pues disminuye el rendimiento térmico en calderas y calefones, puede ocasionar sequedad en piel y cabello, disminuye el rendimiento en jabones y shampúes. La dureza se puede eliminar por medio de ablandadores de agua o con equipos de ósmosis inversa.",
        "Los ablandadores son equipos de filtración por intercambio iónico que retienen el calcio y magnesio, cambiándolo por sodio o potasio. Por esta razón consumen cloruro de sodio como regenerante siendo equipos de costo medio y mantenimiento bajo. Los equipos de ósmosis retiene sales minerales mediante un membrana semipermeable que se va saturando a lo largo del tiempo y tendrá que ser cambiada en su totalidad, son equipos de bajo rendimiento con un desperdicio de agua que puede llegar al 60% y con un cotos de medio a alto."
      ]
    },
    {
      "title": "Cómo mejorar la calidad del agua de pozo",
      "paragraphs": []
    },
    {
      "title": "Qué tener en cuenta al comprar una chacra con agua de pozo",
      "paragraphs": []
    }
  ];
}
