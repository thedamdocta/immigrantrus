import{o as j,p as Z,a6 as A,a,j as i,_ as M,b1 as re,ae as K,n as r,cV as le,a8 as ce,a9 as de,a2 as C,i as k,r as L,a4 as me,cW as ue,b6 as z,cX as W,cY as pe,b3 as he,aJ as P,cZ as fe,R as E,bz as ge,cw as ve,c_ as Se,bv as ye,z as Ie,l as T,H as N,bf as be,Z as h,c$ as Ce,cb as _e,cc as xe,d0 as R,bx as O,d as ke,d1 as We,a0 as $e,d2 as we,by as Ee,B as Te,d3 as Ne}from"./index.Dg3lKJeg.js";import{S as Re}from"./SettingsPageContainer.CJeLyK8s.js";import{S as De}from"./SubMenuTopBarContainer.BNGFwgBo.js";import{S as Le}from"./Table.6yesK_WS.js";import{S}from"./TableHeader.D43eMMOy.js";import{I as je}from"./IconLink.CigATr5g.js";import{I as Ae}from"./IconSend.DC3MhWFv.js";import{T as x,S as f}from"./TableRow.BM7bNp8J.js";import"./Breadcrumb.CQyf5Hn6.js";const Me=r.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`,ze=r.div`
  flex: 1;
  margin-right: ${({theme:e})=>e.spacing(2)};
`,Be=({inviteLink:e})=>{const{i18n:s,_:l}=j(),n=Z(),{enqueueSuccessSnackBar:o}=A();return a(Me,{"data-chromatic":"ignore",children:[i(ze,{children:i(M,{instanceId:"workspace-invite-link",value:e,disabled:!0,fullWidth:!0})}),i(K,{Icon:je,variant:"primary",accent:"blue",title:s._({id:"y1eoq1"}),onClick:()=>{o({message:s._({id:"pQjjYo"}),options:{icon:i(re,{size:n.icon.size.md}),duration:2e3}}),navigator.clipboard.writeText(e)}})]})},J=e=>Array.from(new Set(e.map(s=>s.trim().toLowerCase()).filter(s=>s.length>0))),qe=r.div`
  display: flex;
  flex-direction: row;
  padding-bottom: ${({theme:e})=>e.spacing(3)};
`,Fe=r.div`
  flex: 1;
  margin-right: ${({theme:e})=>e.spacing(2)};
`,Ge=e=>C.string().email(`Invalid email '${e}'`),Pe=()=>C.object({emails:C.string().superRefine((e,s)=>{if(!e.length)return;const l=J(e.split(","));l.length===0&&s.addIssue({code:C.ZodIssueCode.invalid_string,message:"Emails should not be empty",validation:"email"});const n=[];for(const o of l)Ge(o).safeParse(o).success||n.push(o);n.length>0&&s.addIssue({code:C.ZodIssueCode.invalid_string,message:n.length>1?'Emails "'+n.join('", "')+'" are invalid':'Email "'+n.join('", "')+'" is invalid',validation:"email"})})}).required(),Oe=()=>{const{i18n:e,_:s}=j(),{enqueueSuccessSnackBar:l,enqueueErrorSnackBar:n}=A(),{sendInvitation:o}=le(),{reset:m,handleSubmit:g,control:y,formState:$,watch:w}=ce({mode:"onSubmit",resolver:de(Pe()),defaultValues:{emails:""}}),c=!w("emails"),I=g(async({emails:b})=>{const u=J(b.split(",")),{data:d}=await o({emails:u});if(k(d)&&d.sendInvitations.result.length>0){l({message:`${d.sendInvitations.result.length} invitations sent`,options:{duration:2e3}});return}k(d)&&!d.sendInvitations.success&&n({options:{duration:5e3}})}),{isSubmitSuccessful:_,errors:v}=$;return L.useEffect(()=>{_&&m()},[_,m]),i("form",{onSubmit:I,children:a(qe,{children:[i(Fe,{children:i(me,{name:"emails",control:y,render:({field:{value:b,onChange:u},fieldState:{error:d}})=>i(M,{instanceId:"workspace-invite-team-emails",placeholder:"tim@apple.com, jony.ive@apple.dev",value:b,onChange:u,error:d==null?void 0:d.message,fullWidth:!0})})}),i(K,{Icon:Ae,variant:"primary",accent:"blue",title:e._({id:"MFKlMB"}),type:"submit",disabled:c||!!v.emails})]})})},Ve=()=>{const[e]=ue(),s=z(W);return{deleteWorkspaceInvitation:async({appTokenId:n})=>await e({variables:{appTokenId:n},onCompleted:()=>{s(o=>o.filter(m=>m.id!==n))}})}},He=()=>{const[e]=pe(),s=z(W);return{resendInvitation:async({appTokenId:n})=>await e({variables:{appTokenId:n},onCompleted:o=>{s(m=>[...o.resendWorkspaceInvitation.result,...m.filter(g=>g.id!==n)])}})}},V="workspace-member-deletion-modal",H=r.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-left: ${({theme:e})=>e.spacing(3)};
`,Q=r(Le)`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,U=r.div`
  display: flex;
  align-items: center;
  margin-right: ${({theme:e})=>e.spacing(2)};
`,D=r.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Qe=r.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
`,Ue=r(M)`
  input {
    background: ${({theme:e})=>e.background.transparent.lighter};
    border: 1px solid ${({theme:e})=>e.border.color.medium};
  }
`,Y=r.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,Ye=r(f)`
  color: ${({theme:e})=>e.font.color.tertiary};
`,si=()=>{const{i18n:e,_:s}=j(),{enqueueErrorSnackBar:l}=A(),n=Z(),[o,m]=L.useState(),{records:g}=he({objectNameSingular:P.WorkspaceMember}),{deleteOneRecord:y}=fe({objectNameSingular:P.WorkspaceMember}),{resendInvitation:$}=He(),{deleteWorkspaceInvitation:w}=Ve(),c=E(ge),I=E(ve),_=async t=>{await(y==null?void 0:y(t))},v=E(W),b=z(W),[u,d]=L.useState(""),X=t=>{d(t)};Se({onError:t=>{l({apolloError:t})},onCompleted:t=>{b((t==null?void 0:t.findWorkspaceInvitations)??[])}});const ee=async t=>{const p=await w({appTokenId:t});k(p.errors)&&l({message:e._({id:"QnVLjD"}),options:{duration:2e3}})},ie=async t=>{const p=await $({appTokenId:t});k(p.errors)&&l({message:e._({id:"clfpgU"}),options:{duration:2e3}})},te=t=>new Date(t)<new Date?e._({id:"M1RnFv"}):Ne(new Date(t)),B=u?g.filter(t=>{var q,F,G;const p=u.toLowerCase(),ae=((q=t.name.firstName)==null?void 0:q.toLowerCase())||"",se=((F=t.name.lastName)==null?void 0:F.toLowerCase())||"",oe=((G=t.userEmail)==null?void 0:G.toLowerCase())||"";return ae.includes(p)||se.includes(p)||oe.includes(p)}):g,{openModal:ne}=ye();return a(De,{title:e._({id:"wlQNTg"}),links:[{children:i(h,{id:"pmUArF"}),href:Ie(Te.Workspace)},{children:i(h,{id:"wlQNTg"})}],children:[a(Re,{children:[(c==null?void 0:c.inviteHash)&&(c==null?void 0:c.isPublicInviteLinkEnabled)&&a(T,{children:[i(N,{title:e._({id:"PWIq/W"}),description:e._({id:"Vy9kmk"})}),i(Be,{inviteLink:`${window.location.origin}/invite/${c==null?void 0:c.inviteHash}`})]}),a(T,{children:[i(N,{title:e._({id:"T6YjCk"}),description:e._({id:"N7fMy9"})}),i(Qe,{children:i(Ue,{instanceId:"workspace-members-search",value:u,onChange:X,placeholder:e._({id:"xdl79x"}),fullWidth:!0,LeftIcon:be,sizeVariant:"lg"})}),a(Q,{children:[a(x,{gridAutoColumns:"150px 1fr 1fr",mobileGridAutoColumns:"100px 1fr 1fr",children:[i(S,{children:i(h,{id:"6YtxFj"})}),i(S,{children:i(h,{id:"O3oNi5"})}),i(S,{align:"right"})]}),i(Y,{children:B.length>0?B.map(t=>a(x,{gridAutoColumns:"150px 1fr 1fr",mobileGridAutoColumns:"100px 1fr 1fr",children:[a(f,{children:[i(U,{children:i(Ce,{avatarUrl:t.avatarUrl,placeholderColorSeed:t.id,placeholder:t.name.firstName??"",type:"rounded",size:"sm"})}),i(D,{id:`hover-text-${t.id}`,children:t.name.firstName+" "+t.name.lastName}),i(_e,{anchorSelect:`#hover-text-${t.id}`,content:`${t.name.firstName} ${t.name.lastName}`,noArrow:!0,place:"top",positionStrategy:"fixed",delay:xe.shortDelay})]}),i(f,{children:i(D,{children:t.userEmail})}),i(f,{align:"right",children:(I==null?void 0:I.id)!==t.id&&i(H,{children:i(R,{onClick:()=>{ne(V),m(t.id)},variant:"tertiary",size:"medium",Icon:O})})})]},t.id)):i(Ye,{children:u?e._({id:"/nLvVj"}):e._({id:"UwvrGq"})})})]})]}),a(T,{children:[i(N,{title:e._({id:"0M8+El"}),description:e._({id:"mjK8F3"})}),i(Oe,{}),ke.isNonEmptyArray(v)&&a(Q,{children:[a(x,{gridAutoColumns:"250px 1fr 1fr",mobileGridAutoColumns:"100px 1fr 1fr",children:[i(S,{children:i(h,{id:"O3oNi5"})}),i(S,{align:"center",children:i(h,{id:"i9qiyR"})}),i(S,{})]}),i(Y,{children:v==null?void 0:v.map(t=>a(x,{gridAutoColumns:"250px 1fr 1fr",mobileGridAutoColumns:"100px 1fr 1fr",children:[a(f,{children:[i(U,{children:i(We,{size:n.icon.size.md,stroke:n.icon.stroke.sm})}),i(D,{children:t.email})]}),i(f,{align:"center",children:i($e,{color:"gray",text:te(t.expiresAt)})}),i(f,{align:"right",children:a(H,{children:[i(R,{onClick:()=>{ie(t.id)},variant:"tertiary",size:"medium",Icon:we}),i(R,{onClick:()=>{ee(t.id)},variant:"tertiary",size:"medium",Icon:O})]})})]},t.id))})]})]})]}),i(Ee,{modalId:V,title:e._({id:"nD0Y+a"}),subtitle:i(h,{id:"hqCwGc"}),onConfirmClick:()=>o&&_(o),confirmButtonText:e._({id:"ZDGm40"})})]})};export{si as SettingsWorkspaceMembers,V as WORKSPACE_MEMBER_DELETION_MODAL_ID};
