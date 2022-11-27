import { app } from "./src/app.js";

const porta = process.env.PORT || 8080

app.listen(porta, console.log(`app rodando em http://localhost:${porta}`))