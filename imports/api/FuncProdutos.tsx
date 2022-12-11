export const eLimiteDeProduto = (quantidade) => {
    if(quantidade>10)
      throw new Error('Quantidade de produtos passou do limite');
    else
      return 1 
}

export const eLimiteDePreco = (preco) => {
  if(preco>35.99)
    throw new Error('Produto com preço além do limite');
  else
    return 1 
}

export const eValorMonetario = (stringPreco) => {
    var er = /[\d\.\,]+$/;
    return (er.test(stringPreco))
}

export const eQuantidadeNumero = (stringQuantidade) => {
  var er = /[\d\.\,]+$/;
  return (er.test(stringQuantidade))
}