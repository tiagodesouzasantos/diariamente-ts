/****** Object: Table [dbo].[TB_OCORRENCIA_EDI]   Script Date: 24/08/2018 17:36:51 ******/
USE [EDI_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_OCORRENCIA_EDI] (
[id] int IDENTITY(1, 1) NOT NULL,
[dt_oco] varchar(10) NULL,
[hr_oco] varchar(5) NULL,
[fk_cod_oco_tivit] int NULL,
[fk_emissao_edi] int NULL,
[fk_usuario] int NULL)
ON [PRIMARY];
GO

