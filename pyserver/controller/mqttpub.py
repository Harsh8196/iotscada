import paho.mqtt.client as mqtt #import the client1
from controller.modbusServer import Modbusserver as ModbusServer
from threading import Timer
import time
import json
import random
broker_address="localhost" 
receivedMessages = 0
#broker_address="iot.eclipse.org" #use external broker


"""class MqttPublish:

    

    def __init__(self):
        #hfkhkjf
        print(self)
        self.client = mqtt.Client("P1") #create new instance
        self.client.connect(broker_address,1883) #connect to broker
        self.client.on_publish = self.on_publish

    def publish(self,topic, message, waitForAck = False):
        mid = self.client.publish(topic, message)
        if (waitForAck):
            while mid not in receivedMessages:
                time.sleep(0.25)

    def on_publish(self,client, userdata, mid):
        receivedMessages = mid
        print(receivedMessages)

    def RunInterval(self):

        
        ModbusData = ModbusServer()
        Helper = ModbusData.Read()
        result = json.dumps(Helper) 
        #print(result)
        self.client.publish("AakashFashion",result)#publish
        self.client.publish("OmkarFashion",result)#publish

        Timer(3,self.RunInterval).start()"""

broker = '104.248.49.155'
port = 1883
topic = "AakashFashion"
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


def publish(client):
    msg_count = 0
    while True:
        time.sleep(2)
        #msg = f"messages: {msg_count}"
        ModbusData = ModbusServer()
        Helper = ModbusData.Read()
        msg = json.dumps(Helper) 
        #print(result)
        result = client.publish(topic, msg,1)
        # client.publish("OmkarFashion", msg,1)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1

"""def pubPLCStatus(msg):
    client = connect_mqtt()
    result = client.publish(PLCstatusTopic,msg)
    status = result[0]
    if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")"""




def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()