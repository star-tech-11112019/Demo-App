import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    console.log("sss ##############");
  }

  get products() {
    let p:any;
    // this.storage.get('poducts').then((val) => {
    //   console.log('Your age is', JSON.parse(val));
    // });
    return ;
  }

}
