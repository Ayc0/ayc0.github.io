/**
 * @license bippy
 *
 * Copyright (c) Aiden Bai, Million Software, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T="0.3.8",O=`bippy-${T}`,_=Object.defineProperty,b=Object.prototype.hasOwnProperty,s=()=>{},h=t=>{try{Function.prototype.toString.call(t).indexOf("^_^")>-1&&setTimeout(()=>{throw new Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},g=(t=l())=>"getFiberRoots"in t,v=!1,f=void 0,d=(t=l())=>v?!0:(typeof t.inject=="function"&&(f=t.inject.toString()),!!f?.includes("(injected)")),u=new Set,A=t=>{const e=new Map;let n=0,r={checkDCE:h,supportsFiber:!0,supportsFlight:!0,hasUnsupportedRendererAttached:!1,renderers:e,onCommitFiberRoot:s,onCommitFiberUnmount:s,onPostCommitFiberRoot:s,inject(o){const i=++n;return e.set(i,o),r._instrumentationIsActive||(r._instrumentationIsActive=!0,u.forEach(a=>a())),i},_instrumentationSource:O,_instrumentationIsActive:!1};try{_(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{get(){return r},set(a){if(a&&typeof a=="object"){const p=r.renderers;r=a,p.size>0&&(p.forEach((m,R)=>{a.renderers.set(R,m)}),c(t))}},configurable:!0,enumerable:!0});const o=window.hasOwnProperty;let i=!1;_(window,"hasOwnProperty",{value:function(){try{return!i&&arguments[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__"?(globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0):o.apply(this,arguments)}catch{return o.apply(this,arguments)}},configurable:!0,writable:!0})}catch{c(t)}return r},c=t=>{try{const e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!e)return;if(!e._instrumentationSource){if(e.checkDCE=h,e.supportsFiber=!0,e.supportsFlight=!0,e.hasUnsupportedRendererAttached=!1,e._instrumentationSource=O,e._instrumentationIsActive=!1,e.renderers.size){e._instrumentationIsActive=!0,u.forEach(r=>r());return}const n=e.inject;d(e)&&!g()&&(v=!0,e.inject({scheduleRefresh(){}})&&(e._instrumentationIsActive=!0)),e.inject=r=>{const o=n(r);return e._instrumentationIsActive=!0,u.forEach(i=>i()),o}}(e.renderers.size||e._instrumentationIsActive||d())&&t?.()}catch{}},E=()=>b.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),l=t=>E()?(c(t),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):A(t),w=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),D=()=>{try{w()&&l()}catch{}},L=t=>{const e=[];let n=t;for(;n.return;)e.push(n),n=n.return;return e},y=t=>{const e=t;return typeof e=="function"?e:typeof e=="object"&&e?y(e.type||e.render):null},j=t=>{const e=t;if(typeof e=="string")return e;if(typeof e!="function"&&!(typeof e=="object"&&e))return null;const n=e.displayName||e.name||null;if(n)return n;const r=y(e);return r&&(r.displayName||r.name)||null};/**
 * @license bippy
 *
 * Copyright (c) Aiden Bai, Million Software, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */D();export{L as a,j as g};
//# sourceMappingURL=chunk-ELVWOSDS.DplWDq_q.js.map
