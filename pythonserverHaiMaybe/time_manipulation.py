from datetime import timezone
import datetime
import time
dt = datetime.datetime.now(timezone.utc)
print(dt)
utc_time = dt.replace(tzinfo=timezone.utc)
utc_timestamp = utc_time.timestamp()
print("UNIX timestamp:",
(time.mktime(dt.timetuple())))
print(utc_timestamp)

