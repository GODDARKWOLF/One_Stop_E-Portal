from pymongo import MongoClient

#connecting to the connection
client = MongoClient('mongodb://localhost:27017/')

#citizen database
database = client['portal']
user_collection = database['users']
service_collection = database['services']

#police database
police_database = client['police']
officer_collection = police_database['officers']
crime_collection = police_database['crimes']
criminal_record = police_database['criminal_Record']

#zra database
zra_database = client['ZRA']
employee_collection = zra_database['employees']
revenue_collection = zra_database['revenues']
citizen_tax_collection = zra_database['citizen_taxes']
alert_collection = zra_database['alerts']


# counter = database.counter.insert_one({"_id": "userid", "seq": 0})


