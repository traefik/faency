import{a as b,j as r}from"./jsx-runtime-WuQMLw89.js";import{r as o}from"./index-Dl6G-zuu.js";import{D as q,P as O,G as V,Q as J}from"./react-icons.esm-C3slgq7o.js";import{a as S,N as i,b as $}from"./Navigation-D0Wc5s5Z.js";import{m as X}from"./modifyVariantsForStory-D3vOGtQO.js";import{B as Y}from"./Badge-Bu076I1w.js";import{T as Z}from"./Text-De0MgKz9.js";import"./stitches.config-CKE6G7UO.js";import"./Flex-jm7nIrzU.js";import"./Elevation-CQxWisSY.js";import"./index-BSTPHMlZ.js";import"./extends-CF3RwP-h.js";function nn(t,n,u){var D=this,l=o.useRef(null),c=o.useRef(0),s=o.useRef(null),d=o.useRef([]),g=o.useRef(),m=o.useRef(),y=o.useRef(t),p=o.useRef(!0);o.useEffect(function(){y.current=t},[t]);var I=!n&&n!==0&&typeof window<"u";if(typeof t!="function")throw new TypeError("Expected a function");n=+n||0;var T=!!(u=u||{}).leading,M=!("trailing"in u)||!!u.trailing,v="maxWait"in u,C=v?Math.max(+u.maxWait||0,n):null;o.useEffect(function(){return p.current=!0,function(){p.current=!1}},[]);var K=o.useMemo(function(){var w=function(e){var a=d.current,H=g.current;return d.current=g.current=null,c.current=e,m.current=y.current.apply(H,a)},P=function(e,a){I&&cancelAnimationFrame(s.current),s.current=I?requestAnimationFrame(e):setTimeout(e,a)},B=function(e){if(!p.current)return!1;var a=e-l.current;return!l.current||a>=n||a<0||v&&e-c.current>=C},F=function(e){return s.current=null,M&&d.current?w(e):(d.current=g.current=null,m.current)},x=function e(){var a=Date.now();if(B(a))return F(a);if(p.current){var H=n-(a-l.current),U=v?Math.min(H,C-(a-c.current)):H;P(e,U)}},A=function(){var e=Date.now(),a=B(e);if(d.current=[].slice.call(arguments),g.current=D,l.current=e,a){if(!s.current&&p.current)return c.current=l.current,P(x,n),T?w(l.current):m.current;if(v)return P(x,n),w(l.current)}return s.current||P(x,n),m.current};return A.cancel=function(){s.current&&(I?cancelAnimationFrame(s.current):clearTimeout(s.current)),c.current=0,d.current=l.current=g.current=s.current=null},A.isPending=function(){return!!s.current},A.flush=function(){return s.current?F(Date.now()):m.current},A},[T,v,n,C,M,I]);return K}const In={title:"Components/Navigation",component:S,argTypes:{elevation:{control:"number"},fullWidth:{control:"boolean"}}},rn=t=>r(S,{...t}),tn=X(rn),R=(t="/")=>{const[n,u]=o.useState(t),D=nn(c=>u(c),300);return{navigationHandlerProps:c=>({active:c===n,onClick:()=>D(c)})}},en=t=>{const{navigationHandlerProps:n}=R();return b(tn,{...t,children:[r(i,{...n("/"),children:"Dashboard"}),r(i,{...n("/profile"),children:"Profile"}),r(i,{...n("/settings"),children:"Settings"}),r(i,{...n("/help"),children:"Help"})]})},f=en.bind({});f.args={elevation:1,fullWidth:!1};const an=t=>{const{navigationHandlerProps:n}=R();return b(S,{css:{height:"100%"},...t,children:[r(i,{...n("/"),startAdornment:r(q,{}),children:"Dashboard"}),r(i,{...n("/profile"),startAdornment:r(O,{}),children:"Profile"}),r(i,{...n("/settings"),startAdornment:r(V,{}),endAdornment:r(Y,{css:{height:"$3",borderRadius:"$pill",fontSize:"$0",color:"$hiContrast"},children:"99+"}),children:"Settings"}),r(i,{...n("/help"),startAdornment:r(J,{}),children:"Help"})]})},h=an.bind({});h.args={elevation:1};const on=t=>{const{navigationHandlerProps:n}=R();return b(S,{css:{height:"90vh"},...t,children:[r($,{css:{mb:"$3",p:"$4",textAlign:"center",border:"1px solid hsla(0, 0%, 50%, 0.51)",borderRadius:"$3"},children:r(Z,{children:"Company Logo"})}),b($,{css:{flexGrow:1},children:[r(i,{css:{c:"$hiContrast"},...n("/"),startAdornment:r(q,{}),children:"Dashboard"}),r(i,{...n("/profile"),startAdornment:r(O,{}),children:"Profile"}),r(i,{...n("/settings"),startAdornment:r(V,{}),children:"Settings"})]}),r($,{children:r(i,{...n("/help"),startAdornment:r(J,{}),children:"Help"})})]})},N=on.bind({});N.args={elevation:1};var E,G,k;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const {
    navigationHandlerProps
  } = useNavigationSample();
  return <NavigationDrawerForStory {...args}>
      <NavigationItem {...navigationHandlerProps('/')}>Dashboard</NavigationItem>
      <NavigationItem {...navigationHandlerProps('/profile')}>Profile</NavigationItem>
      <NavigationItem {...navigationHandlerProps('/settings')}>Settings</NavigationItem>
      <NavigationItem {...navigationHandlerProps('/help')}>Help</NavigationItem>
    </NavigationDrawerForStory>;
}`,...(k=(G=f.parameters)==null?void 0:G.docs)==null?void 0:k.source}}};var Q,W,j;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`args => {
  const {
    navigationHandlerProps
  } = useNavigationSample();
  return <NavigationDrawer css={{
    height: '100%'
  }} {...args}>
      <NavigationItem {...navigationHandlerProps('/')} startAdornment={<DashboardIcon />}>
        Dashboard
      </NavigationItem>
      <NavigationItem {...navigationHandlerProps('/profile')} startAdornment={<PersonIcon />}>
        Profile
      </NavigationItem>
      <NavigationItem {...navigationHandlerProps('/settings')} startAdornment={<GearIcon />} endAdornment={<Badge css={{
      height: '$3',
      borderRadius: '$pill',
      fontSize: '$0',
      color: '$hiContrast'
    }}>
            99+
          </Badge>}>
        Settings
      </NavigationItem>
      <NavigationItem {...navigationHandlerProps('/help')} startAdornment={<QuestionMarkCircledIcon />}>
        Help
      </NavigationItem>
    </NavigationDrawer>;
}`,...(j=(W=h.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var z,L,_;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
  const {
    navigationHandlerProps
  } = useNavigationSample();
  return <NavigationDrawer css={{
    height: '90vh'
  }} {...args}>
      <NavigationContainer css={{
      mb: '$3',
      p: '$4',
      textAlign: 'center',
      border: '1px solid hsla(0, 0%, 50%, 0.51)',
      borderRadius: '$3'
    }}>
        <Text>Company Logo</Text>
      </NavigationContainer>
      <NavigationContainer css={{
      flexGrow: 1
    }}>
        <NavigationItem css={{
        c: '$hiContrast'
      }} {...navigationHandlerProps('/')} startAdornment={<DashboardIcon />}>
          Dashboard
        </NavigationItem>
        <NavigationItem {...navigationHandlerProps('/profile')} startAdornment={<PersonIcon />}>
          Profile
        </NavigationItem>
        <NavigationItem {...navigationHandlerProps('/settings')} startAdornment={<GearIcon />}>
          Settings
        </NavigationItem>
      </NavigationContainer>
      <NavigationContainer>
        <NavigationItem {...navigationHandlerProps('/help')} startAdornment={<QuestionMarkCircledIcon />}>
          Help
        </NavigationItem>
      </NavigationContainer>
    </NavigationDrawer>;
}`,...(_=(L=N.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};const Pn=["Basic","Adornments","MultiSection"];export{h as Adornments,f as Basic,N as MultiSection,Pn as __namedExportsOrder,In as default};
