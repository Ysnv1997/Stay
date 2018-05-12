!function(e){function t(t,r,a){var i=this
return this.on("click.pjax",t,function(t){var o=e.extend({},d(r,a))
o.container||(o.container=e(this).attr("data-pjax")||i),n(t,o)})}function n(t,n,r){r=d(n,r)
var i=t.currentTarget
if("A"!==i.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element"
if(!(t.which>1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||location.protocol!==i.protocol||location.hostname!==i.hostname||i.hash&&i.href.replace(i.hash,"")===location.href.replace(location.hash,"")||i.href===location.href+"#")){var o={url:i.href,container:e(i).attr("data-pjax"),target:i},s=e.extend({},o,r),l=e.Event("pjax:click")
e(i).trigger(l,[s]),l.isDefaultPrevented()||(a(s),t.preventDefault(),e(i).trigger("pjax:clicked",[s]))}}function r(t,n,r){r=d(n,r)
var i=t.currentTarget
if("FORM"!==i.tagName.toUpperCase())throw"$.pjax.submit requires a form element"
var o={type:i.method.toUpperCase(),url:i.action,data:e(i).serializeArray(),container:e(i).attr("data-pjax"),target:i}
a(e.extend({},o,r)),t.preventDefault()}function a(t){function n(t,n){var a=e.Event(t,{relatedTarget:r})
return s.trigger(a,n),!a.isDefaultPrevented()}t=e.extend(!0,{},e.ajaxSettings,a.defaults,t),e.isFunction(t.url)&&(t.url=t.url())
var r=t.target,i=p(t.url).hash,s=t.context=f(t.container)
t.data||(t.data={}),t.data._pjax=s.selector
var l
t.beforeSend=function(e,r){return"GET"!==r.type&&(r.timeout=0),e.setRequestHeader("X-PJAX","true"),e.setRequestHeader("X-PJAX-Container",s.selector),n("pjax:beforeSend",[e,r])?(r.timeout>0&&(l=setTimeout(function(){n("pjax:timeout",[e,t])&&e.abort("timeout")},r.timeout),r.timeout=0),void(t.requestUrl=p(r.url).href)):!1},t.complete=function(e,r){l&&clearTimeout(l),n("pjax:complete",[e,r,t]),n("pjax:end",[e,t])},t.error=function(e,r,a){var i=h("",e,t),s=n("pjax:error",[e,r,a,t])
"GET"==t.type&&"abort"!==r&&s&&o(i.url)},t.success=function(r,l,u){var d="function"==typeof e.pjax.defaults.version?e.pjax.defaults.version():e.pjax.defaults.version,f=u.getResponseHeader("X-PJAX-Version"),m=h(r,u,t)
if(d&&f&&d!==f)return void o(m.url)
if(!m.contents)return void o(m.url)
a.state={id:t.id||c(),url:m.url,title:m.title,container:s.selector,fragment:t.fragment,timeout:t.timeout},(t.push||t.replace)&&window.history.replaceState(a.state,m.title,m.url),document.activeElement.blur(),m.title&&(document.title=m.title),s.html(m.contents)
var g=s.find("input[autofocus], textarea[autofocus]").last()[0]
if(g&&document.activeElement!==g&&g.focus(),E(m.scripts),"number"==typeof t.scrollTo&&e(window).scrollTop(t.scrollTo),""!==i){var v=p(m.url)
v.hash=i,a.state.url=v.href,window.history.replaceState(a.state,m.title,v.href)
var T=e(v.hash)
T.length&&e(window).scrollTop(T.offset().top)}n("pjax:success",[r,l,u,t])},a.state||(a.state={id:c(),url:window.location.href,title:document.title,container:s.selector,fragment:t.fragment,timeout:t.timeout},window.history.replaceState(a.state,document.title))
var d=a.xhr
d&&d.readyState<4&&(d.onreadystatechange=e.noop,d.abort()),a.options=t
var d=a.xhr=e.ajax(t)
return d.readyState>0&&(t.push&&!t.replace&&(v(a.state.id,s.clone().contents()),window.history.pushState(null,"",u(t.requestUrl))),n("pjax:start",[d,t]),n("pjax:send",[d,t])),a.xhr}function i(t,n){var r={url:window.location.href,push:!1,replace:!0,scrollTo:!1}
return a(e.extend(r,d(t,n)))}function o(e){window.history.replaceState(null,"","#"),window.location.replace(e)}function s(t){var n=t.state
if(n&&n.container){if(b&&S==n.url)return
if(a.state.id===n.id)return
var r=e(n.container)
if(r.length){var i,s=A[n.id]
a.state&&(i=a.state.id<n.id?"forward":"back",T(i,a.state.id,r.clone().contents()))
var l=e.Event("pjax:popstate",{state:n,direction:i})
r.trigger(l)
var c={id:n.id,url:n.url,container:r,push:!1,fragment:n.fragment,timeout:n.timeout,scrollTo:!1}
s?(r.trigger("pjax:start",[null,c]),n.title&&(document.title=n.title),r.html(s),a.state=n,r.trigger("pjax:end",[null,c])):a(c),r[0].offsetHeight}else o(location.href)}b=!1}function l(t){var n=e.isFunction(t.url)?t.url():t.url,r=t.type?t.type.toUpperCase():"GET",a=e("<form>",{method:"GET"===r?"GET":"POST",action:n,style:"display:none"})
"GET"!==r&&"POST"!==r&&a.append(e("<input>",{type:"hidden",name:"_method",value:r.toLowerCase()}))
var i=t.data
if("string"==typeof i)e.each(i.split("&"),function(t,n){var r=n.split("=")
a.append(e("<input>",{type:"hidden",name:r[0],value:r[1]}))})
else if("object"==typeof i)for(key in i)a.append(e("<input>",{type:"hidden",name:key,value:i[key]}))
e(document.body).append(a),a.submit()}function c(){return(new Date).getTime()}function u(e){return e.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function p(e){var t=document.createElement("a")
return t.href=e,t}function d(t,n){return t&&n?n.container=t:n=e.isPlainObject(t)?t:{container:t},n.container&&(n.container=f(n.container)),n}function f(t){if(t=e(t),t.length){if(""!==t.selector&&t.context===document)return t
if(t.attr("id"))return e("#"+t.attr("id"))
throw"cant get selector for pjax container!"}throw"no pjax container for "+t.selector}function m(e,t){return e.filter(t).add(e.find(t))}function g(t){return e.parseHTML(t,document,!0)}function h(t,n,r){var a={}
if(a.url=u(n.getResponseHeader("X-PJAX-URL")||r.requestUrl),/<html/i.test(t))var i=e(g(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),o=e(g(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))
else var i=o=e(g(t))
if(0===o.length)return a
if(a.title=m(i,"title").last().text(),r.fragment){if("body"===r.fragment)var s=o
else var s=m(o,r.fragment).first()
s.length&&(a.contents=s.contents(),a.title||(a.title=s.attr("title")||s.data("title")))}else/<html/i.test(t)||(a.contents=o)
return a.contents&&(a.contents=a.contents.not(function(){return e(this).is("title")}),a.contents.find("title").remove(),a.scripts=m(a.contents,"script[src]").remove(),a.contents=a.contents.not(a.scripts)),a.title&&(a.title=e.trim(a.title)),a}function E(t){if(t){var n=e("script[src]")
t.each(function(){var t=this.src,r=n.filter(function(){return this.src===t})
if(!r.length){var a=document.createElement("script")
a.type=e(this).attr("type"),a.src=e(this).attr("src"),document.head.appendChild(a)}})}}function v(e,t){for(A[e]=t,N.push(e);w.length;)delete A[w.shift()]
for(;N.length>a.defaults.maxCacheLength;)delete A[N.shift()]}function T(e,t,n){var r,a
A[t]=n,"forward"===e?(r=N,a=w):(r=w,a=N),r.push(t),(t=a.pop())&&delete A[t]}function y(){return e("meta").filter(function(){var t=e(this).attr("http-equiv")
return t&&"X-PJAX-VERSION"===t.toUpperCase()}).attr("content")}function I(){e.fn.pjax=t,e.pjax=a,e.pjax.enable=e.noop,e.pjax.disable=C,e.pjax.click=n,e.pjax.submit=r,e.pjax.reload=i,e.pjax.defaults={timeout:8e3,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:200,version:y},e(window).on("popstate.pjax",s)}function C(){e.fn.pjax=function(){return this},e.pjax=l,e.pjax.enable=I,e.pjax.disable=e.noop,e.pjax.click=e.noop,e.pjax.submit=e.noop,e.pjax.reload=function(){window.location.reload()},e(window).off("popstate.pjax",s)}var b=!0,S=window.location.href,O=window.history.state
O&&O.container&&(a.state=O),"state"in window.history&&(b=!1)
var A={},w=[],N=[]
e.inArray("state",e.event.props)<0&&e.event.props.push("state"),e.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),e.support.pjax?I():C()}(jQuery),self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{}
var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e)
switch(n){case"Object":var r={}
for(var a in e)e.hasOwnProperty(a)&&(r[a]=t.util.clone(e[a]))
return r
case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e])
for(var a in n)r[a]=n[a]
return r},insertBefore:function(e,n,r,a){a=a||t.languages
var i=a[e]
if(2==arguments.length){r=arguments[1]
for(var o in r)r.hasOwnProperty(o)&&(i[o]=r[o])
return i}var s={}
for(var l in i)if(i.hasOwnProperty(l)){if(l==n)for(var o in r)r.hasOwnProperty(o)&&(s[o]=r[o])
s[l]=i[l]}return t.languages.DFS(t.languages,function(t,n){n===a[e]&&t!=e&&(this[t]=s)}),a[e]=s},DFS:function(e,n,r){for(var a in e)e.hasOwnProperty(a)&&(n.call(e,a,e[a],r||a),"Object"===t.util.type(e[a])?t.languages.DFS(e[a],n):"Array"===t.util.type(e[a])&&t.languages.DFS(e[a],n,a))}},highlightAll:function(e,n){for(var r,a=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;r=a[i++];)t.highlightElement(r,e===!0,n)},highlightElement:function(r,a,i){for(var o,s,l=r;l&&!e.test(l.className);)l=l.parentNode
if(l&&(o=(l.className.match(e)||[,""])[1],s=t.languages[o]),s){r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,l=r.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+o)
var c=r.textContent
if(c){var u={element:r,language:o,grammar:s,code:c}
if(t.hooks.run("before-highlight",u),a&&self.Worker){var p=new Worker(t.filename)
p.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),o),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(u.element),t.hooks.run("after-highlight",u)},p.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(r),t.hooks.run("after-highlight",u)}}},highlight:function(e,r,a){var i=t.tokenize(e,r)
return n.stringify(t.util.encode(i),a)},tokenize:function(e,n){var r=t.Token,a=[e],i=n.rest
if(i){for(var o in i)n[o]=i[o]
delete n.rest}e:for(var o in n)if(n.hasOwnProperty(o)&&n[o]){var s=n[o]
s="Array"===t.util.type(s)?s:[s]
for(var l=0;l<s.length;++l){var c=s[l],u=c.inside,p=!!c.lookbehind,d=0,f=c.alias
c=c.pattern||c
for(var m=0;m<a.length;m++){var g=a[m]
if(a.length>e.length)break e
if(!(g instanceof r)){c.lastIndex=0
var h=c.exec(g)
if(h){p&&(d=h[1].length)
var E=h.index-1+d,h=h[0].slice(d),v=h.length,T=E+v,y=g.slice(0,E+1),I=g.slice(T+1),C=[m,1]
y&&C.push(y)
var b=new r(o,u?t.tokenize(h,u):h,f)
C.push(b),I&&C.push(I),Array.prototype.splice.apply(a,C)}}}}}return a},hooks:{all:{},add:function(e,n){var r=t.hooks.all
r[e]=r[e]||[],r[e].push(n)},run:function(e,n){var r=t.hooks.all[e]
if(r&&r.length)for(var a,i=0;a=r[i++];)a(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n}
if(n.stringify=function(e,r,a){if("string"==typeof e)return e
if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return n.stringify(t,r,e)}).join("")
var i={type:e.type,content:n.stringify(e.content,r,a),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:a}
if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var o="Array"===t.util.type(e.alias)?e.alias:[e.alias]
Array.prototype.push.apply(i.classes,o)}t.hooks.run("wrap",i)
var s=""
for(var l in i.attributes)s+=l+'="'+(i.attributes[l]||"")+'"'
return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+s+">"+i.content+"</"+i.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,a=n.code
self.postMessage(JSON.stringify(t.util.encode(t.tokenize(a,t.languages[r])))),self.close()},!1),self.Prism):self.Prism
var r=document.getElementsByTagName("script")
return r=r[r.length-1],r&&(t.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}()
"undefined"!=typeof module&&module.exports&&(module.exports=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').+?\1/gi,inside:{"attr-name":{pattern:/^\s*style/gi,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/gi,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag)),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,"function":/(?!\d)[a-z0-9_$]+(?=\()/gi}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}}),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind:!0}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t,n=0;t=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(t,e.grammar,"php"))
e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g})),Prism.languages.insertBefore("php","variable",{"this":/\$this/g,global:/\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,scope:{pattern:/\b[\w\\]+::/g,inside:{keyword:/(static|self|parent)/,punctuation:/(::|\\)/}}}),Prism.languages.c=Prism.languages.extend("clike",{string:/("|')([^\n\\\1]|\\.|\\\r*\n)*?\1/g,keyword:/\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,operator:/[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\//g}),Prism.languages.insertBefore("c","string",{property:{pattern:/((^|\n)\s*)#\s*[a-z]+([^\n\\]|\\.|\\\r*\n)*/gi,lookbehind:!0,inside:{string:{pattern:/(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/g,lookbehind:!0}}}}),delete Prism.languages.c["class-name"],delete Prism.languages.c["boolean"],Prism.languages.cpp=Prism.languages.extend("c",{keyword:/\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,"boolean":/\b(true|false)\b/g,operator:/[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g}),Prism.languages.insertBefore("cpp","keyword",{"class-name":{pattern:/(class\s+)[a-z0-9_]+/gi,lookbehind:!0}}),Prism.languages.python={comment:{pattern:/(^|[^\\])#.*?(\r?\n|$)/g,lookbehind:!0},string:/"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/g,keyword:/\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,"boolean":/\b(True|False)\b/g,number:/\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/gi,operator:/[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g},Prism.languages.sql={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,lookbehind:!0},string:{pattern:/(^|[^@])("|')(\\?[\s\S])*?\2/g,lookbehind:!0},variable:/@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/g,"function":/\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/gi,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,"boolean":/\b(?:TRUE|FALSE|NULL)\b/gi,number:/\b-?(0x)?\d*\.?[\da-f]+\b/g,operator:/\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//gi,punctuation:/[;[\]()`,.]/g},Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode
if(t&&/pre/i.test(t.nodeName)&&-1!==t.className.indexOf("line-numbers")){var n,r=1+e.code.split("\n").length
lines=Array(r),lines=lines.join("<span></span>"),n=document.createElement("span"),n.className="line-numbers-rows",n.innerHTML=lines,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(n)}}),function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.NProgress=t()}(this,function(){function e(e,t,n){return t>e?t:e>n?n:e}function t(e){return 100*(-1+e)}function n(e,n,r){var a
return a="translate3d"===c.positionUsing?{transform:"translate3d("+t(e)+"%,0,0)"}:"translate"===c.positionUsing?{transform:"translate("+t(e)+"%,0)"}:{"margin-left":t(e)+"%"},a.transition="all "+n+"ms "+r,a}function r(e,t){var n="string"==typeof e?e:o(e)
return n.indexOf(" "+t+" ")>=0}function a(e,t){var n=o(e),a=n+t
r(n,t)||(e.className=a.substring(1))}function i(e,t){var n,a=o(e)
r(e,t)&&(n=a.replace(" "+t+" "," "),e.className=n.substring(1,n.length-1))}function o(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function s(e){e&&e.parentNode&&e.parentNode.removeChild(e)}var l={}
l.version="0.2.0"
var c=l.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'}
l.configure=function(e){var t,n
for(t in e)n=e[t],void 0!==n&&e.hasOwnProperty(t)&&(c[t]=n)
return this},l.status=null,l.set=function(t){var r=l.isStarted()
t=e(t,c.minimum,1),l.status=1===t?null:t
var a=l.render(!r),i=a.querySelector(c.barSelector),o=c.speed,s=c.easing
return a.offsetWidth,u(function(e){""===c.positionUsing&&(c.positionUsing=l.getPositioningCSS()),p(i,n(t,o,s)),1===t?(p(a,{transition:"none",opacity:1}),a.offsetWidth,setTimeout(function(){p(a,{transition:"all "+o+"ms linear",opacity:0}),setTimeout(function(){l.remove(),e()},o)},o)):setTimeout(e,o)}),this},l.isStarted=function(){return"number"==typeof l.status},l.start=function(){l.status||l.set(0)
var e=function(){setTimeout(function(){l.status&&(l.trickle(),e())},c.trickleSpeed)}
return c.trickle&&e(),this},l.done=function(e){return e||l.status?l.inc(.3+.5*Math.random()).set(1):this},l.inc=function(t){var n=l.status
return n?("number"!=typeof t&&(t=(1-n)*e(Math.random()*n,.1,.95)),n=e(n+t,0,.994),l.set(n)):l.start()},l.trickle=function(){return l.inc(Math.random()*c.trickleRate)},function(){var e=0,t=0
l.promise=function(n){return n&&"resolved"!==n.state()?(0===t&&l.start(),e++,t++,n.always(function(){t--,0===t?(e=0,l.done()):l.set((e-t)/e)}),this):this}}(),l.render=function(e){if(l.isRendered())return document.getElementById("nprogress")
a(document.documentElement,"nprogress-busy")
var n=document.createElement("div")
n.id="nprogress",n.innerHTML=c.template
var r,i=n.querySelector(c.barSelector),o=e?"-100":t(l.status||0),u=document.querySelector(c.parent)
return p(i,{transition:"all 0 linear",transform:"translate3d("+o+"%,0,0)"}),c.showSpinner||(r=n.querySelector(c.spinnerSelector),r&&s(r)),u!=document.body&&a(u,"nprogress-custom-parent"),u.appendChild(n),n},l.remove=function(){i(document.documentElement,"nprogress-busy"),i(document.querySelector(c.parent),"nprogress-custom-parent")
var e=document.getElementById("nprogress")
e&&s(e)},l.isRendered=function(){return!!document.getElementById("nprogress")},l.getPositioningCSS=function(){var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":""
return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"}
var u=function(){function e(){var n=t.shift()
n&&n(e)}var t=[]
return function(n){t.push(n),1==t.length&&e()}}(),p=function(){function e(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(e,t){return t.toUpperCase()})}function t(e){var t=document.body.style
if(e in t)return e
for(var n,r=a.length,i=e.charAt(0).toUpperCase()+e.slice(1);r--;)if(n=a[r]+i,n in t)return n
return e}function n(n){return n=e(n),i[n]||(i[n]=t(n))}function r(e,t,r){t=n(t),e.style[t]=r}var a=["Webkit","O","Moz","ms"],i={}
return function(e,t){var n,a,i=arguments
if(2==i.length)for(n in t)a=t[n],void 0!==a&&t.hasOwnProperty(n)&&r(e,n,a)
else r(e,i[1],i[2])}}()
return l}),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(e){var t,n,r,a,i,o,s="Close",l="BeforeClose",c="AfterClose",u="BeforeAppend",p="MarkupParse",d="Open",f="Change",m="mfp",g="."+m,h="mfp-ready",E="mfp-removing",v="mfp-prevent-close",T=function(){},y=!!window.jQuery,I=e(window),C=function(e,n){t.ev.on(m+e+g,n)},b=function(t,n,r,a){var i=document.createElement("div")
return i.className="mfp-"+t,r&&(i.innerHTML=r),a?n&&n.appendChild(i):(i=e(i),n&&i.appendTo(n)),i},S=function(n,r){t.ev.triggerHandler(m+n,r),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(r)?r:[r]))},O=function(n){return n===o&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),o=n),t.currTemplate.closeBtn},A=function(){e.magnificPopup.instance||(t=new T,t.init(),e.magnificPopup.instance=t)},w=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"]
if(void 0!==e.transition)return!0
for(;t.length;)if(t.pop()+"Transition"in e)return!0
return!1}
T.prototype={constructor:T,init:function(){var n=navigator.appVersion
t.isLowIE=t.isIE8=document.all&&!document.addEventListener,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=w(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),r=e(document),t.popupsCache={}},open:function(n){var a
if(n.isObj===!1){t.items=n.items.toArray(),t.index=0
var o,s=n.items
for(a=0;a<s.length;a++)if(o=s[a],o.parsed&&(o=o.el[0]),o===n.el[0]){t.index=a
break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0
if(t.isOpen)return void t.updateItemHTML()
t.types=[],i="",n.mainEl&&n.mainEl.length?t.ev=n.mainEl.eq(0):t.ev=r,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=b("bg").on("click"+g,function(){t.close()}),t.wrap=b("wrap").attr("tabindex",-1).on("click"+g,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=b("container",t.wrap)),t.contentContainer=b("content"),t.st.preloader&&(t.preloader=b("preloader",t.container,t.st.tLoading))
var l=e.magnificPopup.modules
for(a=0;a<l.length;a++){var c=l[a]
c=c.charAt(0).toUpperCase()+c.slice(1),t["init"+c].call(t)}S("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(C(p,function(e,t,n,r){n.close_replaceWith=O(r.type)}),i+=" mfp-close-btn-in"):t.wrap.append(O())),t.st.alignTop&&(i+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:I.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:r.height(),position:"absolute"}),t.st.enableEscapeKey&&r.on("keyup"+g,function(e){27===e.keyCode&&t.close()}),I.on("resize"+g,function(){t.updateSize()}),t.st.closeOnContentClick||(i+=" mfp-auto-cursor"),i&&t.wrap.addClass(i)
var u=t.wH=I.height(),f={}
if(t.fixedContentPos&&t._hasScrollBar(u)){var m=t._getScrollbarSize()
m&&(f.marginRight=m)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):f.overflow="hidden")
var E=t.st.mainClass
return t.isIE7&&(E+=" mfp-ie7"),E&&t._addClassToMFP(E),t.updateItemHTML(),S("BuildControls"),e("html").css(f),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||e(document.body)),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(h),t._setFocus()):t.bgOverlay.addClass(h),r.on("focusin"+g,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),S(d),n},close:function(){t.isOpen&&(S(l),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(E),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){S(s)
var n=E+" "+h+" "
if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var a={marginRight:""}
t.isIE7?e("body, html").css("overflow",""):a.overflow="",e("html").css(a)}r.off("keyup"+g+" focusin"+g),t.ev.off(g),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t.st.autoFocusLast&&t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,S(c)},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,r=window.innerHeight*n
t.wrap.css("height",r),t.wH=r}else t.wH=e||I.height()
t.fixedContentPos||t.wrap.css("height",t.wH),S("Resize")},updateItemHTML:function(){var n=t.items[t.index]
t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index))
var r=n.type
if(S("BeforeChange",[t.currItem?t.currItem.type:"",r]),t.currItem=n,!t.currTemplate[r]){var i=t.st[r]?t.st[r].markup:!1
S("FirstMarkupParse",i),i?t.currTemplate[r]=e(i):t.currTemplate[r]=!0}a&&a!==n.type&&t.container.removeClass("mfp-"+a+"-holder")
var o=t["get"+r.charAt(0).toUpperCase()+r.slice(1)](n,t.currTemplate[r])
t.appendContent(o,r),n.preloaded=!0,S(f,n),a=n.type,t.container.prepend(t.contentContainer),S("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[n]===!0?t.content.find(".mfp-close").length||t.content.append(O()):t.content=e:t.content="",S(u),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var r,a=t.items[n]
if(a.tagName?a={el:e(a)}:(r=a.type,a={data:a,src:a.src}),a.el){for(var i=t.types,o=0;o<i.length;o++)if(a.el.hasClass("mfp-"+i[o])){r=i[o]
break}a.src=a.el.attr("data-mfp-src"),a.src||(a.src=a.el.attr("href"))}return a.type=r||t.st.type||"inline",a.index=n,a.parsed=!0,t.items[n]=a,S("ElementParse",a),t.items[n]},addGroup:function(e,n){var r=function(r){r.mfpEl=this,t._openClick(r,e,n)}
n||(n={})
var a="click.magnificPopup"
n.mainEl=e,n.items?(n.isObj=!0,e.off(a).on(a,r)):(n.isObj=!1,n.delegate?e.off(a).on(a,n.delegate,r):(n.items=e,e.off(a).on(a,r)))},_openClick:function(n,r,a){var i=void 0!==a.midClick?a.midClick:e.magnificPopup.defaults.midClick
if(i||!(2===n.which||n.ctrlKey||n.metaKey||n.altKey||n.shiftKey)){var o=void 0!==a.disableOn?a.disableOn:e.magnificPopup.defaults.disableOn
if(o)if(e.isFunction(o)){if(!o.call(t))return!0}else if(I.width()<o)return!0
n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),a.el=e(n.mfpEl),a.delegate&&(a.items=r.find(a.delegate)),t.open(a)}},updateStatus:function(e,r){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),r||"loading"!==e||(r=t.st.tLoading)
var a={status:e,text:r}
S("UpdateStatus",a),e=a.status,r=a.text,t.preloader.html(r),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(v)){var r=t.st.closeOnContentClick,a=t.st.closeOnBgClick
if(r&&a)return!0
if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0
if(n===t.content[0]||e.contains(t.content[0],n)){if(r)return!0}else if(a&&e.contains(document,n))return!0
return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?r.height():document.body.scrollHeight)>(e||I.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){return n.target===t.wrap[0]||e.contains(t.wrap[0],n.target)?void 0:(t._setFocus(),!1)},_parseMarkup:function(t,n,r){var a
r.data&&(n=e.extend(r.data,n)),S(p,[t,n,r]),e.each(n,function(n,r){if(void 0===r||r===!1)return!0
if(a=n.split("_"),a.length>1){var i=t.find(g+"-"+a[0])
if(i.length>0){var o=a[1]
"replaceWith"===o?i[0]!==r[0]&&i.replaceWith(r):"img"===o?i.is("img")?i.attr("src",r):i.replaceWith(e("<img>").attr("src",r).attr("class",i.attr("class"))):i.attr(a[1],r)}}else t.find(g+"-"+n).html(r)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div")
e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:T.prototype,modules:[],open:function(t,n){return A(),t=t?e.extend(!0,{},t):{},t.isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},e.fn.magnificPopup=function(n){A()
var r=e(this)
if("string"==typeof n)if("open"===n){var a,i=y?r.data("magnificPopup"):r[0].magnificPopup,o=parseInt(arguments[1],10)||0
i.items?a=i.items[o]:(a=r,i.delegate&&(a=a.find(i.delegate)),a=a.eq(o)),t._openClick({mfpEl:a},r,i)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1))
else n=e.extend(!0,{},n),y?r.data("magnificPopup",n):r[0].magnificPopup=n,t.addGroup(r,n)
return r}
var N,R,P,L="inline",k=function(){P&&(R.after(P.addClass(N)).detach(),P=null)}
e.magnificPopup.registerModule(L,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(L),C(s+"."+L,function(){k()})},getInline:function(n,r){if(k(),n.src){var a=t.st.inline,i=e(n.src)
if(i.length){var o=i[0].parentNode
o&&o.tagName&&(R||(N=a.hiddenClass,R=b(N),N="mfp-"+N),P=i.after(R).detach().removeClass(N)),t.updateStatus("ready")}else t.updateStatus("error",a.tNotFound),i=e("<div>")
return n.inlineElement=i,i}return t.updateStatus("ready"),t._parseMarkup(r,{},n),r}}})
var x,M="ajax",D=function(){x&&e(document.body).removeClass(x)},U=function(){D(),t.req&&t.req.abort()}
e.magnificPopup.registerModule(M,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(M),x=t.st.ajax.cursor,C(s+"."+M,U),C("BeforeChange."+M,U)},getAjax:function(n){x&&e(document.body).addClass(x),t.updateStatus("loading")
var r=e.extend({url:n.src,success:function(r,a,i){var o={data:r,xhr:i}
S("ParseAjax",o),t.appendContent(e(o.data),M),n.finished=!0,D(),t._setFocus(),setTimeout(function(){t.wrap.addClass(h)},16),t.updateStatus("ready"),S("AjaxContentAdded")},error:function(){D(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings)
return t.req=e.ajax(r),""}}})
var B,_=function(n){if(n.data&&void 0!==n.data.title)return n.data.title
var r=t.st.image.titleSrc
if(r){if(e.isFunction(r))return r.call(t,n)
if(n.el)return n.el.attr(r)||""}return""}
e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var n=t.st.image,r=".image"
t.types.push("image"),C(d+r,function(){"image"===t.currItem.type&&n.cursor&&e(document.body).addClass(n.cursor)}),C(s+r,function(){n.cursor&&e(document.body).removeClass(n.cursor),I.off("resize"+g)}),C("Resize"+r,t.resizeImage),t.isLowIE&&C("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem
if(e&&e.img&&t.st.image.verticalFit){var n=0
t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,B&&clearInterval(B),e.isCheckingImgSize=!1,S("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,r=e.img[0],a=function(i){B&&clearInterval(B),B=setInterval(function(){return r.naturalWidth>0?void t._onImageHasSize(e):(n>200&&clearInterval(B),n++,void(3===n?a(10):40===n?a(50):100===n&&a(500)))},i)}
a(1)},getImage:function(n,r){var a=0,i=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,S("ImageLoadComplete")):(a++,200>a?setTimeout(i,100):o()))},o=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=r.find(".mfp-img")
if(l.length){var c=document.createElement("img")
c.className="mfp-img",n.el&&n.el.find("img").length&&(c.alt=n.el.find("img").attr("alt")),n.img=e(c).on("load.mfploader",i).on("error.mfploader",o),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),c=n.img[0],c.naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(r,{title:_(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(B&&clearInterval(B),n.loadError?(r.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(r.removeClass("mfp-loading"),t.updateStatus("ready")),r):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,r.addClass("mfp-loading"),t.findImageSize(n)),r)}}})
var j,H=function(){return void 0===j&&(j=void 0!==document.createElement("p").style.MozTransform),j}
e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,r=".zoom"
if(n.enabled&&t.supportsTransition){var a,i,o=n.duration,c=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),r="all "+n.duration/1e3+"s "+n.easing,a={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},i="transition"
return a["-webkit-"+i]=a["-moz-"+i]=a["-o-"+i]=a[i]=r,t.css(a),t},u=function(){t.content.css("visibility","visible")}
C("BuildControls"+r,function(){if(t._allowZoom()){if(clearTimeout(a),t.content.css("visibility","hidden"),e=t._getItemToZoom(),!e)return void u()
i=c(e),i.css(t._getOffset()),t.wrap.append(i),a=setTimeout(function(){i.css(t._getOffset(!0)),a=setTimeout(function(){u(),setTimeout(function(){i.remove(),e=i=null,S("ZoomAnimationEnded")},16)},o)},16)}}),C(l+r,function(){if(t._allowZoom()){if(clearTimeout(a),t.st.removalDelay=o,!e){if(e=t._getItemToZoom(),!e)return
i=c(e)}i.css(t._getOffset(!0)),t.wrap.append(i),t.content.css("visibility","hidden"),setTimeout(function(){i.css(t._getOffset())},16)}}),C(s+r,function(){t._allowZoom()&&(u(),i&&i.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(n){var r
r=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem)
var a=r.offset(),i=parseInt(r.css("padding-top"),10),o=parseInt(r.css("padding-bottom"),10)
a.top-=e(window).scrollTop()-i
var s={width:r.width(),height:(y?r.innerHeight():r[0].offsetHeight)-o-i}
return H()?s["-moz-transform"]=s.transform="translate("+a.left+"px,"+a.top+"px)":(s.left=a.left,s.top=a.top),s}}})
var F="iframe",z="//about:blank",W=function(e){if(t.currTemplate[F]){var n=t.currTemplate[F].find("iframe")
n.length&&(e||(n[0].src=z),t.isIE8&&n.css("display",e?"block":"none"))}}
e.magnificPopup.registerModule(F,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(F),C("BeforeChange",function(e,t,n){t!==n&&(t===F?W():n===F&&W(!0))}),C(s+"."+F,function(){W()})},getIframe:function(n,r){var a=n.src,i=t.st.iframe
e.each(i.patterns,function(){return a.indexOf(this.index)>-1?(this.id&&(a="string"==typeof this.id?a.substr(a.lastIndexOf(this.id)+this.id.length,a.length):this.id.call(this,a)),a=this.src.replace("%id%",a),!1):void 0})
var o={}
return i.srcAction&&(o[i.srcAction]=a),t._parseMarkup(r,o,n),t.updateStatus("ready"),r}}})
var G=function(e){var n=t.items.length
return e>n-1?e-n:0>e?n+e:e},Y=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)}
e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,a=".mfp-gallery"
return t.direction=!0,n&&n.enabled?(i+=" mfp-gallery",C(d+a,function(){n.navigateByImgClick&&t.wrap.on("click"+a,".mfp-img",function(){return t.items.length>1?(t.next(),!1):void 0}),r.on("keydown"+a,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),C("UpdateStatus"+a,function(e,n){n.text&&(n.text=Y(n.text,t.currItem.index,t.items.length))}),C(p+a,function(e,r,a,i){var o=t.items.length
a.counter=o>1?Y(n.tCounter,i.index,o):""}),C("BuildControls"+a,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var r=n.arrowMarkup,a=t.arrowLeft=e(r.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(v),i=t.arrowRight=e(r.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(v)
a.click(function(){t.prev()}),i.click(function(){t.next()}),t.container.append(a.add(i))}}),C(f+a,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),void C(s+a,function(){r.off(a),t.wrap.off("click"+a),t.arrowRight=t.arrowLeft=null})):!1},next:function(){t.direction=!0,t.index=G(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=G(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,r=Math.min(n[0],t.items.length),a=Math.min(n[1],t.items.length)
for(e=1;e<=(t.direction?a:r);e++)t._preloadItem(t.index+e)
for(e=1;e<=(t.direction?r:a);e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=G(n),!t.items[n].preloaded){var r=t.items[n]
r.parsed||(r=t.parseEl(n)),S("LazyLoad",r),"image"===r.type&&(r.img=e('<img class="mfp-img" />').on("load.mfploader",function(){r.hasSize=!0}).on("error.mfploader",function(){r.hasSize=!0,r.loadError=!0,S("LazyLoadError",r)}).attr("src",r.src)),r.preloaded=!0}}}})
var K="retina"
e.magnificPopup.registerModule(K,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio
n=isNaN(n)?n():n,n>1&&(C("ImageHasSize."+K,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),C("ElementParse."+K,function(t,r){r.src=e.replaceSrc(r,n)}))}}}}),A()})
