import {z} from 'zod';
const schema=z.object({NODE_ENV:z.enum(['development','test','production']).default('development'),PORT:z.coerce.number().default(4000),MONGODB_URI:z.string().min(1),JWT_SECRET:z.string().min(32),CORS_ORIGIN:z.string().url(),ALLOWED_EMAIL:z.string().email().default('lazyxcustomer@gmail.com'),SITE_URL:z.string().url(),OLLAMA_BASE_URL:z.string().url().default('http://localhost:11434'),OLLAMA_MODEL:z.string().default('qwen2.5:7b')});
export const env=schema.parse(process.env);
