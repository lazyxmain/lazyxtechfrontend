import cron from 'node-cron'; import {connectDb} from './db.js'; import {AutomationSchedule} from './models.js';
await connectDb();
async function job(name:string){console.log('[worker]',name,new Date().toISOString());await AutomationSchedule.updateOne({key:name},{$set:{lastRunAt:new Date()}},{upsert:true});}
cron.schedule('0 2 * * *',()=>job('technical-seo-daily'));cron.schedule('30 2 * * *',()=>job('gsc-daily'));cron.schedule('0 3 * * 1',()=>job('competitor-weekly'));cron.schedule('0 4 */3 * *',()=>job('blog-every-3-days'));
console.log('LazyXTech worker started');
