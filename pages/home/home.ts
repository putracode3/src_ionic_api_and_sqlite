import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {PeopleServiceProvider as PeopleService} from '../../providers/people-service/people-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PeopleService]
})
export class HomePage {

  public people: any; //atau bisa juga dengan spesifiknya: "public people : any = []"

  constructor(public navCtrl: NavController, public peopleService: PeopleService) {
    this.loadPeople();
  }

  loadPeople(){
    this.peopleService.load()
    .then(data => {
      this.people = data;
    });
  }

}
