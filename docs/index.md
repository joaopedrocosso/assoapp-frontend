# Bem vindo a documentação do AssoApp - Frontend

### Objetivo

Esse software tem como objetivo ser uma API que gerencia o banco de dados e cria respostas para o AssoApp - FrontEnd.
O AssoApp é uma ferramenta desenvolvida para cadastrar e gerenciar associados na base de dados do departamento associativo. Além disso, também irá ajudar na gestão de presença desses associados em eventos e no pagamento das anuidades da associação.

### Arquitetura

![arquiterura](./files/architecture.png)

O projeto em ambiente de homologação tem a arquitetura dividida em cinco partes, conforme descrito na imagem acima.

O frontend está hosteado na `Firebase` e pode ser acessado através do link: https://msfassoapp.web.app/

O backend está hosteado no `Render` e pode ser acessado através do link: https://assobackoffice-backend.onrender.com

Os serviços de autentificação, banco de dados e storage estão sendo fornecidos pela `Firebase` e são acessados diretamente pelo SDK de cliente que roda no bancked. Isso deverá ter que ser refeito eventualmente para que o SDK que rode no servidor seja o Admin.

### Estrutura de pastas

O projeto segue a estrutura padrão de um projeto com Next.

- [app](./app.md)
  - [components](./components.md)
  - [context](./context.md)
  - [types](./types.md)
- [public](./public.md)

### Links importantes e depedências:

- [Next](https://nextjs.org/docs) - Webframework para React.
- [React Icons](https://react-icons.github.io/react-icons/) - Biblioteca de ícones para React.
- [React](https://react.dev/learn) - Webframework para JS.
- [TypeScript](https://www.typescriptlang.org/docs/) - Linguagem super set de JS para tipagem.
