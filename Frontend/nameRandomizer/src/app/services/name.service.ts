import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Name } from '../models/name.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  private _names$ = new BehaviorSubject<Name[]>([])
  public names$ = this._names$.asObservable()

  private _name$ = new BehaviorSubject<Name>(new Name())
  public name$ = this._name$.asObservable()

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public init() {
    this.configService.load()
    this.getNames()
  }

  public getNames() {
    this.http.get<Name[]>(`${this.configService.cfg.backendUrl}/api/Name`)
      .pipe(
        tap(res => this._names$.next(res))
      ).subscribe();
  }

  public addName(name: string) {
    this.http.post(`${this.configService.cfg.backendUrl}/api/Name`, name).subscribe({
      next: () => {
        this.getNames()
      },
      error: (err) => {
        console.log("Error adding name: ", err)
      }
    })
  }

  public deleteName(id: string) {
    this.http.delete(`${this.configService.cfg.backendUrl}/api/Name?id=` + id).subscribe({
      next: () => {
        this.getNames()
      },
      error: (err) => {
        console.log("Error deleting name: " + err)
      }
    })
  }

  public getRandomName() {
    this.http.get<Name>(`${this.configService.cfg.backendUrl}/api/Name/random`)
      .pipe(
        tap(res => this._name$.next(res))
      ).subscribe()
  }
}
