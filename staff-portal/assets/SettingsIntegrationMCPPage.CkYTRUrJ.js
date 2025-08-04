import{p as b,a6 as S,o as g,r as y,a,j as t,b0 as v,Z as i,ae as $,b1 as p,au as C,aC as _,n as o,z as k,H as I,l as w,B as x}from"./index.Dg3lKJeg.js";import{S as P}from"./SettingsPageContainer.CJeLyK8s.js";import{S as z}from"./SubMenuTopBarContainer.BNGFwgBo.js";import{I as A}from"./IconDatabase.B0xrit7q.js";import{I as B}from"./IconSitemap.DEduahi5.js";import"./Breadcrumb.CQyf5Hn6.js";const E=o.div`
  background-color: ${({theme:e})=>e.background.secondary};
  border: 1px solid ${({theme:e})=>e.border.color.light};
  border-radius: ${({theme:e})=>e.border.radius.md};
`,H=o.img`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
  height: 100%;
  object-fit: cover;
  width: 100%;
`,M=o.div`
  align-items: center;
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing(3)};
`,j=o.span`
  color: ${({theme:e})=>e.font.color.light};
  font-size: ${({theme:e})=>e.font.size.md};
  font-weight: ${({theme:e})=>e.font.weight.semiBold};
`,L=o.div`
  position: absolute;
  top: ${({theme:e})=>e.spacing(3)};
  right: ${({theme:e})=>e.spacing(3)};
  z-index: 1;
`,O=o.div`
  .monaco-editor,
  .monaco-editor .overflow-guard {
    background-color: transparent !important;
    border: none !important;
  }

  .monaco-editor .line-hover {
    background-color: transparent !important;
  }
`,R=()=>{const e=b(),{enqueueSuccessSnackBar:s}=S(),{i18n:m,_:T}=g(),c=(n,f)=>JSON.stringify({mcpServers:{[f]:{type:"remote",url:`${_}${n}`,headers:{Authorization:"Bearer [API_KEY]"}}}},null,2),r=[{label:"Core Schema",value:"core-schema",Icon:A,content:c("/mcp","twenty")},{label:"Metadata Schema",value:"metadata-schema",Icon:B,content:c("/mcp/metadata","twenty-metadata")}],[l,h]=y.useState(r[0].value),d=r.find(n=>n.value===l)||r[0],u=n=>{h(n)};return a(E,{children:[t(H,{src:`/images/integrations/integration-mcp-cover-${e.name}.svg`}),a(M,{children:[t(v,{dropdownId:"mcp-schema-selector",value:l,options:r,onChange:u}),t(j,{children:t(i,{id:"ntgzzG"})})]}),a(O,{style:{position:"relative"},children:[t(L,{children:t($,{Icon:p,onClick:()=>{s({message:m._({id:"NvQoNb"}),options:{icon:t(p,{size:e.icon.size.md}),duration:2e3}}),navigator.clipboard.writeText(d.content)},type:"button"})}),t(C,{value:d.content,language:"application/json",options:{readOnly:!0,domReadOnly:!0,renderLineHighlight:"none",renderLineHighlightOnlyWhenFocus:!1,lineNumbers:"off",folding:!1,selectionHighlight:!1,occurrencesHighlight:"off",hover:{enabled:!1},guides:{indentation:!1,bracketPairs:!1,bracketPairsHorizontal:!1},padding:{top:12}},height:"220px"})]})]})},q=()=>{const{i18n:e,_:s}=g();return t(z,{title:e._({id:"nbfdhU"}),links:[{children:t(i,{id:"pmUArF"}),href:k(x.Workspace)},{children:t(i,{id:"nbfdhU"})},{children:t(i,{id:"nA8kxD"})}],children:t(P,{children:a(w,{children:[t(I,{title:"MCP Server",description:"Access your workspace data from your favorite MCP client like Claude Desktop, Windsurf or Cursor."}),t(R,{})]})})})};export{q as SettingsIntegrationMCPPage};
