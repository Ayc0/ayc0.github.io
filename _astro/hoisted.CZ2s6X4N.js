/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=globalThis,At=st.ShadowRoot&&(st.ShadyCSS===void 0||st.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ct=Symbol(),Ut=new WeakMap;let se=class{constructor(t,r,s){if(this._$cssResult$=!0,s!==Ct)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(At&&t===void 0){const s=r!==void 0&&r.length===1;s&&(t=Ut.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ut.set(r,t))}return t}toString(){return this.cssText}};const _e=e=>new se(typeof e=="string"?e:e+"",void 0,Ct),H=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new se(r,e,Ct)},Ae=(e,t)=>{if(At)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of t){const s=document.createElement("style"),i=st.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=r.cssText,e.appendChild(s)}},Tt=At?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const s of t.cssRules)r+=s.cssText;return _e(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ce,defineProperty:ke,getOwnPropertyDescriptor:Ee,getOwnPropertyNames:Pe,getOwnPropertySymbols:Se,getPrototypeOf:Me}=Object,dt=globalThis,It=dt.trustedTypes,Ne=It?It.emptyScript:"",He=dt.reactiveElementPolyfillSupport,W=(e,t)=>e,it={toAttribute(e,t){switch(t){case Boolean:e=e?Ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},kt=(e,t)=>!Ce(e,t),jt={attribute:!0,type:String,converter:it,reflect:!1,hasChanged:kt};Symbol.metadata??=Symbol("metadata"),dt.litPropertyMetadata??=new WeakMap;class T extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=jt){if(r.state&&(r.attribute=!1),this._$Ei(),this.elementProperties.set(t,r),!r.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,r);i!==void 0&&ke(this.prototype,t,i)}}static getPropertyDescriptor(t,r,s){const{get:i,set:n}=Ee(this.prototype,t)??{get(){return this[r]},set(o){this[r]=o}};return{get(){return i?.call(this)},set(o){const l=i?.call(this);n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jt}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;const t=Me(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){const r=this.properties,s=[...Pe(r),...Se(r)];for(const i of s)this.createProperty(i,r[i])}const t=this[Symbol.metadata];if(t!==null){const r=litPropertyMetadata.get(t);if(r!==void 0)for(const[s,i]of r)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[r,s]of this.elementProperties){const i=this._$Eu(r,s);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)r.unshift(Tt(i))}else t!==void 0&&r.push(Tt(t));return r}static _$Eu(t,r){const s=r.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,r=this.constructor.elementProperties;for(const s of r.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ae(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,s){this._$AK(t,s)}_$EC(t,r){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:it).toAttribute(r,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,r){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:it;this._$Em=i,this[i]=o.fromAttribute(r,n.type),this._$Em=null}}requestUpdate(t,r,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??kt)(this[t],r))return;this.P(t,r,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,r,s){this._$AL.has(t)||this._$AL.set(t,r),s.reflect===!0&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s)n.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],n)}let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(r)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach(r=>this._$EC(r,this[r])),this._$EU()}updated(t){}firstUpdated(t){}}T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[W("elementProperties")]=new Map,T[W("finalized")]=new Map,He?.({ReactiveElement:T}),(dt.reactiveElementVersions??=[]).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=globalThis,nt=Et.trustedTypes,Lt=nt?nt.createPolicy("lit-html",{createHTML:e=>e}):void 0,ie="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,ne="?"+_,Oe=`<${ne}>`,N=document,V=()=>N.createComment(""),Z=e=>e===null||typeof e!="object"&&typeof e!="function",oe=Array.isArray,Re=e=>oe(e)||typeof e?.[Symbol.iterator]=="function",gt=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zt=/-->/g,Dt=/>/g,k=RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bt=/'/g,qt=/"/g,ae=/^(?:script|style|textarea|title)$/i,Ue=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),ot=Ue(1),L=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Wt=new WeakMap,E=N.createTreeWalker(N,129);function he(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lt!==void 0?Lt.createHTML(t):t}const Te=(e,t)=>{const r=e.length-1,s=[];let i,n=t===2?"<svg>":"",o=B;for(let l=0;l<r;l++){const a=e[l];let h,d,c=-1,g=0;for(;g<a.length&&(o.lastIndex=g,d=o.exec(a),d!==null);)g=o.lastIndex,o===B?d[1]==="!--"?o=zt:d[1]!==void 0?o=Dt:d[2]!==void 0?(ae.test(d[2])&&(i=RegExp("</"+d[2],"g")),o=k):d[3]!==void 0&&(o=k):o===k?d[0]===">"?(o=i??B,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?k:d[3]==='"'?qt:Bt):o===qt||o===Bt?o=k:o===zt||o===Dt?o=B:(o=k,i=void 0);const b=o===k&&e[l+1].startsWith("/>")?" ":"";n+=o===B?a+Oe:c>=0?(s.push(h),a.slice(0,c)+ie+a.slice(c)+_+b):a+_+(c===-2?l:b)}return[he(e,n+(e[r]||"<?>")+(t===2?"</svg>":"")),s]};class J{constructor({strings:t,_$litType$:r},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[h,d]=Te(t,r);if(this.el=J.createElement(h,s),E.currentNode=this.el.content,r===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=E.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(ie)){const g=d[o++],b=i.getAttribute(c).split(_),C=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:C[2],strings:b,ctor:C[1]==="."?je:C[1]==="?"?Le:C[1]==="@"?ze:ut}),i.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(ae.test(i.tagName)){const c=i.textContent.split(_),g=c.length-1;if(g>0){i.textContent=nt?nt.emptyScript:"";for(let b=0;b<g;b++)i.append(c[b],V()),E.nextNode(),a.push({type:2,index:++n});i.append(c[g],V())}}}else if(i.nodeType===8)if(i.data===ne)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:n}),c+=_.length-1}n++}}static createElement(t,r){const s=N.createElement("template");return s.innerHTML=t,s}}function z(e,t,r=e,s){if(t===L)return t;let i=s!==void 0?r._$Co?.[s]:r._$Cl;const n=Z(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(e),i._$AT(e,r,s)),s!==void 0?(r._$Co??=[])[s]=i:r._$Cl=i),i!==void 0&&(t=z(e,i._$AS(e,t.values),i,s)),t}class Ie{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:s}=this._$AD,i=(t?.creationScope??N).importNode(r,!0);E.currentNode=i;let n=E.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new K(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new De(n,this,t)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(n=E.nextNode(),o++)}return E.currentNode=N,i}p(t){let r=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,r),r+=s.strings.length-2):s._$AI(t[r])),r++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,s,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=z(this,t,r),Z(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Re(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==u&&Z(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:r,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=J.createElement(he(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(r);else{const n=new Ie(i,this),o=n.u(this.options);n.p(r),this.T(o),this._$AH=n}}_$AC(t){let r=Wt.get(t.strings);return r===void 0&&Wt.set(t.strings,r=new J(t)),r}k(t){oe(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let s,i=0;for(const n of t)i===r.length?r.push(s=new K(this.S(V()),this.S(V()),this,this.options)):s=r[i],s._$AI(n),i++;i<r.length&&(this._$AR(s&&s._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ut{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,s,i,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,r=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=z(this,t,r,0),o=!Z(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const l=t;let a,h;for(t=n[0],a=0;a<n.length-1;a++)h=z(this,l[s+a],r,a),h===L&&(h=this._$AH[a]),o||=!Z(h)||h!==this._$AH[a],h===u?t=u:t!==u&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class je extends ut{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}class Le extends ut{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class ze extends ut{constructor(t,r,s,i,n){super(t,r,s,i,n),this.type=5}_$AI(t,r=this){if((t=z(this,t,r,0)??u)===L)return;const s=this._$AH,i=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class De{constructor(t,r,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const Be=Et.litHtmlPolyfillSupport;Be?.(J,K),(Et.litHtmlVersions??=[]).push("3.1.3");const qe=(e,t,r)=>{const s=r?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const n=r?.renderBefore??null;s._$litPart$=i=new K(t.insertBefore(V(),n),n,void 0,r??{})}return i._$AI(e),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class S extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=qe(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}S._$litElement$=!0,S.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:S});const We=globalThis.litElementPolyfillSupport;We?.({LitElement:S});(globalThis.litElementVersions??=[]).push("4.0.5");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ve={attribute:!0,type:String,converter:it,reflect:!1,hasChanged:kt},Ze=(e=Ve,t,r)=>{const{kind:s,metadata:i}=r;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(r.name,e),s==="accessor"){const{name:o}=r;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,e)},init(l){return l!==void 0&&this.P(o,void 0,e),l}}}if(s==="setter"){const{name:o}=r;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,e)}}throw Error("Unsupported decorator location: "+s)};function O(e){return(t,r)=>typeof r=="object"?Ze(e,t,r):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(e,t,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function St(e){return O({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Je(e){return(t,r)=>{const s=typeof t=="function"?t:t[r];Object.assign(s,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le(e,t){return(r,s,i)=>{const n=o=>o.renderRoot?.querySelector(e)??null;return Fe(r,s,{get(){return n(this)}})}}function Ge(e,t=r=>r){const[r,s]=function(){const a=new Set;return[h=>(a.add(h),h()),a]}();let i=t(typeof e=="function"?e(r):e);const n=new Set,o=(a,h)=>{const d=t(a,i);Object.is(i,d)||(i=d,n.forEach(c=>{c(i,h)}))};function l(a,h=new WeakSet){return arguments.length===0?i:Promise.resolve(typeof a=="function"?a(i):a).then(d=>(h.has(l)||(h.add(l),o(d,h)),i))}return typeof e=="function"&&s.forEach(a=>{a.on((h,d)=>{o(e(r),d)})}),l.on=a=>{n.add(a);const h=()=>n.delete(a);return Object.defineProperty(h,"listening",{get:()=>n.has(a)}),h},l}function X(e,t,r){e.prototype=t.prototype=r,r.constructor=e}function pt(e,t){var r=Object.create(e.prototype);for(var s in t)r[s]=t[s];return r}function R(){}var F=.7,at=1/F,I="\\s*([+-]?\\d+)\\s*",G="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",y="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ke=/^#([0-9a-f]{3,8})$/,Xe=new RegExp(`^rgb\\(${I},${I},${I}\\)$`),Ye=new RegExp(`^rgb\\(${y},${y},${y}\\)$`),Qe=new RegExp(`^rgba\\(${I},${I},${I},${G}\\)$`),tr=new RegExp(`^rgba\\(${y},${y},${y},${G}\\)$`),er=new RegExp(`^hsl\\(${G},${y},${y}\\)$`),rr=new RegExp(`^hsla\\(${G},${y},${y},${G}\\)$`),Vt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};X(R,Mt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Zt,formatHex:Zt,formatHex8:sr,formatHsl:ir,formatRgb:Jt,toString:Jt});function Zt(){return this.rgb().formatHex()}function sr(){return this.rgb().formatHex8()}function ir(){return de(this).formatHsl()}function Jt(){return this.rgb().formatRgb()}function Mt(e){var t,r;return e=(e+"").trim().toLowerCase(),(t=Ke.exec(e))?(r=t[1].length,t=parseInt(t[1],16),r===6?Ft(t):r===3?new p(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):r===8?Y(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):r===4?Y(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Xe.exec(e))?new p(t[1],t[2],t[3],1):(t=Ye.exec(e))?new p(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Qe.exec(e))?Y(t[1],t[2],t[3],t[4]):(t=tr.exec(e))?Y(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=er.exec(e))?Xt(t[1],t[2]/100,t[3]/100,1):(t=rr.exec(e))?Xt(t[1],t[2]/100,t[3]/100,t[4]):Vt.hasOwnProperty(e)?Ft(Vt[e]):e==="transparent"?new p(NaN,NaN,NaN,0):null}function Ft(e){return new p(e>>16&255,e>>8&255,e&255,1)}function Y(e,t,r,s){return s<=0&&(e=t=r=NaN),new p(e,t,r,s)}function ce(e){return e instanceof R||(e=Mt(e)),e?(e=e.rgb(),new p(e.r,e.g,e.b,e.opacity)):new p}function ft(e,t,r,s){return arguments.length===1?ce(e):new p(e,t,r,s??1)}function p(e,t,r,s){this.r=+e,this.g=+t,this.b=+r,this.opacity=+s}X(p,ft,pt(R,{brighter(e){return e=e==null?at:Math.pow(at,e),new p(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?F:Math.pow(F,e),new p(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new p(M(this.r),M(this.g),M(this.b),ht(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Gt,formatHex:Gt,formatHex8:nr,formatRgb:Kt,toString:Kt}));function Gt(){return`#${P(this.r)}${P(this.g)}${P(this.b)}`}function nr(){return`#${P(this.r)}${P(this.g)}${P(this.b)}${P((isNaN(this.opacity)?1:this.opacity)*255)}`}function Kt(){const e=ht(this.opacity);return`${e===1?"rgb(":"rgba("}${M(this.r)}, ${M(this.g)}, ${M(this.b)}${e===1?")":`, ${e})`}`}function ht(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function M(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function P(e){return e=M(e),(e<16?"0":"")+e.toString(16)}function Xt(e,t,r,s){return s<=0?e=t=r=NaN:r<=0||r>=1?e=t=NaN:t<=0&&(e=NaN),new m(e,t,r,s)}function de(e){if(e instanceof m)return new m(e.h,e.s,e.l,e.opacity);if(e instanceof R||(e=Mt(e)),!e)return new m;if(e instanceof m)return e;e=e.rgb();var t=e.r/255,r=e.g/255,s=e.b/255,i=Math.min(t,r,s),n=Math.max(t,r,s),o=NaN,l=n-i,a=(n+i)/2;return l?(t===n?o=(r-s)/l+(r<s)*6:r===n?o=(s-t)/l+2:o=(t-r)/l+4,l/=a<.5?n+i:2-n-i,o*=60):l=a>0&&a<1?0:o,new m(o,l,a,e.opacity)}function Nt(e,t,r,s){return arguments.length===1?de(e):new m(e,t,r,s??1)}function m(e,t,r,s){this.h=+e,this.s=+t,this.l=+r,this.opacity=+s}X(m,Nt,pt(R,{brighter(e){return e=e==null?at:Math.pow(at,e),new m(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?F:Math.pow(F,e),new m(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,r=this.l,s=r+(r<.5?r:1-r)*t,i=2*r-s;return new p(bt(e>=240?e-240:e+120,i,s),bt(e,i,s),bt(e<120?e+240:e-120,i,s),this.opacity)},clamp(){return new m(Yt(this.h),Q(this.s),Q(this.l),ht(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=ht(this.opacity);return`${e===1?"hsl(":"hsla("}${Yt(this.h)}, ${Q(this.s)*100}%, ${Q(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Yt(e){return e=(e||0)%360,e<0?e+360:e}function Q(e){return Math.max(0,Math.min(1,e||0))}function bt(e,t,r){return(e<60?t+(r-t)*e/60:e<180?r:e<240?t+(r-t)*(240-e)/60:t)*255}const or=Math.PI/180,ar=180/Math.PI,lt=18,ue=.96422,pe=1,fe=.82521,ge=4/29,j=6/29,be=3*j*j,hr=j*j*j;function me(e){if(e instanceof v)return new v(e.l,e.a,e.b,e.opacity);if(e instanceof $)return xe(e);e instanceof p||(e=ce(e));var t=yt(e.r),r=yt(e.g),s=yt(e.b),i=mt((.2225045*t+.7168786*r+.0606169*s)/pe),n,o;return t===r&&r===s?n=o=i:(n=mt((.4360747*t+.3850649*r+.1430804*s)/ue),o=mt((.0139322*t+.0971045*r+.7141733*s)/fe)),new v(116*i-16,500*(n-i),200*(i-o),e.opacity)}function Ht(e,t,r,s){return arguments.length===1?me(e):new v(e,t,r,s??1)}function v(e,t,r,s){this.l=+e,this.a=+t,this.b=+r,this.opacity=+s}X(v,Ht,pt(R,{brighter(e){return new v(this.l+lt*(e??1),this.a,this.b,this.opacity)},darker(e){return new v(this.l-lt*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,r=isNaN(this.b)?e:e-this.b/200;return t=ue*$t(t),e=pe*$t(e),r=fe*$t(r),new p(xt(3.1338561*t-1.6168667*e-.4906146*r),xt(-.9787684*t+1.9161415*e+.033454*r),xt(.0719453*t-.2289914*e+1.4052427*r),this.opacity)}}));function mt(e){return e>hr?Math.pow(e,1/3):e/be+ge}function $t(e){return e>j?e*e*e:be*(e-ge)}function xt(e){return 255*(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function yt(e){return(e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function $e(e){if(e instanceof $)return new $(e.h,e.c,e.l,e.opacity);if(e instanceof v||(e=me(e)),e.a===0&&e.b===0)return new $(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*ar;return new $(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function Ot(e,t,r,s){return arguments.length===1?$e(e):new $(r,t,e,1)}function lr(e,t,r,s){return arguments.length===1?$e(e):new $(e,t,r,s??1)}function $(e,t,r,s){this.h=+e,this.c=+t,this.l=+r,this.opacity=+s}function xe(e){if(isNaN(e.h))return new v(e.l,0,0,e.opacity);var t=e.h*or;return new v(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}X($,lr,pt(R,{brighter(e){return new $(this.h,this.c,this.l+lt*(e??1),this.opacity)},darker(e){return new $(this.h,this.c,this.l-lt*(e??1),this.opacity)},rgb(){return xe(this).rgb()}}));const tt={lch:{l:[0,100],c:[0,132],h:[0,360]},lab:{l:[0,100],a:[-128,127],b:[-128,127]},rgb:{r:[0,255],g:[0,255],b:[0,255]},hsl:{h:[0,360],s:[0,1],l:[0,1]}},cr=Ot(57,110,283.8),dr=q(cr),ur=(e,t)=>{switch(e.type){case"lch":{const r=Ot(t.lch.raw),s=e.kind;return r[s]=et(e.value,...tt.lch[s]),rt(r,t.lch.raw)?t:q(r)}case"lab":{const r=Ht(t.lab.raw),s=e.kind;return r[s]=et(e.value,...tt.lab[s]),rt(r,t.lab.raw)?t:q(r)}case"rgb":{const r=ft(t.rgb.raw),s=e.kind;return r[s]=et(e.value,...tt.rgb[s]),rt(r,t.rgb.raw)?t:q(r)}case"hsl":{const r=Nt(t.hsl.raw),s=e.kind;return r[s]=et(e.value,...tt.hsl[s]),rt(r,t.hsl.raw)?t:q(r)}}},x=Ge([],(e,t=dr)=>{let r=t;for(const s of e)r=ur(s,r);return r});function et(e,t,r){return Math.min(r,Math.max(t,e||0))}function Qt(e){return JSON.stringify(Object.entries(e).sort(([t,r])=>t[0].localeCompare(r[0])))}function rt(e,t){return Qt(e)===Qt(t)}function q(e){const t=Ot(e),r=Ht(e),s=ft(e.formatHex()),i=Nt(e.formatHex());return{lch:{values:{l:t.l,c:t.c,h:t.h},raw:t},lab:{values:{l:r.l,a:r.a,b:r.b},raw:r},rgb:{values:{r:s.r,g:s.g,b:s.b},raw:s},hsl:{values:{h:i.h,s:i.s,l:i.l},raw:i}}}function pr(e){return new Worker("/_astro/generate-colors.worker-CO4ZA5Uf.js",{name:e?.name})}const te=new pr,fr=()=>(e,t,r)=>new Promise(s=>{te.onmessage=i=>{s(i.data.slice())},te.postMessage([e,t,r])});var gr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,D=(e,t,r,s)=>{for(var i=s>1?void 0:s?br(t,r):t,n=e.length-1,o;n>=0;n--)(o=e[n])&&(i=(s?o(t,r,i):o(i))||i);return s&&i&&gr(t,r,i),i};let A=class extends S{constructor(){super(),this.width=500,this.height=300,this.isPressed=!1,this.generateColors=fr(),this.updateMarkerPosition=()=>{const e=this.marker,t=this.canvas;if(!e||!t)return;const r=t.getBoundingClientRect(),s=x().lch.values,i=Math.floor(s.c/132*r.width),n=Math.floor((1-s.l/100)*r.height);e.style.cssText=`transform: translate(calc(${i}px - 50%), calc(${n}px - 50%))`},this.updateCanvasColors=()=>{const e=this.canvas;if(!e)return;const t=e.getContext("2d");if(!t)return;const r=x().lch.values;this.generateColors(r.h,this.width,this.height).then(s=>{const i=new ImageData(s,this.width,this.height);t.putImageData(i,0,0)})},x.on(()=>{this.updateCanvasColors(),this.updateMarkerPosition()})}onPositionChange(e){const t=this.canvas;if(!t||!this.isPressed)return;const r=t.getBoundingClientRect(),s=Math.min(Math.max(e.clientX-r.x,0),r.width),i=Math.min(Math.max(e.clientY-r.y,0),r.height),n=Math.floor((1-i/r.height)*100),o=Math.floor(s/r.width*132);x([{type:"lch",kind:"l",value:n},{type:"lch",kind:"c",value:o}])}firstUpdated(){this.updateMarkerPosition()}updated(e){(e.has("width")||e.has("height"))&&this.updateCanvasColors()}render(){return ot`
      <div class="wrapper">
        <canvas
          @pointerdown=${e=>{e.currentTarget.setPointerCapture(e.pointerId),this.isPressed=!0,this.onPositionChange(e)}}
          @pointermove=${this.onPositionChange}
          @pointerup=${e=>{e.currentTarget.releasePointerCapture(e.pointerId),this.isPressed=!1}}
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
  `;D([O({type:Number})],A.prototype,"width",2);D([O({type:Number})],A.prototype,"height",2);D([le("canvas")],A.prototype,"canvas",2);D([le(".marker")],A.prototype,"marker",2);D([Je({passive:!0})],A.prototype,"onPositionChange",1);A=D([Pt("lch-paint")],A);var mr=Object.defineProperty,$r=Object.getOwnPropertyDescriptor,U=(e,t,r,s)=>{for(var i=s>1?void 0:s?$r(t,r):t,n=e.length-1,o;n>=0;n--)(o=e[n])&&(i=(s?o(t,r,i):o(i))||i);return s&&i&&mr(t,r,i),i};const ye=20,ve=1,_t=1,xr=H`var(--contrast)`,yr=14,ee=H`
  width: ${yr}px;
  height: ${ye+ve*2}px;
  background: #00000000;
  box-shadow: 0 0 0 ${_t}px var(--black),
    inset 0 0 0 ${_t}px var(--white);
  border-radius: 3px;
  cursor: pointer;
`,vr=H`var(--track-background, #9e9e9e), var(--previous-track-background, #9e9e9e)`,re=H`
  background: ${vr};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-shadow: 0 0 0 ${_t}px ${xr};
  border-radius: 3px;
  width: 100%;
  height: ${ye}px;
  cursor: pointer;
`;let w=class extends S{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.referenceColor=ft(0,0,0),this.valueToModify="h",this.getBackgroundRange=()=>{clearTimeout(this.throttleId);const e=this.referenceColor.copy(),t={...e};delete t[this.valueToModify];const r=JSON.stringify(t);if(this.prevBackgroundRange){if(this.prevColor===r)return this.prevBackgroundRange;const h=performance.now();if(this.timePrevOp!=null&&h-this.timePrevOp<100)return this.throttleId=window.setTimeout(()=>this.requestUpdate(),100),this.prevBackgroundRange}const s=Math.round((this.max-this.min)/this.step),i=new Uint8ClampedArray(s*4);for(let h=0;h<=s;h++){e[this.valueToModify]=h*this.step+this.min;const d=e.rgb(),c=4*h;i[c+0]=d.r,i[c+1]=d.g,i[c+2]=d.b,i[c+3]=255}const n=document.createElement("canvas");n.width=s,n.height=1;const o=new ImageData(i,s,1);n.getContext("2d",{alpha:!1}).putImageData(o,0,0);const a=n.toDataURL();return this.prevBackgroundRange=a,this.prevColor=r,this.timePrevOp=performance.now(),a}}render(){return ot`<input
      .min=${this.min}
      .max=${this.max}
      .step=${this.step}
      .value=${this.value}
      style="--previous-track-background: url(${this.prevBackgroundRange}); --track-background: url(${this.getBackgroundRange()})"
      type="range"
      @input=${e=>{const t=e.target,r=Number(t.value);this.value=Number.isNaN(r)?void 0:r}}
    />`}};w.styles=H`
    :host input[type="range"] {
      width: 100%;
      margin: 0.5px 0;
      background-color: transparent;
      -webkit-appearance: none;
    }

    :host input[type="range"]::-webkit-slider-runnable-track {
      ${re}
    }
    :host input[type="range"]::-moz-range-track {
      ${re}
    }

    :host input[type="range"]::-moz-range-thumb {
      ${ee}
    }
    :host input[type="range"]::-webkit-slider-thumb {
      ${ee}
      margin-top: -${ve}px;
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
  `;U([O({type:Number,reflect:!0})],w.prototype,"min",2);U([O({type:Number,reflect:!0})],w.prototype,"max",2);U([O({type:Number,reflect:!0})],w.prototype,"step",2);U([O({type:Number,reflect:!0})],w.prototype,"value",2);U([St()],w.prototype,"referenceColor",2);U([St()],w.prototype,"valueToModify",2);w=U([Pt("color-slider")],w);class wr{constructor(t,r){this.host=t,t.addController(this),this.cup=r,this.listener=r.on(()=>this.host.requestUpdate())}hostDisconnected(){this.listener()}}var _r=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,we=(e,t,r,s)=>{for(var i=s>1?void 0:s?Ar(t,r):t,n=e.length-1,o;n>=0;n--)(o=e[n])&&(i=(s?o(t,r,i):o(i))||i);return s&&i&&_r(t,r,i),i};function vt(e){return Math.floor(e).toString(16).padStart(2,"0")}function f(e,t=2){const r=10**t;return Math.round(e*r)/r}const wt=window.matchMedia("(max-width: 595px)");let ct=class extends S{constructor(){super(),this.lchController=new wr(this,x),this.isMobile=wt.matches,this.viewListener=e=>{this.isMobile=e.matches},wt.addListener(this.viewListener)}disconnectedCallback(){wt.removeListener(this.viewListener)}renderInput({category:e,kind:t,label:r,shortName:s=t.toUpperCase(),min:i,max:n,step:o=1,mod:l=h=>h,unit:a=""}){const h=b=>Math.min(n,Math.max(i,b)),d=x(),c=d[e].values[t],g=`${e}--${t}`;return ot`
      <label for="slider-${g}">${s} (${r})</label>
      <color-slider
        .id="slider-${g}"
        .min=${i}
        .max=${n}
        .step=${o}
        .value=${c}
        .referenceColor=${d[e].raw}
        .valueToModify=${t}
        @input=${b=>{const C=b.target,Rt=h(C.value||0);C.value=Rt,x([{type:e,kind:t,value:Rt}])}}
      ></color-slider>
      <span
        >${f(l(c),Math.floor(-Math.log(o)/Math.log(10)))}${a}</span
      >
    `}willUpdate(e){const t=new Set(e.keys());t.delete("luminance"),t.delete("chroma"),t.delete("hue"),t.size}render(){const e=x(),t=`#${vt(e.rgb.values.r)}${vt(e.rgb.values.g)}${vt(e.rgb.values.b)}`;return ot`
      <div class="wrapper">
        <details open>
          <summary><h2>LCH</h2></summary>
          <div class="group">
            ${this.renderInput({category:"lch",kind:"l",label:"luminance",min:0,max:100,unit:"º"})}
            ${this.renderInput({category:"lch",kind:"c",label:"chroma",min:0,max:132})}
            ${this.renderInput({category:"lch",kind:"h",label:"hue",min:0,max:360})}

            <pre class="code-wrapper"><code class="code">LCH(${f(e.lch.values.l)}% ${f(e.lch.values.c)} ${f(e.lch.values.h)})</code></pre>
          </div>
        </details>

        <details ?open=${!this.isMobile}>
          <summary><h2>Lab</h2></summary>
          <div class="group">
            ${this.renderInput({category:"lab",kind:"l",label:"luminance",min:0,max:100,unit:"º"})}
            ${this.renderInput({category:"lab",kind:"a",label:"a",shortName:"a",min:-128,max:127})}
            ${this.renderInput({category:"lab",kind:"b",label:"b",shortName:"b",min:-128,max:127})}

            <pre class="code-wrapper"><code class='code'>Lab(${f(e.lab.values.l)}% ${f(e.lab.values.a)} ${f(e.lab.values.b)})</code></pre>
          </div>
        </details>
        <!--  -->
        <details ?open=${!this.isMobile}>
          <summary><h2>RGB</h2></summary>
          <div class="group">
            ${this.renderInput({category:"rgb",kind:"r",label:"red",min:0,max:255})}
            ${this.renderInput({category:"rgb",kind:"g",label:"green",min:0,max:255})}
            ${this.renderInput({category:"rgb",kind:"b",label:"blue",min:0,max:255})}

            <pre class="code-wrapper"><code class='code'>rgb(${f(e.rgb.values.r)} ${f(e.rgb.values.g)} ${f(e.rgb.values.b)})</code>
<code class='code'>${t}</code></pre>
          </div>
        </details>

        <details ?open=${!this.isMobile}>
          <summary><h2>HSL</h2></summary>
          <div class="group">
            ${this.renderInput({category:"hsl",kind:"h",label:"hue",min:0,max:360})}
            ${this.renderInput({category:"hsl",kind:"s",label:"saturation",min:0,step:.01,max:1,mod:r=>r*100,unit:"%"})}
            ${this.renderInput({category:"hsl",kind:"l",label:"lightness",min:0,step:.01,max:1,mod:r=>r*100,unit:"%"})}

            <pre class="code-wrapper"><code class='code'>hsl(${f(e.hsl.values.h)} ${f(e.hsl.values.s)*100}% ${f(e.hsl.values.l*100)}%)</code></pre>
          </div>
        </details>
      </div>
    `}};ct.styles=H`
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
  `;we([St()],ct.prototype,"isMobile",2);ct=we([Pt("color-picker")],ct);document.documentElement.style.backgroundColor=x().rgb.raw.formatHex();x.on(({rgb:e})=>{document.documentElement.style.backgroundColor=e.raw.formatHex()});
