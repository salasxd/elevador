"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const version = "v1.0.0";
console.log('[Elevador] Iniciando'.magenta);
// before BDS launching
event_1.events.serverOpen.on(() => {
    require('./elevador');
    console.log('[Elevador] '.magenta + version.green);
});
event_1.events.serverClose.on(() => {
    console.log('[Elevador] cerrando'.magenta);
    // after BDS closed
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUVwQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1Qyx1QkFBdUI7QUFFdkIsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3JCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsbUJBQW1CO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDIn0=