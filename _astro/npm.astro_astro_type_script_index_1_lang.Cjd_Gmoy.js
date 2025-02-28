import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.F28aNuxU.js";import{c as f}from"./client.B2sJ245B.js";import{g as n,a as g,b as d}from"./error.C9V31VVP.js";import"./index.BNqrtbQi.js";class x extends s.Component{constructor(e){super(e),this.state={hasError:!1}}static{this.displayName="ErrorBoundary"}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){console.log("[CUSTOM] componentDidCatch",{errorStack:n(t),error:e})}render(){return this.state.hasError?this.props.fallback||null:r.jsxs("fieldset",{style:{display:"inline",border:"1px solid red"},children:[r.jsx("legend",{children:"Error Boundary"}),this.props.children]})}}const a=()=>r.jsx("button",{onClick:()=>{throw new Error("Hello")},children:"Trigger 💥 crash (in onClick)"});a.displayName="ErrorThrowerOnClick";function c(){const[o,e]=s.useState(!1);if(o)throw new Error("Hello");return r.jsx("button",{onClick:()=>{e(!0)},children:"Trigger 💥 crash (on render)"})}c.displayName="ErrorThrowerOnRender";const l=()=>{const[o,e]=s.useState(!1);return s.useEffect(()=>{if(o)throw new Error("Hello")},[o]),r.jsx("button",{onClick:()=>{e(!0)},children:"Trigger 💥 crash (on effect)"})};l.displayName="ErrorThrowerOnEffect";const u=({children:o})=>r.jsxs("fieldset",{style:{display:"inline",border:"1px dashed blue"},onClick:e=>{const t=g(e.target);if(!t)return;const m=d(t);console.log("[CUSTOM] Clicked on",{element:e.target,fiber:t,...m})},children:[r.jsx("legend",{children:"Click Tracker"}),o]});u.displayName="ClickTracker";const h=()=>r.jsxs(u,{children:[r.jsx(a,{}),r.jsx(c,{}),r.jsx(l,{}),r.jsxs(x,{children:[r.jsx(a,{}),r.jsx(c,{}),r.jsx(l,{})]})]});h.displayName="Bar";const E=()=>r.jsx(h,{});E.displayName="Foo";const p=()=>r.jsxs(r.Fragment,{children:[r.jsx("div",{children:"Hello World"}),r.jsx(E,{})]});p.displayName="App";const i=document.getElementById("button");i.addEventListener("click",()=>{f.createRoot(document.getElementById("node"),{onCaughtError(o,e){const t=e.errorBoundary?._reactInternals;console.log("[CUSTOM] Error caught by Error Boundary",{boundaryStack:t?d(t).fiberStack:null,errorStack:n(e)})},onUncaughtError(o,e){console.log("[CUSTOM] Error not caught by Error Boundary",{errorStack:n(e),error:o})},onRecoverableError(o,e){console.log("[CUSTOM] Recoverable error",{errorStack:n(e),error:o})}}).render(r.jsx(p,{})),i.disabled=!0});
