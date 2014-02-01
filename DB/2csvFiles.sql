-- sqlite の ObentoDB の中身を テーブル名.csv として出力する
.mode csv
.output M_BENTO.csv
SELECT * FROM M_BENTO;
.output M_OPTION.csv
SELECT * FROM M_OPTION;
.output M_SHOP.csv
SELECT * FROM M_SHOP;
.output T_ORDER.csv
SELECT * FROM T_ORDER;
.output M_BENTO_OPT.csv
SELECT * FROM M_BENTO_OPT;
.output M_SECTION.csv
SELECT * FROM M_SECTION;
.output M_USER.csv
SELECT * FROM M_USER;
