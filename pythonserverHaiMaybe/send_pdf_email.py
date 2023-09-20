import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import json
json_file = open("sample.json" , )
json_data = json.load(json_file)
title = "Number of present and absent students go here"
body = f'''time : {json_data["reserved_start_time"]} \ndate : {json_data["reserved_start_date"]}'''
receiver = json_data["reserved_teach_email"] #'alokmishra182003@gmail.com'
json_file.close()
json_file = open("keys.json" ,)
json_data = json.load(json_file)
sender = json_data["sender_email"]
password = json_data["email_pass"]
json_file.close()

#Setup the MIME
message = MIMEMultipart()
message['From'] = sender
message['To'] = receiver
message['Subject'] = title

message.attach(MIMEText(body, 'plain')) #Can add stats about attendance here

pdfname = 'conv_to_img.pdf'

# open the file in bynary
binary_pdf = open(pdfname, 'rb')

payload = MIMEBase('application', 'octate-stream', Name=pdfname)
# payload = MIMEBase('application', 'pdf', Name=pdfname)
payload.set_payload((binary_pdf).read())

# enconding the binary into base64
encoders.encode_base64(payload)

# add header with pdf name
payload.add_header('Content-Decomposition', 'attachment', filename=pdfname)
message.attach(payload)

#use gmail with port
session = smtplib.SMTP('smtp.gmail.com', 587)

#enable security
session.starttls()

#login with mail_id and password
session.login(sender, password)

text = message.as_string()
session.sendmail(sender, receiver, text)
session.quit()
print('Mail Sent')