import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { isArray } from 'util';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  form: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      credentials: this.formBuilder.array([]),
    });

   }

  ngOnInit() {
    this.addProduct();
  }

  addProduct() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.formBuilder.group({
      name: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', Validators.required],
    }));
    console.log("form : ");
    console.log(this.form);
  }

  removeProduct() {
    const creds = this.form.controls.credentials as FormArray;
    if( this.form.controls && isArray(this.form.controls.credentials) )
     creds.removeAt(this.form.controls.credentials.length - 1);
  }
 
}
