import{d as t,j as i}from"./index-KRMi5ohj.js";const r={title:"getPendinPayments",description:"undefined"};function s(e){const n={a:"a",code:"code",div:"div",figure:"figure",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...t(),...e.components};return i.jsxs(i.Fragment,{children:[i.jsx(n.header,{children:i.jsxs(n.h1,{id:"getpendinpayments",children:["getPendinPayments",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getpendinpayments",children:i.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,i.jsxs(n.h2,{id:"description",children:["Description",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(n.p,{children:`Every time a user completes a task, EFX tokens are unlocked from the task, and put into escrow for the Vaccount. This function returns the pending payments for a given Vaccount.
Thus the Vaccount can claim the pending payments, and pay then out to the user when the unlock period has passed.`}),`
`,i.jsxs(n.h2,{id:"usage",children:["Usage",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(n.pre,{className:"twoslash lsp",tabIndex:"0","data-language":"ts","data-theme":"github-dark-dimmed github-light",children:i.jsx(n.code,{"data-language":"ts","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:i.jsx(n.span,{"data-line":"",children:i.jsx(n.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"// [!include ~/snippets/vaccount/get-pending-payments.ts]"})})})})}),`
`,i.jsxs(n.h2,{id:"output",children:["Output",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#output",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:i.jsx(n.pre,{tabIndex:"0","data-language":"json","data-theme":"github-dark-dimmed github-light",children:i.jsxs(n.code,{"data-language":"json","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:[i.jsx(n.span,{"data-line":"",children:i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"{"})}),`
`,i.jsxs(n.span,{"data-line":"",children:[i.jsx(n.span,{style:{"--shiki-dark":"#FF938A","--shiki-light":"#B31D28","--shiki-dark-font-style":"italic","--shiki-light-font-style":"italic"},children:"  pendingPayments"}),i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": [],"})]}),`
`,i.jsxs(n.span,{"data-line":"",children:[i.jsx(n.span,{style:{"--shiki-dark":"#FF938A","--shiki-light":"#B31D28","--shiki-dark-font-style":"italic","--shiki-light-font-style":"italic"},children:"  claimablePayments"}),i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": [],"})]}),`
`,i.jsxs(n.span,{"data-line":"",children:[i.jsx(n.span,{style:{"--shiki-dark":"#FF938A","--shiki-light":"#B31D28","--shiki-dark-font-style":"italic","--shiki-light-font-style":"italic"},children:"  totalEfxPending"}),i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(n.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"}),i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsxs(n.span,{"data-line":"",children:[i.jsx(n.span,{style:{"--shiki-dark":"#FF938A","--shiki-light":"#B31D28","--shiki-dark-font-style":"italic","--shiki-light-font-style":"italic"},children:"  totalEfxClaimable"}),i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:": "}),i.jsx(n.span,{style:{"--shiki-dark":"#6CB6FF","--shiki-light":"#005CC5"},children:"0"}),i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:","})]}),`
`,i.jsx(n.span,{"data-line":"",children:i.jsx(n.span,{style:{"--shiki-dark":"#ADBAC7","--shiki-light":"#24292E"},children:"}"})})]})})}),`
`,i.jsxs(n.h2,{id:"parameters",children:["Parameters",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(n.h3,{id:"client",children:["Client",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#client",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Description:"})," The client object, ",i.jsx(n.strong,{children:"must"})," be connected with a Session."]}),`
`]}),`
`,i.jsxs(n.h3,{id:"vaccountid",children:["vAccountId",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#vaccountid",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Description:"})," The id of the vAccount."]}),`
`]}),`
`,i.jsxs(n.h2,{id:"returns",children:["Returns",i.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:i.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,i.jsxs(n.p,{children:[i.jsx(n.strong,{children:"Type:"}),"  An object containing the following fields:"]}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[`
`,i.jsx(n.strong,{children:"pendingPayments"}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Type:"})," Array of objects"]}),`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Description:"})," An array of objects containing the pending payments for the Vaccount."]}),`
`]}),`
`]}),`
`,i.jsxs(n.li,{children:[`
`,i.jsx(n.strong,{children:"claimablePayments"}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Type:"})," Array of objects"]}),`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Description:"})," An array of objects containing the claimable payments for the Vaccount."]}),`
`]}),`
`]}),`
`,i.jsxs(n.li,{children:[`
`,i.jsx(n.strong,{children:"totalEfxPending"}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Type:"})," Number"]}),`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Description:"})," The total amount of EFX pending for the Vaccount."]}),`
`]}),`
`]}),`
`,i.jsxs(n.li,{children:[`
`,i.jsx(n.strong,{children:"totalEfxClaimable"}),`
`,i.jsxs(n.ul,{children:[`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Type:"})," Number"]}),`
`,i.jsxs(n.li,{children:[i.jsx(n.strong,{children:"Description:"})," The total amount of EFX claimable for the Vaccount."]}),`
`]}),`
`]}),`
`]})]})}function d(e={}){const{wrapper:n}={...t(),...e.components};return n?i.jsx(n,{...e,children:i.jsx(s,{...e})}):s(e)}export{d as default,r as frontmatter};
