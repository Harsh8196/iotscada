import paho.mqtt.client as mqtt #import the client1
from threading import Timer
import time
import json
import random
#broker_address="localhost" 
#broker_address="iot.eclipse.org" #use external broker

broker = '104.248.49.155'
port = 1883
PLCstatusTopic = "AakashFashionPLC"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'admin'
password = 'a8dmin@h8arsh'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def pubPLCStatus(msg):
    client = connect_mqtt()
    result = client.publish(PLCstatusTopic,msg,1)
    status = result[0]
    if status == 0:
            print(f"Send `{msg}` to topic `{PLCstatusTopic}`")
    else:
        print(f"Failed to send message to topic {PLCstatusTopic}")
