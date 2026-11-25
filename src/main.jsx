import React,{useMemo,useState}from'react';
import{createRoot}from'react-dom/client';
import{FileUp,ArrowRight,Image,FileText,Archive,Music,Video,Settings,ShieldCheck,Search,Plus,CheckCircle,Trash2,Sun,File,Layers,Lock,Clock,SlidersHorizontal,X}from'lucide-react';
import{PDFDocument,StandardFonts,rgb}from'pdf-lib';
import JSZip from'jszip';
import './styles.css';
const tools=[['Images',Image,'PNG · JPG · WEBP'],['Documents',FileText,'PDF · TXT'],['Archives',Archive,'ZIP'],['Audio',Music,'MP3 · WAV · FLAC'],['Video',Video,'MP4 · MOV · WEBM']];
const imageTypes=['png','jpg','jpeg','webp','bmp'];
const readable=(bytes)=>bytes<1024?bytes+' B':bytes<1048576?(bytes/1024).toFixed(1)+' KB':(bytes/1048576).toFixed(1)+' MB';
const ext=(name)=>name.split('.').pop()?.toLowerCase()||'';
function App(){
 const[files,setFiles]=useState([]),[busy,setBusy]=useState(false),[dark,setDark]=useState(true),[query,setQuery]=useState(''),[format,setFormat]=useState('png'),[quality,setQuality]=useState(86),[width,setWidth]=useState(''),[options,setOptions]=useState(false);
 const filtered=useMemo(()=>files.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())),[files,query]);
 function add(fs){setFiles(old=>[...old,...Array.from(fs).map(file=>({id:crypto.randomUUID(),file,name:file.name,status:'Queued'}))]);}
 function save(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);}
 async function imageConvert(file,base){
  const url=URL.createObjectURL(file),img=new Image();
  try{await new Promise((ok,no)=>{img.onload=ok;img.onerror=()=>no(new Error('Could not decode this image.'));img.src=url;});
   const targetWidth=Math.max(1,Math.min(16000,width?Number(width):img.naturalWidth));if(width&&(!Number.isFinite(targetWidth)||targetWidth<=0))throw new Error('Enter a valid width in pixels.');
   const ratio=targetWidth/img.naturalWidth,canvas=document.createElement('canvas');canvas.width=targetWidth;canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
   if(canvas.width*canvas.height>40000000){const factor=Math.sqrt(40000000/(canvas.width*canvas.height));canvas.width=Math.max(1,Math.floor(canvas.width*factor));canvas.height=Math.max(1,Math.floor(canvas.height*factor));}\n   const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable.');
   if(format==='jpg') {ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);}
   ctx.drawImage(img,0,0,canvas.width,canvas.height);
   if(format==='pdf'){
    const pdf=await PDFDocument.create(),page=pdf.addPage([595.28,841.89]);
    const blob=await new Promise((ok,no)=>canvas.toBlob(b=>b?ok(b):no(new Error('Image export failed.')),'image/png'));
    const embedded=await pdf.embedPng(await blob.arrayBuffer());
    const margin=36,scale=Math.min((page.getWidth()-margin*2)/embedded.width,(page.getHeight()-margin*2)/embedded.height);
    const w=embedded.width*scale,h=embedded.height*scale;
    page.drawImage(embedded,{x:(page.getWidth()-w)/2,y:(page.getHeight()-h)/2,width:w,height:h});
    save(new Blob([await pdf.save()],{type:'application/pdf'}),base+'.pdf');
    return 'Saved PDF · '+canvas.width+'×'+canvas.height;
   }
   const mime={png:'image/png',jpg:'image/jpeg',webp:'image/webp'}[format];
   const blob=await new Promise((ok,no)=>canvas.toBlob(b=>b?ok(b):no(new Error('Export failed.')),mime,quality/100));
   save(blob,base+'.'+format);
   return 'Saved '+format.toUpperCase()+' · '+canvas.width+'×'+canvas.height;
  }finally{URL.revokeObjectURL(url);}
 }
 async function textToPdf(file,base){
  const pdf=await PDFDocument.create(),font=await pdf.embedFont(StandardFonts.Helvetica),fontBold=await pdf.embedFont(StandardFonts.HelveticaBold);
  const lines=(await file.text()).replace(/\t/g,'    ').split(/\r?\n/);let page=pdf.addPage([595.28,841.89]),y=790;
  for(const raw of lines){const line=raw.length>100?raw.match(/.{1,100}/g)||['']: [raw];for(const part of line){if(y<45){page=pdf.addPage([595.28,841.89]);y=790;}page.drawText(part,{x:48,y,size:10,font:fontBold,color:rgb(.13,.14,.16)});y-=15;}}
  save(new Blob([await pdf.save()],{type:'application/pdf'}),base+'.pdf');return 'Saved PDF';
 }
 async function pdfToText(file,base){
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc=await pdfjs.getDocument({data:await file.arrayBuffer(),disableWorker:true}).promise;let output='';
  for(let p=1;p<=doc.numPages;p++){const page=await doc.getPage(p);const content=await page.getTextContent();output+=content.items.map(it=>it.str).join(' ')+'\n\n';}
  if(!output.trim())throw new Error('This PDF has no selectable text. Scanned PDF OCR is not supported yet.');
  save(new Blob([output],{type:'text/plain;charset=utf-8'}),base+'.txt');return 'Extracted '+doc.numPages+' page(s)';
 }
 async function convert(item){const file=item.file,e=ext(file.name),base=file.name.replace(/\.[^.]+$/,'');
  if(imageTypes.includes(e))return imageConvert(file,base);
  if(e==='txt')return textToPdf(file,base);
  if(e==='pdf')return pdfToText(file,base);
  throw new Error('Unsupported format. Supported: PNG/JPG/WebP/BMP, TXT and text-based PDFs.');
 }
 async function run(){if(busy)return;setBusy(true);const queue=files.filter(f=>f.status==='Queued'||f.status==='Ready');for(const item of queue){setFiles(old=>old.map(f=>f.id===item.id?{...f,status:'Converting…'}:f));try{const result=await convert(item);setFiles(old=>old.map(f=>f.id===item.id?{...f,status:result}:f));}catch(error){setFiles(old=>old.map(f=>f.id===item.id?{...f,status:'Failed: '+error.message}:f));}}setBusy(false);}
 async function zip(){if(!files.length)return;const archive=new JSZip();files.forEach(f=>archive.file(f.name,f.file));save(await archive.generateAsync({type:'blob'}),'ConvertHub-Original-Files.zip');}
 const queued=files.filter(f=>f.status==='Queued'||f.status==='Ready').length;
 return <div className={'app '+(dark?'dark':'light')}><aside className="sidebar"><div className="brand"><div className="mark">c</div><div><b>ConvertHub</b><small>BY BINARY STUDIOS</small></div></div><p className="label">WORKSPACE</p><div className="nav active"><Layers size={17}/> All tools <span>{files.length}</span></div>{tools.map(([n,I])=><div className="nav" key={n}><I size={17}/>{n}{n==='Audio'||n==='Video'?<small>PLANNED</small>:null}</div>)}<div className="grow"/><div className="privacy"><ShieldCheck size={19}/><b>Private by design</b><p>Your files stay on this device. Nothing is uploaded.</p><small><Lock size={11}/> LOCAL PROCESSING</small></div><div className="nav" onClick={()=>setDark(!dark)}><Sun size={17}/> Appearance</div><div className="nav"><Settings size={17}/> Settings</div><footer>CONVERTHUB <span>v0.1.0</span></footer></aside><main><header><span>Workspace / <b>All tools</b></span><div className="badge"><i/> Local processing</div></header><div className="content"><section className="hero"><div><small className="eyebrow">SIMPLE. SECURE. SEAMLESS.</small><h1>Every format.<br/><em>One elegant workspace.</em></h1><p>Convert, compress, and organize files with precision.<br/>Private processing. No clutter. Just results.</p><div className="pills"><span><Lock size={13}/> Local processing</span><span><ShieldCheck size={13}/> Privacy-first</span></div></div><div className="hero-graphic"><div className="ring"/><div className="tile one"><FileText/><small>PDF</small></div><div className="tile two"><Image/><small>IMG</small></div><div className="tile three"><Archive/><small>ZIP</small></div><div className="arrow"><ArrowRight/></div></div></section><section><div className="section-head"><div><h2>Conversion tools</h2><p>Choose a workflow to get started</p></div><span className="accent">AVAILABLE NOW</span></div><div className="tool-grid">{tools.map(([n,I,desc])=><div className={'tool-card '+((n==='Audio'||n==='Video')?'planned':'')} key={n}><div className="tool-icon"><I size={20}/></div><div><b>{n}</b><small>{desc}</small></div><ArrowRight className="arr" size={16}/></div>)}</div></section><section className="files"><div className="section-head"><div><h2>Your files</h2><p>{files.length?files.length+' file(s) in this session':'Add files to start converting'}</p></div><div className="actions"><div className="search"><Search size={15}/><input placeholder="Search files" value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="outline" onClick={()=>document.getElementById('picker').click()}><Plus size={15}/> Add files</button><input id="picker" hidden type="file" multiple accept=".png,.jpg,.jpeg,.webp,.bmp,.txt,.pdf" onChange={e=>{add(e.target.files);e.target.value='';}}/></div></div><div className="drop" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();add(e.dataTransfer.files)}} onClick={()=>document.getElementById('picker').click()}><div className="upload"><FileUp/></div><b>Drop files here, or <span>browse</span></b><small>Images · PDF · TXT</small><small className="sub">Files are processed locally on this computer</small></div><div className="conversion-options"><button className="option-toggle" onClick={()=>setOptions(v=>!v)}><SlidersHorizontal size={15}/> Conversion options <span>{options?'Hide':'Show'}</span></button>{options&&<div className="option-controls"><label>Image output<select value={format} onChange={e=>setFormat(e.target.value)}><option value="png">PNG</option><option value="jpg">JPEG</option><option value="webp">WebP</option><option value="pdf">PDF</option></select></label><label>Quality <div className="quality"><input type="range" min="30" max="100" value={quality} onChange={e=>setQuality(Number(e.target.value))}/><span>{quality}%</span></div></label><label>Resize width (px)<input type="number" min="1" placeholder="Original size" value={width} onChange={e=>setWidth(e.target.value)}/></label><p>Image controls apply to image conversions. PDF output places the image on a centered A4 page. JPEG uses a white background for transparency.</p></div>}</div>{files.length>0&&<div className="list">{filtered.map(f=><div className="file" key={f.id}><div className="fileicon"><File/></div><div className="filename"><b>{f.name}</b><small>{readable(f.file.size)}</small></div><span className={'status '+(f.status.startsWith('Failed')?'failed':'')}>{f.status}</span><button className="remove" disabled={busy} onClick={()=>setFiles(a=>a.filter(x=>x.id!==f.id))}><Trash2 size={15}/></button></div>)}</div>}{files.length>0&&<div className="foot-actions"><div><CheckCircle size={15}/> {queued} waiting</div><div className="action-buttons"><button className="outline" disabled={busy} onClick={zip}><Archive size={15}/> ZIP originals</button><button className="outline" disabled={busy} onClick={()=>setFiles([])}><X size={15}/> Clear</button><button className="primary" disabled={busy||!queued} onClick={run}>{busy?'Working…':'Convert queued'} <ArrowRight size={16}/></button></div></div>}</section><div className="bottom"><span><Clock size={14}/> Session files clear when you close the app.</span><span>Built for clarity and control.</span></div></div></main></div>}
createRoot(document.getElementById('root')).render(<App/>);