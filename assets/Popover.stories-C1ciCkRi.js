import{j as r,a as e}from"./jsx-runtime-WuQMLw89.js";import{P as p,$ as l,a as m,b as F,c as w,d as A}from"./Popover-DLWl_4gM.js";import{m as R}from"./modifyVariantsForStory-D3vOGtQO.js";import{H as S}from"./react-icons.esm-C3slgq7o.js";import{C as d}from"./Container-CAzBZKOA.js";import{B as n}from"./Button-ClaIUCuY.js";import{T as u}from"./Text-De0MgKz9.js";import{F as j}from"./Flex-jm7nIrzU.js";import{B as I}from"./Box-CsPUZVXZ.js";import"./index-Dl6G-zuu.js";import"./stitches.config-CKE6G7UO.js";import"./extends-CF3RwP-h.js";import"./index-COmNUzeK.js";import"./index-D_wDWxb3.js";import"./index-BSTPHMlZ.js";import"./index-Dcc9teQf.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-CWDp4F3j.js";import"./index-CsAIWpTZ.js";import"./index-nOrHFD8e.js";import"./index-CH6e6d6N.js";import"./index-xl_aMJyq.js";import"./Panel-DnGxmVDB.js";import"./Elevation-CQxWisSY.js";const O=o=>r(A,{...o}),t=R(O),sr={title:"Components/Popover",component:t},k=o=>r(d,{children:e(t,{...o,children:[r(p,{asChild:!0,children:r(n,{children:"Open"})}),r(l,{children:r(m,{children:r(F,{asChild:!0,children:r(n,{ghost:!0,children:"Close"})})})})]})}),i=k.bind({}),s=o=>r(d,{children:e(t,{...o,children:[r(p,{asChild:!0,children:r(n,{children:"Open"})}),r(l,{children:e(m,{css:{p:"$3"},children:[r(u,{as:"p",css:{mb:"$2",color:"currentColor"},children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae iure tenetur velit animi magni rerum nulla totam reprehenderit, cum fugit omnis optio dicta molestias dolore itaque voluptatibus obcaecati eligendi. Architecto."}),e(j,{css:{justifyContent:"space-between"},children:[r(n,{variant:"secondary",children:"Learn more"}),r(F,{asChild:!0,children:r(n,{variant:"primary",children:"Close"})})]})]})})]})}),a=o=>r(d,{children:e(t,{...o,children:[r(p,{asChild:!0,children:r(n,{size:"small",children:r(S,{})})}),r(l,{children:r(m,{arrowCss:{fill:"$primary"},css:{bc:"$primary",p:"$2"},children:r(u,{css:{c:"$loContrast"},children:"Content"})})})]})}),c=o=>r(d,{children:e(t,{...o,children:[r(w,{asChild:!0,children:e(I,{css:{bc:"$01dp",p:"$2",display:"inline-block",c:"$hiContrast"},children:["Click on",r(p,{asChild:!0,children:r(n,{size:"small",css:{mx:"$2"},children:r(S,{})})}),"to open the anchor"]})}),r(l,{children:r(m,{arrowCss:{fill:"$primary"},css:{bc:"$primary",p:"$2"},children:r(u,{css:{c:"$loContrast"},children:"Content"})})})]})});var h,C,P;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => <Container>
    <PopoverForStory {...args}>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent>
          <PopoverClose asChild>
            <Button ghost>Close</Button>
          </PopoverClose>
        </PopoverContent>
      </PopoverPortal>
    </PopoverForStory>
  </Container>`,...(P=(C=i.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var v,g,$;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`args => <Container>
    <PopoverForStory {...args}>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent css={{
        p: '$3'
      }}>
          <Text as="p" css={{
          mb: '$2',
          color: 'currentColor'
        }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae iure tenetur velit
            animi magni rerum nulla totam reprehenderit, cum fugit omnis optio dicta molestias
            dolore itaque voluptatibus obcaecati eligendi. Architecto.
          </Text>
          <Flex css={{
          justifyContent: 'space-between'
        }}>
            <Button variant="secondary">Learn more</Button>
            <PopoverClose asChild>
              <Button variant="primary">Close</Button>
            </PopoverClose>
          </Flex>
        </PopoverContent>
      </PopoverPortal>
    </PopoverForStory>
  </Container>`,...($=(g=s.parameters)==null?void 0:g.docs)==null?void 0:$.source}}};var y,b,f;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`args => <Container>
    <PopoverForStory {...args}>
      <PopoverTrigger asChild>
        <Button size="small">
          <HamburgerMenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent arrowCss={{
        fill: '$primary'
      }} css={{
        bc: '$primary',
        p: '$2'
      }}>
          <Text css={{
          c: '$loContrast'
        }}>Content</Text>
        </PopoverContent>
      </PopoverPortal>
    </PopoverForStory>
  </Container>`,...(f=(b=a.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var B,x,T;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`args => <Container>
    <PopoverForStory {...args}>
      <PopoverAnchor asChild>
        <Box css={{
        bc: '$01dp',
        p: '$2',
        display: 'inline-block',
        c: '$hiContrast'
      }}>
          Click on
          <PopoverTrigger asChild>
            <Button size="small" css={{
            mx: '$2'
          }}>
              <HamburgerMenuIcon />
            </Button>
          </PopoverTrigger>
          to open the anchor
        </Box>
      </PopoverAnchor>
      <PopoverPortal>
        <PopoverContent arrowCss={{
        fill: '$primary'
      }} css={{
        bc: '$primary',
        p: '$2'
      }}>
          <Text css={{
          c: '$loContrast'
        }}>Content</Text>
        </PopoverContent>
      </PopoverPortal>
    </PopoverForStory>
  </Container>`,...(T=(x=c.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};const ar=["Basic","RichContent","IconTrigger","RowAnchor"];export{i as Basic,a as IconTrigger,s as RichContent,c as RowAnchor,ar as __namedExportsOrder,sr as default};
