import { copy, includes, isUnique, remove } from "../util/arrays.js";
import { Factory } from "./factory.js";
import { Ingredient } from "./ingredient.js";
import { Recipe } from "./recipe.js";
import { UnresolvedError, DuplicateNameError, IngredientNotFoundError, UnexpectedError } from "./throwable.js";

export class Container{
    
    /**
     * 
     * @param {Array<Ingredient<any>>} ingredients
     */
    constructor(ingredients){

        /** @type {Object<string, Ingredient<any>>} */
        const ingredientsHash = {}
        ingredients.forEach(i => ingredientsHash[i.name] = i)
        
        this.__ingredientsHash = ingredientsHash
    }

    /**
     * 
     * @param {string} name 
     * @returns {any}
     */
    create(name){
        const product = this.__ingredientsHash[name]
        if(product !== undefined){
            /** @type {Array<any>} */
            return this.__produce(product)
        } else {
            throw new IngredientNotFoundError()
        }
    }

    /**
     * 
     * @param {Ingredient<T>} ingredient 
     * @returns {T}
     * @template T
     */
    __produce(ingredient){
        const sources = ingredient.dependencies.map(dependency => this.__produce(dependency))
        return ingredient.provider.produce(sources)
    }

}

/**
 * @implements Factory<Container>
 */
export class ContainerFactory {

    constructor(){}

    /**
     * @param {Array<Recipe<any>>} recipes 
     * @returns {Container}
     */
    produce(recipes) {

        this.__ensureUnique(recipes)

        const notResolvedRecipes = copy(recipes)

        /** @type {Array<Ingredient<any>>} */
        const ingredients = []

        while(notResolvedRecipes.length > 0){
            const prevNotResolvedLen = notResolvedRecipes.length
            notResolvedRecipes.forEach(recipe => {

                if(recipe.isConstructableFrom(ingredients)){
                    ingredients.push(recipe.createIngredient(ingredients))
                    remove(notResolvedRecipes, recipe)
                }
            })
            
            if (prevNotResolvedLen === notResolvedRecipes.length){
                throw new UnresolvedError()
            }
        }

        return new Container(ingredients)
    }

    /**
     * 
     * @param {Array<Recipe<any>>} recipes 
     */
    __ensureUnique(recipes){
        if(!isUnique(recipes.map(r => r.name))){
            throw new DuplicateNameError()
        }
    }
}
