import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { userService } from '../user-module/user.service';

@Injectable({ providedIn: 'root' })
export class providerAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: userService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = this.userService.getLoggedInUser();
        if (currentUser && currentUser.user_Type == "Provider") {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}