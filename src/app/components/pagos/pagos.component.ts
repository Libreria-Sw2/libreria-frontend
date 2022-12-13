import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { PagosService } from 'src/app/services/pagos.service';
declare var window: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  user_name: string | null = ''
  qr: string | null = ''
  fotografia: string = 'data:image/jpeg;base64,'
  esCambioSubcripcion = true;
  formModal: any;  
  pago = {
    "gloss": "Pago de suscripcion",
    "payOrderNumber": "184",
    "totalAmmount": "5",
    "payChanelCode": "bnb_qr",
    "extraData": {  }
  }
  subcripcion = {
    "user_name":'',
    "suscription_code": ''
  }
  transaccion = {
    "qrId": "63513",
    "payChanelCode": "bnb _qr",
  }

  constructor(
    private router: Router,
    private localService: LocalService,
    private pagosService: PagosService,
  ) {}

  cambiarMonto(monto:string, code: string): void {
    this.pago.totalAmmount = monto;
    this.subcripcion.suscription_code = code;
    this.esCambioSubcripcion = true;
  }

  generarQR(): void {
    this.transaccion.payChanelCode = this.pago.payChanelCode;
    this.subcripcion.user_name = this.user_name!;
    this.pago.extraData = this.subcripcion;

    this.pagosService.generarQR(this.pago).subscribe(
      (result) => {
        if ("body" in result) {
          if ("data" in result.body) {
            this.qr = 'data:image/jpeg;base64,' + result.body.data.qr;
            this.transaccion.qrId = result.body.data.id;
            this.esCambioSubcripcion = false;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  verificarPago(): void {
    this.pagosService.confirmarTransaccion(this.transaccion).subscribe(
      (result) => {
        if ("body" in result) {
          let message: string = result.body.data.message;
          if (message.includes("Suscription confirm successfully")){
            this.formModal.show();
          }
        }
      }
    )
  }

  volverLogin(): void {
    this.formModal.hide();
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    this.user_name = this.localService.getData('username');
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    )
  }
}
