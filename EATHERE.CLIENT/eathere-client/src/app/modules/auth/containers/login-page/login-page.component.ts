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
    errorMessage: string = '';

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
        if (!this.fg) {
            this.errorMessage = 'Form group is not available';
            return;
        }
        const email = this.fg.get('email')?.value?.trim();
        const password = this.fg.get('password')?.value?.trim();

        if (!email || !password) {
            this.errorMessage = 'Email and password are required';

            return;
        }

        this.authService.login({ email, password }).subscribe(
            response => {
                if (response.jwt) {
                    this.authService.updateIsLoggedIn(true);
                    localStorage.setItem('jwt', response.jwt);
                    this.router.navigateByUrl('/home');
                }
            },
            error => {
                this.errorMessage = 'User not found';
            }
        );
    }


}
