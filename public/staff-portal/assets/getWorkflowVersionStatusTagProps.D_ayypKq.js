import{bR as n,bS as s,r as c,i as g,j as a,n as d}from"./index.Dg3lKJeg.js";import{u as l}from"./style.BQlYoUOS.js";import{a as p}from"./WorkflowDiagramStepNodeIcon.CqIy9G-o.js";const D=()=>{const e=l(),[r,t]=n(s);c.useEffect(()=>{g(r)&&(e.setNodes(i=>i.map(o=>({...o,selected:r===o.id}))),t(void 0))},[e,t,r])},f=d.div`
  align-items: center;
  background: ${({theme:e})=>e.background.transparent.light};
  border-radius: ${({theme:e})=>e.spacing(1)};
  display: flex;
  justify-content: center;
  padding: ${({theme:e})=>e.spacing(3)};
`,S=()=>a(p,{name:"Add a Trigger",nodeType:"trigger",variant:"empty",Icon:a(f,{})}),T=({workflowVersionStatus:e})=>e==="ARCHIVED"?{color:"gray",text:"Archived"}:e==="DRAFT"?{color:"yellow",text:"Draft"}:e==="ACTIVE"?{color:"green",text:"Active"}:{color:"gray",text:"Deactivated"};export{S as W,T as g,D as u};
