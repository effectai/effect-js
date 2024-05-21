import{d as i,j as e}from"./index-KRMi5ohj.js";const r={title:"getBalance",description:"undefined"};function a(t){const n={a:"a",code:"code",div:"div",figure:"figure",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"getbalance",children:["getBalance",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#getbalance",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"description",children:["Description",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[`This function is used to get the balance of EFX of an Effect Network account on the EOS blockchain.
There is a difference between the balance of EFX of an account on the blockchain and the balance of EFX deposited in an Effect Account.
This function returns the balance of EFX on the blockchain.
Note the use of `,e.jsx(n.code,{children:"balance.toString()"})," to convert the balance to a string."]}),`
`,e.jsxs(n.h2,{id:"usage",children:["Usage",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{className:"twoslash lsp",tabIndex:"0","data-language":"ts","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"ts","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"// [!include ~/snippets/token/get-balance.ts]"})})})})}),`
`,e.jsxs(n.h2,{id:"output",children:["Output",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#output",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`"100.0000 EFX"
`})}),`
`,e.jsxs(n.h2,{id:"parameters",children:["Parameters",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"client",children:["Client",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#client",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type:"})," ",e.jsx(n.code,{children:"Client"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description:"})," Client object that is used to interact with the blockchain."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"actor",children:["Actor",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#actor",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type:"})," ",e.jsx(n.code,{children:"Name"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description:"}),`
The account name of the user for which the balance is to be fetched.
Note that the account name is a Name object that is created using the `,e.jsx(n.code,{children:"Name.from"})," method."]}),`
`]}),`
`,e.jsxs(n.h2,{id:"returns",children:["Returns",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Type:"}),"  Asset"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Description:"}),`
Returns the balance of the account in the form of an Asset object.
The asset object has properties that represent the amount and symbol of the balance of the user.
Note that the Asset object has a `,e.jsx(n.code,{children:"toString"})," method that can be used to convert the balance to a string."]}),`
`,e.jsxs(n.p,{children:["You can read more about the: ",e.jsxs(n.a,{href:"/docs/glossary/asset",children:[e.jsx(n.code,{children:"Asset"})," object"]})]})]})}function d(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{d as default,r as frontmatter};
