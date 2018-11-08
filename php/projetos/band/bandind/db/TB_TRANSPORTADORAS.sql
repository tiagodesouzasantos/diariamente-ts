/****** Object: Table [dbo].[TB_TRANSPORTADORAS]   Script Date: 24/08/2018 17:37:36 ******/
USE [EDI_BAND];
GO
SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [dbo].[TB_TRANSPORTADORAS] (
[id] int IDENTITY(1, 1) NOT NULL,
[cgc_transp] varchar(30) NULL,
[razao_social_transp] varchar(255) NULL,
[cod] varchar(10) NULL)
ON [PRIMARY];
GO

