import{r as d,R as x}from"./index.CSLRt44l.js";var p={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=d,m=Symbol.for("react.element"),y=Symbol.for("react.fragment"),h=Object.prototype.hasOwnProperty,j=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function a(t,e,i){var s,n={},o=null,c=null;i!==void 0&&(o=""+i),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(c=e.ref);for(s in e)h.call(e,s)&&!v.hasOwnProperty(s)&&(n[s]=e[s]);if(t&&t.defaultProps)for(s in e=t.defaultProps,e)n[s]===void 0&&(n[s]=e[s]);return{$$typeof:m,type:t,key:o,ref:c,props:n,_owner:j.current}}l.Fragment=y;l.jsx=a;l.jsxs=a;p.exports=l;var r=p.exports;const S=({unit:t,description:e})=>{const[i,s]=d.useState(null),n=d.useRef(null);return x.useEffect(()=>{const o=n.current;if(!o)return;const c=new ResizeObserver(f=>{const u=f[0];d.startTransition(()=>{s(u.contentRect.width)})});return c.observe(o),()=>{c.unobserve(o)}},[]),typeof CSS<"u"&&!CSS.supports("width",`1${t}`)?r.jsxs(r.Fragment,{children:[r.jsx("span",{style:{gridRow:"span 2"}}),r.jsxs("span",{style:{color:"var(--danger)",gridColumn:"span 2"},children:[r.jsxs("code",{children:["“",t,"”"]})," isn’t supported"]}),r.jsx("span",{className:"description",children:e})]}):r.jsxs(r.Fragment,{children:[r.jsx("div",{ref:n,style:{justifySelf:"center",width:`1${t}`,height:`1${t}`,background:"var(--color)",gridRow:"span 2"}}),r.jsx("code",{children:`1${t}`}),r.jsx("code",{children:i&&`= ${i}px`}),r.jsx("span",{className:"description",children:e})]})};export{S as Unit};
