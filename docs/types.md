## [index](./index.md)/types

Nesse repositório estão contidos as interfaces que tipificam o conteúdo dos modelos. Aqui também estão descritos interfaces internas, para os casos de `ENUM` e objetos internos. Toda interface que faz parte do domínio de um tipo deverá ser mantida dentro do arquivo do tipo, por mais que seja usado separadamente, exemplo:

- `YearType` contem a interface interna `EntriesType` que compõe a sua própria interface. No entanto, mesmo que por algum motivo tivessemos que usar o tipo `EntriesType` separadamente para algum propósito não devemos retirar esse tipo do arquivo `YearType.ts`
