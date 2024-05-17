import{d as e,j as s}from"./index-Bav3vyKX.js";const n=void 0;function a(i){const l={a:"a",code:"code",div:"div",h2:"h2",h3:"h3",p:"p",pre:"pre",span:"span",...e(),...i.components};return s.jsxs(s.Fragment,{children:[s.jsxs(l.h2,{id:"creating-your-first-campaign",children:["Creating Your First Campaign",s.jsx(l.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-your-first-campaign",children:s.jsx(l.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(l.p,{children:[`Campaigns are the main way to collect data on Effect Network.
A campaign is a `,s.jsx("u",{children:"collection of tasks"}),` that need to be completed by workers. Each task is a small piece of work that needs to be done. For example, a task could be to label an image, transcribe a piece of audio, or answer a question.
They are created by the data requester (you) and contain information like the reward for the workers, the template for the tasks, the instructions for the workers etc.`]}),`
`,s.jsxs(l.h3,{id:"creating-a-campaign",children:["Creating a campaign",s.jsx(l.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-a-campaign",children:s.jsx(l.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(l.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(l.code,{children:[s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" { "}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" createCampaign"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"campaign"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateCampaignArgs"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"("}),s.jsx(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"@wharfkit/session"'}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")."}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"TransactResult"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"createCampaign"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"type"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" "}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsxs(l.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"type"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateCampaignArgs"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    client"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    campaign"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignInfo"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" &"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        reward"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        maxTaskTime"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        qualitications"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Quali"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"[];"})]}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    };"})}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(l.span,{className:"twoslash-target",children:"CreateCampaignArgs"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" } "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(l.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsxs(l.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" myNewCampaign"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignInfo"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" &"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    reward"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    maxTaskTime"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    qualitications"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Quali"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"[] "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" undefined"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(l.span,{className:"twoslash-target",children:"myNewCampaign"})]})}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" "}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsxs(l.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"type"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateCampaignArgs"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    client"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Client"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    campaign"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignInfo"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" &"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        reward"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        maxTaskTime"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"        qualitications"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Quali"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"[];"})]}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    };"})}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(l.span,{className:"twoslash-target",children:"CreateCampaignArgs"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"["}),s.jsxs(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"campaign",'"']}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"] "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"="}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"version"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"version"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:["1",".","0"]}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"maxTaskTime"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"maxTaskTime"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"100"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"reward"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"reward"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:["3",".","5"]}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"title"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"title"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"My"," ","First"," ","Campaign",'!"']}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"description"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"description"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"Description"," ","of"," ","the"," ","task"," ","here",'."']}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"instructions"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"instructions"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"Some"," ","instructions"," ","here",'"']}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"template"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"template"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"<',"h1",">","Template"," ","here","</","h1",'>"']}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"input_schema"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"input_schema"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"output_schema"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"output_schema"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"image"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"image"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"category"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"category"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"example_task"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"example_task"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"estimated_time"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"estimated_time"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"10"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"};"})}),`
`,s.jsx(l.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" campaign"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" TransactResult"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"campaign"})]})}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createCampaign"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"campaign"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateCampaignArgs"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"TransactResult"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"createCampaign"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsx(l.div,{className:"twoslash-popup-info-hover",children:s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Client"})]})}),s.jsx(l.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsxs(l.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"campaign"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": CampaignInfo "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"&"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"    reward"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number;"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"    maxTaskTime"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number;"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    qualitications"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" Quali[] "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" undefined"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(l.span,{className:"twoslash-target",children:"campaign"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(l.span,{className:"twoslash-hover",children:[s.jsxs(l.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" myNewCampaign"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CampaignInfo"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" &"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    reward"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    maxTaskTime"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" number"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsxs(l.span,{className:"line",children:[s.jsx(l.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"    qualitications"}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(l.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Quali"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"[] "}),s.jsx(l.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),s.jsx(l.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" undefined"}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(l.span,{className:"line",children:s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(l.span,{className:"twoslash-target",children:"myNewCampaign"})]})}),s.jsx(l.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" });"})]}),`
`,s.jsx(l.span,{className:"line","data-empty-line":!0,children:" "})]})}),`
`,s.jsxs(l.p,{children:["Wooooho! You have created your first campaign. You can now view the campaign on the ",s.jsx(l.a,{href:"https://app.effect.network/campaigns",children:"Effect Network"})," before you start collecting data, you need to add tasks to the campaign. You can do this by following the ",s.jsx(l.a,{href:"/docs/collecting-data/adding-tasks",children:"Adding Tasks"})," guide."]})]})}function c(i={}){const{wrapper:l}={...e(),...i.components};return l?s.jsx(l,{...i,children:s.jsx(a,{...i})}):a(i)}export{c as default,n as frontmatter};