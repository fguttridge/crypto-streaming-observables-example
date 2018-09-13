import { Component } from '@angular/core';
import { MarketUpdatesService } from './service/socket/market-updates.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto-tracker';
  sampleData = [];
  tradeData = [];
  counter = 0;

  constructor(private mkt: MarketUpdatesService){
    var marketData = mkt.getMessage().pipe(
      map((data: String) => data.split("~"))
    );
    /* Set of observables displaying current price point info */
    // Coinbase
    marketData.pipe(
      filter(data => data[1] == "Coinbase" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[0] = data;
    });
    // Huobi
    marketData.pipe(
      filter(data => data[1] == "Kraken" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[1] = data;
    });
    // Poloniex
    marketData.pipe(
      filter(data => data[1] == "Poloniex" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[2] = data;
    });
    marketData.pipe(
      filter(data => data[1] == "QuadrigaCX" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[3] = data;
    });
    marketData.pipe(
      filter(data => data[1] == "Bitfinex" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[4] = data;
    });
    marketData.pipe(
      filter(data => data[1] == "BTCChina" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[5] = data;
    });
    marketData.pipe(
      filter(data => data[1] == "Huobi" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[6] = data;
    });
    marketData.pipe(
      filter(data => data[1] == "Binance" && data[4] != "4" && data[0] == "2"))
    .subscribe(data => {
      this.sampleData[7] = data;
    });

    marketData.pipe(filter(data => data[0] == "0"))
    .subscribe(data => {
      this.tradeData.unshift(data);
      if (this.tradeData.length >= 500)
        this.tradeData.pop();
    });
  }

  sub() {
    this.mkt.subscribeToTxFeed();
  }
  unsub(){
    this.mkt.unsubToTxFeed();
  }

  styleForTx(flag: String) {
    switch(flag) {
      case "1":
        return '#ff4444'; //red
      case "2":
        return '#26db26'; //green
      case "4":
        return 'white'; //white
    }
  }

  getInt(x: String){
    return (Number(x));
  }
}
