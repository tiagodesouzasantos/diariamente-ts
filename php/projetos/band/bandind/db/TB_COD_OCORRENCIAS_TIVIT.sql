/****** Object: Table [dbo].[TB_COD_OCORRENCIAS_TIVIT]   Script Date: 24/08/2018 17:34:39 ******/
USE [EDI_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_COD_OCORRENCIAS_TIVIT]
(
    [id] int IDENTITY(1, 1) NOT NULL,
    [cod] varchar(3) NULL,
    [desc_ocorrencias] varchar(255) NULL
)
ON [PRIMARY];
GO

