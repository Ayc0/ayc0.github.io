import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.F28aNuxU.js";import{c as y}from"./client.Dmkom2YY.js";import{g as k,a as x}from"./chunk-347RWTP3.CDTHZpip.js";import"./index.BF-YhwgH.js";function d(r){return r?typeof r.type=="string"?r.type:x(r):null}function j(r){const o=Object.keys(r).find(g=>g.startsWith("__reactFiber$"));return o?r[o]:void 0}function p(r){return{fiberName:d(r),fiberStack:r?k(r).map(d).filter(Boolean).reverse().join(" > "):null}}function n(r){if(r.componentStack)return r.componentStack.trim().split(`
`).map(e=>e.trim().replace(/^at (.*?) \(.*?\)$/,"$1")).reverse().join(" > ")}class b extends a.Component{constructor(e){super(e),this.state={hasError:!1}}static{this.displayName="ErrorBoundary"}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,o){console.log("componentDidCatch",{errorStack:n(o),error:e})}render(){return this.state.hasError?this.props.fallback||null:t.jsxs("fieldset",{style:{display:"inline",border:"1px solid red"},children:[t.jsx("legend",{children:"Error Boundary"}),this.props.children]})}}const s=()=>t.jsx("button",{onClick:()=>{throw new Error("Hello")},children:"Trigger 💥 crash (in onClick)"});s.displayName="ErrorThrowerOnClick";function c(){const[r,e]=a.useState(!1);if(r)throw new Error("Hello");return t.jsx("button",{onClick:()=>{e(!0)},children:"Trigger 💥 crash (on render)"})}c.displayName="ErrorThrowerOnRender";const i=()=>{const[r,e]=a.useState(!1);return a.useEffect(()=>{if(r)throw new Error("Hello")},[r]),t.jsx("button",{onClick:()=>{e(!0)},children:"Trigger 💥 crash (on effect)"})};i.displayName="ErrorThrowerOnEffect";const h=({children:r})=>t.jsxs("fieldset",{style:{display:"inline",border:"1px dashed blue"},onClick:e=>{const o=j(e.target);if(!o)return;const l=p(o);console.log("Clicked on",{element:e.target,fiber:o,...l})},children:[t.jsx("legend",{children:"Click Tracker"}),r]});h.displayName="ClickTracker";const m=()=>t.jsxs(h,{children:[t.jsx(s,{}),t.jsx(c,{}),t.jsx(i,{}),t.jsxs(b,{children:[t.jsx(s,{}),t.jsx(c,{}),t.jsx(i,{})]})]});m.displayName="Bar";const f=()=>t.jsx(m,{});f.displayName="Foo";const E=()=>t.jsxs(t.Fragment,{children:[t.jsx("div",{children:"Hello World"}),t.jsx(f,{})]});E.displayName="App";const u=document.getElementById("button");u.addEventListener("click",()=>{y.createRoot(document.getElementById("node"),{onCaughtError(r,e){const o=e.errorBoundary?._reactInternals;console.log("Error caught by Error Boundary",{boundaryStack:o?p(o).fiberStack:null,errorStack:n(e)})},onUncaughtError(r,e){console.log("Error not caught by Error Boundary",{errorStack:n(e),error:r})},onRecoverableError(r,e){console.log("Recoverable error",{errorStack:n(e),error:r})}}).render(t.jsx(E,{})),u.disabled=!0});
