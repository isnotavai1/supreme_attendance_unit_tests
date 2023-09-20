import json
import base64
import os
from fpdf import FPDF
json_file = open("sample.json" , )
pdf = FPDF()
pdf.set_auto_page_break(0)
json_data = json.load(json_file)
cur = 0
os.mkdir("images_stored_temproary")
for i in json_data:
    if(i[:8] == "reserved"):
        continue
    decoded_data=base64.b64decode((json_data[i][0]))
    img_file = open(f'images_stored_temproary/{i}.jpeg', 'wb')
    img_file.write(decoded_data)
    img_file.close()

img_list = [x for x in os.listdir("images_stored_temproary")]
for i in img_list:
    pdf.add_page()
    pdf.set_font('Arial', 'B', 14)
    # pdf.cell(w=40, h=10, f'{i}', border=0, ln=1, align='', fill=False, link='')
    base_nae = i
    new_name = i[:len(i) - 5]
    pdf.cell(0, 0,f'{new_name} resulted in {json_data[new_name][1]}', 0)
    img = "images_stored_temproary/" + i
    pdf.image(img, x = 5, y = 15 , w=200, h=260)

for i in img_list:
    os.remove("images_stored_temproary/" + i)

pdf.output("conv_to_img.pdf",'F')
os.rmdir("images_stored_temproary")
json_file.close()
os.system("python send_pdf_email.py")
print("all clear")