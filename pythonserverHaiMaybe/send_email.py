import smtplib, ssl

port = 465  # For SSL
password = input("Type your password and press enter: ")

# Create a secure SSL context
context = ssl.create_default_context()
sender_email = "co.b.13.alok.mishra@gmail.com"
receiver_email = "alokmishra182003@gmail.com"
message = "This message is from python YAY?"
with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
    server.login("co.b.13.alok.mishra@gmail.com", password)
    server.sendmail(sender_email, receiver_email, message)
    # TODO: Send email here