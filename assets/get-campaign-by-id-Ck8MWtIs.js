import{d as e,j as s}from"./index-Bav3vyKX.js";const a={title:"getCampaignById",description:"undefined"};function n(l){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...e(),...l.components};return s.jsxs(s.Fragment,{children:[s.jsx(i.header,{children:s.jsxs(i.h1,{id:"getcampaignbyid",children:["getCampaignById",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getcampaignbyid",children:s.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(i.h2,{id:"description",children:["Description",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.p,{children:"This function retrieves a campaign from a specified client with the given ID."}),`
`,s.jsxs(i.h2,{id:"usage",children:["Usage",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(i.code,{children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:["	","type"]}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsxs(i.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"type"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Campaign"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    id"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    reservations_done"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    total_submissions"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    total_tasks"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    active_batch"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    num_batches"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    owner"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" VariantAddressName"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    paused"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" boolean"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    content"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Content"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    max_task_time"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    reward"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        quantity"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" string"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        contract"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" string"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    };"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    qualis"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Quali"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"[];"})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(i.span,{className:"twoslash-target",children:"Campaign"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:["	","type"]}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsxs(i.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"type"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignWithInfo"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Campaign"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" &"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    info"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignInfo"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" |"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" undefined"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(i.span,{className:"twoslash-target",children:"CampaignWithInfo"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" createClient"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" getCampaignById"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"id"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" getCampaignByIdArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"CampaignWithInfo"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"getCampaignById"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsxs(i.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" jungle4"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"export"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" jungle4"})]})]}),s.jsx(i.span,{className:"twoslash-target",children:"jungle4"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"as"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" network"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"network"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"} "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" client"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createClient"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"network"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" campaign"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignWithInfo"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"campaign"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" getCampaignById"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"id"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" getCampaignByIdArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"CampaignWithInfo"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"getCampaignById"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"id"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": any"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"id"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]}),`
`,s.jsx(i.span,{className:"line","data-empty-line":!0,children:" "})]})}),`
`,s.jsxs(i.h2,{id:"output",children:["Output",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#output",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(i.code,{children:[s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"{"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  id"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  reservations_done"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  total_submissions"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"2"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  total_tasks"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  active_batch"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  num_batches"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  owner"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": [ "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"name"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"efxefxefxefx"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  paused"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"0"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  content"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    field_0"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"0"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    field_1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"QmVKwq3bYM6cPW6kstpiq4WYckWRtdfJnzAmms2iMyGqQg"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  },"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  max_task_time"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"3600"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  reward"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    quantity"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"0.0100 EFX"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    contract"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"efxtoken1112"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  },"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  qualis"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": [],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"  info"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    version"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1.1"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    title"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"Labelstudio OCR (LAION)"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    description"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"You are contributing to a dataset for conversational style chatbots."'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    instructions"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"Instructions here..."'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    template"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"<h2>Template here...</h2>"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    input_schema"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    output_schema"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    image"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    category"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    example_task"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"    estimated_time"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  },"})}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]})}),`
`,s.jsxs(i.h2,{id:"parameters",children:["Parameters",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.h3,{id:"client",children:["client",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#client",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"SomeClient"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," The client used to retrieve campaigns."]}),`
`]}),`
`,s.jsxs(i.h3,{id:"id",children:["id",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#id",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"number"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," The campaign id number of the campaign to retrieve."]}),`
`]}),`
`,s.jsxs(i.h2,{id:"returns",children:["Returns",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.p,{children:[s.jsx(i.strong,{children:"Type:"}),"  ",s.jsx(i.a,{href:"/docs/glossary/types#campaign",children:s.jsx(i.code,{children:"Promise<Campaign>"})})]}),`
`,s.jsxs(i.p,{children:[s.jsx(i.strong,{children:"Description:"})," A list of campaigns."]}),`
`,s.jsx(i.strong,{children:"Properties:"}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"id:"})," Campaign ID."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"reservations_done:"})," Number of reservations done for the campaign."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"total_submissions:"})," Total number of submissions for the campaign."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"total_tasks:"})," Total number of tasks in the campaign."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"active_batch:"})," Active batch number."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"num_batches:"})," Total number of batches."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"owner:"})," Owner of the campaign."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"paused:"})," Indicator if the campaign is paused."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"content:"})," Campaign content."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"max_task_time:"})," Maximum task time in seconds."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"reward:"})," Reward information."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"qualis:"})," Qualification information."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"info:"})," Additional information retrieved from IPFS."]}),`
`]})]})}function c(l={}){const{wrapper:i}={...e(),...l.components};return i?s.jsx(i,{...l,children:s.jsx(n,{...l})}):n(l)}export{c as default,a as frontmatter};