import{p as z,j as t,a as b,e$ as ce,f0 as ge,f as ue,R as fe,fD as pe,fE as q,fF as j,bT as G,dR as A,f3 as P,b7 as T,fG as we,r as E,i as f,f5 as me,fH as he,a_ as $,bb as R,aL as De,n as d,fI as be,bL as i,fJ as ke,c8 as _e,U as Ee,f9 as xe,cA as ye,ao as Ce,dQ as Se,fK as $e}from"./index.Dg3lKJeg.js";import{D as F}from"./index.C2saR20x.js";import{u as Re,d as Ne,i as Ie,j as We,e as ve,H as Oe,P as K}from"./style.BQlYoUOS.js";const Y=1,Ae=24,Te=8,ze=Ae+Te+Y,He="workflow-edge-green-circle",Le="workflow-edge-green-arrow-rounded",Z=6,y=4,I=y,Ve=()=>{const e=z();return t("svg",{style:{position:"absolute",top:0,left:0},children:b("defs",{children:[t("marker",{id:ce,markerHeight:5,markerWidth:6,refX:3,refY:2.5,children:t("path",{d:"M0.31094 1.1168C0.178029 0.917434 0.320947 0.650391 0.560555 0.650391H5.43945C5.67905 0.650391 5.82197 0.917434 5.68906 1.1168L3.62404 4.21433C3.32717 4.65963 2.67283 4.65963 2.37596 4.21433L0.31094 1.1168Z",fill:e.border.color.strong})}),t("marker",{id:Le,markerHeight:5,markerWidth:Z,refX:Z/2,refY:2.5,children:t("path",{d:"M0.31094 1.1168C0.178029 0.917434 0.320947 0.650391 0.560555 0.650391H5.43945C5.67905 0.650391 5.82197 0.917434 5.68906 1.1168L3.62404 4.21433C3.32717 4.65963 2.67283 4.65963 2.37596 4.21433L0.31094 1.1168Z",fill:e.tag.text.turquoise})}),t("marker",{markerHeight:I,markerWidth:y,refX:y/2,refY:I,id:ge,children:t("rect",{height:I,width:y,rx:"2",fill:e.border.color.strong})}),t("marker",{markerHeight:5,markerWidth:5,refX:2,refY:2.5,id:He,children:t("rect",{x:.5,y:.5,height:3,width:3,rx:"1.5",fill:"white",stroke:e.tag.text.turquoise,strokeWidth:1})})]})})},Be=()=>{const e=ue(),o=fe(pe);return e?{rightDrawerState:"fullScreen"}:{rightDrawerState:o?"normal":"closed"}},Me=q({key:"workflowDiagramPanOnDragComponentState",defaultValue:!0,componentInstanceContext:j}),X=q({key:"workflowDiagramWaitingNodesDimensionsComponentState",defaultValue:!1,componentInstanceContext:j}),Ge=e=>{const o=new F.graphlib.Graph().setDefaultEdgeLabel(()=>({}));o.setGraph({rankdir:"TB"});const l=e.nodes.reduce((r,n)=>{var p;return Math.max(r,((p=n.measured)==null?void 0:p.width)??0)},0);return e.edges.forEach(r=>o.setEdge(r.source,r.target)),e.nodes.forEach(r=>{var n;return o.setNode(r.id,{width:l,height:((n=r.measured)==null?void 0:n.height)??0})}),F.layout(o),{nodes:e.nodes.map(r=>{const n=o.node(r.id),p=n.x-n.width/2,w=n.y-n.height/2;return{...r,position:{x:p,y:w}}}),edges:e.edges}},Pe=d.div`
  height: 100%;
  width: 100%;
  position: relative;

  /* Below we reset the default styling of Reactflow */
  .react-flow__node-input,
  .react-flow__node-default,
  .react-flow__node-output,
  .react-flow__node-group {
    padding: 0;
    width: auto;
    text-align: start;
    white-space: nowrap;
  }

  .react-flow__handle {
    min-height: 0;
    min-width: 0;
  }
  .react-flow__handle-top {
    transform: translate(-50%, -50%);
  }
  .react-flow__handle-bottom {
    transform: translate(-50%, 100%);
  }
  .react-flow__handle.connectionindicator {
    cursor: pointer;
  }

  --xy-node-border-radius: none;
  --xy-node-border: none;
  --xy-node-background-color: none;
  --xy-node-boxshadow-hover: none;
  --xy-node-boxshadow-selected: none;
`,Fe=d.div`
  left: 0;
  top: 0;
  position: absolute;
  padding: ${({theme:e})=>e.spacing(4)};
`,N={minZoom:1,maxZoom:1},eo=({nodeTypes:e,edgeTypes:o,children:l,tagContainerTestId:r,tagColor:n,tagText:p,onInit:w})=>{const Q=z(),k=Re(),W=G(A),J=G(Me),g=P(A),ee=T(A),oe=T(we),H=P(X),v=T(X),[C,te]=E.useState(!1),{nodes:re,edges:ne}=E.useMemo(()=>f(W)?Ge(W):{nodes:[],edges:[]},[W]),{rightDrawerState:m}=Be(),{isInRightDrawer:h}=E.useContext(me),ae=a=>{ee(s=>{if(f(s)===!1)throw new Error("It must be impossible for the edges to be updated if the diagram is not defined yet. Be sure the diagram is rendered only when defined.");return{...s,edges:ve(a,s.edges)}})};he(()=>{k.setNodes(a=>a.map(s=>({...s,selected:!1}))),oe({parentStepId:void 0,nextStepId:void 0})});const S=E.useRef(null),D=$(()=>({rightDrawerState:a,noAnimation:s,workflowDiagramFlowInitialized:_,isInRightDrawer:c,workflowDiagram:u})=>{if(!f(S.current)||!_)return;const V=k.getViewport(),B=(u==null?void 0:u.nodes)??[];if(!B.every(M=>f(M.measured))){v(!0);return}v(!1);let O=0;a==="normal"&&!c&&(O=Number(be.rightDrawerWidth.replace("px","")));const de=k.getNodesBounds(B),le=(S.current.offsetWidth+O)/2-de.width/2;k.setViewport({...V,x:le-O,zoom:N.maxZoom},{duration:s?0:300})},[k,v]),L=$(({snapshot:a})=>({rightDrawerState:s,workflowDiagramFlowInitialized:_,isInRightDrawer:c})=>{D({rightDrawerState:s,isInRightDrawer:c,workflowDiagramFlowInitialized:_,workflowDiagram:R(a,g)})},[D,g]);E.useEffect(()=>{L({rightDrawerState:m,workflowDiagramFlowInitialized:C,isInRightDrawer:h})},[L,h,m,C]);const se=$(({snapshot:a,set:s})=>_=>{const c=R(a,g);let u=c;f(c)&&(u={...c,nodes:Ne(_,c.nodes)}),s(g,u),R(a,H)&&D({rightDrawerState:m,noAnimation:!0,isInRightDrawer:h,workflowDiagramFlowInitialized:C,workflowDiagram:u})},[h,m,D,C,g,H]),ie=$(({snapshot:a})=>()=>{f(S.current)&&(D({rightDrawerState:m,noAnimation:!0,isInRightDrawer:h,workflowDiagramFlowInitialized:!0,workflowDiagram:R(a,g)}),te(!0),w==null||w())},[h,w,m,D,g]);return b(Pe,{ref:S,children:[t(Ve,{}),b(Ie,{onInit:ie,minZoom:N.minZoom,maxZoom:N.maxZoom,defaultViewport:{x:0,y:150,zoom:N.maxZoom},nodeTypes:e,edgeTypes:o,nodes:re,edges:ne,onNodesChange:se,onEdgesChange:ae,onBeforeDelete:async()=>!1,proOptions:{hideAttribution:!0},multiSelectionKeyCode:null,nodesFocusable:!1,edgesFocusable:!1,nodesDraggable:!1,panOnDrag:J,nodesConnectable:!1,paneClickDistance:10,preventScrolling:!1,children:[t(We,{color:Q.border.color.medium,size:2}),l]}),t(Fe,{"data-testid":r,children:t(De,{color:n,text:p})})]})},U=d(Oe)`
  height: ${I}px;
  width: ${y}px;
  left: ${ze}px;
  visibility: hidden;
`,oo=d.div`
  padding: ${({theme:e})=>e.spacing(1)};
  pointer-events: all;
  ${({labelX:e,labelY:o})=>i`
    transform: translate(-50%, -50%) translate(${e}px, ${o}px);
  `}
  position: absolute;
`,to=d.div`
  opacity: ${({shouldDisplay:e})=>e?1:0};
  position: relative;
`,Ke=d.div`
  display: flex;
  flex-direction: column;

  padding-block: ${({theme:e})=>e.spacing(3)};
`,Ze=d.div`
  ${({nodeVariant:e,theme:o})=>{switch(e){case"running":return i`
          background-color: ${o.tag.background.yellow};
          color: ${o.tag.text.yellow};
        `;case"success":return i`
          background-color: ${o.tag.background.turquoise};
          color: ${o.tag.text.turquoise};
        `;case"failure":return i`
          background-color: ${o.tag.background.red};
          color: ${o.color.red};
        `;default:return i`
          background-color: ${o.background.tertiary};
        `}}}

  align-self: flex-start;
  border-radius: ${({theme:e})=>`${e.border.radius.sm} ${e.border.radius.sm} 0 0`};
  margin-left: ${({theme:e})=>e.spacing(2)};
  padding: ${({theme:e})=>e.spacing(1)} ${({theme:e})=>e.spacing(2)};

  .selectable:is(.selected, :focus, :focus-visible) & {
    ${({nodeVariant:e,theme:o})=>{switch(e){case"empty":case"default":case"not-executed":return i`
            background-color: ${o.color.blue};
            color: ${o.font.color.inverted};
          `}}}
  }
`.withComponent(ye),Xe=d.div`
  background: ${({theme:e})=>e.background.secondary};
  border-color: ${({theme:e})=>e.border.color.medium};

  border-radius: ${({theme:e})=>e.border.radius.md};
  border-style: solid;
  border-width: ${Y}px;
  box-shadow: ${({variant:e,theme:o})=>e==="empty"?"none":o.boxShadow.strong};
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  padding: ${({theme:e})=>e.spacing(2)};

  position: relative;

  transition: background ${({theme:e})=>e.animation.duration.fast} ease;

  .workflow-node-container:hover & {
    ${({theme:e})=>i`
        background: linear-gradient(
            0deg,
            ${e.background.transparent.lighter} 0%,
            ${e.background.transparent.lighter} 100%
          ),
          ${e.background.secondary};
      `}
  }

  .selectable:is(.selected, :focus, :focus-visible)
    :is(.workflow-node-container, .workflow-node-container:hover)
    & {
    ${({theme:e,variant:o})=>{switch(o){case"running":return i`
            background: ${e.adaptiveColors.yellow1};
            border-color: ${e.adaptiveColors.yellow4};
          `;case"success":return i`
            background: ${e.adaptiveColors.turquoise1};
            border-color: ${e.adaptiveColors.turquoise4};
          `;case"failure":return i`
            background: ${e.background.danger};
            border-color: ${e.color.red};
          `;default:return i`
            background: ${e.adaptiveColors.blue1};
            border-color: ${e.color.blue};
          `}}}
  }
`,Ue=d.div`
  box-sizing: border-box;
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: ${({theme:e})=>e.font.weight.medium};
  column-gap: ${({theme:e})=>e.spacing(2)};
  color: ${({variant:e,theme:o})=>{switch(e){case"empty":case"not-executed":return o.font.color.light;default:return o.font.color.primary}}};
  max-width: 200px;
  height: 24px;

  .selectable:is(.selected, :focus, :focus-visible) & {
    color: ${({theme:e})=>e.font.color.primary};
  }
`,qe=d.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: ${({theme:e})=>e.spacing(-4)};
  bottom: 0;
  top: 0;
  transform: translateX(100%);
`,ro=({nodeType:e,name:o,variant:l,Icon:r,RightFloatingElement:n})=>b(Ke,{className:"workflow-node-container","data-click-outside-id":ke,children:[e!=="trigger"?t(U,{type:"target",position:K.Top}):null,t(Ze,{variant:"small",nodeVariant:l,children:_e(e)}),b(Xe,{variant:l,children:[b(Ue,{variant:l,children:[l==="running"?t(Ee,{}):r,t(xe,{text:o})]}),f(n)?t(qe,{children:n}):null]}),t(U,{type:"source",position:K.Bottom})]}),x=d.div`
  align-items: center;
  background: ${({theme:e})=>e.background.transparent.light};
  border-radius: ${({theme:e})=>e.spacing(1)};
  display: flex;
  justify-content: center;
  padding: ${({theme:e})=>e.spacing(1)};
`,no=({data:e})=>{const o=z(),{getIcon:l}=Ce(),r=l(Se(e));switch(e.nodeType){case"trigger":{switch(e.triggerType){case"DATABASE_EVENT":case"MANUAL":case"CRON":case"WEBHOOK":return t(x,{children:t(r,{size:o.icon.size.md,color:o.font.color.tertiary})})}return $e(e.triggerType)}case"action":switch(e.actionType){case"CODE":case"HTTP_REQUEST":return t(x,{children:t(r,{size:o.icon.size.md,color:o.color.orange,stroke:o.icon.stroke.sm})});case"SEND_EMAIL":return t(x,{children:t(r,{size:o.icon.size.md,color:o.color.blue})});case"AI_AGENT":return t(x,{children:t(r,{size:o.icon.size.md,color:o.color.pink})});default:return t(x,{children:t(r,{size:o.icon.size.md,color:o.font.color.tertiary,stroke:o.icon.stroke.sm})})}}};export{ze as C,Le as E,oo as S,no as W,ro as a,to as b,eo as c,He as d,U as e,Me as w};
