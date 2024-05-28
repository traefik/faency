import{a,j as e}from"./jsx-runtime-WuQMLw89.js";import{k as ae,s as re}from"./stitches.config-CKE6G7UO.js";import{m as ie}from"./modifyVariantsForStory-D3vOGtQO.js";import{b as oe}from"./react-icons.esm-C3slgq7o.js";import{a as se,H as ce,b as le,c as de,d as me,e as pe}from"./Heading-6EoCpiwd.js";import{B as o}from"./Bubble-NgO2-LTf.js";import{F as t}from"./Flex-jm7nIrzU.js";import{T as ue}from"./Text-De0MgKz9.js";import{A as k}from"./Avatar-C0zzFfC6.js";import{B as S}from"./Button-ClaIUCuY.js";import{B as b}from"./Badge-Bu076I1w.js";import{B as he}from"./Box-CsPUZVXZ.js";import"./index-Dl6G-zuu.js";import"./extends-CF3RwP-h.js";import"./index-D_wDWxb3.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-BSTPHMlZ.js";const ge=ae({"0%":{opacity:0},"100%":{opacity:"100%"}}),n=re("div",{backgroundColor:"$skeletonBackground",position:"relative",overflow:"hidden",borderRadius:"3px",height:"auto",width:"auto","&:not(:empty)":{"& > *":{visibility:"hidden",display:"block"},maxWidth:"fit-content"},"&::after":{animationName:`${ge}`,animationDuration:"500ms",animationDirection:"alternate",animationIterationCount:"infinite",animationTimingFunction:"ease-in-out",backgroundColor:"$skeletonAnimation",borderRadius:"inherit",bottom:0,content:'""',left:0,position:"absolute",right:0,top:0},variants:{variant:{square:{borderRadius:"$2"},circle:{borderRadius:"$round"},badge:{borderRadius:"$pill",display:"inline-flex"},button:{borderRadius:"$3",display:"inline-flex"},text:{"&:empty:before":{content:'"\\00a0"'}}}},defaultVariants:{variant:"text"}});try{n.displayName="Skeleton",n.__docgenInfo={description:"",displayName:"Skeleton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"text" | "button" | "circle" | "square" | "badge" | ({ "@light"?: "text" | "button" | "circle" | "square" | "badge"; "@bp1"?: "text" | "button" | "circle" | "square" | "badge"; ... 6 more ...; "@initial"?: "text" | ... 4 more ... | undefined; } & { ...; }) | undefined'}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}const xe=r=>e(n,{...r}),ve=ie(xe),je={title:"Components/Skeleton",component:ve},s=()=>a(t,{align:"center",direction:"row",gap:"3",children:[e(n,{variant:"square",css:{size:"$3"}}),e(n,{variant:"square",css:{size:"$6"}}),e(n,{variant:"square",css:{size:"$9"}})]}),c=()=>a(t,{align:"center",direction:"row",gap:"3",children:[e(n,{variant:"circle",css:{size:"$3"}}),e(n,{variant:"circle",css:{size:"$6"}}),e(n,{variant:"circle",css:{size:"$9"}})]}),l=()=>a(t,{align:"center",direction:"row",gap:"3",children:[e(n,{variant:"badge",css:{height:"$5",width:"$6"}}),e(n,{variant:"badge",css:{height:"$5",width:"$8"}}),e(n,{variant:"badge",css:{height:"$5",width:"$10"}})]}),d=()=>a(t,{align:"center",direction:"row",gap:"3",children:[e(n,{variant:"button",css:{height:"$5",width:"$6"}}),e(n,{variant:"button",css:{height:"$5",width:"$8"}}),e(n,{variant:"button",css:{height:"$5",width:"$10"}})]}),m=()=>a(t,{align:"center",direction:"row",gap:"3",children:[e(n,{variant:"text",css:{height:"$5",width:"$6"}}),e(n,{variant:"text",css:{height:"$5",width:"$8"}}),e(n,{variant:"text",css:{height:"$5",width:"$10"}})]}),Se=["3","6","9","12"],p=()=>a(t,{gap:"3",direction:"column",children:[e(se,{children:e(n,{variant:"text"})}),e(ce,{children:e(n,{variant:"text"})}),e(le,{children:e(n,{variant:"text"})}),e(de,{children:e(n,{variant:"text"})}),e(me,{children:e(n,{variant:"text"})}),e(pe,{children:e(n,{variant:"text"})}),Se.map(r=>e(ue,{size:r,children:e(n,{variant:"text"})}))]}),ke=["1","2","3","4","5","6"],u=()=>e(t,{gap:"3",align:"center",children:ke.map(r=>a(t,{gap:"3",align:"center",direction:"column",children:[e(n,{variant:"circle",children:e(k,{size:r})}),e(n,{variant:"square",children:e(k,{size:r})})]}))}),h=()=>a(t,{gap:"3",direction:"column",children:[e(n,{variant:"button",children:e(S,{css:{width:60},size:"small"})}),e(n,{variant:"button",children:e(S,{css:{width:90},size:"medium"})}),e(n,{variant:"button",children:e(S,{css:{width:120},size:"large"})})]}),g=()=>a(t,{gap:"3",direction:"column",children:[e(n,{variant:"badge",children:e(b,{css:{width:60},size:"small"})}),e(n,{variant:"badge",children:e(b,{css:{width:140},size:"large"})})]}),x=()=>a(t,{gap:"3",direction:"column",children:[e(n,{variant:"circle",children:e(o,{noAnimation:!0,size:"x-small"})}),e(n,{variant:"circle",children:e(o,{noAnimation:!0,size:"small"})}),e(n,{variant:"circle",children:e(o,{noAnimation:!0,size:"medium"})}),e(n,{variant:"circle",children:e(o,{noAnimation:!0,size:"large"})}),e(n,{variant:"circle",children:e(o,{noAnimation:!0,size:"x-large"})})]}),i=r=>a(t,{gap:"3",direction:"column",children:[e(n,{...r,children:e(he,{css:{width:35,height:20}})}),e(n,{...r,children:e(oe,{})})]});i.args={variant:"square"};i.argTypes={variant:{options:["square","circle","badge","button","text"],control:"inline-radio"}};const v=()=>a(t,{direction:"column",gap:3,children:[e(n,{css:{width:"30%"}}),e(n,{css:{width:"20%"}}),a(t,{gap:3,children:[e(t,{direction:"column",gap:2,css:{flex:1},children:Array(10).fill(0).map(()=>e(n,{variant:"text"}))}),e(t,{direction:"column",gap:2,css:{flex:1},children:Array(10).fill(0).map(()=>e(n,{variant:"text"}))})]}),e(n,{css:{width:"20%"}}),a(t,{gap:3,children:[e(n,{css:{height:"400px",flex:1}}),e(n,{css:{height:"300px",flex:1}}),e(n,{css:{height:"350px",flex:1}})]})]});var f,$,w;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`() => <Flex align="center" direction="row" gap="3">
    <Skeleton variant="square" css={{
    size: '$3'
  }} />
    <Skeleton variant="square" css={{
    size: '$6'
  }} />
    <Skeleton variant="square" css={{
    size: '$9'
  }} />
  </Flex>`,...(w=($=s.parameters)==null?void 0:$.docs)==null?void 0:w.source}}};var F,z,y;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`() => <Flex align="center" direction="row" gap="3">
    <Skeleton variant="circle" css={{
    size: '$3'
  }} />
    <Skeleton variant="circle" css={{
    size: '$6'
  }} />
    <Skeleton variant="circle" css={{
    size: '$9'
  }} />
  </Flex>`,...(y=(z=c.parameters)==null?void 0:z.docs)==null?void 0:y.source}}};var B,A,H;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`() => <Flex align="center" direction="row" gap="3">
    <Skeleton variant="badge" css={{
    height: '$5',
    width: '$6'
  }} />
    <Skeleton variant="badge" css={{
    height: '$5',
    width: '$8'
  }} />
    <Skeleton variant="badge" css={{
    height: '$5',
    width: '$10'
  }} />
  </Flex>`,...(H=(A=l.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var q,T,I;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`() => <Flex align="center" direction="row" gap="3">
    <Skeleton variant="button" css={{
    height: '$5',
    width: '$6'
  }} />
    <Skeleton variant="button" css={{
    height: '$5',
    width: '$8'
  }} />
    <Skeleton variant="button" css={{
    height: '$5',
    width: '$10'
  }} />
  </Flex>`,...(I=(T=d.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var C,_,E;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`() => <Flex align="center" direction="row" gap="3">
    <Skeleton variant="text" css={{
    height: '$5',
    width: '$6'
  }} />
    <Skeleton variant="text" css={{
    height: '$5',
    width: '$8'
  }} />
    <Skeleton variant="text" css={{
    height: '$5',
    width: '$10'
  }} />
  </Flex>`,...(E=(_=m.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var R,V,j;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`() => <Flex gap="3" direction="column">
    <H1>
      <Skeleton variant="text" />
    </H1>
    <H2>
      <Skeleton variant="text" />
    </H2>
    <H3>
      <Skeleton variant="text" />
    </H3>
    <H4>
      <Skeleton variant="text" />
    </H4>
    <H5>
      <Skeleton variant="text" />
    </H5>
    <H6>
      <Skeleton variant="text" />
    </H6>

    {TEXT_SIZES.map(size => <FaencyText size={size}>
        <Skeleton variant="text" />
      </FaencyText>)}
  </Flex>`,...(j=(V=p.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var D,Z,N;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`() => <Flex gap="3" align="center">
    {AVATAR_SIZES.map(size => <Flex gap="3" align="center" direction="column">
        <Skeleton variant="circle">
          <Avatar size={size} />
        </Skeleton>
        <Skeleton variant="square">
          <Avatar size={size} />
        </Skeleton>
      </Flex>)}
  </Flex>`,...(N=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:N.source}}};var L,M,O;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`() => <Flex gap="3" direction="column">
    <Skeleton variant="button">
      <FaencyButton css={{
      width: 60
    }} size="small" />
    </Skeleton>
    <Skeleton variant="button">
      <FaencyButton css={{
      width: 90
    }} size="medium" />
    </Skeleton>
    <Skeleton variant="button">
      <FaencyButton css={{
      width: 120
    }} size="large" />
    </Skeleton>
  </Flex>`,...(O=(M=h.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var X,W,G;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`() => <Flex gap="3" direction="column">
    <Skeleton variant="badge">
      <FaencyBadge css={{
      width: 60
    }} size="small" />
    </Skeleton>
    <Skeleton variant="badge">
      <FaencyBadge css={{
      width: 140
    }} size="large" />
    </Skeleton>
  </Flex>`,...(G=(W=g.parameters)==null?void 0:W.docs)==null?void 0:G.source}}};var J,K,P;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`() => <Flex gap="3" direction="column">
    <Skeleton variant="circle">
      <Bubble noAnimation size="x-small" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="small" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="medium" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="large" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="x-large" />
    </Skeleton>
  </Flex>`,...(P=(K=x.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var Q,U,Y;i.parameters={...i.parameters,docs:{...(Q=i.parameters)==null?void 0:Q.docs,source:{originalSource:`args => <Flex gap="3" direction="column">
    <Skeleton {...args}>
      <Box css={{
      width: 35,
      height: 20
    }} />
    </Skeleton>
    <Skeleton {...args}>
      <Cross1Icon />
    </Skeleton>
  </Flex>`,...(Y=(U=i.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var ee,ne,te;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`() => <Flex direction="column" gap={3}>
    <Skeleton css={{
    width: '30%'
  }} />
    <Skeleton css={{
    width: '20%'
  }} />
    <Flex gap={3}>
      <Flex direction="column" gap={2} css={{
      flex: 1
    }}>
        {Array(10).fill(0).map(() => <Skeleton variant="text" />)}
      </Flex>
      <Flex direction="column" gap={2} css={{
      flex: 1
    }}>
        {Array(10).fill(0).map(() => <Skeleton variant="text" />)}
      </Flex>
    </Flex>
    <Skeleton css={{
    width: '20%'
  }} />
    <Flex gap={3}>
      <Skeleton css={{
      height: '400px',
      flex: 1
    }} />
      <Skeleton css={{
      height: '300px',
      flex: 1
    }} />
      <Skeleton css={{
      height: '350px',
      flex: 1
    }} />
    </Flex>
  </Flex>`,...(te=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};const De=["Square","Circle","Badge","Button","Text","Typographies","Avatars","ButtonInferred","BadgeInferred","BubbleInferred","CustomInferred","Customs"];export{u as Avatars,l as Badge,g as BadgeInferred,x as BubbleInferred,d as Button,h as ButtonInferred,c as Circle,i as CustomInferred,v as Customs,s as Square,m as Text,p as Typographies,De as __namedExportsOrder,je as default};
