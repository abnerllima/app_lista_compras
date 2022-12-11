
import { assert, expect } from 'chai';
import {eLimiteDeProduto, eLimiteDePreco, eValorMonetario} from './FuncProdutos';


describe('Teste de limite da quantidade do produto', () => {

  test('Limite inferior', () => {
    assert.equal(eLimiteDeProduto(9), 1);
  });

  test('Limite', () => {
    assert.equal(eLimiteDeProduto(10), 1);
    
  });

  
  test('Limite Superior', () => {

      expect( () => {
        eLimiteDeProduto(11);
      }).throw("Quantidade de produtos passou do limite");
  })

});


describe('Teste de limite de Preco', () => {

  it('Limite inferior - Preço', () => {
    assert.equal(eLimiteDePreco(34), 1);
  });

  it('Limite - Preço', () => {
    assert.equal(eLimiteDePreco(35.99), 1);
  });

  it('Limite Superior', () => {
    expect( () => {
      eLimiteDePreco(36);
    }).throw("Produto com preço além do limite");
  })

});



describe('Teste de função valor monetário', () => {

  it('Teste valor com virgula', () => {
    assert.equal(eValorMonetario('15,50'), true);
  });

  it('Teste valor com ponto', () => {
    assert.equal(eValorMonetario('1.50'), true);
  });

  it('Teste valor com letra e ponto', () => {
    assert.equal(eValorMonetario('1.50a'), false);
  });

  it('Teste valor com letra e virgula', () => {
    assert.equal(eValorMonetario('1,50a'), false);
  });

  it('Teste valor com caracter especial e virgula', () => {
    assert.equal(eValorMonetario('1,50##$?'), false);
  });

  it('Teste valor com letra e ponto', () => {
    assert.equal(eValorMonetario('1.50@@$&'), false);
  });

  it('Teste valor com letra apenas', () => {
    assert.equal(eValorMonetario('a'), false);
  });

  it('Teste valor com letras apenas', () => {
    assert.equal(eValorMonetario('afsdfsfsd'),false);
  });

  it('Teste valor com caracter especial', () => {
    assert.equal(eValorMonetario('#'), false);
  });


  it('Teste valor com caracteres especiais', () => {
    assert.equal(eValorMonetario('#@#?'), false);
  });

  it('Teste valor com caracteres especiais e espaço', () => {
    assert.equal(eValorMonetario('# @#?'), false);
  });

  it('Teste valor com letras e espaço', () => {
    assert.equal(eValorMonetario('a b c'), false);
  });

});