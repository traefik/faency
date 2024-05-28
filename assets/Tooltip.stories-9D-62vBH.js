import{j as o,a as s}from"./jsx-runtime-WuQMLw89.js";import{T as h}from"./Tooltip-CfKSzXzN.js";import{m as f}from"./modifyVariantsForStory-D3vOGtQO.js";import{k as S,l as F}from"./react-icons.esm-C3slgq7o.js";import{s as k}from"./stitches.config-CKE6G7UO.js";import{C as B}from"./Container-CAzBZKOA.js";import{B as W}from"./Box-CsPUZVXZ.js";import{T as n}from"./Text-De0MgKz9.js";import{F as a}from"./Flex-jm7nIrzU.js";import"./index-Dl6G-zuu.js";import"./index-CtlLVxo4.js";import"./extends-CF3RwP-h.js";import"./index-COmNUzeK.js";import"./index-D_wDWxb3.js";import"./index-BSTPHMlZ.js";import"./index-Dcc9teQf.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-CsAIWpTZ.js";import"./index-nOrHFD8e.js";import"./index-CH6e6d6N.js";import"./index-xl_aMJyq.js";import"./index-B9ccl3Eh.js";const D=i=>o(h,{...i}),y=f(D);k(W,{my:"$8",border:"1px dashed $primary"});const Z={title:"Components/Tooltip",component:y},l=i=>o(B,{children:o(y,{...i,children:o(n,{css:{display:"inline-block"},children:"Tooltip label"})})}),t=l.bind({});t.args={content:"This is some tooltip text"};const e=l.bind({});e.args={multiline:!0,content:"This is some tooltip text. This box shows the max amount of text to display. If more room is needed, use a modal instead."};const r=l.bind({}),b=s(a,{align:"center",gap:2,children:[o(S,{}),o(n,{css:{color:"currentColor"},children:"Warning message"})]}),H=s(a,{align:"center",gap:2,children:[o(F,{}),o(n,{css:{color:"currentColor"},children:"Disabled message"})]}),O=s(a,{align:"center",gap:2,children:[o(n,{css:{fontWeight:700,color:"CurrentColor"},children:"Heading"}),o(n,{css:{color:"currentColor"},children:"Content"})]});r.args={content:b};r.argTypes={content:{options:["Warning","Disabled","Heading"],mapping:{Warning:b,Disabled:H,Heading:O}}};var p,c,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => <Container>
    <TooltipForStory {...args}>
      <Text css={{
      display: 'inline-block'
    }}>Tooltip label</Text>
    </TooltipForStory>
  </Container>`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var d,g,T;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => <Container>
    <TooltipForStory {...args}>
      <Text css={{
      display: 'inline-block'
    }}>Tooltip label</Text>
    </TooltipForStory>
  </Container>`,...(T=(g=e.parameters)==null?void 0:g.docs)==null?void 0:T.source}}};var u,x,C;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => <Container>
    <TooltipForStory {...args}>
      <Text css={{
      display: 'inline-block'
    }}>Tooltip label</Text>
    </TooltipForStory>
  </Container>`,...(C=(x=r.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const oo=["Basic","MultiLine","NodeContent"];export{t as Basic,e as MultiLine,r as NodeContent,oo as __namedExportsOrder,Z as default};
