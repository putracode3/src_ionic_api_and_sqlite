import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

declare var window : any;

@Injectable()
export class SqliteProvider {

  public text : string = "";
  public db = null;
  public arr = [];

  constructor(public http: Http) {
    console.log('Hello SqliteProvider Provider');
  }

  openDb() {
    this.db = window
      .sqlitePlugin
      .openDatabase({name: 'todo.db', location: 'default'});
    this
      .db
      .transaction((tx) => {
        // tx.executeSql('CREATE TABLE IF NOT EXISTS Todo (id integer primary key,todoItem text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS `profil` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `nama` TEXT, `username` TEXT, `password` TEXT, `alamat` TEXT, `telepon` TEXT )');
      }, (e) => {
        console.log('Transtion Error', e);
      }, () => {
        console.log('Populated Datebase OK..');
      })
  }

  addItem(i) {

    let isi = [i.username, i.username, i.password, i.alamat, i.telepon];
    console.log(isi);

    return new Promise(resolve => {
      // var InsertQuery = "INSERT INTO Todo (todoItem) VALUES (?)";
      var InsertQuery = "INSERT INTO `profil`(`nama`,`username`,`password`,`alamat`,`telepon`) VALUES (?,?,?,?,?);";
      this
        .db
        // .executeSql(InsertQuery, [isi], (r) => {
          .executeSql(InsertQuery, isi, (r) => {
          console.log('Inserted... Sucess..', i);
          this
            .getRows()
            .then(s => {
              resolve(true)
            });
        }, e => {
          console.log('Inserted Error', e);
          resolve(false);
        })
    })
  }

  getRows() {
    return new Promise(res => {
      this.arr = [];
      let query = "SELECT * FROM profil";
      this
        .db
        .executeSql(query, [], rs => {
          if (rs.rows.length > 0) {
            for (var i = 0; i < rs.rows.length; i++) {
              var item = rs
                .rows
                .item(i);
              this
                .arr
                .push(item);
            }
          }
          res(true);
        }, (e) => {
          console.log('Sql Query Error', e);
        });
    })
  }

  del(id) {
    return new Promise(resolve => {
      var query = "DELETE FROM profil WHERE id=?";
      this
        .db
        .executeSql(query, [id], (s) => {
          console.log('Delete Success...', s);
          this
            .getRows()
            .then(s => {
              resolve(true);
            });
        }, (err) => {
          console.log('Deleting Error', err);
        });
    })

  }

  update(id, username, password, alamat, telepon) {
    return new Promise(res => {
      var query = "UPDATE profil SET username=?, password=?, alamat=?, telepon=?  WHERE id=?";
      this
        .db
        .executeSql(query, [
          username, password, alamat, telepon, id
        ], (s) => {
          console.log('Update Success...', s);
          this
            .getRows()
            .then(s => {
              res(true);
            });
        }, (err) => {
          console.log('Updating Error', err);
        });
    })
  }

  // droptable(){
  //   return new Promise(resolve => {
  //     var query = "DROP TABLE IF EXISTS profil";
  //     this
  //       .db
  //       .executeSql(query, (s) => {
  //         console.log('DROP Success...', s);
  //         this
  //           .getRows()
  //           .then(s => {
  //             resolve(true);
  //           });
  //       }, (err) => {
  //         console.log('DROP Error', err);
  //       });
  //   })
  // }

}
