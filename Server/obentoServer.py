# -*- coding: utf-8 -*-
# vim: fileencoding=utf-8
#
# Obento Project
# - XML-RPC Server Side Program -
#

# Obento XML-RPC Server
from SimpleXMLRPCServer import SimpleXMLRPCServer
from SimpleXMLRPCServer import SimpleXMLRPCRequestHandler
import sqlite3

#
# XML-RPC Server
#

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

mydb = 'ObentoDB2.db'

# M_section 取得
def SelectM_section():
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, name FROM M_section"
    cursor = db.execute(sql)
    return cursor.fetchall()
    db.close()
server.register_function(SelectM_section,'getM_section_ALL')

# M_user 取得
def SelectM_user(flag):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, section_id, name FROM M_user WHERE enable_flag = ?"
    cursor = db.execute(sql,(flag,))
    return cursor.fetchall()
    db.close()
server.register_function(SelectM_user,'getM_user_FLAG')

# M_shop 取得
def SelectM_shop(flag):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, name FROM M_shop WHERE enable_flag = ?"
    cursor = db.execute(sql,(flag,))
    return cursor.fetchall()
    db.close()
server.register_function(SelectM_shop,'getM_shop_FLAG')

# M_menu 取得
def SelectM_menu(shop_id,flag):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id, name ,price FROM M_menu WHERE shop_id = ? AND enable_flag = ?"
    cursor = db.execute(sql,(shop_id,flag) )
    return cursor.fetchall()
    db.close()
server.register_function(SelectM_menu,'getM_menu_SHOP_FLAG')

# M_option_group 取得
def SelectM_option_group(menu_id):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT group_id, option_count FROM M_option_group WHERE menu_id = ?"
    cursor = db.execute(sql,(menu_id,))
    r = cursor.fetchall()
    if len(r) > 0:
        return r
    else:
        return [(0,0)]
    #Debug
    # print r
    # print len(r)
    # return cursor.fetchall()
    db.close()
server.register_function(SelectM_option_group,'getM_option_group_MENU')

# M_option 取得
def SelectM_option_GROUP(group_id):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id,name FROM M_option WHERE group_id = ?"
    cursor = db.execute(sql,(group_id,))
    return cursor.fetchall()
    db.close()
server.register_function(SelectM_option_GROUP,'getM_option_GROUP')

# M_option 取得
def SelectM_option_MENU(menu_id):
    db = sqlite3.connect( mydb, isolation_level=None)
    sql = u"SELECT id,name FROM M_option WHERE group_id = (SELECT group_id FROM M_option_group WHERE menu_id=?)"
    cursor = db.execute(sql,(menu_id,)) 
    #menu_idが2桁以上の場合 (menu_id) だと、2件とカウントされしまうので注意
    return cursor.fetchall()
    db.close()
server.register_function(SelectM_option_MENU,'getM_option_MENU')

# T_ORDER への INSERT
def InsertT_ORDER(order_date,user_id,menu_id,payment):
    db = sqlite3.connect(mydb, isolation_level=None)
    sql = u"INSERT INTO T_ORDER (order_date, user_id, menu_id, payment) VALUES (?, ?, ?, ?)"
    db.execute(sql, (order_date,user_id,menu_id,payment))
    db.close()
    return 1
server.register_function(InsertT_ORDER,'T_ORDER-INSERT')

# T_ORDER への INSERT
def InsertT_order_option(order_id,option_id):
    db = sqlite3.connect(mydb, isolation_level=None)
    sql = u"INSERT INTO T_ORDER (order_date, user_id, menu_id, payment) VALUES (?, ?, ?, ?)"
    db.execute(sql, (order_date,user_id,menu_id,payment))
    db.close()
    return 1
server.register_function(InsertT_ORDER,'T_ORDER-INSERT')

# T_ORDER への SELECT ALL
def SelectT_ORDER():
    db = sqlite3.connect(mydb, isolation_level=None)
    sql = u"SELECT order_id,order_date, user_id, bento_id, selected_opt FROM T_ORDER"
    cursor = db.execute(sql)
    # Debug
    # print cursor
    # for row in cursor:
    #     print row
    return cursor.fetchall()
    db.close()
    # return 1
server.register_function(SelectT_ORDER,'T_ORDER-SELECT-ALL')




# Run the server's main loop
server.serve_forever()
