import{a as e,r as u}from"./index.BsBLZZZ_.js";import{g as p,b as f}from"./fiber.D_L7F8YT.js";import{g as h}from"./error.mxuAC_my.js";import"./chunk-ELVWOSDS.DplWDq_q.js";class g extends e.Component{constructor(r){super(r),this.state={hasError:!1}}static displayName="ErrorBoundary";static getDerivedStateFromError(r){return{hasError:!0}}componentDidCatch(r,n){console.log("[CUSTOM] componentDidCatch",{errorStack:h(n),error:r})}render(){return this.state.hasError?this.props.fallback||null:e.createElement("fieldset",{style:{display:"inline",border:"1px solid red"}},e.createElement("legend",null,"Error Boundary"),this.props.children)}}const o=()=>e.createElement("button",{onClick:()=>{throw new Error("Hello")}},"Trigger 💥 crash (in onClick)");o.displayName="ErrorThrowerOnClick";function a(){const[t,r]=e.useState(!1);if(t)throw new Error("Hello");return e.createElement("button",{onClick:()=>{r(!0)}},"Trigger 💥 crash (on render)")}a.displayName="ErrorThrowerOnRender";const l=()=>{const[t,r]=e.useState(!1);return e.useEffect(()=>{if(t)throw new Error("Hello")},[t]),e.createElement("button",{onClick:()=>{r(!0)}},"Trigger 💥 crash (on effect)")};l.displayName="ErrorThrowerOnEffect";const s=({children:t})=>e.createElement("fieldset",{style:{display:"inline",border:"1px dashed blue"},onClick:r=>{const n=p(r.target);if(!n)return;const d=f(n);console.log("[CUSTOM] Clicked on",{element:r.target,fiber:n,...d})}},t);s.displayName="ClickTracker";const i=()=>e.createElement(s,null,e.createElement(o),e.createElement(a),e.createElement(l),e.createElement(g,null,e.createElement(o),e.createElement(a),e.createElement(l)));i.displayName="Bar";const m=()=>e.createElement(i);m.displayName="Foo";const E=()=>e.createElement(e.Fragment,null,e.createElement("div",null,"Hello World"),e.createElement(m));E.displayName="App";const c=document.getElementById("button");c.addEventListener("click",()=>{u.render(e.createElement(E),document.getElementById("node")),c.disabled=!0});
//# sourceMappingURL=npm-18-legacy.astro_astro_type_script_index_1_lang.CLyB5HW9.js.map
