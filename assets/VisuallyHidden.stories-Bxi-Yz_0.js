import{j as r,a as y}from"./jsx-runtime-WuQMLw89.js";import{V as a}from"./VisuallyHidden-CmDrAEVH.js";import{G as v}from"./react-icons.esm-C3slgq7o.js";import{s as x}from"./stitches.config-CKE6G7UO.js";import{C as t}from"./Card-DZEj9gwK.js";import{f as o,C as d}from"./Table-XnNRkLC8.js";import"./index-Dl6G-zuu.js";import"./index-B9ccl3Eh.js";import"./extends-CF3RwP-h.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-BSTPHMlZ.js";import"./Elevation-CQxWisSY.js";import"./Label-C-FSa_nZ.js";import"./Text-De0MgKz9.js";import"./Flex-jm7nIrzU.js";import"./Box-CsPUZVXZ.js";const f=x("button",{m:0,p:0,color:"$hiContrast",border:"1px dashed $hiContrast",display:"flex",background:"none"}),b=x("div",{color:"$hiContrast"}),w={title:"Components/VisuallyHidden",component:a},e=s=>r(b,{children:r(a,{...s,children:"Hidden visually"})}),i=s=>y(f,{children:[r(v,{}),r(a,{...s,children:"Settings"})]}),n=s=>y(b,{children:[r(t,{children:r(o,{css:{minHeight:50,border:"1px dashed $hiContrast"},children:r(a,{...s,children:r(d,{children:"Hidden visually"})})})}),r(t,{children:r(o,{css:{minHeight:50,border:"1px dashed $hiContrast"},children:r(d,{children:"Not hidden visually"})})})]});n.args={asChild:!0};var l,c,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => <ContrastDiv>
    <VisuallyHidden {...args}>Hidden visually</VisuallyHidden>
  </ContrastDiv>`,...(p=(c=e.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,h,u;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`args => <FlexButton>
    <GearIcon />
    <VisuallyHidden {...args}>Settings</VisuallyHidden>
  </FlexButton>`,...(u=(h=i.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var C,H,g;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`args => <ContrastDiv>
    <Card>
      <Table css={{
      minHeight: 50,
      border: '1px dashed $hiContrast'
    }}>
        <VisuallyHidden {...args}>
          <Caption>Hidden visually</Caption>
        </VisuallyHidden>
      </Table>
    </Card>
    <Card>
      <Table css={{
      minHeight: 50,
      border: '1px dashed $hiContrast'
    }}>
        <Caption>Not hidden visually</Caption>
      </Table>
    </Card>
  </ContrastDiv>`,...(g=(H=n.parameters)==null?void 0:H.docs)==null?void 0:g.source}}};const z=["Basic","HiddenButtonText","AsChild"];export{n as AsChild,e as Basic,i as HiddenButtonText,z as __namedExportsOrder,w as default};
