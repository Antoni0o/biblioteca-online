interface ILivroReponseDTO {
  id: number;
  isbn: string;
  titulo: string;
  autor: string;
  genero: string;
  qtd_paginas: number;
  capa_url: string;
  curtidas: number;
  disponivel: boolean;
}

export { ILivroReponseDTO };