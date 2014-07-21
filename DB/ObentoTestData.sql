-- 課マスタ
INSERT INTO M_section (id, name) VALUES ('1', 'スマイル課');
INSERT INTO M_section (id, name) VALUES ('2', 'どきどき課');
INSERT INTO M_section (id, name) VALUES ('3', 'ハピネス課');

-- ユーザ名マスタ
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('1', '1', ' 星空 みゆき', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('2', '1', ' 日野 あかね', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('3', '1', ' 黄瀬 やよい', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('4', '1', ' 緑川 なお', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('5', '1', ' 青木 れいか', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('6', '2', ' 相田 マナ', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('7', '2', ' 菱川 六花', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('8', '2', ' 四葉 ありす', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('9', '2', ' 剣崎 真琴', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('10', '2', ' 円 亜久里', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('11', '3', ' 愛乃 めぐみ', '1');
INSERT INTO M_user (id, section_id, name, enable_flag) VALUES ('12', '3', ' 白雪 ひめ', '1');

-- 店マスタ
INSERT INTO M_shop (id, name, enable_flag) VALUES ('1', '本店食堂','1');
INSERT INTO M_shop (id, name, enable_flag) VALUES ('2', 'どん丼亭','1');
INSERT INTO M_shop (id, name, enable_flag) VALUES ('3', '四季菜','1');
INSERT INTO M_shop (id, name, enable_flag) VALUES ('4', 'あちこーこー屋','1');
INSERT INTO M_shop (id, name, enable_flag) VALUES ('5', 'ポケットマーニー','1');

-- 弁当メニューマスタ
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '日替わり（小）', '200', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '日替わり（中）', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '日替わり（大）', '400', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '玄米弁当　鶏じぶ煮', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '玄米弁当　豚キムチ炒め', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '玄米弁当　サバの西京焼き', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'ゆし豆腐', '150', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'チャンプルー', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '沖縄そば', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', '沖縄そばセット', '450', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'カレーライス', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'カツカレー', '450', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'おにぎり', '60', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'ジューシー', '80', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '1', 'ジューシーパック（２個入り）', '150', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '2', '日替わり', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '3', '日替わり', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '4', 'ハーフ＆ハーフ（小）', '300', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '4', 'ハーフ＆ハーフ（中）', '350', '1');
INSERT INTO M_menu ( shop_id, name, price, enable_flag) VALUES ( '4', 'ハーフ＆ハーフ（大）', '400', '1');


-- オプションマスタ
INSERT INTO M_option (group_id, name) VALUES ('1', '鮭');
INSERT INTO M_option (group_id, name) VALUES ('1', '梅');
INSERT INTO M_option (group_id, name) VALUES ('2', '白米');
INSERT INTO M_option (group_id, name) VALUES ('2', '玄米');
INSERT INTO M_option (group_id, name) VALUES ('2', '五穀米');
INSERT INTO M_option (group_id, name) VALUES ('3', '豚丼');
INSERT INTO M_option (group_id, name) VALUES ('3', 'カツ丼');
INSERT INTO M_option (group_id, name) VALUES ('3', 'カレー');
INSERT INTO M_option (group_id, name) VALUES ('3', 'マーボ');
INSERT INTO M_option (group_id, name) VALUES ('3', '親子丼');
INSERT INTO M_option (group_id, name) VALUES ('3', 'レバー');
INSERT INTO M_option (group_id, name) VALUES ('3', 'にら玉丼');
INSERT INTO M_option (group_id, name) VALUES ('3', 'タコライス');
INSERT INTO M_option (group_id, name) VALUES ('3', 'ちゃんぽん');
INSERT INTO M_option (group_id, name) VALUES ('3', 'ビビンバ');
INSERT INTO M_option (group_id, name) VALUES ('3', '豚キムチ');
INSERT INTO M_option (group_id, name) VALUES ('3', 'テリマヨチキン');
INSERT INTO M_option (group_id, name) VALUES ('3', 'ソースカツマヨ');
INSERT INTO M_option (group_id, name) VALUES ('3', 'ピリ辛チキン');
INSERT INTO M_option (group_id, name) VALUES ('3', 'オクラ丼');

-- 弁当オプション関連
INSERT INTO M_option_group (menu_id, group_id, option_count) VALUES ('13', '1', '1');
INSERT INTO M_option_group (menu_id, group_id, option_count) VALUES ('17', '2', '1');
INSERT INTO M_option_group (menu_id, group_id, option_count) VALUES ('18', '3', '2');
INSERT INTO M_option_group (menu_id, group_id, option_count) VALUES ('19', '3', '2');
INSERT INTO M_option_group (menu_id, group_id, option_count) VALUES ('20', '3', '2');


