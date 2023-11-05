import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
    fg: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.fg = this.getFg();
    }

    private getFg(): any {
        return this.fb.group({
            name: ["", Validators.required],
            surname: ["", Validators.required],
            email: ["", Validators.required],
            password: ["", Validators.required],
            isRestaurantOwner: [false, Validators.required]
        });
    }

    register(): void {
        this.authService.register(this.fg.value).subscribe(response => {
            this.router.navigateByUrl('/');
        })
    }

}
