import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public isLoading(): boolean {
    return this._isLoading.getValue();
  }

  public setLoading(loading: boolean){
    this._isLoading.next(loading);
  }

  public loading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
}
