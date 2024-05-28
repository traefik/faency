import{a as U,j as r}from"./jsx-runtime-WuQMLw89.js";import{B as a,C as j}from"./Badge-Bu076I1w.js";import{m as I}from"./modifyVariantsForStory-D3vOGtQO.js";import{F as A}from"./Flex-jm7nIrzU.js";import{U as _}from"./Link-BmXHhRCg.js";import"./index-Dl6G-zuu.js";import"./stitches.config-CKE6G7UO.js";import"./index-BSTPHMlZ.js";import"./extends-CF3RwP-h.js";import"./Text-De0MgKz9.js";const E=e=>r(a,{...e}),T=I(E),Q={title:"Components/Badge",component:T,argTypes:{size:{control:"inline-radio"},variant:{control:"select"},borderless:{control:"boolean"}}},o=e=>U(A,{css:{gap:"$3"},children:[r(a,{...e,children:"Default"}),j.map(s=>r(a,{...e,variant:s,children:s},s))]});o.args={interactive:!1,size:"small",variant:"gray",borderless:!1};const t=o.bind({});t.args={alphaBg:!0};const n=e=>r(a,{...e,children:"Small badge"});n.args={interactive:!1,size:"small",variant:"blue",borderless:!1};const c=e=>r(a,{...e,children:"Large badge"});c.args={interactive:!1,size:"large",variant:"green",borderless:!1};const l=e=>U(A,{css:{gap:"$3"},children:[r(a,{...e,children:"Default"}),j.map(s=>r(a,{...e,variant:s,children:s}))]});l.args={interactive:!0,size:"small",variant:"gray",borderless:!1};const d=e=>r(a,{asChild:!0,interactive:!0,...e,children:r(_,{href:"https://traefik.io",children:"Link"})}),i=e=>r(a,{...e,children:"Borderless badge"});i.args={interactive:!0,size:"small",variant:"neon",borderless:!0};var g,m,p;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => <Flex css={{
  gap: '$3'
}}>
    <Badge {...args}>Default</Badge>
    {COLORS.map(color => <Badge key={color} {...args} variant={color}>
        {color}
      </Badge>)}
  </Flex>`,...(p=(m=o.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,B,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => <Flex css={{
  gap: '$3'
}}>
    <Badge {...args}>Default</Badge>
    {COLORS.map(color => <Badge key={color} {...args} variant={color}>
        {color}
      </Badge>)}
  </Flex>`,...(f=(B=t.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var h,v,S;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:"args => <Badge {...args}>Small badge</Badge>",...(S=(v=n.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var b,L,k;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:"args => <Badge {...args}>Large badge</Badge>",...(k=(L=c.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var x,y,C;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`args => <Flex css={{
  gap: '$3'
}}>
    <Badge {...args}>Default</Badge>
    {COLORS.map(color => <Badge {...args} variant={color}>
        {color}
      </Badge>)}
  </Flex>`,...(C=(y=l.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var F,O,z;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`args => <Badge asChild interactive {...args}>
    <UnstyledLink href="https://traefik.io">Link</UnstyledLink>
  </Badge>`,...(z=(O=d.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var D,$,R;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:"args => <Badge {...args}>Borderless badge</Badge>",...(R=($=i.parameters)==null?void 0:$.docs)==null?void 0:R.source}}};const W=["Colors","AlphaBackground","Small","Large","Interactive","BadgeLink","Borderless"];export{t as AlphaBackground,d as BadgeLink,i as Borderless,o as Colors,l as Interactive,c as Large,n as Small,W as __namedExportsOrder,Q as default};
