import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {

  public data : any;

  constructor(public http: Http) {
    console.log('Hello PeopleServiceProvider Provider');
  }

  load() {

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      // this.http.get('https://randomuser.me/api/?results=10')
      this.http.get('http://localhost/anwarul_huda/api/V1/users')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference

        // this.data = data.results;
        this.data = data;
        resolve(this.data);
      });
    });
  }

  loadPost() {

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      // this.http.get('https://randomuser.me/api/?results=10')
      // this.http.post('http://localhost/anwarul_huda/api/V1/users')

      let myHeader = new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
      });

      let options =  new RequestOptions({
        headers: myHeader
      });

      this.http.post('http://localhost/anwarul_huda/api/V1/users', "jeneng=konco bolang", options)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference

        // this.data = data.results;
        this.data = data;
        resolve(this.data);
      });
    });
  }

}
