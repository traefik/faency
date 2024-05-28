import{j as e,a as n}from"./jsx-runtime-WuQMLw89.js";import{r as k}from"./index-Dl6G-zuu.js";import{m as P}from"./modifyVariantsForStory-D3vOGtQO.js";import{M as L}from"./react-icons.esm-C3slgq7o.js";import{B as p}from"./Box-CsPUZVXZ.js";import{A as i,a as t,b as c,c as U}from"./Accordion-BTNd7aAL.js";import{T as r}from"./Text-De0MgKz9.js";import{B as _}from"./Badge-Bu076I1w.js";import{D as R,a as H,b as J,c as K,d as N}from"./Dialog-Bug7HII1.js";import{B as Q}from"./Button-ClaIUCuY.js";import{F as u}from"./Flex-jm7nIrzU.js";import"./stitches.config-CKE6G7UO.js";import"./extends-CF3RwP-h.js";import"./index-D_wDWxb3.js";import"./index-DPefpsAX.js";import"./index-BSTPHMlZ.js";import"./index-COmNUzeK.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-xl_aMJyq.js";import"./index-CsAIWpTZ.js";import"./Elevation-CQxWisSY.js";import"./index-Dcc9teQf.js";import"./index-CWDp4F3j.js";import"./Card-DZEj9gwK.js";import"./IconButton-DvPQDc94.js";const W=o=>e(U,{...o}),A=P(W),fe={title:"Components/Accordion",component:A},T=({size:o,...I})=>e(p,{css:{width:300},children:n(A,{...I,children:[n(i,{value:"item-1",children:[e(t,{size:o,children:"Item1 Trigger"}),e(c,{size:o,children:"Item1 Content"})]}),n(i,{value:"item-2",children:[e(t,{size:o,children:"Item2 Trigger"}),e(c,{size:o,children:"Item2 Content"})]}),n(i,{value:"item-3",children:[e(t,{size:o,children:"Item3 Trigger"}),e(c,{size:o,children:"Item3 Content"})]})]})}),s=T.bind({});s.args={type:"single",size:"small"};s.argTypes={size:{control:"inline-radio",options:["small","medium","large"]}};const g=T.bind({});g.args={size:"large"};const a=T.bind({});a.args={type:"single",collapsible:!0};a.argTypes={size:{control:"inline-radio",options:["small","medium","large"]}};const d=T.bind({});d.args={type:"multiple",collapsible:!0};d.argTypes={size:{control:"inline-radio",options:["small","medium","large"]}};const l=o=>e(p,{css:{width:300},children:n(A,{...o,children:[n(i,{value:"item-1",children:[e(t,{children:n(u,{css:{flexGrow:1},align:"center",justify:"space-between",children:[e(r,{children:"Title"}),e(_,{children:"Status"}),e(r,{children:"Metadata"})]})}),e(c,{children:n(u,{gap:"2",children:[e(L,{}),e(r,{children:"More information"}),e(r,{children:"Version"})]})})]}),n(i,{value:"item-2",children:[e(t,{children:"Item2 Trigger"}),e(c,{children:"Item2 Content"})]})]})});l.args={type:"multiple",collapsible:!0};l.argTypes={size:{control:"inline-radio",options:["small","medium","large"]}};const m=o=>{const[I,C]=k.useState(!1);return n(R,{open:I,onOpenChange:h=>C(h),children:[e(H,{asChild:!0,children:e(Q,{onClick:()=>C(!0),children:"Open dialog"})}),e(p,{children:[...Array(10)].map((h,$)=>e(r,{css:{my:"$1"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},$))}),n(J,{children:[e(K,{}),e(N,{children:e(p,{css:{width:300,mt:"$5"},children:n(A,{...o,children:[n(i,{value:"item-1",children:[e(t,{children:n(u,{css:{flexGrow:1},align:"center",justify:"space-between",children:[e(r,{children:"Title"}),e(_,{children:"Status"}),e(r,{children:"Metadata"})]})}),e(c,{children:n(u,{gap:"2",children:[e(L,{}),e(r,{children:"More information"}),e(r,{children:"Version"})]})})]}),n(i,{value:"item-2",children:[e(t,{children:"Item2 Trigger"}),e(c,{children:"Item2 Content"})]})]})})})]})]})};m.args={type:"multiple",collapsible:!0};m.argTypes={size:{control:"inline-radio",options:["small","medium","large"]}};var x,z,y;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`({
  size,
  ...args
}) => <Box css={{
  width: 300
}}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger size={size}>Item1 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item1 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger size={size}>Item2 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item2 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger size={size}>Item3 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item3 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>`,...(y=(z=s.parameters)==null?void 0:z.docs)==null?void 0:y.source}}};var f,v,S;g.parameters={...g.parameters,docs:{...(f=g.parameters)==null?void 0:f.docs,source:{originalSource:`({
  size,
  ...args
}) => <Box css={{
  width: 300
}}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger size={size}>Item1 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item1 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger size={size}>Item2 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item2 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger size={size}>Item3 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item3 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>`,...(S=(v=g.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var B,b,F;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`({
  size,
  ...args
}) => <Box css={{
  width: 300
}}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger size={size}>Item1 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item1 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger size={size}>Item2 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item2 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger size={size}>Item3 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item3 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>`,...(F=(b=a.parameters)==null?void 0:b.docs)==null?void 0:F.source}}};var w,D,M;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`({
  size,
  ...args
}) => <Box css={{
  width: 300
}}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger size={size}>Item1 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item1 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger size={size}>Item2 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item2 Content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger size={size}>Item3 Trigger</AccordionTrigger>
        <AccordionContent size={size}>Item3 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>`,...(M=(D=d.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var O,q,j;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`args => <Box css={{
  width: 300
}}>
    <AccordionForStory {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Flex css={{
          flexGrow: 1
        }} align="center" justify="space-between">
            <Text>Title</Text>
            <Badge>Status</Badge>
            <Text>Metadata</Text>
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <Flex gap="2">
            <MagnifyingGlassIcon />
            <Text>More information</Text>
            <Text>Version</Text>
          </Flex>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item2 Trigger</AccordionTrigger>
        <AccordionContent>Item2 Content</AccordionContent>
      </AccordionItem>
    </AccordionForStory>
  </Box>`,...(j=(q=l.parameters)==null?void 0:q.docs)==null?void 0:j.source}}};var G,V,E;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </DialogTrigger>

      <Box>
        {[...Array(10)].map((_, i) => <Text key={i} css={{
        my: '$1'
      }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>)}
      </Box>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Box css={{
          width: 300,
          mt: '$5'
        }}>
            <AccordionForStory {...args}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Flex css={{
                  flexGrow: 1
                }} align="center" justify="space-between">
                    <Text>Title</Text>
                    <Badge>Status</Badge>
                    <Text>Metadata</Text>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  <Flex gap="2">
                    <MagnifyingGlassIcon />
                    <Text>More information</Text>
                    <Text>Version</Text>
                  </Flex>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Item2 Trigger</AccordionTrigger>
                <AccordionContent>Item2 Content</AccordionContent>
              </AccordionItem>
            </AccordionForStory>
          </Box>
        </DialogContent>
      </DialogPortal>
    </Dialog>;
}`,...(E=(V=m.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};const ve=["Single","Large","Collapsible","MultipleCollapsible","Complex","InsideModal"];export{a as Collapsible,l as Complex,m as InsideModal,g as Large,d as MultipleCollapsible,s as Single,ve as __namedExportsOrder,fe as default};
