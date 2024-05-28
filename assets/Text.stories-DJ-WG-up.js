import{a as n,j as r}from"./jsx-runtime-WuQMLw89.js";import{T as v}from"./Text-De0MgKz9.js";import{m as b}from"./modifyVariantsForStory-D3vOGtQO.js";import{F as i}from"./Flex-jm7nIrzU.js";import{B as M}from"./Box-CsPUZVXZ.js";import"./index-Dl6G-zuu.js";import"./stitches.config-CKE6G7UO.js";const C=o=>r(v,{...o}),e=b(C),W={title:"Components/Text",component:e},I=o=>r(e,{...o,children:"Makes Networking Boring"}),a=I.bind({});a.args={};const R=["$primary","$purple10"],s=({variant:o,...t})=>n(i,{align:"center",justify:"center",css:{height:100},gap:2,children:[r(e,{...t,variant:"default",children:"Default"}),r(e,{...t,variant:"subtle",children:"Subtle"}),r(e,{...t,variant:"contrast",children:"Contrast"}),r(e,{...t,variant:"red",children:"Red (error text)"}),r(e,{...t,variant:"invalid",children:"Invalid (invalid field)"})]}),c=({transform:o,...t})=>n(i,{gap:2,children:[r(e,{...t,children:"default text"}),r(e,{...t,transform:"uppercase",children:"uppercase text"}),r(e,{...t,transform:"capitalize",children:"capitalize text"}),r(e,{...t,transform:"capitalizeWords",children:"capitalize each word"}),R.map(g=>n(i,{direction:"column",align:"center",justify:"center",css:{color:g,border:"1px dashed currentColor",height:100,width:100,position:"relative"},children:[r(e,{...t,variant:"inherit",children:"Inherit"}),r(M,{css:{position:"absolute",bottom:0,fontSize:"$1"},children:"Parent color"})]}))]}),$=["$4","$12"],l=({size:o,...t})=>n(i,{gap:2,direction:"column",children:[r(e,{...t,size:"0",children:"Makes Networking Boring"}),r(e,{...t,size:"1",children:"Makes Networking Boring"}),r(e,{...t,size:"2",children:"Makes Networking Boring"}),r(e,{...t,size:"3",children:"Makes Networking Boring"}),r(e,{...t,size:"4",children:"Makes Networking Boring"}),r(e,{...t,size:"5",children:"Makes Networking Boring"}),r(e,{...t,size:"6",children:"Makes Networking Boring"}),r(e,{...t,size:"7",children:"Makes Networking Boring"}),r(e,{...t,size:"8",children:"Makes Networking Boring"}),r(e,{...t,size:"9",children:"Makes Networking Boring"}),r(e,{...t,size:"10",children:"Makes Networking Boring"}),r(e,{...t,size:"11",children:"Makes Networking Boring"}),r(e,{...t,size:"12",children:"Makes Networking Boring"}),$.map(g=>n(i,{css:{fontSize:g,border:"1px dashed $hiContrast",justifyContent:"space-between"},children:[r(e,{...t,size:"inherit",children:"Inherit"}),r(M,{css:{color:"$hiContrast"},children:"Parent fontSize"})]}))]}),d=o=>n(i,{gap:2,direction:"column",children:[r(e,{...o,children:"Default"}),r(e,{...o,weight:"light",children:"Light"}),r(e,{...o,weight:"regular",children:"Regular"}),r(e,{...o,weight:"medium",children:"Medium"}),r(e,{...o,weight:"semiBold",children:"SemiBold"}),r(e,{...o,weight:"bold",children:"Bold"})]});var x,S,h;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:"args => <TextForStory {...args}>Makes Networking Boring</TextForStory>",...(h=(S=a.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var F,T,p;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`({
  variant,
  ...args
}) => <Flex align="center" justify="center" css={{
  height: 100
}} gap={2}>
    <TextForStory {...args} variant="default">
      Default
    </TextForStory>
    <TextForStory {...args} variant="subtle">
      Subtle
    </TextForStory>
    <TextForStory {...args} variant="contrast">
      Contrast
    </TextForStory>
    <TextForStory {...args} variant="red">
      Red (error text)
    </TextForStory>
    <TextForStory {...args} variant="invalid">
      Invalid (invalid field)
    </TextForStory>
  </Flex>`,...(p=(T=s.parameters)==null?void 0:T.docs)==null?void 0:p.source}}};var m,y,u;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`({
  transform,
  ...args
}) => <Flex gap={2}>
    <TextForStory {...args}>default text</TextForStory>
    <TextForStory {...args} transform="uppercase">
      uppercase text
    </TextForStory>
    <TextForStory {...args} transform="capitalize">
      capitalize text
    </TextForStory>
    <TextForStory {...args} transform="capitalizeWords">
      capitalize each word
    </TextForStory>
    {VARIANT_PARENTS.map(color => <Flex direction="column" align="center" justify="center" css={{
    color,
    border: '1px dashed currentColor',
    height: 100,
    width: 100,
    position: 'relative'
  }}>
        <TextForStory {...args} variant="inherit">
          Inherit
        </TextForStory>
        <Box css={{
      position: 'absolute',
      bottom: 0,
      fontSize: '$1'
    }}>Parent color</Box>
      </Flex>)}
  </Flex>`,...(u=(y=c.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var k,z,w;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`({
  size,
  ...args
}) => <Flex gap={2} direction="column">
    <TextForStory {...args} size="0">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="1">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="2">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="3">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="4">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="5">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="6">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="7">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="8">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="9">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="10">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="11">
      Makes Networking Boring
    </TextForStory>
    <TextForStory {...args} size="12">
      Makes Networking Boring
    </TextForStory>
    {SIZE_PARENTS.map(fontSize => <Flex css={{
    fontSize,
    border: '1px dashed $hiContrast',
    justifyContent: 'space-between'
  }}>
        <TextForStory {...args} size="inherit">
          Inherit
        </TextForStory>
        <Box css={{
      color: '$hiContrast'
    }}>Parent fontSize</Box>
      </Flex>)}
  </Flex>`,...(w=(z=l.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};var B,f,N;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`args => <Flex gap={2} direction="column">
    <TextForStory {...args}>Default</TextForStory>
    <TextForStory {...args} weight="light">
      Light
    </TextForStory>
    <TextForStory {...args} weight="regular">
      Regular
    </TextForStory>
    <TextForStory {...args} weight="medium">
      Medium
    </TextForStory>
    <TextForStory {...args} weight="semiBold">
      SemiBold
    </TextForStory>
    <TextForStory {...args} weight="bold">
      Bold
    </TextForStory>
  </Flex>`,...(N=(f=d.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};const L=["Basic","Variant","Transform","Size","Weight"];export{a as Basic,l as Size,c as Transform,s as Variant,d as Weight,L as __namedExportsOrder,W as default};
