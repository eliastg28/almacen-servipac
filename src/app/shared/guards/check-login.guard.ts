import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }
  canActivate(): Promise<boolean> | boolean{
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return this.router.navigate([this.router.url]).then(() => false);
    }
    return true;
  }

}
