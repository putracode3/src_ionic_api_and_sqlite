import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { PostingPage } from '../pages/posting/posting';
// import { HomePage } from '../pages/home/home';
// import { InputanPage } from '../pages/inputan/inputan';
import { LocalStoragePage } from '../pages/local-storage/local-storage';
import { SqliteProvider as Sqlite} from '../providers/sqlite/sqlite';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage:any = LocalStoragePage;
  // rootPage:any = InputanPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, sqlite:Sqlite) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      sqlite.openDb();
    });
  }

}
