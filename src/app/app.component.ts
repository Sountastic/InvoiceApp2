import { Component } from '@angular/core';


export interface Products {
  product: string;
  qty: number;
  price: number;
  total: number;
}

const ELEMENT_DATA: Products[] = [
  {product: 'Pizza', qty: 3, price: 1.0079, total: 3.0095},
  {product: 'Pizza', qty: 3, price: 1.0079, total: 3.333},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  displayedColumns: string[] = ['product', 'qty', 'price', 'total'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Products[] = ELEMENT_DATA;

  title = 'inv-app';


}
