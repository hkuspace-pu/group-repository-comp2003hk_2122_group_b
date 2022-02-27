USE COMP2003HK_GROUP_B;
GO

-- create schema CW1
IF (SCHEMA_ID('gp') IS NULL)
BEGIN
    EXEC('CREATE SCHEMA gp');
END

-- drop all tables
IF OBJECT_ID(N'gp.TreeImages', N'U') IS NOT NULL
BEGIN
    DROP TABLE gp.TreeImages;
END
IF OBJECT_ID(N'gp.Trees', N'U') IS NOT NULL
BEGIN
    DROP TABLE gp.Trees;
END

-- create tables
CREATE TABLE gp.Trees (
    TreeID INT NOT NULL IDENTITY(1,1),
    TreeName NVARCHAR(50),
    Alias NVARCHAR(50),
    ScientificName NVARCHAR(100),
    FamilyCode NVARCHAR(10),

    Ecologic NVARCHAR(10),
    Cap95 BIT,
    Cap586 BIT,
    HkRare BIT,
    CnRare BIT,

    FloweringStart INT,
    FloweringEnd INT,
    FruitStart INT,
    FruitEnd INT,

    TreeDesc NVARCHAR(MAX),

    CONSTRAINT pk_Trees PRIMARY KEY (TreeID)
);

CREATE TABLE gp.TreeImages (
    TreeImageID INT NOT NULL IDENTITY(1,1),
    TreeID INT NOT NULL,
    ImageType NVARCHAR(10),
    ImageSrc NVARCHAR(MAX)

    CONSTRAINT pk_TreeImages PRIMARY KEY (TreeImageID),
    CONSTRAINT fk_TreeImages_Trees FOREIGN KEY (TreeID) REFERENCES gp.Trees(TreeID) ON DELETE CASCADE
)