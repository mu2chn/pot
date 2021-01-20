import { includes, isUnique } from "../util/arrays.js";
import { Ingredient } from "./ingredient.js";
import { Recipe } from "./recipe.js";
import { UnresolvedError, DuplicateNameError, IngredientNotFoundError, UnexpectedError } from "./throwable.js";

export class Container{
    
    /**
     * 
     * @param {Array<Recipe<any>>} recipes 
     */
    constructor(recipes){

        if(!isUnique(recipes.map(r => r.name))){
            throw new DuplicateNameError()
        }
        
        /** @type {Object<string, Recipe<any>>} */
        const recipeHash = {}
        recipes.forEach(recipe => recipeHash[recipe.name] = recipe)

        /** @type {Object<string, Ingredient<any>>} */
        const ingredientsHash = {}
        while(true){
            let ingredientSatisfiedFlag = false
            Object.keys(recipeHash).forEach(name => {
                const stuff = recipeHash[name]

                const ingredientsName = Object.keys(ingredientsHash)
                const satisfied = stuff.dependencies.filter(dependency => !includes(ingredientsName, dependency)).length === 0 // can create only to use ingredients 
                if(satisfied){
                    ingredientsHash[name] = new Ingredient(name, stuff.dependencies.map(dependency => ingredientsHash[dependency]), stuff.provider)
                    delete recipeHash[name]
                    ingredientSatisfiedFlag = true
                }
            })
            
            if(Object.keys(ingredientsHash).length === recipes.length){
                break
            } else if (!ingredientSatisfiedFlag){
                throw new UnresolvedError()
            }
        }

        this.__ingredientsHash = ingredientsHash
    }

    /**
     * 
     * @param {string} name 
     */
    create(name){
        const product = this.__ingredientsHash[name]
        if(product !== undefined){
            /** @type {Array<any>} */
            const products = product.dependencies.map(dependency => this.create(dependency.name))
            return product.provider.produce(products)
        } else {
            throw new IngredientNotFoundError()
        }
    }

}
