import{d as a,j as s}from"./index-CnNrE59P.js";const n={title:"Getting Started",description:"Get started with the SDK in just a few lines of code."};function l(e){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",span:"span",...a(),...e.components};return s.jsxs(s.Fragment,{children:[s.jsxs(i.header,{children:[s.jsxs(i.h1,{id:"getting-started",children:["Getting Started",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getting-started",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),s.jsx(i.div,{role:"doc-subtitle",children:"Get started with the SDK in just a few lines of code."})]}),`
`,s.jsxs(i.h2,{id:"installation",children:["Installation",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installation",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.p,{children:[`Use your favorite package manager to install the SDK.
The sdk is available on `,s.jsx(i.a,{href:"https://www.npmjs.com/package/@effectai/sdk",children:"npm"})]}),`
`,s.jsxs(i.div,{className:"code-group",children:[s.jsx(i.div,{"data-title":"npm",children:s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"npm","data-lang":"bash",children:s.jsx(i.code,{children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"npm"}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" i"}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" @effectai/sdk"})]})})})}),s.jsx(i.div,{"data-title":"bun",children:s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"bun","data-lang":"bash",children:s.jsx(i.code,{children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"bun"}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" i"}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" @effectai/sdk"})]})})})}),s.jsx(i.div,{"data-title":"pnpm",children:s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"pnpm","data-lang":"bash",children:s.jsx(i.code,{children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"pnpm"}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" i"}),s.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" @effectai/sdk"})]})})})})]}),`
`,s.jsxs(i.h2,{id:"quick-start",children:["Quick Start",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#quick-start",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.h3,{id:"1-import-and-instantiate-the-effectai-client",children:["1. Import and Instantiate the EffectAI Client",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-import-and-instantiate-the-effectai-client",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.div,{className:"code-group",children:[s.jsx(i.div,{"data-title":"EOS Testnet",children:s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"EOS Testnet","data-lang":"ts",children:s.jsxs(i.code,{children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" createClient"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" jungle4"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"jungle4"})]})})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"} "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" client"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createClient"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"network"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" jungle4"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"jungle4"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]})]})})}),s.jsx(i.div,{"data-title":"EOS Mainnet",children:s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"EOS Mainnet","data-lang":"ts",children:s.jsxs(i.code,{children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" createClient"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" eos"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"eos"})]})})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"} "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" client"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createClient"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"session"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"options"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateClientArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"createClient"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"network"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"network"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" eos"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Network"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"eos"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]})]})})})]}),`
`,s.jsxs(i.h3,{id:"2-using-the-client",children:["2. Using the client",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-using-the-client",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(i.code,{children:[s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" getCampaigns"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"page"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"limit"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"reverse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"ipfsFetch"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetCampaignsArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">>"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"getCampaigns"})]})})]}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"} "}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(i.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" campaigns"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"campaigns"})]})}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" getCampaigns"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"page"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"limit"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"reverse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"ipfsFetch"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" GetCampaignsArgs"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"GetTableRowsResponse"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"UInt128"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"Campaign"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">>"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"getCampaigns"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(i.span,{className:"twoslash-hover",children:[s.jsx(i.div,{className:"twoslash-popup-info-hover",children:s.jsxs(i.span,{className:"line",children:[s.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Client"})]})}),s.jsx(i.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]})]})}),`
`,s.jsxs(i.h3,{id:"3-authentication",children:["3. Authentication",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-authentication",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(i.p,{children:["Depending on your use case, you might need some sort of authentication with the EOS blockchain. Authentication is done through passing a ",s.jsx(i.a,{href:"https://wharfkit.com/kits/session",children:"Wharfkit Session"}),". Read our guide on how to Authentication depending on your environment."]}),`
`,s.jsxs(i.h2,{id:"whats-next-",children:["What's next ?",s.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#whats-next-",children:s.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(i.p,{children:`Now that we have a basic understanding of how to set up the client, we can move on to more advanced topics, like creating our first data collection campaign.
Read more on the following pages.`})]})}function c(e={}){const{wrapper:i}={...a(),...e.components};return i?s.jsx(i,{...e,children:s.jsx(l,{...e})}):l(e)}export{c as default,n as frontmatter};
