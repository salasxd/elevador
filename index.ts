import { events } from "bdsx/event";

const version = "v1.1.0";

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
