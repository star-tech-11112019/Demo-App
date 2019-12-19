import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BrandService } from '../../services/brand.service';


export interface Config {
	brands: string;
}

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  public config: Config;
  public rows: any;
  public columns:any;

  constructor(public alertController: AlertController, public brandService :  BrandService) { 




    this.columns = [
      { prop: 'Brand' },
      { name: 'Name' },
      { name: 'Price' }
    ];
  }
 

  ngOnInit() {
  }
  

  async createBrandAlert() {

    const alert = await this.alertController.create({
      subHeader : 'Add New Brand',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Name of Brand'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel_on_alert',
        }, {
          text: 'Save',
          role: 'save',
          cssClass: 'save_on_alert',
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    
    if ( result.role  === 'save' ) {
    
      console.log(result.data.values)
      this.brandService.createBrand( result.data.values );
    
    }
    
  }

  ionViewDidLoad() : void
  {
    //  this._HTTP
    //  .get<Config>('http://192.200.12.190/shop/public/api')
    //  .subscribe((data) =>
    //  {
    //     this.rows = data.brands;
    //  });
  }
}
