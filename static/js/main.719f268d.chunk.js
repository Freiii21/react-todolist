(this["webpackJsonpreact-todolist"]=this["webpackJsonpreact-todolist"]||[]).push([[0],{133:function(t,e,a){t.exports={alert:"ErrorSnackbar_alert__1zk2G"}},159:function(t,e,a){},160:function(t,e,a){},188:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),c=a(20),s=a.n(c);a(159),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(160);var i,o,d=a(16),u=a(278),l=a(261),p=a(262),b=a(2),j=n.a.memo((function(t){var e=Object(r.useState)(""),a=Object(d.a)(e,2),n=a[0],c=a[1],s=Object(r.useState)(!1),i=Object(d.a)(s,2),o=i[0],j=i[1],f=function(){var e=n.trim();e?t.addItem(e):j(!0),c("")};return Object(b.jsxs)("div",{children:[Object(b.jsx)(u.a,{style:{width:"180px"},size:"small",variant:"outlined",value:n,onChange:function(t){c(t.currentTarget.value),j(!1)},onKeyPress:function(t){"Enter"===t.key&&f()},label:"Title",error:o,helperText:o&&"title is required!",disabled:"loading"===t.entityStatus}),Object(b.jsx)(l.a,{onClick:f,color:"primary",size:"small",disabled:"loading"===t.entityStatus,children:Object(b.jsx)(p.a,{fontSize:"large"})})]})})),f=function(t){var e=Object(r.useState)(!1),a=Object(d.a)(e,2),n=a[0],c=a[1],s=Object(r.useState)(t.title),i=Object(d.a)(s,2),o=i[0],l=i[1];return n?Object(b.jsx)(u.a,{style:{width:"130px"},value:o,onBlur:function(){c(!1),t.setNewTitle(o)},autoFocus:!0,onChange:function(t){l(t.currentTarget.value)}}):Object(b.jsx)("span",{onDoubleClick:function(){return c(!0)},children:t.title})},h=a(265),O=a(260),x=a(266),m=a(190),v=a(264),g=a(263),k=a(282),y=a(131),C=a.n(y).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"419c229b-43d4-438c-9dc1-973ee316752b"}}),I=function(){return C.get("todo-lists")},w=function(t){return C.post("todo-lists",{title:t})},T=function(t){return C.delete("todo-lists/".concat(t))},S=function(t){return C.put("todo-lists/".concat(t.todolistId),{title:t.title})},L=function(t){return C.get("todo-lists/".concat(t,"/tasks"))},A=function(t){return C.post("todo-lists/".concat(t.todolistId,"/tasks"),{title:t.title})},V=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e))},W=function(t,e,a){return C.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},E=function(t){return C.post("auth/login",t)},_=function(){return C.get("/auth/me")},N=function(){return C.delete("auth/login")},M=function(){return C.get("security/get-captcha-url")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.High=2]="High",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(o||(o={}));var F=n.a.memo((function(t){return Object(b.jsxs)(g.a,{disableGutters:!0,className:t.task.status===i.Completed?"is-Done":"",divider:!0,style:{display:"flex",justifyContent:"space-between",padding:"0px"},children:[Object(b.jsx)(k.a,{color:"primary",onChange:function(e){t.changeTaskStatus(t.task.id,e.currentTarget.checked?i.Completed:i.New,t.todolistId)},checked:t.task.status===i.Completed}),Object(b.jsx)(f,{title:t.task.title,setNewTitle:function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}}),Object(b.jsx)(l.a,{onClick:function(){return t.removeTask(t.task.id,t.todolistId)},children:Object(b.jsx)(v.a,{fontSize:"small"})})]},t.task.id)})),P=a(31),z=a(21),R=a.n(z),D=a(36),U=function(t,e){t(nt({error:e})),t(rt({status:"failed"}))},q=function(t,e){t(rt({status:"failed"})),e.messages.length?t(nt({error:e.messages[0]})):t(nt({error:"Some error occurred"}))},B=a(27),H=Object(B.b)("auth/login",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.prev=1,t.next=4,E(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(Q()),a.dispatch(rt({status:"succeeded"})),t.abrupt("return",{isLoggedIn:!0});case 11:if(10!==r.data.resultCode){t.next=18;break}return a.dispatch(rt({status:"succeeded"})),q(a.dispatch,r.data),a.dispatch(G()),t.abrupt("return",{isLoggedIn:!1});case 18:return q(a.dispatch,r.data),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsError:r.data.fieldsError}));case 20:t.next=26;break;case 22:return t.prev=22,t.t0=t.catch(1),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({errors:[t.t0],fieldsError:void 0}));case 26:case"end":return t.stop()}}),t,null,[[1,22]])})));return function(e,a){return t.apply(this,arguments)}}()),Z=Object(B.b)("auth/logout",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.prev=1,t.next=4,N();case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(rt({status:"succeeded"})),t.abrupt("return");case 10:return q(a.dispatch,r.data),t.abrupt("return",a.rejectWithValue({}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),G=Object(B.b)("auth/getCaptchaUrl",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r,n;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,M();case 3:if(200!==(r=t.sent).status){t.next=9;break}return n=r.data.url,t.abrupt("return",{captcha:n});case 9:return q(a.dispatch,r.data),t.abrupt("return",a.rejectWithValue({}));case 11:t.next=17;break;case 13:return t.prev=13,t.t0=t.catch(0),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 17:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e,a){return t.apply(this,arguments)}}()),J=Object(B.c)({name:"auth",initialState:{isLoggedIn:!1,captchaUrl:""},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value},setCaptchaSuccessAC:function(t){t.captchaUrl=""}},extraReducers:function(t){t.addCase(H.fulfilled,(function(t,e){t.isLoggedIn=e.payload.isLoggedIn})),t.addCase(Z.fulfilled,(function(t){t.isLoggedIn=!1})),t.addCase(G.fulfilled,(function(t,e){t.captchaUrl=e.payload.captcha}))}}),K=J.reducer,Y=J.actions,$=Y.setIsLoggedInAC,Q=Y.setCaptchaSuccessAC,X=Object(B.b)("app/initializeApp",function(){var t=Object(D.a)(R.a.mark((function t(e,a){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_();case 2:return 0===t.sent.data.resultCode&&a.dispatch($({value:!0})),t.abrupt("return");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(B.c)({name:"app",initialState:{status:"succeeded",error:null,isInitialized:!1},reducers:{setAppErrorAC:function(t,e){t.error=e.payload.error},setAppStatusAC:function(t,e){t.status=e.payload.status}},extraReducers:function(t){t.addCase(X.fulfilled,(function(t){t.isInitialized=!0}))}}),et=tt.reducer,at=tt.actions,rt=at.setAppStatusAC,nt=at.setAppErrorAC,ct=Object(B.b)("todolists/fetchTodolists",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r,n;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.prev=1,t.next=4,I();case 4:return r=t.sent,a.dispatch(rt({status:"succeeded"})),n=r.data,t.abrupt("return",{todolists:n});case 10:return t.prev=10,t.t0=t.catch(1),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 14:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e,a){return t.apply(this,arguments)}}()),st=Object(B.b)("todolists/removeTodolist",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),a.dispatch(bt({id:e,entityStatus:"loading"})),t.prev=2,t.next=5,T(e);case 5:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(rt({status:"succeeded"})),t.abrupt("return",{id:e});case 11:if(a.dispatch(rt({status:"failed"})),!r.data.messages.length){t.next=17;break}return a.dispatch(nt({error:r.data.messages[0]})),t.abrupt("return",a.rejectWithValue({}));case 17:return a.dispatch(nt({error:"Some error occurred"})),t.abrupt("return",a.rejectWithValue({}));case 19:t.next=25;break;case 21:return t.prev=21,t.t0=t.catch(2),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 25:case"end":return t.stop()}}),t,null,[[2,21]])})));return function(e,a){return t.apply(this,arguments)}}()),it=Object(B.b)("todolists/addTodolist",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.prev=1,t.next=4,w(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(rt({status:"succeeded"})),t.abrupt("return",{todolist:r.data.data.item});case 10:return a.dispatch(nt({error:"Some error occurred"})),t.abrupt("return",a.rejectWithValue({}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),ot=Object(B.b)("todolists/changeTodolistTitle",function(){var t=Object(D.a)(R.a.mark((function t(e,a){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S({todolistId:e.id,title:e.title});case 3:return t.abrupt("return",{id:e.id,title:e.title});case 6:return t.prev=6,t.t0=t.catch(0),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 10:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e,a){return t.apply(this,arguments)}}()),dt=Object(B.c)({name:"todolists",initialState:[],reducers:{changeTodoListFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter},changeTodoListEntityStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.entityStatus}},extraReducers:function(t){t.addCase(ct.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(P.a)(Object(P.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(st.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&t.splice(a,1)})),t.addCase(it.fulfilled,(function(t,e){t.unshift(Object(P.a)(Object(P.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(ot.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title}))}}),ut=dt.reducer,lt=dt.actions,pt=lt.changeTodoListFilterAC,bt=lt.changeTodoListEntityStatusAC,jt=Object(B.b)("task/fetchTasks",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r,n;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.next=3,L(e);case 3:return r=t.sent,a.dispatch(rt({status:"succeeded"})),n=r.data.items,t.abrupt("return",{tasks:n,todoId:e});case 7:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),ft=Object(B.b)("task/removeTask",function(){var t=Object(D.a)(R.a.mark((function t(e,a){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.next=3,V(e.todoId,e.taskId);case 3:return a.dispatch(rt({status:"succeeded"})),t.abrupt("return",{taskId:e.taskId,todolistId:e.todoId});case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),ht=Object(B.b)("task/addTask",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(rt({status:"loading"})),t.prev=1,t.next=4,A({title:e.title,todolistId:e.todoId});case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(rt({status:"succeeded"})),t.abrupt("return",r.data.data.item);case 10:return q(a.dispatch,r.data),t.abrupt("return",a.rejectWithValue({}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),Ot=Object(B.b)("task/updateTask",function(){var t=Object(D.a)(R.a.mark((function t(e,a){var r,n,c,s;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.getState(),n=r.tasks[e.todoId].find((function(t){return t.id===e.taskId}))){t.next=4;break}return t.abrupt("return",a.rejectWithValue({}));case 4:return c=Object(P.a)({title:n.title,status:n.status,deadline:n.deadline,description:n.description,priority:n.priority,startDate:n.startDate},e.domainModel),t.prev=5,t.next=8,W(e.todoId,e.taskId,c);case 8:if(0!==(s=t.sent).data.resultCode){t.next=13;break}return t.abrupt("return",{taskId:e.taskId,domainModel:e.domainModel,todolistId:e.todoId});case 13:return q(a.dispatch,s.data),t.abrupt("return",a.rejectWithValue({}));case 15:t.next=21;break;case 17:return t.prev=17,t.t0=t.catch(5),U(a.dispatch,t.t0),t.abrupt("return",a.rejectWithValue({}));case 21:case"end":return t.stop()}}),t,null,[[5,17]])})));return function(e,a){return t.apply(this,arguments)}}()),xt=Object(B.c)({name:"tasks",initialState:{},reducers:{},extraReducers:function(t){t.addCase(it.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(st.fulfilled,(function(t,e){delete t[e.payload.id]})),t.addCase(ct.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){t[e.id]=[]}))})),t.addCase(jt.fulfilled,(function(t,e){t[e.payload.todoId]=e.payload.tasks})),t.addCase(ft.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));r>-1&&a.splice(r,1)})),t.addCase(ht.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)})),t.addCase(Ot.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));r>-1&&(a[r]=Object(P.a)(Object(P.a)({},a[r]),e.payload.domainModel))}))}}).reducer,mt=a(25),vt=n.a.memo((function(t){var e=Object(mt.b)();Object(r.useEffect)((function(){e(jt(t.id))}),[]);var a=t.tasks;"active"===t.filter&&(a=a.filter((function(t){return t.status===i.New}))),"completed"===t.filter&&(a=a.filter((function(t){return t.status===i.Completed})));var n=a.map((function(e){return Object(b.jsx)(F,{todolistId:t.id,task:e,removeTask:t.removeTask,changeTaskStatus:t.changeTaskStatus,changeTaskTitle:t.changeTaskTitle},e.id)})),c=Object(r.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),s=Object(r.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.id]),o=Object(r.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.id]),d=Object(r.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.id]);return Object(b.jsxs)("div",{className:"todoList",children:[Object(b.jsxs)(h.a,{variant:"h6",align:"center",style:{fontWeight:"bold"},children:[Object(b.jsx)(f,{title:t.title,setNewTitle:function(e){t.changeTodolistTitle(e,t.id)}}),Object(b.jsx)(l.a,{onClick:function(){return t.removeTodolist(t.id)},disabled:"loading"===t.entityStatus,children:Object(b.jsx)(v.a,{})})]}),Object(b.jsx)(j,{addItem:c,entityStatus:t.entityStatus}),Object(b.jsx)(O.a,{children:n}),Object(b.jsx)("div",{children:Object(b.jsxs)(x.a,{variant:"contained",size:"small",children:[Object(b.jsx)(m.a,{color:"all"===t.filter?"secondary":"primary",onClick:s,children:"All"}),Object(b.jsx)(m.a,{color:"active"===t.filter?"secondary":"primary",onClick:o,children:"Active"}),Object(b.jsx)(m.a,{color:"completed"===t.filter?"secondary":"primary",onClick:d,children:"Completed"})]})})]})})),gt=a(272),kt=a(189),yt=a(273),Ct=a(274),It=a(276),wt=a(275),Tt=a(290),St=a(283),Lt=a(279),At=a(133),Vt=a.n(At),Wt=n.a.forwardRef((function(t,e){return Object(b.jsx)(Lt.a,Object(P.a)({elevation:6,ref:e,variant:"filled"},t))}));function Et(){var t=Object(mt.c)((function(t){return t.app.error})),e=Object(mt.b)(),a=function(t,a){"clickaway"!==a&&e(nt({error:null}))};return Object(b.jsx)(St.a,{open:null!==t,autoHideDuration:1e4,onClose:a,children:Object(b.jsx)(Wt,{onClose:a,severity:"error",color:"error",sx:{width:"100%"},className:Vt.a.alert,children:t})})}var _t=a(287),Nt=a(280),Mt=a(284),Ft=a(285),Pt=a(291),zt=a(270),Rt=a(277),Dt=a(292),Ut=a(138),qt=a(18),Bt=a(81),Ht=a.n(Bt),Zt=function(){var t=Object(mt.b)(),e=Object(mt.c)((function(t){return t.auth.isLoggedIn})),a=Object(mt.c)((function(t){return t.auth.captchaUrl})),r=Object(Ut.a)({initialValues:{email:"",password:"",rememberMe:!1,captcha:""},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Password length must be 3 or longer"):e.password="Required",a&&!t.captcha&&(e.captcha="Required"),e},onSubmit:function(e){t(H(e))}});return e?Object(b.jsx)(qt.a,{to:"/"}):Object(b.jsx)(_t.a,{container:!0,justifyContent:"center",children:Object(b.jsx)(_t.a,{item:!0,justifyContent:"center",children:Object(b.jsxs)(Mt.a,{children:[Object(b.jsxs)(zt.a,{children:[Object(b.jsxs)("p",{children:["To log in get registered",Object(b.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"blank",children:" here"})]}),Object(b.jsx)("p",{children:"or use common test account credentials:"}),Object(b.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(b.jsx)("p",{children:"Password: free"})]}),Object(b.jsx)("form",{onSubmit:r.handleSubmit,children:Object(b.jsxs)(Pt.a,{children:[Object(b.jsx)(Rt.a,Object(P.a)({label:"Email",margin:"normal"},r.getFieldProps("email"))),r.touched.email&&r.errors.email&&Object(b.jsx)("div",{style:{color:"red"},children:r.errors.email}),Object(b.jsx)(Rt.a,Object(P.a)({type:"password",label:"Password",margin:"normal"},r.getFieldProps("password"))),r.touched.password&&r.errors.password&&Object(b.jsx)("div",{style:{color:"red"},children:r.errors.password}),Object(b.jsx)(Ft.a,{label:"Remember me",className:Ht.a.rememberMe,control:Object(b.jsx)(Nt.a,Object(P.a)({},r.getFieldProps("rememberMe")))}),Object(b.jsx)(Dt.a,{type:"submit",variant:"contained",color:"primary",className:Ht.a.button,children:"Login"}),a&&Object(b.jsxs)("div",{className:Ht.a.captcha,children:[Object(b.jsx)("img",{src:a,alt:""}),Object(b.jsx)("br",{}),Object(b.jsx)(Rt.a,Object(P.a)(Object(P.a)({label:"Captcha",margin:"normal"},r.getFieldProps("captcha")),{},{className:Ht.a.captchaInput})),r.errors.captcha&&Object(b.jsx)("div",{style:{color:"red"},children:r.errors.captcha})]})]})})]})})})},Gt=a(289);var Jt=function(t){return Object(mt.c)((function(t){return t.auth.isLoggedIn}))?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(gt.a,{container:!0,style:{padding:"29px 0px"},children:Object(b.jsx)(j,{addItem:t.addTodolist})}),Object(b.jsx)(gt.a,{container:!0,spacing:4,children:t.todolistsComponents})]}):Object(b.jsx)(qt.a,{to:"login"})},Kt=function(){Object(r.useEffect)((function(){s(X())}),[]);var t=Object(mt.c)((function(t){return t.auth.isLoggedIn})),e=Object(mt.c)((function(t){return t.app.isInitialized})),a=Object(mt.c)((function(t){return t.todolists})),n=Object(mt.c)((function(t){return t.app.status})),c=Object(mt.c)((function(t){return t.tasks})),s=Object(mt.b)();Object(r.useEffect)((function(){t&&s(ct())}),[t]);var i=Object(r.useCallback)((function(t,e){var a=ft({taskId:t,todoId:e});s(a)}),[s]),o=Object(r.useCallback)((function(t,e){s(ht({title:t,todoId:e}))}),[s]),d=Object(r.useCallback)((function(t,e,a){s(Ot({todoId:a,taskId:t,domainModel:{status:e}}))}),[s]),u=Object(r.useCallback)((function(t,e,a){var r=Ot({todoId:a,taskId:t,domainModel:{title:e}});s(r)}),[s]),p=Object(r.useCallback)((function(t,e){var a=pt({id:e,filter:t});s(a)}),[s]),j=Object(r.useCallback)((function(t,e){var a=ot({id:e,title:t});s(a)}),[s]),f=Object(r.useCallback)((function(t){var e=st(t);s(e)}),[s]),O=Object(r.useCallback)((function(t){var e=it(t);s(e)}),[s]);if(!e)return Object(b.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(b.jsx)(Gt.a,{})});var x=a.map((function(t){return Object(b.jsx)(gt.a,{item:!0,children:Object(b.jsx)(kt.a,{elevation:8,style:{padding:"20px"},children:Object(b.jsx)(vt,{id:t.id,title:t.title,filter:t.filter,entityStatus:t.entityStatus,tasks:c[t.id],removeTask:i,changeFilter:p,addTask:o,changeTaskStatus:d,removeTodolist:f,changeTaskTitle:u,changeTodolistTitle:j})})},t.id)}));return Object(b.jsx)("div",{children:Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(yt.a,{position:"static",children:Object(b.jsxs)(Ct.a,{style:{justifyContent:"space-between"},children:[Object(b.jsx)(l.a,{edge:"start",color:"inherit","aria-label":"menu",style:{width:"106px"},children:Object(b.jsx)(wt.a,{})}),Object(b.jsx)(h.a,{variant:"h6",children:"Todolists"}),t&&Object(b.jsx)(m.a,{color:"inherit",variant:"outlined",onClick:function(){s(Z())},children:"Logout"}),!t&&Object(b.jsx)("div",{style:{width:"94px"}})]})}),"loading"===n&&Object(b.jsx)(Tt.a,{color:"secondary"}),Object(b.jsx)(It.a,{fixed:!0,children:Object(b.jsxs)(qt.d,{children:[Object(b.jsx)(qt.b,{path:"/",element:Object(b.jsx)(Jt,{addTodolist:O,todolistsComponents:x})}),Object(b.jsx)(qt.b,{path:"login",element:Object(b.jsx)(Zt,{})}),Object(b.jsx)(qt.b,{path:"404",element:Object(b.jsx)("h1",{style:{textAlign:"center"},children:"404 page not found"})}),Object(b.jsx)(qt.b,{path:"*",element:Object(b.jsx)(qt.a,{to:"404"})})]})}),Object(b.jsx)(Et,{})]})})},Yt=a(137),$t=a(80),Qt=Object(Yt.a)({tasks:xt,todolists:ut,app:et,auth:K}),Xt=Object(B.a)({reducer:Qt,middleware:function(t){return t().prepend($t.a)}}),te=(mt.c,a(86));s.a.render(Object(b.jsx)(mt.a,{store:Xt,children:Object(b.jsx)(te.a,{children:Object(b.jsx)(Kt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},81:function(t,e,a){t.exports={rememberMe:"Login_rememberMe__3xNMV",button:"Login_button__vDBYk",captcha:"Login_captcha__2sa_V",captchaInput:"Login_captchaInput__1s6gy"}}},[[188,1,2]]]);
//# sourceMappingURL=main.719f268d.chunk.js.map