(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",n="second",s="minute",r="hour",a="day",o="week",c="month",d="quarter",l="year",f="date",u="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},v=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},b={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+v(n,2,"0")+":"+v(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(n,c),r=i-s<0,a=t.clone().add(n+(r?-1:1),c);return+(-(n+(i-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:l,w:o,d:a,D:f,h:r,m:s,s:n,ms:i,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",$={};$[_]=m;var y=function(e){return e instanceof w},g=function e(t,i,n){var s;if(!t)return _;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),i&&($[r]=i,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;$[o]=t,s=o}return!n&&s&&(_=s),s||!n&&_},M=function(e,t){if(y(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new w(i)},T=b;T.l=g,T.i=y,T.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function m(e){this.$L=g(e.locale,null,!0),this.parse(e)}var v=m.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(h);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return T},v.isValid=function(){return!(this.$d.toString()===u)},v.isSame=function(e,t){var i=M(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return M(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<M(e)},v.$g=function(e,t,i){return T.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,d=!!T.u(t)||t,u=T.p(e),h=function(e,t){var n=T.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return d?n:n.endOf(a)},p=function(e,t){return T.w(i.toDate()[e].apply(i.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},m=this.$W,v=this.$M,b=this.$D,_="set"+(this.$u?"UTC":"");switch(u){case l:return d?h(1,0):h(31,11);case c:return d?h(1,v):h(0,v+1);case o:var $=this.$locale().weekStart||0,y=(m<$?m+7:m)-$;return h(d?b-y:b+(6-y),v);case a:case f:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case s:return p(_+"Seconds",2);case n:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var o,d=T.p(e),u="set"+(this.$u?"UTC":""),h=(o={},o[a]=u+"Date",o[f]=u+"Date",o[c]=u+"Month",o[l]=u+"FullYear",o[r]=u+"Hours",o[s]=u+"Minutes",o[n]=u+"Seconds",o[i]=u+"Milliseconds",o)[d],p=d===a?this.$D+(t-this.$W):t;if(d===c||d===l){var m=this.clone().set(f,1);m.$d[h](p),m.init(),this.$d=m.set(f,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[T.p(e)]()},v.add=function(i,d){var f,u=this;i=Number(i);var h=T.p(d),p=function(e){var t=M(u);return T.w(t.date(t.date()+Math.round(e*i)),u)};if(h===c)return this.set(c,this.$M+i);if(h===l)return this.set(l,this.$y+i);if(h===a)return p(1);if(h===o)return p(7);var m=(f={},f[s]=e,f[r]=t,f[n]=1e3,f)[h]||1,v=this.$d.getTime()+i*m;return T.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||u;var n=e||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),r=this.$H,a=this.$m,o=this.$M,c=i.weekdays,d=i.months,l=function(e,i,s,r){return e&&(e[i]||e(t,n))||s[i].slice(0,r)},f=function(e){return T.s(r%12||12,e,"0")},h=i.meridiem||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:T.s(o+1,2,"0"),MMM:l(i.monthsShort,o,d,3),MMMM:l(d,o),D:this.$D,DD:T.s(this.$D,2,"0"),d:String(this.$W),dd:l(i.weekdaysMin,this.$W,c,2),ddd:l(i.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(r),HH:T.s(r,2,"0"),h:f(1),hh:f(2),a:h(r,a,!0),A:h(r,a,!1),m:String(a),mm:T.s(a,2,"0"),s:String(this.$s),ss:T.s(this.$s,2,"0"),SSS:T.s(this.$ms,3,"0"),Z:s};return n.replace(p,(function(e,t){return t||m[e]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(i,f,u){var h,p=T.p(f),m=M(i),v=(m.utcOffset()-this.utcOffset())*e,b=this-m,_=T.m(this,m);return _=(h={},h[l]=_/12,h[c]=_,h[d]=_/3,h[o]=(b-v)/6048e5,h[a]=(b-v)/864e5,h[r]=b/t,h[s]=b/e,h[n]=b/1e3,h)[p]||b,u?_:T.a(_)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return $[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=g(e,t,!0);return n&&(i.$L=n),i},v.clone=function(){return T.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),D=w.prototype;return M.prototype=D,[["$ms",i],["$s",n],["$m",s],["$H",r],["$W",a],["$M",c],["$y",l],["$D",f]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,w,M),e.$i=!0),M},M.locale=g,M.isDayjs=y,M.unix=function(e){return M(1e3*e)},M.en=$[_],M.Ls=$,M.p={},M}()},646:function(e){e.exports=function(){"use strict";var e,t,i=1e3,n=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,c=2592e6,d=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,l={years:o,months:c,days:r,hours:s,minutes:n,seconds:i,milliseconds:1,weeks:6048e5},f=function(e){return e instanceof _},u=function(e,t,i){return new _(e,i,t.$l)},h=function(e){return t.p(e)+"s"},p=function(e){return e<0},m=function(e){return p(e)?Math.ceil(e):Math.floor(e)},v=function(e){return Math.abs(e)},b=function(e,t){return e?p(e)?{negative:!0,format:""+v(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},_=function(){function p(e,t,i){var n=this;if(this.$d={},this.$l=i,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return u(e*l[h(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){n.$d[h(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(d);if(s){var r=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,i){return t+(e.$d[i]||0)*l[i]}),0)},v.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=m(e/o),e%=o,this.$d.months=m(e/c),e%=c,this.$d.days=m(e/r),e%=r,this.$d.hours=m(e/s),e%=s,this.$d.minutes=m(e/n),e%=n,this.$d.seconds=m(e/i),e%=i,this.$d.milliseconds=e},v.toISOString=function(){var e=b(this.$d.years,"Y"),t=b(this.$d.months,"M"),i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var n=b(i,"D"),s=b(this.$d.hours,"H"),r=b(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=b(a,"S"),c=e.negative||t.negative||n.negative||s.negative||r.negative||o.negative,d=s.format||r.format||o.format?"T":"",l=(c?"-":"")+"P"+e.format+t.format+n.format+d+s.format+r.format+o.format;return"P"===l||"-P"===l?"P0D":l},v.toJSON=function(){return this.toISOString()},v.format=function(e){var i=e||"YYYY-MM-DDTHH:mm:ss",n={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return i.replace(a,(function(e,t){return t||String(n[e])}))},v.as=function(e){return this.$ms/l[h(e)]},v.get=function(e){var t=this.$ms,i=h(e);return"milliseconds"===i?t%=1e3:t="weeks"===i?m(t/l[i]):this.$d[i],0===t?0:t},v.add=function(e,t,i){var n;return n=t?e*l[h(t)]:f(e)?e.$ms:u(e,this).$ms,u(this.$ms+n*(i?-1:1),this)},v.subtract=function(e,t){return this.add(e,t,!0)},v.locale=function(e){var t=this.clone();return t.$l=e,t},v.clone=function(){return u(this.$ms,this)},v.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(i,n,s){e=s,t=s().$utils(),s.duration=function(e,t){var i=s.locale();return u(e,{$l:i},t)},s.isDuration=f;var r=n.prototype.add,a=n.prototype.subtract;n.prototype.add=function(e,t){return f(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},n.prototype.subtract=function(e,t){return f(e)&&(e=e.asMilliseconds()),a.bind(this)(e,t)}}}()}},t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=i(484),t=i.n(e),n=i(646),s=i.n(n);function r(e,t){return Math.floor(Math.random()*(t-e+1))+e}function a(e){const t=Math.floor(Math.random()*(e-0+1)+0).toFixed(0);return Number(t)}t().extend(s());const o=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcaq",name:"Amsterdam",description:"The capital of the Netherlands, known for its canals, tulip fields, and vibrant cultural scene.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(1,100)}`},{src:`https://loremflickr.com/248/152?random=${r(101,200)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcaw",name:"Geneva",description:"A global city in Switzerland, famous for the United Nations headquarters and stunning lake views.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(1,100)}`},{src:`https://loremflickr.com/248/152?random=${r(101,200)}`},{src:`https://loremflickr.com/248/152?random=${r(201,300)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcae",name:"Chamonix",description:"A picturesque alpine town in France, nestled at the foot of Mont Blanc, a paradise for skiers and hikers.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(1,100)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcar",name:"Moscow",description:"The capital of Russia, home to Red Square, the Kremlin, and a rich history dating back centuries.",pictures:[]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcat",name:"Tokyo",description:"A high-tech metropolis blending ancient temples with neon-lit skyscrapers, a hub of innovation and culture.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(301,400)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcay",name:"New York",description:"The city that never sleeps, famous for Times Square, Broadway, and the Statue of Liberty.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(401,500)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcau",name:"Barcelona",description:"A Spanish coastal city known for its Gaudí architecture, vibrant beaches, and delicious tapas.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(501,600)}`},{src:`https://loremflickr.com/248/152?random=${r(601,700)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcai",name:"Dubai",description:"A futuristic city in the UAE, home to the world’s tallest building and luxury shopping experiences.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(701,800)}`}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcao",name:"London",description:"The capital of the UK, steeped in history with landmarks like Big Ben, Buckingham Palace, and the Thames River.",pictures:[{src:`https://loremflickr.com/248/152?random=${r(801,900)}`},{src:`https://loremflickr.com/248/152?random=${r(901,1e3)}`}]}],c=[{type:"taxi",offers:[{id:"58f27849-c4f9-42e5-88ab-48267d282369",title:"Upgrade to a business class",price:175},{id:"5df4f3e4-f677-4318-a3f5-458b16f30969",title:"Choose the radio station",price:40},{id:"cde29377-f0d4-4626-949a-ab5709a2ad55",title:"Choose temperature",price:40},{id:"009ed2cd-714f-4ce2-aae1-7e85683eeedf",title:"Drive quickly, I'm in a hurry",price:97},{id:"effb2e14-3447-497b-a5bb-113083704bbd",title:"Drive slowly",price:67}]},{type:"bus",offers:[{id:"cafbbdd8-6dea-432f-bb37-f6b8ae635ae4",title:"Infotainment system",price:182},{id:"b371fb66-c631-4bca-b1f8-f80f48692674",title:"Order meal",price:126},{id:"bbc01c4e-2318-426b-bfef-6af93548e45c",title:"Choose seats",price:45}]},{type:"train",offers:[{id:"525b9ce2-5919-4039-9495-2a931663302a",title:"Book a taxi at the arrival point",price:178},{id:"cc002a26-9f8b-478f-b5e2-7dc4faa57b4c",title:"Order a breakfast",price:33},{id:"4305666f-a227-4a63-a600-9856bd1a5639",title:"Wake up at a certain time",price:53}]},{type:"flight",offers:[{id:"e68cd6be-f967-438b-b6c1-15a007daca30",title:"Choose meal",price:199},{id:"f859f23c-2dee-4a6c-8c72-4ec659562db6",title:"Choose seats",price:117},{id:"512e3870-1beb-469c-9cee-bf783820c0c6",title:"Upgrade to comfort class",price:91},{id:"98c665ca-d858-4a99-94ab-4f202344a3c8",title:"Upgrade to business class",price:173},{id:"d85ef0fe-e0c0-484b-a07e-5c6c3619fc46",title:"Add luggage",price:184},{id:"1c5b2003-4d91-4ea9-9cdb-5061f3610785",title:"Business lounge",price:200}]},{type:"check-in",offers:[{id:"5d04657e-be30-4db7-b3ea-e961c94ceed4",title:"Choose the time of check-in",price:198},{id:"fcb41394-879a-4de4-afa7-a4ca4a0288c7",title:"Choose the time of check-out",price:189},{id:"a899dc84-65a1-413b-a3f6-697e0d62a2af",title:"Add breakfast",price:56},{id:"bf3adb23-ca52-4725-90dd-c408a87a1d95",title:"Laundry",price:168},{id:"5a3581b3-bb76-42e9-976c-92af11b21d06",title:"Order a meal from the restaurant",price:36}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"a3506d95-4022-4a8e-a438-7b793dc202a0",title:"Choose meal",price:186},{id:"055ba681-0802-460d-8b60-9d222286bd59",title:"Choose seats",price:183},{id:"3cb40b64-e480-4fff-9f18-8156e5c4e0de",title:"Upgrade to comfort class",price:123},{id:"4aac35e9-e161-4da9-8c69-6fd2c40a465e",title:"Upgrade to business class",price:156},{id:"81101dc4-8c37-48a4-8707-015ed5d84335",title:"Add luggage",price:107},{id:"91bd7e2d-1e94-4ca9-afbd-3bc281c0ab83",title:"Business lounge",price:198}]},{type:"drive",offers:[{id:"e6ae2c76-a259-4de0-b816-189d0324c821",title:"With automatic transmission",price:163},{id:"8b5bf11e-995b-48ef-9261-0ba6b3cf1b9f",title:"With air conditioning",price:103}]},{type:"restaurant",offers:[{id:"856d9ea4-7560-4ca7-9133-9c8591dffdbe",title:"Choose live music",price:55},{id:"a3470ca1-9e12-4fb2-a57d-3472911ab61a",title:"Choose VIP area",price:43}]}],d=[{id:"point-1",basePrice:1100,dateFrom:"2019-07-10T22:55",dateTo:"2019-07-11T11:22",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcaq",isFavorite:!!a(1),offers:["58f27849-c4f9-42e5-88ab-48267d282369","5df4f3e4-f677-4318-a3f5-458b16f30969","cde29377-f0d4-4626-949a-ab5709a2ad55","009ed2cd-714f-4ce2-aae1-7e85683eeedf","effb2e14-3447-497b-a5bb-113083704bbd"],type:"taxi"},{id:"point-2",basePrice:3470,dateFrom:"2019-03-18T12:25",dateTo:"2019-03-18T13:35",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcaw",isFavorite:!!a(1),offers:["cafbbdd8-6dea-432f-bb37-f6b8ae635ae4","b371fb66-c631-4bca-b1f8-f80f48692674","bbc01c4e-2318-426b-bfef-6af93548e45c"],type:"bus"},{id:"point-3",basePrice:1e3,dateFrom:"2019-03-18T14:30",dateTo:"2019-03-18T16:05",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcae",isFavorite:!!a(1),offers:["525b9ce2-5919-4039-9495-2a931663302a","cc002a26-9f8b-478f-b5e2-7dc4faa57b4c","4305666f-a227-4a63-a600-9856bd1a5639"],type:"train"},{id:"point-4",basePrice:1500,dateFrom:"2019-03-18T12:25",dateTo:"2019-03-18T13:35",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcar",isFavorite:!!a(1),offers:["a3506d95-4022-4a8e-a438-7b793dc202a0","055ba681-0802-460d-8b60-9d222286bd59","3cb40b64-e480-4fff-9f18-8156e5c4e0de","4aac35e9-e161-4da9-8c69-6fd2c40a465e","81101dc4-8c37-48a4-8707-015ed5d84335","91bd7e2d-1e94-4ca9-afbd-3bc281c0ab83"],type:"ship"},{id:"point-5",basePrice:6e3,dateFrom:"2019-03-19T11:20",dateTo:"2019-03-19T13:00",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcat",isFavorite:!!a(1),offers:["e6ae2c76-a259-4de0-b816-189d0324c821","8b5bf11e-995b-48ef-9261-0ba6b3cf1b9f"],type:"drive"},{id:"point-6",basePrice:6e3,dateFrom:"2019-03-19T11:20",dateTo:"2019-03-19T13:00",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcay",isFavorite:!!a(1),offers:["e68cd6be-f967-438b-b6c1-15a007daca30","f859f23c-2dee-4a6c-8c72-4ec659562db6","512e3870-1beb-469c-9cee-bf783820c0c6","98c665ca-d858-4a99-94ab-4f202344a3c8","d85ef0fe-e0c0-484b-a07e-5c6c3619fc46","1c5b2003-4d91-4ea9-9cdb-5061f3610785"],type:"flight"},{id:"point-7",basePrice:6e3,dateFrom:"2019-03-19T11:20",dateTo:"2019-03-19T13:00",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcau",isFavorite:!!a(1),offers:["5d04657e-be30-4db7-b3ea-e961c94ceed4","fcb41394-879a-4de4-afa7-a4ca4a0288c7","a899dc84-65a1-413b-a3f6-697e0d62a2af","bf3adb23-ca52-4725-90dd-c408a87a1d95","5a3581b3-bb76-42e9-976c-92af11b21d06"],type:"check-in"},{id:"point-8",basePrice:6e3,dateFrom:"2019-03-19T11:20",dateTo:"2019-03-19T13:00",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcai",isFavorite:!!a(1),offers:[],type:"sightseeing"},{id:"point-9",basePrice:6e3,dateFrom:"2019-03-19T11:20",dateTo:"2019-03-19T13:00",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcao",isFavorite:!!a(1),offers:["856d9ea4-7560-4ca7-9133-9c8591dffdbe","a3470ca1-9e12-4fb2-a57d-3472911ab61a"],type:"restaurant"}];class l{#e=[];#t=[];#i=[];init(){this.#e=function(){const e=Array.from({length:0});for(;e.length<4;){const i=(t=d)[Math.floor(Math.random()*t.length)];e.includes(i)||e.push(i)}var t;return e}(),this.#t=c,this.#i=o}getPoints(){return this.#e}getOffers(){return this.#t}getDestinations(){return this.#i}}const f="afterbegin",u="beforeend";function h(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function p(e,t,i=u){t.insertAdjacentElement(i,e.getElement())}class m{getTemplate(){return'\n          <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>\n  '}getElement(){return this.element||(this.element=h(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{getTemplate(){return'\n    <form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>\n  '}getElement(){return this.element||(this.element=h(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{constructor(e,t,i){this.point=e,this.destination=t,this.offers=i,this.element=null}getTemplate(){return e=this.point,i=this.destination,n=this.offers,`\n    <li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${e.dateFrom}">${t()(e.dateFrom).format("MMM D")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${e.type}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${e.type} to ${i.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${e.dateFrom}">${t()(e.dateFrom).format("HH:mm")}</time>\n            —\n            <time class="event__end-time" datetime="${e.dateTo}">${t()(e.dateTo).format("HH:mm")}</time>\n          </p>\n          <p class="event__duration">${function(e,i){const n=t()(e),s=t()(i),r=t().duration(s.diff(n));return r.asDays()>=1?`${r.days()}D ${r.hours()}H ${r.minutes()}M`:r.asHours()>=1?`${r.hours()}H ${r.minutes()}M`:`${r.minutes()}M`}(e.dateFrom,e.dateTo)}</p>\n        </div>\n        <p class="event__price">\n          &euro; <span class="event__price-value">${e.basePrice}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${n.map((e=>`\n            <li class="event__offer">\n              <span class="event__offer-title">${e.title}</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">${e.price}</span>\n            </li>`)).join("")}\n        </ul>\n        <button class="event__favorite-btn ${e.isFavorite?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.485 4.455 1.62-9.44-6.865-6.69 9.475-1.39L14 0l4.255 7.935 9.475 1.39-6.865 6.69 1.62 9.44z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>\n  `;var e,i,n}getElement(){return this.element||(this.element=h(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{constructor(e,t,i){this.point=e,this.offers=t,this.destinations=i}getTemplate(){return function(e,i,n){const{id:s,dateFrom:r,dateTo:a,destination:o,type:c,basePrice:d}=e,l=t()(r).format("DD/MM/YY HH:mm"),f=t()(a).format("DD/MM/YY HH:mm"),u=n.find((e=>e.id===o))||{},h=i.find((e=>e.type===c))?.offers||[];return`\n    <li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${s}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${c}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle visually-hidden" id="event-type-toggle-${s}" type="checkbox">\n          </div>\n\n          <div class="event__field-group event__field-group--destination">\n            <label class="event__label event__type-output" for="event-destination-${s}">${c}</label>\n            <input class="event__input event__input--destination" id="event-destination-${s}" type="text" name="event-destination" value="${u.name||""}" list="destination-list-${s}">\n            <datalist id="destination-list-${s}">\n              ${n.map((e=>`<option value="${e.name}"></option>`)).join("")}\n            </datalist>\n          </div>\n\n          <div class="event__field-group event__field-group--time">\n            <input class="event__input event__input--time" type="text" name="event-start-time" value="${l}">\n            &mdash;\n            <input class="event__input event__input--time" type="text" name="event-end-time" value="${f}">\n          </div>\n\n          <div class="event__field-group event__field-group--price">\n            <label class="event__label">&euro;</label>\n            <input class="event__input event__input--price" type="text" name="event-price" value="${d}">\n          </div>\n\n          <button class="event__save-btn btn btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Cancel</button>\n        </header>\n\n        <section class="event__details">\n          <section class="event__section event__section--offers">\n            <h3 class="event__section-title event__section-title--offers">Offers</h3>\n            <div class="event__available-offers">${h.length>0?h.map((e=>`\n        <div class="event__offer-selector">\n          <input class="event__offer-checkbox visually-hidden" id="event-offer-${e.id}" type="checkbox" name="event-offer" checked>\n          <label class="event__offer-label" for="event-offer-${e.id}">\n            <span class="event__offer-title">${e.title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${e.price}</span>\n          </label>\n        </div>\n      `)).join(""):'<p class="event__no-offers">No available offers</p>'}</div>\n          </section>\n\n          <section class="event__section event__section--destination">\n            <h3 class="event__section-title event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${u.description||"No description available"}</p>\n            <div class="event__photos-container">\n              <div class="event__photos-tape">\n                ${(u.pictures||[]).map((e=>`<img class="event__photo" src="${e.src}" alt="Event photo">`)).join("")}\n              </div>\n            </div>\n          </section>\n        </section>\n      </form>\n    </li>\n  `}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=h(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=h(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{getTemplate(){return'<ul class="trip-events__list">\n    </ul>'}getElement(){return this.element||(this.element=h(this.getTemplate())),this.element}removeElement(){this.element=null}}const g=document.querySelector(".trip-main"),M=document.querySelector(".trip-events"),T=g.querySelector(".trip-controls__filters"),w=new l;new class{constructor({headerContainer:e,mainContainer:t,controlsFilter:i}){this.headerContainer=e,this.mainContainer=t,this.controlsFilter=i,this.pointModel=new l}init(){this.pointModel.init();const e=this.pointModel.getPoints(),t=this.pointModel.getOffers(),i=this.pointModel.getDestinations();p(new $,this.headerContainer,f),p(new v,this.controlsFilter,u),p(new m,this.mainContainer,u);const n=new y;p(n,this.mainContainer,u),e.forEach((e=>{const s=i.find((t=>t.id===e.destination)),r=t.find((t=>t.type===e.type))?.offers||[];p(new b(e,s,r),n.getElement(),u)})),p(new _(e[0],t,i),n.getElement(),f)}}({headerContainer:g,mainContainer:M,controlsFilter:T,pointsModel:w}).init()})()})();
//# sourceMappingURL=bundle.9c1d42a2e72068e9742e.js.map