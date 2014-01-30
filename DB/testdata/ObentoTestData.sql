-- 課マスタ
INSERT INTO M_SECTION (section_id, section_name) VALUES ('1', 'スマイル課');
INSERT INTO M_SECTION (section_id, section_name) VALUES ('2', 'どきどき課');
INSERT INTO M_SECTION (section_id, section_name) VALUES ('3', 'ハピネス課');


-- 利用者マスタ
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('1', '1', ' 星空 みゆき', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('2', '1', ' 日野 あかね', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('3', '1', ' 黄瀬 やよい', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('4', '1', ' 緑川 なお', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('5', '1', ' 青木 れいか', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('6', '2', ' 相田 マナ', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('7', '2', ' 菱川 六花', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('8', '2', ' 四葉 ありす', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('9', '2', ' 剣崎 真琴', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('10', '2', ' 円 亜久里', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('11', '3', ' 愛乃 めぐみ', '1');
INSERT INTO M_USER (user_id, section_id, user_name, enable_flag) VALUES ('12', '3', ' 白雪 ひめ', '1');


-- 店マスタ
INSERT INTO M_SHOP (shop_id, shop_name) VALUES ('1', '吉田家');
INSERT INTO M_SHOP (shop_id, shop_name) VALUES ('2', '竹屋');
INSERT INTO M_SHOP (shop_id, shop_name) VALUES ('3', 'きす家');
INSERT INTO M_SHOP (shop_id, shop_name) VALUES ('4', 'なか卵');


-- 弁当マスタ
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('1', '1', '牛丼 並', '350', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('2', '1', '牛丼 大', '400', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('3', '1', 'ステーキ', '500', '0');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('4', '2', '焼肉定食 小', '300', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('5', '2', '焼肉 定食 中', '350', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('6', '2', '焼肉定食 大', '400', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('7', '3', 'ハーフ＆ハーフ 中', '350', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('8', '3', 'ハーフ＆ハーフ 大', '450', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('9', '4', '親子丼 小', '300', '1');
INSERT INTO M_BENTO (bento_id, shop_id, bento_name, price, enable_flag) VALUES ('10', '5', '親子丼 大', '400', '1');


-- オプションマスタ
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('1', '1', '白米');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('2', '1', 'じゅーしー');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('3', '1', 'チャーハン');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('4', '1', 'カレー');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('5', '2', 'チャーハン');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('6', '2', 'カレー');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('7', '2', '天津飯');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('8', '2', 'ちゃんぽん');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('9', '2', 'カツ丼');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('10', '2', '天丼');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('11', '2', '牛丼');
INSERT INTO M_OPTION (option_id, option_group, option_name) VALUES ('12', '2', '親子丼');


-- 弁当オプション関連
INSERT INTO M_BENTO_OPT (bento_id, option_group) VALUES ('3', '1');
INSERT INTO M_BENTO_OPT (bento_id, option_group) VALUES ('4', '1');
INSERT INTO M_BENTO_OPT (bento_id, option_group) VALUES ('5', '1');
INSERT INTO M_BENTO_OPT (bento_id, option_group) VALUES ('6', '1');
INSERT INTO M_BENTO_OPT (bento_id, option_group) VALUES ('7', '2');
INSERT INTO M_BENTO_OPT (bento_id, option_group) VALUES ('8', '2');


