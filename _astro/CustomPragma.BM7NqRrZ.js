import{r as c}from"./index.CRVbtxaI.js";import{g as m,b as u}from"./fiber.KnyU7RvX.js";function k(t){let r=t.stack;r.startsWith(`Error: ========
`)&&(r=r.slice(16));let n=r.indexOf(`
`);return n!==-1&&(r=r.slice(n+1)),n=r.indexOf(`
`),n!==-1&&(r=r.slice(0,n+1)),n=r.indexOf("react-stack-bottom-frame"),n===0?"":(n!==-1&&(n=r.lastIndexOf(`
`,n)),n!==-1&&(r=r.slice(0,n)),r)}const a=new WeakMap,d=new WeakSet;window._DEBUG_MAPPED_PROPS=a;function e(t,...r){const n=new Error("========"),o=c.createElement(t,...r);return o.props&&(a.has(o.props)&&(console.warn("[CUSTOM][PROPS] THIS SHOULD NOT EXIST: CONFLICT ON ",o.props,o),a.delete(o.props),d.add(o.props)),d.has(o.props)||a.set(o.props,n)),o}const w=t=>{const r=t.target,n=m(r);if(!n)return;const o=[];let s=n;for(;s;){console.log("current.pendingProps",s.pendingProps),s.pendingProps||console.log(s);const i=window._DEBUG_MAPPED_PROPS.get(s.pendingProps);if(i?o.push(k(i)):console.warn(`[CUSTOM] No stack for "${s.elementType?.name}"`,s),s.return===s)break;s=s.return}console.log("[CUSTOM] Clicked on "+[u(n),`
`,...o].join(""));const l=new Error(`[CUSTOM] Clicked on ${u(n)}`);l.stack=o.join(""),window.DD_RUM?.addError(l)};function f(){return e("button",null,"Function")}const E=c.memo(function(){return e("button",null,"Memoized with an internal name")}),g=c.memo(()=>e("button",null,"Memoized anonymous")),h=c.forwardRef(function(){return e("button",null,"ForwardedRef with an internal name")}),P=c.forwardRef(()=>e("button",null,"ForwardedRef anonymous"));class S extends c.Component{render(){return console.log("[CUSTOM] Test component render log in all browser dev tools",new Error().stack),console.trace(),e("button",null,"Class")}}const p=()=>{const t=new Error;"captureStackTrace"in Error&&Error.captureStackTrace(t,p);function r(n){const o=new Error(n.message,{cause:t});return"captureStackTrace"in Error&&Error.captureStackTrace(o,r),o}return r};function T(){const t=p();c.useEffect(()=>{setTimeout(()=>{fetch("https://ayc0.github.io/unknown").then(r=>{if(!r.ok)throw new Error(`Fetch error: ${r.status}`)}).catch(r=>{window.DD_RUM?.addError(t(r))})},100)},[])}function b(){T()}function C(){b()}function O(){return C(),e("div",null,"Hook")}const F=()=>e("fieldset",{style:{display:"inline",border:"1px dashed blue"},onClick:w},e("legend",null,"Click Tracker"),e(f,null),e(f,null),e("hr",null),e(S,{with:{props:!0}}),e("hr",null),e(E,null),e(g,null),e("hr",null),e(h,null),e(P,null),e("hr",null),e(O,null));export{F as CustomPragma};
//# sourceMappingURL=CustomPragma.BM7NqRrZ.js.map
