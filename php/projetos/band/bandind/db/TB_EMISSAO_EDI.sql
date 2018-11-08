/****** Object: Table [dbo].[TB_EMISSAO_EDI]   Script Date: 24/08/2018 17:36:21 ******/
USE [EDI_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_EMISSAO_EDI] (
[id] int IDENTITY(1, 1) NOT NULL,
[ch_acesso] varchar(255) NULL,
[cgc_transp] varchar(14) NULL,
[razao_social_transp] varchar(40) NULL,
[nrdi] varchar(50) NULL,
[veiculos] varchar(15) NULL,
[cgc_emissor] varchar(14) NULL,
[serie_nfe] varchar(3) NULL,
[numero_nfe] varchar(8) NULL,
[fk_usuario] int NULL)
ON [PRIMARY];
GO

