-- sqlite の ObentoDB の中身を テーブル名.csv として出力する
.mode csv
.output csv/M_section.csv
SELECT * FROM M_section;
.output csv/M_shop.csv
SELECT * FROM M_shop;
.output csv/M_user.csv
SELECT * FROM M_user;
.output csv/M_menu.csv
SELECT * FROM M_menu;
.output csv/M_option_group.csv
SELECT * FROM M_option_group;
.output csv/M_option.csv
SELECT * FROM M_option;
.output csv/T_order.csv
SELECT * FROM T_order;
.output csv/T_order_option.csv
SELECT * FROM T_order_option;
