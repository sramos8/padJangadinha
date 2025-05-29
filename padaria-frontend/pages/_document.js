import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="description" content="Sistema de gerenciamento para padarias" />
        {/* Outros metadados opcionais que não sejam <title> ou viewport */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
