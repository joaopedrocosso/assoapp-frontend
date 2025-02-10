## [index](index.md)/app

Nessa página está todo o código do repositório que será compilado no final do processo de build. Aqui deverá ser depositada a lógica da aplicação.

### Pastas
  - [components](./components.md) // aqui estarão os componentes do aplicativo.
  - [context](./context.md) // aqui se encontram as informações que pertecem ao escopo maior da aplicação.
  - [types](./types.md) // aqui se depositam todos os tipos usados na aplicação.

## Arquivos

### `layout.tsx`
Esse é o primeiro código a ser renderizado e carrega informações importantes sobre a página, como linguagem e título. Nele também está a chamada para o `global.css`.

### `global.css`
Esse arquivo de estilo é o mais amplo arquivo de estilo da aplicação, os estilos descritos aqui serão aplicados por toda a aplicação.

### `page.tsx`
`page.tsx` é a página inicial do app e é o segundo código a ser renderizada, dentro de `layout.tsx`.

### `page.module.tsx`
Todos os arquivos `.module` são referentes específicos a arquivo que carrega o mesmo nome. Os estilos desses arquivos serão aplicados somente ao arquivo do qual ele carrega o valor do módulo.

### `favicon.ico`
Esse arquivo define qual será o ícone que aparece no topo do página quando ela é renderizada.