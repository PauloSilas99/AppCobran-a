import React, { createContext, useState } from 'react';

export const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  const adicionarCliente = (cliente) => {
    setClientes([...clientes, { ...cliente, produtos: [] }]);
  };

  const adicionarProduto = (nomeCliente, produto) => {
    setClientes(clientes.map(cliente => 
      cliente.nome === nomeCliente ? 
      { ...cliente, produtos: [...cliente.produtos, { ...produto, dataRegistro: new Date().toISOString() }] } : cliente
    ));
  };

  const excluirCliente = (idCliente) => {
    setClientes(clientes.filter(cliente => cliente.id !== idCliente));
  };

  return (
    <ClienteContext.Provider value={{ clientes, adicionarCliente, adicionarProduto, excluirCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};
