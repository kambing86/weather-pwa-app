"use strict";(self.webpackChunkweather_pwa_app=self.webpackChunkweather_pwa_app||[]).push([[696],{2696:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});var o=n(9252),r=n(8903),a=n(3193),s=n(8356),i=n(5761),c=n(1906),l=n(5043),d=n(9456),u=n(8247),m=n(579);const A=[0,5,10],p=[0,7,8,9,10,11],h="No addition",v="That's all",x="Create bill",f="Start over",g="Amend bill",k=e=>{let{onClick:t}=e;const n=(0,d.d4)((e=>e.bills.state)),o=(0,d.d4)((e=>e.bills.history.length)),r=o>0,a=(0,d.wA)(),s=(0,l.useMemo)((()=>Array.from({length:o},((e,t)=>{const n=(t+1).toString();return(0,m.jsx)(c.A,{onClick:()=>{a(u.A.actions.addUserMessage(n)),a(u.A.actions.selectBill(t))},variant:"contained",children:n},t)}))),[o,a]);return(0,m.jsxs)(m.Fragment,{children:[n===u.F.Init&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.A,{onClick:()=>{a(u.A.actions.addUserMessage(x)),a(u.A.actions.newBill())},variant:"contained",children:x}),r&&(0,m.jsx)(c.A,{onClick:()=>{a(u.A.actions.viewBill())},variant:"contained",children:"View bill"})]}),n===u.F.View&&s,n===u.F.Update&&(0,m.jsx)(c.A,{onClick:()=>{null===t||void 0===t||t(),a(u.A.actions.addUserMessage(h)),a(u.A.actions.noUpdatePerson())},variant:"contained",children:h}),n===u.F.Item&&(0,m.jsx)(c.A,{onClick:()=>{null===t||void 0===t||t(),a(u.A.actions.addUserMessage(v)),a(u.A.actions.finishItem())},variant:"contained",children:v}),n===u.F.ServiceTax&&A.map((e=>(0,m.jsxs)(c.A,{onClick:()=>{null===t||void 0===t||t(),a(u.A.actions.addUserMessage("".concat(e,"%"))),a(u.A.actions.setServiceTax(e.toString()))},variant:"contained",children:[e,"%"]},e))),n===u.F.GST&&p.map((e=>(0,m.jsxs)(c.A,{onClick:()=>{null===t||void 0===t||t(),a(u.A.actions.addUserMessage("".concat(e,"%"))),a(u.A.actions.setGST(e.toString()))},variant:"contained",children:[e,"%"]},e))),n===u.F.Total&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.A,{onClick:()=>{a(u.A.actions.addUserMessage(f)),a(u.A.actions.startOver())},variant:"contained",children:f}),(0,m.jsx)(c.A,{onClick:()=>{a(u.A.actions.addUserMessage(g)),a(u.A.actions.amendBill())},variant:"contained",children:g})]})]})},C=(0,l.memo)(k);var j=n(794),b=n(547);const y=e=>{let{error:t,clearError:n}=e;return(0,m.jsx)(j.A,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:null!=t,autoHideDuration:5e3,onClose:n,children:(0,m.jsx)(b.A,{severity:"error",children:t})})},w=(0,l.memo)(y);var S=n(8911),F=n(2110),M=n(6494);const T=()=>{const e=(0,d.d4)((e=>e.bills.messages)),t=(0,l.useRef)(null);return(0,l.useEffect)((()=>{const e=t.current;if(e){const t=e.scrollHeight;e.scrollTo({top:t,behavior:"smooth"})}}),[e.length]),(0,m.jsx)(r.Ay,{ref:t,item:!0,xs:12,sx:{display:"flex",flexFlow:"column nowrap",flex:"1 0 0 !important",overflow:"auto"},children:(0,m.jsx)(S.A,{direction:"column",justifyContent:"flex-end",alignItems:"center",spacing:2,sx:{flex:"1 0 0 !important"},children:e.map(((e,t)=>{let{msg:n,isUser:o}=e;return(0,m.jsx)(F.A,{variant:"outlined",sx:{alignSelf:o?"flex-end":"flex-start",bgcolor:o?"primary.main":null,color:o?"primary.contrastText":null},children:(0,m.jsx)(M.A,{sx:{whiteSpace:"pre-line"},children:n})},t)}))})})},N=(0,l.memo)(T);var R=n(2567);const U=()=>{const[e,t]=(0,l.useState)(""),[n,c]=(0,l.useState)(null),A=(0,R.t)(e),p=(0,l.useCallback)((e=>{t(e.target.value)}),[]),h=(0,d.d4)((e=>e.bills.state)),v=(0,R.t)(h),x=(0,d.wA)(),f=(0,l.useCallback)((e=>{e.preventDefault();const n=A.current.trim();if(""===n)return;x(u.A.actions.addUserMessage(n));const o=v.current;try{switch(o){case u.F.Create:x(u.A.actions.addBill(n));break;case u.F.Person:x(u.A.actions.addPersons(n));break;case u.F.Update:x(u.A.actions.updatePersons(n));break;case u.F.Item:x(u.A.actions.addItem(n));break;case u.F.ServiceTax:x(u.A.actions.setServiceTax(n));break;case u.F.GST:x(u.A.actions.setGST(n))}}catch(r){c(r.message)}t("")}),[A,v,x]),g=(0,l.useCallback)((()=>{c(null)}),[]),k=(0,l.useCallback)((()=>{t("")}),[]),j=h!==u.F.Init&&h!==u.F.View&&h!==u.F.Total;return(0,m.jsxs)(o.A,{maxWidth:"lg",sx:{flex:"1 0 auto",pt:2},children:[(0,m.jsx)(w,{error:n,clearError:g}),(0,m.jsxs)(r.Ay,{container:!0,spacing:3,sx:{flexFlow:"column nowrap",height:"100%"},children:[(0,m.jsx)(N,{}),(0,m.jsx)(r.Ay,{item:!0,xs:12,sx:{flex:"0 0 0 !important"},children:(0,m.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:f,children:[(0,m.jsx)(C,{onClick:k}),j&&(0,m.jsxs)(a.A,{fullWidth:!0,sx:{mt:2},children:[(0,m.jsx)(s.A,{children:"Input"}),(0,m.jsx)(i.A,{value:e,onChange:p})]})]})})]})]})}},2110:(e,t,n)=>{n.d(t,{A:()=>x});var o=n(8168),r=n(8587),a=n(5043),s=n(8387),i=n(8610),c=n(4535),l=n(8206),d=n(3336),u=n(2532),m=n(2372);function A(e){return(0,m.Ay)("MuiCard",e)}(0,u.A)("MuiCard",["root"]);var p=n(579);const h=["className","raised"],v=(0,c.Ay)(d.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),x=a.forwardRef((function(e,t){const n=(0,l.b)({props:e,name:"MuiCard"}),{className:a,raised:c=!1}=n,d=(0,r.A)(n,h),u=(0,o.A)({},n,{raised:c}),m=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},A,t)})(u);return(0,p.jsx)(v,(0,o.A)({className:(0,s.A)(m.root,a),elevation:c?8:void 0,ref:t,ownerState:u},d))}))},6494:(e,t,n)=>{n.d(t,{A:()=>v});var o=n(8168),r=n(8587),a=n(5043),s=n(8387),i=n(8610),c=n(4535),l=n(8206),d=n(2532),u=n(2372);function m(e){return(0,u.Ay)("MuiCardContent",e)}(0,d.A)("MuiCardContent",["root"]);var A=n(579);const p=["className","component"],h=(0,c.Ay)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),v=a.forwardRef((function(e,t){const n=(0,l.b)({props:e,name:"MuiCardContent"}),{className:a,component:c="div"}=n,d=(0,r.A)(n,p),u=(0,o.A)({},n,{component:c}),v=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},m,t)})(u);return(0,A.jsx)(h,(0,o.A)({as:c,className:(0,s.A)(v.root,a),ownerState:u,ref:t},d))}))},8911:(e,t,n)=>{n.d(t,{A:()=>S});var o=n(8587),r=n(8168),a=n(5043),s=n(8387),i=n(9172),c=n(2372),l=n(8610),d=n(6060),u=n(2900),m=n(8698),A=n(8280),p=n(9751),h=n(8604),v=n(579);const x=["component","direction","spacing","divider","children","className","useFlexGap"],f=(0,A.A)(),g=(0,d.A)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function k(e){return(0,u.A)({props:e,name:"MuiStack",defaultTheme:f})}function C(e,t){const n=a.Children.toArray(e).filter(Boolean);return n.reduce(((e,o,r)=>(e.push(o),r<n.length-1&&e.push(a.cloneElement(t,{key:"separator-".concat(r)})),e)),[])}const j=e=>{let{ownerState:t,theme:n}=e,o=(0,r.A)({display:"flex",flexDirection:"column"},(0,p.NI)({theme:n},(0,p.kW)({values:t.direction,breakpoints:n.breakpoints.values}),(e=>({flexDirection:e}))));if(t.spacing){const e=(0,h.LX)(n),r=Object.keys(n.breakpoints.values).reduce(((e,n)=>(("object"===typeof t.spacing&&null!=t.spacing[n]||"object"===typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e)),{}),a=(0,p.kW)({values:t.direction,base:r}),s=(0,p.kW)({values:t.spacing,base:r});"object"===typeof a&&Object.keys(a).forEach(((e,t,n)=>{if(!a[e]){const o=t>0?a[n[t-1]]:"column";a[e]=o}}));const c=(n,o)=>{return t.useFlexGap?{gap:(0,h._W)(e,n)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{["margin".concat((r=o?a[o]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[r]))]:(0,h._W)(e,n)}};var r};o=(0,i.A)(o,(0,p.NI)({theme:n},s,c))}return o=(0,p.iZ)(n.breakpoints,o),o};var b=n(4535),y=n(8206);const w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=g,useThemeProps:n=k,componentName:i="MuiStack"}=e,d=t(j),u=a.forwardRef((function(e,t){const a=n(e),u=(0,m.A)(a),{component:A="div",direction:p="column",spacing:h=0,divider:f,children:g,className:k,useFlexGap:j=!1}=u,b=(0,o.A)(u,x),y={direction:p,spacing:h,useFlexGap:j},w=(0,l.A)({root:["root"]},(e=>(0,c.Ay)(i,e)),{});return(0,v.jsx)(d,(0,r.A)({as:A,ownerState:y,ref:t,className:(0,s.A)(w.root,k)},b,{children:f?C(g,f):g}))}));return u}({createStyledComponent:(0,b.Ay)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,y.b)({props:e,name:"MuiStack"})}),S=w}}]);
//# sourceMappingURL=696.b17f5408.chunk.js.map