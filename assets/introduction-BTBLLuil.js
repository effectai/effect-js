import{d as a,j as e}from"./index-C-jZgIHZ.js";const l={title:"Introduction",description:"undefined"};function t(i){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",span:"span",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"introduction",children:["Introduction",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#introduction",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"As described in the previous section, with campaigns, a template is a blueprint that allows you to input data and display it in a specific format. They are the interface used by the workers of EffectAI to interact with the data and perform the tasks required by the client."}),`
`,e.jsx(s.p,{children:"In this section, we will provide an overview of the template engine, explain the basic concepts and components of a template, and guide you through the process of creating your own template."}),`
`,e.jsxs(s.p,{children:["We will be creating a simple template that lets users create bounding boxes around objects in an image. This will be done with the help of the open-source data annotation tool called ",e.jsx(s.a,{href:"https://labelstud.io/",children:"Label Studio"}),"."]}),`
`,e.jsxs(s.h2,{id:"what-is-a-template",children:["What is a Template?",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-is-a-template",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"A template is some HTML, CSS, and JavaScript code that defines the structure and layout of the data that is to be displayed. It's not a standard HTML5 template that uses the HTML specifications. The template engine is custom-built to handle the data that is to be displayed in the template."}),`
`,e.jsx(s.p,{children:"There is an existing HTML document, with a head and body tag defined with the requirements for EffectAI. What we need is to add what you would usually add in the body of the document."}),`
`,e.jsx(s.p,{children:"So the simplest template, which is just a text template, would look like this:"}),`
`,e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"div"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  <"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"p"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">Hello World!</"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"p"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"</"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"div"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})]})}),`
`,e.jsx(s.p,{children:'This is a simple template that displays the text "Hello World!" in a paragraph tag. But the main issue here is that we still need to load in dynamic data from a data source so that each task is different.'}),`
`,e.jsxs(s.h2,{id:"parameterizing-templates-placeholders",children:["Parameterizing Templates: Placeholders",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#parameterizing-templates-placeholders",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"In order to be able to use the same template for different data, we need to parameterize the template. This means that we need to define placeholders in the template that will be replaced with the actual data when the template is rendered."}),`
`,e.jsxs(s.p,{children:["The way this is done in EffectAI is by using the ",e.jsx(s.code,{children:"${}"})," syntax. This is similar to the way you would use template literals in JavaScript."]}),`
`,e.jsx(s.p,{children:"For example, if we want to display the name of a person in the template, we would define a placeholder like this:"}),`
`,e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"div"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"  <"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"p"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">Hello ${name}!</"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"p"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"</"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"div"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]})]})}),`
`,e.jsxs(s.p,{children:["When the template is rendered, the ",e.jsx(s.code,{children:"${name}"})," placeholder will be replaced with the actual name of the person."]}),`
`,e.jsxs(s.h2,{id:"submitting-templates-and-retrieving-results",children:["Submitting Templates and Retrieving Results",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#submitting-templates-and-retrieving-results",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"So now we understand how to input data into the template, but how do we get results back? Workers on EffectAI will get a rendered template with the data inputted into the template. The worker will then perform the task required by the client and submit the result."}),`
`,e.jsx(s.p,{children:"Submitting is a standard submit event in HTML, but the data is saved in the EffectAI smart contracts."}),`
`,e.jsx(s.p,{children:"Here's an example of a form with an input field and a submit button:"}),`
`,e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"h2"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">Placeholder example: ${placeholder}</"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"h2"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:">"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"input"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#6CB6FF"},children:" type"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"text"'}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#6CB6FF"},children:" required"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#6CB6FF"},children:" placeholder"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:`"'name' attribute is required on input fields"`}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#6CB6FF"},children:" name"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"test"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" />"})]}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"<"}),e.jsx(s.span,{style:{color:"#22863A","--shiki-dark":"#8DDB8C"},children:"input"}),e.jsx(s.span,{style:{color:"#6F42C1","--shiki-dark":"#6CB6FF"},children:" type"}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"="}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"submit"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" />"})]})]})}),`
`,e.jsx(s.p,{children:'When we input the text "World" into the text field and submit this, we get the following submission:'}),`
`,e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"{"})}),`
`,e.jsxs(s.span,{className:"line",children:[e.jsx(s.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "test"'}),e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),e.jsx(s.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"World"'})]}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]})}),`
`,e.jsxs(s.h2,{id:"creating-your-own-template",children:["Creating Your Own Template",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#creating-your-own-template",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["You can try out the templates for yourself by inputting them into ",e.jsx(s.a,{href:"https://app.effect.network/preview/",children:"EffectAI's template preview tool"}),"."]})]})}function r(i={}){const{wrapper:s}={...a(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(t,{...i})}):t(i)}export{r as default,l as frontmatter};
