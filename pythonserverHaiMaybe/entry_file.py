# import pymongo
# import pprint
import datetime
import json

from pymongo import MongoClient
import threading
import os
from datetime import timezone
from deepface import DeepFace
json_file = open("keys.json" ,)
json_data = json.load(json_file)
client = MongoClient(json_data["DB_CONNECTION"])
json_file.close()
db = client.test
classinstances = db.classinstances
students = db.students

def setInterval(func,time):
    e = threading.Event()
    while not e.wait(time):
        store = func()
        if store:
            break

def keepReading():
    print("reading now..." , )
    resp_dict = classinstances.find_one()
    if(resp_dict == None):
        return True
    cur_time = datetime.datetime.now(timezone.utc).replace(tzinfo= timezone.utc).timestamp()
    date_time = datetime.datetime(resp_dict["createdAt"].date().year, resp_dict["createdAt"].date().month, resp_dict["createdAt"].date().day, resp_dict["createdAt"].time().hour, resp_dict["createdAt"].time().minute, resp_dict["createdAt"].time().second,0 , tzinfo= timezone.utc)
    then_time = date_time.replace(tzinfo=timezone.utc).timestamp()
    print(cur_time , then_time)
    print(cur_time - then_time)
    if (cur_time - then_time <= 400):
        return
    cur_dict = {}
    cur_dict["reserved_start_time"] = str(resp_dict["createdAt"].time().hour) + ':' + str(resp_dict["createdAt"].time().minute)
    cur_dict["reserved_start_date"] = str(resp_dict["createdAt"].date())
    cur_dict["reserved_teach_email"] = "alokmishra182003@gmail.com"
    for i in resp_dict["student_data"]:
        stud = students.find_one({"student_id": i["student_id"]})
        try:
            result = DeepFace.verify("data:image/," + i["image"], "data:image/," + stud["default_img"] , model_name="Facenet")
            cur_dict[i["student_id"]] = [i["image"], int(result["verified"])]
        except Exception as e:
            print("error occured at : ", i["student_id"])
            cur_dict[i["student_id"]] = [i["image"] , "C.N.B.D"]
    with open("sample.json", "w") as outfile:
        json.dump(cur_dict, outfile)
    os.system('python convert_json_to_img_pdf.py')
    classinstances.delete_one({"teacher_id" : resp_dict["teacher_id"]})
    return False

keepReading()
setInterval(keepReading , 600)
