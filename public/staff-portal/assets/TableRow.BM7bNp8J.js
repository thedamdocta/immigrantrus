import{n as t,j as s,av as l,aw as c,ax as u}from"./index.Dg3lKJeg.js";const p=t.div`
  align-items: center;
  color: ${({color:a,theme:r})=>a||r.font.color.secondary};
  display: flex;
  height: ${({theme:a})=>a.spacing(8)};
  justify-content: ${({align:a})=>a==="right"?"flex-end":a==="center"?"center":"flex-start"};
  padding: 0 ${({theme:a})=>a.spacing(2)};
  text-align: ${({align:a})=>a??"left"};
`,g=t("div",{shouldForwardProp:a=>!["isSelected"].includes(a)&&u(a)})`
  background-color: ${({isSelected:a,theme:r})=>a?r.accent.quaternary:"transparent"};
  border-radius: ${({theme:a})=>a.border.radius.sm};
  display: grid;
  grid-auto-columns: ${({gridAutoColumns:a})=>a??"1fr"};

  @media (max-width: ${c}px) {
    grid-auto-columns: ${({mobileGridAutoColumns:a,gridAutoColumns:r})=>a??r??"1fr"};
  }

  grid-auto-flow: column;
  transition: background-color
    ${({theme:a})=>a.animation.duration.normal}s;
  width: 100%;
  text-decoration: none;

  &:hover {
    background-color: ${({onClick:a,to:r,theme:o})=>a||r?o.background.transparent.light:"transparent"};
    cursor: ${({onClick:a,to:r})=>a||r?"pointer":"default"};
  }
`,f=({isSelected:a,onClick:r,to:o,className:n,children:e,gridAutoColumns:i,mobileGridAutoColumns:d})=>s(g,{isSelected:a,onClick:r,gridAutoColumns:i,className:n,mobileGridAutoColumns:d,to:o,as:o?l:"div",children:e});export{p as S,f as T};
