import{j as i,dm as p,dn as _,n as c,dp as f,cL as T,aJ as g,a as r,h as o,H as u,dq as v,L as y,bT as E,b8 as I,R,cw as N,b3 as m,c1 as j,Y as O,ad as x,o as U,z as C,l as L,B as S,Z as l}from"./index.Dg3lKJeg.js";import{S as P}from"./SettingsOptionCardContentToggle.DYPf28jM.js";import{S as b}from"./index.DYjQm0RB.js";import"./AvailableTimezoneOptions.DphxNs1g.js";import{S as V}from"./SettingsNewAccountSection.BD7mj9cD.js";import{S as w}from"./SettingsPageContainer.CJeLyK8s.js";import{S as H}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./SettingsOptionIconCustomizer.BYkiWDDL.js";import"./SettingsAccountsListEmptyStateCard.C5yZXEkx.js";import"./SettingsCard.EuecTdsf.js";import"./Breadcrumb.CQyf5Hn6.js";const h=c(f)`
  height: ${({theme:t})=>t.spacing(6)};
`,M=[{title:{id:"wqF3jl"},description:{id:"MHLapp"},value:p.SHARE_EVERYTHING,cardMedia:i(h,{subject:"active",body:"active"})},{title:{id:"6GBt0m"},description:{id:"zii2Qj"},value:p.METADATA,cardMedia:i(h,{subject:"active",body:"inactive"})}],$=({onChange:t,value:e=p.SHARE_EVERYTHING})=>i(_,{name:"event-visibility",options:M,value:e,onChange:t}),k=c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing(6)};
`,F=({calendarChannel:t})=>{const{updateOneRecord:e}=T({objectNameSingular:g.CalendarChannel}),d=s=>{e({idToUpdate:t.id,updateOneRecordInput:{visibility:s}})},a=s=>{e({idToUpdate:t.id,updateOneRecordInput:{isContactAutoCreationEnabled:s}})};return r(k,{children:[r(b,{children:[i(u,{title:o._({id:"poC90w"}),description:o._({id:"bQkkFU"})}),i($,{value:t.visibility,onChange:d})]}),r(b,{children:[i(u,{title:o._({id:"Y2y0mC"}),description:o._({id:"YRT7ZW"})}),i(y,{rounded:!0,children:i(P,{Icon:v,title:o._({id:"2zJkmL"}),description:o._({id:"lgw3U4"}),checked:t.isContactAutoCreationEnabled,onChange:()=>{a(!t.isContactAutoCreationEnabled)}})})]})]})};c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing(4)};
`;c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing(6)};
  padding-top: ${({theme:t})=>t.spacing(6)};
`;const A="settings-account-calendar-channels-tab-list",z=c.div`
  padding-bottom: ${({theme:t})=>t.spacing(6)};
`,B=()=>{const t=E(I,A),e=R(N),{records:d}=m({objectNameSingular:g.ConnectedAccount,filter:{accountOwnerId:{eq:e==null?void 0:e.id}}}),{records:a}=m({objectNameSingular:g.CalendarChannel,filter:{connectedAccountId:{in:d.map(n=>n.id)}},skip:!d.length}),s=[...a.map(n=>({id:n.id,title:n.handle}))];return a.length?r(x,{children:[s.length>1&&i(z,{children:i(j,{tabs:s,componentInstanceId:A})}),a.map(n=>i(O.Fragment,{children:(a.length===1||n.id===t)&&i(F,{calendarChannel:n})},n.id)),!1]}):i(V,{})},it=()=>{const{i18n:t,_:e}=U();return i(H,{title:t._({id:"EUpfsd"}),links:[{children:i(l,{id:"7PzzBU"}),href:C(S.ProfilePage)},{children:i(l,{id:"bPwFdf"}),href:C(S.Accounts)},{children:i(l,{id:"EUpfsd"})}],children:i(w,{children:i(L,{children:i(B,{})})})})};export{it as SettingsAccountsCalendars};
