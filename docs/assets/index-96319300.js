var t=Object.defineProperty,e=(e,n,s)=>(((e,n,s)=>{n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[n]=s})(e,"symbol"!=typeof n?n+"":n,s),s);!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)}).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();let n,s,a,i,r,o,l=Object.getPrototypeOf,c={isConnected:1},u={},d=l(c),h=l(l),w=(t,e,n,s)=>(t??(setTimeout(n,s),new Set)).add(e),f=(t,e,n)=>{let s=a;a=e;try{return t(n)}catch(i){return console.error(i),n}finally{a=s}},p=t=>t.filter(t=>{var e;return null==(e=t.t)?void 0:e.isConnected}),m=t=>r=w(r,t,()=>{for(let t of r)t.i=p(t.i),t.o=p(t.o);r=o},1e3),v={get val(){var t;return null==(t=null==a?void 0:a.l)||t.add(this),this.rawVal},get oldVal(){var t;return null==(t=null==a?void 0:a.l)||t.add(this),this.u},set val(t){var e;null==(e=null==a?void 0:a.h)||e.add(this),t!==this.rawVal&&(this.rawVal=t,this.i.length+this.o.length?(null==s||s.add(this),n=w(n,this,j)):this.u=t)}},g=t=>({__proto__:v,rawVal:t,u:t,i:[],o:[]}),b=(t,e)=>{let n={l:new Set,h:new Set},s={f:t},a=i;i=[];let r=f(t,n,e);r=(r??document).nodeType?r:new Text(r);for(let i of n.l)n.h.has(i)||(m(i),i.i.push(s));for(let o of i)o.t=r;return i=a,s.t=r},y=(t,e=g(),n)=>{let s={l:new Set,h:new Set},a={f:t,s:e};a.t=n??(null==i?void 0:i.push(a))??c,e.val=f(t,s,e.rawVal);for(let i of s.l)s.h.has(i)||(m(i),i.o.push(a));return e},T=(t,...e)=>{for(let n of e.flat(1/0)){let e=l(n??0),s=e===v?b(()=>n.val):e===h?b(n):n;s!=o&&t.append(s)}return t},S=(t,e,...n)=>{var s;let[a,...i]=l(n[0]??0)===d?n:[{},...n],r=t?document.createElementNS(t,e):document.createElement(e);for(let[c,d]of Object.entries(a)){let t=e=>e?Object.getOwnPropertyDescriptor(e,c)??t(l(e)):o,n=e+","+c,a=u[n]??(u[n]=(null==(s=t(l(r)))?void 0:s.set)??0),i=c.startsWith("on")?(t,e)=>{let n=c.slice(2);r.removeEventListener(n,e),r.addEventListener(n,t)}:a?a.bind(r):r.setAttribute.bind(r,c),w=l(d??0);c.startsWith("on")||w===h&&(d=y(d),w=v),w===v?b(()=>(i(d.val,d.u),r)):i(d)}return T(r,i)},O=t=>({get:(e,n)=>S.bind(o,t,n)}),_=(t,e)=>e?e!==t&&t.replaceWith(e):t.remove(),j=()=>{let t=0,e=[...n].filter(t=>t.rawVal!==t.u);do{s=new Set;for(let t of new Set(e.flatMap(t=>t.o=p(t.o))))y(t.f,t.s,t.t),t.t=o}while(++t<100&&(e=[...s]).length);let a=[...n].filter(t=>t.rawVal!==t.u);n=o;for(let n of new Set(a.flatMap(t=>t.i=p(t.i))))_(n.t,b(n.f,n.t)),n.t=o;for(let n of a)n.u=n.rawVal};const D={tags:new Proxy(t=>new Proxy(S,O(t)),O()),hydrate:(t,e)=>_(t,b(e,t)),add:T,state:g,derive:y},L={},A=function(t,e,n){if(!e||0===e.length)return t();const s=document.getElementsByTagName("link");return Promise.all(e.map(t=>{if((t=function(t){return"/budget-dashboard/"+t}(t))in L)return;L[t]=!0;const e=t.endsWith(".css"),a=e?'[rel="stylesheet"]':"";if(!!n)for(let n=s.length-1;n>=0;n--){const a=s[n];if(a.href===t&&(!e||"stylesheet"===a.rel))return}else if(document.querySelector(`link[href="${t}"]${a}`))return;const i=document.createElement("link");return i.rel=e?"stylesheet":"modulepreload",e||(i.as="script",i.crossOrigin=""),i.href=t,document.head.appendChild(i),e?new Promise((e,n)=>{i.addEventListener("load",e),i.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${t}`)))}):void 0})).then(()=>t()).catch(t=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t})},E=({value:t,Loading:e,Error:n},s)=>{const a=D.state({status:"pending"});return t.then(t=>a.val={status:"fulfilled",value:t}).catch(t=>a.val={status:"rejected",value:t}),()=>"pending"===a.val.status?(null==e?void 0:e())??"":"rejected"===a.val.status?null==n?void 0:n(a.val.value):s(a.val.value)},{div:P}=D.tags,k=()=>P({class:"loading-bg"},P({class:"loading-container"},P({class:"loader"}))),B=[{id:1,dttm:"11/1/2024",transaction:"DEBIT",name:"DEBIT PURCHASE -VISA KROGER #0001    111-555-1234AA",memo:null,amount:-99.91,tag:null},{id:2,dttm:"11/4/2024",transaction:"DEBIT",name:"DEBIT PURCHASE -VISA WENDY #1111     740-555-5555OH",memo:null,amount:-29.32,tag:null}],R=["Banking:Cash","Banking:Fees","Bills:Cable","Bills:Cell Phone","Bills:Credit Card","Bills:Electric","Bills:Garbage","Bills:Gas","Bills:Insurance","Bills:Loan","Bills:Medical","Bills:Water","Income:Paycheck","Service","Service:Bottle Water","Service:Software","Service:Streaming","Shopping","Shopping:Auto","Shopping:Clothing","Shopping:Dining","Shopping:Fuel","Shopping:Grocery","Shopping:Health/Body","Shopping:Pet Care","Shopping:Unknown","Transfer","Transfer:Saving"];class x{constructor(t){e(this,"id"),e(this,"dttm"),e(this,"transaction"),e(this,"name"),e(this,"memo"),e(this,"amount"),e(this,"tag"),this.id=0,this.dttm=null,this.transaction="CREDIT",this.name="",this.memo=null,this.amount=0,this.tag=null,t&&Object.assign(this,t)}}class I{constructor(t){e(this,"start"),e(this,"end"),this.start=null,this.end=null,t&&Object.assign(this,t)}}class C{constructor(t){e(this,"search"),e(this,"tag"),e(this,"date"),e(this,"amount"),e(this,"page"),e(this,"pagesize"),e(this,"pagecount"),this.search=null,this.tag=null,this.date=new I,this.amount=new I,this.page=1,this.pagesize=25,this.pagecount=1,t&&Object.assign(this,t)}}class M{constructor(t){e(this,"title"),e(this,"active"),e(this,"collapse"),e(this,"data"),this.title="",this.active=!1,this.collapse=!0,this.data="",t&&Object.assign(this,t)}}class ${constructor(t){e(this,"text"),e(this,"value"),e(this,"selected"),this.text="",this.value="",this.selected=!1,t&&Object.assign(this,t)}}const V="db";function U(t=new Array){window.localStorage.setItem(V,JSON.stringify(t))}function H(t){var e;const n=(null==(e=q().sort((t,e)=>t.id>e.id?1:-1).pop())?void 0:e.id)??0;t.id=n+1;const s=q();s.push(t),U(s)}function z(t){let e=q();e.forEach(e=>{e.id===t.id&&Object.assign(e,t)}),U(e)}function q(){let t=JSON.parse(window.localStorage.getItem(V)??"[]");return t.length>0&&(t=t.sort((t,e)=>new Date(t.dttm??"")<new Date(e.dttm??"")?1:-1)),t}const F={initDB:async function(){return new Promise(t=>{window.localStorage.getItem(V)||U(B),t(200)})},getAll:q,getBy:function(t){return q().find(e=>e.id===t)??new x},getFiltered:function(t=new C){const e=q();let n=e;if(t.search){let s=t.search.toUpperCase();n=e.filter(t=>{var e;return null==(e=t.name)?void 0:e.toUpperCase().includes(s)})}if(t.tag){let e=t.tag;n=n.filter(t=>t.tag==e)}let s=new Date(t.date.start??""),a=new Date(t.date.end??"");if(t.date.start&&t.date.end&&(n=n.filter(t=>new Date(t.dttm)>=s&&new Date(t.dttm)<=a)),!t.date.start&&t.date.end&&(n=n.filter(t=>new Date(t.dttm)<=a)),t.date.start&&!t.date.end&&(n=n.filter(t=>new Date(t.dttm)>=s)),t.amount.start&&t.amount.end){let e=-1*parseFloat(t.amount.start),s=-1*parseFloat(t.amount.end);n=n.filter(t=>t.amount<=e&&t.amount>=s)}if(!t.amount.start&&t.amount.end){let e=-1*parseFloat(t.amount.end);n=n.filter(t=>t.amount>=e)}if(t.amount.start&&!t.amount.end){let e=-1*parseFloat(t.amount.start);n=n.filter(t=>t.amount<=e)}t.pagecount=Math.ceil(n.length/t.pagesize);let i=new Array,r=(t.page-1)*t.pagesize,o=n.length>t.pagesize?r+t.pagesize:n.length;for(let l=r;l<o;l++)n[l]&&i.push(n[l]);return n=i,{filter:t,data:n}},create:H,update:z,deleteBy:function(t){const e=q();for(let n=0;n<e.length;n+=1)if(e[n].id===t){e.splice(n,1);break}U(e)},deleteAll:function(){return window.localStorage.setItem(V,"[]"),200},saveOrUpdate:function(t){return t.forEach(t=>{0===t.id?H(t):t.id>0&&z(t)}),200},updateMemoTag:function(t,e,n){let s=new x({id:t,memo:e,tag:n});return t>0&&q().forEach(a=>{a.id===t&&(a.memo=e,a.tag=n,z(a),s=a)}),s}};const N=new class{constructor(){e(this,"_requestConfig"),e(this,"_success"),e(this,"_failure"),e(this,"defaults",{baseUrl:"/",headers:{common:{}}}),e(this,"interceptors",{request:{use:t=>{t&&(this.v=t)}},response:{use:(t,e)=>{t&&(this.T=t),e&&(this.S=e)}}}),this.v=()=>{},this.T=()=>{},this.S=()=>{}}async get(t,e){let n=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"GET"});return e&&(e.method&&delete e.method,n=Object.assign(n,e)),this.sendAsync(t,void 0,n)}async delete(t,e){let n=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"DELETE"});return e&&(e.method&&delete e.method,n=Object.assign(n,e)),this.sendAsync(t,void 0,n)}async head(t,e){let n=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"HEAD"});return e&&(e.method&&delete e.method,n=Object.assign(n,e)),this.sendAsync(t,void 0,n)}async options(t,e){let n=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"OPTIONS"});return e&&(e.method&&delete e.method,n=Object.assign(n,e)),this.sendAsync(t,void 0,n)}async post(t,e,n){let s=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"POST"});return n&&(n.method&&delete n.method,s=Object.assign(s,n)),this.sendAsync(t,e,s)}async put(t,e,n){let s=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"PUT"});return n&&(n.method&&delete n.method,s=Object.assign(s,n)),this.sendAsync(t,e,s)}async patch(t,e,n){let s=await this.v({url:t,baseURL:this.defaults.baseUrl,method:"PATCH"});return n&&(n.method&&delete n.method,s=Object.assign(s,n)),this.sendAsync(t,e,s)}paramsSerializer(t){const e=new Array;return Object.entries(t).forEach(t=>{const n=t[0],s=t[1];s&&e.push(`${encodeURIComponent(n)}=${s}`)}),e.length>0?`?${e.join("&")}`:""}async sendAsync(t,e,n){const s={};if(Object.entries(this.defaults.headers.common).forEach(t=>{s[t[0]]=t[1]}),n.params&&(t+=this.paramsSerializer(n.params)),t.startsWith("http")||(t=`${this.defaults.baseUrl}${t}`),e instanceof FormData){if(n.body=e,n.headers){const t=new Headers(n.headers);t.delete("content-type"),n.headers=t}}else e&&"object"==typeof e&&(n.body=JSON.stringify(e));return new Promise((e,a)=>{fetch(t,{headers:s,...n}).then(async t=>{var e,n;if(t.ok)return this.T({response:{status:t.status}}),(null==(e=t.headers.get("content-type"))?void 0:e.includes("application/octet-stream"))?await t.blob():(null==(n=t.headers.get("content-type"))?void 0:n.includes("application/json"))?await t.json():await t.text();switch(this.S(t),t.status){case 400:a("Validation error");break;case 401:a("401 (Unathorized)");break;case 500:a("Server error");break;default:console.error(t)}}).then(t=>e(t))})}};function J(t,e){return new Promise(n=>window.setTimeout(()=>n(e),t))}function G(t,e){return t.reduce((t,n)=>{const s=n[e];return t[s]||(t[s]=[]),t[s].push(n),t},{})}function W(t,e){let n=0;return t.forEach(t=>{"string"==typeof t[e]?n+=parseFloat(t[e]):n+=t[e]}),n}const K=800,Y=N;Y.defaults.baseUrl="https://localhost:7182",Y.interceptors.request.use(t=>(t.headers={Accept:"application/json, */*","Content-Type":"application/json"},t.mode="cors",t.credentials="include",t));const Q={getById:t=>J(K,F.getBy(t)),post:(t,e,n)=>J(K,F.updateMemoTag(t,e,n)),delete:t=>J(K,F.deleteBy(t))},X={get:t=>J(K,F.getFiltered(t)),post:t=>J(K,F.saveOrUpdate(t)),getAll:()=>J(K,F.getAll()),deleteAll:()=>J(K,F.deleteAll())},Z={get:()=>J(K,R)};function tt(t){let e=new Date(t);return{long:`${e.getFullYear()}-${["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()+1]}`,short:`${e.getFullYear()}-${e.getMonth()+1}`}}function et(t,e){const n=new Date(t),s=new Date(e);return 12*(s.getFullYear()-n.getFullYear())+(s.getMonth()-n.getMonth())}function nt(t,e){let n=new Array,s=function(t){let e=new Date(t);return{m:e.getMonth()+1,d:e.getDate(),y:e.getFullYear()}}(t);for(let a=0;a<=et(t,e);a++){let t=s.m+a,e=s.y;t>48?(t-=48,e+=4):t>36?(t-=36,e+=3):t>24?(t-=24,e+=2):t>12&&(t-=12,e+=1);const{long:i,short:r}=tt(`${t}/1/${e}`);n.push({text:i,value:r,selected:!1})}return n}const st={site:{pageloading:D.state(!1),tags:D.state(new Array),preloadData:async function(){return Promise.all([F.initDB(),st.tag.getTags(),st.tag.getRules()])}},transaction:(()=>{let t=D.state(new x);return{transaction:t,getTransactions:async function(t){return await X.get(t)},getTransactionById:async function(e){return new Promise(async n=>{const s=await Q.getById(e);t.val=new x(s),n(!0)})},saveTransaction:async function(){const{id:e,memo:n,tag:s}=t.val;return await Q.post(e,n,s)},saveTransactions:async function(t){return await X.post(t)},removeTransaction:async function(e){return new Promise(async n=>{await Q.delete(e),t.val=new x,n(!0)})},resetTansactions:async function(){return await X.deleteAll()}}})(),user:(()=>{let t=D.state(!1);return{authenticated:t,login:async function(t,e){let n=window.btoa(`${t}:${e}`);return new Promise(t=>{if("Og=="===n){let t=new Date,e=t.getMinutes()+15;t.setMinutes(e),document.cookie=`expires=${new Date(t).toUTCString()};`}t(200)})},signout:async function(){return new Promise(t=>{document.cookie="expires=0;",t(200)})},getUser:async function(){return new Promise(e=>{let n=document.cookie.split("=");t.val=new Date<=new Date(n[1]),e(200)})}}})(),dashboard:(()=>{let t=D.state(new Array),e=D.state(new Array);return{slicedTransactions:e,transactions:t,getSlicers:async function(){return new Promise(e=>{let n=new Array;n.push(new M({title:"Name",data:""}));let s=new Array;if(t.val.length>0){let e=t.val[0].dttm??"";s=nt(t.val[t.rawVal.length-1].dttm??"",e)}n.push(new M({title:"Date",data:s})),n.push(new M({title:"Tag",data:R.map(t=>new $({text:t,value:t,selected:!1}))})),e(n)})},getAllTransactions:async function(){return new Promise(async e=>{t.val=await X.getAll(),e(200)})},setSlicedTransactions:function(n){let s=t.val;n.filter(t=>t.active).forEach(t=>{if("string"==typeof t.data&&"Name"===t.title){let e=t.data.toUpperCase();s=s.filter(t=>t.name.toUpperCase().includes(e))}else if(Array.isArray(t.data)){if("Date"===t.title){let e=new Array,n=new Array;t.data.filter(t=>t.selected).forEach(t=>{let s=t.value.split("-");n.push(parseInt(s[0],10)),e.push(parseInt(s[1],10))}),n=[...new Set(n)],s=s.filter(t=>{let s=new Date(t.dttm??"");return e.includes(s.getMonth()+1)&&n.includes(s.getFullYear())})}if("Tag"===t.title){let e=new Array;t.data.filter(t=>t.selected).forEach(t=>{e.push(t.value)}),s=s.filter(t=>e.includes(t.tag??"do-not-add"))}}}),e.val=s}}})(),tag:(()=>{let t=D.state(!0),e=D.state(new Array),n=D.state([]),s=D.state({});function a(){s.val={}}return{loading:t,tags:e,rules:n,rule:s,getTags:async function(){return e.val=new Array,new Promise(async t=>{e.val=await Z.get(),t(200)})},getRules:async function(){return n.val=[],new Promise(async t=>{n.val.push({"Gas Station":[{amount:0,tag:"Shopping"},{amount:50,tag:"Shopping:Fuel"}]}),n.val.push({Wendy:[{amount:0,tag:"Shopping:Dining"}]}),t(200)})},setRule:function(t,e){a(),s.val[t]=e},removeRule:function(e,s){t.val=!0,window.setTimeout(()=>{a();for(let t=0;t<n.val.length;t++){let a=n.val[t],i=Object.keys(a)[0],r=Object.values(a)[0];if(i===e){r.forEach((e,a)=>{e.amount==s.amount&&e.tag==s.tag&&r.splice(a,1),0===r.length&&n.val.splice(t,1)});break}}t.val=!1},1e3)},resetRule:a,addRule:async function(e,s){return t.val=!0,new Promise(i=>{window.setTimeout(()=>{let r={};r[e]=[s],n.val.push(r),a(),t.val=!1,i(200)},1e3)})},generateTag:function(t){let e="";for(let s=0;s<n.val.length;s++){const a=n.val[s];let i=Object.keys(a)[0];if(t.name.toUpperCase().includes(i.toUpperCase())&&(Object.values(a)[0].sort((t,e)=>t.amount<e.amount?1:-1).forEach(n=>{""===e&&Math.abs(t.amount)>n.amount&&(e=n.tag)}),""!==e))break}return e}}})()},{div:at,img:it}=D.tags,{svg:rt,path:ot,g:lt}=D.tags("http://www.w3.org/2000/svg"),ct=t=>rt({class:(null==t?void 0:t.class)??"",xmlns:"http://www.w3.org/2000/svg",width:(null==t?void 0:t.width)??"50",height:(null==t?void 0:t.height)??"43",viewBox:"0 0 50 43"},ot({d:"M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"})),ut=t=>rt({class:(null==t?void 0:t.class)??"",xmlns:"http://www.w3.org/2000/svg",width:(null==t?void 0:t.width)??"24",height:(null==t?void 0:t.height)??"24",viewBox:"0 0 24 24"},lt({fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeEidth:"2"},ot({d:"M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"}),ot({d:"M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"}))),dt=t=>rt({class:(null==t?void 0:t.class)??"",xmlns:"http://www.w3.org/2000/svg",width:(null==t?void 0:t.width)??"24",height:(null==t?void 0:t.height)??"24",viewBox:"0 0 24 24"},ot({fill:"currentColor",d:"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"})),ht=t=>rt({class:(null==t?void 0:t.class)??"",xmlns:"http://www.w3.org/2000/svg",width:(null==t?void 0:t.width)??"24",height:(null==t?void 0:t.height)??"24",viewBox:"0 0 24 24"},ot({fill:"currentColor",fillRule:"evenodd",d:"M13.083 19.063c-.444.444-.843.843-1.21 1.187H21a.75.75 0 0 1 0 1.5H9q-.028 0-.055-.002c-.703-.027-1.3-.331-1.886-.778c-.588-.448-1.244-1.104-2.046-1.907l-.076-.076c-.803-.802-1.459-1.458-1.907-2.046c-.468-.614-.78-1.24-.78-1.989c0-.748.312-1.375.78-1.989c.448-.587 1.104-1.243 1.907-2.046l5.98-5.98c.803-.803 1.459-1.459 2.046-1.907c.614-.468 1.24-.78 1.99-.78c.748 0 1.374.312 1.988.78c.588.448 1.244 1.104 2.046 1.907l.076.076c.803.802 1.459 1.458 1.907 2.046c.468.614.78 1.24.78 1.989c0 .748-.312 1.375-.78 1.989c-.448.587-1.104 1.243-1.907 2.046zM11.94 6.035c.85-.85 1.435-1.433 1.933-1.812c.48-.367.79-.473 1.08-.473c.288 0 .598.106 1.079.473c.497.38 1.083.962 1.933 1.812s1.433 1.436 1.813 1.933c.366.481.472.79.472 1.08c0 .289-.106.599-.473 1.079c-.38.498-.962 1.083-1.812 1.933l-4.194 4.193l-6.024-6.024zM9.048 20.25c.289 0 .599-.106 1.079-.473c.498-.38 1.083-.962 1.933-1.812l.65-.651l-6.024-6.025l-.65.65c-.85.85-1.434 1.436-1.813 1.934c-.367.48-.473.79-.473 1.08c0 .288.106.598.473 1.079c.38.497.962 1.083 1.812 1.933s1.436 1.433 1.933 1.813c.481.366.79.472 1.08.472",clipRule:"evenodd"})),{button:wt,div:ft,form:pt,input:mt,label:vt,section:gt,span:bt}=D.tags,yt=t=>{let e=D.state(""),n=D.state("");return gt({class:"hero"},ft({class:"hero-body"},ft({class:"container"},ft({class:"columns is-centered"},ft({class:"column is-5-tablet is-4-desktop is-3-widescreen"},pt({action:"",class:"box"},ft({class:"field"},vt({for:"",class:"label"},"Email"),ft({class:"control has-icons-left"},mt({type:"email",placeholder:"e.g. bobsmith@gmail.com",class:"input",required:"",oninput:t=>e.val=t.target.value}),bt({class:"icon is-small is-left"},rt({class:(null==s?void 0:s.class)??"",xmlns:"http://www.w3.org/2000/svg",width:(null==s?void 0:s.width)??"24",height:(null==s?void 0:s.height)??"24",viewBox:"0 0 24 24"},ot({fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"m2.357 7.714l6.98 4.654c.963.641 1.444.962 1.964 1.087c.46.11.939.11 1.398 0c.52-.125 1.001-.446 1.964-1.087l6.98-4.654M7.157 19.5h9.686c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311c-.642-.327-1.482-.327-3.162-.327H7.157c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v5.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327"}))))),ft({class:"field"},vt({for:"",class:"label"},"Password"),ft({class:"control has-icons-left"},mt({type:"password",placeholder:"*******",class:"input",required:"",oninput:t=>n.val=t.target.value}),bt({class:"icon is-small is-left"},(t=>rt({class:(null==t?void 0:t.class)??"",xmlns:"http://www.w3.org/2000/svg",width:(null==t?void 0:t.width)??"24",height:(null==t?void 0:t.height)??"24",viewBox:"0 0 24 24"},ot({fill:"currentColor",d:"M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"})))()))),ft({class:"field"},wt({type:"button",class:"button is-success",onclick:()=>{st.user.login(e.val,n.val).then(e=>{200==e&&(window.location.href=t?`./#${t}`:"./")})}},"Login"))))))));var s},{div:Tt,h1:St,a:Ot}=D.tags,_t=[{path:"*",component:Tt({class:"container mt-2"},Tt({class:"box mt-2"},St({class:"is-size-3"},"Oops! We broke a link"),"Take me ",Ot({href:"./"},"home,")," country road.")),meta:{}},{path:"/",component:at(it({src:"./splash.jpg"})),meta:{}},{path:"/login",component:yt(),meta:{}},{path:"/dashboard",component:A(()=>import("./dashboard-e59a78fd.js"),["assets/dashboard-e59a78fd.js","assets/event-emitter-eaaf34fa.js"]),meta:{auth:!0}},{path:"/transactions",component:A(()=>import("./transactions-ac7b57d8.js"),["assets/transactions-ac7b57d8.js","assets/event-emitter-eaaf34fa.js","assets/dialog-0bade356.js"]),meta:{auth:!0}},{path:"/rulebuilder",component:A(()=>import("./rule-builder-1b779507.js"),["assets/rule-builder-1b779507.js","assets/dialog-0bade356.js"]),meta:{auth:!0}},{path:"/settings",component:A(()=>import("./settings-03b2cb71.js"),["assets/settings-03b2cb71.js","assets/dialog-0bade356.js"]),meta:{auth:!0}},{path:"/about",component:A(()=>import("./about-b9f264a6.js"),[]),meta:{}}];window.addEventListener("popstate",()=>{window.location.reload()});const{header:jt,nav:Dt,div:Lt,a:At,span:Et,hr:Pt,strong:kt}=D.tags,{footer:Bt,div:Rt,p:xt,a:It}=D.tags,{aside:Ct}=D.tags,{div:Mt,main:$t}=D.tags;let Vt=document.getElementById("app")??document.body;D.add(Vt,(st.user.getUser(),E({value:st.site.preloadData(),Loading:()=>k(),Error:()=>"Error"},()=>Mt((()=>{let t=D.state(!1);return jt({class:""},Dt({class:"navbar",role:"navigation",ariaLabel:"main navigation"},Lt({class:"navbar-brand"},At({class:"navbar-item is-selected",href:"./"},"Budget Dashboard"),At({role:"button",class:()=>t.val?"navbar-burger is-active":"navbar-burger",ariaLabel:"menu",onclick:()=>t.val=!t.val},Et({ariaHidden:!0}),Et({ariaHidden:!0}),Et({ariaHidden:!0}),Et({ariaHidden:!0}))),Lt({class:()=>t.val?"navbar-menu is-active":"navbar-menu"},Lt({class:"navbar-start"},()=>st.user.authenticated.val?At({class:"navbar-item",href:"./#/dashboard"},"Dashboard"):"",()=>st.user.authenticated.val?At({class:"navbar-item",href:"./#/transactions"},"Transactions"):"",Lt({class:"navbar-item has-dropdown is-hoverable"},At({class:"navbar-link"},"More"),Lt({class:"navbar-dropdown"},()=>st.user.authenticated.val?At({class:"navbar-item",href:"./#/rulebuilder"},"Rule Builder"):"",()=>st.user.authenticated.val?At({class:"navbar-item",href:"./#/settings"},"Settings"):"",At({class:"navbar-item",href:"./#/about"},"About"),Pt({class:"navbar-divider"}),At({class:"navbar-item",href:"./#/issue"},"Report an issue"))))),Lt({class:"navbar-end"},Lt({class:"navbar-item"},()=>"#/login"!==window.location.hash?Lt({class:"buttons"},()=>st.user.authenticated.val?At({class:"button is-outline-light",href:"#",onclick:t=>{t.preventDefault(),st.user.signout().then(()=>{window.location.href="./"})}},kt("Sign Out")):At({class:"button is-light",href:"./#/login"},kt("Log in"))):""))))})(),$t((()=>{var t;const{hash:e}=window.location,n=e.length>1?_t.find(({path:t})=>t.match(`${e.replace("#","")}`)):_t.find(({path:t})=>t.match("/"));return n?n.meta.auth&&!st.user.authenticated.val?yt(n.path):n.component instanceof Promise?E({value:new Promise(t=>{n.component.then(e=>{if(0===Object.entries(e).length)t(e);else{let n=Object.values(e)[0]();t(n)}})}),Loading:()=>k(),Error:()=>"ERROR"},t=>t):n.component:null==(t=_t.find(({path:t})=>"*"===t))?void 0:t.component})(),Mt({style:"height:180px;"})),Ct({class:"sidebar-left"}),Bt({class:"footer"},Rt({class:"content has-text-centered"},xt("Built with love using ",It({href:"https://bulma.io",target:"_blank"},"Bulma")," ,",It({href:"https://vanjs.org",target:"_blank"},"VanJS")," and ",It({href:"https://typescriptlang.org",target:"_blank"},"TypeScript"))))))));export{st as $,ht as I,C as S,x as T,ct as a,ut as b,dt as c,G as g,W as s,D as v};