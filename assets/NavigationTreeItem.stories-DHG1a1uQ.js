import{j as e}from"./jsx-runtime-WuQMLw89.js";import{r as C}from"./index-Dl6G-zuu.js";import{N as o,a as N}from"./NavigationTreeItem-B735PFnL.js";import{e as i,f as s,E as l,g as p,D as c,G as u,P as d,Q as m,h as D}from"./react-icons.esm-C3slgq7o.js";import{a as b}from"./Navigation-D0Wc5s5Z.js";import"./Box-CsPUZVXZ.js";import"./stitches.config-CKE6G7UO.js";import"./Flex-jm7nIrzU.js";import"./Text-De0MgKz9.js";import"./Elevation-CQxWisSY.js";const k={title:"Components/NavigationTree",component:o,argTypes:{customExpandIcon:{options:["Default","Eye","Envelope"],mapping:{Default:void 0,Eye:e(i,{}),Envelope:e(s,{})}},customCollapseIcon:{options:["Default","Eye","Envelope"],mapping:{Default:void 0,Eye:e(l,{}),Envelope:e(p,{})}},defaultCollapseIcon:{options:["Default","Eye","Envelope"],mapping:{Default:void 0,Eye:e(i,{}),Envelope:e(s,{})}},defaultExpandIcon:{options:["Default","Eye","Envelope"],mapping:{Default:void 0,Eye:e(l,{}),Envelope:e(p,{})}},label:{control:"text"},startAdornment:{options:["None","Dashboard","Gear","Person","Question"],mapping:{None:null,Dashboard:e(c,{}),Gear:e(u,{}),Person:e(d,{}),Question:e(m,{})}},endAdornment:{options:["None","Dashboard","Gear","Person","Question"],mapping:{None:null,Dashboard:e(c,{}),Gear:e(u,{}),Person:e(d,{}),Question:e(m,{})}},active:{control:"boolean"}}},T=a=>{const[E,f]=C.useState("/"),t=r=>({active:r===E,onClick:()=>f(r)});return e(b,{children:e(N,{defaultCollapseIcon:a.defaultCollapseIcon,defaultExpandIcon:a.defaultExpandIcon,children:e(o,{...t("one"),label:"One",subtitle:"/parent",children:e(o,{...t("one-one"),...a,children:e(o,{...t("one-one-one"),startAdornment:e(D,{}),label:"One.One.One"})})})})})},n=T.bind({});n.args={label:"One.One"};var v,g,I;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const navigationHandlerProps = (route: string) => ({
    active: route === currentRoute,
    onClick: () => setCurrentRoute(route)
  });
  return <NavigationDrawer>
      <NavigationTreeContainer defaultCollapseIcon={args.defaultCollapseIcon} defaultExpandIcon={args.defaultExpandIcon}>
        <NavigationTreeItem {...navigationHandlerProps('one')} label="One" subtitle="/parent">
          <NavigationTreeItem {...navigationHandlerProps('one-one')} {...args}>
            <NavigationTreeItem {...navigationHandlerProps('one-one-one')} startAdornment={<ArchiveIcon />} label="One.One.One" />
          </NavigationTreeItem>
        </NavigationTreeItem>
      </NavigationTreeContainer>
    </NavigationDrawer>;
}`,...(I=(g=n.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};const w=["TreeItem"];export{n as TreeItem,w as __namedExportsOrder,k as default};
