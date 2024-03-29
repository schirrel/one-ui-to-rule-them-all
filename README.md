# One UI to rule them all

## Apêndice

Este é um estudo sobre web-component ou algo parecido para construir componentes reutilizáveis para Vue e React.

Ferramentas objetivo:

- [x] Web component nativo
- [x] StencilJS
- [x] Lit (antigo polymer)
- [ ] Mitosis

## Autores

- [@schirrel](https://www.github.com/schirrel)

## Componentes
- Button
   - type: button, submit e reset
   - adicionado customização de loading
- Input
  - com value sendo indentificado pelos frameworks
  - tipos de acordo com MDN

## Estrutura
### Componentes
- `lit`: desenvolvimento de componentes com Lit
- `stencil`: desenvolvimento de componentes com Stencil
- `vanilla-js`: desenvolvimento de componentes com web componentes 100% javascript puro


### Examples
- `lit`: exemplos dos componentes desenvolvidos com Lit
- `stencil`: exemplos dos componentes desenvolvidos com Stencil
- `vanilla-js`: exemplos dos componentes desenvolvidos com web componentes 100% javascript puro

## Documentação

## Button

- type: `button`, `reset`, `submit`
    - _type button_ é o default aqui, em vez do submit

**Funcionando**:
  - `@click` do Vue
  - `onClick` do React
  - `addEventListener("click"` do JS vanilla

**Não funciona**:
- `onclick` nativo no Elemento.


## Input

- type: todos os types que estão no MDN


**Funcionando**:
  - `v-model` do Vue
  - `onInput` do React (Exceto no Lit)


"Gambiarra":
  - `onChange` do React: O `onChange` não ouve o evento nativo de change, mesmo o emitindo de varias maneiras. 
Analisando o código da pra perceber que o react implementa uma propriedade `__reactEventHandlers` onde esta possui uma função `onChange`.

**Em andamento**
- Validações de form como required

## Funcionalidades
- Button
  - button, submit e reset
- Input
  - com atualização de value no framework
  - validação de form - EM ANDAMENTO


## Referência

- Plain Web Components | [Web Components](https://www.webcomponents.org/) | [Open WC](https://open-wc.org/) 
- Lit | [Docs](https://lit.dev/docs/)
- Mitosis | [Docs](https://github.com/BuilderIO/mitosis) |  [Tutorial](https://blog.logrocket.com/creating-reusable-components-mitosis-builder-io/) | [mitosis issue asked](https://github.com/BuilderIO/mitosis/issues/417)
- Stencil | [Docs](https://stenciljs.com/)
## Demonstração

[Demo](https://schirrel.dev/one-ui-to-rule-them-all/)
