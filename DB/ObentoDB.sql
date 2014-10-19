
/* Drop Tables */

DROP TABLE IF EXISTS T_order;
DROP TABLE IF EXISTS T_order_option;
DROP TABLE IF EXISTS M_option_group;
DROP TABLE IF EXISTS M_option;
DROP TABLE IF EXISTS M_section;
DROP TABLE IF EXISTS M_user;
DROP TABLE IF EXISTS M_menu;
DROP TABLE IF EXISTS M_shop;

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
	name text NOT NULL,
  enable_flag integer(1) NOT NULL DEFAULT 1,
	PRIMARY KEY (id)
);

CREATE TABLE M_user
(
	id integer NOT NULL UNIQUE,
	section_id integer NOT NULL,
	name text NOT NULL,
	enable_flag integer(1) DEFAULT 1 NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (section_id)
	REFERENCES M_section (id)
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
	id integer PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE  ,
	order_date text NOT NULL,
	user_id integer NOT NULL,
  shop_id integer NOT NULL,
	menu_id integer NOT NULL,
	payment integer,
  comment text,
	FOREIGN KEY (user_id)
	REFERENCES M_USER (user_id),
	FOREIGN KEY (menu_id)
	REFERENCES M_menu (id)
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

