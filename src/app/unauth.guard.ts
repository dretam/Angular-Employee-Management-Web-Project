import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class HomeGuard implements CanActivate {
    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Observable((observer => {
            let token = localStorage.getItem('token');
            if(token) {
                this.router.navigateByUrl('/');
                observer.next(false);
            } else {
                observer.next(true);
            }
        }));
    }
}