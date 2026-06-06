const v=`
:host {
	display: block;
	font-family: var(--sequoia-font-family, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
	color: var(--sequoia-fg-color, #1f2937);
	line-height: 1.5;
}

* {
	box-sizing: border-box;
}

.sequoia-comments-container {
	max-width: 100%;
}

.sequoia-loading,
.sequoia-error,
.sequoia-empty,
.sequoia-warning {
	padding: 1rem;
	border-radius: var(--sequoia-border-radius, 8px);
	text-align: center;
}

.sequoia-loading {
	background: var(--sequoia-bg-color, #ffffff);
	border: 1px solid var(--sequoia-border-color, #e5e7eb);
	color: var(--sequoia-secondary-color, #6b7280);
}

.sequoia-loading-spinner {
	display: inline-block;
	width: 1.25rem;
	height: 1.25rem;
	border: 2px solid var(--sequoia-border-color, #e5e7eb);
	border-top-color: var(--sequoia-accent-color, #2563eb);
	border-radius: 50%;
	animation: sequoia-spin 0.8s linear infinite;
	margin-right: 0.5rem;
	vertical-align: middle;
}

@keyframes sequoia-spin {
	to { transform: rotate(360deg); }
}

.sequoia-error {
	background: #fef2f2;
	border: 1px solid #fecaca;
	color: #dc2626;
}

.sequoia-warning {
	background: #fffbeb;
	border: 1px solid #fde68a;
	color: #d97706;
}

.sequoia-empty {
	background: var(--sequoia-bg-color, #ffffff);
	border: 1px solid var(--sequoia-border-color, #e5e7eb);
	color: var(--sequoia-secondary-color, #6b7280);
}

.sequoia-comments-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 0.75rem;
}

.sequoia-comments-title {
	font-size: 1.125rem;
	font-weight: 600;
	margin: 0;
}

.sequoia-reply-button {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: var(--sequoia-border-radius, 15px);
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	text-decoration: none;
	transition: background-color 0.15s ease;
	margin-left:10px;
}

.sequoia-reply-bluesky {
	background: var(--sequoia-accent-color, #2563eb);
	color: #ffffff;
}

.sequoia-reply-blacksky {
	background: var(--sequoia-accent-color, #6060E9);
	color: #ffffff;
}

.sequoia-reply-bluesky:hover {
	background: color-mix(in srgb, var(--sequoia-accent-color, #2563eb) 85%, black);
}

.sequoia-reply-blacksky:hover {
	background: color-mix(in srgb, var(--sequoia-accent-color, #5252c3) 85%, black);
}

.sequoia-reply-button svg {
	width: 1rem;
	height: 1rem;
}

.sequoia-comments-list {
	display: flex;
	flex-direction: column;
}

.sequoia-thread {
	border-top: 1px solid var(--sequoia-border-color, #e5e7eb);
	padding-bottom: 1rem;
}

.sequoia-thread + .sequoia-thread {
	margin-top: 0.5rem;
}

.sequoia-thread:last-child {
	border-bottom: 1px solid var(--sequoia-border-color, #e5e7eb);
}

.sequoia-comment {
	display: flex;
	gap: 0.75rem;
	padding-top: 1rem;
}

.sequoia-comment-avatar-column {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-shrink: 0;
	width: 2.5rem;
	position: relative;
}

.sequoia-comment-avatar {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	background: var(--sequoia-border-color, #e5e7eb);
	object-fit: cover;
	flex-shrink: 0;
	position: relative;
	z-index: 1;
}

.sequoia-comment-avatar-placeholder {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	background: var(--sequoia-border-color, #e5e7eb);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	color: var(--sequoia-secondary-color, #6b7280);
	font-weight: 600;
	font-size: 1rem;
	position: relative;
	z-index: 1;
}

.sequoia-thread-line {
	position: absolute;
	top: 2.5rem;
	bottom: calc(-1rem - 0.5rem);
	left: 50%;
	transform: translateX(-50%);
	width: 2px;
	background: var(--sequoia-border-color, #e5e7eb);
}

.sequoia-comment-content {
	flex: 1;
	min-width: 0;
}

.sequoia-comment-header {
	display: flex;
	align-items: baseline;
	gap: 0.5rem;
	margin-bottom: 0.25rem;
	flex-wrap: wrap;
}

.sequoia-comment-author {
	font-weight: 600;
	color: var(--sequoia-fg-color, #1f2937);
	text-decoration: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.sequoia-comment-author:hover {
	color: var(--sequoia-accent-color, #2563eb);
}

.sequoia-comment-handle {
	font-size: 0.875rem;
	color: var(--sequoia-secondary-color, #6b7280);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.sequoia-comment-handle::after {
  content: "·";
	margin-left: 0.5rem;
}

.sequoia-comment-time {
	font-size: 0.875rem;
	color: var(--sequoia-secondary-color, #6b7280);
	flex-shrink: 0;
}

.sequoia-comment-text {
	margin: 0;
	white-space: pre-wrap;
	word-wrap: break-word;
}

.sequoia-comment-text a {
	color: var(--sequoia-accent-color, #2563eb);
	text-decoration: none;
}

.sequoia-comment-text a:hover {
	text-decoration: underline;
}

.sequoia-bsky-logo {
	width: 1rem;
	height: 1rem;
}

.sequoia-quotes-section {
	margin-top: 1.75rem;
}

.sequoia-quotes-header {
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--sequoia-secondary-color, #6b7280);
	letter-spacing: 0.05em;
	text-transform: uppercase;
	margin: 0;
	padding-bottom: 0.75rem;
	border-bottom: 1px solid var(--sequoia-border-color, #e5e7eb);
}

a.sequoia-comment-time {
	text-decoration: none;
	color: var(--sequoia-secondary-color, #6b7280);
}

a.sequoia-comment-time:hover {
	text-decoration: underline;
}
`;function q(s){const e=new Date(s),r=new Date().getTime()-e.getTime(),o=Math.floor(r/1e3),a=Math.floor(o/60),n=Math.floor(a/60),i=Math.floor(n/24),l=Math.floor(i/7),d=Math.floor(i/30),u=Math.floor(i/365);return o<60?"just now":a<60?`${a}m ago`:n<24?`${n}h ago`:i<7?`${i}d ago`:l<4?`${l}w ago`:d<12?`${d}mo ago`:`${u}y ago`}function c(s){const e=document.createElement("div");return e.textContent=s,e.innerHTML}function w(s,e){if(!e||e.length===0)return c(s);const t=new TextEncoder,r=new TextDecoder,o=t.encode(s),a=[...e].sort((l,d)=>l.index.byteStart-d.index.byteStart);let n="",i=0;for(const l of a){const{byteStart:d,byteEnd:u}=l.index;if(d>i){const y=o.slice(i,d);n+=c(r.decode(y))}const h=o.slice(d,u),p=r.decode(h),m=l.features[0];m?m.$type==="app.bsky.richtext.facet#link"?n+=`<a href="${c(m.uri)}" target="_blank" rel="noopener noreferrer">${c(p)}</a>`:m.$type==="app.bsky.richtext.facet#mention"?n+=`<a href="https://bsky.app/profile/${c(m.did)}" target="_blank" rel="noopener noreferrer">${c(p)}</a>`:m.$type==="app.bsky.richtext.facet#tag"?n+=`<a href="https://bsky.app/hashtag/${c(m.tag)}" target="_blank" rel="noopener noreferrer">${c(p)}</a>`:n+=c(p):n+=c(p),i=u}if(i<o.length){const l=o.slice(i);n+=c(r.decode(l))}return n}function k(s){const e=s.trim().split(/\s+/);return e.length>=2?(e[0][0]+e[1][0]).toUpperCase():s.substring(0,2).toUpperCase()}function b(s){const e=s.match(/^at:\/\/([^/]+)\/([^/]+)\/(.+)$/);return e?{did:e[1],collection:e[2],rkey:e[3]}:null}async function x(s){let e;if(s.startsWith("did:plc:")){const t=`https://plc.directory/${s}`,r=await fetch(t);if(!r.ok)throw new Error(`Could not fetch DID document: ${r.status}`);e=(await r.json()).service?.find(n=>n.id==="#atproto_pds"||n.type==="AtprotoPersonalDataServer")?.serviceEndpoint}else if(s.startsWith("did:web:")){const r=`https://${s.replace("did:web:","")}/.well-known/did.json`,o=await fetch(r);if(!o.ok)throw new Error(`Could not fetch DID document: ${o.status}`);e=(await o.json()).service?.find(i=>i.id==="#atproto_pds"||i.type==="AtprotoPersonalDataServer")?.serviceEndpoint}else throw new Error(`Unsupported DID method: ${s}`);if(!e)throw new Error("Could not find PDS URL for user");return e}async function $(s,e,t){const r=await x(s),o=new URL(`${r}/xrpc/com.atproto.repo.getRecord`);o.searchParams.set("repo",s),o.searchParams.set("collection",e),o.searchParams.set("rkey",t);const a=await fetch(o.toString());if(!a.ok)throw new Error(`Failed to fetch record: ${a.status}`);return(await a.json()).value}async function C(s){const e=b(s);if(!e)throw new Error(`Invalid AT URI: ${s}`);return $(e.did,e.collection,e.rkey)}async function L(s,e=6){const t=new URL("https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread");t.searchParams.set("uri",s),t.searchParams.set("depth",e.toString());const r=await fetch(t.toString());if(!r.ok)throw new Error(`Failed to fetch post thread: ${r.status}`);const o=await r.json();if(o.thread.$type!=="app.bsky.feed.defs#threadViewPost")throw new Error("Post not found or blocked");return o.thread}function g(s){const e=b(s);if(!e)throw new Error(`Invalid post URI: ${s}`);return`https://bsky.app/profile/${e.did}/post/${e.rkey}`}function H(s){const e=b(s);if(!e)throw new Error(`Invalid post URI: ${s}`);return`https://blacksky.community/profile/${e.did}/post/${e.rkey}`}function f(s){return s?.$type==="app.bsky.feed.defs#threadViewPost"}async function T(s){if(s.startsWith("at://"))return s;const e=s.match(/bsky\.app\/profile\/([^/?#]+)\/post\/([^/?#]+)/);if(!e)throw new Error(`Cannot parse Bluesky URL: ${s}`);const[,t,r]=e;let o=t;if(!t.startsWith("did:")){const a=new URL("https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle");a.searchParams.set("handle",t);const n=await fetch(a.toString());if(!n.ok)throw new Error(`Failed to resolve handle: ${n.status}`);o=(await n.json()).did}return`at://${o}/app.bsky.feed.post/${r}`}async function E(s){const e=[];let t;do{const r=new URL("https://public.api.bsky.app/xrpc/app.bsky.feed.getQuotes");r.searchParams.set("uri",s),r.searchParams.set("limit","100"),t&&r.searchParams.set("cursor",t);const o=await fetch(r.toString());if(!o.ok)throw new Error(`Failed to fetch quotes: ${o.status}`);const a=await o.json();e.push(...a.posts??[]),t=a.cursor}while(t);return e}const M=`<svg class="sequoia-bsky-logo" viewBox="0 0 600 530" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
</svg>`,U='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.0620117 0.348442 87.9941 74.9653"><path d="M41.9565 74.9643L24.0161 74.9653L41.9565 74.9643ZM63.8511 74.9653H45.9097L63.8501 74.9643V57.3286H63.8511V74.9653ZM45.9097 44.5893C45.9099 49.2737 49.7077 53.0707 54.3921 53.0707H63.8501V57.3286H54.3921C49.7077 57.3286 45.9099 61.1257 45.9097 65.81V74.9643H41.9565V65.81C41.9563 61.1258 38.1593 57.3287 33.4751 57.3286H24.0161V53.0707H33.4741C38.1587 53.0707 41.9565 49.2729 41.9565 44.5883V35.1303H45.9097V44.5893ZM63.8511 53.0707H63.8501V35.1303H63.8511V53.0707Z" fill="white"></path><path d="M52.7272 9.83198C49.4148 13.1445 49.4148 18.5151 52.7272 21.8275L59.4155 28.5158L56.4051 31.5262L49.7169 24.8379C46.4044 21.5254 41.0338 21.5254 37.7213 24.8379L31.2482 31.3111L28.4527 28.5156L34.9259 22.0424C38.2383 18.7299 38.2383 13.3594 34.9259 10.0469L28.2378 3.35883L31.2482 0.348442L37.9365 7.03672C41.2489 10.3492 46.6195 10.3492 49.932 7.03672L56.6203 0.348442L59.4155 3.14371L52.7272 9.83198Z" fill="white"/><path d="M24.3831 23.2335C23.1706 27.7584 25.8559 32.4095 30.3808 33.6219L39.5172 36.07L38.4154 40.182L29.2793 37.734C24.7544 36.5215 20.1033 39.2068 18.8909 43.7317L16.5215 52.5745L12.7028 51.5513L15.0721 42.7088C16.2846 38.1839 13.5993 33.5328 9.07434 32.3204L-0.0620117 29.8723L1.03987 25.76L10.1762 28.2081C14.7011 29.4206 19.3522 26.7352 20.5647 22.2103L23.0127 13.074L26.8311 14.0971L24.3831 23.2335Z" fill="white"/><path d="M67.3676 22.0297C68.5801 26.5546 73.2311 29.2399 77.756 28.0275L86.8923 25.5794L87.9941 29.6914L78.8578 32.1394C74.3329 33.3519 71.6476 38.003 72.86 42.5279L75.2294 51.3707L71.411 52.3938L69.0417 43.5513C67.8293 39.0264 63.1782 36.3411 58.6533 37.5535L49.5169 40.0016L48.415 35.8894L57.5514 33.4413C62.0763 32.2288 64.7616 27.5778 63.5492 23.0528L61.1011 13.9165L64.9195 12.8934L67.3676 22.0297Z" fill="white"/></svg>',P=typeof HTMLElement<"u"?HTMLElement:class{};class S extends P{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");e.appendChild(t),t.innerText=v;const r=document.createElement("div");e.appendChild(r),r.className="sequoia-comments-container",r.part="container",this.commentsContainer=r,this.state={type:"loading"},this.abortController=null}static get observedAttributes(){return["post-uri","document-uri","depth","hide"]}connectedCallback(){this.initialized=!0,this.render(),this.loadComments()}disconnectedCallback(){this.abortController?.abort()}attributeChangedCallback(){this.initialized&&this.loadComments()}get documentUri(){const e=this.getAttribute("document-uri");return e||(document.querySelector('link[rel="site.standard.document"]')?.href??null)}get depth(){const e=this.getAttribute("depth");return e?parseInt(e,10):6}get hide(){return this.getAttribute("hide")==="auto"}async loadComments(){this.abortController?.abort(),this.abortController=new AbortController,this.state={type:"loading"},this.render();try{const e=this.getAttribute("post-uri");let t=e?await T(e):null;if(!t){const u=this.documentUri;if(!u){this.state={type:"no-document"},this.render();return}const h=await C(u);if(!h.bskyPostRef){this.state={type:"no-comments-enabled"},this.render();return}t=h.bskyPostRef.uri}const r=g(t),o=H(t),[a,n]=await Promise.allSettled([L(t,this.depth),E(t)]);if(a.status==="rejected")throw a.reason;const i=a.value,l=n.status==="fulfilled"?n.value:[];if((i.replies?.filter(f)??[]).length===0&&l.length===0){this.state={type:"empty",postUrl:r,blackskyPostUrl:o},this.render();return}this.state={type:"loaded",thread:i,quotes:l,postUrl:r,blackskyPostUrl:o},this.render()}catch(e){const t=e instanceof Error?e.message:"Failed to load comments";this.state={type:"error",message:t},this.render()}}render(){switch(this.state.type){case"loading":this.commentsContainer.innerHTML=`
					<div class="sequoia-loading">
						<span class="sequoia-loading-spinner"></span>
						Loading comments...
					</div>
				`;break;case"no-document":this.commentsContainer.innerHTML=`
					<div class="sequoia-warning">
						No document found. Add a <code>&lt;link rel="site.standard.document" href="at://..."&gt;</code> tag to your page.
					</div>
				`,this.hide&&(this.commentsContainer.style.display="none");break;case"no-comments-enabled":this.commentsContainer.innerHTML=`
					<div class="sequoia-empty">
						Comments are not enabled for this post.
					</div>
				`;break;case"empty":this.commentsContainer.innerHTML=`
					<div class="sequoia-comments-header">
						<h3 class="sequoia-comments-title">Comments</h3>
						<div>${this.renderReplyButtons(this.state.postUrl,this.state.blackskyPostUrl)}</div>
					</div>
					<div class="sequoia-empty">
						No comments yet. Be the first to reply on Bluesky!
					</div>
				`;break;case"error":this.commentsContainer.innerHTML=`
					<div class="sequoia-error">
						Failed to load comments: ${c(this.state.message)}
					</div>
				`;break;case"loaded":{const e=this.state.thread.replies?.filter(f)??[],t=this.state.quotes??[],r=e.map(i=>this.renderThread(i)).join(""),o=this.countComments(e),a=o>0?`${o} Comment${o!==1?"s":""}`:"Comments",n=this.renderQuotesSection(t);this.commentsContainer.innerHTML=`
					<div class="sequoia-comments-header">
						<h3 class="sequoia-comments-title">${a}</h3>
						<div>${this.renderReplyButtons(this.state.postUrl,this.state.blackskyPostUrl)}</div>
					</div>
					<div class="sequoia-comments-list">
						${r}
					</div>
					${n}
				`;break}}}flattenThread(e){const t=[],r=e.replies?.filter(f)??[];t.push({post:e.post,hasMoreReplies:r.length>0});for(const o of r)t.push(...this.flattenThread(o));return t}renderReplyButtons(e,t){return`
			<slot name="reply-button">
				<a href="${c(e)}" target="_blank" rel="noopener noreferrer" class="sequoia-reply-button sequoia-reply-bluesky">
					${M}
				</a>
				<a href="${c(t)}" target="_blank" rel="noopener noreferrer" class="sequoia-reply-button sequoia-reply-blacksky">
					${U}
				</a>
			</slot>
		`}renderThread(e){return`<div class="sequoia-thread">${this.flattenThread(e).map((o,a)=>this.renderComment(o.post,o.hasMoreReplies,a)).join("")}</div>`}renderQuotesSection(e){if(e.length===0)return"";const t=e.map(r=>`<div class="sequoia-thread">${this.renderComment(r,!1,0)}</div>`).join("");return`
			<div class="sequoia-quotes-section">
				<h4 class="sequoia-quotes-header">Quotes (${e.length})</h4>
				<div class="sequoia-comments-list">
					${t}
				</div>
			</div>
		`}renderComment(e,t=!1,r=0){const o=e.author,a=o.displayName||o.handle,n=o.avatar?`<img class="sequoia-comment-avatar" src="${c(o.avatar)}" alt="${c(a)}" loading="lazy" />`:`<div class="sequoia-comment-avatar-placeholder">${k(a)}</div>`,i=`https://bsky.app/profile/${o.did}`,l=w(e.record.text,e.record.facets),d=q(e.record.createdAt),u=`<a href="${c(g(e.uri))}" target="_blank" rel="noopener noreferrer" class="sequoia-comment-time">${d}</a>`;return`
			<div class="sequoia-comment">
				<div class="sequoia-comment-avatar-column">
					${n}
					${t?'<div class="sequoia-thread-line"></div>':""}
				</div>
				<div class="sequoia-comment-content">
					<div class="sequoia-comment-header">
						<a href="${i}" target="_blank" rel="noopener noreferrer" class="sequoia-comment-author">
							${c(a)}
						</a>
						<span class="sequoia-comment-handle">@${c(o.handle)}</span>
						${u}
					</div>
					<p class="sequoia-comment-text">${l}</p>
				</div>
			</div>
		`}countComments(e){let t=0;for(const r of e){t+=1;const o=r.replies?.filter(f)??[];t+=this.countComments(o)}return t}}typeof customElements<"u"&&customElements.define("sequoia-comments",S);
//# sourceMappingURL=Pagination.astro_astro_type_script_index_0_lang.BIi1dNhK.js.map
