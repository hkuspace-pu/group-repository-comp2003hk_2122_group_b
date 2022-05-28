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

SELECT * FROM trees;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	user_name TEXT NOT NULL,
	email VARCHAR(255) NOT NULL,
	password TEXT NOT NULL,
	membership int NOT NULL,
	
	UNIQUE (email)
)

DROP TABLE surveys;

select * from users

CREATE TABLE surveys (
	survey_id INT AUTO_INCREMENT PRIMARY KEY,
	longitude VARCHAR(50),
	latitude VARCHAR(50),
	survey_state VARCHAR(50),
	last_amended_time DATETIME,
	species_name VARCHAR(100),
	observation LONGTEXT,
	measurement VARCHAR(100),
	tree_condition VARCHAR(50),
	video VARCHAR(100),
	surveyor_id INT,
	moderator_comment LONGTEXT,
	score INT,
	client_reference VARCHAR(50)
);
