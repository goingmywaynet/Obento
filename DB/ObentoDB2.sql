
/* Drop Tables */

DROP TABLE T_order;
DROP TABLE T_order_option;
DROP TABLE M_option_group;
DROP TABLE M_option;
DROP TABLE M_section;
DROP TABLE M_user;
DROP TABLE M_menu;
DROP TABLE M_shop;

/* Create Tables */

CREATE TABLE M_section
(
	id integer NOT NULL UNIQUE,
	name text,
	PRIMARY KEY (id)
);

CREATE TABLE M_shop
(
	id integer NOT NULL UNIQUE,
	name text,
  enable_flag integer DEFAULT 1,
	PRIMARY KEY (id)
);

CREATE TABLE M_user
(
	id integer NOT NULL UNIQUE,
	section_id integer NOT NULL,
	name text,
	enable_flag integer DEFAULT 1,
	PRIMARY KEY (id),
	FOREIGN KEY (section_id)
	REFERENCES M_section (section_id)
);

CREATE TABLE M_menu
(
	id integer NOT NULL UNIQUE,
	shop_id integer NOT NULL,
	name text,
	price integer,
	enable_flag integer DEFAULT 1,
	PRIMARY KEY (id),
	FOREIGN KEY (shop_id)
	REFERENCES M_SHOP (shop_id)
);

CREATE TABLE M_option_group
(
	menu_id integer NOT NULL,
	group_id integer,
  option_count integer,
	FOREIGN KEY (menu_id)
	REFERENCES M_menu (id),
	UNIQUE (menu_id, group_id)
);

CREATE TABLE M_option
(
	id integer NOT NULL UNIQUE,
	group_id integer NOT NULL,
	name text,
	PRIMARY KEY (id)
);

CREATE TABLE T_order
(
	id integer NOT NULL UNIQUE,
	order_date text,
	user_id integer NOT NULL,
	menu_id integer NOT NULL,
	payment integer,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id)
	REFERENCES M_USER (user_id),
	FOREIGN KEY (menu_id)
	REFERENCES M_BENTO (menu_id)
);

CREATE TABLE T_order_option
(
  order_id integer NOT NULL,
  option_id integer NOT NULL,
	FOREIGN KEY (order_id)
	REFERENCES T_order (id),
	FOREIGN KEY (option_id)
	REFERENCES M_option (id)
);

