import{n as o,p as s,j as i}from"./index.Dg3lKJeg.js";const d=o.div`
  align-items: center;
  display: flex;
  gap: ${({theme:t})=>t.spacing(3)};
  background-color: ${({theme:t})=>t.background.secondary};
  padding: ${({theme:t})=>t.spacing(4)};
`,l=o.div`
  align-items: center;
  border: 2px solid ${({theme:t})=>t.border.color.light};
  border-radius: ${({theme:t})=>t.border.radius.sm};
  background-color: ${({theme:t})=>t.background.primary};
  display: flex;
  height: ${({theme:t})=>t.spacing(7)};
  justify-content: center;
  width: ${({theme:t})=>t.spacing(7)};
  min-width: ${({theme:t})=>t.icon.size.md};
`,g=o.div`
  color: ${({theme:t})=>t.font.color.primary};
  font-weight: ${({theme:t})=>t.font.weight.medium};
  margin-bottom: ${({theme:t})=>t.spacing(1)};
`,p=o.div`
  color: ${({theme:t})=>t.font.color.tertiary};
  font-size: ${({theme:t})=>t.font.size.sm};
`,c=o.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: scale(${({zoom:t})=>t}) rotate(${({rotate:t})=>t}deg);
`,m=({Icon:t,zoom:e=1,rotate:r=-4})=>{const n=s();return i(c,{zoom:e,rotate:r,children:i(t,{size:n.icon.size.lg,color:n.IllustrationIcon.color.gray,stroke:n.icon.stroke.md})})};export{m as S,l as a,g as b,p as c,d};
