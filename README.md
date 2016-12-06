# Gmail_Notifier
 This project creates a Gmail Notifier with Raspberry Pi.
  When the python code is executed in Raspberry Pi, it prompts the user to input the Gmail ID and the password and access the Gmail account using it. If the login is unsuccessful, the execution is exited with an error message. Now, the code checks the mail with a time lag of 0.01 seconds.  
  
  If a mail is received, the LED and Buzzer blinks and beeps respectively to notify the user. An output of the senders mail ID and the subject of mail is displayed on the monitor. Now the user has a choice to either press the blue button, which displays the content of mail or press the red button which resets the mail. The notification continues till the user has made a decision. 
