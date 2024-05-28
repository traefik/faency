import{j as e,a as i}from"./jsx-runtime-WuQMLw89.js";import{R as v,r as N}from"./index-Dl6G-zuu.js";import{a as c,N as n}from"./NavigationTreeItem-B735PFnL.js";import{e as I,f as O,E as f,g as C,h as u}from"./react-icons.esm-C3slgq7o.js";import{a as E}from"./Navigation-D0Wc5s5Z.js";import"./Box-CsPUZVXZ.js";import"./stitches.config-CKE6G7UO.js";import"./Flex-jm7nIrzU.js";import"./Text-De0MgKz9.js";import"./Elevation-CQxWisSY.js";const m=({children:a,fullWidth:r=!1,...l})=>{const t=v.Children.map(a,o=>v.cloneElement(o,{fullWidth:r}));return e(E,{fullWidth:r,...l,children:t})};try{m.displayName="NavigationTreeDrawer",m.__docgenInfo={description:"",displayName:"NavigationTreeDrawer",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSS"}},fullWidth:{defaultValue:{value:"false"},description:"",name:"fullWidth",required:!1,type:{name:'(boolean & (boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; ... 4 more ...; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }))) | undefined'}},elevation:{defaultValue:null,description:"",name:"elevation",required:!1,type:{name:'number | `${number}` | ({ "@light"?: number | `${number}`; "@bp1"?: number | `${number}`; "@bp2"?: number | `${number}` | undefined; "@bp3"?: number | `${number}` | undefined; "@bp4"?: number | ... 1 more ... | undefined; "@motion"?: number | ... 1 more ... | undefined; "@hover"?: number | .....'}}}}}catch{}const k={title:"Components/NavigationTree",component:c,argTypes:{defaultCollapseIcon:{options:["Default","Eye","Envelope"],mapping:{Default:void 0,Eye:e(I,{}),Envelope:e(O,{})}},defaultExpandIcon:{options:["Default","Eye","Envelope"],mapping:{Default:void 0,Eye:e(f,{}),Envelope:e(C,{})}}}},H=a=>{const[r,l]=N.useState("/"),t=o=>({active:o===r,onClick:()=>l(o)});return e(m,{children:i(c,{...a,children:[i(n,{...t("one"),label:"One",subtitle:"/one",children:[e(n,{...t("one-one"),as:"a",label:"One.One",subtitle:"/one-one"}),e(n,{...t("one-two"),label:"One.Two",children:e(n,{...t("one-two-one"),startAdornment:e(u,{}),label:"One.Two.One"})})]}),i(n,{...t("two"),label:"Two",subtitle:"/two",defaultExpanded:!0,children:[e(n,{...t("two-one"),as:"a",label:"Two.One",subtitle:"/two-one"}),e(n,{...t("two-two"),label:"Two.Two",subtitle:"/two-two",children:e(n,{...t("two-two-one"),startAdornment:e(u,{}),label:"Two.Two.One"})})]}),e(n,{...t("three"),label:"Three"})]})})},s=H.bind({});s.args={};const P=a=>{const[r,l]=N.useState("/"),t=o=>({active:o===r,onClick:()=>l(o)});return e(m,{fullWidth:!0,children:i(c,{...a,children:[i(n,{label:"One",subtitle:"/one",children:[e(n,{...t("one-one"),as:"a",label:"One.One",subtitle:"/one-one"}),e(n,{label:"One.Two",nestedChildrenLevel:2,children:e(n,{...t("one-two-one"),startAdornment:e(u,{}),label:"One.Two.One"})})]}),i(n,{label:"Two",subtitle:"/two",defaultExpanded:!0,children:[e(n,{...t("two-one"),as:"a",label:"Two.One",subtitle:"/two-one"}),e(n,{label:"Two.Two",subtitle:"/two-two",nestedChildrenLevel:2,children:e(n,{label:"Two.Two.One",nestedChildrenLevel:3,children:e(n,{...t("two-two-one-one"),startAdornment:e(u,{}),label:"Two.Two.One.One"})})})]}),e(n,{...t("three"),label:"Three"})]})})},d=P.bind({});d.args={};var b,p,w;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route)
  });
  return <NavigationTreeDrawer>
      <NavigationTreeContainer {...args}>
        <NavigationTreeItem {...navigationHandlerProps('one')} label="One" subtitle="/one">
          <NavigationTreeItem {...navigationHandlerProps('one-one')} as="a" label="One.One" subtitle="/one-one" />
          <NavigationTreeItem {...navigationHandlerProps('one-two')} label="One.Two">
            <NavigationTreeItem {...navigationHandlerProps('one-two-one')} startAdornment={<ArchiveIcon />} label="One.Two.One" />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('two')} label="Two" subtitle="/two" defaultExpanded>
          <NavigationTreeItem {...navigationHandlerProps('two-one')} as="a" label="Two.One" subtitle="/two-one" />
          <NavigationTreeItem {...navigationHandlerProps('two-two')} label="Two.Two" subtitle="/two-two">
            <NavigationTreeItem {...navigationHandlerProps('two-two-one')} startAdornment={<ArchiveIcon />} label="Two.Two.One" />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('three')} label="Three" />
      </NavigationTreeContainer>
    </NavigationTreeDrawer>;
}`,...(w=(p=s.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};var T,g,h;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route)
  });
  return <NavigationTreeDrawer fullWidth>
      <NavigationTreeContainer {...args}>
        <NavigationTreeItem label="One" subtitle="/one">
          <NavigationTreeItem {...navigationHandlerProps('one-one')} as="a" label="One.One" subtitle="/one-one" />
          <NavigationTreeItem label="One.Two" nestedChildrenLevel={2}>
            <NavigationTreeItem {...navigationHandlerProps('one-two-one')} startAdornment={<ArchiveIcon />} label="One.Two.One" />
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem label="Two" subtitle="/two" defaultExpanded>
          <NavigationTreeItem {...navigationHandlerProps('two-one')} as="a" label="Two.One" subtitle="/two-one" />
          <NavigationTreeItem label="Two.Two" subtitle="/two-two" nestedChildrenLevel={2}>
            <NavigationTreeItem label="Two.Two.One" nestedChildrenLevel={3}>
              <NavigationTreeItem {...navigationHandlerProps('two-two-one-one')} startAdornment={<ArchiveIcon />} label="Two.Two.One.One" />
            </NavigationTreeItem>
          </NavigationTreeItem>
        </NavigationTreeItem>
        <NavigationTreeItem {...navigationHandlerProps('three')} label="Three" />
      </NavigationTreeContainer>
    </NavigationTreeDrawer>;
}`,...(h=(g=d.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const j=["Basic","FullWidth"];export{s as Basic,d as FullWidth,j as __namedExportsOrder,k as default};
