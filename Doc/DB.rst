==============================
DataBase
==============================

DB処理コマンド
==============================

各コマンドのカレントディレクトリは :file:`./DB/` にて実施する


データーベース生成
------------------------------

.. code-block:: bash

  $ sqlite3 obentoDB.db < ObentoDB.sql

DB実態ファイル :file:`./DB/ObentoDB.db`

DB定義ファイル :file:`./DB/ObentoDB.sql`

テストデータ投入
------------------------------

.. code-block:: bash

  $ sqlite3 obentoDB.db < ObentoTestData.sql

試験データファイル :file:`./DB/ObentoTestData.sql`

DB内容をcsv化
------------------------------

.. code-block:: bash

  $ mkdir csv
  $ sqlite3 obntoDB.db < 2csvFiles.sql

csv化SQL文 :file:`./DB/2csvFiles.sql`

テーブル設計
==============================

M_section / 部署マスタ
------------------------------

.. csv-table:: 部署マスタ
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "x", "", "id",   "integer", "", "", "x", "",     "部署ID",   ""
  "",  "", "name", "text",    "", "x", "", "NULL", "部署名称", ""

.. code-block:: sql

  CREATE TABLE M_section (
    id integer PRIMARY KEY UNIQUE NOT NULL,
    name text
  );

M_user / ユーザ名マスタ
------------------------------

.. csv-table:: ユーザ名マスタ
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "x", "", "id",         "integer", "", "", "x", "", "ユーザID",   ""
  "",  "", "section_id", "integer", "", "", "",  "", "所属部署ID", "M_section.id"
  "",  "", "name",       "text",    "", "", "",  "", "氏名",       ""
  "",  "", "enable_flag", "integer", "", "", "", "1", "使用可否フラグ(0:off 1:on)", ""

.. code-block:: sql

  CREATE TABLE M_user (
    id integer PRIMARY KEY UNIQUE NOT NULL,
    section_id integer,
    name text,
    enable_flag integer(1) DEFAULT(1),
    FOREIGN KEY (section_id) REFERENCES M_section (id)
  );

M_shop / 店舗名マスタ
------------------------------

.. csv-table:: 店舗名マスタ
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "x", "", "id", "integer", "", "", "x", "", "店舗ID", ""
  "",  "", "name", "text",  "", "", "", "",  "店舗名", ""
  "",  "", "enable_flag", "integer", "", "", "", "1", "使用可否フラグ(0:off 1:on)", ""

.. code-block:: sql

  CREATE TABLE M_shop (
    id integer PRIMARY KEY UNIQUE NOT NULL,
    name text,
    enable_flag integer(1) DEFAULT(1)
  );

M_menu / 弁当メニューマスタ
------------------------------

.. csv-table:: 弁当メニューマスタ
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "x", "", "id",         "integer", "", "", "x", "", "メニューID", ""
  "",  "", "shop_id",    "integer", "", "", "",  "", "店舗ID",     "M_shop.id"
  "",  "", "name",       "text",    "", "", "",  "", "メニュー名", ""
  "",  "", "price",      "integer", "", "", "",  "", "定価(円)",   ""
  "",  "", "enable_flag", "integer", "", "", "", "1", "使用可否フラグ(0:off 1:on)", ""

.. code-block:: sql

  CREATE TABLE M_menu (
    id integer PRIMARY KEY UNIQUE NOT NULL,
    shop_id integer,
    name text,
    price integer,
    enable_flag integer DEFAULT(1),
    FOREIGN KEY (shop_id) REFERENCES M_shop (shop_id)
  );

M_option / オプション管理マスタ
----------------------------------

.. csv-table:: オーダ保存テーブル
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "x", "", "id",      "integer", "", "", "", "", "メニューID", ""
  "", "",  "group_id","integer", "", "", "", "", "オプショングループID", ""
  "", "",  "name",    "text",    "", "", "", "", "オプション名", ""

.. code-block:: sql

  CREATE TABLE M_option (
    id integer PRIMARY KEY UNIQUE NOT NULL,
    group_id integer NOT NULL,
    name text NOT NULL
  );

M_option_group / オプショングループ管理マスタ
-------------------------------------------------

.. csv-table:: オプショングループ管理テーブル
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "", "", "menu_id",      "integer", "", "", "", "", "メニューID", ""
  "", "", "group_id",     "integer", "", "", "", "", "オプショングループID", ""
  "", "", "option_count", "integer", "", "", "", "", "選択オプション数", ""

.. code-block:: sql

  CREATE TABLE M_option_group (
    menu_id integer,
    group_id integer,
    option_count integer,
    FOREIGN KEY (menu_id) REFERENCES M_menu (id),
    UNIQUE (menu_id, group_id)
  );

T_order / オーダ保存テーブル
------------------------------

.. csv-table:: オーダ保存テーブル
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "x","x","id",        "integer","","", "x","",    "オーダーID",    ""
  "", "", "order_date","text (datetime YYYY-MM-DD HH:MM:SS)",   "","x","", "NULL","注文日時",      ""
  "", "", "user_id",   "integer","","x","", "NULL","注文者ID",      "M_user.id"
  "", "", "menu_id",   "integer","","x","", "NULL","注文メニューID","M_menu.id"
  "", "", "payment",   "integer","","x","", "NULL","支払い金額",    ""
  "", "", "comment",   "text","","x","", "NULL","注文コメント",    ""

.. code-block:: sql

  CREATE TABLE T_order (
    id integer PRIMARY KEY UNIQUE AUTOINCREMENT NOT NULL,
    order_date text,
    user_id integer,
    menu_id integer,
    payment integer,
    comment text,
    FOREIGN KEY (user_id) REFERENCES M_user (user_id),
    FOREIGN KEY (menu_id) REFERENCES M_menu (id)
  );

T_order_option / オプションオーダ保存テーブル
-------------------------------------------------

オプションを選択した場合に使用するテーブル。複数のオプションを選択した場合は同一 order_id が複数行作られる。

.. csv-table:: オーダ保存テーブル(オプション選択)
  :header: "primary", "Auto Increment", "Field Name", "Data Type", "Size", "Allow Null", "Unique", "Default", "Description", "Relation"
  :widths: 10, 10, 20, 10, 5, 10, 5, 10, 30, 20

  "", "", "order_id",  "integer","","", "x","",    "オーダーID",    "T_order.id"
  "", "", "option_id", "text",   "","x","", "NULL","オプションIDs",      "M_option.id"

.. code-block:: sql

  CREATE TABLE T_order_option (
    order_id integer,
    option_id integer,
    FOREIGN KEY (order_id) REFERENCES T_order (id),
  );

