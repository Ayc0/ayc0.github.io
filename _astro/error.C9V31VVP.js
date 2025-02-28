/**
 * @license bippy
 *
 * Copyright (c) Aiden Bai, Million Software, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=t=>{const e=[];let r=t;for(;r.return;)e.push(r),r=r.return;return e},i=t=>{const e=t;return typeof e=="function"?e:typeof e=="object"&&e?i(e.type||e.render):null},c=t=>{const e=t;if(typeof e=="string")return e;if(typeof e!="function"&&!(typeof e=="object"&&e))return null;const r=e.displayName||e.name||null;if(r)return r;const n=i(e);return n&&(n.displayName||n.name)||null};function u(t){return t?typeof t.type=="string"?t.type:c(t):null}function p(t){const r=Object.keys(t).find(a=>a.startsWith("__reactFiber$"));return r?t[r]:void 0}function s(t){return{fiberName:u(t),fiberStack:t?o(t).map(u).filter(Boolean).reverse().join(" > "):null}}function f(t){if(t.componentStack)return t.componentStack.trim().split(`
`).map(e=>e.trim().replace(/^at (.*?) \(.*?\)$/,"$1")).reverse().join(" > ")}export{p as a,s as b,f as g};
