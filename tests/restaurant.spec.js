const createMenu = require('../src/restaurant');
 
/*
  Você é responsável por escrever o código do sistema de pedidos de um restaurante através do qual será possível
  cadastrar um menu. Dado que um menu foi cadastrado, o sistema deve disponibilizar um objeto que permite:

  - Ler o menu cadastrado;
  - Fazer pedidos;
  - Verificar o que foi pedido;
  - Somar o valor da conta.

  A estrutura deste código e deste objeto já está definida e você precisa implementá-la.
  Abaixo você verá uma série de testes e passos que irão guiar você e, que devem NECESSARIAMENTE ser realizados em ordem para o bom desenvolvimento do sistema.

  Desenvolvimento:
  - Uma função: 
    createMenu()
  - Recebe um parâmetro que é um objeto, o menu:
    Exemplo: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }.

  A função createMenu() então, retornará um novo objeto. Este novo objeto contém algumas chaves e ao acessar cada uma delas temos os seguintes retornos:

  - Uma chave `fetchMenu` retornando o menu, que nada mais é que o objeto passado como parâmetro para createMenu()

    Exemplo:
    const meuRestaurante = createMenu({
      food: {'coxinha': 3.90, 'sanduiche', 9.90},
      drinks: {'agua': 3.90, 'cerveja': 6.90}
    });

    meuRestaurante.fetchMenu() // Retorno: Menu acima

  - Uma chave `consumption` armazenando um array de strings. Cada string é a chave de um pedido.
    Exemplo: ['coxinha', 'cerveja']

  - Uma chave `order` armazenando uma função. Essa função recebe uma string como parâmetro e essa string deve ser adicionada à lista armazenada em `consumption`.

  - Uma chave `pay` que, quando chamada, invoca uma função. Essa função faz a soma do preço de todos os pedidos, retornando essa soma de preços com acréscimo de 10%.

  Comportamento:
    const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} })

    meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }

    meuRestaurante.order('coxinha') // Retorno: undefined

    meuRestaurante.consumption // Retorno: ['coxinha']

    meuRestaurante.pay() // Retorno: 4.29

  IMPORTANTE: FAÇA OS TESTES E PASSOS DE ACORDO COM A SEQUÊNCIA INDICADA NO README DO PROJETO!

*/

describe('10 - Implemente os casos de teste e a função `createMenu`', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {

    // TESTE 1: Verifique se função `createMenu()` retorna um objeto que possui a chave `fetchMenu`, a qual tem como valor uma função.
    //const objetoRetornado = createMenu(); // Retorno: { fetchMenu: () => {}, ... }
    expect(typeof createMenu().fetchMenu).toBe('function');
    // ```

    // TESTE 2: Verifique se 'objetoRetornado.fetchMenu()' retorna um objeto cujas chaves são somente `food` e `drink`, 
    // considerando que a função createMenu() foi chamada com o objeto: `{ food: {}, drink: {} }`.
    // const objetoRetornado = createMenu({ food: {}, drink: {} });
    // objetoRetornado.fetchMenu() // Retorno: { food: {}, drink: {}}
    expect((createMenu({ food: {}, drink: {} }).fetchMenu())).toEqual(expect.objectContaining({ food: {}, drink: {} }));;   
    // ```
 
    // TESTE 3: Verifique se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função 'objetoRetornado.fetchMenu()'
   // Retorno: objetoQualquer
    const obj = { food: 'coxinha' };
    expect(createMenu(obj).fetchMenu()).toEqual(expect.objectContaining(obj));
    // ```

    // Agora faça o PASSO 1 no arquivo `src/restaurant.js`.
    // --------------------------------------------------------------------------------------

    // TESTE 4: Verifique se 'objetoRetornado.consumption', após a criação do menu, retorna um array vazio.
    // const objetoRetornado = createMenu(objetoQualquer);
    // objetoRetornado.consumption // Retorno: []
    expect(createMenu().consumption).toEqual(expect.arrayContaining([]));
    // ```

    // Agora faça o PASSO 2 no arquivo `src/restaurant.js`.
    // --------------------------------------------------------------------------------------

    // TESTE 5: Verifique se, ao chamar uma função associada à chave `order` no objeto retornado,
    // passando uma string como parâmetro (como `objetoRetornado.order('coxinha')`), tal string é adicionada
    // ao array retornado em `objetoRetornado.consumption`.    
    const func = createMenu(); // const objetoRetornado = createMenu(objetoQualquer);
    func.order('coxinha'); // objetoRetornado.order("coxinha");
    expect(func.consumption).toEqual(expect.arrayContaining(['coxinha'])); // objetoRetornado.consumption // Retorno: ["coxinha"]
    //```
    // Agora faça o PASSO 3 no arquivo `src/restaurant.js`.
    // --------------------------------------------------------------------------------------

    // TESTE 6: Verifique se, ao adicionar três pedidos, dentre bebidas e comidas, o array `objetoRetornado.consumption` contém os itens pedidos.    
    func.order('agua'); // objetoRetornado.order("agua");
    func.order('sopa'); // objetoRetornado.order("sopa");
    func.order('sashimi'); // objetoRetornado.order("sashimi");
    //objetoRetornado.consumption // Retorno: ["coxinha", "agua", "sopa", "sashimi"]
    expect(func.consumption).toEqual(expect.arrayContaining(['coxinha', 'agua', 'sopa', 'sashimi']));    
    // ```

    // Agora faça o TESTE 7 deste arquivo.
    // --------------------------------------------------------------------------------------

    // TESTE 7: Verifique se a função `order` aceita que pedidos repetidos sejam acrescidos a `consumption`.
    const func2 = createMenu();
    func2.order('coxinha'); // objetoRetornado.order('coxinha');
    func2.order('sopa'); // objetoRetornado.order('agua');
    func2.order('coxinha'); // objetoRetornado.order('coxinha');
    // objetoRetornado.consumption // Retorno: ['coxinha', 'agua', 'coxinha']
    expect(func2.consumption).toEqual(expect.arrayContaining(['coxinha', 'sopa', 'coxinha']));
    // ```


    // Agora faça o TESTE 8 deste arquivo.
    // --------------------------------------------------------------------------------------

    // TESTE 8: Verifique se, ao chamar `objetoRetornado.pay()`, retorna-se a soma dos preços de tudo que foi pedido, conforme registrado em `objetoRetornado.consumption`
    const func3 = createMenu({ food: { coxinha: 2, sopa: 3 }, drink: { agua: 4, cerveja: 4 } });
    func3.order('coxinha'); // objetoRetornado.order('coxinha');
    func3.order('agua'); // objetoRetornado.order('agua');
    func3.order('coxinha'); // objetoRetornado.order('coxinha');    
    expect(func3.pay()).toEqual(8.8); // objetoRetornado.pay() // Retorno: somaDosPreçosDosPedidos () - 2 + 4 + 2 -> 8 * 1.1 = 8.8// 
    // Agora faça o PASSO 4 no arquivo `src/restaurant.js`.
  });
});
