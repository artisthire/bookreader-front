import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string;
  email: string;
  _id: string;
}

@Injectable()
export class UserService {
  private userSubject$ = new BehaviorSubject<IUser | null>(null);
  public userData$ = this.userSubject$.asObservable();

  setUser(data: IUser | null): void {
    this.userSubject$.next(data);
  }
}
