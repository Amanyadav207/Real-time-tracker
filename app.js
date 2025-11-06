import express from "express"
import http from "http"
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",(socket)=>{
    socket.on("send-location",(locationData)=>{
        io.emit("new-location", {id: socket.id, ...locationData});
    });
    console.log("New User Connected");

    // socket.on("disconnect", () => {
    //     console.log("User Disconnected");
    // });
});

app.get("/",(req,res)=>{
    res.render("index");
})

server.listen(3000,()=>{
    console.log("Server Started...")
});