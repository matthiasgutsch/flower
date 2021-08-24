import { EventEmitter } from '@angular/core';
export class EventProvider {
  public currentLang: EventEmitter<string> = new EventEmitter();
  setLang(val) {
    this.currentLang.emit(val);
  }
}