import { SerialPort } from "serialport";

const portPath = "/dev/ttys003";

const port = new SerialPort({
    path: portPath,
  baudRate: 9600,
});

port.on("open", () => {
  console.log("Port is open");
});

port.on("data", (data) => {
  console.log("Received data:", data.toString());
});

setTimeout(() => {
  port.write("Hello from Node.js!");
},2000)