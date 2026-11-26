import mongoose from 'mongoose'; import {env} from './config.js';
export async function connectDb(){if(mongoose.connection.readyState===1)return; await mongoose.connect(env.MONGODB_URI,{serverSelectionTimeoutMS:10000});}
