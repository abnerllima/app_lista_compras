import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProdutosCollection } from '/imports/api/db/ProdutosCollection';
import {eLimiteDeProduto, eLimiteDePreco, eValorMonetario, eQuantidadeNumero} from './FuncProdutos';


 
Meteor.methods({
  'produto.inserir'(nome, quantidade, valor) {
    check(nome, String);
    check(quantidade, String);
    check(valor, String);

    quantidade = parseInt(quantidade);

    if(eValorMonetario(valor)){
      valor = parseFloat(valor);
    } else{
      throw new Meteor.Error('O preço inserido não é um numero');
    }

    if(isNaN(valor)) { throw new Meteor.Error('O preço inserido não é um numero'); }

    if(eQuantidadeNumero(quantidade)){
      quantidade = parseInt(quantidade);
    } else{
      throw new Meteor.Error('A quantidade inserida não é um numero');
    }

    if(isNaN(quantidade)) { throw new Meteor.Error('A quantidade inserida não é um numero'); }

    if(eLimiteDeProduto(quantidade))
    if(eLimiteDePreco(valor))

    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para inserir produtos.'); }

    ProdutosCollection.insert({
      nome,
      quantidade,
      valor,
      createdAt: new Date,
      userId: this.userId,
    })
  },

  'produto.remover'(produtoId) {
    check(produtoId, String);
    
    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para remover esse produto.'); }
    const produto = ProdutosCollection.findOne({ _id: produtoId, userId: this.userId });
    if (!produto) { throw new Meteor.Error('O produto não existe.'); }

    ProdutosCollection.remove(produtoId);
  },

  'produto.editar'(produtoId, nome) {
    check(produtoId, String);
    check(produtoId, String);
    
    
    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para editar esse produto.'); }
    const produto = ProdutosCollection.findOne({ _id: produtoId, userId: this.userId });
    if (!produto) { throw new Meteor.Error('O produto não existe.'); }
    
    ProdutosCollection.update(produtoId, {
      $set: {
        nome: nome
      }
    });
  },

  'valorTotalLista'() {
    if (!this.userId) { throw new Meteor.Error('Acesso não permitido.'); }
    const produtos = ProdutosCollection.find({ userId: this.userId }).fetch();
    
    let valorTotal = 0;
    produtos.forEach((produto) => {
      valorTotal = valorTotal + produto.quantidade * produto.valor;
    })
    
    return valorTotal;
  },

  'produtoMaisCaro'() {
    if (!this.userId) { throw new Meteor.Error('Acesso não permitido.'); }
    const produtos = ProdutosCollection.find({ userId: this.userId }).fetch();
    
    let valor = 0;
    let nome = '';
    produtos.forEach((produto) => {
      if(produto.valor > valor){
        valor = produto.valor;
        nome = produto.nome;
      }
    })
    
    return {valor, nome};
  },

  'produtoMaisBarato'() {
    if (!this.userId) { throw new Meteor.Error('Acesso não permitido.'); }
    const produtos = ProdutosCollection.find({ userId: this.userId }).fetch();
    
    let valor = 0;
    let nome = '';
    if(produtos.length < 1) { return {valor, nome} }

    valor = 1000000;
    produtos.forEach((produto) => {
      if(produto.valor < valor){
        valor = produto.valor;
        nome = produto.nome;
      }
    })
    
    return {valor, nome};
  }
});