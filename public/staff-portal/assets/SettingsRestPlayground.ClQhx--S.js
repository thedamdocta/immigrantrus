const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index._i9Oi-Kg.js","assets/index.Dg3lKJeg.js","assets/index.DMD_3Uv7.css","assets/clsx.B-dksMZM.js","assets/index.Wb4bzIyB.js","assets/index.BVeNH5zi.js","assets/index.BUCFnM-n.js","assets/index.DEehm0bc.js","assets/index.D4Wp6AEg.js","assets/index.CjrT3HcA.js","assets/index.CWtGfzcb.js","assets/index.D55_0Pbk.js","assets/index.dom.C3-224fz.js","assets/index.DdCAsX36.js","assets/index.ByI_odx6.js","assets/syntax.Dh_7PnPp.js","assets/index.c2V3InAJ.js","assets/default.Cl3hj7Sz.js","assets/index.DOWyBKr8.js","assets/index.COYepv-L.js","assets/index.Dq2i-IQA.js","assets/index.BY3x9OSE.js","assets/index.D13MPiJ5.js","assets/index.C2o2j-tx.js","assets/index.D22iV9cu.js","assets/index.C06_t6vS.js","assets/decode.BDRbQOCM.js","assets/index.bsVAaBS1.js","assets/index.E0wwlW8h.js","assets/index.DWHkiPoB.js","assets/fuse.Ch1WBRTM.js"])))=>i.map(i=>d[i]);
import{p as u,R as h,j as e,r as d,z as s,aC as l,B as t,aD as g,aE as p,aF as c,n as b,N as m,T as k,Z as i}from"./index.Dg3lKJeg.js";import{p as R,P as S}from"./playgroundApiKeyState.By2k6NBY.js";import{F as y}from"./FullScreenContainer.TrEglc8a.js";import"./Breadcrumb.CQyf5Hn6.js";const _=b.div`
  border: 1px solid ${({theme:r})=>r.border.color.medium};
  border-radius: ${({theme:r})=>r.border.radius.md};
  height: 100%;
  overflow-y: scroll;
  width: 100%;

  .scalar-api-reference {
    --scalar-background-1: ${({theme:r})=>r.background.primary};
    --scalar-background-2: ${({theme:r})=>r.background.secondary};
    --scalar-background-3: ${({theme:r})=>r.background.tertiary};
    --scalar-background-accent: ${({theme:r})=>r.background.transparent.lighter};
    --scalar-border-color: ${({theme:r})=>r.border.color.medium};
    --scalar-color-1: ${({theme:r})=>r.font.color.primary};
    --scalar-color-2: ${({theme:r})=>r.font.color.secondary};
    --scalar-color-3: ${({theme:r})=>r.font.color.tertiary};
  }
`,f=d.lazy(()=>c(()=>import("./index._i9Oi-Kg.js").then(r=>r.bQ),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])).then(r=>(c(()=>import("./style.Ck0P54ND.js"),[]),{default:r.ApiReferenceReact}))),P=({onError:r,schema:a})=>{const o=u(),n=h(R);return n?e(_,{children:e(d.Suspense,{fallback:e(g,{baseColor:o.background.tertiary,highlightColor:o.background.transparent.lighter,borderRadius:4,children:e(p,{width:"100%",height:"100%"})}),children:e(f,{configuration:{spec:{url:`${l}/rest/open-api/${a}?token=${n}`},authentication:{http:{bearer:n?{token:n}:void 0}},baseServerURL:l+"/"+a,forceDarkModeState:o.name==="dark"?"dark":"light",hideClientButton:!0,hideDarkModeToggle:!0,hideModels:a==="metadata",pathRouting:{basePath:s(t.RestPlayground,{schema:a})}}})})}):(r(),null)},x=()=>{const r=m(),{schema:a=S.CORE}=k();return e(y,{exitFullScreen:()=>{r(t.APIs)},links:[{children:e(i,{id:"pmUArF"}),href:s(t.Workspace)},{children:e(i,{id:"JR6nY7"}),href:s(t.APIs)},{children:e(i,{id:"WHiaOl"})}],children:e(P,{schema:a,onError:()=>r(t.APIs)})})};export{x as SettingsRestPlayground};
