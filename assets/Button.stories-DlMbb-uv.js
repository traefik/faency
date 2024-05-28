import{j as r,a as l,F as M}from"./jsx-runtime-WuQMLw89.js";import{R as N}from"./index-Dl6G-zuu.js";import{a as d}from"./Button-ClaIUCuY.js";import{I as Q}from"./react-icons.esm-C3slgq7o.js";import{U as V}from"./Link-BmXHhRCg.js";import{F as q}from"./Flex-jm7nIrzU.js";import{T as z}from"./Text-De0MgKz9.js";import"./stitches.config-CKE6G7UO.js";import"./modifyVariantsForStory-D3vOGtQO.js";import"./index-BSTPHMlZ.js";import"./extends-CF3RwP-h.js";const dr={title:"Components/Button",component:d,argTypes:{onClick:{action:"clicked"}}},o=t=>r(d,{...t,children:"Button"}),e=o.bind({});e.args={};const s=o.bind({});s.args={variant:"secondary"};const a=o.bind({});a.args={variant:"red"};const n=o.bind({});n.args={ghost:!0,variant:"secondary"};const c=o.bind({});c.args={disabled:!0};const X=t=>r(d,{...t,children:l(q,{css:{gap:"$2",alignItems:"center"},children:[r(Q,{}),r(z,{css:{color:"currentColor",lineHeight:"normal"},children:"Button"})]})}),p=X.bind({}),Y=({state:t,...J})=>{const[B,K]=N.useState(0);return l(M,{children:[l(z,{css:{pb:"$3"},children:["Tab ",B+1," is active"]}),r(q,{css:{gap:"$3"},children:[...Array(4)].map((Z,g)=>l(d,{...J,...B===g?{state:"active"}:{},onClick:()=>K(g),children:["Tab ",g+1]}))})]})},i=Y.bind({});i.args={};const m=o.bind({});m.args={state:"waiting"};const u=t=>r(d,{asChild:!0,...t,children:r(V,{href:"https://traefik.io",children:"Button"})});u.argTypes={state:{options:["waiting",void 0],control:"inline-radio"}};var y,S,F;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:"args => <ButtonForStory {...args}>Button</ButtonForStory>",...(F=(S=e.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var h,v,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:"args => <ButtonForStory {...args}>Button</ButtonForStory>",...(b=(v=s.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var T,f,x;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:"args => <ButtonForStory {...args}>Button</ButtonForStory>",...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var k,C,I;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:"args => <ButtonForStory {...args}>Button</ButtonForStory>",...(I=(C=n.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var A,W,$;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:"args => <ButtonForStory {...args}>Button</ButtonForStory>",...($=(W=c.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var L,R,U;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`args => <ButtonForStory {...args}>
    <Flex css={{
    gap: '$2',
    alignItems: 'center'
  }}>
      <InfoCircledIcon />
      <Text css={{
      color: 'currentColor',
      lineHeight: 'normal'
    }}>Button</Text>
    </Flex>
  </ButtonForStory>`,...(U=(R=p.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var _,j,w;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`({
  state,
  ...args
}) => {
  const [active, setActive] = React.useState(0);
  return <>
      <Text css={{
      pb: '$3'
    }}>Tab {active + 1} is active</Text>
      <Flex css={{
      gap: '$3'
    }}>
        {[...Array(4)].map((_, i) => <ButtonForStory {...args} {...active === i ? {
        state: 'active'
      } : {}} onClick={() => setActive(i)}>
            Tab {i + 1}
          </ButtonForStory>)}
      </Flex>
    </>;
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var D,G,H;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:"args => <ButtonForStory {...args}>Button</ButtonForStory>",...(H=(G=m.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var P,E,O;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`args => <ButtonForStory asChild {...args}>
    <UnstyledLink href="https://traefik.io">Button</UnstyledLink>
  </ButtonForStory>`,...(O=(E=u.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};const pr=["Primary","Secondary","Red","Ghost","Disabled","WithIcon","Active","Waiting","ButtonLink"];export{i as Active,u as ButtonLink,c as Disabled,n as Ghost,e as Primary,a as Red,s as Secondary,m as Waiting,p as WithIcon,pr as __namedExportsOrder,dr as default};
