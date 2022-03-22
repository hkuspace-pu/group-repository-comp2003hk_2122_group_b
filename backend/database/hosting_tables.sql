USE COMP2003HK_GROUP_B;

-- drop all tables
DROP TABLE IF EXISTS trees;

-- create tables
CREATE TABLE trees (
    tree_id INT AUTO_INCREMENT PRIMARY KEY,
    tree_name VARCHAR (50),
    tree_alias VARCHAR (50),
    scientific_name VARCHAR (100),
    family_code VARCHAR (10),
    
    ecologic VARCHAR (10),
    cap_95 boolean,
    cap_586 boolean,
    hk_rare boolean,
    cn_rare boolean,
    
    flowering_start INT,
    flowering_end INT,
    
    fruit_start INT,
    fruit_end INT,
    
    tree_desc TEXT,
    
    tree_image LONGTEXT
);

