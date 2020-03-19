import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Flex, Box, Chip, Button, Heading, Text, useTheme } from '@containous/faency'
import useDarkMode from 'use-dark-mode'
import Container from './components/Container'
import Link from './components/Link'
import List from './components/List'
import NavItem from './components/NavItem'
import Divider from './components/Divider'
import MenuToggle from './components/MenuToggle'
import pkg from '../package.json'
import logo from '../static/logo.png'
import whiteLogo from '../static/logo-white.png'

function App({ element, props: appProps }) {
  const [navOpen, setNavOpen] = useState(false)
  const theme = useTheme()
  const darkMode = useDarkMode()

  const query = graphql`
    fragment mdxContent on MdxConnection {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    query {
      pinned: allMdx(
        sort: { order: ASC, fields: [frontmatter___title] }
        filter: { frontmatter: { pinned: { ne: null } } }
      ) {
        ...mdxContent
      }
      components: allMdx(
        sort: { order: ASC, fields: [frontmatter___component] }
        filter: { frontmatter: { component: { ne: null } } }
      ) {
        ...mdxContent
      }
    }
  `

  const pathname = appProps.location.pathname

  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <>
            <Box
              position={['static', 'fixed']}
              width={['100%', 200, 250]}
              height={['auto', '100vh']}
              overflow={['auto', 'scroll']}
              pb={[0, 8]}
              borderRight={[0, '1px solid']}
              borderBottom={['1px solid', 0]}
              borderColor={[theme.colors.grays[3], theme.colors.grays[3]]}
              style={{ WebkitOverflowScrolling: 'touch', overflowX: 'hidden' }}
              backgroundColor={darkMode.value ? '#121826' : 'white'}
            >
              <Box pt={[0, '1em']} px={16}>
                <Flex alignItems="center">
                  <Box>
                    <img src={darkMode.value ? whiteLogo : logo} alt="Containous Logo" height="35px" />
                  </Box>
                  <Chip ml={1} variant="blue">
                    v{pkg.version}
                  </Chip>
                  <Box ml="auto" display={['block', 'none']}>
                    <Button size={1} variant={navOpen ? 'active' : undefined} onClick={() => setNavOpen(!navOpen)}>
                      <MenuToggle isOpen={navOpen} />
                    </Button>
                  </Box>
                </Flex>
              </Box>

              <Box display={[navOpen ? 'block' : 'none', 'block']}>
                <Divider style={{ marginTop: navOpen ? 0 : '1em' }} />
                <List>
                  <Heading size={1} my={10} mx={16}>
                    Overview
                  </Heading>
                  {data.pinned.edges.map(({ node }) => (
                    <NavItem
                      key={node.frontmatter.title}
                      to={node.fields.slug}
                      active={pathname.includes(node.fields.slug)}
                      onClick={() => setNavOpen(false)}
                    >
                      {node.frontmatter.title}
                    </NavItem>
                  ))}
                </List>

                <Divider />

                <List>
                  <Heading size={1} my={10} mx={16}>
                    Components
                  </Heading>
                  {data.components.edges.map(({ node }) => (
                    <NavItem
                      key={node.frontmatter.title}
                      to={node.fields.slug}
                      active={pathname.includes(node.fields.slug)}
                      onClick={() => setNavOpen(false)}
                    >
                      {node.frontmatter.title}
                    </NavItem>
                  ))}
                </List>

                <Divider />

                <List>
                  <Heading size={1} my={10} mx={16}>
                    Github links
                  </Heading>

                  <NavItem as="a" href="https://github.com/containous/faency" isExternal>
                    Faency
                  </NavItem>
                  <NavItem as="a" href="https://github.com/containous/faency/tree/master/packages/website" isExternal>
                    Faency Docs
                  </NavItem>
                </List>

                <Divider />

                <Box px={16} mt={3} minHeight={4}>
                  <Text size={2}>
                    Powered by{' '}
                    <Link href="https://containo.us" title="Containous">
                      Containous
                    </Link>
                  </Text>
                </Box>
                <Box px={16} mb={2} minHeight={4}>
                  <Text size={2}>
                    Highly inspired by{' '}
                    <Link href="https://radix.modulz.app/" title="Radix Design System">
                      Radix
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box
              pt={8}
              pb={9}
              marginLeft={[0, 200, 250]}
              maxWidth={['100%']}
              minHeight={['100vh']}
              display={[navOpen ? 'none' : 'block', 'block']}
              backgroundColor="bg"
            >
              <Container size={1}>{element}</Container>
            </Box>
          </>
        )
      }}
    />
  )
}

App.propTypes = {
  element: PropTypes.node,
  props: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default App
