import {env} from './config.js';

const promptFor=(topic:string)=>'Write an original, accurate, genuinely useful SEO article for LazyXTech about: '+topic+'. Return Markdown with one H1 title, a concise introduction, useful H2 sections, actionable examples, an FAQ with 3 to 5 questions, and a conclusion. Use natural language and related terms; never keyword-stuff, invent statistics, invent citations, or claim rankings are guaranteed. Target Indian business owners when relevant.';

export async function generateArticle(topic:string){
 if(env.GEMINI_API_KEY){
  const model=encodeURIComponent(env.GEMINI_MODEL);
  const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+encodeURIComponent(env.GEMINI_API_KEY),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:promptFor(topic)}]}],generationConfig:{temperature:0.65,maxOutputTokens:6000}}),signal:AbortSignal.timeout(180000)});
  const result:any=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(result.error?.message||'Gemini request failed. Check GEMINI_API_KEY and free-tier quota.');
  const text=(result.candidates?.[0]?.content?.parts||[]).map((part:any)=>part.text||'').join('\n').trim();
  if(!text)throw new Error('Gemini returned an empty article.');
  return {content:text,provider:'Gemini',model:env.GEMINI_MODEL};
 }
 const base=env.OLLAMA_BASE_URL.endsWith('/')?env.OLLAMA_BASE_URL.slice(0,-1):env.OLLAMA_BASE_URL;
 const response=await fetch(base+'/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:env.OLLAMA_MODEL,stream:false,prompt:promptFor(topic)}),signal:AbortSignal.timeout(180000)});
 const result:any=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(result.error||'AI is unavailable. Add a free Gemini API key or configure a reachable Ollama server.');
 const content=String(result.response||'').trim();
 if(!content)throw new Error('Ollama returned an empty article.');
 return {content,provider:'Ollama',model:env.OLLAMA_MODEL};
}
