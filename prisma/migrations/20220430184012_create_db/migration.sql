-- CreateTable
CREATE TABLE "Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capa_url" TEXT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "qtd_paginas" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "curtidas" INTEGER DEFAULT 0,
    "disponivel" BOOLEAN DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN DEFAULT false,
    "ra" TEXT,
    "turma" TEXT,
    "curso" TEXT
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "devolvido" BOOLEAN NOT NULL,
    "data_emprestimo" DATETIME NOT NULL,
    "data_devolucao" DATETIME NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "livro_id" INTEGER NOT NULL,
    CONSTRAINT "Emprestimo_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "Livro" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Emprestimo_livro_id_key" ON "Emprestimo"("livro_id");
