var s=Object.defineProperty,t=(t,e,a)=>(((t,e,a)=>{e in t?s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a})(t,"symbol"!=typeof e?e+"":e,a),a);import{v as e,S as a,$ as o,T as n,a as l,b as c,c as i}from"./index-a13a690f.js";import{e as r}from"./event-emitter-eaaf34fa.js";class d{constructor(s){t(this,"page"),t(this,"pagesize"),t(this,"total"),this.page=1,this.pagesize=25,this.total=1,s&&Object.assign(this,s)}}const{div:u,label:p,input:m,button:b,small:g,form:f,select:h,option:y}=e.tags,{tags:v}=o.site,w=e.state(!1);let k=new a;let x=h({class:"input",onchange:s=>k.tag=s.target.value},y({value:""},""));e.derive(()=>{let s=new Array;s=v.val.map(s=>y({value:s},s)),e.add(x,s)});const z=()=>u({class:"box"},f(u({class:"is-pulled-right"},b({type:"button",onclick:()=>w.val=!w.val},g("Advance search"))),u({class:"is-clearfix"}),u({class:"columns"},u({class:"column"},u({class:"field"},p({class:"field"},"Search"),u({class:"control"},m({class:"input",type:"text",placeholder:"Search..",oninput:s=>k.search=s.target.value})))),u({class:"column"},u({class:"field"},p({class:"field"},"Tags"),u({class:"control"},x)))),u({class:()=>w.val?"columns":"is-hidden"},u({class:"column"},p({class:"field"},"Date From"),m({class:"input",type:"date",onblur:s=>k.date.start=s.target.value})),u({class:"column"},p({class:"field"},"Date To"),m({class:"input",type:"date",onblur:s=>k.date.end=s.target.value})),u({class:"column"},p({class:"field"},"Amount"),m({class:"input",type:"number",placeholder:"start",oninput:s=>k.amount.start=s.target.value})),u({class:"column"},p({class:"field"},"Amount"),m({class:"input",type:"number",placeholder:"end",oninput:s=>k.amount.end=s.target.value}))),u({class:"buttons"},b({class:"button is-primary",type:"button",onclick:()=>r.emit("search",k)},"Apply"),b({class:"button is-secondary",type:"reset",onclick:()=>{k=new a}},"Reset")))),_={open(s){const t=document.getElementById(s);t&&t.classList.add("is-active")},close(s){const t=document.getElementById(s);t&&t.classList.remove("is-active")},toggle(s){const t=document.getElementById(s);t&&t.classList.toggle("is-active")}},{div:A,header:T,p:S,section:M,footer:O,button:N}=e.tags,j=(s,t)=>{const e=()=>_.close(s.id);return A({id:s.id,class:"modal"},A({class:"modal-background"}),A({class:"modal-card"},T({class:"modal-card-head"},S({class:"modal-card-title"},s.title),N({class:"delete",ariaLabel:"close",onclick:e})),M({class:"modal-card-body"},t),()=>s.footer?O({class:"modal-card-foot"},A({class:"buttons"},N({class:"button is-success",onclick:()=>r.emit("action")},"Save"),N({class:"button",onclick:e},"Cancel"))):A()))},{div:C,label:D,input:E,select:I,option:F}=e.tags,{transaction:L}=o.transaction,{tags:P}=o.site;r.subscribe("action",function(){o.transaction.saveTransaction().then(()=>{_.close("TransactionModal"),L.val=new n})});let Y=I({class:"input",onchange:s=>L.val.tag=s.target.value},F({value:""},""));e.derive(()=>{let s=new Array;s=P.val.map(s=>F({value:s,selected:()=>L.val.tag===s},s)),e.add(Y,s)});const{div:$,input:K,label:R,span:U,strong:V}=e.tags;function q(s){s.preventDefault(),s.stopPropagation(),document.getElementsByClassName("dropzone")[0].classList.remove("is-dragover")}function B(s){const t=new FileReader;t.addEventListener("load",s=>{const t=s.target.result;if(t&&"string"==typeof t){let s=0,e=new Array;const a=new Array;t.split("\r\n").forEach(t=>{if(0===s)e=t.split(",");else{const s=t.replaceAll('"',"").split(",");let o=0;const l={};for(const t of e)l[t]=s[o],o+=1;let c=new n(l);c.dttm&&c.name&&a.push(c)}s+=1}),o.transaction.saveTransactions(a).then(s=>{200===s&&(document.getElementsByClassName("dropzone")[0].classList.remove("is-uploading"),document.getElementsByClassName("dropzone")[0].classList.add("is-success"),window.setTimeout(()=>window.location.reload(),1e3))})}}),t.readAsText(s)}const G=()=>$({class:()=>window.FileReader?"dropzone has-advanced-upload":"dropzone",style:"text-align: center;",ondragover:s=>{s.preventDefault(),s.stopPropagation(),document.getElementsByClassName("dropzone")[0].classList.add("is-dragover")},ondrop:s=>function(s){s.preventDefault(),document.getElementsByClassName("dropzone")[0].classList.remove("is-dragover"),document.getElementsByClassName("dropzone")[0].classList.add("is-uploading"),s.dataTransfer&&s.dataTransfer.items?[...s.dataTransfer.items].forEach(s=>{if("file"===s.kind){const t=s.getAsFile();t&&B(t)}}):s.dataTransfer&&s.dataTransfer.files&&[...s.dataTransfer.files].forEach(s=>{B(s)})}(s),ondragend:s=>q(s),ondragleave:s=>q(s)},$({class:"dropzone__input"},l({class:"dropzone__icon"}),K({type:"file",name:"files[]",id:"file",class:"dropzone__file",multiple:"",onchange:()=>function(){const s=document.getElementById("file");s&&s.files&&[...s.files].forEach(s=>{"text/csv"==s.type&&B(s)})}()}),R({for:"file"},V("Choose a file"),U({class:"dropzone__dragndrop"}," or drag it here"),".")),$({class:"dropzone__uploading"},"Uploading..."),$({class:"dropzone__success"},"Done!"),$({class:"dropzone__error"},"Error")),{div:H,a:J}=e.tags,{dialog:Q,button:W,div:X,p:Z}=e.tags;const{div:ss,table:ts,thead:es,tbody:as,tfoot:os,tr:ns,th:ls,td:cs,button:is,input:rs,select:ds,option:us,span:ps}=e.tags,{tags:ms}=o.site,{transaction:bs}=o.transaction;let gs=e.state(0),fs=e.state(0),hs=e.state(0);function ys(s){s>0&&async function(s){let t={message:"Place your confirmation message here",backdrop:!0,title:"Confirmation ?",type:"ok"};return"string"==typeof s?t.message=s:t=Object.assign(t,s),new Promise(s=>{const a=Q(X({class:"is-size-5 has-text-weight-bold",style:"border-bottom: 1px solid lightgray;"},t.title),Z({class:"m-2"},t.message),"ok"==t.type?X({class:"is-pulled-right"},W({type:"button",class:"button is-small is-default",onclick:()=>{a.close("OK"),s("OK"==a.returnValue),a.remove()}},"Ok")):X({class:"buttons is-pulled-right"},W({type:"button",class:"button is-small is-primary",onclick:()=>{a.close("YES"),s("YES"==a.returnValue),a.remove()}},"Yes"),W({type:"button",class:"button is-small is-default",onclick:()=>{a.close("NO"),s("NO"==a.returnValue),a.remove()}},"No"))),o=document.getElementById("app");o&&(e.add(o,a),t.backdrop?a.showModal():a.show())})}({title:"Confirm",message:"Are you sure you want to remove this transaction?",type:"yesno"}).then(t=>{t&&o.transaction.removeTransaction(s).then(()=>{window.location.reload()})})}function vs(){o.transaction.saveTransaction().then(()=>{gs.val=0})}const ws=s=>{hs.val=0;const t=new Array;return s.transactions.forEach(s=>{hs.val=hs.val+parseFloat(s.amount.toString()),t.push(ns(cs(ss({class:"buttons"},is({class:"button is-primary is-small is-outlined",onclick:()=>async function(s){bs.val=new n,s>0&&await o.transaction.getTransactionById(s),_.open("TransactionModal")}(s.id)},c({width:"16",height:"16"})),is({class:"button is-danger is-small is-outlined",onclick:()=>ys(s.id)},i({width:"16",height:"16"})))),cs(ss({class:"text-nowrap"},s.dttm)),cs(s.transaction),cs(ss({style:"max-width:350px",class:"text-ellipsis",title:s.name},s.name)),cs(()=>gs.val!=s.id?is({class:"button is-small",onclick:()=>{bs.val=s,gs.val=s.id}},s.memo):rs({type:"text",class:"input",value:()=>s.memo,oninput:t=>{s.memo=t.target.value,bs.val.memo=s.memo},onblur:()=>vs(),onkeyup:s=>{s.key.includes("Enter")&&vs()}})),cs(s.amount),cs(()=>fs.val!=s.id?is({class:"button is-small",onclick:()=>{bs.val=s,fs.val=s.id}},s.tag):ds({class:"input",onblur:()=>fs.val=0,onchange:t=>{s.tag=t.target.value,bs.val.tag=s.tag,o.transaction.saveTransaction().then(()=>{fs.val=0})}},us({value:""},""),ms.val.map(t=>us({value:t,selected:s.tag===t},t))))))}),ss({class:"columns"},ss({class:"column"},ts({class:"table is-striped is-narrow is-fullwidth is-hoverable"},es(ns(ls(is({class:"button is-secondary is-small",onclick:()=>_.open("ImportModal")},"Import")),ls("Date"),ls("Transaction"),ls("Name"),ls("Memo"),ls("Amount"),ls("Tag"))),()=>0===s.transactions.length?as(ns(cs({colSpan:7},"No records found."))):as(t),os(ns(cs({colSpan:5},""),cs({colSpan:2},ps({class:"has-text-weight-bold"},"$",Math.abs(hs.val).toFixed(2))))))),j({id:"TransactionModal",title:"Transaction Properties",footer:!0},C(C(D("Date"),E({type:"text",class:"input",disabled:!0,value:()=>L.val.dttm})),C(D("Transaction"),E({type:"text",class:"input",disabled:!0,value:()=>L.val.transaction})),C(D("Name"),E({type:"text",class:"input",disabled:!0,value:()=>L.val.name})),C(D("Memo"),E({type:"text",class:"input",placeholder:"Enter memo.",value:()=>L.val.memo,oninput:s=>L.val.memo=s.target.value})),C(D("Amount"),E({type:"text",class:"input",disabled:!0,value:()=>L.val.amount})),C(D("Tag"),Y))),j({id:"ImportModal",title:"Import Transactions"},H(J({href:"./template.csv",traget:"_blank",class:"button is-small mb-4"},"CSV template"),G())))},{div:ks,nav:xs,ul:zs,li:_s,span:As,a:Ts,select:Ss,option:Ms}=e.tags;let Os=new a;const Ns=s=>{const t=new d(s);let a=e.state(new Array);let o=e.state(1),n=e.state(t.total);if(n.val>3){let s=Math.ceil(1.5)-1,e=t.page-s,a=t.page+s;e<2?(a=3,e=1):a>t.total-2&&(a=t.total,e=t.total-3+1),o.val=e,n.val=a}a.val=[],o.val>2?(a.val.push(1),a.val.push(0)):o.val>1&&a.val.push(1);for(let e=o.val;e<=n.val;e++)a.val.push(e);return n.val<t.total&&(a.val.push(0),a.val.push(t.total)),ks({class:"mb-4"},ks({class:"is-pulled-right"},Ss({class:"input",title:"page size",onchange:s=>{Os.page=1,Os.pagesize=parseInt(s.target.value,10),r.emit("page",Os)}},[25,50,100].map(t=>Ms({selected:(null==s?void 0:s.pagesize)==t},t)))),xs({class:"pagination is-small is-rounded",role:"navigation",ariaLabel:"pagination"},zs({class:"pagination-list"},a.val.map(s=>_s(s?Ts({href:"#",ariaLabel:`goto page ${s}`,class:()=>s===t.page?"pagination-link is-current":"pagination-link",onclick:t=>{t.preventDefault(),Os.page=s,r.emit("page",Os)}},s):As({class:"pagination-ellipsis"},"…"))))))},{div:js}=e.tags;let Cs=e.state(!1),Ds=e.state({filter:new a,data:new Array});function Es(s,t=0){switch(t){case 0:Ds.val.filter=s;break;case 1:Ds.val.filter.page=s.page,Ds.val.filter.pagesize=s.pagesize}Cs.val=!0,o.transaction.getTransactions(Ds.val.filter).then(s=>{Ds.val=s,Cs.val=!1})}r.subscribe("search",s=>Es(s)),r.subscribe("page",s=>Es(s,1));const Is=async()=>(Ds.val=await o.transaction.getTransactions(),js({class:"container mt-2"},z(),()=>Cs.val?js({class:"skeleton-block"}):js(Ns({page:Ds.val.filter.page,pagesize:Ds.val.filter.pagesize,total:Ds.val.filter.pagecount}),ws({transactions:Ds.val.data}),Ns({page:Ds.val.filter.page,pagesize:Ds.val.filter.pagesize,total:Ds.val.filter.pagecount}))));export{Is as Transactions};