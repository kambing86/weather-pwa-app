"use strict";(self.webpackChunkweather_pwa_app=self.webpackChunkweather_pwa_app||[]).push([[639],{6232:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(5043),o=n(579);const a=e=>{let{countryCode:t,fontSize:n}=e;return(0,o.jsx)("span",{style:{fontSize:n,margin:5},className:"fi fi-".concat(t.toLowerCase())})},s=(0,r.memo)(a)},3166:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(5043),o=n(9946),a=n(2567);const s="WEATHER_PWA_FAV",i=()=>{const[e,t]=(0,r.useState)((()=>JSON.parse(localStorage.getItem(s)||"[]"))),n=(0,r.useCallback)((e=>{t((t=>{const n=[...t];if("string"===typeof e)n.push(e);else{const{name:t,lat:r,lon:o,country:a}=e;n.push({name:t,lat:r,lon:o,country:a})}return localStorage.setItem(s,JSON.stringify(n)),n}))}),[]),i=(0,r.useCallback)((e=>{t((t=>{const n=[...t],r=(0,o.RB)(n,e);return n.splice(r,1),localStorage.setItem(s,JSON.stringify(n)),n}))}),[]),l=(0,a.t)(e),c=(0,r.useCallback)((e=>(0,o.RB)(l.current,e)>=0),[l]),u=(0,r.useCallback)((e=>{c(e)?i(e):n(e)}),[c,i,n]),d=(0,r.useCallback)((e=>{if(null==e)return null;const t=(0,o.G$)(e);if(null==t)return null;const[n,r]=t,a=l.current.find((e=>"string"!==typeof e&&(e.lat===n&&e.lon===r)));return null===a||void 0===a?void 0:a.name}),[l]);return{favoriteList:e,isFavorite:c,clickFavorite:u,getNameFromFavorite:d}}},2639:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var r=n(9252),o=n(8903),a=n(5721),s=n(681),i=n(8569),l=n(3336),c=n(8136),u=n(6232),d=n(1191),p=n(3166),m=n(579);const f=(0,c.A)((e=>({container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},list:{backgroundColor:e.palette.background.paper}})));function h(){const e=f(),{favoriteList:t}=(0,p.A)();return(0,m.jsx)(r.A,{maxWidth:"lg",className:e.container,children:(0,m.jsx)(o.Ay,{container:!0,spacing:3,children:(0,m.jsx)(o.Ay,{item:!0,xs:12,children:(0,m.jsx)(l.A,{elevation:2,children:(0,m.jsxs)(a.A,{component:"nav",className:e.list,children:[t.map((e=>{const t="string"===typeof e?e:"".concat(e.lat).concat(encodeURIComponent("|")).concat(e.lon),n="string"===typeof e?e:e.name,r="string"===typeof e?null:(0,d.BJ)(e.country);return(0,m.jsx)(s.Ay,{button:!0,component:"a",href:"#/location/".concat(t),children:(0,m.jsx)(i.A,{primary:(0,m.jsxs)(m.Fragment,{children:[n,null!=r&&n!==r.name&&" - ".concat(r.name),"string"!==typeof e&&(0,m.jsx)(u.A,{countryCode:e.country})]})})},t)})),0===t.length&&(0,m.jsx)(s.Ay,{children:"No favorite, please add location in Home page"})]})})})})})}},9946:(e,t,n)=>{function r(e,t){let n=-1;return"string"===typeof t?n=e.indexOf(t):(n=e.findIndex((e=>"string"!==typeof e&&(e.name===t.name&&e.country===t.country||e.lat===t.lat&&e.lon===t.lon))),-1===n&&(n=e.findIndex((e=>"string"===typeof e&&e===t.name)))),n}function o(e){const t=e.split("|");if(function(e){return 2===e.length&&e.every((e=>function(e){return"string"==typeof e&&!isNaN(e)&&!isNaN(parseFloat(e))}(e)))}(t)){const[e,n]=t;return[parseFloat(e),parseFloat(n)]}return null}n.d(t,{RB:()=>r,G$:()=>o})},9252:(e,t,n)=>{n.d(t,{A:()=>S});var r=n(8587),o=n(8168),a=n(5043),s=n(8387),i=n(2372),l=n(8610),c=n(7598),u=n(2900),d=n(6060),p=n(8280),m=n(579);const f=["className","component","disableGutters","fixed","maxWidth","classes"],h=(0,p.A)(),A=(0,d.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t["maxWidth".concat((0,c.A)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),g=e=>(0,u.A)({props:e,name:"MuiContainer",defaultTheme:h});var y=n(6803),x=n(4535),v=n(8206);const b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=A,useThemeProps:n=g,componentName:u="MuiContainer"}=e,d=t((e=>{let{theme:t,ownerState:n}=e;return(0,o.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:n}=e;return n.fixed&&Object.keys(t.breakpoints.values).reduce(((e,n)=>{const r=n,o=t.breakpoints.values[r];return 0!==o&&(e[t.breakpoints.up(r)]={maxWidth:"".concat(o).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:n}=e;return(0,o.A)({},"xs"===n.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},n.maxWidth&&"xs"!==n.maxWidth&&{[t.breakpoints.up(n.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}})})),p=a.forwardRef((function(e,t){const a=n(e),{className:p,component:h="div",disableGutters:A=!1,fixed:g=!1,maxWidth:y="lg"}=a,x=(0,r.A)(a,f),v=(0,o.A)({},a,{component:h,disableGutters:A,fixed:g,maxWidth:y}),b=((e,t)=>{const{classes:n,fixed:r,disableGutters:o,maxWidth:a}=e,s={root:["root",a&&"maxWidth".concat((0,c.A)(String(a))),r&&"fixed",o&&"disableGutters"]};return(0,l.A)(s,(e=>(0,i.Ay)(t,e)),n)})(v,u);return(0,m.jsx)(d,(0,o.A)({as:h,ownerState:v,className:(0,s.A)(b.root,p),ref:t},x))}));return p}({createStyledComponent:(0,x.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t["maxWidth".concat((0,y.A)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,v.b)({props:e,name:"MuiContainer"})}),S=b},6060:(e,t,n)=>{n.d(t,{A:()=>y});var r=n(8168),o=n(8587),a=n(3174),s=n(9172),i=n(8280),l=n(8812);const c=["ownerState"],u=["variants"],d=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function p(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const m=(0,i.A)(),f=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function h(e){let{defaultTheme:t,theme:n,themeId:r}=e;return o=n,0===Object.keys(o).length?t:n[r]||n;var o}function A(e){return e?(t,n)=>n[e]:null}function g(e,t){let{ownerState:n}=t,a=(0,o.A)(t,c);const s="function"===typeof e?e((0,r.A)({ownerState:n},a)):e;if(Array.isArray(s))return s.flatMap((e=>g(e,(0,r.A)({ownerState:n},a))));if(s&&"object"===typeof s&&Array.isArray(s.variants)){const{variants:e=[]}=s;let t=(0,o.A)(s,u);return e.forEach((e=>{let o=!0;"function"===typeof e.props?o=e.props((0,r.A)({ownerState:n},a,n)):Object.keys(e.props).forEach((t=>{(null==n?void 0:n[t])!==e.props[t]&&a[t]!==e.props[t]&&(o=!1)})),o&&(Array.isArray(t)||(t=[t]),t.push("function"===typeof e.style?e.style((0,r.A)({ownerState:n},a,n)):e.style))})),t}return s}const y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:n=m,rootShouldForwardProp:i=p,slotShouldForwardProp:c=p}=e,u=e=>(0,l.A)((0,r.A)({},e,{theme:h((0,r.A)({},e,{defaultTheme:n,themeId:t}))}));return u.__mui_systemSx=!0,function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,a.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:m,slot:y,skipVariantsResolver:x,skipSx:v,overridesResolver:b=A(f(y))}=l,S=(0,o.A)(l,d),w=void 0!==x?x:y&&"Root"!==y&&"root"!==y||!1,k=v||!1;let C=p;"Root"===y||"root"===y?C=i:y?C=c:function(e){return"string"===typeof e&&e.charCodeAt(0)>96}(e)&&(C=void 0);const W=(0,a.default)(e,(0,r.A)({shouldForwardProp:C,label:undefined},S)),N=e=>"function"===typeof e&&e.__emotion_real!==e||(0,s.Q)(e)?o=>g(e,(0,r.A)({},o,{theme:h({theme:o.theme,defaultTheme:n,themeId:t})})):e,R=function(o){let a=N(o);for(var s=arguments.length,i=new Array(s>1?s-1:0),l=1;l<s;l++)i[l-1]=arguments[l];const c=i?i.map(N):[];m&&b&&c.push((e=>{const o=h((0,r.A)({},e,{defaultTheme:n,themeId:t}));if(!o.components||!o.components[m]||!o.components[m].styleOverrides)return null;const a=o.components[m].styleOverrides,s={};return Object.entries(a).forEach((t=>{let[n,a]=t;s[n]=g(a,(0,r.A)({},e,{theme:o}))})),b(e,s)})),m&&!w&&c.push((e=>{var o;const a=h((0,r.A)({},e,{defaultTheme:n,themeId:t}));return g({variants:null==a||null==(o=a.components)||null==(o=o[m])?void 0:o.variants},(0,r.A)({},e,{theme:a}))})),k||c.push(u);const d=c.length-i.length;if(Array.isArray(o)&&d>0){const e=new Array(d).fill("");a=[...o,...e],a.raw=[...o.raw,...e]}const p=W(a,...c);return e.muiName&&(p.muiName=e.muiName),p};return W.withConfig&&(R.withConfig=W.withConfig),R}}()},2900:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(4775),o=n(5527);function a(e){let{props:t,name:n,defaultTheme:a,themeId:s}=e,i=(0,o.A)(a);s&&(i=i[s]||i);return(0,r.A)({theme:i,name:n,props:t})}}}]);
//# sourceMappingURL=639.8c0d1313.chunk.js.map