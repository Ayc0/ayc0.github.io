import{r as e}from"./index.F28aNuxU.js";import{s as o,h as r}from"./_utils.C7Vwdp56.js";import"./chunk-ELVWOSDS.DplWDq_q.js";const t=()=>r("div",void 0,"Hello h");o(t,"Paz");const n=e.memo(function(){return r(t)});o(n,"Bar");class s extends e.Component{render(){return console.log("[CUSTOM] Test component render log in all browser dev tools",new Error().stack),console.trace(),r(n)}}o(s,"Foo");const m=()=>r(s);o(m,"CustomPragma");export{m as CustomPragma};
