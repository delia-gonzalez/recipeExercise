import { Injectable } from '@angular/core'
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[]
  //  = [
  //   new Recipe(
  //     'Spaghetti Soygnese',
  //     'Some description for the saghetti',
  //     'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/05/Spaguetti-a-la-bolonesa-una-receta-de-pasta-para-triunfar.jpg',
  //     [new Ingredient('Spaghetti', 20), new Ingredient('soja', 20)]
  //   ),
  //   new Recipe(
  //     'Lasagna',
  //     'Some description for the lasagna',
  //     'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original.-300x169.jpg',
  //     [new Ingredient('Pasta', 1), new Ingredient('Tomato', 1)]
  //   ),
  // ]

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
