// const pubData = [{
//     tag: '',
//     data: null,
//     client: ''
//   }]
var mqttData = []
const mqtt = require('mqtt')

module.exports = {

    mqttSub() {
        const client = mqtt.connect('mqtt://localhost')
        var state = 'closed'
        client.on('connect', () => {
        // Inform controllers that garage is connected
        client.subscribe('AakashFashion',{qos:0})
        client.subscribe('OmkarFashion',{qos:0})
        client.subscribe('AakashFashionPLC',{qos:0})
        console.log("Connect to Mqtt server")
        })
        // setInterval(() => {
            // client.subscribe('AakashFashion',{qos:0})
            // client.subscribe('OmkarFashion',{qos:0})
            client.on('message', function (topic, message) {
                const Result = message.toString()
                mqttData = JSON.parse(Result);
                if (topic == 'AakashFashionPLC') {
                    console.log(topic)
                    console.log(mqttData)
                }
                // console.log(mqttData)
                // console.log(topic)
                // if (message.toString().indexOf("510") == 0) {
                //     console.log("Simulating device restart...");
                //     client.publish("s/us", "501,c8y_Restart");
                //     console.log("...restarting...");
                //     setTimeout(function() {
                //         client.publish("s/us", "503,c8y_Restart");
                //     }, 1000);
                //     console.log("...done...");
                // }
            });
            // client.unsubscribe('AakashFashion',{qos:0})
            // client.unsubscribe('OmkarFashion',{qos:0})
            console.log("Subscribing Topic")
        // },2000)
        console.log(state)
    },
    
    read () {
        var m_Data = []
        m_Data.slice(0,m_Data.length)
        mqttData.forEach((data) => {
            m_Data.push(data)
        })
        return m_Data
      }

}