import{g as s}from"./chunk-ELVWOSDS.DplWDq_q.js";import{r as a}from"./index.F28aNuxU.js";function c(e,o){Object.defineProperty(e,"name",{writable:!1,enumerable:!1,configurable:!0,value:o})}function f(e){let o=e.stack;o.startsWith(`Error: ========
`)&&(o=o.slice(16));let r=o.indexOf(`
`);return r!==-1&&(o=o.slice(r+1)),r=o.indexOf(`
`),r!==-1&&(o=o.slice(0,r+1)),r=o.indexOf("react-stack-bottom-frame"),r===0?"":(r!==-1&&(r=o.lastIndexOf(`
`,r)),r!==-1&&(o=o.slice(0,r)),o)}const t=new WeakMap,i=new WeakSet,p=(e,...o)=>{const r=new Error("========");typeof e=="function"?e=e:e&&typeof e=="object"&&"$$typeof"in e?e.$$typeof===Symbol.for("react.memo")?!e.type.name&&(s(e.type)||s(e))&&c(e.type,s(e.type)||"memo("+s(e)+")"):console.log("[CUSTOM] OTHER TYPE",e,{debugStack:r,owner:f(r)}):typeof e=="string"||console.log("[CUSTOM] OTHER TYPE",e,{debugStack:r,owner:f(r)});const n=a.createElement(e,...o);return n.props&&(t.has(n.props)&&(console.warn("[CUSTOM][PROPS] THIS SHOULD NOT EXIST: CONFLICT ON ",n.props,n),t.delete(n.props),i.add(n.props)),i.has(n.props)||t.set(n.props,r)),n};window._DEBUG_MAPPED_PROPS=t;export{f,p as h,c as s};
//# sourceMappingURL=_utils.BxSAARLI.js.map
