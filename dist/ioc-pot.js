!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.IocPot=r():e.IocPot=r()}(self,(function(){return(()=>{"use strict";var e={106:(e,r,t)=>{t.r(r),t.d(r,{Pot:()=>_});const s=(e,r)=>-1!==e.indexOf(r);class n extends Error{constructor(){super("list is empty"),this.name="HasNoElementError"}}class o extends Error{constructor(){super("list is not one"),this.name="HasMultipleElementError"}}class c extends Error{constructor(){super("not implemented"),this.name="NotImplementedError"}}Error;class i extends Error{constructor(){super("there is circular reference or not defined reference"),this.name="UnresolvedError"}}class a extends Error{constructor(){super("ingredient not found"),this.name="IngredientNotFoundError"}}class l extends Error{constructor(){super("same name defined"),this.name="DuplicateNameError"}}class p extends class{constructor(){this.cache=null}produce(e){return null===this.cache&&(this.cache=this.makeOnce(e)),this.cache}makeOnce(e){throw new c}}{constructor(e){super(),this.recipe=r=>new(e.bind.apply(e,[null].concat(r)))}makeOnce(e){return this.recipe(e)}}class d{constructor(e,r,t){this.name=e,this.dependencies=r,this.provider=t}}class h{constructor(e,r,t){this.name=e,this.dependencies=r,this.provider=t}}class u{constructor(e){if(r=e.map((e=>e.name)),new Set(r).size!==r.length)throw new l;var r;const t={};e.forEach((e=>t[e.name]=e));const n={};for(;;){let r=!1;if(Object.keys(t).forEach((e=>{const o=t[e],c=Object.keys(n);0===o.dependencies.filter((e=>!s(c,e))).length&&(n[e]=new d(e,o.dependencies.map((e=>n[e])),o.provider),delete t[e],r=!0)})),Object.keys(n).length===e.length)break;if(!r)throw new i}this.__ingredientsHash=n}create(e){const r=this.__ingredientsHash[e];if(void 0!==r)return this.__produce(r);throw new a}__produce(e){const r=e.dependencies.map((e=>this.__produce(e)));return e.provider.produce(r)}}Error;const _=class{constructor(){this.__recipes=[],this.__aliasesHashMap={},this.__container=null}define(e,r,t){this.__recipes.push(new h(e,t,new p(r)))}alias(e,r){this.__aliasesHashMap[e]=r}resolve(){const e=this.__resolveAliases();this.__container=new u(((...e)=>{let r=[];return e.forEach((e=>{r=r.concat(e)})),r})(this.__recipes,e))}locate(e){return null===this.__container?null:this.__container.create(e)}__resolveAliases(){return Object.keys(this.__aliasesHashMap).map((e=>{const r=this.__aliasesHashMap[e],t=this.__findRecipe(r);return new h(e,t.dependencies,t.provider)}))}__findRecipe(e){return(e=>{switch(e.length){case 0:throw new n;case 1:return e[0];default:throw new o}})(this.__recipes.filter((r=>r.name===e)))}}}},r={};function t(s){if(r[s])return r[s].exports;var n=r[s]={exports:{}};return e[s](n,n.exports,t),n.exports}return t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(106)})()}));