import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  form: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private storage: Storage) {
    this.form = this.formBuilder.group({
      credentials: this.formBuilder.array([]),
    });

   }

  get f() {
    return this.form.controls;
  }
  
  get c() {
    return this.form.controls.credentials;
  }

  ngOnInit() {
    this.addProduct();
  }

  addProduct() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.formBuilder.group({
      name: ['', Validators.required],
      qty:  ['', Validators.required],
      price: ['', Validators.required],
    }));
  }

  removeProduct() {
    const creds = <FormArray> this.form.controls.credentials;
    (creds.length > 1) ? creds.removeAt(creds.length - 1) : false;
  }

  store(){
    
    this.storage.set('poducts', JSON.stringify(this.form.value.credentials));
    this.router.navigate(['members', 'product']);
        
  }
 
}
