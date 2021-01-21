!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.IocPot=t():e.IocPot=t()}(self,(function(){return(()=>{"use strict";var e={505:(e,t,r)=>{r.r(t),r.d(t,{Pot:()=>_});class s extends Error{constructor(){super("not implemented"),this.name="NotImplementedError"}}Error;class n extends Error{constructor(){super("there is circular reference or not defined reference"),this.name="UnresolvedError"}}class o extends Error{constructor(){super("ingredient not found"),this.name="IngredientNotFoundError"}}class i extends Error{constructor(){super("same name defined"),this.name="DuplicateNameError"}}class c extends Error{constructor(){super("ingredient is lacked"),this.name="IngredientLackError"}}class a{constructor(){this.__hash={}}put(e){if(this.__hash[e.name])throw new i;this.__hash[e.name]=e}putAll(e){e.forEach((e=>{this.put(e)}))}get(e){const t=this.__hash[e];if(void 0===t)throw new o;return t}delete(e){const t=this.get(e);return delete this.__hash[e],t}exist(e){return void 0!==this.__hash[e]}forEach(e){Object.keys(this.__hash).forEach((t=>{e(this.__hash[t])}))}duplicate(){const e=new a;return e.forEach((t=>{e.put(t)})),e}isEmpty(){return 0===this.size()}size(){return Object.keys(this.__hash).length}}class h extends class{constructor(){this.cache=null}produce(e){return null===this.cache&&(this.cache=this.makeOnce(e)),this.cache}makeOnce(e){throw new s}}{constructor(e){super(),this.recipe=t=>new(e.bind.apply(e,[null].concat(t)))}makeOnce(e){return this.recipe(e)}}class u{constructor(e,t,r){this.name=e,this.dependencies=t,this.provider=r}}class l{constructor(e,t,r){this.name=e,this.dependencies=t,this.provider=r}createIngredient(e){if(!this.isConstructableFrom(e))throw new c;const t=this.dependencies.map((t=>e.get(t)));return new u(this.name,t,this.provider)}isConstructableFrom(e){return this.dependencies.every((t=>e.exist(t)))}}class p{constructor(e){this.__ingredients=e}create(e){const t=this.__ingredients.get(e);return this.__produce(t)}__produce(e){const t=e.dependencies.map((e=>this.__produce(e)));return e.provider.produce(t)}}class d{constructor(){}produce(e){const t=new a,r=e.duplicate();for(;r.isEmpty();){const e=r.size();if(r.forEach((e=>{e.isConstructableFrom(t)&&(t.put(e.createIngredient(t)),r.delete(e.name))})),e===r.size())throw new n}return new p(t)}}class _{constructor(){this.__recipes=new a,this.__aliasesHashMap={},this.__resolver=null}service(e,t,r){this.__define(new l(e,r,new h(t)))}alias(e,t){this.__aliasesHashMap[e]=t}resolve(){const e=this.__resolveAliases();this.__aliasesHashMap={},this.__recipes.putAll(e),this.__resolver=(new d).produce(this.__recipes)}locate(e){return null===this.__resolver?null:this.__resolver.create(e)}__define(e){this.__recipes.put(e)}__resolveAliases(){return Object.keys(this.__aliasesHashMap).map((e=>{const t=this.__aliasesHashMap[e],r=this.__recipes.get(t);return new l(e,r.dependencies,r.provider)}))}}}},t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}return r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(505)})()}));