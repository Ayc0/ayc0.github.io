import{g as s}from"./chunk-ELVWOSDS.DplWDq_q.js";import{r as c}from"./index.F28aNuxU.js";function f(e){let n=e.stack;n.startsWith(`Error: ========
`)&&(n=n.slice(16));let o=n.indexOf(`
`);return o!==-1&&(n=n.slice(o+1)),o=n.indexOf(`
`),o!==-1&&(n=n.slice(0,o+1)),o=n.indexOf("react-stack-bottom-frame"),o===0?"":(o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1&&(n=n.slice(0,o)),n)}const t=new WeakMap,i=new WeakSet,O=(e,...n)=>{const o=new Error("========");typeof e=="function"?e=e:e&&typeof e=="object"&&"$$typeof"in e?e.$$typeof===Symbol.for("react.memo")?!e.type.name&&(s(e.type)||s(e))&&(e.type,s(e.type)||""+s(e),void 0):console.log("[CUSTOM] OTHER TYPE",e,{debugStack:o,owner:f(o)}):typeof e=="string"||console.log("[CUSTOM] OTHER TYPE",e,{debugStack:o,owner:f(o)});const r=c.createElement(e,...n);return r.props&&(t.has(r.props)&&(console.warn("[CUSTOM][PROPS] THIS SHOULD NOT EXIST: CONFLICT ON ",r.props,r),t.delete(r.props),i.add(r.props)),i.has(r.props)||t.set(r.props,o)),r};window._DEBUG_MAPPED_PROPS=t;export{f,O as h};
//# sourceMappingURL=_utils.CZVZ1_aI.js.map
