!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.IocPot=r():e.IocPot=r()}(self,(function(){return(()=>{"use strict";var e={106:(e,r,t)=>{t.r(r),t.d(r,{Pot:()=>f});const s=(e,r)=>-1!==e.indexOf(r),n=(e,r)=>{const t=e.indexOf(r);-1!==t&&e.splice(t,1)};class o extends Error{constructor(){super("list is empty"),this.name="HasNoElementError"}}class i extends Error{constructor(){super("list is not one"),this.name="HasMultipleElementError"}}class c extends Error{constructor(){super("not implemented"),this.name="NotImplementedError"}}Error;class a extends Error{constructor(){super("there is circular reference or not defined reference"),this.name="UnresolvedError"}}class l extends Error{constructor(){super("ingredient not found"),this.name="IngredientNotFoundError"}}class p extends Error{constructor(){super("same name defined"),this.name="DuplicateNameError"}}class d extends class{constructor(){this.cache=null}produce(e){return null===this.cache&&(this.cache=this.makeOnce(e)),this.cache}makeOnce(e){throw new c}}{constructor(e){super(),this.recipe=r=>new(e.bind.apply(e,[null].concat(r)))}makeOnce(e){return this.recipe(e)}}class u{constructor(e,r,t){this.name=e,this.dependencies=r,this.provider=t}}class h{constructor(e,r,t){this.name=e,this.dependencies=r,this.provider=t}}class _{constructor(e){if(r=e.map((e=>e.name)),new Set(r).size!==r.length)throw new p;var r;const t=(e=>e.slice())(e),o={};for(;;){let e=!1;if(t.forEach((r=>{const i=Object.keys(o);r.dependencies.every((e=>s(i,e)))&&(o[r.name]=new u(r.name,r.dependencies.map((e=>o[e])),r.provider),e=!0,n(t,r))})),0==t.length)break;if(!e)throw new a}this.__ingredientsHash=o}create(e){const r=this.__ingredientsHash[e];if(void 0!==r)return this.__produce(r);throw new l}__produce(e){const r=e.dependencies.map((e=>this.__produce(e)));return e.provider.produce(r)}}Error;const f=class{constructor(){this.__recipes=[],this.__aliasesHashMap={},this.__container=null}define(e,r,t){this.__recipes.push(new h(e,t,new d(r)))}alias(e,r){this.__aliasesHashMap[e]=r}resolve(){const e=this.__resolveAliases();this.__container=new _(((...e)=>{let r=[];return e.forEach((e=>{r=r.concat(e)})),r})(this.__recipes,e))}locate(e){return null===this.__container?null:this.__container.create(e)}__resolveAliases(){return Object.keys(this.__aliasesHashMap).map((e=>{const r=this.__aliasesHashMap[e],t=this.__findRecipe(r);return new h(e,t.dependencies,t.provider)}))}__findRecipe(e){return(e=>{switch(e.length){case 0:throw new o;case 1:return e[0];default:throw new i}})(this.__recipes.filter((r=>r.name===e)))}}}},r={};function t(s){if(r[s])return r[s].exports;var n=r[s]={exports:{}};return e[s](n,n.exports,t),n.exports}return t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(106)})()}));