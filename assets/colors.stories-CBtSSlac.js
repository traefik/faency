import{a as i,j as o,F as f}from"./jsx-runtime-WuQMLw89.js";import{u as g}from"./index-1dwcIVWX.js";import{a as C}from"./stitches.config-CKE6G7UO.js";import{F as p}from"./Flex-jm7nIrzU.js";import{a as y,H as F}from"./Heading-6EoCpiwd.js";import{B as d}from"./Box-CsPUZVXZ.js";import{T as x}from"./Text-De0MgKz9.js";import"./index-Dl6G-zuu.js";import"./mapValues-D46QbTyt.js";import"./index-Bc0Ko_ki.js";import"./isPlainObject-CibOP_1G.js";import"./index-C2eUe6cH.js";import"./index-DrFu-skq.js";const B={dp:"Elevations"},T=Object.keys(C).reduce((e,n)=>{const a=/\d+/g,s=n&&n.match(a);if(!s)return[...e,{name:n,colors:[{token:n}]}];const c=n.replace(`${s}`,""),m=c.endsWith("A"),t=m?c.replace("A",""):c,r=e.findIndex(h=>h.name===t);return r>-1?(m?e[r]={...e[r],name:t,alphaColors:[...e[r].alphaColors,{token:n}]}:e[r]={...e[r],name:t,colors:[...e[r].colors,{token:n}]},e):m?[...e,{name:t,colors:[],alphaColors:[{token:n}]}]:[...e,{name:t,colors:[{token:n}],alphaColors:[]}]},[]),l=()=>(g(),i(p,{css:{flexDirection:"column"},children:[o(y,{css:{mb:"$6"},children:"Colors"}),T.map(e=>i(d,{css:{mb:"$3"},children:[o(F,{css:{mb:"$2","&:first-letter":{textTransform:"uppercase"}},children:B[e.name]||e.name}),["colors","alphaColors"].map(n=>{var a;return o(f,{children:!!((a=e==null?void 0:e[n])!=null&&a.length)&&o(p,{css:{bc:"$contentBg",mb:"$3",gap:"$3"},children:e[n].map(s=>i(p,{css:{flexDirection:"column",alignItems:"center",maxWidth:80},children:[o(d,{css:{bc:`$${e.name}1`,mb:"$2"},children:o(d,{css:{size:80,bc:`$${s.token}`}})}),o(x,{variant:"subtle",css:{pb:"$1",textAlign:"center"},children:s.token}),o(x,{variant:"subtle",size:"0",css:{textAlign:"center"},children:window.getComputedStyle(document.body).getPropertyValue(`--colors-${s.token}`)})]},s.token))},n)})})]},e.name))]})),E={title:"Colors",component:l};var u,b,$;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  useDarkMode(); // force re-render on theme change

  return <Flex css={{
    flexDirection: 'column'
  }}>
      <H1 css={{
      mb: '$6'
    }}>Colors</H1>

      {colorGroups.map(colorGroup => <Box key={colorGroup.name} css={{
      mb: '$3'
    }}>
          <H2 css={{
        mb: '$2',
        '&:first-letter': {
          textTransform: 'uppercase'
        }
      }}>
            {aliases[colorGroup.name] || colorGroup.name}
          </H2>
          {['colors', 'alphaColors'].map(type => <>
              {!!colorGroup?.[type]?.length && <Flex key={type} css={{
          bc: '$contentBg',
          mb: '$3',
          gap: '$3'
        }}>
                  {colorGroup[type].map(color => <Flex key={color.token} css={{
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 80
          }}>
                      <Box css={{
              bc: \`$\${colorGroup.name}1\`,
              mb: '$2'
            }}>
                        <Box css={{
                size: 80,
                bc: \`$\${color.token}\`
              }} />
                      </Box>
                      <Text variant="subtle" css={{
              pb: '$1',
              textAlign: 'center'
            }}>
                        {color.token}
                      </Text>
                      <Text variant="subtle" size="0" css={{
              textAlign: 'center'
            }}>
                        {window.getComputedStyle(document.body).getPropertyValue(\`--colors-\${color.token}\`)}
                      </Text>
                    </Flex>)}
                </Flex>}
            </>)}
        </Box>)}
    </Flex>;
}`,...($=(b=l.parameters)==null?void 0:b.docs)==null?void 0:$.source}}};const G=["Colors"];export{l as Colors,G as __namedExportsOrder,E as default};
