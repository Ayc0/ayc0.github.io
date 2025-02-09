/**
 * @license bippy
 *
 * Copyright (c) Aiden Bai, Million Software, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=t=>{const e=[];let r=t;for(;r.return;)e.push(r),r=r.return;return e},u=t=>{const e=t;return typeof e=="function"?e:typeof e=="object"&&e?u(e.type||e.render):null},p=t=>{const e=t;if(typeof e!="function"&&!(typeof e=="object"&&e))return null;const r=e.displayName||e.name||null;if(r)return r;const n=u(e);return n&&(n.displayName||n.name)||null};export{p as a,a as g};
