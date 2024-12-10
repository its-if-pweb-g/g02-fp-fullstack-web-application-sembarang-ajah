import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="p-2 2xl:p-4 xl:p-4 lg:p-4 sm:p-2 md:p-2 lg:mx-60 sm:mx-0 md:mx-10">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}