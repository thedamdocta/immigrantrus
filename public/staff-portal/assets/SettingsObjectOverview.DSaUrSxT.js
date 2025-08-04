const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.C2saR20x.js","assets/index.Dg3lKJeg.js","assets/index.DMD_3Uv7.css"])))=>i.map(i=>d[i]);
import{p as E,a7 as U,r as k,j as t,ad as B,aF as V,i as S,bD as L,R as G,dZ as X,ao as z,a as m,d_ as _,n as d,b3 as Z,af as N,c8 as q,z as Y,B as W,cB as J,cC as K,av as Q,ae as ee,df as te,bn as oe,d$ as ae,e0 as ne,db as ie,dU as re}from"./index.Dg3lKJeg.js";import{P as H,H as A,u as se,b as ce,c as le,d as de,e as pe,f as ge,h as he,i as ue,j as me,R as fe}from"./style.BQlYoUOS.js";import{g as be,S as ye}from"./getObjectTypeLabel.CC2ZWRUI.js";import{I as we}from"./IconMaximize.CLIyrziJ.js";import{S as xe}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./string.DY8YL-MQ.js";import"./Breadcrumb.CQyf5Hn6.js";const $e=({setEdges:e,setNodes:l})=>{const p=E(),{activeNonSystemObjectMetadataItems:a}=U();return k.useEffect(()=>{(async()=>{var $,O;const s=await V(()=>import("./index.C2saR20x.js").then(n=>n.i),__vite__mapDeps([0,1,2])),r=new s.default.graphlib.Graph;r.setGraph({rankdir:"LR"}),r.setDefaultEdgeLabel(()=>({}));const g=[],b=[];let o=0;for(const n of a){b.push({id:n.namePlural,width:220,height:100,position:{x:o*300,y:0},data:n,type:"object"}),r.setNode(n.namePlural,{width:220,height:100});for(const i of n.fields)if(S(i.relation)&&S(a.find(c=>{var y;return c.id===((y=i.relation)==null?void 0:y.targetObjectMetadata.id)}))){const c=($=i.relation)==null?void 0:$.sourceObjectMetadata.namePlural,y=(O=i.relation)==null?void 0:O.targetObjectMetadata.namePlural;g.push({id:`${c}-${y}`,source:n.namePlural,sourceHandle:`${i.id}-right`,target:i.relation.targetObjectMetadata.namePlural,targetHandle:`${i.relation.targetObjectMetadata}-left`,type:"smoothstep",style:{strokeWidth:1,stroke:p.color.gray},markerEnd:"marker",markerStart:"marker",data:{sourceField:i.id,targetField:i.relation.targetFieldMetadata.id,relation:i.relation.type,sourceObject:c,targetObject:y}}),!L(c)&&!L(y)&&r.setEdge(c,y)}o++}s.default.layout(r),b.forEach(n=>{const i=r.node(n.id);n.position={x:i.x-(n.width??0)/2,y:i.y-(n.height??0)/2}}),l(b),e(g)})()},[a,e,l,p]),t(B,{})},Oe=d.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  position: relative;
  width: 100%;
  padding: 0 ${({theme:e})=>e.spacing(2)};
`,ve=d.div`
  color: ${({theme:e})=>e.font.color.primary};
`,ke=({field:e})=>{var g,b,o,$,O;const l=G(X),{getIcon:p}=z(),a=E(),f=(g=e.relation)==null?void 0:g.targetObjectMetadata.id,s=l.find(n=>n.id===f),r=p(s==null?void 0:s.icon);return m(Oe,{children:[r&&t(r,{size:a.icon.size.md}),t(ve,{children:(s==null?void 0:s.labelPlural)??""}),t(A,{type:((b=e.relation)==null?void 0:b.type)===_.ONE_TO_MANY?"source":"target",position:H.Right,id:`${e.id}-right`,className:((o=e.relation)==null?void 0:o.type)===_.ONE_TO_MANY?"right-handle source-handle":"right-handle target-handle"}),t(A,{type:(($=e.relation)==null?void 0:$.type)===_.ONE_TO_MANY?"source":"target",position:H.Left,id:`${e.id}-left`,className:((O=e.relation)==null?void 0:O.type)===_.ONE_TO_MANY?"left-handle source-handle":"left-handle target-handle"})]})},Se=d.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  position: relative;
  width: 100%;
  padding: 0 ${({theme:e})=>e.spacing(2)};
`,je=d.div`
  color: ${({theme:e})=>e.font.color.primary};
`,Ie=({field:e})=>{const{getIcon:l}=z(),p=E(),a=l(e==null?void 0:e.icon);return m(Se,{children:[a&&t(a,{size:p.icon.size.md}),t(je,{children:e.label})]})},Ee=d.div`
  background-color: ${({theme:e})=>e.background.secondary};
  border-radius: ${({theme:e})=>e.border.radius.md};
  display: flex;
  flex-direction: column;
  width: 220px;
  padding: ${({theme:e})=>e.spacing(2)};
  gap: ${({theme:e})=>e.spacing(2)};
  border: 1px solid ${({theme:e})=>e.border.color.medium};
  box-shadow: ${({theme:e})=>e.boxShadow.light};
`,_e=d.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`,Pe=d.div`
  border: 0;
  border-radius: 4px 4px 0 0;
  display: flex;
  font-weight: ${({theme:e})=>e.font.weight.medium};
  gap: ${({theme:e})=>e.spacing(1)};
  position: relative;
  text-align: center;
`,Ce=d.div`
  border: 1px solid ${({theme:e})=>e.border.color.light};
  background-color: ${({theme:e})=>e.background.primary};
  border-radius: ${({theme:e})=>e.border.radius.sm};
  padding: ${({theme:e})=>e.spacing(2)} 0
    ${({theme:e})=>e.spacing(2)} 0;
  display: flex;
  flex-flow: column nowrap;
  gap: ${({theme:e})=>e.spacing(.5)};
  color: ${({theme:e})=>e.font.color.tertiary};
`,D=d.div`
  align-items: center;
  display: flex;
  height: 24px;
  gap: ${({theme:e})=>e.spacing(1)};
`,Me=d.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 24px;
  padding: 0 ${({theme:e})=>e.spacing(2)};
  gap: ${({theme:e})=>e.spacing(2)};

  &:hover {
    background-color: ${({theme:e})=>e.background.tertiary};
  }
`,Re=d.div``,Fe=d.div`
  color: ${({theme:e})=>e.font.color.tertiary};
`,Ne=d(Q)`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
  text-decoration: none;
  color: ${({theme:e})=>e.font.color.primary};

  &:hover {
    color: ${({theme:e})=>e.font.color.secondary};
  }
`,ze=({data:e})=>{const l=E(),{getIcon:p}=z(),[a,f]=k.useState(!1),{totalCount:s}=Z({objectNameSingular:e.nameSingular}),r=e.fields.filter(o=>!o.isSystem&&o.isActive),g=r.filter(o=>o.type!==N.RELATION).length,b=p(e.icon);return m(Ee,{children:[m(_e,{children:[m(Pe,{onMouseEnter:()=>{},onMouseLeave:()=>{},children:[m(Ne,{to:Y(W.Objects,{objectNamePlural:e.namePlural}),children:[b&&t(b,{size:l.icon.size.md}),q(e.namePlural)]}),m(Fe,{children:[" · ",s]})]}),t(ye,{objectTypeLabel:be(e)})]}),m(Ce,{children:[r.filter(o=>o.type===N.RELATION).map(o=>t(D,{children:t(ke,{field:o})},o.id)),g>0&&m(B,{children:[m(Me,{onClick:()=>f(!a),children:[a?t(J,{size:l.icon.size.md}):t(K,{size:l.icon.size.md}),m(Re,{children:[g," fields"]})]}),a&&r.filter(o=>o.type!==N.RELATION).map(o=>t(D,{children:t(Ie,{field:o})},o.id))]})]})]})},Te=()=>{const e=E();return t("svg",{style:{position:"absolute",top:0,left:0},children:t("defs",{children:t("marker",{id:"marker",viewBox:"0 0 6 6",markerHeight:"6",markerWidth:"6",refX:"3",refY:"3",fill:"none",children:t("circle",{cx:"3",cy:"3",r:"3",fill:e.color.gray})})})})},P=(e,l,p,a,f)=>{if(f==="source")return l>a+p||l+e>a?"left":"right";if(f==="target")return l>a+p?"right":"left"},Le={object:ze},He=d.div`
  height: 100%;
  .react-flow__handle {
    border: 0 !important;
    background: transparent !important;
    width: 6px;
    height: 6px;
    min-height: 6px;
    min-width: 6px;
    pointer-events: none;
  }
  .left-handle {
    left: 0;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .right-handle {
    right: 0;
    top: 50%;
    transform: translateX(50%) translateY(-50%);
  }
  .react-flow__node {
    z-index: -1 !important;
  }
`,Ae=d.div`
  position: absolute;
  top: ${({theme:e})=>e.spacing(3)};
  left: ${({theme:e})=>e.spacing(3)};
  z-index: 5;
`,De=()=>{const{fitView:e,zoomIn:l,zoomOut:p}=se(),[a,f]=ce([]),[s,r]=le([]),[g,b]=k.useState(!0),o=k.useCallback(n=>f(i=>de(n,i)),[f]),$=k.useCallback(n=>r(i=>pe(n,i)),[r]),O=k.useCallback(n=>{n.forEach(i=>{var T;const c=a.find(h=>h.id===i.id);if(!c)return;const y=ge(c,a,s),v="positionAbsolute"in i?(T=i.positionAbsolute)==null?void 0:T.x:c.position.x||0;y.forEach(h=>{const w=s.find(x=>x.target===c.id&&x.source===h.id);S(v)&&r(x=>x.map(u=>{var j,I;if(S(w)&&u.id===w.id){const C=P(h.width,h.position.x,c.width,v,"source"),M=P(h.width,h.position.x,c.width,v,"target"),R=`${(j=w.data)==null?void 0:j.sourceField}-${C}`,F=`${(I=w.data)==null?void 0:I.targetField}-${M}`;u.sourceHandle=R,u.targetHandle=F,u.markerEnd="marker",u.markerStart="marker"}return u}))}),he(c,a,s).forEach(h=>{const w=s.find(x=>x.target===h.id&&x.source===c.id);S(v)&&r(x=>x.map(u=>{var j,I;if(S(w)&&u.id===w.id){const C=P(c.width,v,h.width,h.position.x,"source"),M=P(c.width,v,h.width,h.position.x,"target"),R=`${(j=w.data)==null?void 0:j.sourceField}-${C}`,F=`${(I=w.data)==null?void 0:I.targetField}-${M}`;u.sourceHandle=R,u.targetHandle=F,u.markerEnd="marker",u.markerStart="marker"}return u}))})}),o(n)},[o,r,a,s]);return m(He,{children:[t(Ae,{children:t(ee,{Icon:te,to:"/settings/objects"})}),t($e,{setEdges:r,setNodes:f}),t(Te,{}),m(ue,{fitView:!0,nodes:a,edges:s,onEdgesChange:$,nodeTypes:Le,onNodesChange:O,nodesDraggable:g,elementsSelectable:g,proOptions:{hideAttribution:!0},children:[t(me,{}),t(re,{className:"react-flow__panel react-flow__controls bottom left horizontal",iconButtons:[{Icon:oe,onClick:()=>l()},{Icon:ae,onClick:()=>p()},{Icon:we,onClick:()=>e()},{Icon:g?ne:ie,onClick:()=>b(!g)}]})]})]})},qe=()=>t(xe,{links:[{children:"Workspace",href:Y(W.Workspace)},{children:"Objects",href:"/settings/objects"},{children:"Overview"}],children:t(fe,{children:t(De,{})})});export{qe as SettingsObjectOverview};
