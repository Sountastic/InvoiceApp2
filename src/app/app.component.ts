import { animate, state, style, transition, trigger } from '@angular/animations';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from './_services/export.service';

export interface PersonalDetails {
  id: string;
  name : String;
  surname:String;
  street:String;
  city: string;
  NIP: string;
  email:string;
  phoneNumber:string;
}

export interface Invoice {
  id: number;
  issuer: string;
  client: string;
  product: Array<Products>;
  issue_date: string;
  payment_date: string;
  tax: number;
  total: number;
}

export interface Products {
  product: string;
  qty: number;
  price: number;
  total: number;
}

const EXAMPLE_PRODUCTS_DATA: Products[] = [
  {product: 'Item1', qty: 3, price: 1.30, total: 3.90},
  {product: 'Item2', qty: 1, price: 110.00, total: 110.00},
  {product: 'Item3', qty: 2, price: 25.00, total: 50.00},
];

const EXAMPLE_SELLER_DATA: PersonalDetails[] = [
  {  id: '1', name : 'Tom', surname: 'Grant', street: 'Lava St', city: 'Sydney', NIP: '553421687', email: 'tom.h@example.com', phoneNumber: '7365765' },
  {  id: '2', name : 'Tina', surname: 'Wallace', street: 'Mountain St', city: 'Zermatt', NIP: '7466532', email: 'wally@example.com', phoneNumber: '58534595' },
  {  id: '3', name : 'Alberto', surname: 'Liganzo', street: 'Queen Elisabeth St', city: 'Livigno', NIP: '56789425', email: 'alboertol@example.com', phoneNumber: '29603455' },
  {  id: '4', name : 'Joseph', surname: 'Siciliano', street: 'Potterierto St', city: 'Rome', NIP: '24425215', email: 'sjoseh@example.com', phoneNumber: '7712395685' },
  {  id: '5', name : 'Zoe', surname: 'Jackson', street: 'Diamond St', city: 'Montego Bay', NIP: '22735329', email: 'zoe.jackson@example.com', phoneNumber: '56458267' },
  {  id: '6', name : 'George', surname: 'Glume', street: 'River St', city: 'Gdansk', NIP: '667359763', email: 'gglu@example.com', phoneNumber: '807693847' }
];

const EXAMPLE_CLIENT_DATA: PersonalDetails[] = [
  {  id: '1', name : 'Aiden', surname: 'Lambert', street: 'W Gray St', city: 'Queensland', NIP: '84365836', email: 'aiden.lambert@example.com', phoneNumber: '744558353' },
  {  id: '2', name : 'Tina', surname: 'Turner', street: 'Port St', city: 'Verona', NIP: '7466532', email: 'tinat@example.com', phoneNumber: '458284795' },
  {  id: '3', name : 'Jack', surname: 'Kowalski', street: 'Oak St', city: 'Michigan', NIP: '56789425', email: 'jack45@example.com', phoneNumber: '296002145' },
  {  id: '4', name : 'Marilyn', surname: 'Bloom', street: 'Lockhart St', city: 'Sydney', NIP: '24425215', email: 'm.bloom@example.com', phoneNumber: '775739565' },
  {  id: '5', name : 'Regina', surname: 'Braun', street: 'VernerStrasse', city: 'Berlin', NIP: '22735329', email: 'regibraun@example.com', phoneNumber: '335378267' },
  {  id: '6', name : 'Norbert', surname: 'Glume', street: 'Apple St', city: 'Warsaw', NIP: '667359763', email: 'norbglu@example.com', phoneNumber: '377693847' },
  {  id: '7', name : 'Jack', surname: 'Kowalski', street: 'Oak St', city: 'Michigan', NIP: '56789425', email: 'jack45@example.com', phoneNumber: '296002145' },
  {  id: '8', name : 'Marilyn', surname: 'Bloom', street: 'Lockhart St', city: 'Sydney', NIP: '24425215', email: 'm.bloom@example.com', phoneNumber: '775739565' },
  {  id: '9', name : 'Regina', surname: 'Braun', street: 'VernerStrasse', city: 'Berlin', NIP: '22735329', email: 'regibraun@example.com', phoneNumber: '335378267' },
 ];

const EXAMPLE_INVOICE_DATA: Invoice[] = [
  { id: 1, issuer: 'Tom Grant', client: 'Aiden Lambert', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 2, issuer: 'Tom Grant', client: 'Jack Kowalski', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 3, issuer: 'Tom Grant', client: 'Marilyn Bloom', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 4, issuer: 'Tom Grant', client: 'Aiden Lambert', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 5, issuer: 'Tom Grant', client: 'Aiden Lambert', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 6, issuer: 'Tom Grant', client: 'Jack Kowalski', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 7, issuer: 'Tom Grant', client: 'Marilyn Bloom', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
  { id: 8, issuer: 'Tom Grant', client: 'Aiden Lambert', product: [ {product: 'Item1', qty: 3, price: 1.30, total: 3.90},{product: 'Item3', qty: 2, price: 25.00, total: 50.00},], issue_date: '06/03/2020',   payment_date: '07/03/2020', tax: 23, total: 66.30 },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  dataSource: MatTableDataSource<Invoice>;
  displayedColumns: string[] = ['product', 'qty', 'price', 'total'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Products[] = EXAMPLE_PRODUCTS_DATA;
  dataSeller: PersonalDetails[] = EXAMPLE_SELLER_DATA;
  dataClient: PersonalDetails[] = EXAMPLE_CLIENT_DATA;
  invoiceData: Invoice[] = EXAMPLE_INVOICE_DATA;
  columnsToDisplayClients = ['id','name', 'surname', 'NIP', 'email'];
  columnsToDisplaySellers = ['Id','Name', 'Surname', 'NIP','email'];
  columnToDisplayInvoice = ['id', 'issuer', 'client', 'issue_date', 'payment_date', 'tax', 'total'];
  dataInvoiceClient: any = [];
  constructor(private exportService: ExportService) {
    this.dataSource = new MatTableDataSource(EXAMPLE_INVOICE_DATA);
  }
  ngOnInit(): void {
    //   for (let i = 0; i <= 25; i++) {
    //     this.dataInvoiceClient.push({id: `0${i}`, name: `name${i}`, surname: `surname${i}`,
    //     email: `abc${i}@gmail.com`, street: `000${i} street city, ST`, city: `city${i}`, 
    //     NIP: `0000${i}`, phoneNumber: `000000000${i}`}); 
    // }
    this.dataClient.forEach(element => {
      this.dataInvoiceClient.push({id: element.id, name: element.name, surname: element.surname,
        email: element.email, street: element.street, city: element.city, 
        NIP: element.NIP, phoneNumber: element.phoneNumber}); 
    });
  }
  // title = 'inv-app';


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  export() {
    this.exportService.exportExcel(this.dataInvoiceClient, 'customers');
  }

}
