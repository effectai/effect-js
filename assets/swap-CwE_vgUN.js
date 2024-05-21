import{d as i,j as e}from"./index-KRMi5ohj.js";const r={title:"swap",description:"undefined"};function a(t){const n={a:"a",code:"code",div:"div",figure:"figure",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"swap",children:["swap",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#swap",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"description",children:["Description",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#description",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:`This function is used to swap tokens from EFX to USDT or vice versa.
Note that the function requires a client object that is used to interact with the blockchain.
The client object also needs a Session object that is used to sign the transactions.`}),`
`,e.jsxs(n.h3,{id:"walletplugin",children:["WalletPlugin",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#walletplugin",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Note that the ",e.jsx(n.code,{children:"walletPlugin"}),` object is used to sign the transactions.
The `,e.jsx(n.code,{children:"walletPlugin"}),` object is an instance of the WalletPluginPrivateKey class that is used to sign the transactions using the private key of the user.
Other wallet plugins can be used to sign transactions and can be found at: `,e.jsx(n.a,{href:"https://wharfkit.com/plugins",children:"https://wharfkit.com/plugins"})]}),`
`,e.jsxs(n.h2,{id:"usage",children:["Usage",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.figure,{"data-rehype-pretty-code-figure":"",children:e.jsx(n.pre,{className:"twoslash lsp",tabIndex:"0","data-language":"ts","data-theme":"github-dark-dimmed github-light",children:e.jsx(n.code,{"data-language":"ts","data-theme":"github-dark-dimmed github-light",style:{display:"grid"},children:e.jsx(n.span,{"data-line":"",children:e.jsx(n.span,{style:{"--shiki-dark":"#768390","--shiki-light":"#6A737D"},children:"// [!include ~/snippets/token/swap.ts]"})})})})}),`
`,e.jsxs(n.h2,{id:"output",children:["Output",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#output",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Read more about the transaction response here: ",e.jsx(n.a,{href:"/docs/glossary/transaction-result",children:"TransactionResponse"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:` response: {
    transaction_id: "18c35c04fce3dbbfee0dea46707003c4897bb3c02766a69936c3ceb0bb836c99",
    processed: {
      id: "18c35c04fce3dbbfee0dea46707003c4897bb3c02766a69936c3ceb0bb836c99",
      block_num: 137868012,
      block_time: "2024-05-03T04:12:07.500",
      producer_block_id: null,
      receipt: {
        status: "executed",
        cpu_usage_us: 207,
        net_usage_words: 16,
      },
      elapsed: 207,
      net_usage: 128,
      scheduled: false,
      action_traces: [
        {
          action_ordinal: 1,
          creator_action_ordinal: 0,
          closest_unnotified_ancestor_action_ordinal: 0,
          receipt: {
            receiver: "efxaccount11",
            act_digest: "d6f9be5af2565060d572a08f6e5f75498ea4c6a3d2cf77e26f3e3ffff4b6e244",
            global_sequence: 196109234,
            recv_sequence: 387,
            auth_sequence: [
              [ "forcedev1234", 32 ]
            ],
            code_sequence: 8,
            abi_sequence: 15,
          },
          receiver: "efxaccount11",
          act: {
            account: "efxaccount11",
            name: "vtransfer",
            authorization: [
              {
                actor: "forcedev1234",
                permission: "active",
              }
            ],
            data: {
              from_id: 24,
              to_id: 3,
              quantity: {
                quantity: "0.0001 EFX",
                contract: "efxtoken1112",
              },
              memo: "",
              sig: null,
              fee: null,
            },
            hex_data: "180000000000000003000000000000000100000000000000044546580000000020420853419afb52000000",
          },
          context_free: false,
          elapsed: 76,
          console: "",
          trx_id: "18c35c04fce3dbbfee0dea46707003c4897bb3c02766a69936c3ceb0bb836c99",
          block_num: 137868012,
          block_time: "2024-05-03T04:12:07.500",
          producer_block_id: null,
          account_ram_deltas: [],
          except: null,
          error_code: null,
          return_value_hex_data: "",
        }, {
          action_ordinal: 2,
          creator_action_ordinal: 1,
          closest_unnotified_ancestor_action_ordinal: 1,
          receipt: {
            receiver: "vibrantcacti",
            act_digest: "d6f9be5af2565060d572a08f6e5f75498ea4c6a3d2cf77e26f3e3ffff4b6e244",
            global_sequence: 196109235,
            recv_sequence: 69,
            auth_sequence: [
              [ "forcedev1234", 33 ]
            ],
            code_sequence: 8,
            abi_sequence: 15,
          },
          receiver: "vibrantcacti",
          act: {
            account: "efxaccount11",
            name: "vtransfer",
            authorization: [
              {
                actor: "forcedev1234",
                permission: "active",
              }
            ],
            data: {
              from_id: 24,
              to_id: 3,
              quantity: {
                quantity: "0.0001 EFX",
                contract: "efxtoken1112",
              },
              memo: "",
              sig: null,
              fee: null,
            },
            hex_data: "180000000000000003000000000000000100000000000000044546580000000020420853419afb52000000",
          },
          context_free: false,
          elapsed: 5,
          console: "",
          trx_id: "18c35c04fce3dbbfee0dea46707003c4897bb3c02766a69936c3ceb0bb836c99",
          block_num: 137868012,
          block_time: "2024-05-03T04:12:07.500",
          producer_block_id: null,
          account_ram_deltas: [],
          except: null,
          error_code: null,
          return_value_hex_data: "",
        }
      ],
      account_ram_delta: null,
      except: null,
      error_code: null,
    },
  },
}
`})}),`
`,e.jsxs(n.h2,{id:"parameters",children:["Parameters",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameters",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"client",children:["Client",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#client",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type:"})," ",e.jsx(n.code,{children:"Client"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description:"})," Client object that is used to interact with the blockchain. Make sure that the client is connected with a Session."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"ammount",children:["Ammount",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ammount",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type:"})," ",e.jsx(n.code,{children:"number"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description:"}),`
The amount of tokens to be swapped.`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"direction",children:["Direction",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#direction",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type:"})," ",e.jsx(n.code,{children:"string"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description:"}),`
The direction of the swap. It can be either "UsdtToEfx" or "EfxToUsdt".`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"returns",children:["Returns",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#returns",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Type:"}),"  TransactionResponse"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Description:"}),`
Returns a transaction response object that contains the transaction id block number, and various properties that correlate to the transaction.
Read more about the transaction response here: `,e.jsx(n.a,{href:"/docs/glossary/transaction-result",children:"TransactionResponse"})]})]})}function c(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{c as default,r as frontmatter};
