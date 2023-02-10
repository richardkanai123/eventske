import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from './Layout'


const theme = extendTheme({
  colors: {
    brand: {
      100: "#dddddd", //white
      200: "#00222C", //black
      300: "#01A95E", //green
      400: "#DA7109", //ochre
      500: "#8AC4FF", //blue
    },
  },
})

function App({ Component, pageProps }) {
  return (

    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default App