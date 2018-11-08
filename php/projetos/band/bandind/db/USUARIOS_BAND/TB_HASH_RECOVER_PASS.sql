/****** Object: Table [dbo].[TB_HASH_RECOVER_PASS]   Script Date: 27/08/2018 08:35:57 ******/
USE [USUARIOS_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_HASH_RECOVER_PASS] (
[id] int IDENTITY(1, 1) NOT NULL,
[hash] nchar(50) NULL,
[cpf] bigint NULL,
[data] datetime NULL)
ON [PRIMARY];
GO

