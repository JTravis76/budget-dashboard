import{v as s,$ as o,c as l,f as t}from"./index-81412148.js";import{F as n}from"./form-rule-builder-3f0d1b86.js";import{c as a}from"./dialog-aabe9f9e.js";const{div:c,strong:e,button:r}=s.tags,i=async()=>{await o.tag.getRules();let{rules:s,loading:i}=o.tag;return i.val=!1,c({class:"container mt-2"},n(),()=>i.val?c({class:"skeleton-block"}):c({class:"box"},e(()=>0==s.val.length?"No rules found.":""),s.val.map(s=>{var n;const i=Object.keys(s)[0],u=null==(n=Object.values(s)[0])?void 0:n.sort((s,o)=>s.amount<o.amount?1:-1);return c({class:"columns rule-bordered"},c({class:"column"},e(i)),c({class:"column"},u.map(s=>{var n;return c({class:"columns"},c({class:"column"},`$${null==(n=s.amount)?void 0:n.toFixed(2)}`),c({class:"column"},s.tag),c({class:"column"},c({class:"buttons"},r({class:"button is-small is-outlined is-primary",onclick:()=>o.tag.setRule(i,s),title:"Edit"},l()),r({class:"button is-small is-outlined is-danger",onclick:()=>function(s,l){a({title:"Confirmation",type:"yesno",message:"Are you sure you want to remove this tag?"}).then(t=>{t&&o.tag.removeRule(s,l)})}(i,s),title:"Remove"},t()))))})))})))};export{i as RuleBuilder};
