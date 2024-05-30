import{d as s,j as e}from"./index-C_Utzd_p.js";const i={title:"Terminology",description:"undefined"};function o(t){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"terminology",children:["Terminology",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#terminology",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"accounts",children:["Accounts",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#accounts",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`Antelope accounts are different compared to other EVM blockchains, and other kinds of blockchains in the space.
You still will be working with a private key, but your private key can be linked to several accounts.`}),`
`,e.jsxs(n.p,{children:["Here's a quick synopsis from the (Antelope documentation)[",e.jsx(n.a,{href:"https://docs.antelope.io/docs/latest/protocol/accounts_and_permissions/",children:"https://docs.antelope.io/docs/latest/protocol/accounts_and_permissions/"}),"]:"]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`An account identifies a participant in an Antelope blockchain. A participant can be an individual or a group depending on the assigned permissions within the account. Accounts also represent the smart contract actors that push and receive actions to and from other accounts in the blockchain. Actions are always contained within transactions. A transaction can be one or more atomic actions.
Permissions associated with an account are used to authorize actions and transactions to other accounts. Each permission is linked to an authority table which contains a threshold that must be reached in order to allow the action associated with the given permission to be authorized for execution. The following diagram illustrates the relationship between accounts, permissions, and authorities.`}),`
`]}),`
`,e.jsx(n.p,{children:`Simply put, an account contains a collection of permissions, and each permission is linked to an authority table to allow certain actions to be exectued.
As mentioned above, a private key can be linked to several accounts, and each account can have different permissions.`}),`
`,e.jsx(n.p,{children:"The anatomy of an antelope account is as follows:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"name"}),": The name of the account"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"permissions"}),": The permissions associated with the account"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"keys"}),": The keys associated with the account (private and corresponding public keys)"]}),`
`]}),`
`,e.jsxs(n.h2,{id:"wallets",children:["Wallets",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#wallets",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`There are several wallets that you can use to interact with Antelope blockchains, some of them are:
We recomend using Unicove and Anchor Wallet, as they are the most user friendly wallets.`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://unicove.com/",children:"Unicove"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.greymass.com/anchor",children:"Anchor Wallet"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.tokenpocket.pro/",children:"TokenPocket"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://getwombat.io/",children:"Wombat"})}),`
`]}),`
`,e.jsxs(n.h2,{id:"contracts",children:["Contracts",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contracts",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`These are the important smart contracts that are used in the Effect Network.
The important contract for developing on Effect Network are:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"tasks"}),`
`,e.jsx(n.li,{children:"token"}),`
`,e.jsx(n.li,{children:"vaccount"}),`
`]}),`
`,e.jsx(n.p,{children:"With these contracts you can create tasks, and retrieve virtual accounts."}),`
`,e.jsxs(n.p,{children:[`These are the contracts that are deployed on the Jungle4 testnet for the Effect Network.
`,e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/",children:"https://jungle4.eosq.eosnation.io/"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["tasks: ",e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/account/effecttasks2",children:"effecttasks2"})]}),`
`,e.jsxs(n.li,{children:["token: ",e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/account/efxtoken1112",children:"efxtoken1112"})]}),`
`,e.jsxs(n.li,{children:["stake: ",e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/account/efxstake1111",children:"efxstake1111"})]}),`
`,e.jsxs(n.li,{children:["feepool: ",e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/account/efxfeepool11",children:"efxfeepool11"})]}),`
`,e.jsxs(n.li,{children:["proposals: ",e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/account/efxproposals",children:"efxproposals"})]}),`
`,e.jsxs(n.li,{children:["vaccount: ",e.jsx(n.a,{href:"https://jungle4.eosq.eosnation.io/account/efxaccount11",children:"efxaccount11"})]}),`
`]}),`
`,e.jsxs(n.p,{children:[`These are the contracts that are depoloyed on the EOS mainnet for the Effect Network.
`,e.jsx(n.a,{href:"https://www.bloks.io/",children:"https://www.bloks.io/"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["tasks: ",e.jsx(n.a,{href:"https://www.bloks.io/account/force.efx",children:"force.efx"})]}),`
`,e.jsxs(n.li,{children:["token: ",e.jsx(n.a,{href:"https://www.bloks.io/account/effecttokens",children:"effecttokens"})]}),`
`,e.jsxs(n.li,{children:["stake: ",e.jsx(n.a,{href:"https://www.bloks.io/account/efxstakepool",children:"efxstakepool"})]}),`
`,e.jsxs(n.li,{children:["feepool: ",e.jsx(n.a,{href:"https://www.bloks.io/account/feepool.efx",children:"feepool.efx"})]}),`
`,e.jsxs(n.li,{children:["proposals: ",e.jsx(n.a,{href:"https://www.bloks.io/account/daoproposals",children:"daoproposals"})]}),`
`,e.jsxs(n.li,{children:["vaccount: ",e.jsx(n.a,{href:"https://www.bloks.io/account/vaccount.efx",children:"vaccount.efx"})]}),`
`,e.jsxs(n.li,{children:["dao: ",e.jsx(n.a,{href:"https://www.bloks.io/account/theeffectdao",children:"theeffectdao"})]}),`
`]})]})}function c(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{c as default,i as frontmatter};
