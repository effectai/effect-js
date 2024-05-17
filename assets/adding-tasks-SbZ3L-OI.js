import{d as n,j as s}from"./index-Bav3vyKX.js";const r=void 0;function i(e){const a={a:"a",code:"code",div:"div",h2:"h2",p:"p",pre:"pre",span:"span",...n(),...e.components};return s.jsxs(s.Fragment,{children:[s.jsxs(a.h2,{id:"adding-tasks",children:["Adding tasks",s.jsx(a.a,{"aria-hidden":"true",tabIndex:"-1",href:"#adding-tasks",children:s.jsx(a.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(a.p,{children:["Adding tasks to a campaign is done through ",s.jsx("u",{children:"batches"}),` batches are a collection of tasks that are added to a campaign. Each batch can contain multiple tasks.
Let's start by creating a batch with 3 tasks to our newly created image classification campaign.`]}),`
`,s.jsx(a.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"example.ts","data-lang":"ts",children:s.jsxs(a.code,{children:[s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"import"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" { createBatch } "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"from"}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" '@effectai/sdk'"})]}),`
`,s.jsx(a.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" { "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"actor"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" } "}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"="}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" client.session"})]}),`
`,s.jsx(a.span,{className:"line","data-empty-line":!0,children:" "}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"const"}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" batch"}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" ="}),s.jsx(a.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" await"}),s.jsx(a.span,{style:{color:"#6F42C1","--shiki-dark":"#DCBDFB"},children:" createBatch"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"({"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  client,"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  batch: {"})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"      campaign_id: "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"'<..>'"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"// the id of the campaign"})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"      repetitions: "}),s.jsx(a.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"1"}),s.jsx(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:" // number of times each task should be repeated"})]}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"      payer: actor "}),s.jsx(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"// the actor that will pay the workers for the tasks"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  }"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  data: ["})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    {"})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"      image: "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"'https://example.com/image.jpg'"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"//task 1 image placeholder"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    },"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    {"})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"      image: "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"'https://example.com/image2.jpg'"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"//task 2 image placeholder"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    },"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    {"})}),`
`,s.jsxs(a.span,{className:"line",children:[s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"      image: "}),s.jsx(a.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"'https://example.com/image3.jpg'"}),s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(a.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"// task 3 image placeholder"})]}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"    }"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  ]"})}),`
`,s.jsx(a.span,{className:"line",children:s.jsx(a.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"})"})})]})})]})}function c(e={}){const{wrapper:a}={...n(),...e.components};return a?s.jsx(a,{...e,children:s.jsx(i,{...e})}):i(e)}export{c as default,r as frontmatter};