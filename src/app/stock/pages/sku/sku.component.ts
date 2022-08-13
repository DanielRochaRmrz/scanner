import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss'],
})
export class SkuComponent implements OnInit {
  public namePage: string = 'Nuevo SKU';
  public number: number = 1;
  movies: any[] = [];

  skusForm: FormGroup = this.fb.group({
    sku: ['', Validators.required],
    total: [0, [Validators.required, Validators.min(1)]],
    quantity: this.fb.array([], Validators.required),
  });

  newQuantity: FormControl = this.fb.control('');

  get quantityArr() {
    return this.skusForm.get('quantity') as FormArray;
  }

  get quantityEndArr() {
    const quantityEndArr = this.skusForm.get('quantity').value as FormArray;
    const endElement = quantityEndArr[quantityEndArr.length - 1];
    return endElement;
  }

  get quantityLength() {
    const quantityEndArr = this.skusForm.get('quantity').value as FormArray;
    return quantityEndArr.length;
  }

  get totalQuantity() {
    const quantity = this.skusForm.get('quantity').value;
    const totalQuantity = quantity.reduce(
      (acc: string, item: string) => Number(acc) + Number(item),
      0
    );
    return totalQuantity;
  }

  get skusArr() {
    return JSON.parse(localStorage.getItem('skaus'));
  }

  constructor(private fb: FormBuilder, private alertCtrl: AlertController) {}

  ngOnInit() {}

  addQuantity() {
    if (this.newQuantity.invalid) {
      return;
    }
    this.quantityArr.push(
      this.fb.control(this.newQuantity.value, Validators.required)
    );
    this.skusForm.get('total').setValue(this.totalQuantity);
    this.newQuantity.reset();
  }

  addSku() {
    if (this.skusForm.invalid) {
      this.skusForm.markAllAsTouched();
      return;
    }

    const arrSkus: any[] = [];
    const skusArr = this.skusForm.value;

    const getSkusArr = this.skusArr;

    if (getSkusArr) {
      getSkusArr.push(skusArr);
      localStorage.setItem('skaus', JSON.stringify(getSkusArr));
    } else {
      arrSkus.push(skusArr);
      localStorage.setItem('skaus', JSON.stringify(arrSkus));
    }
  }

  deleteQuantity(i: number) {
    this.quantityArr.removeAt(i);
    this.skusForm.get('total').setValue(this.totalQuantity);
  }

  async newSkau() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo SKU',
      message: 'Estas seguro de generar un nuevo SKU',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');            
            this.quantityArr.clear();
            this.skusForm.reset();
          },
        },
      ],
    });

    await alert.present()
  }

  exportSkus() {
    const skus = this.skusArr;
    const dateNew = new Date();
    const date = formatDate(dateNew, 'dd-MM-yyyy' , 'en-US');
    const headings = [['Movie', 'Category', 'Director']];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, skus, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `SkU'S - ${date}.xlsx`);
  }
}
