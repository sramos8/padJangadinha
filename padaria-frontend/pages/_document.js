import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <title>Padaria Jangadinha</title>
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="description" content="Sistema de gerenciamento para padarias" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Outros metadados opcionais */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
