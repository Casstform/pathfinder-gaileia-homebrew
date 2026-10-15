import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const listeners = new Map(), timers = new Map();
let nextTimer = 0, panel;
class Element {
  constructor(tag = 'a') { this.tag = tag; this.attrs = new Map(); this.children = []; this.hidden = false; this.isConnected = true; this.style = {}; this.events = {}; this.textContent = ''; this.offsetWidth = 620; this.offsetHeight = 400; }
  getAttribute(k) { return this.attrs.get(k) ?? null; }
  setAttribute(k,v) { this.attrs.set(k,String(v)); }
  removeAttribute(k) { this.attrs.delete(k); }
  hasAttribute(k) { return this.attrs.has(k); }
  closest(selector) { if (selector === 'a[href]') return this.tag === 'a' && this.hasAttribute('href') ? this : null; if (selector === '#link-preview') return this.inPanel ? panel : null; return null; }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  addEventListener(k,fn) { this.events[k] = fn; }
  querySelector(k) { return this.parts[k]; }
  matches() { return false; }
  getBoundingClientRect() { return { left: 990, top: 680, bottom: 700 }; }
  focus() { document.activeElement = this; emit('focusin', {target:this}); }
  set innerHTML(value) {
    this.markup = value;
    if (this.tag === 'aside') {
      this.parts = Object.fromEntries(['h2','.link-preview-body','footer span','footer a','button'].map(k=>[k,new Element(k==='footer a'?'a':k)]));
      this.children = Object.values(this.parts); this.children.forEach(n=>n.inPanel=true);
    }
  }
}
const document = {
  body:new Element('body'), activeElement:null,
  createElement(tag) { const node = new Element(tag); if(tag==='aside') panel=node; return node; },
  addEventListener(k,fn) { listeners.set(k,fn); },
  getElementById() { return null; }, querySelectorAll() { return []; }
};
const window = { location:{href:'https://example.test/#catalogue'}, innerWidth:1024, innerHeight:768, addEventListener(k,fn){listeners.set(k,fn);}, GAILEIA_LINK_PREVIEWS:{'https://2e.aonprd.com/Conditions.aspx?ID=88':{title:'Prone',text:'You are off-guard.',sourceUrl:'https://2e.aonprd.com/Conditions.aspx?ID=88'}} };
function emit(type,event={}) { let prevented=false; listeners.get(type)?.({preventDefault(){prevented=true;},...event});return prevented; }
function flush() { const work=[...timers.values()];timers.clear();work.forEach(fn=>fn()); }
const ctx={window,document,Element,URL,console,setTimeout(fn){timers.set(++nextTimer,fn);return nextTimer;},clearTimeout(id){timers.delete(id);}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('assets/js/link-previews.js','utf8'),ctx);
let allowed=false;
const controller=window.GaileiaPreviews.init({getEntry:id=>allowed&&id==='private'?{title:'Private',intro:'Intro',contentHtml:'<p>Rules</p>'}:null});
const link=new Element();link.setAttribute('href','https://2e.aonprd.com/Conditions.aspx?ID=88');link.textContent='prone';
assert.equal(controller.resolve(link).title,'Prone');
assert.equal(window.GaileiaPreviews.normalizeUrl('https://2e.aonprd.com/Conditions.aspx?ID=88#section'),window.GaileiaPreviews.normalizeUrl(link.getAttribute('href')));
const privateLink=new Element();privateLink.setAttribute('href','#entry/private');
assert.equal(controller.resolve(privateLink),null,'restricted entries must not leak through previews');
allowed=true;assert.equal(controller.resolve(privateLink).title,'Private');allowed=false;
const unsupported=new Element();unsupported.setAttribute('href','https://example.org');assert.equal(controller.resolve(unsupported),null);
emit('pointerover',{target:link,pointerType:'mouse'});assert.equal(panel.hidden,true);flush();assert.equal(panel.hidden,false);
assert.equal(link.getAttribute('aria-expanded'),'true');assert.equal(panel.parts['h2'].textContent,'Prone');
assert.ok(parseInt(panel.style.left)>=12&&parseInt(panel.style.left)+panel.offsetWidth<=1012);
assert.ok(parseInt(panel.style.top)>=12&&parseInt(panel.style.top)+panel.offsetHeight<=756);
emit('pointerout',{target:link});panel.events.pointerenter();flush();assert.equal(panel.hidden,false,'pointer can enter and scroll the preview');
panel.events.pointerleave();flush();assert.equal(panel.hidden,true);assert.equal(link.getAttribute('aria-expanded'),null);
link.focus();assert.equal(panel.hidden,false,'keyboard focus opens preview');
assert.equal(emit('keydown',{key:'ArrowDown'}),true);assert.equal(document.activeElement,panel.parts.button);
assert.equal(emit('keydown',{key:'Escape'}),true);assert.equal(panel.hidden,true);assert.equal(document.activeElement,link);
emit('pointerdown',{target:link,pointerType:'touch'});
assert.equal(emit('click',{target:link}),true,'first tap previews');assert.equal(panel.hidden,false);
assert.equal(emit('click',{target:link}),false,'second tap retains navigation');
emit('pointerdown',{target:document.body,pointerType:'touch'});assert.equal(panel.hidden,true,'outside tap dismisses');
link.focus();emit('hashchange');assert.equal(panel.hidden,true,'navigation dismisses previews');
const data=JSON.parse(fs.readFileSync('content/link-previews.json','utf8'));
assert.ok(Object.keys(data.previews).length>=177);
for(const [url,p] of Object.entries(data.previews)) {
 assert.match(url,/^https:\/\/2e\.aon(prd|srd)\.com\//);assert.ok(p.title&&p.text&&p.sourceUrl.startsWith('https://'));
 assert.doesNotMatch(p.text,/<script|<iframe/i);
}
console.log('Link preview tests passed: hover, focus, touch, dismissal, positioning, visibility, and reference data.');
