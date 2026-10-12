const {chromium}=require('C:/Users/Cat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await p.addInitScript(()=>{document.documentElement.requestFullscreen=undefined});
for(const id of ['normal-and-mirror','identify','3d-modeling']){
 await p.goto('http://127.0.0.1:5180/course-visual-audit.html?id=foundation-mirrored-parts-'+id+'&lang=en');await p.waitForTimeout(1700);
 await p.screenshot({path:'tmp/f28-'+id+'.png',fullPage:true});
 for(const width of [1440,390]){await p.setViewportSize({width,height:1000});if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(id+' overflow '+width)}
 await p.setViewportSize({width:1440,height:1000});
 if(id==='3d-modeling'){for(const n of [0,1,2,3]){const btn=p.locator('.foundation-interface-icon-button').nth(n);await btn.click();await p.waitForTimeout(1200);await p.screenshot({path:'tmp/f28-preview-'+n+'.png'});await p.keyboard.press('Escape')}}
 console.log(id+' desktop/mobile checked');
}process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
