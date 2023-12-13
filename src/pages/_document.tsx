import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&family=Roboto:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet"/>
      <link rel="shortcut icon" href="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/blog%2F264372.png?alt=media&token=61af3af0-104c-42bf-8d16-a6df2af4bf63&_gl=1*1unvqch*_ga*MTMwNDYxNzEwOC4xNjg4MTM3MzMz*_ga_CW55HF8NVT*MTY5NzA1NzExNC43My4xLjE2OTcwNTczMjYuMzguMC4w" type="image/png"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
