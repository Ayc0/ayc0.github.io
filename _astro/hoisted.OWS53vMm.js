/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=window,Oe=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Re=Symbol(),De=new WeakMap;let ut=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==Re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(Oe&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=De.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&De.set(r,e))}return e}toString(){return this.cssText}};const Ht=t=>new ut(typeof t=="string"?t:t+"",void 0,Re),H=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,n,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1],t[0]);return new ut(r,t,Re)},Ot=(t,e)=>{Oe?t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):e.forEach(r=>{const i=document.createElement("style"),n=ne.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=r.cssText,t.appendChild(i)})},Be=Oe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return Ht(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ge;const se=window,qe=se.trustedTypes,Rt=qe?qe.emptyScript:"",Ve=se.reactiveElementPolyfillSupport,Ne={toAttribute(t,e){switch(e){case Boolean:t=t?Rt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},dt=(t,e)=>e!==t&&(e==e||t==t),be={attribute:!0,type:String,converter:Ne,reflect:!1,hasChanged:dt},Pe="finalized";let T=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var r;this.finalize(),((r=this.h)!==null&&r!==void 0?r:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((r,i)=>{const n=this._$Ep(i,r);n!==void 0&&(this._$Ev.set(n,i),e.push(n))}),e}static createProperty(e,r=be){if(r.state&&(r.attribute=!1),this.finalize(),this.elementProperties.set(e,r),!r.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,r);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,r,i){return{get(){return this[r]},set(n){const s=this[e];this[r]=n,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||be}static finalize(){if(this.hasOwnProperty(Pe))return!1;this[Pe]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const r=this.properties,i=[...Object.getOwnPropertyNames(r),...Object.getOwnPropertySymbols(r)];for(const n of i)this.createProperty(n,r[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)r.unshift(Be(n))}else e!==void 0&&r.push(Be(e));return r}static _$Ep(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(r=>r(this))}addController(e){var r,i;((r=this._$ES)!==null&&r!==void 0?r:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var r;(r=this._$ES)===null||r===void 0||r.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,r)=>{this.hasOwnProperty(r)&&(this._$Ei.set(r,this[r]),delete this[r])})}createRenderRoot(){var e;const r=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ot(r,this.constructor.elementStyles),r}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(r=>{var i;return(i=r.hostConnected)===null||i===void 0?void 0:i.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(r=>{var i;return(i=r.hostDisconnected)===null||i===void 0?void 0:i.call(r)})}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$EO(e,r,i=be){var n;const s=this.constructor._$Ep(e,i);if(s!==void 0&&i.reflect===!0){const o=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:Ne).toAttribute(r,i.type);this._$El=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,r){var i;const n=this.constructor,s=n._$Ev.get(e);if(s!==void 0&&this._$El!==s){const o=n.getPropertyOptions(s),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?o.converter:Ne;this._$El=s,this[s]=h.fromAttribute(r,o.type),this._$El=null}}requestUpdate(e,r,i){let n=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||dt)(this[e],r)?(this._$AL.has(e)||this._$AL.set(e,r),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,s)=>this[s]=n),this._$Ei=void 0);let r=!1;const i=this._$AL;try{r=this.shouldUpdate(i),r?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var s;return(s=n.hostUpdate)===null||s===void 0?void 0:s.call(n)}),this.update(i)):this._$Ek()}catch(n){throw r=!1,this._$Ek(),n}r&&this._$AE(i)}willUpdate(e){}_$AE(e){var r;(r=this._$ES)===null||r===void 0||r.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((r,i)=>this._$EO(i,this[i],r)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};T[Pe]=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},Ve?.({ReactiveElement:T}),((ge=se.reactiveElementVersions)!==null&&ge!==void 0?ge:se.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var me;const oe=window,j=oe.trustedTypes,We=j?j.createPolicy("lit-html",{createHTML:t=>t}):void 0,Me="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,pt="?"+_,Ut=`<${pt}>`,M=document,W=()=>M.createComment(""),K=t=>t===null||typeof t!="object"&&typeof t!="function",ft=Array.isArray,Tt=t=>ft(t)||typeof t?.[Symbol.iterator]=="function",$e=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ke=/-->/g,Ze=/>/g,k=RegExp(`>|${$e}(?:([^\\s"'>=/]+)(${$e}*=${$e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,Ge=/"/g,gt=/^(?:script|style|textarea|title)$/i,It=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),ae=It(1),z=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Fe=new WeakMap,E=M.createTreeWalker(M,129,null,!1);function bt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return We!==void 0?We.createHTML(e):e}const Lt=(t,e)=>{const r=t.length-1,i=[];let n,s=e===2?"<svg>":"",o=q;for(let h=0;h<r;h++){const a=t[h];let l,c,u=-1,d=0;for(;d<a.length&&(o.lastIndex=d,c=o.exec(a),c!==null);)d=o.lastIndex,o===q?c[1]==="!--"?o=Ke:c[1]!==void 0?o=Ze:c[2]!==void 0?(gt.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=k):c[3]!==void 0&&(o=k):o===k?c[0]===">"?(o=n??q,u=-1):c[1]===void 0?u=-2:(u=o.lastIndex-c[2].length,l=c[1],o=c[3]===void 0?k:c[3]==='"'?Ge:Je):o===Ge||o===Je?o=k:o===Ke||o===Ze?o=q:(o=k,n=void 0);const g=o===k&&t[h+1].startsWith("/>")?" ":"";s+=o===q?a+Ut:u>=0?(i.push(l),a.slice(0,u)+Me+a.slice(u)+_+g):a+_+(u===-2?(i.push(void 0),h):g)}return[bt(t,s+(t[r]||"<?>")+(e===2?"</svg>":"")),i]};class Z{constructor({strings:e,_$litType$:r},i){let n;this.parts=[];let s=0,o=0;const h=e.length-1,a=this.parts,[l,c]=Lt(e,r);if(this.el=Z.createElement(l,i),E.currentNode=this.el.content,r===2){const u=this.el.content,d=u.firstChild;d.remove(),u.append(...d.childNodes)}for(;(n=E.nextNode())!==null&&a.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const u=[];for(const d of n.getAttributeNames())if(d.endsWith(Me)||d.startsWith(_)){const g=c[o++];if(u.push(d),g!==void 0){const Y=n.getAttribute(g.toLowerCase()+Me).split(_),C=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:C[2],strings:Y,ctor:C[1]==="."?zt:C[1]==="?"?Bt:C[1]==="@"?qt:de})}else a.push({type:6,index:s})}for(const d of u)n.removeAttribute(d)}if(gt.test(n.tagName)){const u=n.textContent.split(_),d=u.length-1;if(d>0){n.textContent=j?j.emptyScript:"";for(let g=0;g<d;g++)n.append(u[g],W()),E.nextNode(),a.push({type:2,index:++s});n.append(u[d],W())}}}else if(n.nodeType===8)if(n.data===pt)a.push({type:2,index:s});else{let u=-1;for(;(u=n.data.indexOf(_,u+1))!==-1;)a.push({type:7,index:s}),u+=_.length-1}s++}}static createElement(e,r){const i=M.createElement("template");return i.innerHTML=e,i}}function D(t,e,r=t,i){var n,s,o,h;if(e===z)return e;let a=i!==void 0?(n=r._$Co)===null||n===void 0?void 0:n[i]:r._$Cl;const l=K(e)?void 0:e._$litDirective$;return a?.constructor!==l&&((s=a?._$AO)===null||s===void 0||s.call(a,!1),l===void 0?a=void 0:(a=new l(t),a._$AT(t,r,i)),i!==void 0?((o=(h=r)._$Co)!==null&&o!==void 0?o:h._$Co=[])[i]=a:r._$Cl=a),a!==void 0&&(e=D(t,a._$AS(t,e.values),a,i)),e}class jt{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var r;const{el:{content:i},parts:n}=this._$AD,s=((r=e?.creationScope)!==null&&r!==void 0?r:M).importNode(i,!0);E.currentNode=s;let o=E.nextNode(),h=0,a=0,l=n[0];for(;l!==void 0;){if(h===l.index){let c;l.type===2?c=new F(o,o.nextSibling,this,e):l.type===1?c=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(c=new Vt(o,this,e)),this._$AV.push(c),l=n[++a]}h!==l?.index&&(o=E.nextNode(),h++)}return E.currentNode=M,s}v(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class F{constructor(e,r,i,n){var s;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=n,this._$Cp=(s=n?.isConnected)===null||s===void 0||s}get _$AU(){var e,r;return(r=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&r!==void 0?r:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=D(this,e,r),K(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==z&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Tt(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==p&&K(this._$AH)?this._$AA.nextSibling.data=e:this.$(M.createTextNode(e)),this._$AH=e}g(e){var r;const{values:i,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Z.createElement(bt(n.h,n.h[0]),this.options)),n);if(((r=this._$AH)===null||r===void 0?void 0:r._$AD)===s)this._$AH.v(i);else{const o=new jt(s,this),h=o.u(this.options);o.v(i),this.$(h),this._$AH=o}}_$AC(e){let r=Fe.get(e.strings);return r===void 0&&Fe.set(e.strings,r=new Z(e)),r}T(e){ft(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,n=0;for(const s of e)n===r.length?r.push(i=new F(this.k(W()),this.k(W()),this,this.options)):i=r[n],i._$AI(s),n++;n<r.length&&(this._$AR(i&&i._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,r);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var r;this._$AM===void 0&&(this._$Cp=e,(r=this._$AP)===null||r===void 0||r.call(this,e))}}class de{constructor(e,r,i,n,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,r=this,i,n){const s=this.strings;let o=!1;if(s===void 0)e=D(this,e,r,0),o=!K(e)||e!==this._$AH&&e!==z,o&&(this._$AH=e);else{const h=e;let a,l;for(e=s[0],a=0;a<s.length-1;a++)l=D(this,h[i+a],r,a),l===z&&(l=this._$AH[a]),o||(o=!K(l)||l!==this._$AH[a]),l===p?e=p:e!==p&&(e+=(l??"")+s[a+1]),this._$AH[a]=l}o&&!n&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class zt extends de{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}const Dt=j?j.emptyScript:"";class Bt extends de{constructor(){super(...arguments),this.type=4}j(e){e&&e!==p?this.element.setAttribute(this.name,Dt):this.element.removeAttribute(this.name)}}class qt extends de{constructor(e,r,i,n,s){super(e,r,i,n,s),this.type=5}_$AI(e,r=this){var i;if((e=(i=D(this,e,r,0))!==null&&i!==void 0?i:p)===z)return;const n=this._$AH,s=e===p&&n!==p||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==p&&(n===p||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r,i;typeof this._$AH=="function"?this._$AH.call((i=(r=this.options)===null||r===void 0?void 0:r.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Vt{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}}const Xe=oe.litHtmlPolyfillSupport;Xe?.(Z,F),((me=oe.litHtmlVersions)!==null&&me!==void 0?me:oe.litHtmlVersions=[]).push("2.8.0");const Wt=(t,e,r)=>{var i,n;const s=(i=r?.renderBefore)!==null&&i!==void 0?i:e;let o=s._$litPart$;if(o===void 0){const h=(n=r?.renderBefore)!==null&&n!==void 0?n:null;s._$litPart$=o=new F(e.insertBefore(W(),h),h,void 0,r??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ve,xe;class N extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,r;const i=super.createRenderRoot();return(e=(r=this.renderOptions).renderBefore)!==null&&e!==void 0||(r.renderBefore=i.firstChild),i}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Wt(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return z}}N.finalized=!0,N._$litElement$=!0,(ve=globalThis.litElementHydrateSupport)===null||ve===void 0||ve.call(globalThis,{LitElement:N});const Ye=globalThis.litElementPolyfillSupport;Ye?.({LitElement:N});((xe=globalThis.litElementVersions)!==null&&xe!==void 0?xe:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ue=t=>e=>typeof e=="function"?((r,i)=>(customElements.define(r,i),i))(t,e):((r,i)=>{const{kind:n,elements:s}=i;return{kind:n,elements:s,finisher(o){customElements.define(r,o)}}})(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(r){r.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}},Zt=(t,e,r)=>{e.constructor.createProperty(r,t)};function O(t){return(e,r)=>r!==void 0?Zt(t,e,r):Kt(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Te(t){return O({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=({finisher:t,descriptor:e})=>(r,i)=>{var n;if(i===void 0){const s=(n=r.originalKey)!==null&&n!==void 0?n:r.key,o=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(r.key)}:{...r,key:s};return t!=null&&(o.finisher=function(h){t(h,s)}),o}{const s=r.constructor;e!==void 0&&Object.defineProperty(r,i,e(i)),t?.(s,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Jt(t){return mt({finisher:(e,r)=>{Object.assign(e.prototype[r],t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $t(t,e){return mt({descriptor:r=>{const i={get(){var n,s;return(s=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(t))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const n=typeof r=="symbol"?Symbol():"__"+r;i.get=function(){var s,o;return this[n]===void 0&&(this[n]=(o=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(t))!==null&&o!==void 0?o:null),this[n]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ye;((ye=window.HTMLSlotElement)===null||ye===void 0?void 0:ye.prototype.assignedElements)!=null;function Gt(t,e=r=>r){const[r,i]=function(){const a=new Set;return[l=>(a.add(l),l()),a]}();let n=e(typeof t=="function"?t(r):t);const s=new Set,o=(a,l)=>{const c=e(a,n);Object.is(n,c)||(n=c,s.forEach(u=>{u(n,l)}))};function h(a,l=new WeakSet){return arguments.length===0?n:Promise.resolve(typeof a=="function"?a(n):a).then(c=>(l.has(h)||(l.add(h),o(c,l)),n))}return typeof t=="function"&&i.forEach(a=>{a.on((l,c)=>{o(t(r),c)})}),h.on=a=>{s.add(a);const l=()=>s.delete(a);return Object.defineProperty(l,"listening",{get:()=>s.has(a)}),l},h}function X(t,e,r){t.prototype=e.prototype=r,r.constructor=t}function pe(t,e){var r=Object.create(t.prototype);for(var i in e)r[i]=e[i];return r}function R(){}var J=.7,le=1/J,I="\\s*([+-]?\\d+)\\s*",G="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",x="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ft=/^#([0-9a-f]{3,8})$/,Xt=new RegExp(`^rgb\\(${I},${I},${I}\\)$`),Yt=new RegExp(`^rgb\\(${x},${x},${x}\\)$`),Qt=new RegExp(`^rgba\\(${I},${I},${I},${G}\\)$`),er=new RegExp(`^rgba\\(${x},${x},${x},${G}\\)$`),tr=new RegExp(`^hsl\\(${G},${x},${x}\\)$`),rr=new RegExp(`^hsla\\(${G},${x},${x},${G}\\)$`),Qe={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};X(R,Ie,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:et,formatHex:et,formatHex8:ir,formatHsl:nr,formatRgb:tt,toString:tt});function et(){return this.rgb().formatHex()}function ir(){return this.rgb().formatHex8()}function nr(){return xt(this).formatHsl()}function tt(){return this.rgb().formatRgb()}function Ie(t){var e,r;return t=(t+"").trim().toLowerCase(),(e=Ft.exec(t))?(r=e[1].length,e=parseInt(e[1],16),r===6?rt(e):r===3?new f(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):r===8?Q(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):r===4?Q(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=Xt.exec(t))?new f(e[1],e[2],e[3],1):(e=Yt.exec(t))?new f(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Qt.exec(t))?Q(e[1],e[2],e[3],e[4]):(e=er.exec(t))?Q(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=tr.exec(t))?st(e[1],e[2]/100,e[3]/100,1):(e=rr.exec(t))?st(e[1],e[2]/100,e[3]/100,e[4]):Qe.hasOwnProperty(t)?rt(Qe[t]):t==="transparent"?new f(NaN,NaN,NaN,0):null}function rt(t){return new f(t>>16&255,t>>8&255,t&255,1)}function Q(t,e,r,i){return i<=0&&(t=e=r=NaN),new f(t,e,r,i)}function vt(t){return t instanceof R||(t=Ie(t)),t?(t=t.rgb(),new f(t.r,t.g,t.b,t.opacity)):new f}function fe(t,e,r,i){return arguments.length===1?vt(t):new f(t,e,r,i??1)}function f(t,e,r,i){this.r=+t,this.g=+e,this.b=+r,this.opacity=+i}X(f,fe,pe(R,{brighter(t){return t=t==null?le:Math.pow(le,t),new f(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?J:Math.pow(J,t),new f(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new f(P(this.r),P(this.g),P(this.b),he(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:it,formatHex:it,formatHex8:sr,formatRgb:nt,toString:nt}));function it(){return`#${S(this.r)}${S(this.g)}${S(this.b)}`}function sr(){return`#${S(this.r)}${S(this.g)}${S(this.b)}${S((isNaN(this.opacity)?1:this.opacity)*255)}`}function nt(){const t=he(this.opacity);return`${t===1?"rgb(":"rgba("}${P(this.r)}, ${P(this.g)}, ${P(this.b)}${t===1?")":`, ${t})`}`}function he(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function P(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function S(t){return t=P(t),(t<16?"0":"")+t.toString(16)}function st(t,e,r,i){return i<=0?t=e=r=NaN:r<=0||r>=1?t=e=NaN:e<=0&&(t=NaN),new m(t,e,r,i)}function xt(t){if(t instanceof m)return new m(t.h,t.s,t.l,t.opacity);if(t instanceof R||(t=Ie(t)),!t)return new m;if(t instanceof m)return t;t=t.rgb();var e=t.r/255,r=t.g/255,i=t.b/255,n=Math.min(e,r,i),s=Math.max(e,r,i),o=NaN,h=s-n,a=(s+n)/2;return h?(e===s?o=(r-i)/h+(r<i)*6:r===s?o=(i-e)/h+2:o=(e-r)/h+4,h/=a<.5?s+n:2-s-n,o*=60):h=a>0&&a<1?0:o,new m(o,h,a,t.opacity)}function Le(t,e,r,i){return arguments.length===1?xt(t):new m(t,e,r,i??1)}function m(t,e,r,i){this.h=+t,this.s=+e,this.l=+r,this.opacity=+i}X(m,Le,pe(R,{brighter(t){return t=t==null?le:Math.pow(le,t),new m(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?J:Math.pow(J,t),new m(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,r=this.l,i=r+(r<.5?r:1-r)*e,n=2*r-i;return new f(we(t>=240?t-240:t+120,n,i),we(t,n,i),we(t<120?t+240:t-120,n,i),this.opacity)},clamp(){return new m(ot(this.h),ee(this.s),ee(this.l),he(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=he(this.opacity);return`${t===1?"hsl(":"hsla("}${ot(this.h)}, ${ee(this.s)*100}%, ${ee(this.l)*100}%${t===1?")":`, ${t})`}`}}));function ot(t){return t=(t||0)%360,t<0?t+360:t}function ee(t){return Math.max(0,Math.min(1,t||0))}function we(t,e,r){return(t<60?e+(r-e)*t/60:t<180?r:t<240?e+(r-e)*(240-t)/60:e)*255}const or=Math.PI/180,ar=180/Math.PI,ce=18,yt=.96422,wt=1,_t=.82521,At=4/29,L=6/29,Ct=3*L*L,lr=L*L*L;function kt(t){if(t instanceof y)return new y(t.l,t.a,t.b,t.opacity);if(t instanceof $)return St(t);t instanceof f||(t=vt(t));var e=ke(t.r),r=ke(t.g),i=ke(t.b),n=_e((.2225045*e+.7168786*r+.0606169*i)/wt),s,o;return e===r&&r===i?s=o=n:(s=_e((.4360747*e+.3850649*r+.1430804*i)/yt),o=_e((.0139322*e+.0971045*r+.7141733*i)/_t)),new y(116*n-16,500*(s-n),200*(n-o),t.opacity)}function je(t,e,r,i){return arguments.length===1?kt(t):new y(t,e,r,i??1)}function y(t,e,r,i){this.l=+t,this.a=+e,this.b=+r,this.opacity=+i}X(y,je,pe(R,{brighter(t){return new y(this.l+ce*(t??1),this.a,this.b,this.opacity)},darker(t){return new y(this.l-ce*(t??1),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,r=isNaN(this.b)?t:t-this.b/200;return e=yt*Ae(e),t=wt*Ae(t),r=_t*Ae(r),new f(Ce(3.1338561*e-1.6168667*t-.4906146*r),Ce(-.9787684*e+1.9161415*t+.033454*r),Ce(.0719453*e-.2289914*t+1.4052427*r),this.opacity)}}));function _e(t){return t>lr?Math.pow(t,1/3):t/Ct+At}function Ae(t){return t>L?t*t*t:Ct*(t-At)}function Ce(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function ke(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Et(t){if(t instanceof $)return new $(t.h,t.c,t.l,t.opacity);if(t instanceof y||(t=kt(t)),t.a===0&&t.b===0)return new $(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*ar;return new $(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function ze(t,e,r,i){return arguments.length===1?Et(t):new $(r,e,t,i??1)}function hr(t,e,r,i){return arguments.length===1?Et(t):new $(t,e,r,i??1)}function $(t,e,r,i){this.h=+t,this.c=+e,this.l=+r,this.opacity=+i}function St(t){if(isNaN(t.h))return new y(t.l,0,0,t.opacity);var e=t.h*or;return new y(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}X($,hr,pe(R,{brighter(t){return new $(this.h,this.c,this.l+ce*(t??1),this.opacity)},darker(t){return new $(this.h,this.c,this.l-ce*(t??1),this.opacity)},rgb(){return St(this).rgb()}}));const te={lch:{l:[0,100],c:[0,132],h:[0,360]},lab:{l:[0,100],a:[-128,127],b:[-128,127]},rgb:{r:[0,255],g:[0,255],b:[0,255]},hsl:{h:[0,360],s:[0,1],l:[0,1]}},cr=ze(57,110,283.8),ur=V(cr),dr=(t,e)=>{switch(t.type){case"lch":{const r=ze(e.lch.raw),i=t.kind;return r[i]=re(t.value,...te.lch[i]),ie(r,e.lch.raw)?e:V(r)}case"lab":{const r=je(e.lab.raw),i=t.kind;return r[i]=re(t.value,...te.lab[i]),ie(r,e.lab.raw)?e:V(r)}case"rgb":{const r=fe(e.rgb.raw),i=t.kind;return r[i]=re(t.value,...te.rgb[i]),ie(r,e.rgb.raw)?e:V(r)}case"hsl":{const r=Le(e.hsl.raw),i=t.kind;return r[i]=re(t.value,...te.hsl[i]),ie(r,e.hsl.raw)?e:V(r)}}},v=Gt([],(t,e=ur)=>{let r=e;for(const i of t)r=dr(i,r);return r});function re(t,e,r){return Math.min(r,Math.max(e,t||0))}function at(t){return JSON.stringify(Object.entries(t).sort(([e,r])=>e[0].localeCompare(r[0])))}function ie(t,e){return at(t)===at(e)}function V(t){const e=ze(t),r=je(t),i=fe(t.formatHex()),n=Le(t.formatHex());return{lch:{values:{l:e.l,c:e.c,h:e.h},raw:e},lab:{values:{l:r.l,a:r.a,b:r.b},raw:r},rgb:{values:{r:i.r,g:i.g,b:i.b},raw:i},hsl:{values:{h:n.h,s:n.s,l:n.l},raw:n}}}function pr(t){return new Worker("/assets/generate-colors.worker-CO4ZA5Uf.js",{name:t?.name})}const lt=new pr,fr=()=>(t,e,r)=>new Promise(i=>{lt.onmessage=n=>{i(n.data.slice())},lt.postMessage([t,e,r])});var gr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,B=(t,e,r,i)=>{for(var n=i>1?void 0:i?br(e,r):e,s=t.length-1,o;s>=0;s--)(o=t[s])&&(n=(i?o(e,r,n):o(n))||n);return i&&n&&gr(e,r,n),n};let A=class extends N{constructor(){super(),this.width=500,this.height=300,this.isPressed=!1,this.generateColors=fr(),this.updateMarkerPosition=()=>{const t=this.marker,e=this.canvas;if(!t||!e)return;const r=e.getBoundingClientRect(),i=v().lch.values,n=Math.floor(i.c/132*r.width),s=Math.floor((1-i.l/100)*r.height);t.style.cssText=`transform: translate(calc(${n}px - 50%), calc(${s}px - 50%))`},this.updateCanvasColors=()=>{const t=this.canvas;if(!t)return;const e=t.getContext("2d");if(!e)return;const r=v().lch.values;this.generateColors(r.h,this.width,this.height).then(i=>{const n=new ImageData(i,this.width,this.height);e.putImageData(n,0,0)})},v.on(()=>{this.updateCanvasColors(),this.updateMarkerPosition()})}onPositionChange(t){const e=this.canvas;if(!e||!this.isPressed)return;const r=e.getBoundingClientRect(),i=Math.min(Math.max(t.clientX-r.x,0),r.width),n=Math.min(Math.max(t.clientY-r.y,0),r.height),s=Math.floor((1-n/r.height)*100),o=Math.floor(i/r.width*132);v([{type:"lch",kind:"l",value:s},{type:"lch",kind:"c",value:o}])}firstUpdated(){this.updateMarkerPosition()}updated(t){(t.has("width")||t.has("height"))&&this.updateCanvasColors()}render(){return ae`
      <div class="wrapper">
        <canvas
          @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.isPressed=!0,this.onPositionChange(t)}}
          @pointermove=${this.onPositionChange}
          @pointerup=${t=>{t.currentTarget.releasePointerCapture(t.pointerId),this.isPressed=!1}}
          width="${this.width}px"
          height="${this.height}px"
        ></canvas>
        <div class="marker"></div>
      </div>
    `}};A.styles=H`
    :host canvas {
      border-radius: 5px;
      border: 1px solid grey;
      max-width: calc(100vw - 4em);
      /* Avoid making the page scroll on mobile when we are pressing on it */
      touch-action: none;
    }

    :host .wrapper {
      position: relative;
    }

    :host .marker {
      position: absolute;
      top: 0px;
      left: 0px;
      pointer-events: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid var(--contrast);
      z-index: 1;
    }
  `;B([O({type:Number})],A.prototype,"width",2);B([O({type:Number})],A.prototype,"height",2);B([$t("canvas")],A.prototype,"canvas",2);B([$t(".marker")],A.prototype,"marker",2);B([Jt({passive:!0})],A.prototype,"onPositionChange",1);A=B([Ue("lch-paint")],A);var mr=Object.defineProperty,$r=Object.getOwnPropertyDescriptor,U=(t,e,r,i)=>{for(var n=i>1?void 0:i?$r(e,r):e,s=t.length-1,o;s>=0;s--)(o=t[s])&&(n=(i?o(e,r,n):o(n))||n);return i&&n&&mr(e,r,n),n};const Nt=20,Pt=1,He=1,vr=H`var(--contrast)`,xr=14,ht=H`
  width: ${xr}px;
  height: ${Nt+Pt*2}px;
  background: #00000000;
  box-shadow: 0 0 0 ${He}px var(--black),
    inset 0 0 0 ${He}px var(--white);
  border-radius: 3px;
  cursor: pointer;
`,yr=H`var(--track-background, #9e9e9e), var(--previous-track-background, #9e9e9e)`,ct=H`
  background: ${yr};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-shadow: 0 0 0 ${He}px ${vr};
  border-radius: 3px;
  width: 100%;
  height: ${Nt}px;
  cursor: pointer;
`;let w=class extends N{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.referenceColor=fe(0,0,0),this.valueToModify="h",this.getBackgroundRange=()=>{clearTimeout(this.throttleId);const t=this.referenceColor.copy(),e={...t};delete e[this.valueToModify];const r=JSON.stringify(e);if(this.prevBackgroundRange){if(this.prevColor===r)return this.prevBackgroundRange;const l=performance.now();if(this.timePrevOp!=null&&l-this.timePrevOp<100)return this.throttleId=window.setTimeout(()=>this.requestUpdate(),100),this.prevBackgroundRange}const i=Math.round((this.max-this.min)/this.step),n=new Uint8ClampedArray(i*4);for(let l=0;l<=i;l++){t[this.valueToModify]=l*this.step+this.min;const c=t.rgb(),u=4*l;n[u+0]=c.r,n[u+1]=c.g,n[u+2]=c.b,n[u+3]=255}const s=document.createElement("canvas");s.width=i,s.height=1;const o=new ImageData(n,i,1);s.getContext("2d",{alpha:!1}).putImageData(o,0,0);const a=s.toDataURL();return this.prevBackgroundRange=a,this.prevColor=r,this.timePrevOp=performance.now(),a}}render(){return ae`<input
      .min=${this.min}
      .max=${this.max}
      .step=${this.step}
      .value=${this.value}
      style="--previous-track-background: url(${this.prevBackgroundRange}); --track-background: url(${this.getBackgroundRange()})"
      type="range"
      @input=${t=>{const e=t.target,r=Number(e.value);this.value=Number.isNaN(r)?void 0:r}}
    />`}};w.styles=H`
    :host input[type="range"] {
      width: 100%;
      margin: 0.5px 0;
      background-color: transparent;
      -webkit-appearance: none;
    }

    :host input[type="range"]::-webkit-slider-runnable-track {
      ${ct}
    }
    :host input[type="range"]::-moz-range-track {
      ${ct}
    }

    :host input[type="range"]::-moz-range-thumb {
      ${ht}
    }
    :host input[type="range"]::-webkit-slider-thumb {
      ${ht}
      margin-top: -${Pt}px;
      -webkit-appearance: none;
    }

    :host input[type="range"]:focus {
      outline: none;
    }

    :host input[type="range"]:hover::-moz-range-thumb {
      background: #00000044;
    }
    :host input[type="range"]:hover::-webkit-slider-thumb {
      background: #00000044;
    }
    :host input[type="range"]:focus-visible::-moz-range-thumb {
      outline: -moz-mac-focusring auto 1px;
      outline-offset: 1px;
    }
    :host input[type="range"]:focus-visible::-webkit-slider-thumb {
      outline: -webkit-focus-ring-color auto 1px;
      outline-offset: 1px;
    }
  `;U([O({type:Number,reflect:!0})],w.prototype,"min",2);U([O({type:Number,reflect:!0})],w.prototype,"max",2);U([O({type:Number,reflect:!0})],w.prototype,"step",2);U([O({type:Number,reflect:!0})],w.prototype,"value",2);U([Te()],w.prototype,"referenceColor",2);U([Te()],w.prototype,"valueToModify",2);w=U([Ue("color-slider")],w);class wr{constructor(e,r){this.host=e,e.addController(this),this.cup=r,this.listener=r.on(()=>this.host.requestUpdate())}hostDisconnected(){this.listener()}}var _r=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,Mt=(t,e,r,i)=>{for(var n=i>1?void 0:i?Ar(e,r):e,s=t.length-1,o;s>=0;s--)(o=t[s])&&(n=(i?o(e,r,n):o(n))||n);return i&&n&&_r(e,r,n),n};function Ee(t){return Math.floor(t).toString(16).padStart(2,"0")}function b(t,e=2){const r=10**e;return Math.round(t*r)/r}const Se=window.matchMedia("(max-width: 595px)");let ue=class extends N{constructor(){super(),this.lchController=new wr(this,v),this.isMobile=Se.matches,this.viewListener=t=>{this.isMobile=t.matches},Se.addListener(this.viewListener)}disconnectedCallback(){Se.removeListener(this.viewListener)}renderInput({category:t,kind:e,label:r,shortName:i=e.toUpperCase(),min:n,max:s,step:o=1,mod:h=l=>l,unit:a=""}){const l=g=>Math.min(s,Math.max(n,g)),c=v(),u=c[t].values[e],d=`${t}--${e}`;return ae`
      <label for="slider-${d}">${i} (${r})</label>
      <color-slider
        .id="slider-${d}"
        .min=${n}
        .max=${s}
        .step=${o}
        .value=${u}
        .referenceColor=${c[t].raw}
        .valueToModify=${e}
        @input=${g=>{const Y=g.target,C=l(Y.value||0);Y.value=C,v([{type:t,kind:e,value:C}])}}
      ></color-slider>
      <span
        >${b(h(u),Math.floor(-Math.log(o)/Math.log(10)))}${a}</span
      >
    `}willUpdate(t){const e=new Set(t.keys());e.delete("luminance"),e.delete("chroma"),e.delete("hue"),e.size}render(){const t=v(),e=`#${Ee(t.rgb.values.r)}${Ee(t.rgb.values.g)}${Ee(t.rgb.values.b)}`;return ae`
      <div class="wrapper">
        <details open>
          <summary><h2>LCH</h2></summary>
          <div class="group">
            ${this.renderInput({category:"lch",kind:"l",label:"luminance",min:0,max:100,unit:"º"})}
            ${this.renderInput({category:"lch",kind:"c",label:"chroma",min:0,max:132})}
            ${this.renderInput({category:"lch",kind:"h",label:"hue",min:0,max:360})}

            <pre class="code-wrapper"><code class="code">LCH(${b(t.lch.values.l)}% ${b(t.lch.values.c)} ${b(t.lch.values.h)})</code></pre>
          </div>
        </details>

        <details ?open=${!this.isMobile}>
          <summary><h2>Lab</h2></summary>
          <div class="group">
            ${this.renderInput({category:"lab",kind:"l",label:"luminance",min:0,max:100,unit:"º"})}
            ${this.renderInput({category:"lab",kind:"a",label:"a",shortName:"a",min:-128,max:127})}
            ${this.renderInput({category:"lab",kind:"b",label:"b",shortName:"b",min:-128,max:127})}

            <pre class="code-wrapper"><code class='code'>Lab(${b(t.lab.values.l)}% ${b(t.lab.values.a)} ${b(t.lab.values.b)})</code></pre>
          </div>
        </details>
        <!--  -->
        <details ?open=${!this.isMobile}>
          <summary><h2>RGB</h2></summary>
          <div class="group">
            ${this.renderInput({category:"rgb",kind:"r",label:"red",min:0,max:255})}
            ${this.renderInput({category:"rgb",kind:"g",label:"green",min:0,max:255})}
            ${this.renderInput({category:"rgb",kind:"b",label:"blue",min:0,max:255})}

            <pre class="code-wrapper"><code class='code'>rgb(${b(t.rgb.values.r)} ${b(t.rgb.values.g)} ${b(t.rgb.values.b)})</code>
<code class='code'>${e}</code></pre>
          </div>
        </details>

        <details ?open=${!this.isMobile}>
          <summary><h2>HSL</h2></summary>
          <div class="group">
            ${this.renderInput({category:"hsl",kind:"h",label:"hue",min:0,max:360})}
            ${this.renderInput({category:"hsl",kind:"s",label:"saturation",min:0,step:.01,max:1,mod:r=>r*100,unit:"%"})}
            ${this.renderInput({category:"hsl",kind:"l",label:"lightness",min:0,step:.01,max:1,mod:r=>r*100,unit:"%"})}

            <pre class="code-wrapper"><code class='code'>hsl(${b(t.hsl.values.h)} ${b(t.hsl.values.s)*100}% ${b(t.hsl.values.l*100)}%)</code></pre>
          </div>
        </details>
      </div>
    `}};ue.styles=H`
    :host label {
      display: block;
    }

    :host .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 1em;
      column-gap: 2em;
      margin-bottom: 1em;
    }
    @media (max-width: 595px) {
      :host .wrapper {
        grid-template-columns: 1fr;
      }
    }

    :host .group {
      display: grid;
      grid-template-columns: 1fr 5ch;
      grid-template-rows: repeat(6, auto) 1fr;
      column-gap: 1em;
      row-gap: 0.5em;

      margin-top: 1em;
    }

    :host h2 {
      display: inline-block;
      margin: 0;
    }

    :host label {
      grid-column: span 2;
    }

    :host color-slider {
      /* Avoid making the page scroll on mobile when we are pressing on it */
      touch-action: none;
    }

    :host .code-wrapper {
      grid-column: span 2;
    }
    :host .code {
      font-family: "Fira Code", monospace;
    }
  `;Mt([Te()],ue.prototype,"isMobile",2);ue=Mt([Ue("color-picker")],ue);document.documentElement.style.backgroundColor=v().rgb.raw.formatHex();v.on(({rgb:t})=>{document.documentElement.style.backgroundColor=t.raw.formatHex()});
