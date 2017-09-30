import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PeopleServiceProvider as PeopleService} from '../../providers/people-service/people-service';

@Component({
  selector: 'page-posting',
  templateUrl: 'posting.html',
  providers: [PeopleService]
})
export class PostingPage {

  public data : any;

  todo = {
    id : "",
    title: "",
    cet: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public myProvider: PeopleService) {

  }

  cetak(){
    if(this.todo.id = "1"){
      if(this.todo.title!=""){
        this.todo.cet = parseInt(this.todo.title) + parseInt(this.todo.id);
      }else{
        this.todo.cet = "";
      }
    }
  }

  ambil(){
    this.myProvider.loadPost().then(data => {
      console.log(data);
    });
  }

}
