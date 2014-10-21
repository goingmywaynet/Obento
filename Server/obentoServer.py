# -*- coding: utf-8 -*-
# vim: fileencoding=utf-8
#
# Obento Project
# - XML-RPC Server Side Program -
#
import inspect  # for debug

#
# Configure
#
mydb = '../DB/ObentoDB.db' # DB File
debugOn = True             # print debug text

#
# Debug用関数
#
def debugFunc(datas):
    if debugOn:
        curframe = inspect.currentframe()
        calframe = inspect.getouterframes(curframe, 2)
        print u"=========\t" , calframe[1][3], "\t========="
        for data in datas:
            print u"DATA> ", repr(data).decode('unicode-escape')

#
# Obento XML-RPC Server
#
from SimpleXMLRPCServer import SimpleXMLRPCServer
from SimpleXMLRPCServer import SimpleXMLRPCRequestHandler
import sqlite3

# Restrict to a particular path.
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)

    # CORS Support
    # http://stackoverflow.com/questions/3248320/xml-rpc-javascript-unsupported-method-options
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    # CORS Support
    # http://stackoverflow.com/questions/3248320/xml-rpc-javascript-unsupported-method-options
    # Add these headers to all responses
    def end_headers(self):
        self.send_header("Access-Control-Allow-Headers", 
                         "Origin, X-Requested-With, Content-Type, Accept")
        self.send_header("Access-Control-Allow-Origin", "*")
        SimpleXMLRPCRequestHandler.end_headers(self)


# Create server
server = SimpleXMLRPCServer(("localhost", 8000),
                            requestHandler=RequestHandler)
server.register_introspection_functions()

#
# SAMPLE CODE
#
# Register pow() function; this will use the value of
# pow.__name__ as the name, which is just 'pow'.
# server.register_function(pow)

# Register a function under a different name
# def adder_function(x,y):
#     return x + y
# server.register_function(adder_function, 'add')

# Register an instance; all the methods of the instance are
# published as XML-RPC methods (in this case, just 'div').
# class MyFuncs:
#     def div(self, x, y):
#         return x // y

# server.register_instance(MyFuncs())

#
# Server側処理実装
#

# M_section 取得
def SelectM_section():
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, name FROM M_section"
    cursor = db.execute(sql)
    res = cursor.fetchall()
    db.close()
    debugFunc([sql,res])
    return res
server.register_function(SelectM_section,'getM_section_ALL')

# M_user 取得
def SelectM_user(flag):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, section_id, name FROM M_user WHERE enable_flag = ?"
    cursor = db.execute(sql,(flag,))
    res = cursor.fetchall()
    db.close()
    debugFunc([sql,flag,res])
    return res
server.register_function(SelectM_user,'getM_user_FLAG')

# M_shop 取得
def SelectM_shop(flag):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, name FROM M_shop WHERE enable_flag = ?"
    cursor = db.execute(sql,(flag,))
    res = cursor.fetchall()
    db.close()
    debugFunc([sql,flag,res])
    return res
server.register_function(SelectM_shop,'getM_shop_FLAG')

# M_menu 取得
def SelectM_menu(shop_id,flag):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, name ,price FROM M_menu WHERE shop_id = ? AND enable_flag = ?"
    cursor = db.execute(sql,(shop_id,flag) )
    res = cursor.fetchall()
    db.close()
    debugFunc([sql,shop_id,flag,res])
    return res
server.register_function(SelectM_menu,'getM_menu_SHOP_FLAG')

# M_option_group 取得
def SelectM_option_group(menu_id):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT group_id, option_count FROM M_option_group WHERE menu_id = ?"
    cursor = db.execute(sql,(menu_id,))
    r = cursor.fetchall()
    if len(r) > 0:
        res = r
    else:
        res = [(0,0)]
    db.close()
    debugFunc([sql,menu_id,res,r,len(r)])
    return res
server.register_function(SelectM_option_group,'getM_option_group_MENU')

# M_option 取得
def SelectM_option_GROUP(group_id):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id,name FROM M_option WHERE group_id = ?"
    cursor = db.execute(sql,(group_id,))
    res = cursor.fetchall()
    db.close()
    debugFunc([sql,group_id,res])
    return res
server.register_function(SelectM_option_GROUP,'getM_option_GROUP')

# M_option 取得
def SelectM_option_MENU(menu_id):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id,name FROM M_option WHERE group_id = (SELECT group_id FROM M_option_group WHERE menu_id=?)"
    cursor = db.execute(sql,(menu_id,)) 
    #menu_idが2桁以上の場合 (menu_id) だと、2件とカウントされしまうので注意
    res = cursor.fetchall()
    db.close()
    debugFunc([sql,menu_id,res])
    return res
server.register_function(SelectM_option_MENU,'getM_option_MENU')

# T_ORDER への INSERT
def InsertT_order(order_date,user_id,shop_id,menu_id,payment,comment):
    db = sqlite3.connect(mydb, isolation_level=None)
    cur = db.cursor()
    sql = u"INSERT INTO T_ORDER (order_date, user_id, shop_id, menu_id, payment, comment) VALUES (? , ?, ?, ?, ?, ?)"
    cur.execute(sql, (order_date,user_id,shop_id,menu_id,payment,comment,))
    debugFunc([sql,order_date,user_id,shop_id,menu_id,payment,comment])
    lastID = cur.lastrowid
    debugFunc([u"Coursol.lastrowid #SELECT last_insert_rowid",lastID])
    db.close()
    return lastID
server.register_function(InsertT_order,'T_ORDER-INSERT')

# T_ORDER_OPTION への INSERT
def InsertT_order_option(order_id,option_id):
    db = sqlite3.connect(mydb, isolation_level=None)
    cur = db.cursor()
    sql = u"INSERT INTO T_ORDER_OPTION (order_id, option_id) VALUES (?, ?)"
    cur.execute(sql, (order_id,option_id,))
    debugFunc([sql,order_id,option_id])
    db.close()
    return order_id
server.register_function(InsertT_order_option,'T_ORDER_OPTION-INSERT')


# T_ORDER と T_ORDER_OPTION への SELECT IDで返す
def SelectT_ORDERid(order_id):
    db = sqlite3.connect(mydb, isolation_level=None)
    cur = db.cursor()
    sql = u"SELECT id,order_date, user_id, shop_id, menu_id, payment, comment FROM T_ORDER WHERE id = ?"
    cur.execute(sql,(order_id,))
    res = cur.fetchall()
    debugFunc([sql,order_id,res])

    sql = u"SELECT option_id FROM T_ORDER_OPTION WHERE order_id = ?"
    cur.execute(sql,(order_id,))
    options = cur.fetchall()
    for option_id in options:
        res.append(option_id)
    debugFunc([sql,order_id,res])

    db.close()
    return res
server.register_function(SelectT_ORDERid,'T_ORDER-SELECT_ID')

# T_ORDER と T_ORDER_OPTION への SELECT 日本語で返す
def SelectT_ORDER(order_id):
    db = sqlite3.connect(mydb, isolation_level=None)
    cur = db.cursor()
    sql = u"SELECT T_order.id , T_order.order_date , M_user.name \
            , M_shop.name , M_menu.name , T_order.payment , T_order.comment \
            FROM T_order \
            INNER JOIN M_shop , M_user , M_menu \
            ON T_order.shop_id = M_shop.id \
               and T_order.user_id = M_user.id \
               and T_order.menu_id = M_menu.id \
            WHERE T_order.id = ? \
                and T_order.order_date > date('now')"
    cur.execute(sql,(order_id,))
    res = cur.fetchall()
    debugFunc([sql,order_id,res])

    sql = u"SELECT M_option.name \
            FROM T_order_option \
            INNER JOIN M_option \
            ON T_order_option.option_id = M_option.id \
            WHERE T_order_option.order_id = ?"
    cur.execute(sql,(order_id,))
    options = cur.fetchall()
    for option_id in options:
        res.append(option_id)
    debugFunc([sql,order_id,res])

    db.close()
    return res
server.register_function(SelectT_ORDER,'T_ORDER-SELECT')

# T_ORDER への SELECT order_id by user_id
def SelectT_ORDER_ID_byUserId(user_id):
    db = sqlite3.connect(mydb, isolation_level=None)
    cur = db.cursor()
    sql = u"SELECT id FROM T_ORDER WHERE user_id = ? AND order_date > date('now')"
    cur.execute(sql,(user_id,))
    res = cur.fetchall()
    debugFunc([sql,user_id,res])
    db.close()
    return res
server.register_function(SelectT_ORDER_ID_byUserId,'T_ORDER-SELECT_ID_BY_USER')


# Run the server's main loop
server.serve_forever()
