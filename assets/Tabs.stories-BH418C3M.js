import{a as v,j as c}from"./jsx-runtime-WuQMLw89.js";import{_ as p}from"./extends-CF3RwP-h.js";import{r as i}from"./index-Dl6G-zuu.js";import{$ as H,a as C}from"./index-COmNUzeK.js";import{$ as k}from"./index-D_wDWxb3.js";import{$ as I,a as D,b as L}from"./index-WNCxPpI7.js";import{$ as R}from"./index-xl_aMJyq.js";import{$ as T}from"./index-QZw2BAii.js";import{a as j}from"./index-DPefpsAX.js";import{$ as G}from"./index-CsAIWpTZ.js";import{s as q}from"./stitches.config-CKE6G7UO.js";import{H as _}from"./Heading-6EoCpiwd.js";import{T as y}from"./Text-De0MgKz9.js";import"./index-BSTPHMlZ.js";import"./index-D1_ZHIBm.js";const M="Tabs",[B,he]=k(M,[I]),V=I(),[Q,N]=B(M),K=i.forwardRef((e,r)=>{const{__scopeTabs:o,value:a,onValueChange:n,defaultValue:l,orientation:t="horizontal",dir:d,activationMode:b="automatic",...f}=e,u=j(d),[s,m]=H({prop:a,onChange:n,defaultProp:l});return i.createElement(Q,{scope:o,baseId:G(),value:s,onValueChange:m,orientation:t,dir:u,activationMode:b},i.createElement(T.div,p({dir:u,"data-orientation":t},f,{ref:r})))}),O="TabsList",U=i.forwardRef((e,r)=>{const{__scopeTabs:o,loop:a=!0,...n}=e,l=N(O,o),t=V(o);return i.createElement(D,p({asChild:!0},t,{orientation:l.orientation,dir:l.dir,loop:a}),i.createElement(T.div,p({role:"tablist","aria-orientation":l.orientation},n,{ref:r})))}),z="TabsTrigger",W=i.forwardRef((e,r)=>{const{__scopeTabs:o,value:a,disabled:n=!1,...l}=e,t=N(z,o),d=V(o),b=A(t.baseId,a),f=F(t.baseId,a),u=a===t.value;return i.createElement(L,p({asChild:!0},d,{focusable:!n,active:u}),i.createElement(T.button,p({type:"button",role:"tab","aria-selected":u,"aria-controls":f,"data-state":u?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:b},l,{ref:r,onMouseDown:C(e.onMouseDown,s=>{!n&&s.button===0&&s.ctrlKey===!1?t.onValueChange(a):s.preventDefault()}),onKeyDown:C(e.onKeyDown,s=>{[" ","Enter"].includes(s.key)&&t.onValueChange(a)}),onFocus:C(e.onFocus,()=>{const s=t.activationMode!=="manual";!u&&!n&&s&&t.onValueChange(a)})})))}),J="TabsContent",X=i.forwardRef((e,r)=>{const{__scopeTabs:o,value:a,forceMount:n,children:l,...t}=e,d=N(J,o),b=A(d.baseId,a),f=F(d.baseId,a),u=a===d.value,s=i.useRef(u);return i.useEffect(()=>{const m=requestAnimationFrame(()=>s.current=!1);return()=>cancelAnimationFrame(m)},[]),i.createElement(R,{present:n||u},({present:m})=>i.createElement(T.div,p({"data-state":u?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":b,hidden:!m,id:f,tabIndex:0},t,{ref:r,style:{...e.style,animationDuration:s.current?"0s":void 0}}),m&&l))});function A(e,r){return`${e}-trigger-${r}`}function F(e,r){return`${e}-content-${r}`}const Y=K,Z=U,ee=W,ae=X,x=q(Y,{display:"flex",flexDirection:"column"}),w=q(Z,{display:"flex",borderBottom:"1px solid $textSubtle"}),h=q(ee,{all:"unset",color:"$textSubtle",fontFamily:"inherit",flex:1,display:"flex",alignItems:"center",justifyContent:"center",py:"$2",userSelect:"none","@hover":{"&:hover":{cursor:"pointer",color:"$hiContrast"}},'&[data-state="active"]':{color:"$primary",boxShadow:"inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",fontWeight:"$semiBold"}}),g=q(ae,{width:"100%"});try{x.displayName="TabsContainer",x.__docgenInfo={description:"",displayName:"TabsContainer",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{w.displayName="TabsList",w.__docgenInfo={description:"",displayName:"TabsList",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{h.displayName="TabsTrigger",h.__docgenInfo={description:"",displayName:"TabsTrigger",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{g.displayName="TabsContent",g.__docgenInfo={description:"",displayName:"TabsContent",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}const ge={title:"Components/Tabs",component:x},$=e=>v(x,{defaultValue:"tab1",children:[v(w,{"aria-label":"Tabs Group",children:[c(h,{value:"tab1",children:"Tab 1"}),c(h,{value:"tab2",children:"Tab 2"}),c(h,{value:"tab3",children:"Tab 3"})]}),v(g,{value:"tab1",children:[c(_,{css:{my:"$3"},children:"Tab 1 Content"}),c(y,{css:{lineHeight:"24px"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis leo quis risus sodales tempor. Proin ut arcu lacus. Morbi ut lectus ipsum. Proin dictum turpis a turpis elementum ultrices. Morbi non magna vel dui accumsan feugiat. Nulla dapibus vestibulum dapibus. Praesent mauris ligula, pulvinar et nibh scelerisque, viverra venenatis massa. Fusce dolor nunc, auctor eget mollis sit amet, viverra ut tortor. Proin rutrum a dui non ullamcorper. Quisque mauris risus, consequat eu velit eget, dapibus pulvinar neque. Aenean lacinia porttitor felis nec pretium. Aenean iaculis erat turpis, a accumsan libero elementum eu. Cras turpis lorem, rutrum viverra mauris vel, dapibus viverra nulla. Nunc eget egestas quam, eu tristique turpis. Ut ipsum urna, ornare a ante scelerisque, lobortis sollicitudin est. Quisque sit amet sagittis ipsum. Sed id lacus quis tortor consequat auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras at urna quis eros venenatis cursus. Etiam dui velit, varius eget luctus vel, hendrerit a massa. Fusce quis eros nulla. Nam ac dui lacus."})]}),v(g,{value:"tab2",children:[c(_,{css:{my:"$3"},children:"Tab 2 Content"}),c(y,{css:{lineHeight:"24px"},children:"Donec quis tincidunt erat, sit amet ullamcorper purus. Sed placerat nec odio ac hendrerit. Nam egestas fringilla consectetur. Nullam tincidunt nec magna vitae suscipit. Nunc consequat, felis quis rhoncus cursus, nunc lectus interdum leo, ut malesuada ex nisl at ligula. Maecenas eros nisi, convallis id arcu et, tempus pellentesque dui. Cras ligula lacus, dictum a tincidunt eget, rutrum et purus. Curabitur venenatis, dolor sed vestibulum sodales, sem metus dapibus elit, ac laoreet lacus mauris ac massa. Phasellus venenatis, mi a laoreet malesuada, lacus mi lacinia tortor, vitae sollicitudin nisl eros eget neque. Pellentesque dui purus, scelerisque sed tortor in, sagittis maximus turpis. Donec eget dictum enim, feugiat maximus diam. Curabitur quis ipsum feugiat dolor mollis varius. Pellentesque tempus lobortis pulvinar. Proin pharetra metus mattis neque scelerisque, vitae mollis mauris auctor. Etiam tempor arcu eget mauris eleifend, elementum efficitur eros malesuada. Fusce non purus sem. Maecenas fermentum justo erat, sit amet varius tellus venenatis sit amet. In placerat enim sit amet arcu pulvinar imperdiet. Aliquam ut pretium nibh. Quisque et arcu ac diam porta lacinia."})]}),v(g,{value:"tab3",children:[c(_,{css:{my:"$3"},children:"Tab 3 Content"}),c(y,{css:{lineHeight:"24px"},children:"Phasellus nec posuere libero, quis rutrum metus. Morbi nibh lectus, molestie eget ultricies eu, sodales eu elit. Praesent scelerisque lacus eros, nec sodales justo varius at. Nunc fringilla nibh id commodo dapibus. Praesent leo odio, iaculis quis purus ut, laoreet euismod est. Cras finibus, lorem a fermentum sodales, lorem erat scelerisque libero, et venenatis nulla mauris venenatis sem. Etiam ut dolor et diam ultrices scelerisque. Curabitur tempus nulla a congue fermentum. Nullam vitae sagittis velit. Nunc in pretium augue, ac efficitur nibh. Nunc non mollis ante, sed maximus nulla. Nam viverra dui a dolor lacinia porta sed nec mi."})]})]});var P,E,S;$.parameters={...$.parameters,docs:{...(P=$.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  return <TabsContainer defaultValue="tab1">
      <TabsList aria-label="Tabs Group">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <H2 css={{
        my: '$3'
      }}>Tab 1 Content</H2>
        <Text css={{
        lineHeight: '24px'
      }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis leo quis risus
          sodales tempor. Proin ut arcu lacus. Morbi ut lectus ipsum. Proin dictum turpis a turpis
          elementum ultrices. Morbi non magna vel dui accumsan feugiat. Nulla dapibus vestibulum
          dapibus. Praesent mauris ligula, pulvinar et nibh scelerisque, viverra venenatis massa.
          Fusce dolor nunc, auctor eget mollis sit amet, viverra ut tortor. Proin rutrum a dui non
          ullamcorper. Quisque mauris risus, consequat eu velit eget, dapibus pulvinar neque. Aenean
          lacinia porttitor felis nec pretium. Aenean iaculis erat turpis, a accumsan libero
          elementum eu. Cras turpis lorem, rutrum viverra mauris vel, dapibus viverra nulla. Nunc
          eget egestas quam, eu tristique turpis. Ut ipsum urna, ornare a ante scelerisque, lobortis
          sollicitudin est. Quisque sit amet sagittis ipsum. Sed id lacus quis tortor consequat
          auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras at urna quis
          eros venenatis cursus. Etiam dui velit, varius eget luctus vel, hendrerit a massa. Fusce
          quis eros nulla. Nam ac dui lacus.
        </Text>
      </TabsContent>

      <TabsContent value="tab2">
        <H2 css={{
        my: '$3'
      }}>Tab 2 Content</H2>
        <Text css={{
        lineHeight: '24px'
      }}>
          Donec quis tincidunt erat, sit amet ullamcorper purus. Sed placerat nec odio ac hendrerit.
          Nam egestas fringilla consectetur. Nullam tincidunt nec magna vitae suscipit. Nunc
          consequat, felis quis rhoncus cursus, nunc lectus interdum leo, ut malesuada ex nisl at
          ligula. Maecenas eros nisi, convallis id arcu et, tempus pellentesque dui. Cras ligula
          lacus, dictum a tincidunt eget, rutrum et purus. Curabitur venenatis, dolor sed vestibulum
          sodales, sem metus dapibus elit, ac laoreet lacus mauris ac massa. Phasellus venenatis, mi
          a laoreet malesuada, lacus mi lacinia tortor, vitae sollicitudin nisl eros eget neque.
          Pellentesque dui purus, scelerisque sed tortor in, sagittis maximus turpis. Donec eget
          dictum enim, feugiat maximus diam. Curabitur quis ipsum feugiat dolor mollis varius.
          Pellentesque tempus lobortis pulvinar. Proin pharetra metus mattis neque scelerisque,
          vitae mollis mauris auctor. Etiam tempor arcu eget mauris eleifend, elementum efficitur
          eros malesuada. Fusce non purus sem. Maecenas fermentum justo erat, sit amet varius tellus
          venenatis sit amet. In placerat enim sit amet arcu pulvinar imperdiet. Aliquam ut pretium
          nibh. Quisque et arcu ac diam porta lacinia.
        </Text>
      </TabsContent>

      <TabsContent value="tab3">
        <H2 css={{
        my: '$3'
      }}>Tab 3 Content</H2>
        <Text css={{
        lineHeight: '24px'
      }}>
          Phasellus nec posuere libero, quis rutrum metus. Morbi nibh lectus, molestie eget
          ultricies eu, sodales eu elit. Praesent scelerisque lacus eros, nec sodales justo varius
          at. Nunc fringilla nibh id commodo dapibus. Praesent leo odio, iaculis quis purus ut,
          laoreet euismod est. Cras finibus, lorem a fermentum sodales, lorem erat scelerisque
          libero, et venenatis nulla mauris venenatis sem. Etiam ut dolor et diam ultrices
          scelerisque. Curabitur tempus nulla a congue fermentum. Nullam vitae sagittis velit. Nunc
          in pretium augue, ac efficitur nibh. Nunc non mollis ante, sed maximus nulla. Nam viverra
          dui a dolor lacinia porta sed nec mi.
        </Text>
      </TabsContent>
    </TabsContainer>;
}`,...(S=(E=$.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};const $e=["Basic"];export{$ as Basic,$e as __namedExportsOrder,ge as default};
