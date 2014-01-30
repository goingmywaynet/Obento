
/* Drop Tables */

DROP TABLE T_ORDER;
DROP TABLE M_USER;
DROP TABLE M_SECTION;
DROP TABLE M_OPTION;
DROP TABLE M_BENTO_OPT;
DROP TABLE M_BENTO;
DROP TABLE M_SHOP;




/* Create Tables */

CREATE TABLE M_SECTION
(
	section_id integer NOT NULL UNIQUE,
	section_name text,
	PRIMARY KEY (section_id)
);


CREATE TABLE M_OPTION
(
	option_id integer NOT NULL UNIQUE,
	option_group integer NOT NULL,
	option_name text,
	PRIMARY KEY (option_id)
);


CREATE TABLE M_SHOP
(
	shop_id integer NOT NULL UNIQUE,
	shop_name text,
	PRIMARY KEY (shop_id)
);


CREATE TABLE M_USER
(
	user_id integer NOT NULL UNIQUE,
	section_id integer NOT NULL,
	user_name text,
	enable_flag integer DEFAULT 1,
	PRIMARY KEY (user_id),
	FOREIGN KEY (section_id)
	REFERENCES M_SECTION (section_id)
);


CREATE TABLE M_BENTO
(
	bento_id integer NOT NULL UNIQUE,
	shop_id integer NOT NULL,
	bento_name text,
	price integer,
	enable_flag integer DEFAULT 1,
	PRIMARY KEY (bento_id),
	FOREIGN KEY (shop_id)
	REFERENCES M_SHOP (shop_id)
);


CREATE TABLE M_BENTO_OPT
(
	bento_id integer NOT NULL,
	option_group integer,
	FOREIGN KEY (bento_id)
	REFERENCES M_BENTO (bento_id),
	UNIQUE (bento_id, option_group)
);


CREATE TABLE T_ORDER
(
	order_id integer NOT NULL UNIQUE,
	order_date text,
	user_id integer NOT NULL,
	bento_id integer NOT NULL,
	selected_opt text,
	PRIMARY KEY (order_id),
	FOREIGN KEY (user_id)
	REFERENCES M_USER (user_id),
	FOREIGN KEY (bento_id)
	REFERENCES M_BENTO (bento_id)
);



