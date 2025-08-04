import{M as $,br as w,bp as T,r as j,be as q,cP as V,i as A,p as P,a as i,j as r,cQ as b,cR as J,cS as Q,cT as X,au as B,n as S,cU as z,bs as G}from"./index.Dg3lKJeg.js";import{s as K,F as D}from"./useServerlessFunctionUpdateFormState.D-AWTq9y.js";import{I as H,a as W}from"./IconSquareRoundedX.C7on8jmz.js";import{S as Y}from"./serverlessFunctionFragment.D9YCFdm_.js";const Z=$`
  mutation ExecuteOneServerlessFunction(
    $input: ExecuteServerlessFunctionInput!
  ) {
    executeOneServerlessFunction(input: $input) {
      data
      logs
      duration
      status
      error
    }
  }
`,k=()=>{const t=w(),[n]=T(Z,{client:t});return{executeOneServerlessFunction:async o=>await n({variables:{input:o}})}},ie=({serverlessFunctionId:t,callback:n})=>{const[s,o]=j.useState(!1),{executeOneServerlessFunction:a}=k(),[u,c]=q(K(t));return{testServerlessFunction:async()=>{var d,O,f,v;try{o(!0),await V(200);const e=await a({id:t,payload:u.input,version:"draft"});o(!1),A((O=(d=e==null?void 0:e.data)==null?void 0:d.executeOneServerlessFunction)==null?void 0:O.data)&&(n==null||n((v=(f=e==null?void 0:e.data)==null?void 0:f.executeOneServerlessFunction)==null?void 0:v.data)),c(M=>{var E,F,x,m,g,N,R,h,y,C,I,_,L,U;return{...M,language:"json",height:300,output:{data:(F=(E=e==null?void 0:e.data)==null?void 0:E.executeOneServerlessFunction)!=null&&F.data?JSON.stringify((m=(x=e==null?void 0:e.data)==null?void 0:x.executeOneServerlessFunction)==null?void 0:m.data,null,4):void 0,logs:((N=(g=e==null?void 0:e.data)==null?void 0:g.executeOneServerlessFunction)==null?void 0:N.logs)||"",duration:(h=(R=e==null?void 0:e.data)==null?void 0:R.executeOneServerlessFunction)==null?void 0:h.duration,status:(C=(y=e==null?void 0:e.data)==null?void 0:y.executeOneServerlessFunction)==null?void 0:C.status,error:(_=(I=e==null?void 0:e.data)==null?void 0:I.executeOneServerlessFunction)!=null&&_.error?JSON.stringify((U=(L=e==null?void 0:e.data)==null?void 0:L.executeOneServerlessFunction)==null?void 0:U.error,null,4):void 0}}})}catch(e){throw o(!1),e}},isTesting:s}},ee=S.div`
  display: flex;
  flex-direction: column;
`,te=S.div`
  display: flex;
  font-size: ${({theme:t})=>t.font.size.md};
`,l=S.div`
  align-items: center;
  gap: ${({theme:t})=>t.spacing(1)};
  color: ${({theme:t,accent:n})=>n==="success"?t.color.turquoise:n==="error"?t.color.red:t.font.color.secondary};
  display: flex;
`,ue=({serverlessFunctionTestData:t,isTesting:n=!1})=>{const s=P(),o=t.output.data||t.output.error||"",a=i(l,{accent:"success",children:[r(b,{size:s.icon.size.md}),"200 OK - ",t.output.duration,"ms"]}),u=i(l,{accent:"error",children:[r(H,{size:s.icon.size.md}),"500 Error - ",t.output.duration,"ms"]}),c="Output",p=n&&i(l,{children:[r(J,{children:r(W,{size:s.icon.size.md})}),r(te,{children:"Running function"})]});return i(ee,{children:[r(X,{leftNodes:[n?p:t.output.status===z.ERROR?u:t.output.status===z.SUCCESS?a:c],rightNodes:[r(Q,{copyText:o})]}),r(B,{value:o,language:t.language,height:t.height,options:{readOnly:!0,domReadOnly:!0},isLoading:n,variant:"with-header"})]})},ne=$`
  ${Y}
  mutation UpdateOneServerlessFunction($input: UpdateServerlessFunctionInput!) {
    updateOneServerlessFunction(input: $input) {
      ...ServerlessFunctionFields
    }
  }
`,ce=t=>{const n=w(),[s]=T(ne,{client:n});return{updateOneServerlessFunction:async a=>await s({variables:{input:{...a,id:t}},refetchQueries:[G(D)??""]})}};export{ue as S,ie as a,ce as u};
