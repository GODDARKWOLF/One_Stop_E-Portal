from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
database = client['portal']

user_collection = database['users']
service_collection = database['services']


