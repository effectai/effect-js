import{d as r,j as s}from"./index-BGVEre8Q.js";const a={title:"getCampaigns",description:"undefined"};function e(l){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...l.components};return s.jsxs(s.Fragment,{children:[s.jsx(i.header,{children:s.jsxs(i.h1,{id:"getcampaigns",children:["getCampaigns",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getcampaigns",children:s.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsxs(i.h2,{id:"description",children:["Description",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.p,{children:"This function retrieves campaigns from a specified client with optional parameters for pagination, sorting, and IPFS fetching."}),`
`,s.jsxs(i.h2,{id:"usage",children:["Usage",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(i.code,{children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" { "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" createClient"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" getCampaigns"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"page"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"limit"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"reverse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"ipfsFetch"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetCampaignsArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">>"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"getCampaigns"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsxs(i.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" jungle4"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"export"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" jungle4"})]})]}),s.jsx(i.span,{className:"twoslash-target",children:"jungle4"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"as"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" network"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"network"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" } "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" client"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createClient"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"network"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" campaigns"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"campaigns"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" getCampaigns"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"page"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"limit"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"reverse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"ipfsFetch"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetCampaignsArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">>"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"getCampaigns"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"var"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" console"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Console"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"console"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"."}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsxs(i.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"Console."}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:"log"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"("}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"..."}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"data: any[]): "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"void"})]}),s.jsx(i.div,{className:"twoslash-popup-jsdoc",children:s.jsx(i.p,{children:s.jsx(i.a,{href:"https://developer.mozilla.org/docs/Web/API/console/log_static",children:"MDN Reference"})})})]}),s.jsx(i.span,{className:"twoslash-target",children:"log"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"("}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" campaigns"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"campaigns"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:");"})]})]})}),`
`,s.jsxs(i.h2,{id:"output",children:["Output",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#output",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(i.code,{children:[s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"{"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" rows"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": ["})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"   {"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     id"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"0"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     reservations_done"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"2"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     total_submissions"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"2"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     total_tasks"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"6"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     active_batch"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"0"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     num_batches"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"2"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     owner"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": [ "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"name"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"efxefxefxefx"'}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     paused"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"0"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     content"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": ["}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"Object"}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" ..."}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     max_task_time"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"3600"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     reward"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": ["}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"Object"}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" ..."}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     qualis"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": [],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"     info"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": ["}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"Object"}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" ..."}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"],"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"   }, { "}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"*/"}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" ..."}),s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" /* }, { */"}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" ..."}),s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" /* }"})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" ],"})}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" next_key: UInt128 { */"}),s.jsx(i.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" ..."}),s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" /*  },"})]}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" more: true,"})}),`
`,s.jsx(i.span,{className:"line",children:s.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"}"})})]})}),`
`,s.jsxs(i.h2,{id:"parameters",children:["Parameters",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.h3,{id:"client",children:["client",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#client",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"SomeClient"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," The client used to retrieve campaigns."]}),`
`]}),`
`,s.jsxs(i.h3,{id:"page",children:["page",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#page",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"number"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," The page number of the campaigns to retrieve. Default is 1."]}),`
`]}),`
`,s.jsxs(i.h3,{id:"limit",children:["limit",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#limit",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"number"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," The maximum number of campaigns to retrieve per page. Default is 20."]}),`
`]}),`
`,s.jsxs(i.h3,{id:"reverse",children:["reverse",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reverse",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"boolean"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," Whether to reverse the order of the retrieved campaigns. Default is false."]}),`
`]}),`
`,s.jsxs(i.h3,{id:"ipfsfetch",children:["ipfsFetch",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ipfsfetch",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"})," ",s.jsx(i.code,{children:"boolean"})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," Whether to fetch additional information from IPFS for each campaign. Default is true."]}),`
`]}),`
`,s.jsxs(i.h2,{id:"returns",children:["Returns",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Type:"}),"  ",s.jsx(i.a,{href:"/docs/glossary/types#campaign",children:s.jsx(i.code,{children:"Promise<GetTableRowsResponse<UInt128, Campaign>>"})})]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"Description:"})," A list of campaigns."]}),`
`,s.jsxs(i.li,{children:[`
`,s.jsx(i.strong,{children:"Properties:"}),`
`,s.jsxs(i.ul,{children:[`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"rows:"})," An array of campaigns with the following structure:",`
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
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"info:"})," Additional information retrieved from IPFS if enabled."]}),`
`]}),`
`]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"next_key:"})," A string that can be used to fetch the next page of campaigns."]}),`
`,s.jsxs(i.li,{children:[s.jsx(i.strong,{children:"more:"})," A boolean indicating if there are more campaigns to fetch."]}),`
`]}),`
`]}),`
`]})]})}function c(l={}){const{wrapper:i}={...r(),...l.components};return i?s.jsx(i,{...l,children:s.jsx(e,{...l})}):e(l)}export{c as default,a as frontmatter};