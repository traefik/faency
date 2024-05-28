import{j as n}from"./jsx-runtime-WuQMLw89.js";import{D as N,G as I,P as f,Q as D}from"./react-icons.esm-C3slgq7o.js";import{N as t,a as i}from"./Navigation-D0Wc5s5Z.js";import{B as b}from"./Badge-Bu076I1w.js";import"./index-Dl6G-zuu.js";import"./stitches.config-CKE6G7UO.js";import"./Flex-jm7nIrzU.js";import"./Elevation-CQxWisSY.js";import"./index-BSTPHMlZ.js";import"./extends-CF3RwP-h.js";const L={title:"Components/NavigationItem",component:t,argTypes:{as:{options:["a","button"]},href:{control:"text"},startAdornment:{options:["Dashboard","Gear","Person","Question"],mapping:{Dashboard:n(N,{}),Gear:n(I,{}),Person:n(f,{}),Question:n(D,{})}},endAdornment:{control:"number"},active:{control:"boolean"}}},x=o=>n(i,{css:{height:"200px"},children:n(t,{...o,endAdornment:!!o.endAdornment&&n(b,{css:{height:"$3",borderRadius:"$pill",fontSize:"$0",fontWeight:"$medium",color:"$hiContrast"},children:o.endAdornment}),children:"Navigation Item"})}),e=x.bind({});e.args={as:"a",href:"#",startAdornment:"Gear",endAdornment:1,active:!1};const r=o=>{const s=()=>{};return n(i,{css:{height:"200px"},children:n(t,{...o,onClick:s,onMouseEnter:s,onMouseLeave:s,children:"Navigation Item"})})},a=o=>n(i,{css:{height:"200px"},children:n(t,{as:"a",href:"https://traefik.io",children:"Navigation Item"})});a.args={as:"a"};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => <NavigationDrawer css={{
  height: '200px'
}}>
    <NavigationItem {...args} endAdornment={!!args.endAdornment && <Badge css={{
    height: '$3',
    borderRadius: '$pill',
    fontSize: '$0',
    fontWeight: '$medium',
    color: '$hiContrast'
  }}>
            {args.endAdornment}
          </Badge>}>
      Navigation Item
    </NavigationItem>
  </NavigationDrawer>`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,g,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const noop = () => undefined;
  return <NavigationDrawer css={{
    height: '200px'
  }}>
      <NavigationItem {...args} onClick={noop} onMouseEnter={noop} onMouseLeave={noop}>
        Navigation Item
      </NavigationItem>
    </NavigationDrawer>;
  ButtonProps.args = {
    as: 'button'
  };
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var u,l,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => <NavigationDrawer css={{
  height: '200px'
}}>
    <NavigationItem as="a" href="https://traefik.io">
      Navigation Item
    </NavigationItem>
  </NavigationDrawer>`,...(v=(l=a.parameters)==null?void 0:l.docs)==null?void 0:v.source}}};const Q=["Basic","ButtonProps","LinkProps"];export{e as Basic,r as ButtonProps,a as LinkProps,Q as __namedExportsOrder,L as default};
