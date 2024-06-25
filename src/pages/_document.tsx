import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="modal-root" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document
