USE COMP2003HK_GROUP_B;

-- drop all tables
DROP TABLE IF EXISTS trees;

-- create tables
CREATE TABLE trees (
    tree_id INT AUTO_INCREMENT PRIMARY KEY,
    tree_name_en VARCHAR (50),
    tree_name_cn VARCHAR (50),
    tree_alias VARCHAR (50),
    scientific_name VARCHAR (100),
    family_code VARCHAR (10),
    
    ecologic VARCHAR (10),
    cap_96 boolean,
    cap_586 boolean,
    hk_rare boolean,
    cn_rare boolean,
    
    flowering VARCHAR (12),
    fruit VARCHAR (12),
    
    tree_desc_en TEXT,
    tree_desc_cn TEXT,
    
    tree_image TEXT
);