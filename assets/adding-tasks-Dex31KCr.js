import{d as i,j as n}from"./index-KRMi5ohj.js";const t=void 0;function s(e){const a={a:"a",code:"code",div:"div",figure:"figure",h2:"h2",p:"p",pre:"pre",span:"span",...i(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsxs(a.h2,{id:"adding-tasks",children:["Adding tasks",n.jsx(a.a,{"aria-hidden":"true",tabIndex:"-1",href:"#adding-tasks",children:n.jsx(a.div,{"data-autolink-icon":!0})})]}),`
`,n.jsxs(a.p,{children:["Adding tasks to a campaign is done through adding ",n.jsx("u",{children:"batches"}),"."]}),`
`,n.jsx(a.p,{children:`Batches are a collection of tasks that are added to a campaign. Each batch can contain multiple tasks.
Let's start by creating a batch with 3 tasks to our newly created image classification campaign.`}),`
`,n.jsx(a.figure,{"data-rehype-pretty-code-figure":"",children:n.jsx(a.pre,{tabIndex:"0","data-language":"ts","data-theme":"github-dark-dimmed github-light",children:n.jsxs(a.code,{"data-language":"ts","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"// [!include ~/snippets/getting-started/getting-started-auth.ts]"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"if(!client.session) {"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  throw new Error('No session found')"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"}"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"const { actor } = client.session"})}),`
`,n.jsx(a.span,{"data-line":"",children:" "}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"if(!actor) {"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  throw new Error('No actor found')"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"}"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"//---cut---"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"import { createBatch } from '@effectai/sdk'"})}),`
`,n.jsx(a.span,{"data-line":"",children:" "}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"const batch = await createBatch({"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  client,"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  // The campaign id to which the batch should be added"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  campaignId : 1,"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  // The number of times each task in the batch should be repeated"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  repetitions: 1,"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  // The reward for each task in the batch"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  reward: 3,"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  // The template placeholders for each task in the batch"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  taskData : ["})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"    {"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"      ipfs_url: 'https://example.com/image.jpg', //task 1 image placeholder"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"    },"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"    {"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"      ipfs_url: 'https://example.com/image2.jpg', //task 2 image placeholder"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"    },"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"    {"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"      ipfs_url: 'https://example.com/image3.jpg', // task 3 image placeholder"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"    }"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"  ],"})}),`
`,n.jsx(a.span,{"data-line":"",children:n.jsx(a.span,{children:"})"})}),`
`,n.jsx(a.span,{"data-line":"",children:" "})]})})})]})}function l(e={}){const{wrapper:a}={...i(),...e.components};return a?n.jsx(a,{...e,children:n.jsx(s,{...e})}):s(e)}export{l as default,t as frontmatter};
