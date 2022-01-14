from sender import Mail, Message

mail = Mail(
     "smtp.gmail.com",
      port = 465,
      username = "qminh2918@gmail.com", 
      password = "Qminh1229", 
      use_tls = False, 
      use_ssl = True,
      debug_level = False
)

msg = Message("msg subject")
msg.fromaddr = ("Dam Quang Minh", "qminh2918@gmail.com") 
msg.to = "qmin123443@gmail.com"
msg.body = "this is a msg plain text body"
msg.html = "<b>this is a msg text body</b>"
msg.reply_to = "qminh2918@gmail.com"
msg.charset = "utf-8"
msg.extra_headers = {}
msg.mail_options = []
msg.rcpt_options = []

# Send message
mail.send(msg)