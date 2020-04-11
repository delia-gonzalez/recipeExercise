import { EventEmitter, Input } from '@angular/core'
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Spaghetti Soygnese', 
            'Some description for the saghetti', 
            'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/05/Spaguetti-a-la-bolonesa-una-receta-de-pasta-para-triunfar.jpg',
            [
                new Ingredient('Spaghetti', 20),
                new Ingredient('soja', 20)
            ]),
        new Recipe(
            'Lasagna', 
            'Some description for the lasagna', 
            'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original.-300x169.jpg',
            [
                new Ingredient('Pasta', 1),
                new Ingredient('Tomato', 1),
            ])
    ];
    
    getRecipes() {
        return this.recipes.slice();
    }
}