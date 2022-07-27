import { events } from "bdsx/event";

const version = "v1.0.1";

console.log('[Elevador] Iniciando'.magenta);
// before BDS launching

events.serverOpen.on(()=>{
    require('./elevador')
    console.log('[Elevador] '.magenta + version.green);
});

events.serverClose.on(()=>{
    console.log('[Elevador] cerrando'.magenta);
    // after BDS closed
});
