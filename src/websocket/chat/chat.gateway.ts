import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from "@nestjs/websockets"
  import { Server } from "socket.io"
  
  @WebSocketGateway({
    cors: {
      origin: "*",
    },
  })
  export default class ChatGateway {
    @WebSocketServer()
    server: Server
  
    @SubscribeMessage("hello")
    async hellowWord(@MessageBody() data: number): Promise<string> {
      return "Helloworld" + data
    }
  }
  