/****** Object: Table [dbo].[TB_PARAMS_TIVIT]   Script Date: 24/08/2018 17:37:06 ******/
USE [EDI_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_PARAMS_TIVIT] (
[id] int IDENTITY(1, 1) NOT NULL,
[tb_registro] varchar(10) NULL,
[nm_campo] varchar(255) NULL,
[formato] varchar(10) NULL,
[posicao] varchar(10) NULL,
[status] varchar(255) NULL,
[notas] varchar(255) NULL,
[vl_fixo] varchar(50) NULL)
ON [PRIMARY];
GO

