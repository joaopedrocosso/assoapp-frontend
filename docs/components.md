## [index](./index.md)/components

Essa pasta carrega todos os componentes da aplicação. A ideia é tentar diminuir no mínimo componente possível para facilitar a manutenção da aplicação.

**Atualmente há vários componentes que deverão ser refatorados para serem sub-componentizados, estão estarão marcados com \***

## Pastas - Componentes

- AssociateCreateSpace \*
  - `AssociateCreateSpace.tsx*` - Esse arquivo contém toda a lógica do formulário lateral de criação de novos associados.
  - `AssociateCreateSpaceUtils.tsx*` - Esse arquivo contém/ou deverá conter todas as funções auxiliares específicas para esse formulário. Funções que também sirvam para o formulário de atualização deverão ser refatoradas em hooks.
  - `AssociateCreateSpace.module.css` - Essa folha de estilos é responsável pelos estilos do formulário de criação.
- AssociateWorkspace \*
  - `AssociateWorkspace.tsx*` - Esse arquivo contém toda a lógica do formulário lateral de atualização de associados.
  - `AssociateWorkspaceUtils.tsx*`- Esse arquivo contém/ou deverá conter todas as funções auxiliares específicas para esse formulário. Funções que também sirvam para o formulário de atualização deverão ser refatoradas em hooks.
  - `AssociateWorkspaceUtils.tsx` - Essa folha de estilos é responsável pelos estilos do formulário de atualização.
  - `EditInput.tsx*` - Esse sub-componente deverá ser refatorado para algo mais genérico e que possa ser usado em toda a aplicação.
  - `EditInput.module.css` - Essa folha de estilos é responsável pelos estilos do formulário de atualização.
- EventWorkspace\*
  - `EventWorkspace.tsx*` - Esse formulário é responsável pelo gerenciamento dos eventos. Ele também deverá ser sub-componentizado.
  - `EventWorkspace.module.css` - Essa folha de estilos é responsável pelos estilos do formulário de eventos.
- InfoModal \*
  - `InfoModal.tsx*` - Esse componente é responsável pelo pequeno alerta que aparece no canto inferior direito a cada atualização.
  - `InfoModal.module.css` - Folha de estilos responsável pelos estilos do modal que aparece no canto inferior direito.
- LateralMenu \*
  - `LateralMenu.tsx*` - Esse componente é responsável pelo menu lateral esquerdo, onde é guardado o índice do app.
  - `LateralMenu.module.css` - Essa folha de estilos é responsábel pelo menu lateral esquerdo.
- LateralWorkspace \*
  - `LateralWorkspace.tsx*` - Esse componente é responsável pelo ambiente de trabalho do lado direito. Esse componente recebe de outros componentes o seu contexto.
  - `LateralWorkspace.module.css` - Essa folha de estilos é responsável pelo ambiente de trabalho, mas não necessariamente pelo seu conteúdo.
- LoginScreen \*
  - `LoginScreen.tsx*` - Esse componente contém a estrutura e a lógica de login na aplicação. Isso deverá ser refatorado posteriormente para lógica ser transformada em uma função separada.
  - `LoginScreen.module.tsx` - Essa folha de estilos é responsável pelo componente de login na aplicação.
- Nav \*
  - `Nav.tsx*` - Esse é o componente responsável pela barra superior de navegação.
  - `Nav.module.css` - Essa folha de estilos é responsável pelos estilos da barra superior de navegação.
- Table \*
  - `Table.tsx*` - Esse componente é responsável por criar a tabela que aparece na tela principal. Ele organizar os associados dentro do `TableItem` e pode pequisar a partir deles.
  - `Table.module.css` - Essa folha de estilos é responsável pelo componente de tabela de associados que aperece na tela principal da aplicação.
  - `TableItem.tsx*` - Esse componente é responsável por identificar um associado, ele é gerenciado pelo `Table` e guarda informações de cada associado.
  - `TableItem.module.css` Essa folha de estilos é responsável pelo componente de item da tabela de associados.
- UI // Nessa pasta deverão boa parte dos itens que serão refatorados
  - `Input.tsx` - Esse componente foi feito para ser um input costumizável, no entanto, graças ao grande número de variações acabou deixando de ser utilizado. Deverá ser refatorado para conter todos esses casos(por exemplo `EditInput.tsx`).
  - `SpanButton.tsx` - Esse componente foi feito para ser um botão reutilzável e deverá ser refatorado para servir em diversos contextos.
- WorkScreen
  - `WorkScreen.tsx` - Esse componente é o frame que contém a aplicação.
  - `WorkScreen.module.tsx` - Essa folha de estilo é reponsável pelo frame que contém a aplicação, aplicar novos estilos aqui podem impactar quase toda a aplicação.
- YearWorkspace \*
  - `YearWorkspace.tsx` - Esse componente popula o ambiente de trabalho e exibe o formulário de gerenciamento de anos.
  - `YearWorkspace.module.css` - Essa folha de estilo é responsável pelo ambiente de trabalho de ano.
  - `Year.tsx*` - Esse componente contém a lógica e a exibição dos anos. Posteriormente a lógica deverá ser refatorada para simplificar e/ou retirar de dentro do componente esse tipo de função.
  - `YearAssoaciteAdd.tsx*` - Esse componente é responsável pelo formulário de adicionar novas informações de ano.
