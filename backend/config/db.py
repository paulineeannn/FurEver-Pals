from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["fureverpals"]

def get_database():
    return db
