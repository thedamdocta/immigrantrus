import{m as S,o as C,p as m,R as a,q as E,s as p,t as u,v as _,w as A,F as M,a as f,j as s,C as o,x as I,y as b,z as h,A as x,B as F,E as z,n as O}from"./index.Dg3lKJeg.js";import{S as n}from"./SettingsCard.EuecTdsf.js";const y=O.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(2)};
`,P=()=>{const{triggerApisOAuth:e}=S(),{i18n:t,_:G}=C(),i=m(),c=a(E),d=a(p),l=a(u),r=a(_),g=A(M.IS_IMAP_SMTP_CALDAV_ENABLED);return f(y,{children:[(c||l)&&s(n,{Icon:s(I,{size:i.icon.size.md}),title:t._({id:"Zgi9Fd"}),onClick:()=>e(o.GOOGLE)}),(d||r)&&s(n,{Icon:s(b,{size:i.icon.size.md}),title:t._({id:"IOfqM8"}),onClick:()=>e(o.MICROSOFT)}),g&&s(z,{to:h(F.NewImapSmtpCaldavConnection),children:s(n,{Icon:s(x,{size:i.icon.size.md}),title:t._({id:"ffVcxj"})})})]})};export{P as S};
