import{d as i,j as s}from"./index-BGVEre8Q.js";const n=void 0;function e(l){const a={a:"a",code:"code",div:"div",h2:"h2",h3:"h3",p:"p",pre:"pre",span:"span",...i(),...l.components};return s.jsxs(s.Fragment,{children:[s.jsxs(a.h2,{id:"creating-your-first-campaign",children:["Creating Your First Campaign",s.jsx(a.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-your-first-campaign",children:s.jsx(a.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(a.p,{children:[`Campaigns are the main way to collect data on Effect Network.
A campaign is a `,s.jsx("u",{children:"collection of tasks"}),` that need to be completed by workers. Each task is a small piece of work that needs to be done. For example, a task could be to label an image, transcribe a piece of audio, or answer a question.
They are created by the data requester (you) and contain information like the reward for the workers, the template for the tasks, the instructions for the workers etc.`]}),`
`,s.jsxs(a.h3,{id:"creating-a-campaign",children:["Creating a campaign",s.jsx(a.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-a-campaign",children:s.jsx(a.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(a.pre,{className:"shiki shiki-themes github-light github-dark-dimmed twoslash lsp",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:s.jsxs(a.code,{children:[s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" { "}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" createCampaign"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ({ "}),s.jsx(a.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(a.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"campaign"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateCampaignArgs"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:") "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"=>"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"("}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"@wharfkit/session"'}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")."}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"TransactResult"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"createCampaign"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" } "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsxs(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:[' "@',"effectai","/","sdk",'"']}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(a.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" campaign"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" TransactResult"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"campaign"})]})}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsxs(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:[" ","await"]}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" "}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"function"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createCampaign"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({ "}),s.jsx(a.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(a.span,{style:{color:"#E36209","--shiki-dark":"#F69D50"},children:"campaign"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", }"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" CreateCampaignArgs"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:")"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:":"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:" Promise"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"TransactResult"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"createCampaign"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({"})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"client"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": Client"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"client"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsxs(a.div,{className:"twoslash-popup-info-hover",children:[s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"campaign"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": CampaignInfo "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"&"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" {"})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"    reward"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number;"})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"    maxTaskTime"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number;"})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    qualifications"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"?:"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" Quali[] "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" undefined"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:";"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]}),s.jsx(a.span,{className:"twoslash-target",children:"campaign"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": {"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Name"," ","of"," ","your"," ","campaign"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"title"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"title"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"My"," ","First"," ","Campaign",'!"']}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Description"," ","of"," ","the"," ","campaign"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"description"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"description"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"Description"," ","of"," ","the"," ","task"," ","here",'."']}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Campaign"," ","version"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"version"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"version"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:["1",".","0"]}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Maximum"," ","time"," ","to"," ","complete"," ","a"," ","task"," ","in"," ","seconds"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"maxTaskTime"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"maxTaskTime"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"100"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","EFX"," ","reward"," ","per"," ","task"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"reward"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"reward"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:["3",".","5"]}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Custom"," ","instructions"," ","for"," ","completing"," ","tasks"," ","in"," ","this"," ","campaign"," (","Markdown"," ","supported",")"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"instructions"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"instructions"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"',"Some"," ","instructions"," ","here",'"']}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Template"," ","of"," ","the"," ","campaign"," ","see"," ","https","://","docs",".","effect",".","ai","/","docs","/","templates","/","introduction"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"template"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"template"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsxs(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:['"<',"h1",">","Template"," ","here","</","h1",'>"']}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Input"," ","schema"," ","to"," ","validate"," ","the"," ","task"," ","data","."]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"input_schema"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" null"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"input_schema"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","TODO","::"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"output_schema"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" null"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"output_schema"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"null"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Image"," ","URL"," ","for"," ","the"," ","campaign"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"image"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"image"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","Category"," ","of"," ","the"," ","campaign"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"category"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"category"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","TODO","::"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"example_task"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": string"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"example_task"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsxs(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:["		// ","TODO",":: ","Estimated"," ","time"," ","to"," ","complete"," ","a"," ","task"," ","in"," ","this"," ","campaign"]})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"		"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:s.jsxs(a.span,{className:"twoslash-hover",children:[s.jsx(a.div,{className:"twoslash-popup-info-hover",children:s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"estimated_time"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": number"})]})}),s.jsx(a.span,{className:"twoslash-target",children:"estimated_time"})]})}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"10"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"	},"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"});"})}),`
`,s.jsx(a.span,{className:"line","data-empty-line":!0,children:" "})]})}),`
`,s.jsxs(a.p,{children:["Wooooho! You have created your first campaign. You can now view the campaign on the ",s.jsx(a.a,{href:"https://app.effect.network/campaigns",children:"Effect Network"})," before you start collecting data, you need to add tasks to the campaign. You can do this by following the ",s.jsx(a.a,{href:"/docs/collecting-data/adding-tasks",children:"Adding Tasks"})," guide."]})]})}function c(l={}){const{wrapper:a}={...i(),...l.components};return a?s.jsx(a,{...l,children:s.jsx(e,{...l})}):e(l)}export{c as default,n as frontmatter};