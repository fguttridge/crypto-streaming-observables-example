import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketUpdatesService {

  currentSubsPricePoint
  currentSubsTrade;

  constructor(private socket: Socket, private http: HttpClient) {
    this.getDetails();
   }

  getDetails() {
    this.http.get("https://min-api.cryptocompare.com/data/subs?fsym=BTC&tsyms=USD")
    .subscribe(data => {
      this.currentSubsPricePoint = data['USD']['CURRENT'];
      this.socket.emit('SubAdd', {subs: this.currentSubsPricePoint} )
    });
    this.http.get("https://min-api.cryptocompare.com/data/subs?fsym=BTC&tsyms=USD")
    .subscribe(data => {
      this.currentSubsTrade = data['USD']['TRADES'];
      this.socket.emit('SubAdd', {subs: this.currentSubsTrade} )
    });
  }

  getMessage() {
    return this.socket.fromEvent("m")
  }

  subscribeToTxFeed(){
    this.socket.emit('SubAdd', {subs: this.currentSubsTrade} )
  }
  unsubToTxFeed(){
    this.socket.emit('SubRemove', {subs: this.currentSubsTrade} )
  }
}
