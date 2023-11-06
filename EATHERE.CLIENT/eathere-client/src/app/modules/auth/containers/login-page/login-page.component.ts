import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
    fg: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.fg = this.getFg();
    }

    private getFg(): any {
        return this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    login(): void {
        this.authService.login(this.fg.value).subscribe(response => {
            if (response.jwt) {
                //add to local storage jwt 
                this.authService.updateIsLoggedIn(true);
                localStorage.setItem('jwt', response.jwt);
                this.router.navigateByUrl('/home');
            }
        })
    }

}
