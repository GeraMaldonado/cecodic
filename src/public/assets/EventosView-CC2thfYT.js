import{_ as H,r as v,c as F,o as G,w as J,g as A,f as K,a as y,b as D,d as s,e as l,h as t,i as C,v as I,F as x,j as B,t as c,k as M,l as r,u as i,m as h,n as b,p as O,q as P,s as w,B as Q,x as W,P as X}from"./index-eB2QKcKT.js";const Z={class:"pantalla"},ee={class:"filtros"},te={class:"filtroInstitucion"},ae=["value"],ne={class:"filtrofechas"},se={class:"contenedorFiltroFecha"},oe={class:"filtroFecha"},le={class:"calendario"},ie={key:1},ue={class:"navegacionFecha"},re={key:0,class:"tablaEventos"},ce={key:0,class:"columnaAcciones"},de={class:"columnaTitulo"},ve={class:"columnaInstitucion"},me={class:"columnaTipoEvento"},ge={class:"columnaResumen"},pe={class:"columnaFecha"},he={class:"columnaLugar"},_e={key:0,class:"columnaAcciones"},fe={class:"botonAccion"},E=9,ke={__name:"TablaEventos",setup(T){const m=v("todas"),u=v("semana"),g=v([]),S=localStorage.getItem("credencial"),p=v([]),_=v(1),n=v(new Date),k=v({month:n.value.getMonth(),year:n.value.getFullYear()}),N=F(()=>{const o=new Set(g.value.map(e=>e.institucion));return Array.from(o)});G(async()=>{await d(),f()}),J(n,o=>{k.value={month:o.getMonth(),year:o.getFullYear()}});const U=o=>{n.value=new Date(o.year,o.month),d()},V=F(()=>{const o=(_.value-1)*E,e=o+E;return p.value.slice(o,e)}),$=async()=>{await d(),f()},f=()=>{_.value=1,m.value==="todas"?p.value=g.value:p.value=g.value.filter(o=>o.institucion===m.value)},R=async()=>{n.value.setDate(n.value.getDate()-7),await d()},L=async()=>{n.value.setDate(n.value.getDate()+7),await d()},z=async()=>{n.value=new Date(n.value.setMonth(n.value.getMonth()-1)),d()},Y=async()=>{n.value=new Date(n.value.setMonth(n.value.getMonth()+1)),d()},d=async()=>{switch(u.value){case"semana":await A(g,y(n.value));break;case"mes":await A(g,K(n.value));break;default:return}f()};return(o,e)=>{const j=D("VueDatePicker"),q=D("router-link");return s(),l("div",Z,[t("div",ee,[t("div",te,[e[5]||(e[5]=t("p",null,"Institución: ",-1)),C(t("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>m.value=a),onChange:f},[e[4]||(e[4]=t("option",{value:"todas"},"Todas",-1)),(s(!0),l(x,null,B(N.value,a=>(s(),l("option",{key:a,value:a},c(a),9,ae))),128))],544),[[I,m.value]])]),t("div",ne,[t("div",se,[t("div",oe,[e[7]||(e[7]=t("p",null,"Ver por:",-1)),C(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>u.value=a),onChange:$},e[6]||(e[6]=[t("option",{value:"semana"},"Semana",-1),t("option",{value:"mes"},"Mes",-1)]),544),[[I,u.value]])])]),t("div",le,[u.value==="mes"?(s(),M(j,{key:0,modelValue:k.value,"onUpdate:modelValue":[e[2]||(e[2]=a=>k.value=a),U],"month-picker":""},null,8,["modelValue"])):r("",!0),u.value==="semana"?(s(),l("div",ie,c(`${i(h)({fecha:i(y)(n.value).substring(0,11)})} - ${i(h)({fecha:i(y)(n.value).substring(10,21)})}`),1)):r("",!0)]),t("div",ue,[u.value==="semana"?(s(),l("button",{key:0,onClick:R},"Semana Anterior")):r("",!0),u.value==="semana"?(s(),l("button",{key:1,onClick:L},"Semana Siguiente")):r("",!0),u.value==="mes"?(s(),l("button",{key:2,onClick:z},"Mes Anterior")):r("",!0),u.value==="mes"?(s(),l("button",{key:3,onClick:Y},"Mes Siguiente")):r("",!0)])])]),V.value.length>0?(s(),l("table",re,[t("thead",null,[t("tr",null,[e[8]||(e[8]=t("th",null,"Nombre del evento",-1)),e[9]||(e[9]=t("th",null,"Institución",-1)),e[10]||(e[10]=t("th",null,"Evento",-1)),e[11]||(e[11]=t("th",{class:"resumen"},"Resumen",-1)),e[12]||(e[12]=t("th",null,"Fecha y Hora",-1)),e[13]||(e[13]=t("th",null,"Lugar",-1)),i(S)?(s(),l("th",ce,"Acciones")):r("",!0)])]),t("tbody",null,[(s(!0),l(x,null,B(V.value,a=>(s(),l("tr",{key:a.ideventos},[t("td",de,[b(q,{to:{name:"evento-individual",params:{id:a.ideventos}}},{default:O(()=>[P(c(i(w)(a.titulo,60)),1)]),_:2},1032,["to"])]),t("td",ve,c(i(w)(a.institucion,30)),1),t("td",me,c(a.tipoEvento==="publico"?"Público":"Privado"),1),t("td",ge,c(i(w)(a.detalles,100)),1),t("td",pe,[P(c(a.fechaFin?`${i(h)(a)} -
${i(h)({fecha:a.fechaFin})}`:i(h)(a)),1),e[14]||(e[14]=t("br",null,null,-1)),P(c(a.hora.substring(0,5))+" hrs",1)]),t("td",he,c(a.lugar),1),i(S)?(s(),l("td",_e,[t("div",fe,[b(Q,{idEvento:a.ideventos},null,8,["idEvento"]),b(W,{eventoId:a.ideventos},null,8,["eventoId"])])])):r("",!0)]))),128))])])):r("",!0),p.value.length>9?(s(),M(X,{key:1,totalElementos:p.value.length,elementosPorPagina:E,paginaActual:_.value,"onUpdate:paginaActual":e[3]||(e[3]=a=>_.value=a)},null,8,["totalElementos","paginaActual"])):r("",!0)])}}},ye=H(ke,[["__scopeId","data-v-c9aaa00a"]]),Pe={__name:"EventosView",setup(T){return(m,u)=>(s(),M(ye))}};export{Pe as default};
