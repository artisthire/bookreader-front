import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  private userSubject$ = new BehaviorSubject<IUser | null>(null);
  public userData$ = this.userSubject$.asObservable();

  setUser(data: IUser | null): void {
    this.userSubject$.next(data);
  }
}
