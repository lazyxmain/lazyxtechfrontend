import {env} from './config.js';

const promptFor=(topic:string)=>'Write an original, accurate, genuinely useful SEO article for LazyXTech about: '+topic+'. Return Markdown with one H1 title, a concise introduction, useful H2 sections, actionable examples, an FAQ with 3 to 5 questions, and a conclusion. Use natural language and related terms; never keyword-stuff, invent statistics, invent citations, or claim rankings are guaranteed. Target Indian business owners when relevant.';

export async function generateArticle(topic:string){
 if(env.GROQ_API_KEY){
  const response=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+env.GROQ_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:env.GROQ_MODEL,messages:[{role:'system',content:'You are an expert SEO content writer. Write helpful, fact-checked content and never fabricate facts or sources.'},{role:'user',content:promptFor(topic)}],temperature:0.65,max_completion_tokens:6000}),signal:AbortSignal.timeout(180000)});
  const result:any=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(result.error?.message||'Groq request failed. Check GROQ_API_KEY, model access and free-tier limits.');
  const raw=result.choices?.[0]?.message?.content;
  const content=(typeof raw==='string'?raw:Array.isArray(raw)?raw.map((part:any)=>part.text||'').join('\\n'):'').trim();
  if(!content)throw new Error('Groq returned an empty article.');
  return {content,provider:'Groq',model:env.GROQ_MODEL};
 }
 const base=env.OLLAMA_BASE_URL.endsWith('/')?env.OLLAMA_BASE_URL.slice(0,-1):env.OLLAMA_BASE_URL;
 const response=await fetch(base+'/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:env.OLLAMA_MODEL,stream:false,prompt:promptFor(topic)}),signal:AbortSignal.timeout(180000)});
 const result:any=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(result.error||'AI is unavailable. Add GROQ_API_KEY in Render, or configure a reachable Ollama server.');
 const content=String(result.response||'').trim();
 if(!content)throw new Error('Ollama returned an empty article.');
 return {content,provider:'Ollama',model:env.OLLAMA_MODEL};
}
