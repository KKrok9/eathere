import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';

@Component({
    selector: 'app-dish-modal',
    templateUrl: './dish-modal.component.html',
    styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent implements OnInit {
    @Input() dish!: Dish;
    @Input() restaurantId!: string;

    fg: FormGroup;
    private subscription = new Subscription();
    constructor(
        private dishService: DishService,
        private fb: FormBuilder
    ) {
        this.fg = this.getFg();
    }
    ngOnInit(): void {
        this.setInputsValues();
        console.log(this.dish);
    }

    private getFg() {
        return this.fb.group({
            name: "",
            ingredients: "",
            description: "",
            price: "",
            calories: "",
            proteins: "",
            fats: "",
            carbohydrates: ""
        })
    }

    updateDish(): void {
        const updatedDish = {
            id: this.dish.id,
            name: this.fg.value.name,
            ingredients: this.fg.value.ingredients,
            description: this.fg.value.description,
            price: this.fg.value.price,
            calories: this.fg.value.calories,
            proteins: this.fg.value.proteins,
            fats: this.fg.value.fats,
            carbohydrates: this.fg.value.carbohydrates,
            restaurantId: this.restaurantId
        };
        this.subscription.add(
            this.dishService.updateDish(updatedDish).subscribe((response) => {
                console.log(response);
            })
        )
    }

    setInputsValues() {
        if (this.dish !== null) {
            this.fg.patchValue({
                name: this.dish.name,
                ingredients: this.dish.ingredients || "",
                description: this.dish.description || "",
                price: this.dish.price || "",
                calories: this.dish.calories || "",
                proteins: this.dish.proteins || "",
                fats: this.dish.fats || "",
                carbohydrates: this.dish.carbohydrates || ""
            })
        }
        else {
            console.log('xdd');
        }
    }

}
