import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController , LoadingController, ToastController } from '@ionic/angular';
import { BrandService } from '../../services/brand.service';
import { IonInfiniteScroll } from '@ionic/angular';
import * as _ from 'lodash';

export interface Config {
	brands: string;
}

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  
  loaderToShow: any;
  dataList    : any;
  pageNo      = 1;

  @ViewChild(IonInfiniteScroll ,  {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor( public alertController: AlertController, public brandService :  BrandService,
               public loadingController: LoadingController, public toastController: ToastController
             ) 
  { 

    this.dataList = [];
    this.getList(this.pageNo);

  }

  ngOnInit() { }

  /**
   * API delete for item
   * @param item 
   */
  trash(item) {
    console.log(item);
  }

  /**
   * Load data list on view when scroll ends
   */
  loadData(event) {

    setTimeout(() => {
      
      this.getList( this.pageNo );
      event.target.complete();
      this.pageNo ++;
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }

    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  /**
   * API request to get the list of brands
   * @param pageNo<number>
   * @return void
   */
  getList(pageNo) { 

    this.brandService.getBrand(pageNo).subscribe((response) => {
      
      if( response.status && response.data.length > 0 ) {
      
        console.log( response.data );
        this.dataList =  _.concat( this.dataList , response.data );
      
      }

    });
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
          handler: (data ) => {
           
            if( !data.name ) {
              
              this.failledAlert("Name of Brand field is required.");
              return false;

            }else {

              this.showLoader();

              this.brandService.createBrand( data.name ).subscribe((response) => {

                this.hideLoader();
                
                if( response.status == false ) {

                  this.failledAlert( response.message );
                    return false;
                
                }else {

                  this.presentToast("Brand created successfully");

                }
              
              }, err => {

                setTimeout( () => {
                    this.presentToast("Something went wrong! Please check Internet Connectivity. Thanks!");
                    this.hideLoader()
                }, 8000);
              
              });
            }
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
  }
  
  async failledAlert(text) {
  
    const alertFail = await this.alertController.create({
      subHeader: 'Failled',
      message: text,
      buttons: ['OK']
    });

    await alertFail.present();

  }

   /**
   * Show Toast
   */
  async presentToast(m) {
  
    const toast = await this.toastController.create({
      message: m,
      duration: 3000,
      showCloseButton: true,
      position: "bottom"
    });
    toast.present();
  
  }

  /**
   * Show Loader
   */
  showLoader() {

    this.loaderToShow = this.loadingController.create({
      
      message: 'Please Wait',
      spinner: 'bubbles'

    }).then((res) => {
     
      res.present();
      res.onDidDismiss().then((dis) => {
      });

    });
    
  }

  /**
   * Hide Loader
   */
  hideLoader() {

    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  
  }

}
