/****** Object: Table [dbo].[TB_USUARIOS]   Script Date: 27/08/2018 08:29:34 ******/
USE [USUARIOS_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_USUARIOS] (
[id] int IDENTITY(1, 1) NOT NULL,
[cpf] bigint NULL,
[matricula] int NULL,
[nome] nvarchar(50) NULL,
[email] nvarchar(150) NULL,
[senha] nvarchar(MAX) NULL,
[pontos] bigint NULL,
[foto] nvarchar(MAX) NULL,
[setor] nchar(50) NULL,
[local] nchar(50) NULL)
ON [PRIMARY]
TEXTIMAGE_ON [PRIMARY];
GO

