(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[545],{7468:function(e,r,t){"use strict";t.d(r,{ZP:function(){return E}});var n=t(7294),o=t(9641),i=t(6212);const s=(0,i.zo)("div",{transition:"$default",".nextui-collapse-title-content":{w:"100%","h1,h2,h3,h4,h5,h6,p,span,b":{margin:0}},".nextui-collapse-title-container":{d:"flex",jc:"space-between",ai:"center"},".nextui-collapse-title":{color:"$foreground"},".nextui-collapse-subtitle":{color:"$accents5",margin:0,"*":{margin:0}},".nextui-collapse-title-content-left":{mr:"$sm"},".nextui-collapse-title-content-left, .nextui-collapse-title-content-right":{d:"flex",ai:"center"},"@motion":{transition:"none",".nextui-collapse-title-content-right ":{svg:{transition:"none"}}},variants:{shadow:{true:{border:"none",boxShadow:"$md",br:"$lg",p:"0 $lg",bg:"$backgroundContrast"}},borderWeight:{light:{$$collapseBorderWidth:"$borderWeights$light"},normal:{$$collapseBorderWidth:"$borderWeights$normal"},bold:{$$collapseBorderWidth:"$borderWeights$bold"},extrabold:{$$collapseBorderWidth:"$borderWeights$extrabold"},black:{$$collapseBorderWidth:"$borderWeights$black"}},divider:{true:{borderTop:"$$collapseBorderWidth solid $border",borderBottom:"$$collapseBorderWidth solid $border"}},bordered:{true:{br:"$lg",p:"0 $lg",border:"$$collapseBorderWidth solid $border"}},animated:{true:{".nextui-collapse-title-content-right ":{svg:{transition:"transform 200ms ease"}}},false:{transition:"none"}},visible:{true:{".nextui-collapse-title-content-right ":{svg:{transform:"rotateZ(-90deg)"}}},false:{".nextui-collapse-title-content-right":{svg:{transform:"rotateZ(0deg)"}}}}},defaultVariants:{borderWeight:"light"}},i.xg),d=(0,i.zo)("div",{w:"100%",d:"block",ta:"left",bg:"transparent",border:"none",cursor:"pointer",outline:"none",padding:"$lg 0",variants:{disabled:{true:{cursor:"not-allowed",".nextui-collapse-title, .nextui-collapse-subtitle":{opacity:.5}}}}},i.BM),l=(0,i.zo)("div",{fontSize:"$base",lineHeight:"$lg",pb:"$lg","*:first-child":{mt:0},"*:last-child":{mb:0}}),a=(0,i.zo)("svg",{path:{stroke:"$accents5"}}),c=(0,i.zo)("div",{width:"auto",padding:"0 $sm","div + div":{borderTop:"none"},[`& ${s}:first-child`]:{borderTop:"none"},[`& ${s}:last-child`]:{borderBottom:"none"},variants:{borderWeight:{light:{$$collapseGroupBorderWidth:"$borderWeights$light"},normal:{$$collapseGroupBorderWidth:"$borderWeights$normal"},bold:{$$collapseGroupBorderWidth:"$borderWeights$bold"},extrabold:{$$collapseGroupBorderWidth:"$borderWeights$extrabold"},black:{$$collapseGroupBorderWidth:"$borderWeights$black"}},shadow:{true:{br:"$lg",border:"none",boxShadow:"$md",p:"0 $lg",bg:"$backgroundContrast"}},bordered:{true:{br:"$lg",p:"0 $lg",border:"$$collapseGroupBorderWidth solid $border"}},splitted:{true:{[`& ${s}`]:{br:"$lg",border:"none",bg:"$backgroundContrast",boxShadow:"$md",p:"0 $lg",margin:"$md 0"}}}},defaultVariants:{borderWeight:"light",shadow:!1,bordered:!1,splitted:!1}});var u=t(5893);const h=({...e})=>(0,u.jsx)(a,{role:"presentation",focusable:"false",className:"nextui-collapse-icon",width:"20",height:"20",fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,u.jsx)("path",{d:"M15.5 19l-7-7 7-7",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})});h.toString=()=>".nextui-collapse-icon";var b=n.memo(h),p=t(88),x=t(5366);const $=(0,i.zo)("div",{p:0,m:0,h:0,opacity:0,overflow:"hidden",variants:{expanded:{true:{opacity:1}}}});var g=(0,p.Z)((({isExpanded:e,delay:r,animated:t,css:o,children:i})=>{const[s,d]=(0,n.useState)(e?"auto":"0"),[l,a]=(0,n.useState)(e),c=(0,n.useRef)(null),h=(0,n.useRef)(),b=(0,n.useRef)(),p=(0,n.useRef)(),[g,m]=(0,x.Z)(c);return(0,n.useEffect)((()=>d(`${g.height}px`)),[g.height]),(0,n.useEffect)((()=>{if(e!==l)return e||(m(),d(`${g.height}px`)),h.current=window.setTimeout((()=>{a(e),clearTimeout(h.current)}),30),e?p.current=window.setTimeout((()=>{d("auto"),clearTimeout(p.current)}),r):b.current=window.setTimeout((()=>{clearTimeout(b.current)}),r/2),()=>{clearTimeout(h.current),clearTimeout(b.current),clearTimeout(p.current)}}),[e]),(0,u.jsx)($,{expanded:l,css:{height:l?s:"0",transition:t?`height ${r}ms ease 0ms,\n    opacity ${1.5*r}ms ease 0ms;`:"none",...o},children:(0,u.jsx)("div",{ref:c,className:"nextui-expand-content",children:i})})}),{isExpanded:!1,animated:!0,delay:200});const m=n.createContext({values:[]});var v=t(6391),f=t(7655),j=t(2317),w=t(663),W=t(8944),S=t(1309);const Z="nextui-collapse",B=({children:e,title:r,subtitle:t,expanded:i,shadow:a,className:c,divider:h,arrowIcon:p,showArrow:x,disabled:$,onChange:B,bordered:N,contentLeft:k,preventDefault:A,animated:C,borderWeight:E,index:T,...P})=>{const[G,_,y]=(0,v.Z)(i),{values:I,divider:V,animated:M,updateValues:z}=n.useContext(m),{isFocusVisible:F,focusProps:R}=(0,o.Fx)();r||(0,f.Z)('"title" is required.',"Collapse"),(0,n.useEffect)((()=>{G!==i&&_(i)}),[i]),(0,n.useEffect)((()=>{if(!I.length)return;const e=!!I.find((e=>e===T));_(e)}),[I.join(",")]);const D=(0,j.Me)(),U=(0,j.Me)(),L=(0,n.useMemo)((()=>x?p||(0,u.jsx)(b,{}):null),[p,x]),O=void 0===V?h:V,H=(0,n.useMemo)((()=>void 0===M?C:M),[M,C]),X=e=>{if($)return;const r=!y.current;_(r),z&&z(T,r),B&&B(e,T,r)},{bindings:q}=(0,w.ZP)((e=>{X(e)}),[W.V.Enter,W.V.Space],{disableGlobalEvent:!0,preventDefault:A}),Y=(0,n.useMemo)((()=>G?"open":"closed"),[G]);return(0,u.jsxs)(s,{tabIndex:-1,shadow:a,bordered:N,animated:H,divider:O,borderWeight:E,visible:G,"data-state":Y,className:(0,S.Z)(c,Z,`${Z}--${Y}`),...P,children:[(0,u.jsx)(d,{role:"button",tabIndex:$?-1:0,id:D,className:`${Z}-view`,"data-state":Y,disabled:$,"aria-disabled":$,"aria-expanded":G,"aria-controls":U,isFocusVisible:F,onClick:X,...R,...q,children:(0,u.jsxs)("div",{className:(0,S.Z)(`${Z}-title-container`),children:[k&&(0,u.jsx)("div",{className:`${Z}-title-content-left`,children:k}),(0,u.jsxs)("div",{className:`${Z}-title-content`,children:[n.isValidElement(r)?r:(0,u.jsx)("h3",{className:`${Z}-title`,children:r}),t&&(0,u.jsx)("div",{className:`${Z}-subtitle`,children:t})]}),(0,u.jsx)("div",{className:`${Z}-title-content-right`,children:L})]})}),(0,u.jsx)(g,{isExpanded:G,animated:H,children:(0,u.jsx)(l,{role:"region",tabIndex:-1,id:U,"aria-labelledby":D,className:`${Z}-content`,children:e})})]})};B.toString=()=>".nextui-collapse";var N=(0,p.Z)(B,{shadow:!1,divider:!0,bordered:!1,showArrow:!0,animated:!0,disabled:!1,preventDefault:!0,expanded:!1}),k=t(9644);const A=({children:e,accordion:r,animated:t,divider:o,onChange:i,...s})=>{const[d,l,a]=(0,v.Z)([]),h=(e,t)=>{const n=a.current.find((r=>r===e));if(i&&i(e,t),r)return l(t?[e]:[]);if(t){if(n)return;return l([...a.current,e])}l(a.current.filter((r=>r!==e)))},b=(0,n.useMemo)((()=>({values:d,updateValues:h,divider:o,animated:t})),[d.join(",")]),p=(0,n.useMemo)((()=>(0,k.CV)(e,[N])),[e]);return(0,u.jsx)(m.Provider,{value:b,children:(0,u.jsx)(c,{...s,children:p})})};A.toString=()=>".nextui-collapse-group";var C=(0,p.Z)(A,{accordion:!0});N.Group=C;var E=N},6678:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return a}});var n=t(5643),o=t(6979),i=t(6221),s=t(7468),d=t(5893);function l(){var e=(0,d.jsx)("span",{children:"\u2003 - \u2003\u2003"});return(0,d.jsxs)(n.ZP,{css:{width:"calc(95% - 12em)",height:"50em",margin:"2em 0em 0em 1em",display:"inline-block",verticalAlign:"top"},children:[(0,d.jsx)(n.ZP.Header,{children:(0,d.jsx)(o.Z,{css:{userSelect:"none"},h2:!0,children:"Changelog"})}),(0,d.jsx)(i.ZP,{}),(0,d.jsx)(n.ZP.Body,{children:(0,d.jsxs)(s.ZP.Group,{bordered:!0,children:[(0,d.jsxs)(s.ZP,{title:"Frontend App (This one)",children:[(0,d.jsx)(o.Z,{css:{userSelect:"none"},h4:!0,children:"Inertia Client v1.1.0 Stable"}),(0,d.jsxs)(o.Z,{css:{userSelect:"none"},children:[e," [Added] Inertia Browser        ",(0,d.jsx)("br",{}),e," [Added] Guides           ",(0,d.jsx)("br",{}),e," [Fixed] User sees css-less site for a split second  ",(0,d.jsx)("br",{}),e," [Fixed] Google Search         ",(0,d.jsx)("br",{}),e," [Removed] Sunsetted Corrosion       ",(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),(0,d.jsx)("br",{})]}),(0,d.jsx)(o.Z,{css:{userSelect:"none"},h4:!0,children:"Inertia Client v1.0.0 Stable"}),(0,d.jsxs)(o.Z,{css:{userSelect:"none"},children:[e," [Added] Next.js frontend        ",(0,d.jsx)("br",{}),e," [Added] New UI with nextUI        ",(0,d.jsx)("br",{}),e," [Added] User-accessable Analytics      ",(0,d.jsx)("br",{}),e," [Added] Switch between 3 proxies      ",(0,d.jsx)("br",{})]})]}),(0,d.jsxs)(s.ZP,{title:"Backend Server",children:[(0,d.jsx)(o.Z,{css:{userSelect:"none"},h4:!0,children:"Inertia Server v1.0.0 Stable"}),(0,d.jsxs)(o.Z,{css:{userSelect:"none"},children:[e," [Added] 3 Servers, one per proxy      ",(0,d.jsx)("br",{}),e," [Added] Support for Youtube       ",(0,d.jsx)("br",{}),e," [Added] Discord login using username and password  ",(0,d.jsx)("br",{}),e," [Added] OAuth2 Support         ",(0,d.jsx)("br",{}),e," [Added] Partial GeForceNow Support      ",(0,d.jsx)("br",{})]})]})]})})]})}var a=function(){return(0,d.jsx)(l,{})}},9093:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/info/changelog",function(){return t(6678)}])}},function(e){e.O(0,[659,774,888,179],(function(){return r=9093,e(e.s=r);var r}));var r=e.O();_N_E=r}]);