import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';


export enum AlertTypes{
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModelService {

  constructor(private _modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes){
    const modalRef: BsModalRef = this._modalService.show(AlertModalComponent);
    modalRef.content.type = type;
    modalRef.content.message = message;
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS);
  }

  showAlertInfo(message: string){
    this.showAlert(message, AlertTypes.INFO);
  }

  showAlertWarning(message: string){
    this.showAlert(message, AlertTypes.WARNING);
  }

}
