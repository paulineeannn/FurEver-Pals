"""
PROGRAM TITLE:
    FurEver Pals - db.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The db.py file is a crucial part of the backend, managing the connection to the MongoDB database. It allows 
    other system components to interact with the database by providing a function to access the database instance.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
    The purpose of db.py is to connect to the MongoDB database and provide a reusable function, get_database(), 
    that allows other parts of the application to access and manage the data. This ensures consistent database 
    access throughout the system.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The program uses the pymongo library to manage database connections. It establishes a connection to a local 
    MongoDB instance using MongoClient and provides the database instance through the get_database() function 
    for other modules to interact with the data.
"""

from pymongo import MongoClient

# MongoDB connection setup
client = MongoClient("mongodb://localhost:27017/")
db = client["fureverpals"]

def get_database():
    # Returns the database instance
    return db