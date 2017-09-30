import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Platform} from 'ionic-angular';

import {SqliteProvider as Sqlite} from '../../providers/sqlite/sqlite';


/**
 * Generated class for the LocalStoragePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-local-storage',
  templateUrl: 'local-storage.html',
})
export class LocalStoragePage {

  public todos = [];
  public param : any = [];
  public val : any = {
    username : "",
    password : "",
    alamat : "",
    telepon : ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService : Sqlite, protected platform : Platform) {

    this
      .platform
      .ready()
      .then(() => {
        this
          .sqliteService
          .getRows()
          .then(s => {
            this.todos = this.sqliteService.arr;
          });
      })
  }

  //Adding the Function
  add(param) {
    console.log(param);
    this
      .sqliteService
      .addItem(param)
      .then(s => {
        this.todos = this.sqliteService.arr;
        this.param = '';
      });
  }
  //Deleting function
  delete(i) {
    this
      .sqliteService
      .del(i)
      .then(s => {
        this.todos = this.sqliteService.arr;
      });
  }
  //Deleting function
  // drop() {
  //   this
  //     .sqliteService
  //     .droptable()
  //     .then(s => {
  //       this.todos = this.sqliteService.arr;
  //     });
  // }
  //updating function
  update(id, username, password, alamat, telepon) {
    this.val.password = password;
    this.val.username = username;
    this.val.alamat = alamat;
    this.val.telepon = telepon;

    if(this.param.password!=null){
      let b = this.param.username;
      let c = this.param.password;
      let d = this.param.alamat;
      let e = this.param.telepon;

      this
        .sqliteService
        // .update(id, username, password, alamat, telepon)
        .update(id, b, c, d, e)
        .then(s => {
          this.todos = this.sqliteService.arr;
        });
    }
  }

}




// Modal
@Component({
  template: `
<ion-header>
  <ion-toolbar color="primary">
    <ion-title text-center>
      Pesan
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
  <ion-toolbar color="primary">
    <ion-title>
      {{jenis.name}}
      <ion-badge item-end color="light" class="text-orange">*{{jenis.type}}</ion-badge>
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item>
      <img src="{{jenis.image}}"/>
    </ion-item>
    <ion-item>
      <ion-label floating>Atas Nama</ion-label>
      <ion-input type="text" [(ngModel)]="todo.pelanggan" name="Nama"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label floating>Alamat</ion-label>
      <ion-input type="text" [(ngModel)]="todo.alamat" name="Alamat"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Jumlah</ion-label>
      <ion-input type="number" [(ngModel)]="todo.jumlah" name="Jumlah" (keyup)="hitung()"></ion-input>
    </ion-item>

    <ion-item>
      <p *ngIf="todo.jumlah != ''">Total Bayar: Rp. {{todo.bayar | number:0}}</p>
      <p *ngIf="todo.jumlah == ''">Total Bayar: Rp. 0</p>
    </ion-item>

    <ion-row no-padding>
      <ion-col text-right>
        <button ion-button medium color="secondary" icon-start icon-right (click)="simpanPesanan()">
          Pesan
          <ion-icon name='md-checkmark-circle'></ion-icon>
        </button>
      </ion-col>
    </ion-row>
  </ion-list>
</ion-content>
`
})
export class ModalPesan {

  todo = {
    pelanggan : "",
    alamat : "",
    jumlah : "",
    bayar : null
  };

  jenis;

  constructor(
    public platform: Platform,
    public params: NavParams,
    // public viewCtrl: ViewController,
    // public myProvider: MyProvider
  ) {
    var MacamJenis = [
      {
        harga: 3000,
        name: 'Galon 12 L (Rp. 3.000)',
        type: 'Depo',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 4000,
        name: 'Galon 19 L (Rp. 4.000)',
        type: 'Depo',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 6000,
        name: 'Galon 12 L (Rp. 6.000)',
        type: 'Isi 1',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 9000,
        name: 'Galon 19 L (Rp. 9.000)',
        type: 'Isi 1',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 13000,
        name: 'Gelas 120 ml (Rp. 13.000)',
        type: 'Isi 45',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 15000,
        name: 'Gelas 200 ml (Rp. 15.000)',
        type: 'Isi 48',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 30000,
        name: 'Gelas 250 ml (Rp. 30.000)',
        type: 'Isi 24',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 33000,
        name: 'Botol 600 ml (Rp. 33.000)',
        type: 'Isi 24',
        image: 'assets/img/default.jpg'
      },
      {
        harga: 35000,
        name: 'Botol 1500 ml (Rp. 35.000)',
        type: 'Isi 12',
        image: 'assets/img/default.jpg'
      }
    ];

    this.jenis = MacamJenis[this.params.get('charNum')];
  }

  hitung(){
    if(this.todo.jumlah!=""){
      this.todo.bayar = parseInt(this.todo.jumlah)*this.jenis.harga;
    }else{
      this.todo.bayar = 0;
    }
  }

  // simpanPesanan(){
  //   let isi = {
  //     pelanggan : this.todo.pelanggan,
  //     alamat : this.todo.alamat,
  //     jumlah : this.todo.jumlah,
  //     bayar : this.todo.bayar
  //   } ;

    // this.myProvider.simpanPesanan(isi).then(data => {
      // console.log(data);
    //   this.dismiss();
    // });
  // }

  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }
}
