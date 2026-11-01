(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ls="181",Qr={ROTATE:0,DOLLY:1,PAN:2},Yr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},l0=0,Qu=1,u0=2,Rd=1,Cd=2,fi=3,ei=0,nn=1,yn=2,gi=0,ts=1,th=2,eh=3,nh=4,h0=5,er=100,f0=101,d0=102,p0=103,x0=104,m0=200,g0=201,_0=202,v0=203,sl=204,ol=205,y0=206,b0=207,M0=208,S0=209,E0=210,T0=211,w0=212,A0=213,R0=214,al=0,cl=1,ll=2,ns=3,ul=4,hl=5,fl=6,dl=7,Pd=0,C0=1,P0=2,Oi=0,I0=1,L0=2,D0=3,U0=4,N0=5,F0=6,O0=7,Id=300,is=301,rs=302,pl=303,xl=304,Ia=306,_a=1e3,Jn=1001,va=1002,fn=1003,Ld=1004,Is=1005,Mn=1006,sa=1007,Ui=1008,ni=1009,Dd=1010,Ud=1011,Ys=1012,cu=1013,ar=1014,mi=1015,us=1016,lu=1017,uu=1018,js=1020,Nd=35902,Fd=35899,Od=1021,Bd=1022,Ln=1023,Zs=1026,$s=1027,zd=1028,hu=1029,fu=1030,du=1031,pu=1033,oa=33776,aa=33777,ca=33778,la=33779,ml=35840,gl=35841,_l=35842,vl=35843,yl=36196,bl=37492,Ml=37496,Sl=37808,El=37809,Tl=37810,wl=37811,Al=37812,Rl=37813,Cl=37814,Pl=37815,Il=37816,Ll=37817,Dl=37818,Ul=37819,Nl=37820,Fl=37821,Ol=36492,Bl=36494,zl=36495,Vl=36283,kl=36284,Hl=36285,Gl=36286,B0=2300,z0=2301,V0=3200,k0=3201,Vd=0,H0=1,xi="",hn="srgb",ss="srgb-linear",ya="linear",ue="srgb",mr=7680,ih=519,G0=512,W0=513,X0=514,kd=515,q0=516,Y0=517,j0=518,Z0=519,rh=35044,sh="300 es",Qn=2e3,ba=2001;function Hd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ma(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $0(){const i=Ma("canvas");return i.style.display="block",i}const oh={};function ah(...i){const t="THREE."+i.shift();console.log(t,...i)}function Ht(...i){const t="THREE."+i.shift();console.warn(t,...i)}function ne(...i){const t="THREE."+i.shift();console.error(t,...i)}function Ks(...i){const t=i.join(" ");t in oh||(oh[t]=!0,Ht(...i))}function K0(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}class hr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ch=1234567;const Os=Math.PI/180,Js=180/Math.PI;function fr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function xu(i,t){return(i%t+t)%t}function J0(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function Q0(i,t,e){return i!==t?(e-i)/(t-i):0}function Bs(i,t,e){return(1-e)*i+e*t}function tx(i,t,e,n){return Bs(i,t,1-Math.exp(-e*n))}function ex(i,t=1){return t-Math.abs(xu(i,t*2)-t)}function nx(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function ix(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function rx(i,t){return i+Math.floor(Math.random()*(t-i+1))}function sx(i,t){return i+Math.random()*(t-i)}function ox(i){return i*(.5-Math.random())}function ax(i){i!==void 0&&(ch=i);let t=ch+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cx(i){return i*Os}function lx(i){return i*Js}function ux(i){return(i&i-1)===0&&i!==0}function hx(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function fx(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function dx(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),h=s((t+n)/2),f=o((t+n)/2),p=s((t-n)/2),x=o((t-n)/2),m=s((n-t)/2),v=o((n-t)/2);switch(r){case"XYX":i.set(a*f,c*p,c*x,a*h);break;case"YZY":i.set(c*x,a*f,c*p,a*h);break;case"ZXZ":i.set(c*p,c*x,a*f,a*h);break;case"XZX":i.set(a*f,c*v,c*m,a*h);break;case"YXY":i.set(c*m,a*f,c*v,a*h);break;case"ZYZ":i.set(c*v,c*m,a*f,a*h);break;default:Ht("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Wr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function tn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Bi={DEG2RAD:Os,RAD2DEG:Js,generateUUID:fr,clamp:Xt,euclideanModulo:xu,mapLinear:J0,inverseLerp:Q0,lerp:Bs,damp:tx,pingpong:ex,smoothstep:nx,smootherstep:ix,randInt:rx,randFloat:sx,randFloatSpread:ox,seededRandom:ax,degToRad:cx,radToDeg:lx,isPowerOfTwo:ux,ceilPowerOfTwo:hx,floorPowerOfTwo:fx,setQuaternionFromProperEuler:dx,normalize:tn,denormalize:Wr};class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let c=n[r+0],h=n[r+1],f=n[r+2],p=n[r+3],x=s[o+0],m=s[o+1],v=s[o+2],S=s[o+3];if(a<=0){t[e+0]=c,t[e+1]=h,t[e+2]=f,t[e+3]=p;return}if(a>=1){t[e+0]=x,t[e+1]=m,t[e+2]=v,t[e+3]=S;return}if(p!==S||c!==x||h!==m||f!==v){let _=c*x+h*m+f*v+p*S;_<0&&(x=-x,m=-m,v=-v,S=-S,_=-_);let g=1-a;if(_<.9995){const E=Math.acos(_),d=Math.sin(E);g=Math.sin(g*E)/d,a=Math.sin(a*E)/d,c=c*g+x*a,h=h*g+m*a,f=f*g+v*a,p=p*g+S*a}else{c=c*g+x*a,h=h*g+m*a,f=f*g+v*a,p=p*g+S*a;const E=1/Math.sqrt(c*c+h*h+f*f+p*p);c*=E,h*=E,f*=E,p*=E}}t[e]=c,t[e+1]=h,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],c=n[r+1],h=n[r+2],f=n[r+3],p=s[o],x=s[o+1],m=s[o+2],v=s[o+3];return t[e]=a*v+f*p+c*m-h*x,t[e+1]=c*v+f*x+h*p-a*m,t[e+2]=h*v+f*m+a*x-c*p,t[e+3]=f*v-a*p-c*x-h*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,h=a(n/2),f=a(r/2),p=a(s/2),x=c(n/2),m=c(r/2),v=c(s/2);switch(o){case"XYZ":this._x=x*f*p+h*m*v,this._y=h*m*p-x*f*v,this._z=h*f*v+x*m*p,this._w=h*f*p-x*m*v;break;case"YXZ":this._x=x*f*p+h*m*v,this._y=h*m*p-x*f*v,this._z=h*f*v-x*m*p,this._w=h*f*p+x*m*v;break;case"ZXY":this._x=x*f*p-h*m*v,this._y=h*m*p+x*f*v,this._z=h*f*v+x*m*p,this._w=h*f*p-x*m*v;break;case"ZYX":this._x=x*f*p-h*m*v,this._y=h*m*p+x*f*v,this._z=h*f*v-x*m*p,this._w=h*f*p+x*m*v;break;case"YZX":this._x=x*f*p+h*m*v,this._y=h*m*p+x*f*v,this._z=h*f*v-x*m*p,this._w=h*f*p-x*m*v;break;case"XZY":this._x=x*f*p-h*m*v,this._y=h*m*p-x*f*v,this._z=h*f*v+x*m*p,this._w=h*f*p+x*m*v;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],h=e[2],f=e[6],p=e[10],x=n+a+p;if(x>0){const m=.5/Math.sqrt(x+1);this._w=.25/m,this._x=(f-c)*m,this._y=(s-h)*m,this._z=(o-r)*m}else if(n>a&&n>p){const m=2*Math.sqrt(1+n-a-p);this._w=(f-c)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+h)/m}else if(a>p){const m=2*Math.sqrt(1+a-n-p);this._w=(s-h)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+p-n-a);this._w=(o-r)/m,this._x=(s+h)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,h=e._z,f=e._w;return this._x=n*f+o*a+r*h-s*c,this._y=r*f+o*c+s*a-n*h,this._z=s*f+o*h+n*c-r*a,this._w=o*f-n*a-r*c-s*h,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,r=t._y,s=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,r=-r,s=-s,o=-o,a=-a);let c=1-e;if(a<.9995){const h=Math.acos(a),f=Math.sin(h);c=Math.sin(c*h)/f,e=Math.sin(e*h)/f,this._x=this._x*c+n*e,this._y=this._y*c+r*e,this._z=this._z*c+s*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+r*e,this._z=this._z*c+s*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(lh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(lh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,h=2*(o*r-a*n),f=2*(a*e-s*r),p=2*(s*n-o*e);return this.x=e+c*h+o*p-a*f,this.y=n+c*f+a*h-s*p,this.z=r+c*p+s*f-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Xa.copy(this).projectOnVector(t),this.sub(Xa)}reflect(t){return this.sub(Xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new I,lh=new He;class Zt{constructor(t,e,n,r,s,o,a,c,h){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,h)}set(t,e,n,r,s,o,a,c,h){const f=this.elements;return f[0]=t,f[1]=r,f[2]=a,f[3]=e,f[4]=s,f[5]=c,f[6]=n,f[7]=o,f[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],h=n[1],f=n[4],p=n[7],x=n[2],m=n[5],v=n[8],S=r[0],_=r[3],g=r[6],E=r[1],d=r[4],l=r[7],b=r[2],u=r[5],R=r[8];return s[0]=o*S+a*E+c*b,s[3]=o*_+a*d+c*u,s[6]=o*g+a*l+c*R,s[1]=h*S+f*E+p*b,s[4]=h*_+f*d+p*u,s[7]=h*g+f*l+p*R,s[2]=x*S+m*E+v*b,s[5]=x*_+m*d+v*u,s[8]=x*g+m*l+v*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],h=t[7],f=t[8];return e*o*f-e*a*h-n*s*f+n*a*c+r*s*h-r*o*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],h=t[7],f=t[8],p=f*o-a*h,x=a*c-f*s,m=h*s-o*c,v=e*p+n*x+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/v;return t[0]=p*S,t[1]=(r*h-f*n)*S,t[2]=(a*n-r*o)*S,t[3]=x*S,t[4]=(f*e-r*c)*S,t[5]=(r*s-a*e)*S,t[6]=m*S,t[7]=(n*c-h*e)*S,t[8]=(o*e-n*s)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const c=Math.cos(s),h=Math.sin(s);return this.set(n*c,n*h,-n*(c*o+h*a)+o+t,-r*h,r*c,-r*(-h*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(qa.makeScale(t,e)),this}rotate(t){return this.premultiply(qa.makeRotation(-t)),this}translate(t,e){return this.premultiply(qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const qa=new Zt,uh=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function px(){const i={enabled:!0,workingColorSpace:ss,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ue&&(r.r=_i(r.r),r.g=_i(r.g),r.b=_i(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(r.r=es(r.r),r.g=es(r.g),r.b=es(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===xi?ya:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ks("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ks("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ss]:{primaries:t,whitePoint:n,transfer:ya,toXYZ:uh,fromXYZ:hh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:uh,fromXYZ:hh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const ee=px();function _i(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function es(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gr;class Gd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{gr===void 0&&(gr=Ma("canvas")),gr.width=t.width,gr.height=t.height;const r=gr.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=gr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ma("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=_i(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(_i(e[n]/255)*255):e[n]=_i(e[n]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xx=0;class La{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xx++}),this.uuid=fr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ya(r[o].image)):s.push(Ya(r[o]))}else s=Ya(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ya(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}let mx=0;const ja=new I;class Ke extends hr{constructor(t=Ke.DEFAULT_IMAGE,e=Ke.DEFAULT_MAPPING,n=Jn,r=Jn,s=Mn,o=Ui,a=Ln,c=ni,h=Ke.DEFAULT_ANISOTROPY,f=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=fr(),this.name="",this.source=new La(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ja).x}get height(){return this.source.getSize(ja).y}get depth(){return this.source.getSize(ja).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Id)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _a:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case va:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _a:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case va:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Id;Ke.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,n=0,r=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,h=c[0],f=c[4],p=c[8],x=c[1],m=c[5],v=c[9],S=c[2],_=c[6],g=c[10];if(Math.abs(f-x)<.01&&Math.abs(p-S)<.01&&Math.abs(v-_)<.01){if(Math.abs(f+x)<.1&&Math.abs(p+S)<.1&&Math.abs(v+_)<.1&&Math.abs(h+m+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const d=(h+1)/2,l=(m+1)/2,b=(g+1)/2,u=(f+x)/4,R=(p+S)/4,w=(v+_)/4;return d>l&&d>b?d<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(d),r=u/n,s=R/n):l>b?l<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(l),n=u/r,s=w/r):b<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),n=R/s,r=w/s),this.set(n,r,s,e),this}let E=Math.sqrt((_-v)*(_-v)+(p-S)*(p-S)+(x-f)*(x-f));return Math.abs(E)<.001&&(E=1),this.x=(_-v)/E,this.y=(p-S)/E,this.z=(x-f)/E,this.w=Math.acos((h+m+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gx extends hr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new Ke(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new La(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cr extends gx{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Wd extends Ke{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _x extends Ke{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xe{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,On):On.fromBufferAttribute(s,o),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ao.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ao.copy(n.boundingBox)),ao.applyMatrix4(t.matrixWorld),this.union(ao)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),co.subVectors(this.max,ms),_r.subVectors(t.a,ms),vr.subVectors(t.b,ms),yr.subVectors(t.c,ms),bi.subVectors(vr,_r),Mi.subVectors(yr,vr),ki.subVectors(_r,yr);let e=[0,-bi.z,bi.y,0,-Mi.z,Mi.y,0,-ki.z,ki.y,bi.z,0,-bi.x,Mi.z,0,-Mi.x,ki.z,0,-ki.x,-bi.y,bi.x,0,-Mi.y,Mi.x,0,-ki.y,ki.x,0];return!Za(e,_r,vr,yr,co)||(e=[1,0,0,0,1,0,0,0,1],!Za(e,_r,vr,yr,co))?!1:(lo.crossVectors(bi,Mi),e=[lo.x,lo.y,lo.z],Za(e,_r,vr,yr,co))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ri=[new I,new I,new I,new I,new I,new I,new I,new I],On=new I,ao=new Xe,_r=new I,vr=new I,yr=new I,bi=new I,Mi=new I,ki=new I,ms=new I,co=new I,lo=new I,Hi=new I;function Za(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Hi.fromArray(i,s);const a=r.x*Math.abs(Hi.x)+r.y*Math.abs(Hi.y)+r.z*Math.abs(Hi.z),c=t.dot(Hi),h=e.dot(Hi),f=n.dot(Hi);if(Math.max(-Math.max(c,h,f),Math.min(c,h,f))>a)return!1}return!0}const vx=new Xe,gs=new I,$a=new I;class io{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):vx.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(gs,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add($a)),this.expandByPoint(gs.copy(t.center).sub($a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const si=new I,Ka=new I,uo=new I,Si=new I,Ja=new I,ho=new I,Qa=new I;class dr{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(si.copy(this.origin).addScaledVector(this.direction,e),si.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Ka.copy(t).add(e).multiplyScalar(.5),uo.copy(e).sub(t).normalize(),Si.copy(this.origin).sub(Ka);const s=t.distanceTo(e)*.5,o=-this.direction.dot(uo),a=Si.dot(this.direction),c=-Si.dot(uo),h=Si.lengthSq(),f=Math.abs(1-o*o);let p,x,m,v;if(f>0)if(p=o*c-a,x=o*a-c,v=s*f,p>=0)if(x>=-v)if(x<=v){const S=1/f;p*=S,x*=S,m=p*(p+o*x+2*a)+x*(o*p+x+2*c)+h}else x=s,p=Math.max(0,-(o*x+a)),m=-p*p+x*(x+2*c)+h;else x=-s,p=Math.max(0,-(o*x+a)),m=-p*p+x*(x+2*c)+h;else x<=-v?(p=Math.max(0,-(-o*s+a)),x=p>0?-s:Math.min(Math.max(-s,-c),s),m=-p*p+x*(x+2*c)+h):x<=v?(p=0,x=Math.min(Math.max(-s,-c),s),m=x*(x+2*c)+h):(p=Math.max(0,-(o*s+a)),x=p>0?s:Math.min(Math.max(-s,-c),s),m=-p*p+x*(x+2*c)+h);else x=o>0?-s:s,p=Math.max(0,-(o*x+a)),m=-p*p+x*(x+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Ka).addScaledVector(uo,x),m}intersectSphere(t,e){si.subVectors(t.center,this.origin);const n=si.dot(this.direction),r=si.dot(si)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,c;const h=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,x=this.origin;return h>=0?(n=(t.min.x-x.x)*h,r=(t.max.x-x.x)*h):(n=(t.max.x-x.x)*h,r=(t.min.x-x.x)*h),f>=0?(s=(t.min.y-x.y)*f,o=(t.max.y-x.y)*f):(s=(t.max.y-x.y)*f,o=(t.min.y-x.y)*f),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),p>=0?(a=(t.min.z-x.z)*p,c=(t.max.z-x.z)*p):(a=(t.max.z-x.z)*p,c=(t.min.z-x.z)*p),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,si)!==null}intersectTriangle(t,e,n,r,s){Ja.subVectors(e,t),ho.subVectors(n,t),Qa.crossVectors(Ja,ho);let o=this.direction.dot(Qa),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Si.subVectors(this.origin,t);const c=a*this.direction.dot(ho.crossVectors(Si,ho));if(c<0)return null;const h=a*this.direction.dot(Ja.cross(Si));if(h<0||c+h>o)return null;const f=-a*Si.dot(Qa);return f<0?null:this.at(f/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $t{constructor(t,e,n,r,s,o,a,c,h,f,p,x,m,v,S,_){$t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,h,f,p,x,m,v,S,_)}set(t,e,n,r,s,o,a,c,h,f,p,x,m,v,S,_){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=r,g[1]=s,g[5]=o,g[9]=a,g[13]=c,g[2]=h,g[6]=f,g[10]=p,g[14]=x,g[3]=m,g[7]=v,g[11]=S,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $t().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/br.setFromMatrixColumn(t,0).length(),s=1/br.setFromMatrixColumn(t,1).length(),o=1/br.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),h=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(t.order==="XYZ"){const x=o*f,m=o*p,v=a*f,S=a*p;e[0]=c*f,e[4]=-c*p,e[8]=h,e[1]=m+v*h,e[5]=x-S*h,e[9]=-a*c,e[2]=S-x*h,e[6]=v+m*h,e[10]=o*c}else if(t.order==="YXZ"){const x=c*f,m=c*p,v=h*f,S=h*p;e[0]=x+S*a,e[4]=v*a-m,e[8]=o*h,e[1]=o*p,e[5]=o*f,e[9]=-a,e[2]=m*a-v,e[6]=S+x*a,e[10]=o*c}else if(t.order==="ZXY"){const x=c*f,m=c*p,v=h*f,S=h*p;e[0]=x-S*a,e[4]=-o*p,e[8]=v+m*a,e[1]=m+v*a,e[5]=o*f,e[9]=S-x*a,e[2]=-o*h,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const x=o*f,m=o*p,v=a*f,S=a*p;e[0]=c*f,e[4]=v*h-m,e[8]=x*h+S,e[1]=c*p,e[5]=S*h+x,e[9]=m*h-v,e[2]=-h,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const x=o*c,m=o*h,v=a*c,S=a*h;e[0]=c*f,e[4]=S-x*p,e[8]=v*p+m,e[1]=p,e[5]=o*f,e[9]=-a*f,e[2]=-h*f,e[6]=m*p+v,e[10]=x-S*p}else if(t.order==="XZY"){const x=o*c,m=o*h,v=a*c,S=a*h;e[0]=c*f,e[4]=-p,e[8]=h*f,e[1]=x*p+S,e[5]=o*f,e[9]=m*p-v,e[2]=v*p-m,e[6]=a*f,e[10]=S*p+x}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yx,t,bx)}lookAt(t,e,n){const r=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Ei.crossVectors(n,gn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Ei.crossVectors(n,gn)),Ei.normalize(),fo.crossVectors(gn,Ei),r[0]=Ei.x,r[4]=fo.x,r[8]=gn.x,r[1]=Ei.y,r[5]=fo.y,r[9]=gn.y,r[2]=Ei.z,r[6]=fo.z,r[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],h=n[12],f=n[1],p=n[5],x=n[9],m=n[13],v=n[2],S=n[6],_=n[10],g=n[14],E=n[3],d=n[7],l=n[11],b=n[15],u=r[0],R=r[4],w=r[8],M=r[12],y=r[1],T=r[5],A=r[9],C=r[13],F=r[2],N=r[6],O=r[10],B=r[14],V=r[3],W=r[7],nt=r[11],it=r[15];return s[0]=o*u+a*y+c*F+h*V,s[4]=o*R+a*T+c*N+h*W,s[8]=o*w+a*A+c*O+h*nt,s[12]=o*M+a*C+c*B+h*it,s[1]=f*u+p*y+x*F+m*V,s[5]=f*R+p*T+x*N+m*W,s[9]=f*w+p*A+x*O+m*nt,s[13]=f*M+p*C+x*B+m*it,s[2]=v*u+S*y+_*F+g*V,s[6]=v*R+S*T+_*N+g*W,s[10]=v*w+S*A+_*O+g*nt,s[14]=v*M+S*C+_*B+g*it,s[3]=E*u+d*y+l*F+b*V,s[7]=E*R+d*T+l*N+b*W,s[11]=E*w+d*A+l*O+b*nt,s[15]=E*M+d*C+l*B+b*it,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],h=t[13],f=t[2],p=t[6],x=t[10],m=t[14],v=t[3],S=t[7],_=t[11],g=t[15];return v*(+s*c*p-r*h*p-s*a*x+n*h*x+r*a*m-n*c*m)+S*(+e*c*m-e*h*x+s*o*x-r*o*m+r*h*f-s*c*f)+_*(+e*h*p-e*a*m-s*o*p+n*o*m+s*a*f-n*h*f)+g*(-r*a*f-e*c*p+e*a*x+r*o*p-n*o*x+n*c*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],h=t[7],f=t[8],p=t[9],x=t[10],m=t[11],v=t[12],S=t[13],_=t[14],g=t[15],E=p*_*h-S*x*h+S*c*m-a*_*m-p*c*g+a*x*g,d=v*x*h-f*_*h-v*c*m+o*_*m+f*c*g-o*x*g,l=f*S*h-v*p*h+v*a*m-o*S*m-f*a*g+o*p*g,b=v*p*c-f*S*c-v*a*x+o*S*x+f*a*_-o*p*_,u=e*E+n*d+r*l+s*b;if(u===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/u;return t[0]=E*R,t[1]=(S*x*s-p*_*s-S*r*m+n*_*m+p*r*g-n*x*g)*R,t[2]=(a*_*s-S*c*s+S*r*h-n*_*h-a*r*g+n*c*g)*R,t[3]=(p*c*s-a*x*s-p*r*h+n*x*h+a*r*m-n*c*m)*R,t[4]=d*R,t[5]=(f*_*s-v*x*s+v*r*m-e*_*m-f*r*g+e*x*g)*R,t[6]=(v*c*s-o*_*s-v*r*h+e*_*h+o*r*g-e*c*g)*R,t[7]=(o*x*s-f*c*s+f*r*h-e*x*h-o*r*m+e*c*m)*R,t[8]=l*R,t[9]=(v*p*s-f*S*s-v*n*m+e*S*m+f*n*g-e*p*g)*R,t[10]=(o*S*s-v*a*s+v*n*h-e*S*h-o*n*g+e*a*g)*R,t[11]=(f*a*s-o*p*s-f*n*h+e*p*h+o*n*m-e*a*m)*R,t[12]=b*R,t[13]=(f*S*r-v*p*r+v*n*x-e*S*x-f*n*_+e*p*_)*R,t[14]=(v*a*r-o*S*r-v*n*c+e*S*c+o*n*_-e*a*_)*R,t[15]=(o*p*r-f*a*r+f*n*c-e*p*c-o*n*x+e*a*x)*R,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,h=s*o,f=s*a;return this.set(h*o+n,h*a-r*c,h*c+r*a,0,h*a+r*c,f*a+n,f*c-r*o,0,h*c-r*a,f*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,h=s+s,f=o+o,p=a+a,x=s*h,m=s*f,v=s*p,S=o*f,_=o*p,g=a*p,E=c*h,d=c*f,l=c*p,b=n.x,u=n.y,R=n.z;return r[0]=(1-(S+g))*b,r[1]=(m+l)*b,r[2]=(v-d)*b,r[3]=0,r[4]=(m-l)*u,r[5]=(1-(x+g))*u,r[6]=(_+E)*u,r[7]=0,r[8]=(v+d)*R,r[9]=(_-E)*R,r[10]=(1-(x+S))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=br.set(r[0],r[1],r[2]).length();const o=br.set(r[4],r[5],r[6]).length(),a=br.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Bn.copy(this);const h=1/s,f=1/o,p=1/a;return Bn.elements[0]*=h,Bn.elements[1]*=h,Bn.elements[2]*=h,Bn.elements[4]*=f,Bn.elements[5]*=f,Bn.elements[6]*=f,Bn.elements[8]*=p,Bn.elements[9]*=p,Bn.elements[10]*=p,e.setFromRotationMatrix(Bn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=Qn,c=!1){const h=this.elements,f=2*s/(e-t),p=2*s/(n-r),x=(e+t)/(e-t),m=(n+r)/(n-r);let v,S;if(c)v=s/(o-s),S=o*s/(o-s);else if(a===Qn)v=-(o+s)/(o-s),S=-2*o*s/(o-s);else if(a===ba)v=-o/(o-s),S=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return h[0]=f,h[4]=0,h[8]=x,h[12]=0,h[1]=0,h[5]=p,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=v,h[14]=S,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=Qn,c=!1){const h=this.elements,f=2/(e-t),p=2/(n-r),x=-(e+t)/(e-t),m=-(n+r)/(n-r);let v,S;if(c)v=1/(o-s),S=o/(o-s);else if(a===Qn)v=-2/(o-s),S=-(o+s)/(o-s);else if(a===ba)v=-1/(o-s),S=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return h[0]=f,h[4]=0,h[8]=0,h[12]=x,h[1]=0,h[5]=p,h[9]=0,h[13]=m,h[2]=0,h[6]=0,h[10]=v,h[14]=S,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const br=new I,Bn=new $t,yx=new I(0,0,0),bx=new I(1,1,1),Ei=new I,fo=new I,gn=new I,fh=new $t,dh=new He;class Wn{constructor(t=0,e=0,n=0,r=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],h=r[5],f=r[9],p=r[2],x=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(x,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Xt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(x,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,h),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(x,h),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dh.setFromEuler(this),this.setFromQuaternion(dh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class mu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Mx=0;const ph=new I,Mr=new He,oi=new $t,po=new I,_s=new I,Sx=new I,Ex=new He,xh=new I(1,0,0),mh=new I(0,1,0),gh=new I(0,0,1),_h={type:"added"},Tx={type:"removed"},Sr={type:"childadded",child:null},tc={type:"childremoved",child:null};class Pe extends hr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mx++}),this.uuid=fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new I,e=new Wn,n=new He,r=new I(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new $t},normalMatrix:{value:new Zt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mr.setFromAxisAngle(t,e),this.quaternion.multiply(Mr),this}rotateOnWorldAxis(t,e){return Mr.setFromAxisAngle(t,e),this.quaternion.premultiply(Mr),this}rotateX(t){return this.rotateOnAxis(xh,t)}rotateY(t){return this.rotateOnAxis(mh,t)}rotateZ(t){return this.rotateOnAxis(gh,t)}translateOnAxis(t,e){return ph.copy(t).applyQuaternion(this.quaternion),this.position.add(ph.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xh,t)}translateY(t){return this.translateOnAxis(mh,t)}translateZ(t){return this.translateOnAxis(gh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?po.copy(t):po.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(_s,po,this.up):oi.lookAt(po,_s,this.up),this.quaternion.setFromRotationMatrix(oi),r&&(oi.extractRotation(r.matrixWorld),Mr.setFromRotationMatrix(oi),this.quaternion.premultiply(Mr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_h),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null):ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tx),tc.child=t,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_h),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,Sx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,Ex,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let h=0,f=c.length;h<f;h++){const p=c[h];s(t.shapes,p)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),h=o(t.textures),f=o(t.images),p=o(t.shapes),x=o(t.skeletons),m=o(t.animations),v=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),x.length>0&&(n.skeletons=x),m.length>0&&(n.animations=m),v.length>0&&(n.nodes=v)}return n.object=r,n;function o(a){const c=[];for(const h in a){const f=a[h];delete f.metadata,c.push(f)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Pe.DEFAULT_UP=new I(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new I,ai=new I,ec=new I,ci=new I,Er=new I,Tr=new I,vh=new I,nc=new I,ic=new I,rc=new I,sc=new pe,oc=new pe,ac=new pe;class ge{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),zn.subVectors(t,e),r.cross(zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){zn.subVectors(r,e),ai.subVectors(n,e),ec.subVectors(t,e);const o=zn.dot(zn),a=zn.dot(ai),c=zn.dot(ec),h=ai.dot(ai),f=ai.dot(ec),p=o*h-a*a;if(p===0)return s.set(0,0,0),null;const x=1/p,m=(h*c-a*f)*x,v=(o*f-a*c)*x;return s.set(1-m-v,v,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(t,e,n,r,s,o,a,c){return this.getBarycoord(t,e,n,r,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ci.x),c.addScaledVector(o,ci.y),c.addScaledVector(a,ci.z),c)}static getInterpolatedAttribute(t,e,n,r,s,o){return sc.setScalar(0),oc.setScalar(0),ac.setScalar(0),sc.fromBufferAttribute(t,e),oc.fromBufferAttribute(t,n),ac.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(sc,s.x),o.addScaledVector(oc,s.y),o.addScaledVector(ac,s.z),o}static isFrontFacing(t,e,n,r){return zn.subVectors(n,e),ai.subVectors(t,e),zn.cross(ai).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),zn.cross(ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ge.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ge.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return ge.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return ge.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ge.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;Er.subVectors(r,n),Tr.subVectors(s,n),nc.subVectors(t,n);const c=Er.dot(nc),h=Tr.dot(nc);if(c<=0&&h<=0)return e.copy(n);ic.subVectors(t,r);const f=Er.dot(ic),p=Tr.dot(ic);if(f>=0&&p<=f)return e.copy(r);const x=c*p-f*h;if(x<=0&&c>=0&&f<=0)return o=c/(c-f),e.copy(n).addScaledVector(Er,o);rc.subVectors(t,s);const m=Er.dot(rc),v=Tr.dot(rc);if(v>=0&&m<=v)return e.copy(s);const S=m*h-c*v;if(S<=0&&h>=0&&v<=0)return a=h/(h-v),e.copy(n).addScaledVector(Tr,a);const _=f*v-m*p;if(_<=0&&p-f>=0&&m-v>=0)return vh.subVectors(s,r),a=(p-f)/(p-f+(m-v)),e.copy(r).addScaledVector(vh,a);const g=1/(_+S+x);return o=S*g,a=x*g,e.copy(n).addScaledVector(Er,o).addScaledVector(Tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},xo={h:0,s:0,l:0};function cc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=ee.workingColorSpace){if(t=xu(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=cc(o,s,t+1/3),this.g=cc(o,s,t),this.b=cc(o,s,t-1/3)}return ee.colorSpaceToWorking(this,r),this}setStyle(t,e=hn){function n(s){s!==void 0&&parseFloat(s)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const n=Xd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}copyLinearToSRGB(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return ee.workingToColorSpace(je.copy(this),t),Math.round(Xt(je.r*255,0,255))*65536+Math.round(Xt(je.g*255,0,255))*256+Math.round(Xt(je.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(je.copy(this),e);const n=je.r,r=je.g,s=je.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,h;const f=(a+o)/2;if(a===o)c=0,h=0;else{const p=o-a;switch(h=f<=.5?p/(o+a):p/(2-o-a),o){case n:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-n)/p+2;break;case s:c=(n-r)/p+4;break}c/=6}return t.h=c,t.s=h,t.l=f,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=hn){ee.workingToColorSpace(je.copy(this),t);const e=je.r,n=je.g,r=je.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(xo);const n=Bs(Ti.h,xo.h,e),r=Bs(Ti.s,xo.s,e),s=Bs(Ti.l,xo.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const je=new Jt;Jt.NAMES=Xd;let wx=0;class pr extends hr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=fr(),this.name="",this.type="Material",this.blending=ts,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sl,this.blendDst=ol,this.blendEquation=er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mr,this.stencilZFail=mr,this.stencilZPass=mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==sl&&(n.blendSrc=this.blendSrc),this.blendDst!==ol&&(n.blendDst=this.blendDst),this.blendEquation!==er&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Da extends pr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Pd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Le=new I,mo=new ct;let Ax=0;class Me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ax++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=rh,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)mo.fromBufferAttribute(this,e),mo.applyMatrix3(t),this.setXY(e,mo.x,mo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Wr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=tn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wr(e,this.array)),e}setX(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wr(e,this.array)),e}setY(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wr(e,this.array)),e}setW(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),n=tn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),n=tn(n,this.array),r=tn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),n=tn(n,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==rh&&(t.usage=this.usage),t}}class qd extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Yd extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ie extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Rx=0;const Rn=new $t,lc=new Pe,wr=new I,_n=new Xe,vs=new Xe,Ve=new I;class Ie extends hr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rx++}),this.uuid=fr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hd(t)?Yd:qd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Zt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Rn.makeRotationFromQuaternion(t),this.applyMatrix4(Rn),this}rotateX(t){return Rn.makeRotationX(t),this.applyMatrix4(Rn),this}rotateY(t){return Rn.makeRotationY(t),this.applyMatrix4(Rn),this}rotateZ(t){return Rn.makeRotationZ(t),this.applyMatrix4(Rn),this}translate(t,e,n){return Rn.makeTranslation(t,e,n),this.applyMatrix4(Rn),this}scale(t,e,n){return Rn.makeScale(t,e,n),this.applyMatrix4(Rn),this}lookAt(t){return lc.lookAt(t),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wr).negate(),this.translate(wr.x,wr.y,wr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ie(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xe);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new io);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(_n.min,vs.min),_n.expandByPoint(Ve),Ve.addVectors(_n.max,vs.max),_n.expandByPoint(Ve)):(_n.expandByPoint(vs.min),_n.expandByPoint(vs.max))}_n.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Ve.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Ve));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let h=0,f=a.count;h<f;h++)Ve.fromBufferAttribute(a,h),c&&(wr.fromBufferAttribute(t,h),Ve.add(wr)),r=Math.max(r,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let w=0;w<n.count;w++)a[w]=new I,c[w]=new I;const h=new I,f=new I,p=new I,x=new ct,m=new ct,v=new ct,S=new I,_=new I;function g(w,M,y){h.fromBufferAttribute(n,w),f.fromBufferAttribute(n,M),p.fromBufferAttribute(n,y),x.fromBufferAttribute(s,w),m.fromBufferAttribute(s,M),v.fromBufferAttribute(s,y),f.sub(h),p.sub(h),m.sub(x),v.sub(x);const T=1/(m.x*v.y-v.x*m.y);isFinite(T)&&(S.copy(f).multiplyScalar(v.y).addScaledVector(p,-m.y).multiplyScalar(T),_.copy(p).multiplyScalar(m.x).addScaledVector(f,-v.x).multiplyScalar(T),a[w].add(S),a[M].add(S),a[y].add(S),c[w].add(_),c[M].add(_),c[y].add(_))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let w=0,M=E.length;w<M;++w){const y=E[w],T=y.start,A=y.count;for(let C=T,F=T+A;C<F;C+=3)g(t.getX(C+0),t.getX(C+1),t.getX(C+2))}const d=new I,l=new I,b=new I,u=new I;function R(w){b.fromBufferAttribute(r,w),u.copy(b);const M=a[w];d.copy(M),d.sub(b.multiplyScalar(b.dot(M))).normalize(),l.crossVectors(u,M);const T=l.dot(c[w])<0?-1:1;o.setXYZW(w,d.x,d.y,d.z,T)}for(let w=0,M=E.length;w<M;++w){const y=E[w],T=y.start,A=y.count;for(let C=T,F=T+A;C<F;C+=3)R(t.getX(C+0)),R(t.getX(C+1)),R(t.getX(C+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let x=0,m=n.count;x<m;x++)n.setXYZ(x,0,0,0);const r=new I,s=new I,o=new I,a=new I,c=new I,h=new I,f=new I,p=new I;if(t)for(let x=0,m=t.count;x<m;x+=3){const v=t.getX(x+0),S=t.getX(x+1),_=t.getX(x+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,S),o.fromBufferAttribute(e,_),f.subVectors(o,s),p.subVectors(r,s),f.cross(p),a.fromBufferAttribute(n,v),c.fromBufferAttribute(n,S),h.fromBufferAttribute(n,_),a.add(f),c.add(f),h.add(f),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(S,c.x,c.y,c.z),n.setXYZ(_,h.x,h.y,h.z)}else for(let x=0,m=e.count;x<m;x+=3)r.fromBufferAttribute(e,x+0),s.fromBufferAttribute(e,x+1),o.fromBufferAttribute(e,x+2),f.subVectors(o,s),p.subVectors(r,s),f.cross(p),n.setXYZ(x+0,f.x,f.y,f.z),n.setXYZ(x+1,f.x,f.y,f.z),n.setXYZ(x+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,c){const h=a.array,f=a.itemSize,p=a.normalized,x=new h.constructor(c.length*f);let m=0,v=0;for(let S=0,_=c.length;S<_;S++){a.isInterleavedBufferAttribute?m=c[S]*a.data.stride+a.offset:m=c[S]*f;for(let g=0;g<f;g++)x[v++]=h[m++]}return new Me(x,f,p)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],h=t(c,n);e.setAttribute(a,h)}const s=this.morphAttributes;for(const a in s){const c=[],h=s[a];for(let f=0,p=h.length;f<p;f++){const x=h[f],m=t(x,n);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const h=n[c];t.data.attributes[c]=h.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const h=this.morphAttributes[c],f=[];for(let p=0,x=h.length;p<x;p++){const m=h[p];f.push(m.toJSON(t.data))}f.length>0&&(r[c]=f,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const h in r){const f=r[h];this.setAttribute(h,f.clone(e))}const s=t.morphAttributes;for(const h in s){const f=[],p=s[h];for(let x=0,m=p.length;x<m;x++)f.push(p[x].clone(e));this.morphAttributes[h]=f}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let h=0,f=o.length;h<f;h++){const p=o[h];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yh=new $t,Gi=new dr,go=new io,bh=new I,_o=new I,vo=new I,yo=new I,uc=new I,bo=new I,Mh=new I,Mo=new I;class Ct extends Pe{constructor(t=new Ie,e=new Da){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){bo.set(0,0,0);for(let c=0,h=s.length;c<h;c++){const f=a[c],p=s[c];f!==0&&(uc.fromBufferAttribute(p,t),o?bo.addScaledVector(uc,f):bo.addScaledVector(uc.sub(e),f))}e.add(bo)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(s),Gi.copy(t.ray).recast(t.near),!(go.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(go,bh)===null||Gi.origin.distanceToSquared(bh)>(t.far-t.near)**2))&&(yh.copy(s).invert(),Gi.copy(t.ray).applyMatrix4(yh),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Gi)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,h=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,x=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,S=x.length;v<S;v++){const _=x[v],g=o[_.materialIndex],E=Math.max(_.start,m.start),d=Math.min(a.count,Math.min(_.start+_.count,m.start+m.count));for(let l=E,b=d;l<b;l+=3){const u=a.getX(l),R=a.getX(l+1),w=a.getX(l+2);r=So(this,g,t,n,h,f,p,u,R,w),r&&(r.faceIndex=Math.floor(l/3),r.face.materialIndex=_.materialIndex,e.push(r))}}else{const v=Math.max(0,m.start),S=Math.min(a.count,m.start+m.count);for(let _=v,g=S;_<g;_+=3){const E=a.getX(_),d=a.getX(_+1),l=a.getX(_+2);r=So(this,o,t,n,h,f,p,E,d,l),r&&(r.faceIndex=Math.floor(_/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,S=x.length;v<S;v++){const _=x[v],g=o[_.materialIndex],E=Math.max(_.start,m.start),d=Math.min(c.count,Math.min(_.start+_.count,m.start+m.count));for(let l=E,b=d;l<b;l+=3){const u=l,R=l+1,w=l+2;r=So(this,g,t,n,h,f,p,u,R,w),r&&(r.faceIndex=Math.floor(l/3),r.face.materialIndex=_.materialIndex,e.push(r))}}else{const v=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let _=v,g=S;_<g;_+=3){const E=_,d=_+1,l=_+2;r=So(this,o,t,n,h,f,p,E,d,l),r&&(r.faceIndex=Math.floor(_/3),e.push(r))}}}}function Cx(i,t,e,n,r,s,o,a){let c;if(t.side===nn?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,t.side===ei,a),c===null)return null;Mo.copy(a),Mo.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(Mo);return h<e.near||h>e.far?null:{distance:h,point:Mo.clone(),object:i}}function So(i,t,e,n,r,s,o,a,c,h){i.getVertexPosition(a,_o),i.getVertexPosition(c,vo),i.getVertexPosition(h,yo);const f=Cx(i,t,e,n,_o,vo,yo,Mh);if(f){const p=new I;ge.getBarycoord(Mh,_o,vo,yo,p),r&&(f.uv=ge.getInterpolatedAttribute(r,a,c,h,p,new ct)),s&&(f.uv1=ge.getInterpolatedAttribute(s,a,c,h,p,new ct)),o&&(f.normal=ge.getInterpolatedAttribute(o,a,c,h,p,new I),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const x={a,b:c,c:h,normal:new I,materialIndex:0};ge.getNormal(_o,vo,yo,x.normal),f.face=x,f.barycoord=p}return f}class Re extends Ie{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],h=[],f=[],p=[];let x=0,m=0;v("z","y","x",-1,-1,n,e,t,o,s,0),v("z","y","x",1,-1,n,e,-t,o,s,1),v("x","z","y",1,1,t,n,e,r,o,2),v("x","z","y",1,-1,t,n,-e,r,o,3),v("x","y","z",1,-1,t,e,n,r,s,4),v("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new ie(h,3)),this.setAttribute("normal",new ie(f,3)),this.setAttribute("uv",new ie(p,2));function v(S,_,g,E,d,l,b,u,R,w,M){const y=l/R,T=b/w,A=l/2,C=b/2,F=u/2,N=R+1,O=w+1;let B=0,V=0;const W=new I;for(let nt=0;nt<O;nt++){const it=nt*T-C;for(let ht=0;ht<N;ht++){const _t=ht*y-A;W[S]=_t*E,W[_]=it*d,W[g]=F,h.push(W.x,W.y,W.z),W[S]=0,W[_]=0,W[g]=u>0?1:-1,f.push(W.x,W.y,W.z),p.push(ht/R),p.push(1-nt/w),B+=1}}for(let nt=0;nt<w;nt++)for(let it=0;it<R;it++){const ht=x+it+N*nt,_t=x+it+N*(nt+1),yt=x+(it+1)+N*(nt+1),Tt=x+(it+1)+N*nt;c.push(ht,_t,Tt),c.push(_t,yt,Tt),V+=6}a.addGroup(m,V,M),m+=V,x+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Re(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function en(i){const t={};for(let e=0;e<i.length;e++){const n=os(i[e]);for(const r in n)t[r]=n[r]}return t}function Px(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function jd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Ix={clone:os,merge:en};var Lx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends pr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lx,this.fragmentShader=Dx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=Px(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Zd extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const wi=new I,Sh=new ct,Eh=new ct;class Pn extends Zd{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Js*2*Math.atan(Math.tan(Os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(wi.x,wi.y).multiplyScalar(-t/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-t/wi.z)}getViewSize(t,e){return this.getViewBounds(t,Sh,Eh),e.subVectors(Eh,Sh)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Os*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,h=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*n/h,r*=o.width/c,n*=o.height/h}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ar=-90,Rr=1;class Ux extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Pn(Ar,Rr,t,e);r.layers=this.layers,this.add(r);const s=new Pn(Ar,Rr,t,e);s.layers=this.layers,this.add(s);const o=new Pn(Ar,Rr,t,e);o.layers=this.layers,this.add(o);const a=new Pn(Ar,Rr,t,e);a.layers=this.layers,this.add(a);const c=new Pn(Ar,Rr,t,e);c.layers=this.layers,this.add(c);const h=new Pn(Ar,Rr,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,c]=e;for(const h of e)this.remove(h);if(t===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ba)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,h,f]=this.children,p=t.getRenderTarget(),x=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,h),n.texture.generateMipmaps=S,t.setRenderTarget(n,5,r),t.render(e,f),t.setRenderTarget(p,x,m),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class $d extends Ke{constructor(t=[],e=is,n,r,s,o,a,c,h,f){super(t,e,n,r,s,o,a,c,h,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nx extends cr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new $d(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Re(5,5,5),s=new vi({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:gi});s.uniforms.tEquirect.value=e;const o=new Ct(r,s),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=Mn),new Ux(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}class ir extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fx={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(const S of t.hand.values()){const _=e.getJointPose(S,n),g=this._getHandJoint(h,S);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const f=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],x=f.position.distanceTo(p.position),m=.02,v=.005;h.inputState.pinching&&x>m+v?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&x<=m-v&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Fx)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ir;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Wl extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ox extends Ke{constructor(t=null,e=1,n=1,r,s,o,a,c,h=fn,f=fn,p,x){super(null,o,a,c,h,f,r,s,p,x),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fc=new I,Bx=new I,zx=new Zt;class In{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=fc.subVectors(n,e).cross(Bx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||zx.getNormalMatrix(t),r=this.coplanarPoint(fc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wi=new io,Vx=new ct(.5,.5),Eo=new I;class gu{constructor(t=new In,e=new In,n=new In,r=new In,s=new In,o=new In){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qn,n=!1){const r=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],h=s[3],f=s[4],p=s[5],x=s[6],m=s[7],v=s[8],S=s[9],_=s[10],g=s[11],E=s[12],d=s[13],l=s[14],b=s[15];if(r[0].setComponents(h-o,m-f,g-v,b-E).normalize(),r[1].setComponents(h+o,m+f,g+v,b+E).normalize(),r[2].setComponents(h+a,m+p,g+S,b+d).normalize(),r[3].setComponents(h-a,m-p,g-S,b-d).normalize(),n)r[4].setComponents(c,x,_,l).normalize(),r[5].setComponents(h-c,m-x,g-_,b-l).normalize();else if(r[4].setComponents(h-c,m-x,g-_,b-l).normalize(),e===Qn)r[5].setComponents(h+c,m+x,g+_,b+l).normalize();else if(e===ba)r[5].setComponents(c,x,_,l).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(t){Wi.center.set(0,0,0);const e=Vx.distanceTo(t.center);return Wi.radius=.7071067811865476+e,Wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Eo.x=r.normal.x>0?t.max.x:t.min.x,Eo.y=r.normal.y>0?t.max.y:t.min.y,Eo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Eo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ua extends pr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Sa=new I,Ea=new I,Th=new $t,ys=new dr,To=new io,dc=new I,wh=new I;class di extends Pe{constructor(t=new Ie,e=new Ua){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)Sa.fromBufferAttribute(e,r-1),Ea.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Sa.distanceTo(Ea);t.setAttribute("lineDistance",new ie(n,1))}else Ht("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(r),To.radius+=s,t.ray.intersectsSphere(To)===!1)return;Th.copy(r).invert(),ys.copy(t.ray).applyMatrix4(Th);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=this.isLineSegments?2:1,f=n.index,x=n.attributes.position;if(f!==null){const m=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let S=m,_=v-1;S<_;S+=h){const g=f.getX(S),E=f.getX(S+1),d=wo(this,t,ys,c,g,E,S);d&&e.push(d)}if(this.isLineLoop){const S=f.getX(v-1),_=f.getX(m),g=wo(this,t,ys,c,S,_,v-1);g&&e.push(g)}}else{const m=Math.max(0,o.start),v=Math.min(x.count,o.start+o.count);for(let S=m,_=v-1;S<_;S+=h){const g=wo(this,t,ys,c,S,S+1,S);g&&e.push(g)}if(this.isLineLoop){const S=wo(this,t,ys,c,v-1,m,v-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function wo(i,t,e,n,r,s,o){const a=i.geometry.attributes.position;if(Sa.fromBufferAttribute(a,r),Ea.fromBufferAttribute(a,s),e.distanceSqToSegment(Sa,Ea,dc,wh)>n)return;dc.applyMatrix4(i.matrixWorld);const h=t.ray.origin.distanceTo(dc);if(!(h<t.near||h>t.far))return{distance:h,point:wh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Ah=new I,Rh=new I;class Kd extends di{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)Ah.fromBufferAttribute(e,r),Rh.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ah.distanceTo(Rh);t.setAttribute("lineDistance",new ie(n,1))}else Ht("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pc extends Ke{constructor(t,e,n,r,s,o,a,c,h,f,p,x){super(null,o,a,c,h,f,r,s,p,x),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class Jd extends Ke{constructor(t,e,n=ar,r,s,o,a=fn,c=fn,h,f=Zs,p=1){if(f!==Zs&&f!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:t,height:e,depth:p};super(x,r,s,o,a,c,f,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new La(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Qd extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class _u extends Ie{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],c=[],h=new I,f=new ct;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let p=0,x=3;p<=e;p++,x+=3){const m=n+p/e*r;h.x=t*Math.cos(m),h.y=t*Math.sin(m),o.push(h.x,h.y,h.z),a.push(0,0,1),f.x=(o[x]/t+1)/2,f.y=(o[x+1]/t+1)/2,c.push(f.x,f.y)}for(let p=1;p<=e;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new ie(o,3)),this.setAttribute("normal",new ie(a,3)),this.setAttribute("uv",new ie(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _u(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ke extends Ie{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const h=this;r=Math.floor(r),s=Math.floor(s);const f=[],p=[],x=[],m=[];let v=0;const S=[],_=n/2;let g=0;E(),o===!1&&(t>0&&d(!0),e>0&&d(!1)),this.setIndex(f),this.setAttribute("position",new ie(p,3)),this.setAttribute("normal",new ie(x,3)),this.setAttribute("uv",new ie(m,2));function E(){const l=new I,b=new I;let u=0;const R=(e-t)/n;for(let w=0;w<=s;w++){const M=[],y=w/s,T=y*(e-t)+t;for(let A=0;A<=r;A++){const C=A/r,F=C*c+a,N=Math.sin(F),O=Math.cos(F);b.x=T*N,b.y=-y*n+_,b.z=T*O,p.push(b.x,b.y,b.z),l.set(N,R,O).normalize(),x.push(l.x,l.y,l.z),m.push(C,1-y),M.push(v++)}S.push(M)}for(let w=0;w<r;w++)for(let M=0;M<s;M++){const y=S[M][w],T=S[M+1][w],A=S[M+1][w+1],C=S[M][w+1];(t>0||M!==0)&&(f.push(y,T,C),u+=3),(e>0||M!==s-1)&&(f.push(T,A,C),u+=3)}h.addGroup(g,u,0),g+=u}function d(l){const b=v,u=new ct,R=new I;let w=0;const M=l===!0?t:e,y=l===!0?1:-1;for(let A=1;A<=r;A++)p.push(0,_*y,0),x.push(0,y,0),m.push(.5,.5),v++;const T=v;for(let A=0;A<=r;A++){const F=A/r*c+a,N=Math.cos(F),O=Math.sin(F);R.x=M*O,R.y=_*y,R.z=M*N,p.push(R.x,R.y,R.z),x.push(0,y,0),u.x=N*.5+.5,u.y=O*.5*y+.5,m.push(u.x,u.y),v++}for(let A=0;A<r;A++){const C=b+A,F=T+A;l===!0?f.push(F,F+1,C):f.push(F+1,F,C),w+=3}h.addGroup(g,w,l===!0?1:2),g+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ke(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ta extends ke{constructor(t=1,e=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ta(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vu extends Ie{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],o=[];a(r),h(n),f(),this.setAttribute("position",new ie(s,3)),this.setAttribute("normal",new ie(s.slice(),3)),this.setAttribute("uv",new ie(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const d=new I,l=new I,b=new I;for(let u=0;u<e.length;u+=3)m(e[u+0],d),m(e[u+1],l),m(e[u+2],b),c(d,l,b,E)}function c(E,d,l,b){const u=b+1,R=[];for(let w=0;w<=u;w++){R[w]=[];const M=E.clone().lerp(l,w/u),y=d.clone().lerp(l,w/u),T=u-w;for(let A=0;A<=T;A++)A===0&&w===u?R[w][A]=M:R[w][A]=M.clone().lerp(y,A/T)}for(let w=0;w<u;w++)for(let M=0;M<2*(u-w)-1;M++){const y=Math.floor(M/2);M%2===0?(x(R[w][y+1]),x(R[w+1][y]),x(R[w][y])):(x(R[w][y+1]),x(R[w+1][y+1]),x(R[w+1][y]))}}function h(E){const d=new I;for(let l=0;l<s.length;l+=3)d.x=s[l+0],d.y=s[l+1],d.z=s[l+2],d.normalize().multiplyScalar(E),s[l+0]=d.x,s[l+1]=d.y,s[l+2]=d.z}function f(){const E=new I;for(let d=0;d<s.length;d+=3){E.x=s[d+0],E.y=s[d+1],E.z=s[d+2];const l=_(E)/2/Math.PI+.5,b=g(E)/Math.PI+.5;o.push(l,1-b)}v(),p()}function p(){for(let E=0;E<o.length;E+=6){const d=o[E+0],l=o[E+2],b=o[E+4],u=Math.max(d,l,b),R=Math.min(d,l,b);u>.9&&R<.1&&(d<.2&&(o[E+0]+=1),l<.2&&(o[E+2]+=1),b<.2&&(o[E+4]+=1))}}function x(E){s.push(E.x,E.y,E.z)}function m(E,d){const l=E*3;d.x=t[l+0],d.y=t[l+1],d.z=t[l+2]}function v(){const E=new I,d=new I,l=new I,b=new I,u=new ct,R=new ct,w=new ct;for(let M=0,y=0;M<s.length;M+=9,y+=6){E.set(s[M+0],s[M+1],s[M+2]),d.set(s[M+3],s[M+4],s[M+5]),l.set(s[M+6],s[M+7],s[M+8]),u.set(o[y+0],o[y+1]),R.set(o[y+2],o[y+3]),w.set(o[y+4],o[y+5]),b.copy(E).add(d).add(l).divideScalar(3);const T=_(b);S(u,y+0,E,T),S(R,y+2,d,T),S(w,y+4,l,T)}}function S(E,d,l,b){b<0&&E.x===1&&(o[d]=E.x-1),l.x===0&&l.z===0&&(o[d]=b/2/Math.PI+.5)}function _(E){return Math.atan2(E.z,-E.x)}function g(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vu(t.vertices,t.indices,t.radius,t.details)}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ht("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,h;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),h=n[r]-o,h<0)a=r+1;else if(h>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const f=n[r],x=n[r+1]-f,m=(o-f)/x;return(r+m)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=e||(o.isVector2?new ct:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new I,r=[],s=[],o=[],a=new I,c=new $t;for(let m=0;m<=t;m++){const v=m/t;r[m]=this.getTangentAt(v,new I)}s[0]=new I,o[0]=new I;let h=Number.MAX_VALUE;const f=Math.abs(r[0].x),p=Math.abs(r[0].y),x=Math.abs(r[0].z);f<=h&&(h=f,n.set(1,0,0)),p<=h&&(h=p,n.set(0,1,0)),x<=h&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let m=1;m<=t;m++){if(s[m]=s[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(r[m-1],r[m]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(Xt(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(c.makeRotationAxis(a,v))}o[m].crossVectors(r[m],s[m])}if(e===!0){let m=Math.acos(Xt(s[0].dot(s[t]),-1,1));m/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(m=-m);for(let v=1;v<=t;v++)s[v].applyMatrix4(c.makeRotationAxis(r[v],m*v)),o[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class yu extends ii{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ct){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),x=c-this.aX,m=h-this.aY;c=x*f-m*p+this.aX,h=x*p+m*f+this.aY}return n.set(c,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kx extends yu{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function bu(){let i=0,t=0,e=0,n=0;function r(s,o,a,c){i=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,h){r(o,a,h*(a-s),h*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,h,f,p){let x=(o-s)/h-(a-s)/(h+f)+(a-o)/f,m=(a-o)/f-(c-o)/(f+p)+(c-a)/p;x*=f,m*=f,r(o,a,x,m)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const Ao=new I,xc=new bu,mc=new bu,gc=new bu;class Hx extends ii{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new I){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let h,f;this.closed||a>0?h=r[(a-1)%s]:(Ao.subVectors(r[0],r[1]).add(r[0]),h=Ao);const p=r[a%s],x=r[(a+1)%s];if(this.closed||a+2<s?f=r[(a+2)%s]:(Ao.subVectors(r[s-1],r[s-2]).add(r[s-1]),f=Ao),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let v=Math.pow(h.distanceToSquared(p),m),S=Math.pow(p.distanceToSquared(x),m),_=Math.pow(x.distanceToSquared(f),m);S<1e-4&&(S=1),v<1e-4&&(v=S),_<1e-4&&(_=S),xc.initNonuniformCatmullRom(h.x,p.x,x.x,f.x,v,S,_),mc.initNonuniformCatmullRom(h.y,p.y,x.y,f.y,v,S,_),gc.initNonuniformCatmullRom(h.z,p.z,x.z,f.z,v,S,_)}else this.curveType==="catmullrom"&&(xc.initCatmullRom(h.x,p.x,x.x,f.x,this.tension),mc.initCatmullRom(h.y,p.y,x.y,f.y,this.tension),gc.initCatmullRom(h.z,p.z,x.z,f.z,this.tension));return n.set(xc.calc(c),mc.calc(c),gc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new I().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ch(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,c=i*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*i+e}function Gx(i,t){const e=1-i;return e*e*t}function Wx(i,t){return 2*(1-i)*i*t}function Xx(i,t){return i*i*t}function zs(i,t,e,n){return Gx(i,t)+Wx(i,e)+Xx(i,n)}function qx(i,t){const e=1-i;return e*e*e*t}function Yx(i,t){const e=1-i;return 3*e*e*i*t}function jx(i,t){return 3*(1-i)*i*i*t}function Zx(i,t){return i*i*i*t}function Vs(i,t,e,n,r){return qx(i,t)+Yx(i,e)+jx(i,n)+Zx(i,r)}class tp extends ii{constructor(t=new ct,e=new ct,n=new ct,r=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new ct){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Vs(t,r.x,s.x,o.x,a.x),Vs(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $x extends ii{constructor(t=new I,e=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new I){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Vs(t,r.x,s.x,o.x,a.x),Vs(t,r.y,s.y,o.y,a.y),Vs(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ep extends ii{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kx extends ii{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class np extends ii{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(zs(t,r.x,s.x,o.x),zs(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jx extends ii{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(zs(t,r.x,s.x,o.x),zs(t,r.y,s.y,o.y),zs(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ip extends ii{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],h=r[o],f=r[o>r.length-2?r.length-1:o+1],p=r[o>r.length-3?r.length-1:o+2];return n.set(Ch(a,c.x,h.x,f.x,p.x),Ch(a,c.y,h.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new ct().fromArray(r))}return this}}var Xl=Object.freeze({__proto__:null,ArcCurve:kx,CatmullRomCurve3:Hx,CubicBezierCurve:tp,CubicBezierCurve3:$x,EllipseCurve:yu,LineCurve:ep,LineCurve3:Kx,QuadraticBezierCurve:np,QuadraticBezierCurve3:Jx,SplineCurve:ip});class Qx extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let h=0;h<c.length;h++){const f=c[h];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Xl[r.type]().fromJSON(r))}return this}}class Ph extends Qx{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ep(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new np(this.currentPoint.clone(),new ct(t,e),new ct(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new tp(this.currentPoint.clone(),new ct(t,e),new ct(n,r),new ct(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ip(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,c){const h=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+h,e+f,n,r,s,o,a,c),this}absellipse(t,e,n,r,s,o,a,c){const h=new yu(t,e,n,r,s,o,a,c);if(this.curves.length>0){const p=h.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(h);const f=h.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class rp extends Ph{constructor(t){super(t),this.uuid=fr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Ph().fromJSON(r))}return this}}function tm(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=sp(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,h;if(n&&(s=sm(i,t,s,e)),i.length>80*e){a=i[0],c=i[1];let f=a,p=c;for(let x=e;x<r;x+=e){const m=i[x],v=i[x+1];m<a&&(a=m),v<c&&(c=v),m>f&&(f=m),v>p&&(p=v)}h=Math.max(f-a,p-c),h=h!==0?32767/h:0}return Qs(s,o,e,a,c,h,0),o}function sp(i,t,e,n,r){let s;if(r===mm(i,t,e,n)>0)for(let o=t;o<e;o+=n)s=Ih(o/n|0,i[o],i[o+1],s);else for(let o=e-n;o>=t;o-=n)s=Ih(o/n|0,i[o],i[o+1],s);return s&&as(s,s.next)&&(eo(s),s=s.next),s}function lr(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(as(e,e.next)||be(e.prev,e,e.next)===0)){if(eo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Qs(i,t,e,n,r,s,o){if(!i)return;!o&&s&&um(i,n,r,s);let a=i;for(;i.prev!==i.next;){const c=i.prev,h=i.next;if(s?nm(i,n,r,s):em(i)){t.push(c.i,i.i,h.i),eo(i),i=h.next,a=h.next;continue}if(i=h,i===a){o?o===1?(i=im(lr(i),t),Qs(i,t,e,n,r,s,2)):o===2&&rm(i,t,e,n,r,s):Qs(lr(i),t,e,n,r,s,1);break}}}function em(i){const t=i.prev,e=i,n=i.next;if(be(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,c=e.y,h=n.y,f=Math.min(r,s,o),p=Math.min(a,c,h),x=Math.max(r,s,o),m=Math.max(a,c,h);let v=n.next;for(;v!==t;){if(v.x>=f&&v.x<=x&&v.y>=p&&v.y<=m&&Ls(r,a,s,c,o,h,v.x,v.y)&&be(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function nm(i,t,e,n){const r=i.prev,s=i,o=i.next;if(be(r,s,o)>=0)return!1;const a=r.x,c=s.x,h=o.x,f=r.y,p=s.y,x=o.y,m=Math.min(a,c,h),v=Math.min(f,p,x),S=Math.max(a,c,h),_=Math.max(f,p,x),g=ql(m,v,t,e,n),E=ql(S,_,t,e,n);let d=i.prevZ,l=i.nextZ;for(;d&&d.z>=g&&l&&l.z<=E;){if(d.x>=m&&d.x<=S&&d.y>=v&&d.y<=_&&d!==r&&d!==o&&Ls(a,f,c,p,h,x,d.x,d.y)&&be(d.prev,d,d.next)>=0||(d=d.prevZ,l.x>=m&&l.x<=S&&l.y>=v&&l.y<=_&&l!==r&&l!==o&&Ls(a,f,c,p,h,x,l.x,l.y)&&be(l.prev,l,l.next)>=0))return!1;l=l.nextZ}for(;d&&d.z>=g;){if(d.x>=m&&d.x<=S&&d.y>=v&&d.y<=_&&d!==r&&d!==o&&Ls(a,f,c,p,h,x,d.x,d.y)&&be(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;l&&l.z<=E;){if(l.x>=m&&l.x<=S&&l.y>=v&&l.y<=_&&l!==r&&l!==o&&Ls(a,f,c,p,h,x,l.x,l.y)&&be(l.prev,l,l.next)>=0)return!1;l=l.nextZ}return!0}function im(i,t){let e=i;do{const n=e.prev,r=e.next.next;!as(n,r)&&ap(n,e,e.next,r)&&to(n,r)&&to(r,n)&&(t.push(n.i,e.i,r.i),eo(e),eo(e.next),e=i=r),e=e.next}while(e!==i);return lr(e)}function rm(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&dm(o,a)){let c=cp(o,a);o=lr(o,o.next),c=lr(c,c.next),Qs(o,t,e,n,r,s,0),Qs(c,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function sm(i,t,e,n){const r=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,c=s<o-1?t[s+1]*n:i.length,h=sp(i,a,c,n,!1);h===h.next&&(h.steiner=!0),r.push(fm(h))}r.sort(om);for(let s=0;s<r.length;s++)e=am(r[s],e);return e}function om(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=n-r}return e}function am(i,t){const e=cm(i,t);if(!e)return t;const n=cp(e,i);return lr(n,n.next),lr(e,e.next)}function cm(i,t){let e=t;const n=i.x,r=i.y;let s=-1/0,o;if(as(i,e))return e;do{if(as(i,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const p=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(p<=n&&p>s&&(s=p,o=e.x<e.next.x?e:e.next,p===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,h=o.y;let f=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&op(r<h?n:s,r,c,h,r<h?s:n,r,e.x,e.y)){const p=Math.abs(r-e.y)/(n-e.x);to(e,i)&&(p<f||p===f&&(e.x>o.x||e.x===o.x&&lm(o,e)))&&(o=e,f=p)}e=e.next}while(e!==a);return o}function lm(i,t){return be(i.prev,i,t.prev)<0&&be(t.next,i,i.next)<0}function um(i,t,e,n){let r=i;do r.z===0&&(r.z=ql(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,hm(r)}function hm(i){let t,e=1;do{let n=i,r;i=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let h=0;h<e&&(a++,o=o.nextZ,!!o);h++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,e*=2}while(t>1);return i}function ql(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function fm(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function op(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function Ls(i,t,e,n,r,s,o,a){return!(i===o&&t===a)&&op(i,t,e,n,r,s,o,a)}function dm(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!pm(i,t)&&(to(i,t)&&to(t,i)&&xm(i,t)&&(be(i.prev,i,t.prev)||be(i,t.prev,t))||as(i,t)&&be(i.prev,i,i.next)>0&&be(t.prev,t,t.next)>0)}function be(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function as(i,t){return i.x===t.x&&i.y===t.y}function ap(i,t,e,n){const r=Co(be(i,t,e)),s=Co(be(i,t,n)),o=Co(be(e,n,i)),a=Co(be(e,n,t));return!!(r!==s&&o!==a||r===0&&Ro(i,e,t)||s===0&&Ro(i,n,t)||o===0&&Ro(e,i,n)||a===0&&Ro(e,t,n))}function Ro(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Co(i){return i>0?1:i<0?-1:0}function pm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ap(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function to(i,t){return be(i.prev,i,i.next)<0?be(i,t,i.next)>=0&&be(i,i.prev,t)>=0:be(i,t,i.prev)<0||be(i,i.next,t)<0}function xm(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function cp(i,t){const e=Yl(i.i,i.x,i.y),n=Yl(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ih(i,t,e,n){const r=Yl(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function eo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Yl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function mm(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class gm{static triangulate(t,e,n=2){return tm(t,e,n)}}class jr{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return jr.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];Lh(t),Dh(n,t);let o=t.length;e.forEach(Lh);for(let c=0;c<e.length;c++)r.push(o),o+=e[c].length,Dh(n,e[c]);const a=gm.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function Lh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Dh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Mu extends Ie{constructor(t=new rp([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],s=[];for(let a=0,c=t.length;a<c;a++){const h=t[a];o(h)}this.setAttribute("position",new ie(r,3)),this.setAttribute("uv",new ie(s,2)),this.computeVertexNormals();function o(a){const c=[],h=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let x=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,v=e.bevelSize!==void 0?e.bevelSize:m-.1,S=e.bevelOffset!==void 0?e.bevelOffset:0,_=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:_m;let d,l=!1,b,u,R,w;g&&(d=g.getSpacedPoints(f),l=!0,x=!1,b=g.computeFrenetFrames(f,!1),u=new I,R=new I,w=new I),x||(_=0,m=0,v=0,S=0);const M=a.extractPoints(h);let y=M.shape;const T=M.holes;if(!jr.isClockWise(y)){y=y.reverse();for(let J=0,D=T.length;J<D;J++){const K=T[J];jr.isClockWise(K)&&(T[J]=K.reverse())}}function C(J){const K=10000000000000001e-36;let tt=J[0];for(let xt=1;xt<=J.length;xt++){const et=xt%J.length,dt=J[et],ot=dt.x-tt.x,ft=dt.y-tt.y,U=ot*ot+ft*ft,P=Math.max(Math.abs(dt.x),Math.abs(dt.y),Math.abs(tt.x),Math.abs(tt.y)),k=K*P*P;if(U<=k){J.splice(et,1),xt--;continue}tt=dt}}C(y),T.forEach(C);const F=T.length,N=y;for(let J=0;J<F;J++){const D=T[J];y=y.concat(D)}function O(J,D,K){return D||ne("ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(D,K)}const B=y.length;function V(J,D,K){let tt,xt,et;const dt=J.x-D.x,ot=J.y-D.y,ft=K.x-J.x,U=K.y-J.y,P=dt*dt+ot*ot,k=dt*U-ot*ft;if(Math.abs(k)>Number.EPSILON){const q=Math.sqrt(P),Q=Math.sqrt(ft*ft+U*U),X=D.x-ot/q,mt=D.y+dt/q,St=K.x-U/Q,Ft=K.y+ft/Q,Dt=((St-X)*U-(Ft-mt)*ft)/(dt*U-ot*ft);tt=X+dt*Dt-J.x,xt=mt+ot*Dt-J.y;const at=tt*tt+xt*xt;if(at<=2)return new ct(tt,xt);et=Math.sqrt(at/2)}else{let q=!1;dt>Number.EPSILON?ft>Number.EPSILON&&(q=!0):dt<-Number.EPSILON?ft<-Number.EPSILON&&(q=!0):Math.sign(ot)===Math.sign(U)&&(q=!0),q?(tt=-ot,xt=dt,et=Math.sqrt(P)):(tt=dt,xt=ot,et=Math.sqrt(P/2))}return new ct(tt/et,xt/et)}const W=[];for(let J=0,D=N.length,K=D-1,tt=J+1;J<D;J++,K++,tt++)K===D&&(K=0),tt===D&&(tt=0),W[J]=V(N[J],N[K],N[tt]);const nt=[];let it,ht=W.concat();for(let J=0,D=F;J<D;J++){const K=T[J];it=[];for(let tt=0,xt=K.length,et=xt-1,dt=tt+1;tt<xt;tt++,et++,dt++)et===xt&&(et=0),dt===xt&&(dt=0),it[tt]=V(K[tt],K[et],K[dt]);nt.push(it),ht=ht.concat(it)}let _t;if(_===0)_t=jr.triangulateShape(N,T);else{const J=[],D=[];for(let K=0;K<_;K++){const tt=K/_,xt=m*Math.cos(tt*Math.PI/2),et=v*Math.sin(tt*Math.PI/2)+S;for(let dt=0,ot=N.length;dt<ot;dt++){const ft=O(N[dt],W[dt],et);lt(ft.x,ft.y,-xt),tt===0&&J.push(ft)}for(let dt=0,ot=F;dt<ot;dt++){const ft=T[dt];it=nt[dt];const U=[];for(let P=0,k=ft.length;P<k;P++){const q=O(ft[P],it[P],et);lt(q.x,q.y,-xt),tt===0&&U.push(q)}tt===0&&D.push(U)}}_t=jr.triangulateShape(J,D)}const yt=_t.length,Tt=v+S;for(let J=0;J<B;J++){const D=x?O(y[J],ht[J],Tt):y[J];l?(R.copy(b.normals[0]).multiplyScalar(D.x),u.copy(b.binormals[0]).multiplyScalar(D.y),w.copy(d[0]).add(R).add(u),lt(w.x,w.y,w.z)):lt(D.x,D.y,0)}for(let J=1;J<=f;J++)for(let D=0;D<B;D++){const K=x?O(y[D],ht[D],Tt):y[D];l?(R.copy(b.normals[J]).multiplyScalar(K.x),u.copy(b.binormals[J]).multiplyScalar(K.y),w.copy(d[J]).add(R).add(u),lt(w.x,w.y,w.z)):lt(K.x,K.y,p/f*J)}for(let J=_-1;J>=0;J--){const D=J/_,K=m*Math.cos(D*Math.PI/2),tt=v*Math.sin(D*Math.PI/2)+S;for(let xt=0,et=N.length;xt<et;xt++){const dt=O(N[xt],W[xt],tt);lt(dt.x,dt.y,p+K)}for(let xt=0,et=T.length;xt<et;xt++){const dt=T[xt];it=nt[xt];for(let ot=0,ft=dt.length;ot<ft;ot++){const U=O(dt[ot],it[ot],tt);l?lt(U.x,U.y+d[f-1].y,d[f-1].x+K):lt(U.x,U.y,p+K)}}}Y(),j();function Y(){const J=r.length/3;if(x){let D=0,K=B*D;for(let tt=0;tt<yt;tt++){const xt=_t[tt];ut(xt[2]+K,xt[1]+K,xt[0]+K)}D=f+_*2,K=B*D;for(let tt=0;tt<yt;tt++){const xt=_t[tt];ut(xt[0]+K,xt[1]+K,xt[2]+K)}}else{for(let D=0;D<yt;D++){const K=_t[D];ut(K[2],K[1],K[0])}for(let D=0;D<yt;D++){const K=_t[D];ut(K[0]+B*f,K[1]+B*f,K[2]+B*f)}}n.addGroup(J,r.length/3-J,0)}function j(){const J=r.length/3;let D=0;st(N,D),D+=N.length;for(let K=0,tt=T.length;K<tt;K++){const xt=T[K];st(xt,D),D+=xt.length}n.addGroup(J,r.length/3-J,1)}function st(J,D){let K=J.length;for(;--K>=0;){const tt=K;let xt=K-1;xt<0&&(xt=J.length-1);for(let et=0,dt=f+_*2;et<dt;et++){const ot=B*et,ft=B*(et+1),U=D+tt+ot,P=D+xt+ot,k=D+xt+ft,q=D+tt+ft;Rt(U,P,k,q)}}}function lt(J,D,K){c.push(J),c.push(D),c.push(K)}function ut(J,D,K){qt(J),qt(D),qt(K);const tt=r.length/3,xt=E.generateTopUV(n,r,tt-3,tt-2,tt-1);Et(xt[0]),Et(xt[1]),Et(xt[2])}function Rt(J,D,K,tt){qt(J),qt(D),qt(tt),qt(D),qt(K),qt(tt);const xt=r.length/3,et=E.generateSideWallUV(n,r,xt-6,xt-3,xt-2,xt-1);Et(et[0]),Et(et[1]),Et(et[3]),Et(et[1]),Et(et[2]),Et(et[3])}function qt(J){r.push(c[J*3+0]),r.push(c[J*3+1]),r.push(c[J*3+2])}function Et(J){s.push(J.x),s.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return vm(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Xl[r.type]().fromJSON(r)),new Mu(n,t.options)}}const _m={generateTopUV:function(i,t,e,n,r){const s=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],h=t[r*3],f=t[r*3+1];return[new ct(s,o),new ct(a,c),new ct(h,f)]},generateSideWallUV:function(i,t,e,n,r,s){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],h=t[n*3],f=t[n*3+1],p=t[n*3+2],x=t[r*3],m=t[r*3+1],v=t[r*3+2],S=t[s*3],_=t[s*3+1],g=t[s*3+2];return Math.abs(a-f)<Math.abs(o-h)?[new ct(o,1-c),new ct(h,1-p),new ct(x,1-v),new ct(S,1-g)]:[new ct(a,1-c),new ct(f,1-p),new ct(m,1-v),new ct(_,1-g)]}};function vm(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Zr extends vu{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Zr(t.radius,t.detail)}}class hs extends Ie{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(r),h=a+1,f=c+1,p=t/a,x=e/c,m=[],v=[],S=[],_=[];for(let g=0;g<f;g++){const E=g*x-o;for(let d=0;d<h;d++){const l=d*p-s;v.push(l,-E,0),S.push(0,0,1),_.push(d/a),_.push(1-g/c)}}for(let g=0;g<c;g++)for(let E=0;E<a;E++){const d=E+h*g,l=E+h*(g+1),b=E+1+h*(g+1),u=E+1+h*g;m.push(d,l,u),m.push(l,b,u)}this.setIndex(m),this.setAttribute("position",new ie(v,3)),this.setAttribute("normal",new ie(S,3)),this.setAttribute("uv",new ie(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hs(t.width,t.height,t.widthSegments,t.heightSegments)}}class no extends Ie{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let h=0;const f=[],p=new I,x=new I,m=[],v=[],S=[],_=[];for(let g=0;g<=n;g++){const E=[],d=g/n;let l=0;g===0&&o===0?l=.5/e:g===n&&c===Math.PI&&(l=-.5/e);for(let b=0;b<=e;b++){const u=b/e;p.x=-t*Math.cos(r+u*s)*Math.sin(o+d*a),p.y=t*Math.cos(o+d*a),p.z=t*Math.sin(r+u*s)*Math.sin(o+d*a),v.push(p.x,p.y,p.z),x.copy(p).normalize(),S.push(x.x,x.y,x.z),_.push(u+l,1-d),E.push(h++)}f.push(E)}for(let g=0;g<n;g++)for(let E=0;E<e;E++){const d=f[g][E+1],l=f[g][E],b=f[g+1][E],u=f[g+1][E+1];(g!==0||o>0)&&m.push(d,l,u),(g!==n-1||c<Math.PI)&&m.push(l,b,u)}this.setIndex(m),this.setAttribute("position",new ie(v,3)),this.setAttribute("normal",new ie(S,3)),this.setAttribute("uv",new ie(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new no(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Li extends Ie{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],h=[],f=new I,p=new I,x=new I;for(let m=0;m<=n;m++)for(let v=0;v<=r;v++){const S=v/r*s,_=m/n*Math.PI*2;p.x=(t+e*Math.cos(_))*Math.cos(S),p.y=(t+e*Math.cos(_))*Math.sin(S),p.z=e*Math.sin(_),a.push(p.x,p.y,p.z),f.x=t*Math.cos(S),f.y=t*Math.sin(S),x.subVectors(p,f).normalize(),c.push(x.x,x.y,x.z),h.push(v/r),h.push(m/n)}for(let m=1;m<=n;m++)for(let v=1;v<=r;v++){const S=(r+1)*m+v-1,_=(r+1)*(m-1)+v-1,g=(r+1)*(m-1)+v,E=(r+1)*m+v;o.push(S,_,E),o.push(_,g,E)}this.setIndex(o),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(c,3)),this.setAttribute("uv",new ie(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ym extends pr{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Jt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class jl extends pr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vd,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bm extends pr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=V0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Mm extends pr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class lp extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Sm extends lp{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const _c=new $t,Uh=new I,Nh=new I;class Em{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=ni,this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gu,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Uh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Uh),Nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nh),e.updateMatrixWorld(),_c.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_c,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_c)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class up extends Zd{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,a-=f*this.view.offsetY,c=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Tm extends Em{constructor(){super(new up(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hp extends lp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new Tm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wm extends Pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Su="\\[\\]\\.:\\/",Am=new RegExp("["+Su+"]","g"),Eu="[^"+Su+"]",Rm="[^"+Su.replace("\\.","")+"]",Cm=/((?:WC+[\/:])*)/.source.replace("WC",Eu),Pm=/(WCOD+)?/.source.replace("WCOD",Rm),Im=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Eu),Lm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Eu),Dm=new RegExp("^"+Cm+Pm+Im+Lm+"$"),Um=["material","materials","bones","map"];class Nm{constructor(t,e,n){const r=n||se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class se{constructor(t,e,n){this.path=e,this.parsedPath=n||se.parseTrackName(e),this.node=se.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new se.Composite(t,e,n):new se(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Am,"")}static parseTrackName(t){const e=Dm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Um.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[e++]=n[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,r=e.propertyName;let s=e.propertyIndex;if(t||(t=se.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ht("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=e.objectIndex;switch(n){case"materials":if(!t.material){ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===h){h=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(h!==void 0){if(t[h]===void 0){ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}const o=t[r];if(o===void 0){const h=e.nodeName;ne("PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}se.Composite=Nm;se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};se.prototype.GetterByBindingType=[se.prototype._getValue_direct,se.prototype._getValue_array,se.prototype._getValue_arrayElement,se.prototype._getValue_toArray];se.prototype.SetterByBindingTypeAndVersioning=[[se.prototype._setValue_direct,se.prototype._setValue_direct_setNeedsUpdate,se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[se.prototype._setValue_array,se.prototype._setValue_array_setNeedsUpdate,se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[se.prototype._setValue_arrayElement,se.prototype._setValue_arrayElement_setNeedsUpdate,se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[se.prototype._setValue_fromArray,se.prototype._setValue_fromArray_setNeedsUpdate,se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Fh=new $t;class fp{constructor(t,e,n=0,r=1/0){this.ray=new dr(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new mu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):ne("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fh),this}intersectObject(t,e=!0,n=[]){return Zl(t,this,n,e),n.sort(Oh),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)Zl(t[r],this,n,e);return n.sort(Oh),n}}function Oh(i,t){return i.distance-t.distance}function Zl(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)Zl(s[o],t,e,!0)}}class Bh{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const zh=new I,Po=new I,Cr=new I,Pr=new I,vc=new I,Fm=new I,Om=new I;class We{constructor(t=new I,e=new I){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){zh.subVectors(t,this.start),Po.subVectors(this.end,this.start);const n=Po.dot(Po);let s=Po.dot(zh)/n;return e&&(s=Xt(s,0,1)),s}closestPointToPoint(t,e,n){const r=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(t,e=Fm,n=Om){const r=10000000000000001e-32;let s,o;const a=this.start,c=t.start,h=this.end,f=t.end;Cr.subVectors(h,a),Pr.subVectors(f,c),vc.subVectors(a,c);const p=Cr.dot(Cr),x=Pr.dot(Pr),m=Pr.dot(vc);if(p<=r&&x<=r)return e.copy(a),n.copy(c),e.sub(n),e.dot(e);if(p<=r)s=0,o=m/x,o=Xt(o,0,1);else{const v=Cr.dot(vc);if(x<=r)o=0,s=Xt(-v/p,0,1);else{const S=Cr.dot(Pr),_=p*x-S*S;_!==0?s=Xt((S*m-v*x)/_,0,1):s=0,o=(S*s+m)/x,o<0?(o=0,s=Xt(-v/p,0,1)):o>1&&(o=1,s=Xt((S-v)/p,0,1))}}return e.copy(a).add(Cr.multiplyScalar(s)),n.copy(c).add(Pr.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Bm extends Kd{constructor(t=10,e=10,n=4473924,r=8947848){n=new Jt(n),r=new Jt(r);const s=e/2,o=t/e,a=t/2,c=[],h=[];for(let x=0,m=0,v=-a;x<=e;x++,v+=o){c.push(-a,0,v,a,0,v),c.push(v,0,-a,v,0,a);const S=x===s?n:r;S.toArray(h,m),m+=3,S.toArray(h,m),m+=3,S.toArray(h,m),m+=3,S.toArray(h,m),m+=3}const f=new Ie;f.setAttribute("position",new ie(c,3)),f.setAttribute("color",new ie(h,3));const p=new Ua({vertexColors:!0,toneMapped:!1});super(f,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class dp extends hr{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ht("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Vh(i,t,e,n){const r=zm(n);switch(e){case Od:return i*t;case zd:return i*t/r.components*r.byteLength;case hu:return i*t/r.components*r.byteLength;case fu:return i*t*2/r.components*r.byteLength;case du:return i*t*2/r.components*r.byteLength;case Bd:return i*t*3/r.components*r.byteLength;case Ln:return i*t*4/r.components*r.byteLength;case pu:return i*t*4/r.components*r.byteLength;case oa:case aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ca:case la:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case gl:case vl:return Math.max(i,16)*Math.max(t,8)/4;case ml:case _l:return Math.max(i,8)*Math.max(t,8)/2;case yl:case bl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ml:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Tl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Il:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Nl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ol:case Bl:case zl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Vl:case kl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Hl:case Gl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zm(i){switch(i){case ni:case Dd:return{byteLength:1,components:1};case Ys:case Ud:case us:return{byteLength:2,components:1};case lu:case uu:return{byteLength:2,components:4};case ar:case cu:case mi:return{byteLength:4,components:1};case Nd:case Fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ls}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ls);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function pp(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Vm(i){const t=new WeakMap;function e(a,c){const h=a.array,f=a.usage,p=h.byteLength,x=i.createBuffer();i.bindBuffer(c,x),i.bufferData(c,h,f),a.onUploadCallback();let m;if(h instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)m=i.HALF_FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)m=i.SHORT;else if(h instanceof Uint32Array)m=i.UNSIGNED_INT;else if(h instanceof Int32Array)m=i.INT;else if(h instanceof Int8Array)m=i.BYTE;else if(h instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:x,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,c,h){const f=c.array,p=c.updateRanges;if(i.bindBuffer(h,a),p.length===0)i.bufferSubData(h,0,f);else{p.sort((m,v)=>m.start-v.start);let x=0;for(let m=1;m<p.length;m++){const v=p[x],S=p[m];S.start<=v.start+v.count+1?v.count=Math.max(v.count,S.start+S.count-v.start):(++x,p[x]=S)}p.length=x+1;for(let m=0,v=p.length;m<v;m++){const S=p[m];i.bufferSubData(h,S.start*f.BYTES_PER_ELEMENT,f,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=t.get(a);(!f||f.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const h=t.get(a);if(h===void 0)t.set(a,e(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,c),h.version=a.version}}return{get:r,remove:s,update:o}}var km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ym=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$m=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Km=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ug=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",_g=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Eg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ag=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Dg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ug=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ng=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Og=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$g=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,t_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,e_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,i_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,s_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,o_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,l_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,u_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,h_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,f_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,d_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,p_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,x_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,m_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,g_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,__=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,v_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,y_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,b_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,M_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,S_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,E_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,T_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,w_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,A_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,R_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,P_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,I_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,L_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,D_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,U_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,N_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,F_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,O_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,B_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,z_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const V_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,k_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Y_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,j_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Z_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,K_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Q_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ev=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,av=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_v=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:km,alphahash_pars_fragment:Hm,alphamap_fragment:Gm,alphamap_pars_fragment:Wm,alphatest_fragment:Xm,alphatest_pars_fragment:qm,aomap_fragment:Ym,aomap_pars_fragment:jm,batching_pars_vertex:Zm,batching_vertex:$m,begin_vertex:Km,beginnormal_vertex:Jm,bsdfs:Qm,iridescence_fragment:tg,bumpmap_pars_fragment:eg,clipping_planes_fragment:ng,clipping_planes_pars_fragment:ig,clipping_planes_pars_vertex:rg,clipping_planes_vertex:sg,color_fragment:og,color_pars_fragment:ag,color_pars_vertex:cg,color_vertex:lg,common:ug,cube_uv_reflection_fragment:hg,defaultnormal_vertex:fg,displacementmap_pars_vertex:dg,displacementmap_vertex:pg,emissivemap_fragment:xg,emissivemap_pars_fragment:mg,colorspace_fragment:gg,colorspace_pars_fragment:_g,envmap_fragment:vg,envmap_common_pars_fragment:yg,envmap_pars_fragment:bg,envmap_pars_vertex:Mg,envmap_physical_pars_fragment:Dg,envmap_vertex:Sg,fog_vertex:Eg,fog_pars_vertex:Tg,fog_fragment:wg,fog_pars_fragment:Ag,gradientmap_pars_fragment:Rg,lightmap_pars_fragment:Cg,lights_lambert_fragment:Pg,lights_lambert_pars_fragment:Ig,lights_pars_begin:Lg,lights_toon_fragment:Ug,lights_toon_pars_fragment:Ng,lights_phong_fragment:Fg,lights_phong_pars_fragment:Og,lights_physical_fragment:Bg,lights_physical_pars_fragment:zg,lights_fragment_begin:Vg,lights_fragment_maps:kg,lights_fragment_end:Hg,logdepthbuf_fragment:Gg,logdepthbuf_pars_fragment:Wg,logdepthbuf_pars_vertex:Xg,logdepthbuf_vertex:qg,map_fragment:Yg,map_pars_fragment:jg,map_particle_fragment:Zg,map_particle_pars_fragment:$g,metalnessmap_fragment:Kg,metalnessmap_pars_fragment:Jg,morphinstance_vertex:Qg,morphcolor_vertex:t_,morphnormal_vertex:e_,morphtarget_pars_vertex:n_,morphtarget_vertex:i_,normal_fragment_begin:r_,normal_fragment_maps:s_,normal_pars_fragment:o_,normal_pars_vertex:a_,normal_vertex:c_,normalmap_pars_fragment:l_,clearcoat_normal_fragment_begin:u_,clearcoat_normal_fragment_maps:h_,clearcoat_pars_fragment:f_,iridescence_pars_fragment:d_,opaque_fragment:p_,packing:x_,premultiplied_alpha_fragment:m_,project_vertex:g_,dithering_fragment:__,dithering_pars_fragment:v_,roughnessmap_fragment:y_,roughnessmap_pars_fragment:b_,shadowmap_pars_fragment:M_,shadowmap_pars_vertex:S_,shadowmap_vertex:E_,shadowmask_pars_fragment:T_,skinbase_vertex:w_,skinning_pars_vertex:A_,skinning_vertex:R_,skinnormal_vertex:C_,specularmap_fragment:P_,specularmap_pars_fragment:I_,tonemapping_fragment:L_,tonemapping_pars_fragment:D_,transmission_fragment:U_,transmission_pars_fragment:N_,uv_pars_fragment:F_,uv_pars_vertex:O_,uv_vertex:B_,worldpos_vertex:z_,background_vert:V_,background_frag:k_,backgroundCube_vert:H_,backgroundCube_frag:G_,cube_vert:W_,cube_frag:X_,depth_vert:q_,depth_frag:Y_,distanceRGBA_vert:j_,distanceRGBA_frag:Z_,equirect_vert:$_,equirect_frag:K_,linedashed_vert:J_,linedashed_frag:Q_,meshbasic_vert:tv,meshbasic_frag:ev,meshlambert_vert:nv,meshlambert_frag:iv,meshmatcap_vert:rv,meshmatcap_frag:sv,meshnormal_vert:ov,meshnormal_frag:av,meshphong_vert:cv,meshphong_frag:lv,meshphysical_vert:uv,meshphysical_frag:hv,meshtoon_vert:fv,meshtoon_frag:dv,points_vert:pv,points_frag:xv,shadow_vert:mv,shadow_frag:gv,sprite_vert:_v,sprite_frag:vv},wt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},$n={basic:{uniforms:en([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:en([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:en([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:en([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:en([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:en([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:en([wt.points,wt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:en([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:en([wt.common,wt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:en([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:en([wt.sprite,wt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:en([wt.common,wt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:en([wt.lights,wt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};$n.physical={uniforms:en([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Io={r:0,b:0,g:0},Xi=new Wn,yv=new $t;function bv(i,t,e,n,r,s,o){const a=new Jt(0);let c=s===!0?0:1,h,f,p=null,x=0,m=null;function v(d){let l=d.isScene===!0?d.background:null;return l&&l.isTexture&&(l=(d.backgroundBlurriness>0?e:t).get(l)),l}function S(d){let l=!1;const b=v(d);b===null?g(a,c):b&&b.isColor&&(g(b,1),l=!0);const u=i.xr.getEnvironmentBlendMode();u==="additive"?n.buffers.color.setClear(0,0,0,1,o):u==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||l)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(d,l){const b=v(l);b&&(b.isCubeTexture||b.mapping===Ia)?(f===void 0&&(f=new Ct(new Re(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:os($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(u,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),Xi.copy(l.backgroundRotation),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),f.material.uniforms.envMap.value=b,f.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=l.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(yv.makeRotationFromEuler(Xi)),f.material.toneMapped=ee.getTransfer(b.colorSpace)!==ue,(p!==b||x!==b.version||m!==i.toneMapping)&&(f.material.needsUpdate=!0,p=b,x=b.version,m=i.toneMapping),f.layers.enableAll(),d.unshift(f,f.geometry,f.material,0,0,null)):b&&b.isTexture&&(h===void 0&&(h=new Ct(new hs(2,2),new vi({name:"BackgroundMaterial",uniforms:os($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(h)),h.material.uniforms.t2D.value=b,h.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,h.material.toneMapped=ee.getTransfer(b.colorSpace)!==ue,b.matrixAutoUpdate===!0&&b.updateMatrix(),h.material.uniforms.uvTransform.value.copy(b.matrix),(p!==b||x!==b.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,p=b,x=b.version,m=i.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null))}function g(d,l){d.getRGB(Io,jd(i)),n.buffers.color.setClear(Io.r,Io.g,Io.b,l,o)}function E(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(d,l=1){a.set(d),c=l,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(d){c=d,g(a,c)},render:S,addToRenderList:_,dispose:E}}function Mv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=x(null);let s=r,o=!1;function a(y,T,A,C,F){let N=!1;const O=p(C,A,T);s!==O&&(s=O,h(s.object)),N=m(y,C,A,F),N&&v(y,C,A,F),F!==null&&t.update(F,i.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,l(y,T,A,C),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function c(){return i.createVertexArray()}function h(y){return i.bindVertexArray(y)}function f(y){return i.deleteVertexArray(y)}function p(y,T,A){const C=A.wireframe===!0;let F=n[y.id];F===void 0&&(F={},n[y.id]=F);let N=F[T.id];N===void 0&&(N={},F[T.id]=N);let O=N[C];return O===void 0&&(O=x(c()),N[C]=O),O}function x(y){const T=[],A=[],C=[];for(let F=0;F<e;F++)T[F]=0,A[F]=0,C[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:A,attributeDivisors:C,object:y,attributes:{},index:null}}function m(y,T,A,C){const F=s.attributes,N=T.attributes;let O=0;const B=A.getAttributes();for(const V in B)if(B[V].location>=0){const nt=F[V];let it=N[V];if(it===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(it=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(it=y.instanceColor)),nt===void 0||nt.attribute!==it||it&&nt.data!==it.data)return!0;O++}return s.attributesNum!==O||s.index!==C}function v(y,T,A,C){const F={},N=T.attributes;let O=0;const B=A.getAttributes();for(const V in B)if(B[V].location>=0){let nt=N[V];nt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(nt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(nt=y.instanceColor));const it={};it.attribute=nt,nt&&nt.data&&(it.data=nt.data),F[V]=it,O++}s.attributes=F,s.attributesNum=O,s.index=C}function S(){const y=s.newAttributes;for(let T=0,A=y.length;T<A;T++)y[T]=0}function _(y){g(y,0)}function g(y,T){const A=s.newAttributes,C=s.enabledAttributes,F=s.attributeDivisors;A[y]=1,C[y]===0&&(i.enableVertexAttribArray(y),C[y]=1),F[y]!==T&&(i.vertexAttribDivisor(y,T),F[y]=T)}function E(){const y=s.newAttributes,T=s.enabledAttributes;for(let A=0,C=T.length;A<C;A++)T[A]!==y[A]&&(i.disableVertexAttribArray(A),T[A]=0)}function d(y,T,A,C,F,N,O){O===!0?i.vertexAttribIPointer(y,T,A,F,N):i.vertexAttribPointer(y,T,A,C,F,N)}function l(y,T,A,C){S();const F=C.attributes,N=A.getAttributes(),O=T.defaultAttributeValues;for(const B in N){const V=N[B];if(V.location>=0){let W=F[B];if(W===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(W=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(W=y.instanceColor)),W!==void 0){const nt=W.normalized,it=W.itemSize,ht=t.get(W);if(ht===void 0)continue;const _t=ht.buffer,yt=ht.type,Tt=ht.bytesPerElement,Y=yt===i.INT||yt===i.UNSIGNED_INT||W.gpuType===cu;if(W.isInterleavedBufferAttribute){const j=W.data,st=j.stride,lt=W.offset;if(j.isInstancedInterleavedBuffer){for(let ut=0;ut<V.locationSize;ut++)g(V.location+ut,j.meshPerAttribute);y.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ut=0;ut<V.locationSize;ut++)_(V.location+ut);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let ut=0;ut<V.locationSize;ut++)d(V.location+ut,it/V.locationSize,yt,nt,st*Tt,(lt+it/V.locationSize*ut)*Tt,Y)}else{if(W.isInstancedBufferAttribute){for(let j=0;j<V.locationSize;j++)g(V.location+j,W.meshPerAttribute);y.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let j=0;j<V.locationSize;j++)_(V.location+j);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let j=0;j<V.locationSize;j++)d(V.location+j,it/V.locationSize,yt,nt,it*Tt,it/V.locationSize*j*Tt,Y)}}else if(O!==void 0){const nt=O[B];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(V.location,nt);break;case 3:i.vertexAttrib3fv(V.location,nt);break;case 4:i.vertexAttrib4fv(V.location,nt);break;default:i.vertexAttrib1fv(V.location,nt)}}}}E()}function b(){w();for(const y in n){const T=n[y];for(const A in T){const C=T[A];for(const F in C)f(C[F].object),delete C[F];delete T[A]}delete n[y]}}function u(y){if(n[y.id]===void 0)return;const T=n[y.id];for(const A in T){const C=T[A];for(const F in C)f(C[F].object),delete C[F];delete T[A]}delete n[y.id]}function R(y){for(const T in n){const A=n[T];if(A[y.id]===void 0)continue;const C=A[y.id];for(const F in C)f(C[F].object),delete C[F];delete A[y.id]}}function w(){M(),o=!0,s!==r&&(s=r,h(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:b,releaseStatesOfGeometry:u,releaseStatesOfProgram:R,initAttributes:S,enableAttribute:_,disableUnusedAttributes:E}}function Sv(i,t,e){let n;function r(h){n=h}function s(h,f){i.drawArrays(n,h,f),e.update(f,n,1)}function o(h,f,p){p!==0&&(i.drawArraysInstanced(n,h,f,p),e.update(f,n,p))}function a(h,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,f,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v];e.update(m,n,1)}function c(h,f,p,x){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<h.length;v++)o(h[v],f[v],x[v]);else{m.multiDrawArraysInstancedWEBGL(n,h,0,f,0,x,0,p);let v=0;for(let S=0;S<p;S++)v+=f[S]*x[S];e.update(v,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Ev(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==Ln&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const w=R===us&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ni&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==mi&&!w)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const f=c(h);f!==h&&(Ht("WebGLRenderer:",h,"not supported, using",f,"instead."),h=f);const p=e.logarithmicDepthBuffer===!0,x=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),l=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=v>0,u=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:p,reversedDepthBuffer:x,maxTextures:m,maxVertexTextures:v,maxTextureSize:S,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:E,maxVaryings:d,maxFragmentUniforms:l,vertexTextures:b,maxSamples:u}}function Tv(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new In,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,x){const m=p.length!==0||x||n!==0||r;return r=x,n=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,x){e=f(p,x,0)},this.setState=function(p,x,m){const v=p.clippingPlanes,S=p.clipIntersection,_=p.clipShadows,g=i.get(p);if(!r||v===null||v.length===0||s&&!_)s?f(null):h();else{const E=s?0:n,d=E*4;let l=g.clippingState||null;c.value=l,l=f(v,x,d,m);for(let b=0;b!==d;++b)l[b]=e[b];g.clippingState=l,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,x,m,v){const S=p!==null?p.length:0;let _=null;if(S!==0){if(_=c.value,v!==!0||_===null){const g=m+S*4,E=x.matrixWorldInverse;a.getNormalMatrix(E),(_===null||_.length<g)&&(_=new Float32Array(g));for(let d=0,l=m;d!==S;++d,l+=4)o.copy(p[d]).applyMatrix4(E,a),o.normal.toArray(_,l),_[l+3]=o.constant}c.value=_,c.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,_}}function wv(i){let t=new WeakMap;function e(o,a){return a===pl?o.mapping=is:a===xl&&(o.mapping=rs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===pl||a===xl)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const h=new Nx(c.height);return h.fromEquirectangularTexture(i,o),t.set(o,h),o.addEventListener("dispose",r),e(h.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const Ni=4,kh=[.125,.215,.35,.446,.526,.582],nr=20,Av=256,bs=new up,Hh=new Jt;let yc=null,bc=0,Mc=0,Sc=!1;const Rv=new I;class Gh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,r=100,s={}){const{size:o=256,position:a=Rv}=s;yc=this._renderer.getRenderTarget(),bc=this._renderer.getActiveCubeFace(),Mc=this._renderer.getActiveMipmapLevel(),Sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(yc,bc,Mc),this._renderer.xr.enabled=Sc,t.scissorTest=!1,Ir(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yc=this._renderer.getRenderTarget(),bc=this._renderer.getActiveCubeFace(),Mc=this._renderer.getActiveMipmapLevel(),Sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:us,format:Ln,colorSpace:ss,depthBuffer:!1},r=Wh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wh(t,e,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cv(s)),this._blurMaterial=Iv(s,t,e),this._ggxMaterial=Pv(s,t,e)}return r}_compileMaterial(t){const e=new Ct(new Ie,t);this._renderer.compile(e,bs)}_sceneToCubeUV(t,e,n,r,s){const c=new Pn(90,1,e,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,x=p.autoClear,m=p.toneMapping;p.getClearColor(Hh),p.toneMapping=Oi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(r),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ct(new Re,new Da({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,_=S.material;let g=!1;const E=t.background;E?E.isColor&&(_.color.copy(E),t.background=null,g=!0):(_.color.copy(Hh),g=!0);for(let d=0;d<6;d++){const l=d%3;l===0?(c.up.set(0,h[d],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+f[d],s.y,s.z)):l===1?(c.up.set(0,0,h[d]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+f[d],s.z)):(c.up.set(0,h[d],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+f[d]));const b=this._cubeSize;Ir(r,l*b,d>2?b:0,b,b),p.setRenderTarget(r),g&&p.render(S,c),p.render(t,c)}p.toneMapping=m,p.autoClear=x,t.background=E}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===is||t.mapping===rs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=qh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xh());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Ir(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,bs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,h=n/(this._lodMeshes.length-1),f=e/(this._lodMeshes.length-1),p=Math.sqrt(h*h-f*f),x=.05+h*.95,m=p*x,{_lodMax:v}=this,S=this._sizeLods[n],_=3*S*(n>v-Ni?n-v+Ni:0),g=4*(this._cubeSize-S);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=v-e,Ir(s,_,g,3*S,2*S),r.setRenderTarget(s),r.render(a,bs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=v-n,Ir(t,_,g,3*S,2*S),r.setRenderTarget(t),r.render(a,bs)}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ne("blur direction must be either latitudinal or longitudinal!");const f=3,p=this._lodMeshes[r];p.material=h;const x=h.uniforms,m=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*nr-1),S=s/v,_=isFinite(s)?1+Math.floor(f*S):nr;_>nr&&Ht(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${nr}`);const g=[];let E=0;for(let R=0;R<nr;++R){const w=R/S,M=Math.exp(-w*w/2);g.push(M),R===0?E+=M:R<_&&(E+=2*M)}for(let R=0;R<g.length;R++)g[R]=g[R]/E;x.envMap.value=t.texture,x.samples.value=_,x.weights.value=g,x.latitudinal.value=o==="latitudinal",a&&(x.poleAxis.value=a);const{_lodMax:d}=this;x.dTheta.value=v,x.mipInt.value=d-n;const l=this._sizeLods[r],b=3*l*(r>d-Ni?r-d+Ni:0),u=4*(this._cubeSize-l);Ir(e,b,u,3*l,2*l),c.setRenderTarget(e),c.render(p,bs)}}function Cv(i){const t=[],e=[],n=[];let r=i;const s=i-Ni+1+kh.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-Ni?c=kh[o-i+Ni-1]:o===0&&(c=0),e.push(c);const h=1/(a-2),f=-h,p=1+h,x=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,v=6,S=3,_=2,g=1,E=new Float32Array(S*v*m),d=new Float32Array(_*v*m),l=new Float32Array(g*v*m);for(let u=0;u<m;u++){const R=u%3*2/3-1,w=u>2?0:-1,M=[R,w,0,R+2/3,w,0,R+2/3,w+1,0,R,w,0,R+2/3,w+1,0,R,w+1,0];E.set(M,S*v*u),d.set(x,_*v*u);const y=[u,u,u,u,u,u];l.set(y,g*v*u)}const b=new Ie;b.setAttribute("position",new Me(E,S)),b.setAttribute("uv",new Me(d,_)),b.setAttribute("faceIndex",new Me(l,g)),n.push(new Ct(b,null)),r>Ni&&r--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Wh(i,t,e){const n=new cr(i,t,e);return n.texture.mapping=Ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ir(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Pv(i,t,e){return new vi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Av,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Na(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Iv(i,t,e){const n=new Float32Array(nr),r=new I(0,1,0);return new vi({name:"SphericalGaussianBlur",defines:{n:nr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Xh(){return new vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function qh(){return new vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Na(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Lv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,h=c===pl||c===xl,f=c===is||c===rs;if(h||f){let p=t.get(a);const x=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==x)return e===null&&(e=new Gh(i)),p=h?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const m=a.image;return h&&m&&m.height>0||f&&m&&r(m)?(e===null&&(e=new Gh(i)),p=h?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",s),p.texture):null}}}return a}function r(a){let c=0;const h=6;for(let f=0;f<h;f++)a[f]!==void 0&&c++;return c===h}function s(a){const c=a.target;c.removeEventListener("dispose",s);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Dv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const r=i.getExtension(n);return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Ks("WebGLRenderer: "+n+" extension not supported."),r}}}function Uv(i,t,e,n){const r={},s=new WeakMap;function o(p){const x=p.target;x.index!==null&&t.remove(x.index);for(const v in x.attributes)t.remove(x.attributes[v]);x.removeEventListener("dispose",o),delete r[x.id];const m=s.get(x);m&&(t.remove(m),s.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,e.memory.geometries--}function a(p,x){return r[x.id]===!0||(x.addEventListener("dispose",o),r[x.id]=!0,e.memory.geometries++),x}function c(p){const x=p.attributes;for(const m in x)t.update(x[m],i.ARRAY_BUFFER)}function h(p){const x=[],m=p.index,v=p.attributes.position;let S=0;if(m!==null){const E=m.array;S=m.version;for(let d=0,l=E.length;d<l;d+=3){const b=E[d+0],u=E[d+1],R=E[d+2];x.push(b,u,u,R,R,b)}}else if(v!==void 0){const E=v.array;S=v.version;for(let d=0,l=E.length/3-1;d<l;d+=3){const b=d+0,u=d+1,R=d+2;x.push(b,u,u,R,R,b)}}else return;const _=new(Hd(x)?Yd:qd)(x,1);_.version=S;const g=s.get(p);g&&t.remove(g),s.set(p,_)}function f(p){const x=s.get(p);if(x){const m=p.index;m!==null&&x.version<m.version&&h(p)}else h(p);return s.get(p)}return{get:a,update:c,getWireframeAttribute:f}}function Nv(i,t,e){let n;function r(x){n=x}let s,o;function a(x){s=x.type,o=x.bytesPerElement}function c(x,m){i.drawElements(n,m,s,x*o),e.update(m,n,1)}function h(x,m,v){v!==0&&(i.drawElementsInstanced(n,m,s,x*o,v),e.update(m,n,v))}function f(x,m,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,x,0,v);let _=0;for(let g=0;g<v;g++)_+=m[g];e.update(_,n,1)}function p(x,m,v,S){if(v===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<x.length;g++)h(x[g]/o,m[g],S[g]);else{_.multiDrawElementsInstancedWEBGL(n,m,0,s,x,0,S,0,v);let g=0;for(let E=0;E<v;E++)g+=m[E]*S[E];e.update(g,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function Fv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:ne("WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Ov(i,t,e){const n=new WeakMap,r=new pe;function s(o,a,c){const h=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=f!==void 0?f.length:0;let x=n.get(a);if(x===void 0||x.count!==p){let y=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var m=y;x!==void 0&&x.texture.dispose();const v=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],d=a.morphAttributes.color||[];let l=0;v===!0&&(l=1),S===!0&&(l=2),_===!0&&(l=3);let b=a.attributes.position.count*l,u=1;b>t.maxTextureSize&&(u=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const R=new Float32Array(b*u*4*p),w=new Wd(R,b,u,p);w.type=mi,w.needsUpdate=!0;const M=l*4;for(let T=0;T<p;T++){const A=g[T],C=E[T],F=d[T],N=b*u*4*T;for(let O=0;O<A.count;O++){const B=O*M;v===!0&&(r.fromBufferAttribute(A,O),R[N+B+0]=r.x,R[N+B+1]=r.y,R[N+B+2]=r.z,R[N+B+3]=0),S===!0&&(r.fromBufferAttribute(C,O),R[N+B+4]=r.x,R[N+B+5]=r.y,R[N+B+6]=r.z,R[N+B+7]=0),_===!0&&(r.fromBufferAttribute(F,O),R[N+B+8]=r.x,R[N+B+9]=r.y,R[N+B+10]=r.z,R[N+B+11]=F.itemSize===4?r.w:1)}}x={count:p,texture:w,size:new ct(b,u)},n.set(a,x),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let v=0;for(let _=0;_<h.length;_++)v+=h[_];const S=a.morphTargetsRelative?1:1-v;c.getUniforms().setValue(i,"morphTargetBaseInfluence",S),c.getUniforms().setValue(i,"morphTargetInfluences",h)}c.getUniforms().setValue(i,"morphTargetsTexture",x.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}return{update:s}}function Bv(i,t,e,n){let r=new WeakMap;function s(c){const h=n.render.frame,f=c.geometry,p=t.get(c,f);if(r.get(p)!==h&&(t.update(p),r.set(p,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const x=c.skeleton;r.get(x)!==h&&(x.update(),r.set(x,h))}return p}function o(){r=new WeakMap}function a(c){const h=c.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:o}}const xp=new Ke,Yh=new Jd(1,1),mp=new Wd,gp=new _x,_p=new $d,jh=[],Zh=[],$h=new Float32Array(16),Kh=new Float32Array(9),Jh=new Float32Array(4);function fs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=jh[r];if(s===void 0&&(s=new Float32Array(r),jh[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Fa(i,t){let e=Zh[t];e===void 0&&(e=new Int32Array(t),Zh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function zv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function kv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function Hv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function Gv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;Jh.set(n),i.uniformMatrix2fv(this.addr,!1,Jh),ze(e,n)}}function Wv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;Kh.set(n),i.uniformMatrix3fv(this.addr,!1,Kh),ze(e,n)}}function Xv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;$h.set(n),i.uniformMatrix4fv(this.addr,!1,$h),ze(e,n)}}function qv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Yv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function jv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function Zv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function $v(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Kv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function Jv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function Qv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function ty(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Yh.compareFunction=kd,s=Yh):s=xp,e.setTexture2D(t||s,r)}function ey(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||gp,r)}function ny(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||_p,r)}function iy(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||mp,r)}function ry(i){switch(i){case 5126:return zv;case 35664:return Vv;case 35665:return kv;case 35666:return Hv;case 35674:return Gv;case 35675:return Wv;case 35676:return Xv;case 5124:case 35670:return qv;case 35667:case 35671:return Yv;case 35668:case 35672:return jv;case 35669:case 35673:return Zv;case 5125:return $v;case 36294:return Kv;case 36295:return Jv;case 36296:return Qv;case 35678:case 36198:case 36298:case 36306:case 35682:return ty;case 35679:case 36299:case 36307:return ey;case 35680:case 36300:case 36308:case 36293:return ny;case 36289:case 36303:case 36311:case 36292:return iy}}function sy(i,t){i.uniform1fv(this.addr,t)}function oy(i,t){const e=fs(t,this.size,2);i.uniform2fv(this.addr,e)}function ay(i,t){const e=fs(t,this.size,3);i.uniform3fv(this.addr,e)}function cy(i,t){const e=fs(t,this.size,4);i.uniform4fv(this.addr,e)}function ly(i,t){const e=fs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function uy(i,t){const e=fs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function hy(i,t){const e=fs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function fy(i,t){i.uniform1iv(this.addr,t)}function dy(i,t){i.uniform2iv(this.addr,t)}function py(i,t){i.uniform3iv(this.addr,t)}function xy(i,t){i.uniform4iv(this.addr,t)}function my(i,t){i.uniform1uiv(this.addr,t)}function gy(i,t){i.uniform2uiv(this.addr,t)}function _y(i,t){i.uniform3uiv(this.addr,t)}function vy(i,t){i.uniform4uiv(this.addr,t)}function yy(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||xp,s[o])}function by(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||gp,s[o])}function My(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||_p,s[o])}function Sy(i,t,e){const n=this.cache,r=t.length,s=Fa(e,r);Be(n,s)||(i.uniform1iv(this.addr,s),ze(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||mp,s[o])}function Ey(i){switch(i){case 5126:return sy;case 35664:return oy;case 35665:return ay;case 35666:return cy;case 35674:return ly;case 35675:return uy;case 35676:return hy;case 5124:case 35670:return fy;case 35667:case 35671:return dy;case 35668:case 35672:return py;case 35669:case 35673:return xy;case 5125:return my;case 36294:return gy;case 36295:return _y;case 36296:return vy;case 35678:case 36198:case 36298:case 36306:case 35682:return yy;case 35679:case 36299:case 36307:return by;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return Sy}}class Ty{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ry(e.type)}}class wy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ey(e.type)}}class Ay{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Ec=/(\w+)(\])?(\[|\.)?/g;function Qh(i,t){i.seq.push(t),i.map[t.id]=t}function Ry(i,t,e){const n=i.name,r=n.length;for(Ec.lastIndex=0;;){const s=Ec.exec(n),o=Ec.lastIndex;let a=s[1];const c=s[2]==="]",h=s[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===r){Qh(e,h===void 0?new Ty(a,i,t):new wy(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new Ay(a),Qh(e,p)),e=p}}}class ua{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Ry(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function tf(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Cy=37297;let Py=0;function Iy(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ef=new Zt;function Ly(i){ee._getMatrix(ef,ee.workingColorSpace,i);const t=`mat3( ${ef.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case ya:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function nf(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Iy(i.getShaderSource(t),a)}else return s}function Dy(i,t){const e=Ly(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Uy(i,t){let e;switch(t){case I0:e="Linear";break;case L0:e="Reinhard";break;case D0:e="Cineon";break;case U0:e="ACESFilmic";break;case F0:e="AgX";break;case O0:e="Neutral";break;case N0:e="Custom";break;default:Ht("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Lo=new I;function Ny(){ee.getLuminanceCoefficients(Lo);const i=Lo.x.toFixed(4),t=Lo.y.toFixed(4),e=Lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function Oy(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function By(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ds(i){return i!==""}function rf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(i){return i.replace(zy,ky)}const Vy=new Map;function ky(i,t){let e=Kt[t];if(e===void 0){const n=Vy.get(t);if(n!==void 0)e=Kt[n],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return $l(e)}const Hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function of(i){return i.replace(Hy,Gy)}function Gy(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function af(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Wy(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Cd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===fi&&(t="SHADOWMAP_TYPE_VSM"),t}function Xy(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case is:case rs:t="ENVMAP_TYPE_CUBE";break;case Ia:t="ENVMAP_TYPE_CUBE_UV";break}return t}function qy(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case rs:t="ENVMAP_MODE_REFRACTION";break}return t}function Yy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Pd:t="ENVMAP_BLENDING_MULTIPLY";break;case C0:t="ENVMAP_BLENDING_MIX";break;case P0:t="ENVMAP_BLENDING_ADD";break}return t}function jy(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Zy(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Wy(e),h=Xy(e),f=qy(e),p=Yy(e),x=jy(e),m=Fy(e),v=Oy(s),S=r.createProgram();let _,g,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ds).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ds).join(`
`),g.length>0&&(g+=`
`)):(_=[af(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),g=[af(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?Kt.tonemapping_pars_fragment:"",e.toneMapping!==Oi?Uy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,Dy("linearToOutputTexel",e.outputColorSpace),Ny(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),o=$l(o),o=rf(o,e),o=sf(o,e),a=$l(a),a=rf(a,e),a=sf(a,e),o=of(o),a=of(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,_=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",e.glslVersion===sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const d=E+_+o,l=E+g+a,b=tf(r,r.VERTEX_SHADER,d),u=tf(r,r.FRAGMENT_SHADER,l);r.attachShader(S,b),r.attachShader(S,u),e.index0AttributeName!==void 0?r.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function R(T){if(i.debug.checkShaderErrors){const A=r.getProgramInfoLog(S)||"",C=r.getShaderInfoLog(b)||"",F=r.getShaderInfoLog(u)||"",N=A.trim(),O=C.trim(),B=F.trim();let V=!0,W=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,S,b,u);else{const nt=nf(r,b,"vertex"),it=nf(r,u,"fragment");ne("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+N+`
`+nt+`
`+it)}else N!==""?Ht("WebGLProgram: Program Info Log:",N):(O===""||B==="")&&(W=!1);W&&(T.diagnostics={runnable:V,programLog:N,vertexShader:{log:O,prefix:_},fragmentShader:{log:B,prefix:g}})}r.deleteShader(b),r.deleteShader(u),w=new ua(r,S),M=By(r,S)}let w;this.getUniforms=function(){return w===void 0&&R(this),w};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(S,Cy)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Py++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=b,this.fragmentShader=u,this}let $y=0;class Ky{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Jy(t),e.set(t,n)),n}}class Jy{constructor(t){this.id=$y++,this.code=t,this.usedTimes=0}}function Qy(i,t,e,n,r,s,o){const a=new mu,c=new Ky,h=new Set,f=[],p=r.logarithmicDepthBuffer,x=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(M){return h.add(M),M===0?"uv":`uv${M}`}function _(M,y,T,A,C){const F=A.fog,N=C.geometry,O=M.isMeshStandardMaterial?A.environment:null,B=(M.isMeshStandardMaterial?e:t).get(M.envMap||O),V=B&&B.mapping===Ia?B.image.height:null,W=v[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&Ht("WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const nt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,it=nt!==void 0?nt.length:0;let ht=0;N.morphAttributes.position!==void 0&&(ht=1),N.morphAttributes.normal!==void 0&&(ht=2),N.morphAttributes.color!==void 0&&(ht=3);let _t,yt,Tt,Y;if(W){const ce=$n[W];_t=ce.vertexShader,yt=ce.fragmentShader}else _t=M.vertexShader,yt=M.fragmentShader,c.update(M),Tt=c.getVertexShaderID(M),Y=c.getFragmentShaderID(M);const j=i.getRenderTarget(),st=i.state.buffers.depth.getReversed(),lt=C.isInstancedMesh===!0,ut=C.isBatchedMesh===!0,Rt=!!M.map,qt=!!M.matcap,Et=!!B,J=!!M.aoMap,D=!!M.lightMap,K=!!M.bumpMap,tt=!!M.normalMap,xt=!!M.displacementMap,et=!!M.emissiveMap,dt=!!M.metalnessMap,ot=!!M.roughnessMap,ft=M.anisotropy>0,U=M.clearcoat>0,P=M.dispersion>0,k=M.iridescence>0,q=M.sheen>0,Q=M.transmission>0,X=ft&&!!M.anisotropyMap,mt=U&&!!M.clearcoatMap,St=U&&!!M.clearcoatNormalMap,Ft=U&&!!M.clearcoatRoughnessMap,Dt=k&&!!M.iridescenceMap,at=k&&!!M.iridescenceThicknessMap,vt=q&&!!M.sheenColorMap,kt=q&&!!M.sheenRoughnessMap,zt=!!M.specularMap,It=!!M.specularColorMap,Wt=!!M.specularIntensityMap,z=Q&&!!M.transmissionMap,At=Q&&!!M.thicknessMap,bt=!!M.gradientMap,Mt=!!M.alphaMap,pt=M.alphaTest>0,rt=!!M.alphaHash,Ut=!!M.extensions;let Yt=Oi;M.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Yt=i.toneMapping);const me={shaderID:W,shaderType:M.type,shaderName:M.name,vertexShader:_t,fragmentShader:yt,defines:M.defines,customVertexShaderID:Tt,customFragmentShaderID:Y,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:ut,batchingColor:ut&&C._colorsTexture!==null,instancing:lt,instancingColor:lt&&C.instanceColor!==null,instancingMorph:lt&&C.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ss,alphaToCoverage:!!M.alphaToCoverage,map:Rt,matcap:qt,envMap:Et,envMapMode:Et&&B.mapping,envMapCubeUVHeight:V,aoMap:J,lightMap:D,bumpMap:K,normalMap:tt,displacementMap:x&&xt,emissiveMap:et,normalMapObjectSpace:tt&&M.normalMapType===H0,normalMapTangentSpace:tt&&M.normalMapType===Vd,metalnessMap:dt,roughnessMap:ot,anisotropy:ft,anisotropyMap:X,clearcoat:U,clearcoatMap:mt,clearcoatNormalMap:St,clearcoatRoughnessMap:Ft,dispersion:P,iridescence:k,iridescenceMap:Dt,iridescenceThicknessMap:at,sheen:q,sheenColorMap:vt,sheenRoughnessMap:kt,specularMap:zt,specularColorMap:It,specularIntensityMap:Wt,transmission:Q,transmissionMap:z,thicknessMap:At,gradientMap:bt,opaque:M.transparent===!1&&M.blending===ts&&M.alphaToCoverage===!1,alphaMap:Mt,alphaTest:pt,alphaHash:rt,combine:M.combine,mapUv:Rt&&S(M.map.channel),aoMapUv:J&&S(M.aoMap.channel),lightMapUv:D&&S(M.lightMap.channel),bumpMapUv:K&&S(M.bumpMap.channel),normalMapUv:tt&&S(M.normalMap.channel),displacementMapUv:xt&&S(M.displacementMap.channel),emissiveMapUv:et&&S(M.emissiveMap.channel),metalnessMapUv:dt&&S(M.metalnessMap.channel),roughnessMapUv:ot&&S(M.roughnessMap.channel),anisotropyMapUv:X&&S(M.anisotropyMap.channel),clearcoatMapUv:mt&&S(M.clearcoatMap.channel),clearcoatNormalMapUv:St&&S(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ft&&S(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&S(M.iridescenceMap.channel),iridescenceThicknessMapUv:at&&S(M.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&S(M.sheenColorMap.channel),sheenRoughnessMapUv:kt&&S(M.sheenRoughnessMap.channel),specularMapUv:zt&&S(M.specularMap.channel),specularColorMapUv:It&&S(M.specularColorMap.channel),specularIntensityMapUv:Wt&&S(M.specularIntensityMap.channel),transmissionMapUv:z&&S(M.transmissionMap.channel),thicknessMapUv:At&&S(M.thicknessMap.channel),alphaMapUv:Mt&&S(M.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(tt||ft),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!N.attributes.uv&&(Rt||Mt),fog:!!F,useFog:M.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:st,skinning:C.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:ht,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:Yt,decodeVideoTexture:Rt&&M.map.isVideoTexture===!0&&ee.getTransfer(M.map.colorSpace)===ue,decodeVideoTextureEmissive:et&&M.emissiveMap.isVideoTexture===!0&&ee.getTransfer(M.emissiveMap.colorSpace)===ue,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===yn,flipSided:M.side===nn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ut&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&M.extensions.multiDraw===!0||ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return me.vertexUv1s=h.has(1),me.vertexUv2s=h.has(2),me.vertexUv3s=h.has(3),h.clear(),me}function g(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const T in M.defines)y.push(T),y.push(M.defines[T]);return M.isRawShaderMaterial===!1&&(E(y,M),d(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function E(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function d(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),M.push(a.mask)}function l(M){const y=v[M.type];let T;if(y){const A=$n[y];T=Ix.clone(A.uniforms)}else T=M.uniforms;return T}function b(M,y){let T;for(let A=0,C=f.length;A<C;A++){const F=f[A];if(F.cacheKey===y){T=F,++T.usedTimes;break}}return T===void 0&&(T=new Zy(i,y,M,s),f.push(T)),T}function u(M){if(--M.usedTimes===0){const y=f.indexOf(M);f[y]=f[f.length-1],f.pop(),M.destroy()}}function R(M){c.remove(M)}function w(){c.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:l,acquireProgram:b,releaseProgram:u,releaseShaderCache:R,programs:f,dispose:w}}function tb(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function eb(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function cf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function lf(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(p,x,m,v,S,_){let g=i[t];return g===void 0?(g={id:p.id,object:p,geometry:x,material:m,groupOrder:v,renderOrder:p.renderOrder,z:S,group:_},i[t]=g):(g.id=p.id,g.object=p,g.geometry=x,g.material=m,g.groupOrder=v,g.renderOrder=p.renderOrder,g.z=S,g.group=_),t++,g}function a(p,x,m,v,S,_){const g=o(p,x,m,v,S,_);m.transmission>0?n.push(g):m.transparent===!0?r.push(g):e.push(g)}function c(p,x,m,v,S,_){const g=o(p,x,m,v,S,_);m.transmission>0?n.unshift(g):m.transparent===!0?r.unshift(g):e.unshift(g)}function h(p,x){e.length>1&&e.sort(p||eb),n.length>1&&n.sort(x||cf),r.length>1&&r.sort(x||cf)}function f(){for(let p=t,x=i.length;p<x;p++){const m=i[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:f,sort:h}}function nb(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new lf,i.set(n,[o])):r>=s.length?(o=new lf,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function ib(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Jt};break;case"SpotLight":e={position:new I,direction:new I,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function rb(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let sb=0;function ob(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function ab(i){const t=new ib,e=rb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new I);const r=new I,s=new $t,o=new $t;function a(h){let f=0,p=0,x=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let m=0,v=0,S=0,_=0,g=0,E=0,d=0,l=0,b=0,u=0,R=0;h.sort(ob);for(let M=0,y=h.length;M<y;M++){const T=h[M],A=T.color,C=T.intensity,F=T.distance,N=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)f+=A.r*C,p+=A.g*C,x+=A.b*C;else if(T.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(T.sh.coefficients[O],C);R++}else if(T.isDirectionalLight){const O=t.get(T);if(O.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const B=T.shadow,V=e.get(T);V.shadowIntensity=B.intensity,V.shadowBias=B.bias,V.shadowNormalBias=B.normalBias,V.shadowRadius=B.radius,V.shadowMapSize=B.mapSize,n.directionalShadow[m]=V,n.directionalShadowMap[m]=N,n.directionalShadowMatrix[m]=T.shadow.matrix,E++}n.directional[m]=O,m++}else if(T.isSpotLight){const O=t.get(T);O.position.setFromMatrixPosition(T.matrixWorld),O.color.copy(A).multiplyScalar(C),O.distance=F,O.coneCos=Math.cos(T.angle),O.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),O.decay=T.decay,n.spot[S]=O;const B=T.shadow;if(T.map&&(n.spotLightMap[b]=T.map,b++,B.updateMatrices(T),T.castShadow&&u++),n.spotLightMatrix[S]=B.matrix,T.castShadow){const V=e.get(T);V.shadowIntensity=B.intensity,V.shadowBias=B.bias,V.shadowNormalBias=B.normalBias,V.shadowRadius=B.radius,V.shadowMapSize=B.mapSize,n.spotShadow[S]=V,n.spotShadowMap[S]=N,l++}S++}else if(T.isRectAreaLight){const O=t.get(T);O.color.copy(A).multiplyScalar(C),O.halfWidth.set(T.width*.5,0,0),O.halfHeight.set(0,T.height*.5,0),n.rectArea[_]=O,_++}else if(T.isPointLight){const O=t.get(T);if(O.color.copy(T.color).multiplyScalar(T.intensity),O.distance=T.distance,O.decay=T.decay,T.castShadow){const B=T.shadow,V=e.get(T);V.shadowIntensity=B.intensity,V.shadowBias=B.bias,V.shadowNormalBias=B.normalBias,V.shadowRadius=B.radius,V.shadowMapSize=B.mapSize,V.shadowCameraNear=B.camera.near,V.shadowCameraFar=B.camera.far,n.pointShadow[v]=V,n.pointShadowMap[v]=N,n.pointShadowMatrix[v]=T.shadow.matrix,d++}n.point[v]=O,v++}else if(T.isHemisphereLight){const O=t.get(T);O.skyColor.copy(T.color).multiplyScalar(C),O.groundColor.copy(T.groundColor).multiplyScalar(C),n.hemi[g]=O,g++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=wt.LTC_FLOAT_1,n.rectAreaLTC2=wt.LTC_FLOAT_2):(n.rectAreaLTC1=wt.LTC_HALF_1,n.rectAreaLTC2=wt.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=p,n.ambient[2]=x;const w=n.hash;(w.directionalLength!==m||w.pointLength!==v||w.spotLength!==S||w.rectAreaLength!==_||w.hemiLength!==g||w.numDirectionalShadows!==E||w.numPointShadows!==d||w.numSpotShadows!==l||w.numSpotMaps!==b||w.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=S,n.rectArea.length=_,n.point.length=v,n.hemi.length=g,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=d,n.pointShadowMap.length=d,n.spotShadow.length=l,n.spotShadowMap.length=l,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=d,n.spotLightMatrix.length=l+b-u,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=u,n.numLightProbes=R,w.directionalLength=m,w.pointLength=v,w.spotLength=S,w.rectAreaLength=_,w.hemiLength=g,w.numDirectionalShadows=E,w.numPointShadows=d,w.numSpotShadows=l,w.numSpotMaps=b,w.numLightProbes=R,n.version=sb++)}function c(h,f){let p=0,x=0,m=0,v=0,S=0;const _=f.matrixWorldInverse;for(let g=0,E=h.length;g<E;g++){const d=h[g];if(d.isDirectionalLight){const l=n.directional[p];l.direction.setFromMatrixPosition(d.matrixWorld),r.setFromMatrixPosition(d.target.matrixWorld),l.direction.sub(r),l.direction.transformDirection(_),p++}else if(d.isSpotLight){const l=n.spot[m];l.position.setFromMatrixPosition(d.matrixWorld),l.position.applyMatrix4(_),l.direction.setFromMatrixPosition(d.matrixWorld),r.setFromMatrixPosition(d.target.matrixWorld),l.direction.sub(r),l.direction.transformDirection(_),m++}else if(d.isRectAreaLight){const l=n.rectArea[v];l.position.setFromMatrixPosition(d.matrixWorld),l.position.applyMatrix4(_),o.identity(),s.copy(d.matrixWorld),s.premultiply(_),o.extractRotation(s),l.halfWidth.set(d.width*.5,0,0),l.halfHeight.set(0,d.height*.5,0),l.halfWidth.applyMatrix4(o),l.halfHeight.applyMatrix4(o),v++}else if(d.isPointLight){const l=n.point[x];l.position.setFromMatrixPosition(d.matrixWorld),l.position.applyMatrix4(_),x++}else if(d.isHemisphereLight){const l=n.hemi[S];l.direction.setFromMatrixPosition(d.matrixWorld),l.direction.transformDirection(_),S++}}}return{setup:a,setupView:c,state:n}}function uf(i){const t=new ab(i),e=[],n=[];function r(f){h.camera=f,e.length=0,n.length=0}function s(f){e.push(f)}function o(f){n.push(f)}function a(){t.setup(e)}function c(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:h,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function cb(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new uf(i),t.set(r,[a])):s>=o.length?(a=new uf(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const lb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ub=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function hb(i,t,e){let n=new gu;const r=new ct,s=new ct,o=new pe,a=new bm({depthPacking:k0}),c=new Mm,h={},f=e.maxTextureSize,p={[ei]:nn,[nn]:ei,[yn]:yn},x=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:lb,fragmentShader:ub}),m=x.clone();m.defines.HORIZONTAL_PASS=1;const v=new Ie;v.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Ct(v,x),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rd;let g=this.type;this.render=function(u,R,w){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||u.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),A=i.state;A.setBlending(gi),A.buffers.depth.getReversed()===!0?A.buffers.color.setClear(0,0,0,0):A.buffers.color.setClear(1,1,1,1),A.buffers.depth.setTest(!0),A.setScissorTest(!1);const C=g!==fi&&this.type===fi,F=g===fi&&this.type!==fi;for(let N=0,O=u.length;N<O;N++){const B=u[N],V=B.shadow;if(V===void 0){Ht("WebGLShadowMap:",B,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const W=V.getFrameExtents();if(r.multiply(W),s.copy(V.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/W.x),r.x=s.x*W.x,V.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/W.y),r.y=s.y*W.y,V.mapSize.y=s.y)),V.map===null||C===!0||F===!0){const it=this.type!==fi?{minFilter:fn,magFilter:fn}:{};V.map!==null&&V.map.dispose(),V.map=new cr(r.x,r.y,it),V.map.texture.name=B.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const nt=V.getViewportCount();for(let it=0;it<nt;it++){const ht=V.getViewport(it);o.set(s.x*ht.x,s.y*ht.y,s.x*ht.z,s.y*ht.w),A.viewport(o),V.updateMatrices(B,it),n=V.getFrustum(),l(R,w,V.camera,B,this.type)}V.isPointLightShadow!==!0&&this.type===fi&&E(V,w),V.needsUpdate=!1}g=this.type,_.needsUpdate=!1,i.setRenderTarget(M,y,T)};function E(u,R){const w=t.update(S);x.defines.VSM_SAMPLES!==u.blurSamples&&(x.defines.VSM_SAMPLES=u.blurSamples,m.defines.VSM_SAMPLES=u.blurSamples,x.needsUpdate=!0,m.needsUpdate=!0),u.mapPass===null&&(u.mapPass=new cr(r.x,r.y)),x.uniforms.shadow_pass.value=u.map.texture,x.uniforms.resolution.value=u.mapSize,x.uniforms.radius.value=u.radius,i.setRenderTarget(u.mapPass),i.clear(),i.renderBufferDirect(R,null,w,x,S,null),m.uniforms.shadow_pass.value=u.mapPass.texture,m.uniforms.resolution.value=u.mapSize,m.uniforms.radius.value=u.radius,i.setRenderTarget(u.map),i.clear(),i.renderBufferDirect(R,null,w,m,S,null)}function d(u,R,w,M){let y=null;const T=w.isPointLight===!0?u.customDistanceMaterial:u.customDepthMaterial;if(T!==void 0)y=T;else if(y=w.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const A=y.uuid,C=R.uuid;let F=h[A];F===void 0&&(F={},h[A]=F);let N=F[C];N===void 0&&(N=y.clone(),F[C]=N,R.addEventListener("dispose",b)),y=N}if(y.visible=R.visible,y.wireframe=R.wireframe,M===fi?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:p[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const A=i.properties.get(y);A.light=w}return y}function l(u,R,w,M,y){if(u.visible===!1)return;if(u.layers.test(R.layers)&&(u.isMesh||u.isLine||u.isPoints)&&(u.castShadow||u.receiveShadow&&y===fi)&&(!u.frustumCulled||n.intersectsObject(u))){u.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,u.matrixWorld);const C=t.update(u),F=u.material;if(Array.isArray(F)){const N=C.groups;for(let O=0,B=N.length;O<B;O++){const V=N[O],W=F[V.materialIndex];if(W&&W.visible){const nt=d(u,W,M,y);u.onBeforeShadow(i,u,R,w,C,nt,V),i.renderBufferDirect(w,null,C,nt,u,V),u.onAfterShadow(i,u,R,w,C,nt,V)}}}else if(F.visible){const N=d(u,F,M,y);u.onBeforeShadow(i,u,R,w,C,N,null),i.renderBufferDirect(w,null,C,N,u,null),u.onAfterShadow(i,u,R,w,C,N,null)}}const A=u.children;for(let C=0,F=A.length;C<F;C++)l(A[C],R,w,M,y)}function b(u){u.target.removeEventListener("dispose",b);for(const w in h){const M=h[w],y=u.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const fb={[al]:cl,[ll]:fl,[ul]:dl,[ns]:hl,[cl]:al,[fl]:ll,[dl]:ul,[hl]:ns};function db(i,t){function e(){let z=!1;const At=new pe;let bt=null;const Mt=new pe(0,0,0,0);return{setMask:function(pt){bt!==pt&&!z&&(i.colorMask(pt,pt,pt,pt),bt=pt)},setLocked:function(pt){z=pt},setClear:function(pt,rt,Ut,Yt,me){me===!0&&(pt*=Yt,rt*=Yt,Ut*=Yt),At.set(pt,rt,Ut,Yt),Mt.equals(At)===!1&&(i.clearColor(pt,rt,Ut,Yt),Mt.copy(At))},reset:function(){z=!1,bt=null,Mt.set(-1,0,0,0)}}}function n(){let z=!1,At=!1,bt=null,Mt=null,pt=null;return{setReversed:function(rt){if(At!==rt){const Ut=t.get("EXT_clip_control");rt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),At=rt;const Yt=pt;pt=null,this.setClear(Yt)}},getReversed:function(){return At},setTest:function(rt){rt?j(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(rt){bt!==rt&&!z&&(i.depthMask(rt),bt=rt)},setFunc:function(rt){if(At&&(rt=fb[rt]),Mt!==rt){switch(rt){case al:i.depthFunc(i.NEVER);break;case cl:i.depthFunc(i.ALWAYS);break;case ll:i.depthFunc(i.LESS);break;case ns:i.depthFunc(i.LEQUAL);break;case ul:i.depthFunc(i.EQUAL);break;case hl:i.depthFunc(i.GEQUAL);break;case fl:i.depthFunc(i.GREATER);break;case dl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=rt}},setLocked:function(rt){z=rt},setClear:function(rt){pt!==rt&&(At&&(rt=1-rt),i.clearDepth(rt),pt=rt)},reset:function(){z=!1,bt=null,Mt=null,pt=null,At=!1}}}function r(){let z=!1,At=null,bt=null,Mt=null,pt=null,rt=null,Ut=null,Yt=null,me=null;return{setTest:function(ce){z||(ce?j(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function(ce){At!==ce&&!z&&(i.stencilMask(ce),At=ce)},setFunc:function(ce,qn,Fn){(bt!==ce||Mt!==qn||pt!==Fn)&&(i.stencilFunc(ce,qn,Fn),bt=ce,Mt=qn,pt=Fn)},setOp:function(ce,qn,Fn){(rt!==ce||Ut!==qn||Yt!==Fn)&&(i.stencilOp(ce,qn,Fn),rt=ce,Ut=qn,Yt=Fn)},setLocked:function(ce){z=ce},setClear:function(ce){me!==ce&&(i.clearStencil(ce),me=ce)},reset:function(){z=!1,At=null,bt=null,Mt=null,pt=null,rt=null,Ut=null,Yt=null,me=null}}}const s=new e,o=new n,a=new r,c=new WeakMap,h=new WeakMap;let f={},p={},x=new WeakMap,m=[],v=null,S=!1,_=null,g=null,E=null,d=null,l=null,b=null,u=null,R=new Jt(0,0,0),w=0,M=!1,y=null,T=null,A=null,C=null,F=null;const N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,B=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=B>=1):V.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=B>=2);let W=null,nt={};const it=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),_t=new pe().fromArray(it),yt=new pe().fromArray(ht);function Tt(z,At,bt,Mt){const pt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(z,rt),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<bt;Ut++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(At,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(At+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return rt}const Y={};Y[i.TEXTURE_2D]=Tt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(i.DEPTH_TEST),o.setFunc(ns),K(!1),tt(Qu),j(i.CULL_FACE),J(gi);function j(z){f[z]!==!0&&(i.enable(z),f[z]=!0)}function st(z){f[z]!==!1&&(i.disable(z),f[z]=!1)}function lt(z,At){return p[z]!==At?(i.bindFramebuffer(z,At),p[z]=At,z===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=At),z===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=At),!0):!1}function ut(z,At){let bt=m,Mt=!1;if(z){bt=x.get(At),bt===void 0&&(bt=[],x.set(At,bt));const pt=z.textures;if(bt.length!==pt.length||bt[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,Ut=pt.length;rt<Ut;rt++)bt[rt]=i.COLOR_ATTACHMENT0+rt;bt.length=pt.length,Mt=!0}}else bt[0]!==i.BACK&&(bt[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(bt)}function Rt(z){return v!==z?(i.useProgram(z),v=z,!0):!1}const qt={[er]:i.FUNC_ADD,[f0]:i.FUNC_SUBTRACT,[d0]:i.FUNC_REVERSE_SUBTRACT};qt[p0]=i.MIN,qt[x0]=i.MAX;const Et={[m0]:i.ZERO,[g0]:i.ONE,[_0]:i.SRC_COLOR,[sl]:i.SRC_ALPHA,[E0]:i.SRC_ALPHA_SATURATE,[M0]:i.DST_COLOR,[y0]:i.DST_ALPHA,[v0]:i.ONE_MINUS_SRC_COLOR,[ol]:i.ONE_MINUS_SRC_ALPHA,[S0]:i.ONE_MINUS_DST_COLOR,[b0]:i.ONE_MINUS_DST_ALPHA,[T0]:i.CONSTANT_COLOR,[w0]:i.ONE_MINUS_CONSTANT_COLOR,[A0]:i.CONSTANT_ALPHA,[R0]:i.ONE_MINUS_CONSTANT_ALPHA};function J(z,At,bt,Mt,pt,rt,Ut,Yt,me,ce){if(z===gi){S===!0&&(st(i.BLEND),S=!1);return}if(S===!1&&(j(i.BLEND),S=!0),z!==h0){if(z!==_||ce!==M){if((g!==er||l!==er)&&(i.blendEquation(i.FUNC_ADD),g=er,l=er),ce)switch(z){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case th:i.blendFunc(i.ONE,i.ONE);break;case eh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ne("WebGLState: Invalid blending: ",z);break}else switch(z){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case th:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case eh:ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ne("WebGLState: Invalid blending: ",z);break}E=null,d=null,b=null,u=null,R.set(0,0,0),w=0,_=z,M=ce}return}pt=pt||At,rt=rt||bt,Ut=Ut||Mt,(At!==g||pt!==l)&&(i.blendEquationSeparate(qt[At],qt[pt]),g=At,l=pt),(bt!==E||Mt!==d||rt!==b||Ut!==u)&&(i.blendFuncSeparate(Et[bt],Et[Mt],Et[rt],Et[Ut]),E=bt,d=Mt,b=rt,u=Ut),(Yt.equals(R)===!1||me!==w)&&(i.blendColor(Yt.r,Yt.g,Yt.b,me),R.copy(Yt),w=me),_=z,M=!1}function D(z,At){z.side===yn?st(i.CULL_FACE):j(i.CULL_FACE);let bt=z.side===nn;At&&(bt=!bt),K(bt),z.blending===ts&&z.transparent===!1?J(gi):J(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),s.setMask(z.colorWrite);const Mt=z.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),et(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function K(z){y!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),y=z)}function tt(z){z!==l0?(j(i.CULL_FACE),z!==T&&(z===Qu?i.cullFace(i.BACK):z===u0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),T=z}function xt(z){z!==A&&(O&&i.lineWidth(z),A=z)}function et(z,At,bt){z?(j(i.POLYGON_OFFSET_FILL),(C!==At||F!==bt)&&(i.polygonOffset(At,bt),C=At,F=bt)):st(i.POLYGON_OFFSET_FILL)}function dt(z){z?j(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function ot(z){z===void 0&&(z=i.TEXTURE0+N-1),W!==z&&(i.activeTexture(z),W=z)}function ft(z,At,bt){bt===void 0&&(W===null?bt=i.TEXTURE0+N-1:bt=W);let Mt=nt[bt];Mt===void 0&&(Mt={type:void 0,texture:void 0},nt[bt]=Mt),(Mt.type!==z||Mt.texture!==At)&&(W!==bt&&(i.activeTexture(bt),W=bt),i.bindTexture(z,At||Y[z]),Mt.type=z,Mt.texture=At)}function U(){const z=nt[W];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function P(){try{i.compressedTexImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function q(){try{i.texSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Q(){try{i.texSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function mt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function St(){try{i.texStorage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Ft(){try{i.texStorage3D(...arguments)}catch(z){z("WebGLState:",z)}}function Dt(){try{i.texImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function at(){try{i.texImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function vt(z){_t.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),_t.copy(z))}function kt(z){yt.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),yt.copy(z))}function zt(z,At){let bt=h.get(At);bt===void 0&&(bt=new WeakMap,h.set(At,bt));let Mt=bt.get(z);Mt===void 0&&(Mt=i.getUniformBlockIndex(At,z.name),bt.set(z,Mt))}function It(z,At){const Mt=h.get(At).get(z);c.get(At)!==Mt&&(i.uniformBlockBinding(At,Mt,z.__bindingPointIndex),c.set(At,Mt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},W=null,nt={},p={},x=new WeakMap,m=[],v=null,S=!1,_=null,g=null,E=null,d=null,l=null,b=null,u=null,R=new Jt(0,0,0),w=0,M=!1,y=null,T=null,A=null,C=null,F=null,_t.set(0,0,i.canvas.width,i.canvas.height),yt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:j,disable:st,bindFramebuffer:lt,drawBuffers:ut,useProgram:Rt,setBlending:J,setMaterial:D,setFlipSided:K,setCullFace:tt,setLineWidth:xt,setPolygonOffset:et,setScissorTest:dt,activeTexture:ot,bindTexture:ft,unbindTexture:U,compressedTexImage2D:P,compressedTexImage3D:k,texImage2D:Dt,texImage3D:at,updateUBOMapping:zt,uniformBlockBinding:It,texStorage2D:St,texStorage3D:Ft,texSubImage2D:q,texSubImage3D:Q,compressedTexSubImage2D:X,compressedTexSubImage3D:mt,scissor:vt,viewport:kt,reset:Wt}}function pb(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ct,f=new WeakMap;let p;const x=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(U,P){return m?new OffscreenCanvas(U,P):Ma("canvas")}function S(U,P,k){let q=1;const Q=ft(U);if((Q.width>k||Q.height>k)&&(q=k/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const X=Math.floor(q*Q.width),mt=Math.floor(q*Q.height);p===void 0&&(p=v(X,mt));const St=P?v(X,mt):p;return St.width=X,St.height=mt,St.getContext("2d").drawImage(U,0,0,X,mt),Ht("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+X+"x"+mt+")."),St}else return"data"in U&&Ht("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),U;return U}function _(U){return U.generateMipmaps}function g(U){i.generateMipmap(U)}function E(U){return U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?i.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function d(U,P,k,q,Q=!1){if(U!==null){if(i[U]!==void 0)return i[U];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let X=P;if(P===i.RED&&(k===i.FLOAT&&(X=i.R32F),k===i.HALF_FLOAT&&(X=i.R16F),k===i.UNSIGNED_BYTE&&(X=i.R8)),P===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.R8UI),k===i.UNSIGNED_SHORT&&(X=i.R16UI),k===i.UNSIGNED_INT&&(X=i.R32UI),k===i.BYTE&&(X=i.R8I),k===i.SHORT&&(X=i.R16I),k===i.INT&&(X=i.R32I)),P===i.RG&&(k===i.FLOAT&&(X=i.RG32F),k===i.HALF_FLOAT&&(X=i.RG16F),k===i.UNSIGNED_BYTE&&(X=i.RG8)),P===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RG8UI),k===i.UNSIGNED_SHORT&&(X=i.RG16UI),k===i.UNSIGNED_INT&&(X=i.RG32UI),k===i.BYTE&&(X=i.RG8I),k===i.SHORT&&(X=i.RG16I),k===i.INT&&(X=i.RG32I)),P===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGB8UI),k===i.UNSIGNED_SHORT&&(X=i.RGB16UI),k===i.UNSIGNED_INT&&(X=i.RGB32UI),k===i.BYTE&&(X=i.RGB8I),k===i.SHORT&&(X=i.RGB16I),k===i.INT&&(X=i.RGB32I)),P===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),k===i.UNSIGNED_INT&&(X=i.RGBA32UI),k===i.BYTE&&(X=i.RGBA8I),k===i.SHORT&&(X=i.RGBA16I),k===i.INT&&(X=i.RGBA32I)),P===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),P===i.RGBA){const mt=Q?ya:ee.getTransfer(q);k===i.FLOAT&&(X=i.RGBA32F),k===i.HALF_FLOAT&&(X=i.RGBA16F),k===i.UNSIGNED_BYTE&&(X=mt===ue?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function l(U,P){let k;return U?P===null||P===ar||P===js?k=i.DEPTH24_STENCIL8:P===mi?k=i.DEPTH32F_STENCIL8:P===Ys&&(k=i.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===ar||P===js?k=i.DEPTH_COMPONENT24:P===mi?k=i.DEPTH_COMPONENT32F:P===Ys&&(k=i.DEPTH_COMPONENT16),k}function b(U,P){return _(U)===!0||U.isFramebufferTexture&&U.minFilter!==fn&&U.minFilter!==Mn?Math.log2(Math.max(P.width,P.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?P.mipmaps.length:1}function u(U){const P=U.target;P.removeEventListener("dispose",u),w(P),P.isVideoTexture&&f.delete(P)}function R(U){const P=U.target;P.removeEventListener("dispose",R),y(P)}function w(U){const P=n.get(U);if(P.__webglInit===void 0)return;const k=U.source,q=x.get(k);if(q){const Q=q[P.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(U),Object.keys(q).length===0&&x.delete(k)}n.remove(U)}function M(U){const P=n.get(U);i.deleteTexture(P.__webglTexture);const k=U.source,q=x.get(k);delete q[P.__cacheKey],o.memory.textures--}function y(U){const P=n.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),n.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(P.__webglFramebuffer[q]))for(let Q=0;Q<P.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(P.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(P.__webglFramebuffer[q]);P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer[q])}else{if(Array.isArray(P.__webglFramebuffer))for(let q=0;q<P.__webglFramebuffer.length;q++)i.deleteFramebuffer(P.__webglFramebuffer[q]);else i.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&i.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let q=0;q<P.__webglColorRenderbuffer.length;q++)P.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(P.__webglColorRenderbuffer[q]);P.__webglDepthRenderbuffer&&i.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const k=U.textures;for(let q=0,Q=k.length;q<Q;q++){const X=n.get(k[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(k[q])}n.remove(U)}let T=0;function A(){T=0}function C(){const U=T;return U>=r.maxTextures&&Ht("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+r.maxTextures),T+=1,U}function F(U){const P=[];return P.push(U.wrapS),P.push(U.wrapT),P.push(U.wrapR||0),P.push(U.magFilter),P.push(U.minFilter),P.push(U.anisotropy),P.push(U.internalFormat),P.push(U.format),P.push(U.type),P.push(U.generateMipmaps),P.push(U.premultiplyAlpha),P.push(U.flipY),P.push(U.unpackAlignment),P.push(U.colorSpace),P.join()}function N(U,P){const k=n.get(U);if(U.isVideoTexture&&dt(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&k.__version!==U.version){const q=U.image;if(q===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(k,U,P);return}}else U.isExternalTexture&&(k.__webglTexture=U.sourceTexture?U.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+P)}function O(U,P){const k=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&k.__version!==U.version){Y(k,U,P);return}else U.isExternalTexture&&(k.__webglTexture=U.sourceTexture?U.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+P)}function B(U,P){const k=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&k.__version!==U.version){Y(k,U,P);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+P)}function V(U,P){const k=n.get(U);if(U.version>0&&k.__version!==U.version){j(k,U,P);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+P)}const W={[_a]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[va]:i.MIRRORED_REPEAT},nt={[fn]:i.NEAREST,[Ld]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[sa]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},it={[G0]:i.NEVER,[Z0]:i.ALWAYS,[W0]:i.LESS,[kd]:i.LEQUAL,[X0]:i.EQUAL,[j0]:i.GEQUAL,[q0]:i.GREATER,[Y0]:i.NOTEQUAL};function ht(U,P){if(P.type===mi&&t.has("OES_texture_float_linear")===!1&&(P.magFilter===Mn||P.magFilter===sa||P.magFilter===Is||P.magFilter===Ui||P.minFilter===Mn||P.minFilter===sa||P.minFilter===Is||P.minFilter===Ui)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,W[P.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,W[P.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,W[P.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,nt[P.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,nt[P.minFilter]),P.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,it[P.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===fn||P.minFilter!==Is&&P.minFilter!==Ui||P.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||n.get(P).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(U,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,r.getMaxAnisotropy())),n.get(P).__currentAnisotropy=P.anisotropy}}}function _t(U,P){let k=!1;U.__webglInit===void 0&&(U.__webglInit=!0,P.addEventListener("dispose",u));const q=P.source;let Q=x.get(q);Q===void 0&&(Q={},x.set(q,Q));const X=F(P);if(X!==U.__cacheKey){Q[X]===void 0&&(Q[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Q[X].usedTimes++;const mt=Q[U.__cacheKey];mt!==void 0&&(Q[U.__cacheKey].usedTimes--,mt.usedTimes===0&&M(P)),U.__cacheKey=X,U.__webglTexture=Q[X].texture}return k}function yt(U,P,k){return Math.floor(Math.floor(U/k)/P)}function Tt(U,P,k,q){const X=U.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,P.width,P.height,k,q,P.data);else{X.sort((at,vt)=>at.start-vt.start);let mt=0;for(let at=1;at<X.length;at++){const vt=X[mt],kt=X[at],zt=vt.start+vt.count,It=yt(kt.start,P.width,4),Wt=yt(vt.start,P.width,4);kt.start<=zt+1&&It===Wt&&yt(kt.start+kt.count-1,P.width,4)===It?vt.count=Math.max(vt.count,kt.start+kt.count-vt.start):(++mt,X[mt]=kt)}X.length=mt+1;const St=i.getParameter(i.UNPACK_ROW_LENGTH),Ft=i.getParameter(i.UNPACK_SKIP_PIXELS),Dt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,P.width);for(let at=0,vt=X.length;at<vt;at++){const kt=X[at],zt=Math.floor(kt.start/4),It=Math.ceil(kt.count/4),Wt=zt%P.width,z=Math.floor(zt/P.width),At=It,bt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,z),e.texSubImage2D(i.TEXTURE_2D,0,Wt,z,At,bt,k,q,P.data)}U.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,St),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ft),i.pixelStorei(i.UNPACK_SKIP_ROWS,Dt)}}function Y(U,P,k){let q=i.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),P.isData3DTexture&&(q=i.TEXTURE_3D);const Q=_t(U,P),X=P.source;e.bindTexture(q,U.__webglTexture,i.TEXTURE0+k);const mt=n.get(X);if(X.version!==mt.__version||Q===!0){e.activeTexture(i.TEXTURE0+k);const St=ee.getPrimaries(ee.workingColorSpace),Ft=P.colorSpace===xi?null:ee.getPrimaries(P.colorSpace),Dt=P.colorSpace===xi||St===Ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let at=S(P.image,!1,r.maxTextureSize);at=ot(P,at);const vt=s.convert(P.format,P.colorSpace),kt=s.convert(P.type);let zt=d(P.internalFormat,vt,kt,P.colorSpace,P.isVideoTexture);ht(q,P);let It;const Wt=P.mipmaps,z=P.isVideoTexture!==!0,At=mt.__version===void 0||Q===!0,bt=X.dataReady,Mt=b(P,at);if(P.isDepthTexture)zt=l(P.format===$s,P.type),At&&(z?e.texStorage2D(i.TEXTURE_2D,1,zt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,zt,at.width,at.height,0,vt,kt,null));else if(P.isDataTexture)if(Wt.length>0){z&&At&&e.texStorage2D(i.TEXTURE_2D,Mt,zt,Wt[0].width,Wt[0].height);for(let pt=0,rt=Wt.length;pt<rt;pt++)It=Wt[pt],z?bt&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,It.width,It.height,vt,kt,It.data):e.texImage2D(i.TEXTURE_2D,pt,zt,It.width,It.height,0,vt,kt,It.data);P.generateMipmaps=!1}else z?(At&&e.texStorage2D(i.TEXTURE_2D,Mt,zt,at.width,at.height),bt&&Tt(P,at,vt,kt)):e.texImage2D(i.TEXTURE_2D,0,zt,at.width,at.height,0,vt,kt,at.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){z&&At&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,zt,Wt[0].width,Wt[0].height,at.depth);for(let pt=0,rt=Wt.length;pt<rt;pt++)if(It=Wt[pt],P.format!==Ln)if(vt!==null)if(z){if(bt)if(P.layerUpdates.size>0){const Ut=Vh(It.width,It.height,P.format,P.type);for(const Yt of P.layerUpdates){const me=It.data.subarray(Yt*Ut/It.data.BYTES_PER_ELEMENT,(Yt+1)*Ut/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,Yt,It.width,It.height,1,vt,me)}P.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,It.width,It.height,at.depth,vt,It.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pt,zt,It.width,It.height,at.depth,0,It.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?bt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,It.width,It.height,at.depth,vt,kt,It.data):e.texImage3D(i.TEXTURE_2D_ARRAY,pt,zt,It.width,It.height,at.depth,0,vt,kt,It.data)}else{z&&At&&e.texStorage2D(i.TEXTURE_2D,Mt,zt,Wt[0].width,Wt[0].height);for(let pt=0,rt=Wt.length;pt<rt;pt++)It=Wt[pt],P.format!==Ln?vt!==null?z?bt&&e.compressedTexSubImage2D(i.TEXTURE_2D,pt,0,0,It.width,It.height,vt,It.data):e.compressedTexImage2D(i.TEXTURE_2D,pt,zt,It.width,It.height,0,It.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?bt&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,It.width,It.height,vt,kt,It.data):e.texImage2D(i.TEXTURE_2D,pt,zt,It.width,It.height,0,vt,kt,It.data)}else if(P.isDataArrayTexture)if(z){if(At&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,zt,at.width,at.height,at.depth),bt)if(P.layerUpdates.size>0){const pt=Vh(at.width,at.height,P.format,P.type);for(const rt of P.layerUpdates){const Ut=at.data.subarray(rt*pt/at.data.BYTES_PER_ELEMENT,(rt+1)*pt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,rt,at.width,at.height,1,vt,kt,Ut)}P.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,vt,kt,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,zt,at.width,at.height,at.depth,0,vt,kt,at.data);else if(P.isData3DTexture)z?(At&&e.texStorage3D(i.TEXTURE_3D,Mt,zt,at.width,at.height,at.depth),bt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,vt,kt,at.data)):e.texImage3D(i.TEXTURE_3D,0,zt,at.width,at.height,at.depth,0,vt,kt,at.data);else if(P.isFramebufferTexture){if(At)if(z)e.texStorage2D(i.TEXTURE_2D,Mt,zt,at.width,at.height);else{let pt=at.width,rt=at.height;for(let Ut=0;Ut<Mt;Ut++)e.texImage2D(i.TEXTURE_2D,Ut,zt,pt,rt,0,vt,kt,null),pt>>=1,rt>>=1}}else if(Wt.length>0){if(z&&At){const pt=ft(Wt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,zt,pt.width,pt.height)}for(let pt=0,rt=Wt.length;pt<rt;pt++)It=Wt[pt],z?bt&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,vt,kt,It):e.texImage2D(i.TEXTURE_2D,pt,zt,vt,kt,It);P.generateMipmaps=!1}else if(z){if(At){const pt=ft(at);e.texStorage2D(i.TEXTURE_2D,Mt,zt,pt.width,pt.height)}bt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt,kt,at)}else e.texImage2D(i.TEXTURE_2D,0,zt,vt,kt,at);_(P)&&g(q),mt.__version=X.version,P.onUpdate&&P.onUpdate(P)}U.__version=P.version}function j(U,P,k){if(P.image.length!==6)return;const q=_t(U,P),Q=P.source;e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+k);const X=n.get(Q);if(Q.version!==X.__version||q===!0){e.activeTexture(i.TEXTURE0+k);const mt=ee.getPrimaries(ee.workingColorSpace),St=P.colorSpace===xi?null:ee.getPrimaries(P.colorSpace),Ft=P.colorSpace===xi||mt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);const Dt=P.isCompressedTexture||P.image[0].isCompressedTexture,at=P.image[0]&&P.image[0].isDataTexture,vt=[];for(let rt=0;rt<6;rt++)!Dt&&!at?vt[rt]=S(P.image[rt],!0,r.maxCubemapSize):vt[rt]=at?P.image[rt].image:P.image[rt],vt[rt]=ot(P,vt[rt]);const kt=vt[0],zt=s.convert(P.format,P.colorSpace),It=s.convert(P.type),Wt=d(P.internalFormat,zt,It,P.colorSpace),z=P.isVideoTexture!==!0,At=X.__version===void 0||q===!0,bt=Q.dataReady;let Mt=b(P,kt);ht(i.TEXTURE_CUBE_MAP,P);let pt;if(Dt){z&&At&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Wt,kt.width,kt.height);for(let rt=0;rt<6;rt++){pt=vt[rt].mipmaps;for(let Ut=0;Ut<pt.length;Ut++){const Yt=pt[Ut];P.format!==Ln?zt!==null?z?bt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,0,0,Yt.width,Yt.height,zt,Yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,Wt,Yt.width,Yt.height,0,Yt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,0,0,Yt.width,Yt.height,zt,It,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,Wt,Yt.width,Yt.height,0,zt,It,Yt.data)}}}else{if(pt=P.mipmaps,z&&At){pt.length>0&&Mt++;const rt=ft(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,Wt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(at){z?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,vt[rt].width,vt[rt].height,zt,It,vt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Wt,vt[rt].width,vt[rt].height,0,zt,It,vt[rt].data);for(let Ut=0;Ut<pt.length;Ut++){const me=pt[Ut].image[rt].image;z?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,0,0,me.width,me.height,zt,It,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,Wt,me.width,me.height,0,zt,It,me.data)}}else{z?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,zt,It,vt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Wt,zt,It,vt[rt]);for(let Ut=0;Ut<pt.length;Ut++){const Yt=pt[Ut];z?bt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,0,0,zt,It,Yt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,Wt,zt,It,Yt.image[rt])}}}_(P)&&g(i.TEXTURE_CUBE_MAP),X.__version=Q.version,P.onUpdate&&P.onUpdate(P)}U.__version=P.version}function st(U,P,k,q,Q,X){const mt=s.convert(k.format,k.colorSpace),St=s.convert(k.type),Ft=d(k.internalFormat,mt,St,k.colorSpace),Dt=n.get(P),at=n.get(k);if(at.__renderTarget=P,!Dt.__hasExternalTextures){const vt=Math.max(1,P.width>>X),kt=Math.max(1,P.height>>X);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,X,Ft,vt,kt,P.depth,0,mt,St,null):e.texImage2D(Q,X,Ft,vt,kt,0,mt,St,null)}e.bindFramebuffer(i.FRAMEBUFFER,U),et(P)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,at.__webglTexture,0,xt(P)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,at.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(U,P,k){if(i.bindRenderbuffer(i.RENDERBUFFER,U),P.depthBuffer){const q=P.depthTexture,Q=q&&q.isDepthTexture?q.type:null,X=l(P.stencilBuffer,Q),mt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=xt(P);et(P)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,St,X,P.width,P.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,St,X,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,X,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,mt,i.RENDERBUFFER,U)}else{const q=P.textures;for(let Q=0;Q<q.length;Q++){const X=q[Q],mt=s.convert(X.format,X.colorSpace),St=s.convert(X.type),Ft=d(X.internalFormat,mt,St,X.colorSpace),Dt=xt(P);k&&et(P)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,Ft,P.width,P.height):et(P)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt,Ft,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,Ft,P.width,P.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ut(U,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,U),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(P.depthTexture);q.__renderTarget=P,(!q.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),N(P.depthTexture,0);const Q=q.__webglTexture,X=xt(P);if(P.depthTexture.format===Zs)et(P)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(P.depthTexture.format===$s)et(P)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Rt(U){const P=n.get(U),k=U.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==U.depthTexture){const q=U.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),q){const Q=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),P.__depthDisposeCallback=Q}P.__boundDepthTexture=q}if(U.depthTexture&&!P.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const q=U.texture.mipmaps;q&&q.length>0?ut(P.__webglFramebuffer[0],U):ut(P.__webglFramebuffer,U)}else if(k){P.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer[q]),P.__webglDepthbuffer[q]===void 0)P.__webglDepthbuffer[q]=i.createRenderbuffer(),lt(P.__webglDepthbuffer[q],U,!1);else{const Q=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=P.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,X)}}else{const q=U.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=i.createRenderbuffer(),lt(P.__webglDepthbuffer,U,!1);else{const Q=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=P.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function qt(U,P,k){const q=n.get(U);P!==void 0&&st(q.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Rt(U)}function Et(U){const P=U.texture,k=n.get(U),q=n.get(P);U.addEventListener("dispose",R);const Q=U.textures,X=U.isWebGLCubeRenderTarget===!0,mt=Q.length>1;if(mt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=P.version,o.memory.textures++),X){k.__webglFramebuffer=[];for(let St=0;St<6;St++)if(P.mipmaps&&P.mipmaps.length>0){k.__webglFramebuffer[St]=[];for(let Ft=0;Ft<P.mipmaps.length;Ft++)k.__webglFramebuffer[St][Ft]=i.createFramebuffer()}else k.__webglFramebuffer[St]=i.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){k.__webglFramebuffer=[];for(let St=0;St<P.mipmaps.length;St++)k.__webglFramebuffer[St]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(mt)for(let St=0,Ft=Q.length;St<Ft;St++){const Dt=n.get(Q[St]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=i.createTexture(),o.memory.textures++)}if(U.samples>0&&et(U)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let St=0;St<Q.length;St++){const Ft=Q[St];k.__webglColorRenderbuffer[St]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[St]);const Dt=s.convert(Ft.format,Ft.colorSpace),at=s.convert(Ft.type),vt=d(Ft.internalFormat,Dt,at,Ft.colorSpace,U.isXRRenderTarget===!0),kt=xt(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,vt,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,k.__webglColorRenderbuffer[St])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(k.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),ht(i.TEXTURE_CUBE_MAP,P);for(let St=0;St<6;St++)if(P.mipmaps&&P.mipmaps.length>0)for(let Ft=0;Ft<P.mipmaps.length;Ft++)st(k.__webglFramebuffer[St][Ft],U,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+St,Ft);else st(k.__webglFramebuffer[St],U,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+St,0);_(P)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let St=0,Ft=Q.length;St<Ft;St++){const Dt=Q[St],at=n.get(Dt);let vt=i.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(vt=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,at.__webglTexture),ht(vt,Dt),st(k.__webglFramebuffer,U,Dt,i.COLOR_ATTACHMENT0+St,vt,0),_(Dt)&&g(vt)}e.unbindTexture()}else{let St=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(St=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(St,q.__webglTexture),ht(St,P),P.mipmaps&&P.mipmaps.length>0)for(let Ft=0;Ft<P.mipmaps.length;Ft++)st(k.__webglFramebuffer[Ft],U,P,i.COLOR_ATTACHMENT0,St,Ft);else st(k.__webglFramebuffer,U,P,i.COLOR_ATTACHMENT0,St,0);_(P)&&g(St),e.unbindTexture()}U.depthBuffer&&Rt(U)}function J(U){const P=U.textures;for(let k=0,q=P.length;k<q;k++){const Q=P[k];if(_(Q)){const X=E(U),mt=n.get(Q).__webglTexture;e.bindTexture(X,mt),g(X),e.unbindTexture()}}}const D=[],K=[];function tt(U){if(U.samples>0){if(et(U)===!1){const P=U.textures,k=U.width,q=U.height;let Q=i.COLOR_BUFFER_BIT;const X=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=n.get(U),St=P.length>1;if(St)for(let Dt=0;Dt<P.length;Dt++)e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer);const Ft=U.texture.mipmaps;Ft&&Ft.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let Dt=0;Dt<P.length;Dt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),St){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,mt.__webglColorRenderbuffer[Dt]);const at=n.get(P[Dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,at,0)}i.blitFramebuffer(0,0,k,q,0,0,k,q,Q,i.NEAREST),c===!0&&(D.length=0,K.length=0,D.push(i.COLOR_ATTACHMENT0+Dt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(D.push(X),K.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,K)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,D))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),St)for(let Dt=0;Dt<P.length;Dt++){e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,mt.__webglColorRenderbuffer[Dt]);const at=n.get(P[Dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,at,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&c){const P=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[P])}}}function xt(U){return Math.min(r.maxSamples,U.samples)}function et(U){const P=n.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function dt(U){const P=o.render.frame;f.get(U)!==P&&(f.set(U,P),U.update())}function ot(U,P){const k=U.colorSpace,q=U.format,Q=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||k!==ss&&k!==xi&&(ee.getTransfer(k)===ue?(q!==Ln||Q!==ni)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ne("WebGLTextures: Unsupported texture color space:",k)),P}function ft(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(h.width=U.naturalWidth||U.width,h.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(h.width=U.displayWidth,h.height=U.displayHeight):(h.width=U.width,h.height=U.height),h}this.allocateTextureUnit=C,this.resetTextureUnits=A,this.setTexture2D=N,this.setTexture2DArray=O,this.setTexture3D=B,this.setTextureCube=V,this.rebindTextures=qt,this.setupRenderTarget=Et,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=et}function xb(i,t){function e(n,r=xi){let s;const o=ee.getTransfer(r);if(n===ni)return i.UNSIGNED_BYTE;if(n===lu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===uu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dd)return i.BYTE;if(n===Ud)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===cu)return i.INT;if(n===ar)return i.UNSIGNED_INT;if(n===mi)return i.FLOAT;if(n===us)return i.HALF_FLOAT;if(n===Od)return i.ALPHA;if(n===Bd)return i.RGB;if(n===Ln)return i.RGBA;if(n===Zs)return i.DEPTH_COMPONENT;if(n===$s)return i.DEPTH_STENCIL;if(n===zd)return i.RED;if(n===hu)return i.RED_INTEGER;if(n===fu)return i.RG;if(n===du)return i.RG_INTEGER;if(n===pu)return i.RGBA_INTEGER;if(n===oa||n===aa||n===ca||n===la)if(o===ue)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===oa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===oa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===aa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ca)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ml||n===gl||n===_l||n===vl)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ml)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_l)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yl||n===bl||n===Ml)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===yl||n===bl)return o===ue?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ml)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sl||n===El||n===Tl||n===wl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll||n===Dl||n===Ul||n===Nl||n===Fl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Sl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Al)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ul)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ol||n===Bl||n===zl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ol)return o===ue?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vl||n===kl||n===Hl||n===Gl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Vl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===kl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const mb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _b{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Qd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vi({vertexShader:mb,fragmentShader:gb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ct(new hs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vb extends hr{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,h=null,f=null,p=null,x=null,m=null,v=null;const S=typeof XRWebGLBinding<"u",_=new _b,g={},E=e.getContextAttributes();let d=null,l=null;const b=[],u=[],R=new ct;let w=null;const M=new Pn;M.viewport=new pe;const y=new Pn;y.viewport=new pe;const T=[M,y],A=new wm;let C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let j=b[Y];return j===void 0&&(j=new hc,b[Y]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Y){let j=b[Y];return j===void 0&&(j=new hc,b[Y]=j),j.getGripSpace()},this.getHand=function(Y){let j=b[Y];return j===void 0&&(j=new hc,b[Y]=j),j.getHandSpace()};function N(Y){const j=u.indexOf(Y.inputSource);if(j===-1)return;const st=b[j];st!==void 0&&(st.update(Y.inputSource,Y.frame,h||o),st.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",B);for(let Y=0;Y<b.length;Y++){const j=u[Y];j!==null&&(u[Y]=null,b[Y].disconnect(j))}C=null,F=null,_.reset();for(const Y in g)delete g[Y];t.setRenderTarget(d),m=null,x=null,p=null,r=null,l=null,Tt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return x!==null?x:m},this.getBinding=function(){return p===null&&S&&(p=new XRWebGLBinding(r,e)),p},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",O),r.addEventListener("inputsourceschange",B),E.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,lt=null,ut=null;E.depth&&(ut=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=E.stencil?$s:Zs,lt=E.stencil?js:ar);const Rt={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:s};p=this.getBinding(),x=p.createProjectionLayer(Rt),r.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),l=new cr(x.textureWidth,x.textureHeight,{format:Ln,type:ni,depthTexture:new Jd(x.textureWidth,x.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const st={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,st),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),l=new cr(m.framebufferWidth,m.framebufferHeight,{format:Ln,type:ni,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}l.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await r.requestReferenceSpace(a),Tt.setContext(r),Tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(Y){for(let j=0;j<Y.removed.length;j++){const st=Y.removed[j],lt=u.indexOf(st);lt>=0&&(u[lt]=null,b[lt].disconnect(st))}for(let j=0;j<Y.added.length;j++){const st=Y.added[j];let lt=u.indexOf(st);if(lt===-1){for(let Rt=0;Rt<b.length;Rt++)if(Rt>=u.length){u.push(st),lt=Rt;break}else if(u[Rt]===null){u[Rt]=st,lt=Rt;break}if(lt===-1)break}const ut=b[lt];ut&&ut.connect(st)}}const V=new I,W=new I;function nt(Y,j,st){V.setFromMatrixPosition(j.matrixWorld),W.setFromMatrixPosition(st.matrixWorld);const lt=V.distanceTo(W),ut=j.projectionMatrix.elements,Rt=st.projectionMatrix.elements,qt=ut[14]/(ut[10]-1),Et=ut[14]/(ut[10]+1),J=(ut[9]+1)/ut[5],D=(ut[9]-1)/ut[5],K=(ut[8]-1)/ut[0],tt=(Rt[8]+1)/Rt[0],xt=qt*K,et=qt*tt,dt=lt/(-K+tt),ot=dt*-K;if(j.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ot),Y.translateZ(dt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ut[10]===-1)Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const ft=qt+dt,U=Et+dt,P=xt-ot,k=et+(lt-ot),q=J*Et/U*ft,Q=D*Et/U*ft;Y.projectionMatrix.makePerspective(P,k,q,Q,ft,U),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,j){j===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(j.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let j=Y.near,st=Y.far;_.texture!==null&&(_.depthNear>0&&(j=_.depthNear),_.depthFar>0&&(st=_.depthFar)),A.near=y.near=M.near=j,A.far=y.far=M.far=st,(C!==A.near||F!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),C=A.near,F=A.far),A.layers.mask=Y.layers.mask|6,M.layers.mask=A.layers.mask&3,y.layers.mask=A.layers.mask&5;const lt=Y.parent,ut=A.cameras;it(A,lt);for(let Rt=0;Rt<ut.length;Rt++)it(ut[Rt],lt);ut.length===2?nt(A,M,y):A.projectionMatrix.copy(M.projectionMatrix),ht(Y,A,lt)};function ht(Y,j,st){st===null?Y.matrix.copy(j.matrixWorld):(Y.matrix.copy(st.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(j.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Js*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(x===null&&m===null))return c},this.setFoveation=function(Y){c=Y,x!==null&&(x.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(Y){return g[Y]};let _t=null;function yt(Y,j){if(f=j.getViewerPose(h||o),v=j,f!==null){const st=f.views;m!==null&&(t.setRenderTargetFramebuffer(l,m.framebuffer),t.setRenderTarget(l));let lt=!1;st.length!==A.cameras.length&&(A.cameras.length=0,lt=!0);for(let Et=0;Et<st.length;Et++){const J=st[Et];let D=null;if(m!==null)D=m.getViewport(J);else{const tt=p.getViewSubImage(x,J);D=tt.viewport,Et===0&&(t.setRenderTargetTextures(l,tt.colorTexture,tt.depthStencilTexture),t.setRenderTarget(l))}let K=T[Et];K===void 0&&(K=new Pn,K.layers.enable(Et),K.viewport=new pe,T[Et]=K),K.matrix.fromArray(J.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(J.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(D.x,D.y,D.width,D.height),Et===0&&(A.matrix.copy(K.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),lt===!0&&A.cameras.push(K)}const ut=r.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){p=n.getBinding();const Et=p.getDepthInformation(st[0]);Et&&Et.isValid&&Et.texture&&_.init(Et,r.renderState)}if(ut&&ut.includes("camera-access")&&S){t.state.unbindTexture(),p=n.getBinding();for(let Et=0;Et<st.length;Et++){const J=st[Et].camera;if(J){let D=g[J];D||(D=new Qd,g[J]=D);const K=p.getCameraImage(J);D.sourceTexture=K}}}}for(let st=0;st<b.length;st++){const lt=u[st],ut=b[st];lt!==null&&ut!==void 0&&ut.update(lt,j,h||o)}_t&&_t(Y,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),v=null}const Tt=new pp;Tt.setAnimationLoop(yt),this.setAnimationLoop=function(Y){_t=Y},this.dispose=function(){}}}const qi=new Wn,yb=new $t;function bb(i,t){function e(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function n(_,g){g.color.getRGB(_.fogColor.value,jd(i)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function r(_,g,E,d,l){g.isMeshBasicMaterial||g.isMeshLambertMaterial?s(_,g):g.isMeshToonMaterial?(s(_,g),p(_,g)):g.isMeshPhongMaterial?(s(_,g),f(_,g)):g.isMeshStandardMaterial?(s(_,g),x(_,g),g.isMeshPhysicalMaterial&&m(_,g,l)):g.isMeshMatcapMaterial?(s(_,g),v(_,g)):g.isMeshDepthMaterial?s(_,g):g.isMeshDistanceMaterial?(s(_,g),S(_,g)):g.isMeshNormalMaterial?s(_,g):g.isLineBasicMaterial?(o(_,g),g.isLineDashedMaterial&&a(_,g)):g.isPointsMaterial?c(_,g,E,d):g.isSpriteMaterial?h(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,e(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,e(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===nn&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,e(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===nn&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,e(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,e(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const E=t.get(g),d=E.envMap,l=E.envMapRotation;d&&(_.envMap.value=d,qi.copy(l),qi.x*=-1,qi.y*=-1,qi.z*=-1,d.isCubeTexture&&d.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),_.envMapRotation.value.setFromMatrix4(yb.makeRotationFromEuler(qi)),_.flipEnvMap.value=d.isCubeTexture&&d.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap&&(_.lightMap.value=g.lightMap,_.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,_.lightMapTransform)),g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,_.aoMapTransform))}function o(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,e(g.map,_.mapTransform))}function a(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function c(_,g,E,d){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*E,_.scale.value=d*.5,g.map&&(_.map.value=g.map,e(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function h(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,e(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function f(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function p(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function x(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function m(_,g,E){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===nn&&_.clearcoatNormalScale.value.negate())),g.dispersion>0&&(_.dispersion.value=g.dispersion),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=E.texture,_.transmissionSamplerSize.value.set(E.width,E.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,_.specularIntensityMapTransform))}function v(_,g){g.matcap&&(_.matcap.value=g.matcap)}function S(_,g){const E=t.get(g).light;_.referencePosition.value.setFromMatrixPosition(E.matrixWorld),_.nearDistance.value=E.shadow.camera.near,_.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Mb(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,d){const l=d.program;n.uniformBlockBinding(E,l)}function h(E,d){let l=r[E.id];l===void 0&&(v(E),l=f(E),r[E.id]=l,E.addEventListener("dispose",_));const b=d.program;n.updateUBOMapping(E,b);const u=t.render.frame;s[E.id]!==u&&(x(E),s[E.id]=u)}function f(E){const d=p();E.__bindingPointIndex=d;const l=i.createBuffer(),b=E.__size,u=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,l),i.bufferData(i.UNIFORM_BUFFER,b,u),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,d,l),l}function p(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(E){const d=r[E.id],l=E.uniforms,b=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,d);for(let u=0,R=l.length;u<R;u++){const w=Array.isArray(l[u])?l[u]:[l[u]];for(let M=0,y=w.length;M<y;M++){const T=w[M];if(m(T,u,M,b)===!0){const A=T.__offset,C=Array.isArray(T.value)?T.value:[T.value];let F=0;for(let N=0;N<C.length;N++){const O=C[N],B=S(O);typeof O=="number"||typeof O=="boolean"?(T.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,A+F,T.__data)):O.isMatrix3?(T.__data[0]=O.elements[0],T.__data[1]=O.elements[1],T.__data[2]=O.elements[2],T.__data[3]=0,T.__data[4]=O.elements[3],T.__data[5]=O.elements[4],T.__data[6]=O.elements[5],T.__data[7]=0,T.__data[8]=O.elements[6],T.__data[9]=O.elements[7],T.__data[10]=O.elements[8],T.__data[11]=0):(O.toArray(T.__data,F),F+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,A,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,d,l,b){const u=E.value,R=d+"_"+l;if(b[R]===void 0)return typeof u=="number"||typeof u=="boolean"?b[R]=u:b[R]=u.clone(),!0;{const w=b[R];if(typeof u=="number"||typeof u=="boolean"){if(w!==u)return b[R]=u,!0}else if(w.equals(u)===!1)return w.copy(u),!0}return!1}function v(E){const d=E.uniforms;let l=0;const b=16;for(let R=0,w=d.length;R<w;R++){const M=Array.isArray(d[R])?d[R]:[d[R]];for(let y=0,T=M.length;y<T;y++){const A=M[y],C=Array.isArray(A.value)?A.value:[A.value];for(let F=0,N=C.length;F<N;F++){const O=C[F],B=S(O),V=l%b,W=V%B.boundary,nt=V+W;l+=W,nt!==0&&b-nt<B.storage&&(l+=b-nt),A.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),A.__offset=l,l+=B.storage}}}const u=l%b;return u>0&&(l+=b-u),E.__size=l,E.__cache={},this}function S(E){const d={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(d.boundary=4,d.storage=4):E.isVector2?(d.boundary=8,d.storage=8):E.isVector3||E.isColor?(d.boundary=16,d.storage=12):E.isVector4?(d.boundary=16,d.storage=16):E.isMatrix3?(d.boundary=48,d.storage=48):E.isMatrix4?(d.boundary=64,d.storage=64):E.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ht("WebGLRenderer: Unsupported uniform value type.",E),d}function _(E){const d=E.target;d.removeEventListener("dispose",_);const l=o.indexOf(d.__bindingPointIndex);o.splice(l,1),i.deleteBuffer(r[d.id]),delete r[d.id],delete s[d.id]}function g(){for(const E in r)i.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:c,update:h,dispose:g}}const Sb=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let li=null;function Eb(){return li===null&&(li=new Ox(Sb,32,32,fu,us),li.minFilter=Mn,li.magFilter=Mn,li.wrapS=Jn,li.wrapT=Jn,li.generateMipmaps=!1,li.needsUpdate=!0),li}class Tb{constructor(t={}){const{canvas:e=$0(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const v=new Set([pu,du,hu]),S=new Set([ni,ar,Ys,js,lu,uu]),_=new Uint32Array(4),g=new Int32Array(4);let E=null,d=null;const l=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const u=this;let R=!1;this._outputColorSpace=hn;let w=0,M=0,y=null,T=-1,A=null;const C=new pe,F=new pe;let N=null;const O=new Jt(0);let B=0,V=e.width,W=e.height,nt=1,it=null,ht=null;const _t=new pe(0,0,V,W),yt=new pe(0,0,V,W);let Tt=!1;const Y=new gu;let j=!1,st=!1;const lt=new $t,ut=new I,Rt=new pe,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Et=!1;function J(){return y===null?nt:1}let D=n;function K(L,H){return e.getContext(L,H)}try{const L={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ls}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",rt,!1),e.addEventListener("webglcontextcreationerror",Ut,!1),D===null){const H="webgl2";if(D=K(H,L),D===null)throw K(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw L("WebGLRenderer: "+L.message),L}let tt,xt,et,dt,ot,ft,U,P,k,q,Q,X,mt,St,Ft,Dt,at,vt,kt,zt,It,Wt,z,At;function bt(){tt=new Dv(D),tt.init(),Wt=new xb(D,tt),xt=new Ev(D,tt,t,Wt),et=new db(D,tt),xt.reversedDepthBuffer&&x&&et.buffers.depth.setReversed(!0),dt=new Fv(D),ot=new tb,ft=new pb(D,tt,et,ot,xt,Wt,dt),U=new wv(u),P=new Lv(u),k=new Vm(D),z=new Mv(D,k),q=new Uv(D,k,dt,z),Q=new Bv(D,q,k,dt),kt=new Ov(D,xt,ft),Dt=new Tv(ot),X=new Qy(u,U,P,tt,xt,z,Dt),mt=new bb(u,ot),St=new nb,Ft=new cb(tt),vt=new bv(u,U,P,et,Q,m,c),at=new hb(u,Q,xt),At=new Mb(D,dt,xt,et),zt=new Sv(D,tt,dt),It=new Nv(D,tt,dt),dt.programs=X.programs,u.capabilities=xt,u.extensions=tt,u.properties=ot,u.renderLists=St,u.shadowMap=at,u.state=et,u.info=dt}bt();const Mt=new vb(u,D);this.xr=Mt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const L=tt.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=tt.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(L){L!==void 0&&(nt=L,this.setSize(V,W,!1))},this.getSize=function(L){return L.set(V,W)},this.setSize=function(L,H,Z=!0){if(Mt.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}V=L,W=H,e.width=Math.floor(L*nt),e.height=Math.floor(H*nt),Z===!0&&(e.style.width=L+"px",e.style.height=H+"px"),this.setViewport(0,0,L,H)},this.getDrawingBufferSize=function(L){return L.set(V*nt,W*nt).floor()},this.setDrawingBufferSize=function(L,H,Z){V=L,W=H,nt=Z,e.width=Math.floor(L*Z),e.height=Math.floor(H*Z),this.setViewport(0,0,L,H)},this.getCurrentViewport=function(L){return L.copy(C)},this.getViewport=function(L){return L.copy(_t)},this.setViewport=function(L,H,Z,$){L.isVector4?_t.set(L.x,L.y,L.z,L.w):_t.set(L,H,Z,$),et.viewport(C.copy(_t).multiplyScalar(nt).round())},this.getScissor=function(L){return L.copy(yt)},this.setScissor=function(L,H,Z,$){L.isVector4?yt.set(L.x,L.y,L.z,L.w):yt.set(L,H,Z,$),et.scissor(F.copy(yt).multiplyScalar(nt).round())},this.getScissorTest=function(){return Tt},this.setScissorTest=function(L){et.setScissorTest(Tt=L)},this.setOpaqueSort=function(L){it=L},this.setTransparentSort=function(L){ht=L},this.getClearColor=function(L){return L.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor(...arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha(...arguments)},this.clear=function(L=!0,H=!0,Z=!0){let $=0;if(L){let G=!1;if(y!==null){const gt=y.texture.format;G=v.has(gt)}if(G){const gt=y.texture.type,Pt=S.has(gt),Nt=vt.getClearColor(),Lt=vt.getClearAlpha(),Vt=Nt.r,Gt=Nt.g,Ot=Nt.b;Pt?(_[0]=Vt,_[1]=Gt,_[2]=Ot,_[3]=Lt,D.clearBufferuiv(D.COLOR,0,_)):(g[0]=Vt,g[1]=Gt,g[2]=Ot,g[3]=Lt,D.clearBufferiv(D.COLOR,0,g))}else $|=D.COLOR_BUFFER_BIT}H&&($|=D.DEPTH_BUFFER_BIT),Z&&($|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",rt,!1),e.removeEventListener("webglcontextcreationerror",Ut,!1),vt.dispose(),St.dispose(),Ft.dispose(),ot.dispose(),U.dispose(),P.dispose(),Q.dispose(),z.dispose(),At.dispose(),X.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",qu),Mt.removeEventListener("sessionend",Yu),zi.stop()};function pt(L){L.preventDefault(),ah("WebGLRenderer: Context Lost."),R=!0}function rt(){ah("WebGLRenderer: Context Restored."),R=!1;const L=dt.autoReset,H=at.enabled,Z=at.autoUpdate,$=at.needsUpdate,G=at.type;bt(),dt.autoReset=L,at.enabled=H,at.autoUpdate=Z,at.needsUpdate=$,at.type=G}function Ut(L){ne("WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Yt(L){const H=L.target;H.removeEventListener("dispose",Yt),me(H)}function me(L){ce(L),ot.remove(L)}function ce(L){const H=ot.get(L).programs;H!==void 0&&(H.forEach(function(Z){X.releaseProgram(Z)}),L.isShaderMaterial&&X.releaseShaderCache(L))}this.renderBufferDirect=function(L,H,Z,$,G,gt){H===null&&(H=qt);const Pt=G.isMesh&&G.matrixWorld.determinant()<0,Nt=i0(L,H,Z,$,G);et.setMaterial($,Pt);let Lt=Z.index,Vt=1;if($.wireframe===!0){if(Lt=q.getWireframeAttribute(Z),Lt===void 0)return;Vt=2}const Gt=Z.drawRange,Ot=Z.attributes.position;let te=Gt.start*Vt,le=(Gt.start+Gt.count)*Vt;gt!==null&&(te=Math.max(te,gt.start*Vt),le=Math.min(le,(gt.start+gt.count)*Vt)),Lt!==null?(te=Math.max(te,0),le=Math.min(le,Lt.count)):Ot!=null&&(te=Math.max(te,0),le=Math.min(le,Ot.count));const Se=le-te;if(Se<0||Se===1/0)return;z.setup(G,$,Nt,Z,Lt);let Ee,fe=zt;if(Lt!==null&&(Ee=k.get(Lt),fe=It,fe.setIndex(Ee)),G.isMesh)$.wireframe===!0?(et.setLineWidth($.wireframeLinewidth*J()),fe.setMode(D.LINES)):fe.setMode(D.TRIANGLES);else if(G.isLine){let Bt=$.linewidth;Bt===void 0&&(Bt=1),et.setLineWidth(Bt*J()),G.isLineSegments?fe.setMode(D.LINES):G.isLineLoop?fe.setMode(D.LINE_LOOP):fe.setMode(D.LINE_STRIP)}else G.isPoints?fe.setMode(D.POINTS):G.isSprite&&fe.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ks("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))fe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Bt=G._multiDrawStarts,ve=G._multiDrawCounts,re=G._multiDrawCount,xn=Lt?k.get(Lt).bytesPerElement:1,xr=ot.get($).currentProgram.getUniforms();for(let mn=0;mn<re;mn++)xr.setValue(D,"_gl_DrawID",mn),fe.render(Bt[mn]/xn,ve[mn])}else if(G.isInstancedMesh)fe.renderInstances(te,Se,G.count);else if(Z.isInstancedBufferGeometry){const Bt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,ve=Math.min(Z.instanceCount,Bt);fe.renderInstances(te,Se,ve)}else fe.render(te,Se)};function qn(L,H,Z){L.transparent===!0&&L.side===yn&&L.forceSinglePass===!1?(L.side=nn,L.needsUpdate=!0,oo(L,H,Z),L.side=ei,L.needsUpdate=!0,oo(L,H,Z),L.side=yn):oo(L,H,Z)}this.compile=function(L,H,Z=null){Z===null&&(Z=L),d=Ft.get(Z),d.init(H),b.push(d),Z.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),L!==Z&&L.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const $=new Set;return L.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const gt=G.material;if(gt)if(Array.isArray(gt))for(let Pt=0;Pt<gt.length;Pt++){const Nt=gt[Pt];qn(Nt,Z,G),$.add(Nt)}else qn(gt,Z,G),$.add(gt)}),d=b.pop(),$},this.compileAsync=function(L,H,Z=null){const $=this.compile(L,H,Z);return new Promise(G=>{function gt(){if($.forEach(function(Pt){ot.get(Pt).currentProgram.isReady()&&$.delete(Pt)}),$.size===0){G(L);return}setTimeout(gt,10)}tt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Fn=null;function n0(L){Fn&&Fn(L)}function qu(){zi.stop()}function Yu(){zi.start()}const zi=new pp;zi.setAnimationLoop(n0),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(L){Fn=L,Mt.setAnimationLoop(L),L===null?zi.stop():zi.start()},Mt.addEventListener("sessionstart",qu),Mt.addEventListener("sessionend",Yu),this.render=function(L,H){if(H!==void 0&&H.isCamera!==!0){ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(H),H=Mt.getCamera()),L.isScene===!0&&L.onBeforeRender(u,L,H,y),d=Ft.get(L,b.length),d.init(H),b.push(d),lt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Y.setFromProjectionMatrix(lt,Qn,H.reversedDepth),st=this.localClippingEnabled,j=Dt.init(this.clippingPlanes,st),E=St.get(L,l.length),E.init(),l.push(E),Mt.enabled===!0&&Mt.isPresenting===!0){const gt=u.xr.getDepthSensingMesh();gt!==null&&Ga(gt,H,-1/0,u.sortObjects)}Ga(L,H,0,u.sortObjects),E.finish(),u.sortObjects===!0&&E.sort(it,ht),Et=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,Et&&vt.addToRenderList(E,L),this.info.render.frame++,j===!0&&Dt.beginShadows();const Z=d.state.shadowsArray;at.render(Z,L,H),j===!0&&Dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=E.opaque,G=E.transmissive;if(d.setupLights(),H.isArrayCamera){const gt=H.cameras;if(G.length>0)for(let Pt=0,Nt=gt.length;Pt<Nt;Pt++){const Lt=gt[Pt];Zu($,G,L,Lt)}Et&&vt.render(L);for(let Pt=0,Nt=gt.length;Pt<Nt;Pt++){const Lt=gt[Pt];ju(E,L,Lt,Lt.viewport)}}else G.length>0&&Zu($,G,L,H),Et&&vt.render(L),ju(E,L,H);y!==null&&M===0&&(ft.updateMultisampleRenderTarget(y),ft.updateRenderTargetMipmap(y)),L.isScene===!0&&L.onAfterRender(u,L,H),z.resetDefaultState(),T=-1,A=null,b.pop(),b.length>0?(d=b[b.length-1],j===!0&&Dt.setGlobalState(u.clippingPlanes,d.state.camera)):d=null,l.pop(),l.length>0?E=l[l.length-1]:E=null};function Ga(L,H,Z,$){if(L.visible===!1)return;if(L.layers.test(H.layers)){if(L.isGroup)Z=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(H);else if(L.isLight)d.pushLight(L),L.castShadow&&d.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||Y.intersectsSprite(L)){$&&Rt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(lt);const Pt=Q.update(L),Nt=L.material;Nt.visible&&E.push(L,Pt,Nt,Z,Rt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||Y.intersectsObject(L))){const Pt=Q.update(L),Nt=L.material;if($&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Rt.copy(L.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),Rt.copy(Pt.boundingSphere.center)),Rt.applyMatrix4(L.matrixWorld).applyMatrix4(lt)),Array.isArray(Nt)){const Lt=Pt.groups;for(let Vt=0,Gt=Lt.length;Vt<Gt;Vt++){const Ot=Lt[Vt],te=Nt[Ot.materialIndex];te&&te.visible&&E.push(L,Pt,te,Z,Rt.z,Ot)}}else Nt.visible&&E.push(L,Pt,Nt,Z,Rt.z,null)}}const gt=L.children;for(let Pt=0,Nt=gt.length;Pt<Nt;Pt++)Ga(gt[Pt],H,Z,$)}function ju(L,H,Z,$){const{opaque:G,transmissive:gt,transparent:Pt}=L;d.setupLightsView(Z),j===!0&&Dt.setGlobalState(u.clippingPlanes,Z),$&&et.viewport(C.copy($)),G.length>0&&so(G,H,Z),gt.length>0&&so(gt,H,Z),Pt.length>0&&so(Pt,H,Z),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function Zu(L,H,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[$.id]===void 0&&(d.state.transmissionRenderTarget[$.id]=new cr(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?us:ni,minFilter:Ui,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const gt=d.state.transmissionRenderTarget[$.id],Pt=$.viewport||C;gt.setSize(Pt.z*u.transmissionResolutionScale,Pt.w*u.transmissionResolutionScale);const Nt=u.getRenderTarget(),Lt=u.getActiveCubeFace(),Vt=u.getActiveMipmapLevel();u.setRenderTarget(gt),u.getClearColor(O),B=u.getClearAlpha(),B<1&&u.setClearColor(16777215,.5),u.clear(),Et&&vt.render(Z);const Gt=u.toneMapping;u.toneMapping=Oi;const Ot=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),d.setupLightsView($),j===!0&&Dt.setGlobalState(u.clippingPlanes,$),so(L,Z,$),ft.updateMultisampleRenderTarget(gt),ft.updateRenderTargetMipmap(gt),tt.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let le=0,Se=H.length;le<Se;le++){const Ee=H[le],{object:fe,geometry:Bt,material:ve,group:re}=Ee;if(ve.side===yn&&fe.layers.test($.layers)){const xn=ve.side;ve.side=nn,ve.needsUpdate=!0,$u(fe,Z,$,Bt,ve,re),ve.side=xn,ve.needsUpdate=!0,te=!0}}te===!0&&(ft.updateMultisampleRenderTarget(gt),ft.updateRenderTargetMipmap(gt))}u.setRenderTarget(Nt,Lt,Vt),u.setClearColor(O,B),Ot!==void 0&&($.viewport=Ot),u.toneMapping=Gt}function so(L,H,Z){const $=H.isScene===!0?H.overrideMaterial:null;for(let G=0,gt=L.length;G<gt;G++){const Pt=L[G],{object:Nt,geometry:Lt,group:Vt}=Pt;let Gt=Pt.material;Gt.allowOverride===!0&&$!==null&&(Gt=$),Nt.layers.test(Z.layers)&&$u(Nt,H,Z,Lt,Gt,Vt)}}function $u(L,H,Z,$,G,gt){L.onBeforeRender(u,H,Z,$,G,gt),L.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),G.onBeforeRender(u,H,Z,$,L,gt),G.transparent===!0&&G.side===yn&&G.forceSinglePass===!1?(G.side=nn,G.needsUpdate=!0,u.renderBufferDirect(Z,H,$,G,L,gt),G.side=ei,G.needsUpdate=!0,u.renderBufferDirect(Z,H,$,G,L,gt),G.side=yn):u.renderBufferDirect(Z,H,$,G,L,gt),L.onAfterRender(u,H,Z,$,G,gt)}function oo(L,H,Z){H.isScene!==!0&&(H=qt);const $=ot.get(L),G=d.state.lights,gt=d.state.shadowsArray,Pt=G.state.version,Nt=X.getParameters(L,G.state,gt,H,Z),Lt=X.getProgramCacheKey(Nt);let Vt=$.programs;$.environment=L.isMeshStandardMaterial?H.environment:null,$.fog=H.fog,$.envMap=(L.isMeshStandardMaterial?P:U).get(L.envMap||$.environment),$.envMapRotation=$.environment!==null&&L.envMap===null?H.environmentRotation:L.envMapRotation,Vt===void 0&&(L.addEventListener("dispose",Yt),Vt=new Map,$.programs=Vt);let Gt=Vt.get(Lt);if(Gt!==void 0){if($.currentProgram===Gt&&$.lightsStateVersion===Pt)return Ju(L,Nt),Gt}else Nt.uniforms=X.getUniforms(L),L.onBeforeCompile(Nt,u),Gt=X.acquireProgram(Nt,Lt),Vt.set(Lt,Gt),$.uniforms=Nt.uniforms;const Ot=$.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Ot.clippingPlanes=Dt.uniform),Ju(L,Nt),$.needsLights=s0(L),$.lightsStateVersion=Pt,$.needsLights&&(Ot.ambientLightColor.value=G.state.ambient,Ot.lightProbe.value=G.state.probe,Ot.directionalLights.value=G.state.directional,Ot.directionalLightShadows.value=G.state.directionalShadow,Ot.spotLights.value=G.state.spot,Ot.spotLightShadows.value=G.state.spotShadow,Ot.rectAreaLights.value=G.state.rectArea,Ot.ltc_1.value=G.state.rectAreaLTC1,Ot.ltc_2.value=G.state.rectAreaLTC2,Ot.pointLights.value=G.state.point,Ot.pointLightShadows.value=G.state.pointShadow,Ot.hemisphereLights.value=G.state.hemi,Ot.directionalShadowMap.value=G.state.directionalShadowMap,Ot.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ot.spotShadowMap.value=G.state.spotShadowMap,Ot.spotLightMatrix.value=G.state.spotLightMatrix,Ot.spotLightMap.value=G.state.spotLightMap,Ot.pointShadowMap.value=G.state.pointShadowMap,Ot.pointShadowMatrix.value=G.state.pointShadowMatrix),$.currentProgram=Gt,$.uniformsList=null,Gt}function Ku(L){if(L.uniformsList===null){const H=L.currentProgram.getUniforms();L.uniformsList=ua.seqWithValue(H.seq,L.uniforms)}return L.uniformsList}function Ju(L,H){const Z=ot.get(L);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function i0(L,H,Z,$,G){H.isScene!==!0&&(H=qt),ft.resetTextureUnits();const gt=H.fog,Pt=$.isMeshStandardMaterial?H.environment:null,Nt=y===null?u.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:ss,Lt=($.isMeshStandardMaterial?P:U).get($.envMap||Pt),Vt=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Gt=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ot=!!Z.morphAttributes.position,te=!!Z.morphAttributes.normal,le=!!Z.morphAttributes.color;let Se=Oi;$.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(Se=u.toneMapping);const Ee=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,fe=Ee!==void 0?Ee.length:0,Bt=ot.get($),ve=d.state.lights;if(j===!0&&(st===!0||L!==A)){const Qe=L===A&&$.id===T;Dt.setState($,L,Qe)}let re=!1;$.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==ve.state.version||Bt.outputColorSpace!==Nt||G.isBatchedMesh&&Bt.batching===!1||!G.isBatchedMesh&&Bt.batching===!0||G.isBatchedMesh&&Bt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Bt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Bt.instancing===!1||!G.isInstancedMesh&&Bt.instancing===!0||G.isSkinnedMesh&&Bt.skinning===!1||!G.isSkinnedMesh&&Bt.skinning===!0||G.isInstancedMesh&&Bt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Bt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Bt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Bt.instancingMorph===!1&&G.morphTexture!==null||Bt.envMap!==Lt||$.fog===!0&&Bt.fog!==gt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==Dt.numPlanes||Bt.numIntersection!==Dt.numIntersection)||Bt.vertexAlphas!==Vt||Bt.vertexTangents!==Gt||Bt.morphTargets!==Ot||Bt.morphNormals!==te||Bt.morphColors!==le||Bt.toneMapping!==Se||Bt.morphTargetsCount!==fe)&&(re=!0):(re=!0,Bt.__version=$.version);let xn=Bt.currentProgram;re===!0&&(xn=oo($,H,G));let xr=!1,mn=!1,xs=!1;const ye=xn.getUniforms(),on=Bt.uniforms;if(et.useProgram(xn.program)&&(xr=!0,mn=!0,xs=!0),$.id!==T&&(T=$.id,mn=!0),xr||A!==L){et.buffers.depth.getReversed()&&L.reversedDepth!==!0&&(L._reversedDepth=!0,L.updateProjectionMatrix()),ye.setValue(D,"projectionMatrix",L.projectionMatrix),ye.setValue(D,"viewMatrix",L.matrixWorldInverse);const an=ye.map.cameraPosition;an!==void 0&&an.setValue(D,ut.setFromMatrixPosition(L.matrixWorld)),xt.logarithmicDepthBuffer&&ye.setValue(D,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ye.setValue(D,"isOrthographic",L.isOrthographicCamera===!0),A!==L&&(A=L,mn=!0,xs=!0)}if(G.isSkinnedMesh){ye.setOptional(D,G,"bindMatrix"),ye.setOptional(D,G,"bindMatrixInverse");const Qe=G.skeleton;Qe&&(Qe.boneTexture===null&&Qe.computeBoneTexture(),ye.setValue(D,"boneTexture",Qe.boneTexture,ft))}G.isBatchedMesh&&(ye.setOptional(D,G,"batchingTexture"),ye.setValue(D,"batchingTexture",G._matricesTexture,ft),ye.setOptional(D,G,"batchingIdTexture"),ye.setValue(D,"batchingIdTexture",G._indirectTexture,ft),ye.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&ye.setValue(D,"batchingColorTexture",G._colorsTexture,ft));const An=Z.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&kt.update(G,Z,xn),(mn||Bt.receiveShadow!==G.receiveShadow)&&(Bt.receiveShadow=G.receiveShadow,ye.setValue(D,"receiveShadow",G.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(on.envMap.value=Lt,on.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&H.environment!==null&&(on.envMapIntensity.value=H.environmentIntensity),on.dfgLUT!==void 0&&(on.dfgLUT.value=Eb()),mn&&(ye.setValue(D,"toneMappingExposure",u.toneMappingExposure),Bt.needsLights&&r0(on,xs),gt&&$.fog===!0&&mt.refreshFogUniforms(on,gt),mt.refreshMaterialUniforms(on,$,nt,W,d.state.transmissionRenderTarget[L.id]),ua.upload(D,Ku(Bt),on,ft)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ua.upload(D,Ku(Bt),on,ft),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ye.setValue(D,"center",G.center),ye.setValue(D,"modelViewMatrix",G.modelViewMatrix),ye.setValue(D,"normalMatrix",G.normalMatrix),ye.setValue(D,"modelMatrix",G.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Qe=$.uniformsGroups;for(let an=0,Wa=Qe.length;an<Wa;an++){const Vi=Qe[an];At.update(Vi,xn),At.bind(Vi,xn)}}return xn}function r0(L,H){L.ambientLightColor.needsUpdate=H,L.lightProbe.needsUpdate=H,L.directionalLights.needsUpdate=H,L.directionalLightShadows.needsUpdate=H,L.pointLights.needsUpdate=H,L.pointLightShadows.needsUpdate=H,L.spotLights.needsUpdate=H,L.spotLightShadows.needsUpdate=H,L.rectAreaLights.needsUpdate=H,L.hemisphereLights.needsUpdate=H}function s0(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(L,H,Z){const $=ot.get(L);$.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),ot.get(L.texture).__webglTexture=H,ot.get(L.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Z,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,H){const Z=ot.get(L);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0};const o0=D.createFramebuffer();this.setRenderTarget=function(L,H=0,Z=0){y=L,w=H,M=Z;let $=!0,G=null,gt=!1,Pt=!1;if(L){const Lt=ot.get(L);if(Lt.__useDefaultFramebuffer!==void 0)et.bindFramebuffer(D.FRAMEBUFFER,null),$=!1;else if(Lt.__webglFramebuffer===void 0)ft.setupRenderTarget(L);else if(Lt.__hasExternalTextures)ft.rebindTextures(L,ot.get(L.texture).__webglTexture,ot.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Ot=L.depthTexture;if(Lt.__boundDepthTexture!==Ot){if(Ot!==null&&ot.has(Ot)&&(L.width!==Ot.image.width||L.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ft.setupDepthRenderbuffer(L)}}const Vt=L.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Pt=!0);const Gt=ot.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Gt[H])?G=Gt[H][Z]:G=Gt[H],gt=!0):L.samples>0&&ft.useMultisampledRTT(L)===!1?G=ot.get(L).__webglMultisampledFramebuffer:Array.isArray(Gt)?G=Gt[Z]:G=Gt,C.copy(L.viewport),F.copy(L.scissor),N=L.scissorTest}else C.copy(_t).multiplyScalar(nt).floor(),F.copy(yt).multiplyScalar(nt).floor(),N=Tt;if(Z!==0&&(G=o0),et.bindFramebuffer(D.FRAMEBUFFER,G)&&$&&et.drawBuffers(L,G),et.viewport(C),et.scissor(F),et.setScissorTest(N),gt){const Lt=ot.get(L.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+H,Lt.__webglTexture,Z)}else if(Pt){const Lt=H;for(let Vt=0;Vt<L.textures.length;Vt++){const Gt=ot.get(L.textures[Vt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Vt,Gt.__webglTexture,Z,Lt)}}else if(L!==null&&Z!==0){const Lt=ot.get(L.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Lt.__webglTexture,Z)}T=-1},this.readRenderTargetPixels=function(L,H,Z,$,G,gt,Pt,Nt=0){if(!(L&&L.isWebGLRenderTarget)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=ot.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Pt!==void 0&&(Lt=Lt[Pt]),Lt){et.bindFramebuffer(D.FRAMEBUFFER,Lt);try{const Vt=L.textures[Nt],Gt=Vt.format,Ot=Vt.type;if(!xt.textureFormatReadable(Gt)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Ot)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=L.width-$&&Z>=0&&Z<=L.height-G&&(L.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Nt),D.readPixels(H,Z,$,G,Wt.convert(Gt),Wt.convert(Ot),gt))}finally{const Vt=y!==null?ot.get(y).__webglFramebuffer:null;et.bindFramebuffer(D.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(L,H,Z,$,G,gt,Pt,Nt=0){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=ot.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Pt!==void 0&&(Lt=Lt[Pt]),Lt)if(H>=0&&H<=L.width-$&&Z>=0&&Z<=L.height-G){et.bindFramebuffer(D.FRAMEBUFFER,Lt);const Vt=L.textures[Nt],Gt=Vt.format,Ot=Vt.type;if(!xt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const te=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,te),D.bufferData(D.PIXEL_PACK_BUFFER,gt.byteLength,D.STREAM_READ),L.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Nt),D.readPixels(H,Z,$,G,Wt.convert(Gt),Wt.convert(Ot),0);const le=y!==null?ot.get(y).__webglFramebuffer:null;et.bindFramebuffer(D.FRAMEBUFFER,le);const Se=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await K0(D,Se,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,te),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,gt),D.deleteBuffer(te),D.deleteSync(Se),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,H=null,Z=0){const $=Math.pow(2,-Z),G=Math.floor(L.image.width*$),gt=Math.floor(L.image.height*$),Pt=H!==null?H.x:0,Nt=H!==null?H.y:0;ft.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,Z,0,0,Pt,Nt,G,gt),et.unbindTexture()};const a0=D.createFramebuffer(),c0=D.createFramebuffer();this.copyTextureToTexture=function(L,H,Z=null,$=null,G=0,gt=null){gt===null&&(G!==0?(Ks("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),gt=G,G=0):gt=0);let Pt,Nt,Lt,Vt,Gt,Ot,te,le,Se;const Ee=L.isCompressedTexture?L.mipmaps[gt]:L.image;if(Z!==null)Pt=Z.max.x-Z.min.x,Nt=Z.max.y-Z.min.y,Lt=Z.isBox3?Z.max.z-Z.min.z:1,Vt=Z.min.x,Gt=Z.min.y,Ot=Z.isBox3?Z.min.z:0;else{const An=Math.pow(2,-G);Pt=Math.floor(Ee.width*An),Nt=Math.floor(Ee.height*An),L.isDataArrayTexture?Lt=Ee.depth:L.isData3DTexture?Lt=Math.floor(Ee.depth*An):Lt=1,Vt=0,Gt=0,Ot=0}$!==null?(te=$.x,le=$.y,Se=$.z):(te=0,le=0,Se=0);const fe=Wt.convert(H.format),Bt=Wt.convert(H.type);let ve;H.isData3DTexture?(ft.setTexture3D(H,0),ve=D.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(ft.setTexture2DArray(H,0),ve=D.TEXTURE_2D_ARRAY):(ft.setTexture2D(H,0),ve=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,H.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,H.unpackAlignment);const re=D.getParameter(D.UNPACK_ROW_LENGTH),xn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),xr=D.getParameter(D.UNPACK_SKIP_PIXELS),mn=D.getParameter(D.UNPACK_SKIP_ROWS),xs=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ee.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ee.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Vt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Gt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ot);const ye=L.isDataArrayTexture||L.isData3DTexture,on=H.isDataArrayTexture||H.isData3DTexture;if(L.isDepthTexture){const An=ot.get(L),Qe=ot.get(H),an=ot.get(An.__renderTarget),Wa=ot.get(Qe.__renderTarget);et.bindFramebuffer(D.READ_FRAMEBUFFER,an.__webglFramebuffer),et.bindFramebuffer(D.DRAW_FRAMEBUFFER,Wa.__webglFramebuffer);for(let Vi=0;Vi<Lt;Vi++)ye&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ot.get(L).__webglTexture,G,Ot+Vi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ot.get(H).__webglTexture,gt,Se+Vi)),D.blitFramebuffer(Vt,Gt,Pt,Nt,te,le,Pt,Nt,D.DEPTH_BUFFER_BIT,D.NEAREST);et.bindFramebuffer(D.READ_FRAMEBUFFER,null),et.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||L.isRenderTargetTexture||ot.has(L)){const An=ot.get(L),Qe=ot.get(H);et.bindFramebuffer(D.READ_FRAMEBUFFER,a0),et.bindFramebuffer(D.DRAW_FRAMEBUFFER,c0);for(let an=0;an<Lt;an++)ye?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,An.__webglTexture,G,Ot+an):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,An.__webglTexture,G),on?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Qe.__webglTexture,gt,Se+an):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Qe.__webglTexture,gt),G!==0?D.blitFramebuffer(Vt,Gt,Pt,Nt,te,le,Pt,Nt,D.COLOR_BUFFER_BIT,D.NEAREST):on?D.copyTexSubImage3D(ve,gt,te,le,Se+an,Vt,Gt,Pt,Nt):D.copyTexSubImage2D(ve,gt,te,le,Vt,Gt,Pt,Nt);et.bindFramebuffer(D.READ_FRAMEBUFFER,null),et.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else on?L.isDataTexture||L.isData3DTexture?D.texSubImage3D(ve,gt,te,le,Se,Pt,Nt,Lt,fe,Bt,Ee.data):H.isCompressedArrayTexture?D.compressedTexSubImage3D(ve,gt,te,le,Se,Pt,Nt,Lt,fe,Ee.data):D.texSubImage3D(ve,gt,te,le,Se,Pt,Nt,Lt,fe,Bt,Ee):L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,gt,te,le,Pt,Nt,fe,Bt,Ee.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,gt,te,le,Ee.width,Ee.height,fe,Ee.data):D.texSubImage2D(D.TEXTURE_2D,gt,te,le,Pt,Nt,fe,Bt,Ee);D.pixelStorei(D.UNPACK_ROW_LENGTH,re),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xr),D.pixelStorei(D.UNPACK_SKIP_ROWS,mn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,xs),gt===0&&H.generateMipmaps&&D.generateMipmap(ve),et.unbindTexture()},this.initRenderTarget=function(L){ot.get(L).__webglFramebuffer===void 0&&ft.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?ft.setTextureCube(L,0):L.isData3DTexture?ft.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?ft.setTexture2DArray(L,0):ft.setTexture2D(L,0),et.unbindTexture()},this.resetState=function(){w=0,M=0,y=null,et.reset(),z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const hf={type:"change"},Tu={type:"start"},vp={type:"end"},Do=new dr,ff=new In,wb=Math.cos(70*Bi.DEG2RAD),Ne=new I,cn=2*Math.PI,he={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Tc=1e-6;class Ab extends dp{constructor(t,e=null){super(t,e),this.state=he.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qr.ROTATE,MIDDLE:Qr.DOLLY,RIGHT:Qr.PAN},this.touches={ONE:Yr.ROTATE,TWO:Yr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new He,this._lastTargetPosition=new I,this._quat=new He().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Bh,this._sphericalDelta=new Bh,this._scale=1,this._panOffset=new I,this._rotateStart=new ct,this._rotateEnd=new ct,this._rotateDelta=new ct,this._panStart=new ct,this._panEnd=new ct,this._panDelta=new ct,this._dollyStart=new ct,this._dollyEnd=new ct,this._dollyDelta=new ct,this._dollyDirection=new I,this._mouse=new ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cb.bind(this),this._onPointerDown=Rb.bind(this),this._onPointerUp=Pb.bind(this),this._onContextMenu=Ob.bind(this),this._onMouseWheel=Db.bind(this),this._onKeyDown=Ub.bind(this),this._onTouchStart=Nb.bind(this),this._onTouchMove=Fb.bind(this),this._onMouseDown=Ib.bind(this),this._onMouseMove=Lb.bind(this),this._interceptControlDown=Bb.bind(this),this._interceptControlUp=zb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(hf),this.update(),this.state=he.NONE}update(t=null){const e=this.object.position;Ne.copy(e).sub(this.target),Ne.applyQuaternion(this._quat),this._spherical.setFromVector3(Ne),this.autoRotate&&this.state===he.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=cn:n>Math.PI&&(n-=cn),r<-Math.PI?r+=cn:r>Math.PI&&(r-=cn),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Ne.setFromSpherical(this._spherical),Ne.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ne),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ne.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const h=new I(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(a),this.object.updateMatrixWorld(),o=Ne.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Do.origin.copy(this.object.position),Do.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Do.direction))<wb?this.object.lookAt(this.target):(ff.setFromNormalAndCoplanarPoint(this.object.up,this.target),Do.intersectPlane(ff,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Tc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Tc||this._lastTargetPosition.distanceToSquared(this.target)>Tc?(this.dispatchEvent(hf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?cn/60*this.autoRotateSpeed*t:cn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ne.setFromMatrixColumn(e,0),Ne.multiplyScalar(-t),this._panOffset.add(Ne)}_panUp(t,e){this.screenSpacePanning===!0?Ne.setFromMatrixColumn(e,1):(Ne.setFromMatrixColumn(e,0),Ne.crossVectors(this.object.up,Ne)),Ne.multiplyScalar(t),this._panOffset.add(Ne)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ne.copy(r).sub(this.target);let s=Ne.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/e.clientHeight),this._rotateUp(cn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ct,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Rb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Cb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Pb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(vp),this.state=he.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ib(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=he.DOLLY;break;case Qr.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=he.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=he.ROTATE}break;case Qr.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=he.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=he.PAN}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(Tu)}function Lb(i){switch(this.state){case he.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case he.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case he.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Db(i){this.enabled===!1||this.enableZoom===!1||this.state!==he.NONE||(i.preventDefault(),this.dispatchEvent(Tu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(vp))}function Ub(i){this.enabled!==!1&&this._handleKeyDown(i)}function Nb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Yr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=he.TOUCH_ROTATE;break;case Yr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=he.TOUCH_PAN;break;default:this.state=he.NONE}break;case 2:switch(this.touches.TWO){case Yr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=he.TOUCH_DOLLY_PAN;break;case Yr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=he.TOUCH_DOLLY_ROTATE;break;default:this.state=he.NONE}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(Tu)}function Fb(i){switch(this._trackPointer(i),this.state){case he.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case he.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case he.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case he.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=he.NONE}}function Ob(i){this.enabled!==!1&&i.preventDefault()}function Bb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Yi=new fp,Ze=new I,Ai=new I,_e=new He,df={X:new I(1,0,0),Y:new I(0,1,0),Z:new I(0,0,1)},wc={type:"change"},pf={type:"mouseDown",mode:null},xf={type:"mouseUp",mode:null},mf={type:"objectChange"};class Vb extends dp{constructor(t,e=null){super(void 0,e);const n=new qb(this);this._root=n;const r=new Yb;this._gizmo=r,n.add(r);const s=new jb;this._plane=s,n.add(s);const o=this;function a(d,l){let b=l;Object.defineProperty(o,d,{get:function(){return b!==void 0?b:l},set:function(u){b!==u&&(b=u,s[d]=u,r[d]=u,o.dispatchEvent({type:d+"-changed",value:u}),o.dispatchEvent(wc))}}),o[d]=l,s[d]=l,r[d]=l}a("camera",t),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0),a("minX",-1/0),a("maxX",1/0),a("minY",-1/0),a("maxY",1/0),a("minZ",-1/0),a("maxZ",1/0);const c=new I,h=new I,f=new He,p=new He,x=new I,m=new He,v=new I,S=new I,_=new I,g=0,E=new I;a("worldPosition",c),a("worldPositionStart",h),a("worldQuaternion",f),a("worldQuaternionStart",p),a("cameraPosition",x),a("cameraQuaternion",m),a("pointStart",v),a("pointEnd",S),a("rotationAxis",_),a("rotationAngle",g),a("eye",E),this._offset=new I,this._startNorm=new I,this._endNorm=new I,this._cameraScale=new I,this._parentPosition=new I,this._parentQuaternion=new He,this._parentQuaternionInv=new He,this._parentScale=new I,this._worldScaleStart=new I,this._worldQuaternionInv=new He,this._worldScale=new I,this._positionStart=new I,this._quaternionStart=new He,this._scaleStart=new I,this._getPointer=kb.bind(this),this._onPointerDown=Gb.bind(this),this._onPointerHover=Hb.bind(this),this._onPointerMove=Wb.bind(this),this._onPointerUp=Xb.bind(this),e!==null&&this.connect(e)}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(t){if(this.object===void 0||this.dragging===!0)return;t!==null&&Yi.setFromCamera(t,this.camera);const e=Ac(this._gizmo.picker[this.mode],Yi);e?this.axis=e.object.name:this.axis=null}pointerDown(t){if(!(this.object===void 0||this.dragging===!0||t!=null&&t.button!==0)&&this.axis!==null){t!==null&&Yi.setFromCamera(t,this.camera);const e=Ac(this._plane,Yi,!0);e&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(e.point).sub(this.worldPositionStart)),this.dragging=!0,pf.mode=this.mode,this.dispatchEvent(pf)}}pointerMove(t){const e=this.axis,n=this.mode,r=this.object;let s=this.space;if(n==="scale"?s="local":(e==="E"||e==="XYZE"||e==="XYZ")&&(s="world"),r===void 0||e===null||this.dragging===!1||t!==null&&t.button!==-1)return;t!==null&&Yi.setFromCamera(t,this.camera);const o=Ac(this._plane,Yi,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&e!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),e.indexOf("X")===-1&&(this._offset.x=0),e.indexOf("Y")===-1&&(this._offset.y=0),e.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&e!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),r.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(r.position.applyQuaternion(_e.copy(this._quaternionStart).invert()),e.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.position.applyQuaternion(this._quaternionStart)),s==="world"&&(r.parent&&r.position.add(Ze.setFromMatrixPosition(r.parent.matrixWorld)),e.search("X")!==-1&&(r.position.x=Math.round(r.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(r.position.y=Math.round(r.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(r.position.z=Math.round(r.position.z/this.translationSnap)*this.translationSnap),r.parent&&r.position.sub(Ze.setFromMatrixPosition(r.parent.matrixWorld)))),r.position.x=Math.max(this.minX,Math.min(this.maxX,r.position.x)),r.position.y=Math.max(this.minY,Math.min(this.maxY,r.position.y)),r.position.z=Math.max(this.minZ,Math.min(this.maxZ,r.position.z));else if(n==="scale"){if(e.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),Ai.set(a,a,a)}else Ze.copy(this.pointStart),Ai.copy(this.pointEnd),Ze.applyQuaternion(this._worldQuaternionInv),Ai.applyQuaternion(this._worldQuaternionInv),Ai.divide(Ze),e.search("X")===-1&&(Ai.x=1),e.search("Y")===-1&&(Ai.y=1),e.search("Z")===-1&&(Ai.z=1);r.scale.copy(this._scaleStart).multiply(Ai),this.scaleSnap&&(e.search("X")!==-1&&(r.scale.x=Math.round(r.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Y")!==-1&&(r.scale.y=Math.round(r.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Z")!==-1&&(r.scale.z=Math.round(r.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(Ze.setFromMatrixPosition(this.camera.matrixWorld));let c=!1;e==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Ze.copy(this.rotationAxis).cross(this.eye))*a):(e==="X"||e==="Y"||e==="Z")&&(this.rotationAxis.copy(df[e]),Ze.copy(df[e]),s==="local"&&Ze.applyQuaternion(this.worldQuaternion),Ze.cross(this.eye),Ze.length()===0?c=!0:this.rotationAngle=this._offset.dot(Ze.normalize())*a),(e==="E"||c)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&e!=="E"&&e!=="XYZE"?(r.quaternion.copy(this._quaternionStart),r.quaternion.multiply(_e.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),r.quaternion.copy(_e.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),r.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(wc),this.dispatchEvent(mf)}}pointerUp(t){t!==null&&t.button!==0||(this.dragging&&this.axis!==null&&(xf.mode=this.mode,this.dispatchEvent(xf)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(t){return this.object=t,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(wc),this.dispatchEvent(mf),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Yi}getMode(){return this.mode}setMode(t){this.mode=t}setTranslationSnap(t){this.translationSnap=t}setRotationSnap(t){this.rotationSnap=t}setScaleSnap(t){this.scaleSnap=t}setSize(t){this.size=t}setSpace(t){this.space=t}setColors(t,e,n,r){const s=this._gizmo.materialLib;s.xAxis.color.set(t),s.yAxis.color.set(e),s.zAxis.color.set(n),s.active.color.set(r),s.xAxisTransparent.color.set(t),s.yAxisTransparent.color.set(e),s.zAxisTransparent.color.set(n),s.activeTransparent.color.set(r),s.xAxis._color&&s.xAxis._color.set(t),s.yAxis._color&&s.yAxis._color.set(e),s.zAxis._color&&s.zAxis._color.set(n),s.active._color&&s.active._color.set(r),s.xAxisTransparent._color&&s.xAxisTransparent._color.set(t),s.yAxisTransparent._color&&s.yAxisTransparent._color.set(e),s.zAxisTransparent._color&&s.zAxisTransparent._color.set(n),s.activeTransparent._color&&s.activeTransparent._color.set(r)}}function kb(i){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:i.button};{const t=this.domElement.getBoundingClientRect();return{x:(i.clientX-t.left)/t.width*2-1,y:-(i.clientY-t.top)/t.height*2+1,button:i.button}}}function Hb(i){if(this.enabled)switch(i.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(i));break}}function Gb(i){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(i)),this.pointerDown(this._getPointer(i)))}function Wb(i){this.enabled&&this.pointerMove(this._getPointer(i))}function Xb(i){this.enabled&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(i)))}function Ac(i,t,e){const n=t.intersectObject(i,!0);for(let r=0;r<n.length;r++)if(n[r].object.visible||e)return n[r];return!1}const Uo=new Wn,de=new I(0,1,0),gf=new I(0,0,0),_f=new $t,No=new He,ha=new He,Yn=new I,vf=new $t,Us=new I(1,0,0),tr=new I(0,1,0),Ns=new I(0,0,1),Fo=new I,Ms=new I,Ss=new I;class qb extends Pe{constructor(t){super(),this.isTransformControlsRoot=!0,this.controls=t,this.visible=!1}updateMatrixWorld(t){const e=this.controls;e.object!==void 0&&(e.object.updateMatrixWorld(),e.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):e.object.parent.matrixWorld.decompose(e._parentPosition,e._parentQuaternion,e._parentScale),e.object.matrixWorld.decompose(e.worldPosition,e.worldQuaternion,e._worldScale),e._parentQuaternionInv.copy(e._parentQuaternion).invert(),e._worldQuaternionInv.copy(e.worldQuaternion).invert()),e.camera.updateMatrixWorld(),e.camera.matrixWorld.decompose(e.cameraPosition,e.cameraQuaternion,e._cameraScale),e.camera.isOrthographicCamera?e.camera.getWorldDirection(e.eye).negate():e.eye.copy(e.cameraPosition).sub(e.worldPosition).normalize(),super.updateMatrixWorld(t)}dispose(){this.traverse(function(t){t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}}class Yb extends Pe{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const t=new Da({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),e=new Ua({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=t.clone();n.opacity=.15;const r=e.clone();r.opacity=.5;const s=t.clone();s.color.setHex(16711680);const o=t.clone();o.color.setHex(65280);const a=t.clone();a.color.setHex(255);const c=t.clone();c.color.setHex(16711680),c.opacity=.5;const h=t.clone();h.color.setHex(65280),h.opacity=.5;const f=t.clone();f.color.setHex(255),f.opacity=.5;const p=t.clone();p.opacity=.25;const x=t.clone();x.color.setHex(16776960),x.opacity=.25;const m=t.clone();m.color.setHex(16776960);const v=t.clone();v.color.setHex(7895160),this.materialLib={xAxis:s,yAxis:o,zAxis:a,active:m,xAxisTransparent:c,yAxisTransparent:h,zAxisTransparent:f,activeTransparent:x};const S=new ke(0,.04,.1,12);S.translate(0,.05,0);const _=new Re(.08,.08,.08);_.translate(0,.04,0);const g=new Ie;g.setAttribute("position",new ie([0,0,0,1,0,0],3));const E=new ke(.0075,.0075,.5,3);E.translate(0,.25,0);function d(N,O){const B=new Li(N,.0075,3,64,O*Math.PI*2);return B.rotateY(Math.PI/2),B.rotateX(Math.PI/2),B}function l(){const N=new Ie;return N.setAttribute("position",new ie([0,0,0,1,1,1],3)),N}const b={X:[[new Ct(S,s),[.5,0,0],[0,0,-Math.PI/2]],[new Ct(S,s),[-.5,0,0],[0,0,Math.PI/2]],[new Ct(E,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new Ct(S,o),[0,.5,0]],[new Ct(S,o),[0,-.5,0],[Math.PI,0,0]],[new Ct(E,o)]],Z:[[new Ct(S,a),[0,0,.5],[Math.PI/2,0,0]],[new Ct(S,a),[0,0,-.5],[-Math.PI/2,0,0]],[new Ct(E,a),null,[Math.PI/2,0,0]]],XYZ:[[new Ct(new Zr(.1,0),p),[0,0,0]]],XY:[[new Ct(new Re(.15,.15,.01),f),[.15,.15,0]]],YZ:[[new Ct(new Re(.15,.15,.01),c),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ct(new Re(.15,.15,.01),h),[.15,0,.15],[-Math.PI/2,0,0]]]},u={X:[[new Ct(new ke(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new Ct(new ke(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new Ct(new ke(.2,0,.6,4),n),[0,.3,0]],[new Ct(new ke(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new Ct(new ke(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new Ct(new ke(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new Ct(new Zr(.2,0),n)]],XY:[[new Ct(new Re(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new Ct(new Re(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ct(new Re(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},R={START:[[new Ct(new Zr(.01,2),r),null,null,null,"helper"]],END:[[new Ct(new Zr(.01,2),r),null,null,null,"helper"]],DELTA:[[new di(l(),r),null,null,null,"helper"]],X:[[new di(g,r),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new di(g,r),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new di(g,r),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},w={XYZE:[[new Ct(d(.5,1),v),null,[0,Math.PI/2,0]]],X:[[new Ct(d(.5,.5),s)]],Y:[[new Ct(d(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new Ct(d(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new Ct(d(.75,1),x),null,[0,Math.PI/2,0]]]},M={AXIS:[[new di(g,r),[-1e3,0,0],null,[1e6,1,1],"helper"]]},y={XYZE:[[new Ct(new no(.25,10,8),n)]],X:[[new Ct(new Li(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new Ct(new Li(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new Ct(new Li(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new Ct(new Li(.75,.1,2,24),n)]]},T={X:[[new Ct(_,s),[.5,0,0],[0,0,-Math.PI/2]],[new Ct(E,s),[0,0,0],[0,0,-Math.PI/2]],[new Ct(_,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new Ct(_,o),[0,.5,0]],[new Ct(E,o)],[new Ct(_,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new Ct(_,a),[0,0,.5],[Math.PI/2,0,0]],[new Ct(E,a),[0,0,0],[Math.PI/2,0,0]],[new Ct(_,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new Ct(new Re(.15,.15,.01),f),[.15,.15,0]]],YZ:[[new Ct(new Re(.15,.15,.01),c),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ct(new Re(.15,.15,.01),h),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new Ct(new Re(.1,.1,.1),p)]]},A={X:[[new Ct(new ke(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new Ct(new ke(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new Ct(new ke(.2,0,.6,4),n),[0,.3,0]],[new Ct(new ke(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new Ct(new ke(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new Ct(new ke(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new Ct(new Re(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new Ct(new Re(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Ct(new Re(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new Ct(new Re(.2,.2,.2),n),[0,0,0]]]},C={X:[[new di(g,r),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new di(g,r),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new di(g,r),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function F(N){const O=new Pe;for(const B in N)for(let V=N[B].length;V--;){const W=N[B][V][0].clone(),nt=N[B][V][1],it=N[B][V][2],ht=N[B][V][3],_t=N[B][V][4];W.name=B,W.tag=_t,nt&&W.position.set(nt[0],nt[1],nt[2]),it&&W.rotation.set(it[0],it[1],it[2]),ht&&W.scale.set(ht[0],ht[1],ht[2]),W.updateMatrix();const yt=W.geometry.clone();yt.applyMatrix4(W.matrix),W.geometry=yt,W.renderOrder=1/0,W.position.set(0,0,0),W.rotation.set(0,0,0),W.scale.set(1,1,1),O.add(W)}return O}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=F(b)),this.add(this.gizmo.rotate=F(w)),this.add(this.gizmo.scale=F(T)),this.add(this.picker.translate=F(u)),this.add(this.picker.rotate=F(y)),this.add(this.picker.scale=F(A)),this.add(this.helper.translate=F(R)),this.add(this.helper.rotate=F(M)),this.add(this.helper.scale=F(C)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(t){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:ha;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let r=[];r=r.concat(this.picker[this.mode].children),r=r.concat(this.gizmo[this.mode].children),r=r.concat(this.helper[this.mode].children);for(let s=0;s<r.length;s++){const o=r[s];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(_e.setFromEuler(Uo.set(0,0,0)),o.quaternion.copy(n).multiply(_e),Math.abs(de.copy(Us).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(_e.setFromEuler(Uo.set(0,0,Math.PI/2)),o.quaternion.copy(n).multiply(_e),Math.abs(de.copy(tr).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(_e.setFromEuler(Uo.set(0,Math.PI/2,0)),o.quaternion.copy(n).multiply(_e),Math.abs(de.copy(Ns).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(_e.setFromEuler(Uo.set(0,Math.PI/2,0)),de.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(_f.lookAt(gf,de,tr)),o.quaternion.multiply(_e),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Ze.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Ze.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Ze),o.visible=this.dragging):(o.quaternion.copy(n),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(de.copy(Us).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(de.copy(tr).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(de.copy(Ns).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(de.copy(Ns).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(de.copy(Us).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(de.copy(tr).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(No.copy(n),de.copy(this.eye).applyQuaternion(_e.copy(n).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(_f.lookAt(this.eye,gf,tr)),o.name==="X"&&(_e.setFromAxisAngle(Us,Math.atan2(-de.y,de.z)),_e.multiplyQuaternions(No,_e),o.quaternion.copy(_e)),o.name==="Y"&&(_e.setFromAxisAngle(tr,Math.atan2(de.x,de.z)),_e.multiplyQuaternions(No,_e),o.quaternion.copy(_e)),o.name==="Z"&&(_e.setFromAxisAngle(Ns,Math.atan2(de.y,de.x)),_e.multiplyQuaternions(No,_e),o.quaternion.copy(_e))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis?(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1):this.axis.split("").some(function(c){return o.name===c})&&(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1))}super.updateMatrixWorld(t)}}class jb extends Ct{constructor(){super(new hs(1e5,1e5,2,2),new Da({visible:!1,wireframe:!0,side:yn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(t){let e=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(e="local"),Fo.copy(Us).applyQuaternion(e==="local"?this.worldQuaternion:ha),Ms.copy(tr).applyQuaternion(e==="local"?this.worldQuaternion:ha),Ss.copy(Ns).applyQuaternion(e==="local"?this.worldQuaternion:ha),de.copy(Ms),this.mode){case"translate":case"scale":switch(this.axis){case"X":de.copy(this.eye).cross(Fo),Yn.copy(Fo).cross(de);break;case"Y":de.copy(this.eye).cross(Ms),Yn.copy(Ms).cross(de);break;case"Z":de.copy(this.eye).cross(Ss),Yn.copy(Ss).cross(de);break;case"XY":Yn.copy(Ss);break;case"YZ":Yn.copy(Fo);break;case"XZ":de.copy(Ss),Yn.copy(Ms);break;case"XYZ":case"E":Yn.set(0,0,0);break}break;case"rotate":default:Yn.set(0,0,0)}Yn.length()===0?this.quaternion.copy(this.cameraQuaternion):(vf.lookAt(Ze.set(0,0,0),Yn,de),this.quaternion.setFromRotationMatrix(vf)),super.updateMatrixWorld(t)}}class Zb{parse(t,e={}){e=Object.assign({binary:!1},e);const n=e.binary,r=[];let s=0;t.traverse(function(g){if(g.isMesh){const E=g.geometry,d=E.index,l=E.getAttribute("position");s+=d!==null?d.count/3:l.count/3,r.push({object3d:g,geometry:E})}});let o,a=80;if(n===!0){const g=s*2+s*3*4*4+80+4,E=new ArrayBuffer(g);o=new DataView(E),o.setUint32(a,s,!0),a+=4}else o="",o+=`solid exported
`;const c=new I,h=new I,f=new I,p=new I,x=new I,m=new I;for(let g=0,E=r.length;g<E;g++){const d=r[g].object3d,l=r[g].geometry,b=l.index,u=l.getAttribute("position");if(b!==null)for(let R=0;R<b.count;R+=3){const w=b.getX(R+0),M=b.getX(R+1),y=b.getX(R+2);v(w,M,y,u,d)}else for(let R=0;R<u.count;R+=3){const w=R+0,M=R+1,y=R+2;v(w,M,y,u,d)}}return n===!1&&(o+=`endsolid exported
`),o;function v(g,E,d,l,b){c.fromBufferAttribute(l,g),h.fromBufferAttribute(l,E),f.fromBufferAttribute(l,d),b.isSkinnedMesh===!0&&(b.applyBoneTransform(g,c),b.applyBoneTransform(E,h),b.applyBoneTransform(d,f)),c.applyMatrix4(b.matrixWorld),h.applyMatrix4(b.matrixWorld),f.applyMatrix4(b.matrixWorld),S(c,h,f),_(c),_(h),_(f),n===!0?(o.setUint16(a,0,!0),a+=2):(o+=`		endloop
`,o+=`	endfacet
`)}function S(g,E,d){p.subVectors(d,E),x.subVectors(g,E),p.cross(x).normalize(),m.copy(p).normalize(),n===!0?(o.setFloat32(a,m.x,!0),a+=4,o.setFloat32(a,m.y,!0),a+=4,o.setFloat32(a,m.z,!0),a+=4):(o+="	facet normal "+m.x+" "+m.y+" "+m.z+`
`,o+=`		outer loop
`)}function _(g){n===!0?(o.setFloat32(a,g.x,!0),a+=4,o.setFloat32(a,g.y,!0),a+=4,o.setFloat32(a,g.z,!0),a+=4):o+="			vertex "+g.x+" "+g.y+" "+g.z+`
`}}}class $b{parse(t){let e="",n=0,r=0,s=0;const o=new I,a=new Jt,c=new I,h=new ct,f=[];function p(v){let S=0,_=0,g=0;const E=v.geometry,d=new Zt,l=E.getAttribute("position"),b=E.getAttribute("normal"),u=E.getAttribute("uv"),R=E.getIndex();if(e+="o "+v.name+`
`,v.material&&v.material.name&&(e+="usemtl "+v.material.name+`
`),l!==void 0)for(let w=0,M=l.count;w<M;w++,S++)o.fromBufferAttribute(l,w),o.applyMatrix4(v.matrixWorld),e+="v "+o.x+" "+o.y+" "+o.z+`
`;if(u!==void 0)for(let w=0,M=u.count;w<M;w++,g++)h.fromBufferAttribute(u,w),e+="vt "+h.x+" "+h.y+`
`;if(b!==void 0){d.getNormalMatrix(v.matrixWorld);for(let w=0,M=b.count;w<M;w++,_++)c.fromBufferAttribute(b,w),c.applyMatrix3(d).normalize(),e+="vn "+c.x+" "+c.y+" "+c.z+`
`}if(R!==null)for(let w=0,M=R.count;w<M;w+=3){for(let y=0;y<3;y++){const T=R.getX(w+y)+1;f[y]=n+T+(b||u?"/"+(u?r+T:"")+(b?"/"+(s+T):""):"")}e+="f "+f.join(" ")+`
`}else for(let w=0,M=l.count;w<M;w+=3){for(let y=0;y<3;y++){const T=w+y+1;f[y]=n+T+(b||u?"/"+(u?r+T:"")+(b?"/"+(s+T):""):"")}e+="f "+f.join(" ")+`
`}n+=S,r+=g,s+=_}function x(v){let S=0;const _=v.geometry,g=v.type,E=_.getAttribute("position");if(e+="o "+v.name+`
`,E!==void 0)for(let d=0,l=E.count;d<l;d++,S++)o.fromBufferAttribute(E,d),o.applyMatrix4(v.matrixWorld),e+="v "+o.x+" "+o.y+" "+o.z+`
`;if(g==="Line"){e+="l ";for(let d=1,l=E.count;d<=l;d++)e+=n+d+" ";e+=`
`}if(g==="LineSegments")for(let d=1,l=d+1,b=E.count;d<b;d+=2,l=d+1)e+="l "+(n+d)+" "+(n+l)+`
`;n+=S}function m(v){let S=0;const _=v.geometry,g=_.getAttribute("position"),E=_.getAttribute("color");if(e+="o "+v.name+`
`,g!==void 0){for(let d=0,l=g.count;d<l;d++,S++)o.fromBufferAttribute(g,d),o.applyMatrix4(v.matrixWorld),e+="v "+o.x+" "+o.y+" "+o.z,E!==void 0&&(a.fromBufferAttribute(E,d),ee.workingToColorSpace(a,hn),e+=" "+a.r+" "+a.g+" "+a.b),e+=`
`;e+="p ";for(let d=1,l=g.count;d<=l;d++)e+=n+d+" ";e+=`
`}n+=S}return t.traverse(function(v){v.isMesh===!0&&p(v),v.isLine===!0&&x(v),v.isPoints===!0&&m(v)}),e}}const yf={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]};class wa{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(t){return new aM(t)}),this.register(function(t){return new cM(t)}),this.register(function(t){return new fM(t)}),this.register(function(t){return new dM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new xM(t)}),this.register(function(t){return new lM(t)}),this.register(function(t){return new uM(t)}),this.register(function(t){return new hM(t)}),this.register(function(t){return new mM(t)}),this.register(function(t){return new gM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new vM(t)}),this.register(function(t){return new yM(t)})}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}setTextureUtils(t){return this.textureUtils=t,this}parse(t,e,n,r){const s=new oM,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](s));s.setPlugins(o),s.setTextureUtils(this.textureUtils),s.writeAsync(t,e,r).catch(n)}parseAsync(t,e){const n=this;return new Promise(function(r,s){n.parse(t,r,s,e)})}}const Qt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Rc="KHR_mesh_quantization",Sn={};Sn[fn]=Qt.NEAREST;Sn[Ld]=Qt.NEAREST_MIPMAP_NEAREST;Sn[Is]=Qt.NEAREST_MIPMAP_LINEAR;Sn[Mn]=Qt.LINEAR;Sn[sa]=Qt.LINEAR_MIPMAP_NEAREST;Sn[Ui]=Qt.LINEAR_MIPMAP_LINEAR;Sn[Jn]=Qt.CLAMP_TO_EDGE;Sn[_a]=Qt.REPEAT;Sn[va]=Qt.MIRRORED_REPEAT;const bf={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},Kb=new Jt,Mf=12,Jb=1179937895,Qb=2,Sf=8,tM=1313821514,eM=5130562;function Fs(i,t){return i.length===t.length&&i.every(function(e,n){return e===t[n]})}function nM(i){return new TextEncoder().encode(i).buffer}function iM(i){return Fs(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function rM(i,t,e){const n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let r=t;r<t+e;r++)for(let s=0;s<i.itemSize;s++){let o;i.itemSize>4?o=i.array[r*i.itemSize+s]:(s===0?o=i.getX(r):s===1?o=i.getY(r):s===2?o=i.getZ(r):s===3&&(o=i.getW(r)),i.normalized===!0&&(o=Bi.normalize(o,i.array))),n.min[s]=Math.min(n.min[s],o),n.max[s]=Math.max(n.max[s],o)}return n}function yp(i){return Math.ceil(i/4)*4}function Cc(i,t=0){const e=yp(i.byteLength);if(e!==i.byteLength){const n=new Uint8Array(e);if(n.set(new Uint8Array(i)),t!==0)for(let r=i.byteLength;r<e;r++)n[r]=t;return n.buffer}return i}function Ef(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function sM(i,t){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let e;return t==="image/jpeg"?e=.92:t==="image/webp"&&(e=.8),i.convertToBlob({type:t,quality:e})}else return new Promise(e=>i.toBlob(e,t))}class oM{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r"+ls}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(t){this.plugins=t}setTextureUtils(t){this.textureUtils=t}async writeAsync(t,e,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(t),await Promise.all(this.pending);const r=this,s=r.buffers,o=r.json;n=r.options;const a=r.extensionsUsed,c=r.extensionsRequired,h=new Blob(s,{type:"application/octet-stream"}),f=Object.keys(a),p=Object.keys(c);if(f.length>0&&(o.extensionsUsed=f),p.length>0&&(o.extensionsRequired=p),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=h.size),n.binary===!0){const x=new FileReader;x.readAsArrayBuffer(h),x.onloadend=function(){const m=Cc(x.result),v=new DataView(new ArrayBuffer(Sf));v.setUint32(0,m.byteLength,!0),v.setUint32(4,eM,!0);const S=Cc(nM(JSON.stringify(o)),32),_=new DataView(new ArrayBuffer(Sf));_.setUint32(0,S.byteLength,!0),_.setUint32(4,tM,!0);const g=new ArrayBuffer(Mf),E=new DataView(g);E.setUint32(0,Jb,!0),E.setUint32(4,Qb,!0);const d=Mf+_.byteLength+S.byteLength+v.byteLength+m.byteLength;E.setUint32(8,d,!0);const l=new Blob([g,_,S,v,m],{type:"application/octet-stream"}),b=new FileReader;b.readAsArrayBuffer(l),b.onloadend=function(){e(b.result)}}}else if(o.buffers&&o.buffers.length>0){const x=new FileReader;x.readAsDataURL(h),x.onloadend=function(){const m=x.result;o.buffers[0].uri=m,e(o)}}else e(o)}serializeUserData(t,e){if(Object.keys(t.userData).length===0)return;const n=this.options,r=this.extensionsUsed;try{const s=JSON.parse(JSON.stringify(t.userData));if(n.includeCustomExtensions&&s.gltfExtensions){e.extensions===void 0&&(e.extensions={});for(const o in s.gltfExtensions)e.extensions[o]=s.gltfExtensions[o],r[o]=!0;delete s.gltfExtensions}Object.keys(s).length>0&&(e.extras=s)}catch(s){console.warn("THREE.GLTFExporter: userData of '"+t.name+"' won't be serialized because of JSON.stringify error - "+s.message)}}getUID(t,e=!1){if(this.uids.has(t)===!1){const r=new Map;r.set(!0,this.uid++),r.set(!1,this.uid++),this.uids.set(t,r)}return this.uids.get(t).get(e)}isNormalizedNormalAttribute(t){if(this.cache.attributesNormalized.has(t))return!1;const n=new I;for(let r=0,s=t.count;r<s;r++)if(Math.abs(n.fromBufferAttribute(t,r).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(t){const e=this.cache;if(e.attributesNormalized.has(t))return e.attributesNormalized.get(t);const n=t.clone(),r=new I;for(let s=0,o=n.count;s<o;s++)r.fromBufferAttribute(n,s),r.x===0&&r.y===0&&r.z===0?r.setX(1):r.normalize(),n.setXYZ(s,r.x,r.y,r.z);return e.attributesNormalized.set(t,n),n}applyTextureTransform(t,e){let n=!1;const r={};(e.offset.x!==0||e.offset.y!==0)&&(r.offset=e.offset.toArray(),n=!0),e.rotation!==0&&(r.rotation=e.rotation,n=!0),(e.repeat.x!==1||e.repeat.y!==1)&&(r.scale=e.repeat.toArray(),n=!0),n&&(t.extensions=t.extensions||{},t.extensions.KHR_texture_transform=r,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(t,e){if(t===e)return t;function n(m){return m.colorSpace===hn?function(S){return S<.04045?S*.0773993808:Math.pow(S*.9478672986+.0521327014,2.4)}:function(S){return S}}t instanceof pc&&(t=await this.decompressTextureAsync(t)),e instanceof pc&&(e=await this.decompressTextureAsync(e));const r=t?t.image:null,s=e?e.image:null,o=Math.max(r?r.width:0,s?s.width:0),a=Math.max(r?r.height:0,s?s.height:0),c=Ef();c.width=o,c.height=a;const h=c.getContext("2d",{willReadFrequently:!0});h.fillStyle="#00ffff",h.fillRect(0,0,o,a);const f=h.getImageData(0,0,o,a);if(r){h.drawImage(r,0,0,o,a);const m=n(t),v=h.getImageData(0,0,o,a).data;for(let S=2;S<v.length;S+=4)f.data[S]=m(v[S]/256)*256}if(s){h.drawImage(s,0,0,o,a);const m=n(e),v=h.getImageData(0,0,o,a).data;for(let S=1;S<v.length;S+=4)f.data[S]=m(v[S]/256)*256}h.putImageData(f,0,0);const x=(t||e).clone();return x.source=new La(c),x.colorSpace=xi,x.channel=(t||e).channel,t&&e&&t.channel!==e.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),x}async decompressTextureAsync(t,e=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(t,e)}processBuffer(t){const e=this.json,n=this.buffers;return e.buffers||(e.buffers=[{byteLength:0}]),n.push(t),0}processBufferView(t,e,n,r,s){const o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(e){case Qt.BYTE:case Qt.UNSIGNED_BYTE:a=1;break;case Qt.SHORT:case Qt.UNSIGNED_SHORT:a=2;break;default:a=4}let c=t.itemSize*a;s===Qt.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);const h=yp(r*c),f=new DataView(new ArrayBuffer(h));let p=0;for(let v=n;v<n+r;v++){for(let S=0;S<t.itemSize;S++){let _;t.itemSize>4?_=t.array[v*t.itemSize+S]:(S===0?_=t.getX(v):S===1?_=t.getY(v):S===2?_=t.getZ(v):S===3&&(_=t.getW(v)),t.normalized===!0&&(_=Bi.normalize(_,t.array))),e===Qt.FLOAT?f.setFloat32(p,_,!0):e===Qt.INT?f.setInt32(p,_,!0):e===Qt.UNSIGNED_INT?f.setUint32(p,_,!0):e===Qt.SHORT?f.setInt16(p,_,!0):e===Qt.UNSIGNED_SHORT?f.setUint16(p,_,!0):e===Qt.BYTE?f.setInt8(p,_):e===Qt.UNSIGNED_BYTE&&f.setUint8(p,_),p+=a}p%c!==0&&(p+=c-p%c)}const x={buffer:this.processBuffer(f.buffer),byteOffset:this.byteOffset,byteLength:h};return s!==void 0&&(x.target=s),s===Qt.ARRAY_BUFFER&&(x.byteStride=c),this.byteOffset+=h,o.bufferViews.push(x),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(t){const e=this,n=e.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(r){const s=new FileReader;s.readAsArrayBuffer(t),s.onloadend=function(){const o=Cc(s.result),a={buffer:e.processBuffer(o),byteOffset:e.byteOffset,byteLength:o.byteLength};e.byteOffset+=o.byteLength,r(n.bufferViews.push(a)-1)}})}processAccessor(t,e,n,r){const s=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"};let a;if(t.array.constructor===Float32Array)a=Qt.FLOAT;else if(t.array.constructor===Int32Array)a=Qt.INT;else if(t.array.constructor===Uint32Array)a=Qt.UNSIGNED_INT;else if(t.array.constructor===Int16Array)a=Qt.SHORT;else if(t.array.constructor===Uint16Array)a=Qt.UNSIGNED_SHORT;else if(t.array.constructor===Int8Array)a=Qt.BYTE;else if(t.array.constructor===Uint8Array)a=Qt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+t.array.constructor.name);if(n===void 0&&(n=0),(r===void 0||r===1/0)&&(r=t.count),r===0)return null;const c=rM(t,n,r);let h;e!==void 0&&(h=t===e.index?Qt.ELEMENT_ARRAY_BUFFER:Qt.ARRAY_BUFFER);const f=this.processBufferView(t,a,n,r,h),p={bufferView:f.id,byteOffset:f.byteOffset,componentType:a,count:r,max:c.max,min:c.min,type:o[t.itemSize]};return t.normalized===!0&&(p.normalized=!0),s.accessors||(s.accessors=[]),s.accessors.push(p)-1}processImage(t,e,n,r="image/png"){if(t!==null){const s=this,o=s.cache,a=s.json,c=s.options,h=s.pending;o.images.has(t)||o.images.set(t,{});const f=o.images.get(t),p=r+":flipY/"+n.toString();if(f[p]!==void 0)return f[p];a.images||(a.images=[]);const x={mimeType:r},m=Ef();m.width=Math.min(t.width,c.maxTextureSize),m.height=Math.min(t.height,c.maxTextureSize);const v=m.getContext("2d",{willReadFrequently:!0});if(n===!0&&(v.translate(0,m.height),v.scale(1,-1)),t.data!==void 0){e!==Ln&&console.error("GLTFExporter: Only RGBAFormat is supported.",e),(t.width>c.maxTextureSize||t.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",t);const _=new Uint8ClampedArray(t.height*t.width*4);for(let g=0;g<_.length;g+=4)_[g+0]=t.data[g+0],_[g+1]=t.data[g+1],_[g+2]=t.data[g+2],_[g+3]=t.data[g+3];v.putImageData(new ImageData(_,t.width,t.height),0,0)}else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas)v.drawImage(t,0,0,m.width,m.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?h.push(sM(m,r).then(_=>s.processBufferViewImage(_)).then(_=>{x.bufferView=_})):x.uri=Gd.getDataURL(m,r);const S=a.images.push(x)-1;return f[p]=S,S}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(t){const e=this.json;e.samplers||(e.samplers=[]);const n={magFilter:Sn[t.magFilter],minFilter:Sn[t.minFilter],wrapS:Sn[t.wrapS],wrapT:Sn[t.wrapT]};return e.samplers.push(n)-1}async processTextureAsync(t){const n=this.options,r=this.cache,s=this.json;if(r.textures.has(t))return r.textures.get(t);s.textures||(s.textures=[]),t instanceof pc&&(t=await this.decompressTextureAsync(t,n.maxTextureSize));let o=t.userData.mimeType;o==="image/webp"&&(o="image/png");const a={sampler:this.processSampler(t),source:this.processImage(t.image,t.format,t.flipY,o)};t.name&&(a.name=t.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(t,a)});const c=s.textures.push(a)-1;return r.textures.set(t,c),c}async processMaterialAsync(t){const e=this.cache,n=this.json;if(e.materials.has(t))return e.materials.get(t);if(t.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);const r={pbrMetallicRoughness:{}};t.isMeshStandardMaterial!==!0&&t.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const s=t.color.toArray().concat([t.opacity]);if(Fs(s,[1,1,1,1])||(r.pbrMetallicRoughness.baseColorFactor=s),t.isMeshStandardMaterial?(r.pbrMetallicRoughness.metallicFactor=t.metalness,r.pbrMetallicRoughness.roughnessFactor=t.roughness):(r.pbrMetallicRoughness.metallicFactor=0,r.pbrMetallicRoughness.roughnessFactor=1),t.metalnessMap||t.roughnessMap){const a=await this.buildMetalRoughTextureAsync(t.metalnessMap,t.roughnessMap),c={index:await this.processTextureAsync(a),texCoord:a.channel};this.applyTextureTransform(c,a),r.pbrMetallicRoughness.metallicRoughnessTexture=c}if(t.map){const a={index:await this.processTextureAsync(t.map),texCoord:t.map.channel};this.applyTextureTransform(a,t.map),r.pbrMetallicRoughness.baseColorTexture=a}if(t.emissive){const a=t.emissive;if(Math.max(a.r,a.g,a.b)>0&&(r.emissiveFactor=t.emissive.toArray()),t.emissiveMap){const h={index:await this.processTextureAsync(t.emissiveMap),texCoord:t.emissiveMap.channel};this.applyTextureTransform(h,t.emissiveMap),r.emissiveTexture=h}}if(t.normalMap){const a={index:await this.processTextureAsync(t.normalMap),texCoord:t.normalMap.channel};t.normalScale&&t.normalScale.x!==1&&(a.scale=t.normalScale.x),this.applyTextureTransform(a,t.normalMap),r.normalTexture=a}if(t.aoMap){const a={index:await this.processTextureAsync(t.aoMap),texCoord:t.aoMap.channel};t.aoMapIntensity!==1&&(a.strength=t.aoMapIntensity),this.applyTextureTransform(a,t.aoMap),r.occlusionTexture=a}t.transparent?r.alphaMode="BLEND":t.alphaTest>0&&(r.alphaMode="MASK",r.alphaCutoff=t.alphaTest),t.side===yn&&(r.doubleSided=!0),t.name!==""&&(r.name=t.name),this.serializeUserData(t,r),await this._invokeAllAsync(async function(a){a.writeMaterialAsync&&await a.writeMaterialAsync(t,r)});const o=n.materials.push(r)-1;return e.materials.set(t,o),o}async processMeshAsync(t){const e=this.cache,n=this.json,r=[t.geometry.uuid];if(Array.isArray(t.material))for(let l=0,b=t.material.length;l<b;l++)r.push(t.material[l].uuid);else r.push(t.material.uuid);const s=r.join(":");if(e.meshes.has(s))return e.meshes.get(s);const o=t.geometry;let a;t.isLineSegments?a=Qt.LINES:t.isLineLoop?a=Qt.LINE_LOOP:t.isLine?a=Qt.LINE_STRIP:t.isPoints?a=Qt.POINTS:a=t.material.wireframe?Qt.LINES:Qt.TRIANGLES;const c={},h={},f=[],p=[],x={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},m=o.getAttribute("normal");m!==void 0&&!this.isNormalizedNormalAttribute(m)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(m)));let v=null;for(let l in o.attributes){if(l.slice(0,5)==="morph")continue;const b=o.attributes[l];if(l=x[l]||l.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(l)||(l="_"+l),e.attributes.has(this.getUID(b))){h[l]=e.attributes.get(this.getUID(b));continue}v=null;const R=b.array;l==="JOINTS_0"&&!(R instanceof Uint16Array)&&!(R instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),v=new Me(new Uint16Array(R),b.itemSize,b.normalized)):(R instanceof Uint32Array||R instanceof Int32Array)&&!l.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${l}" converted to type FLOAT.`),v=wa.Utils.toFloat32BufferAttribute(b));const w=this.processAccessor(v||b,o);w!==null&&(l.startsWith("_")||this.detectMeshQuantization(l,b),h[l]=w,e.attributes.set(this.getUID(b),w))}if(m!==void 0&&o.setAttribute("normal",m),Object.keys(h).length===0)return null;if(t.morphTargetInfluences!==void 0&&t.morphTargetInfluences.length>0){const l=[],b=[],u={};if(t.morphTargetDictionary!==void 0)for(const R in t.morphTargetDictionary)u[t.morphTargetDictionary[R]]=R;for(let R=0;R<t.morphTargetInfluences.length;++R){const w={};let M=!1;for(const y in o.morphAttributes){if(y!=="position"&&y!=="normal"){M||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),M=!0);continue}const T=o.morphAttributes[y][R],A=y.toUpperCase(),C=o.attributes[y];if(e.attributes.has(this.getUID(T,!0))){w[A]=e.attributes.get(this.getUID(T,!0));continue}const F=T.clone();if(!o.morphTargetsRelative)for(let N=0,O=T.count;N<O;N++)for(let B=0;B<T.itemSize;B++)B===0&&F.setX(N,T.getX(N)-C.getX(N)),B===1&&F.setY(N,T.getY(N)-C.getY(N)),B===2&&F.setZ(N,T.getZ(N)-C.getZ(N)),B===3&&F.setW(N,T.getW(N)-C.getW(N));w[A]=this.processAccessor(F,o),e.attributes.set(this.getUID(C,!0),w[A])}p.push(w),l.push(t.morphTargetInfluences[R]),t.morphTargetDictionary!==void 0&&b.push(u[R])}c.weights=l,b.length>0&&(c.extras={},c.extras.targetNames=b)}const S=Array.isArray(t.material);if(S&&o.groups.length===0)return null;let _=!1;if(S&&o.index===null){const l=[];for(let b=0,u=o.attributes.position.count;b<u;b++)l[b]=b;o.setIndex(l),_=!0}const g=S?t.material:[t.material],E=S?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let l=0,b=E.length;l<b;l++){const u={mode:a,attributes:h};if(this.serializeUserData(o,u),p.length>0&&(u.targets=p),o.index!==null){let w=this.getUID(o.index);(E[l].start!==void 0||E[l].count!==void 0)&&(w+=":"+E[l].start+":"+E[l].count),e.attributes.has(w)?u.indices=e.attributes.get(w):(u.indices=this.processAccessor(o.index,o,E[l].start,E[l].count),e.attributes.set(w,u.indices)),u.indices===null&&delete u.indices}const R=await this.processMaterialAsync(g[E[l].materialIndex]);R!==null&&(u.material=R),f.push(u)}_===!0&&o.setIndex(null),c.primitives=f,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(l){l.writeMesh&&l.writeMesh(t,c)});const d=n.meshes.push(c)-1;return e.meshes.set(s,d),d}detectMeshQuantization(t,e){if(this.extensionsUsed[Rc])return;let n;switch(e.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}e.normalized&&(n+=" normalized");const r=t.split("_",1)[0];yf[r]&&yf[r].includes(n)&&(this.extensionsUsed[Rc]=!0,this.extensionsRequired[Rc]=!0)}processCamera(t){const e=this.json;e.cameras||(e.cameras=[]);const n=t.isOrthographicCamera,r={type:n?"orthographic":"perspective"};return n?r.orthographic={xmag:t.right*2,ymag:t.top*2,zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near}:r.perspective={aspectRatio:t.aspect,yfov:Bi.degToRad(t.fov),zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near},t.name!==""&&(r.name=t.type),e.cameras.push(r)-1}processAnimation(t,e){const n=this.json,r=this.nodeMap;n.animations||(n.animations=[]),t=wa.Utils.mergeMorphTargetTracks(t.clone(),e);const s=t.tracks,o=[],a=[];for(let h=0;h<s.length;++h){const f=s[h],p=se.parseTrackName(f.name);let x=se.findNode(e,p.nodeName);const m=bf[p.propertyName];if(p.objectName==="bones"&&(x.isSkinnedMesh===!0?x=x.skeleton.getBoneByName(p.objectIndex):x=void 0),!x||!m){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',f.name);continue}const v=1;let S=f.values.length/f.times.length;m===bf.morphTargetInfluences&&(S/=x.morphTargetInfluences.length);let _;f.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(_="CUBICSPLINE",S/=3):f.getInterpolation()===B0?_="STEP":_="LINEAR",a.push({input:this.processAccessor(new Me(f.times,v)),output:this.processAccessor(new Me(f.values,S)),interpolation:_}),o.push({sampler:a.length-1,target:{node:r.get(x),path:m}})}const c={name:t.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(t,c),n.animations.push(c),n.animations.length-1}processSkin(t){const e=this.json,n=this.nodeMap,r=e.nodes[n.get(t)],s=t.skeleton;if(s===void 0)return null;const o=t.skeleton.bones[0];if(o===void 0)return null;const a=[],c=new Float32Array(s.bones.length*16),h=new $t;for(let p=0;p<s.bones.length;++p)a.push(n.get(s.bones[p])),h.copy(s.boneInverses[p]),h.multiply(t.bindMatrix).toArray(c,p*16);return e.skins===void 0&&(e.skins=[]),e.skins.push({inverseBindMatrices:this.processAccessor(new Me(c,16)),joints:a,skeleton:n.get(o)}),r.skin=e.skins.length-1}async processNodeAsync(t){const e=this.json,n=this.options,r=this.nodeMap;e.nodes||(e.nodes=[]);const s={};if(n.trs){const a=t.quaternion.toArray(),c=t.position.toArray(),h=t.scale.toArray();Fs(a,[0,0,0,1])||(s.rotation=a),Fs(c,[0,0,0])||(s.translation=c),Fs(h,[1,1,1])||(s.scale=h)}else t.matrixAutoUpdate&&t.updateMatrix(),iM(t.matrix)===!1&&(s.matrix=t.matrix.elements);if(t.name!==""&&(s.name=String(t.name)),this.serializeUserData(t,s),t.isMesh||t.isLine||t.isPoints){const a=await this.processMeshAsync(t);a!==null&&(s.mesh=a)}else t.isCamera&&(s.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);const o=e.nodes.push(s)-1;if(r.set(t,o),t.children.length>0){const a=[];for(let c=0,h=t.children.length;c<h;c++){const f=t.children[c];if(f.visible||n.onlyVisible===!1){const p=await this.processNodeAsync(f);p!==null&&a.push(p)}}a.length>0&&(s.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(t,s)}),o}async processSceneAsync(t){const e=this.json,n=this.options;e.scenes||(e.scenes=[],e.scene=0);const r={};t.name!==""&&(r.name=t.name),e.scenes.push(r);const s=[];for(let o=0,a=t.children.length;o<a;o++){const c=t.children[o];if(c.visible||n.onlyVisible===!1){const h=await this.processNodeAsync(c);h!==null&&s.push(h)}}s.length>0&&(r.nodes=s),this.serializeUserData(t,r)}async processObjectsAsync(t){const e=new Wl;e.name="AuxScene";for(let n=0;n<t.length;n++)e.children.push(t[n]);await this.processSceneAsync(e)}async processInputAsync(t){const e=this.options;t=t instanceof Array?t:[t],await this._invokeAllAsync(function(r){r.beforeParse&&r.beforeParse(t)});const n=[];for(let r=0;r<t.length;r++)t[r]instanceof Wl?await this.processSceneAsync(t[r]):n.push(t[r]);n.length>0&&await this.processObjectsAsync(n);for(let r=0;r<this.skins.length;++r)this.processSkin(this.skins[r]);for(let r=0;r<e.animations.length;++r)this.processAnimation(e.animations[r],t[0]);await this._invokeAllAsync(function(r){r.afterParse&&r.afterParse(t)})}async _invokeAllAsync(t){for(let e=0,n=this.plugins.length;e<n;e++)await t(this.plugins[e])}}class aM{constructor(t){this.writer=t,this.name="KHR_lights_punctual"}writeNode(t,e){if(!t.isLight)return;if(!t.isDirectionalLight&&!t.isPointLight&&!t.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",t);return}const n=this.writer,r=n.json,s=n.extensionsUsed,o={};t.name&&(o.name=t.name),o.color=t.color.toArray(),o.intensity=t.intensity,t.isDirectionalLight?o.type="directional":t.isPointLight?(o.type="point",t.distance>0&&(o.range=t.distance)):t.isSpotLight&&(o.type="spot",t.distance>0&&(o.range=t.distance),o.spot={},o.spot.innerConeAngle=(1-t.penumbra)*t.angle,o.spot.outerConeAngle=t.angle),t.decay!==void 0&&t.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),t.target&&(t.target.parent!==t||t.target.position.x!==0||t.target.position.y!==0||t.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),s[this.name]||(r.extensions=r.extensions||{},r.extensions[this.name]={lights:[]},s[this.name]=!0);const a=r.extensions[this.name].lights;a.push(o),e.extensions=e.extensions||{},e.extensions[this.name]={light:a.length-1}}}class cM{constructor(t){this.writer=t,this.name="KHR_materials_unlit"}async writeMaterialAsync(t,e){if(!t.isMeshBasicMaterial)return;const r=this.writer.extensionsUsed;e.extensions=e.extensions||{},e.extensions[this.name]={},r[this.name]=!0,e.pbrMetallicRoughness.metallicFactor=0,e.pbrMetallicRoughness.roughnessFactor=.9}}class lM{constructor(t){this.writer=t,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.clearcoat===0)return;const n=this.writer,r=n.extensionsUsed,s={};if(s.clearcoatFactor=t.clearcoat,t.clearcoatMap){const o={index:await n.processTextureAsync(t.clearcoatMap),texCoord:t.clearcoatMap.channel};n.applyTextureTransform(o,t.clearcoatMap),s.clearcoatTexture=o}if(s.clearcoatRoughnessFactor=t.clearcoatRoughness,t.clearcoatRoughnessMap){const o={index:await n.processTextureAsync(t.clearcoatRoughnessMap),texCoord:t.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,t.clearcoatRoughnessMap),s.clearcoatRoughnessTexture=o}if(t.clearcoatNormalMap){const o={index:await n.processTextureAsync(t.clearcoatNormalMap),texCoord:t.clearcoatNormalMap.channel};t.clearcoatNormalScale.x!==1&&(o.scale=t.clearcoatNormalScale.x),n.applyTextureTransform(o,t.clearcoatNormalMap),s.clearcoatNormalTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class uM{constructor(t){this.writer=t,this.name="KHR_materials_dispersion"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.dispersion===0)return;const r=this.writer.extensionsUsed,s={};s.dispersion=t.dispersion,e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class hM{constructor(t){this.writer=t,this.name="KHR_materials_iridescence"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.iridescence===0)return;const n=this.writer,r=n.extensionsUsed,s={};if(s.iridescenceFactor=t.iridescence,t.iridescenceMap){const o={index:await n.processTextureAsync(t.iridescenceMap),texCoord:t.iridescenceMap.channel};n.applyTextureTransform(o,t.iridescenceMap),s.iridescenceTexture=o}if(s.iridescenceIor=t.iridescenceIOR,s.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1],t.iridescenceThicknessMap){const o={index:await n.processTextureAsync(t.iridescenceThicknessMap),texCoord:t.iridescenceThicknessMap.channel};n.applyTextureTransform(o,t.iridescenceThicknessMap),s.iridescenceThicknessTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class fM{constructor(t){this.writer=t,this.name="KHR_materials_transmission"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;const n=this.writer,r=n.extensionsUsed,s={};if(s.transmissionFactor=t.transmission,t.transmissionMap){const o={index:await n.processTextureAsync(t.transmissionMap),texCoord:t.transmissionMap.channel};n.applyTextureTransform(o,t.transmissionMap),s.transmissionTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class dM{constructor(t){this.writer=t,this.name="KHR_materials_volume"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;const n=this.writer,r=n.extensionsUsed,s={};if(s.thicknessFactor=t.thickness,t.thicknessMap){const o={index:await n.processTextureAsync(t.thicknessMap),texCoord:t.thicknessMap.channel};n.applyTextureTransform(o,t.thicknessMap),s.thicknessTexture=o}t.attenuationDistance!==1/0&&(s.attenuationDistance=t.attenuationDistance),s.attenuationColor=t.attenuationColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class pM{constructor(t){this.writer=t,this.name="KHR_materials_ior"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.ior===1.5)return;const r=this.writer.extensionsUsed,s={};s.ior=t.ior,e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class xM{constructor(t){this.writer=t,this.name="KHR_materials_specular"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.specularIntensity===1&&t.specularColor.equals(Kb)&&!t.specularIntensityMap&&!t.specularColorMap)return;const n=this.writer,r=n.extensionsUsed,s={};if(t.specularIntensityMap){const o={index:await n.processTextureAsync(t.specularIntensityMap),texCoord:t.specularIntensityMap.channel};n.applyTextureTransform(o,t.specularIntensityMap),s.specularTexture=o}if(t.specularColorMap){const o={index:await n.processTextureAsync(t.specularColorMap),texCoord:t.specularColorMap.channel};n.applyTextureTransform(o,t.specularColorMap),s.specularColorTexture=o}s.specularFactor=t.specularIntensity,s.specularColorFactor=t.specularColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class mM{constructor(t){this.writer=t,this.name="KHR_materials_sheen"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.sheen==0)return;const n=this.writer,r=n.extensionsUsed,s={};if(t.sheenRoughnessMap){const o={index:await n.processTextureAsync(t.sheenRoughnessMap),texCoord:t.sheenRoughnessMap.channel};n.applyTextureTransform(o,t.sheenRoughnessMap),s.sheenRoughnessTexture=o}if(t.sheenColorMap){const o={index:await n.processTextureAsync(t.sheenColorMap),texCoord:t.sheenColorMap.channel};n.applyTextureTransform(o,t.sheenColorMap),s.sheenColorTexture=o}s.sheenRoughnessFactor=t.sheenRoughness,s.sheenColorFactor=t.sheenColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class gM{constructor(t){this.writer=t,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.anisotropy==0)return;const n=this.writer,r=n.extensionsUsed,s={};if(t.anisotropyMap){const o={index:await n.processTextureAsync(t.anisotropyMap)};n.applyTextureTransform(o,t.anisotropyMap),s.anisotropyTexture=o}s.anisotropyStrength=t.anisotropy,s.anisotropyRotation=t.anisotropyRotation,e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class _M{constructor(t){this.writer=t,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.emissiveIntensity===1)return;const r=this.writer.extensionsUsed,s={};s.emissiveStrength=t.emissiveIntensity,e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class vM{constructor(t){this.writer=t,this.name="EXT_materials_bump"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.bumpScale===1&&!t.bumpMap)return;const n=this.writer,r=n.extensionsUsed,s={};if(t.bumpMap){const o={index:await n.processTextureAsync(t.bumpMap),texCoord:t.bumpMap.channel};n.applyTextureTransform(o,t.bumpMap),s.bumpTexture=o}s.bumpFactor=t.bumpScale,e.extensions=e.extensions||{},e.extensions[this.name]=s,r[this.name]=!0}}class yM{constructor(t){this.writer=t,this.name="EXT_mesh_gpu_instancing"}writeNode(t,e){if(!t.isInstancedMesh)return;const n=this.writer,r=t,s=new Float32Array(r.count*3),o=new Float32Array(r.count*4),a=new Float32Array(r.count*3),c=new $t,h=new I,f=new He,p=new I;for(let m=0;m<r.count;m++)r.getMatrixAt(m,c),c.decompose(h,f,p),h.toArray(s,m*3),f.toArray(o,m*4),p.toArray(a,m*3);const x={TRANSLATION:n.processAccessor(new Me(s,3)),ROTATION:n.processAccessor(new Me(o,4)),SCALE:n.processAccessor(new Me(a,3))};r.instanceColor&&(x._COLOR_0=n.processAccessor(r.instanceColor)),e.extensions=e.extensions||{},e.extensions[this.name]={attributes:x},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}}wa.Utils={insertKeyframe:function(i,t){const n=i.getValueSize(),r=new i.TimeBufferType(i.times.length+1),s=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n));let a;if(i.times.length===0){r[0]=t;for(let c=0;c<n;c++)s[c]=0;a=0}else if(t<i.times[0]){if(Math.abs(i.times[0]-t)<.001)return 0;r[0]=t,r.set(i.times,1),s.set(o.evaluate(t),0),s.set(i.values,n),a=0}else if(t>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-t)<.001)return i.times.length-1;r[r.length-1]=t,r.set(i.times,0),s.set(i.values,0),s.set(o.evaluate(t),i.values.length),a=r.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-t)<.001)return c;if(i.times[c]<t&&i.times[c+1]>t){r.set(i.times.slice(0,c+1),0),r[c+1]=t,r.set(i.times.slice(c+1),c+2),s.set(i.values.slice(0,(c+1)*n),0),s.set(o.evaluate(t),(c+1)*n),s.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=r,i.values=s,a},mergeMorphTargetTracks:function(i,t){const e=[],n={},r=i.tracks;for(let s=0;s<r.length;++s){let o=r[s];const a=se.parseTrackName(o.name),c=se.findNode(t,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){e.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(z0)}const h=c.morphTargetInfluences.length,f=c.morphTargetDictionary[a.propertyIndex];if(f===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let p;if(n[c.uuid]===void 0){p=o.clone();const m=new p.ValueBufferType(h*p.times.length);for(let v=0;v<p.times.length;v++)m[v*h+f]=p.values[v];p.name=(a.nodeName||"")+".morphTargetInfluences",p.values=m,n[c.uuid]=p,e.push(p);continue}const x=o.createInterpolant(new o.ValueBufferType(1));p=n[c.uuid];for(let m=0;m<p.times.length;m++)p.values[m*h+f]=x.evaluate(p.times[m]);for(let m=0;m<o.times.length;m++){const v=this.insertKeyframe(p,o.times[m]);p.values[v*h+f]=o.values[m]}}return i.tracks=e,i},toFloat32BufferAttribute:function(i){const t=new Me(new Float32Array(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let e=0,n=i.count;e<n;e++)for(let r=0;r<i.itemSize;r++)t.setComponent(e,r,i.getComponent(e,r));return t}};function bM(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new Ie;let h=0;for(let f=0;f<i.length;++f){const p=i[f];let x=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in p.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;s[m]===void 0&&(s[m]=[]),s[m].push(p.attributes[m]),x++}if(x!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in p.morphAttributes){if(!r.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(p.morphAttributes[m])}if(t){let m;if(e)m=p.index.count;else if(p.attributes.position!==void 0)m=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,m,f),h+=m}}if(e){let f=0;const p=[];for(let x=0;x<i.length;++x){const m=i[x].index;for(let v=0;v<m.count;++v)p.push(m.getX(v)+f);f+=i[x].attributes.position.count}c.setIndex(p)}for(const f in s){const p=Tf(s[f]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;c.setAttribute(f,p)}for(const f in o){const p=o[f][0].length;if(p===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[f]=[];for(let x=0;x<p;++x){const m=[];for(let S=0;S<o[f].length;++S)m.push(o[f][S][x]);const v=Tf(m);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;c.morphAttributes[f].push(v)}}return c}function Tf(i){let t,e,n,r=-1,s=0;for(let h=0;h<i.length;++h){const f=i[h];if(t===void 0&&(t=f.array.constructor),t!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=f.itemSize),e!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=f.gpuType),r!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=f.count*e}const o=new t(s),a=new Me(o,e,n);let c=0;for(let h=0;h<i.length;++h){const f=i[h];if(f.isInterleavedBufferAttribute){const p=c/e;for(let x=0,m=f.count;x<m;x++)for(let v=0;v<e;v++){const S=f.getComponent(x,v);a.setComponent(x+p,v,S)}}else o.set(f.array,c);c+=f.count*e}return r!==void 0&&(a.gpuType=r),a}const bp=0,MM=1,SM=2,wf=2,Pc=1.25,Af=1,En=6*4+4+4,De=En/4,Mp=65535,fa=Math.pow(2,-24),wu=Symbol("SKIP_GENERATION"),Sp={strategy:bp,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[wu]:!1};function we(i,t,e){return e.min.x=t[i],e.min.y=t[i+1],e.min.z=t[i+2],e.max.x=t[i+3],e.max.y=t[i+4],e.max.z=t[i+5],e}function Kl(i){let t=-1,e=-1/0;for(let n=0;n<3;n++){const r=i[n+3]-i[n];r>e&&(e=r,t=n)}return t}function Rf(i,t,e){for(let n=0;n<3;n++){const r=t[i+2*n],s=t[i+2*n+1],o=r-s,a=r+s;o<e[n]&&(e[n]=o),a>e[n+3]&&(e[n+3]=a)}}function Ic(i){const t=i[3]-i[0],e=i[4]-i[1],n=i[5]-i[2];return 2*(t*e+e*n+n*t)}function Ce(i,t){return t[i+15]===Mp}function Ge(i,t){return t[i+6]}function $e(i,t){return t[i+14]}function Fe(i){return i+De}function Oe(i,t){const e=t[i+6];return i+e*De}function Au(i,t){return t[i+7]}function Lc(i,t,e,n,r){let s=1/0,o=1/0,a=1/0,c=-1/0,h=-1/0,f=-1/0,p=1/0,x=1/0,m=1/0,v=-1/0,S=-1/0,_=-1/0;const g=i.offset||0;for(let E=(t-g)*6,d=(t+e-g)*6;E<d;E+=6){const l=i[E+0],b=i[E+1],u=l-b,R=l+b;u<s&&(s=u),R>c&&(c=R),l<p&&(p=l),l>v&&(v=l);const w=i[E+2],M=i[E+3],y=w-M,T=w+M;y<o&&(o=y),T>h&&(h=T),w<x&&(x=w),w>S&&(S=w);const A=i[E+4],C=i[E+5],F=A-C,N=A+C;F<a&&(a=F),N>f&&(f=N),A<m&&(m=A),A>_&&(_=A)}n[0]=s,n[1]=o,n[2]=a,n[3]=c,n[4]=h,n[5]=f,r[0]=p,r[1]=x,r[2]=m,r[3]=v,r[4]=S,r[5]=_}const Zn=8,Ru=8,Dc=new Int32Array(Zn),jn=new Float32Array(Zn*6),Lr=new Float32Array(Zn*6),Vn=new Float32Array(6),Oo=new Float32Array(6),Ri=new Int32Array(Ru),Cf=new Float32Array(Ru*6);function EM(i,t,e,n){for(let r=0;r<3;r++){const s=t[i+2*r],o=t[i+2*r+1],a=s-o,c=s+o;a<e[n+r]&&(e[n+r]=a),c>e[n+r+3]&&(e[n+r+3]=c)}}function Pf(i,t){const e=i[t+3]-i[t],n=i[t+4]-i[t+1],r=i[t+5]-i[t+2];return 2*(e*n+n*r+r*e)}function TM(i,t,e,n,r,s){let o=-1,a=0;if(s===bp)o=Kl(t),o!==-1&&(a=(t[o]+t[o+3])/2);else if(s===MM)o=Kl(i),o!==-1&&(a=wM(e,n,r,o));else if(s===SM){const c=Ic(i);let h=Pc*r;const f=e.offset||0,p=(n-f)*6,x=(n+r-f)*6;for(let m=0;m<3;m++){const v=t[m],g=(t[m+3]-v)/Zn;if(r<Ru){for(let E=0;E<r;E++){const d=p+E*6,l=e[d+2*m];let b=E;for(;b>0&&e[Ri[b-1]+2*m]>l;)Ri[b]=Ri[b-1],b--;Ri[b]=d}for(let E=0;E<3;E++)Vn[E]=1/0,Vn[E+3]=-1/0,Oo[E]=1/0,Oo[E+3]=-1/0;for(let E=r-1;E>=0;E--)Rf(Ri[E],e,Oo),Cf.set(Oo,E*6);for(let E=0;E<r-1;E++){Rf(Ri[E],e,Vn);const d=e[Ri[E+1]+2*m];if(e[Ri[E]+2*m]===d)continue;const l=E+1,b=r-l,u=Ic(Vn)/c,R=Pf(Cf,l*6)/c,w=Af+Pc*(u*l+R*b);w<h&&(o=m,h=w,a=d)}}else{for(let l=0;l<Zn;l++){Dc[l]=0;for(let b=0;b<3;b++)jn[l*6+b]=1/0,jn[l*6+b+3]=-1/0}for(let l=p;l<x;l+=6){let R=~~((e[l+2*m]-v)/g);R>=Zn&&(R=Zn-1),Dc[R]++,EM(l,e,jn,R*6)}const E=(Zn-1)*6;for(let l=0;l<6;l++)Lr[E+l]=jn[E+l];for(let l=Zn-2;l>=0;l--){const b=l*6,u=b+6;for(let R=0;R<3;R++)Lr[b+R]=Math.min(jn[b+R],Lr[u+R]),Lr[b+R+3]=Math.max(jn[b+R+3],Lr[u+R+3])}let d=0;for(let l=0;l<Zn-1;l++){const b=l*6,u=Dc[l];if(u!==0)for(let T=0;T<3;T++)d===0?(Vn[T]=jn[b+T],Vn[T+3]=jn[b+T+3]):(Vn[T]=Math.min(Vn[T],jn[b+T]),Vn[T+3]=Math.max(Vn[T+3],jn[b+T+3]));d+=u;let R=0,w=0;d!==0&&(R=Ic(Vn)/c);const M=r-d;M!==0&&(w=Pf(Lr,b+6)/c);const y=Af+Pc*(R*d+w*M);y<h&&(o=m,h=y,a=v+g+l*g)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:o,pos:a}}function wM(i,t,e,n){let r=0;const s=i.offset;for(let o=t,a=t+e;o<a;o++)r+=i[(o-s)*6+n*2];return r/e}function AM(i,t,e,n,r,s){let o=n,a=n+r-1;const c=s.pos,h=s.axis*2,f=e.offset||0;for(;;){for(;o<=a&&e[(o-f)*6+h]<c;)o++;for(;o<=a&&e[(a-f)*6+h]>=c;)a--;if(o<a){for(let p=0;p<t;p++){let x=i[o*t+p];i[o*t+p]=i[a*t+p],i[a*t+p]=x}for(let p=0;p<6;p++){const x=o-f,m=a-f,v=e[x*6+p];e[x*6+p]=e[m*6+p],e[m*6+p]=v}o++,a--}else return o}}const RM=Math.pow(2,32),Dr=new Float32Array(6),Bo=new Float32Array(6);function CM(i,t,e,n,r,s){const{maxDepth:o,verbose:a,targetLeafSize:c,_strictLeafSize:h=1/0,strategy:f,onProgress:p,useSharedArrayBuffer:x=!1}=r,m=i.primitiveBuffer,v=i.primitiveBufferStride,S=x?SharedArrayBuffer:ArrayBuffer,_=new S(En*Math.max(1,2*Math.ceil(n)-1)),g=new Float32Array(_),E=new Uint32Array(_),d=new Uint16Array(_);let l=0,b=!1;return Lc(t,e,n,Dr,Bo),w(e,n,0),_.slice(0,l*En);function u(M){p&&p((M-s.offset)/s.count)}function R(M,y,T){const A=M*2;E[M+6]=y,d[A+14]=T,d[A+15]=Mp,u(y+T)}function w(M,y,T){const A=l++,C=A*De;g.set(Dr,C),!b&&T>=o&&(b=!0,a&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));const F=y>h;if(y<=c&&!F||T>=o){R(C,M,y);return}const N=TM(Dr,Bo,t,M,y,f);let O=N.axis===-1?-1:AM(m,v,t,M,y,N);if(N.axis===-1||O===M||O===M+y){if(!F){R(C,M,y);return}N.axis=Math.max(0,Kl(Dr)),O=M+Math.max(1,Math.floor(y/2))}E[C+7]=N.axis;const B=O-M;Lc(t,M,B,Dr,Bo),w(M,B,T+1);const V=l-A;if(V>RM)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");E[C+6]=V;const W=y-B;Lc(t,O,W,Dr,Bo),w(O,W,T+1)}}function PM(i,t){const e=i.getRootRanges(t.range),n=e[0],r=e[e.length-1],s={offset:n.offset,count:r.offset+r.count-n.offset},o=new Float32Array(6*s.count);o.offset=s.offset,i.computePrimitiveBounds(s.offset,s.count,o),i._roots=e.map(a=>CM(i,o,a.offset,a.count,t,s))}class Cu{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class IM{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const ae=new IM;let Fi,$r;const Ur=[],zo=new Cu(()=>new Xe);function LM(i,t,e,n,r,s){Fi=zo.getPrimitive(),$r=zo.getPrimitive(),Ur.push(Fi,$r),ae.setBuffer(i._roots[t]);const o=Jl(0,i.geometry,e,n,r,s);ae.clearBuffer(),zo.releasePrimitive(Fi),zo.releasePrimitive($r),Ur.pop(),Ur.pop();const a=Ur.length;return a>0&&($r=Ur[a-1],Fi=Ur[a-2]),o}function Jl(i,t,e,n,r=null,s=0,o=0){const{float32Array:a,uint16Array:c,uint32Array:h}=ae;let f=i*2;if(Ce(f,c)){const v=Ge(i,h),S=$e(f,c);return we(i,a,Fi),n(v,S,!1,o,s+i/De,Fi)}else{let A=function(F){const{uint16Array:N,uint32Array:O}=ae;let B=F*2;for(;!Ce(B,N);)F=Fe(F),B=F*2;return Ge(F,O)},C=function(F){const{uint16Array:N,uint32Array:O}=ae;let B=F*2;for(;!Ce(B,N);)F=Oe(F,O),B=F*2;return Ge(F,O)+$e(B,N)};var x=A,m=C;const v=Fe(i),S=Oe(i,h);let _=v,g=S,E,d,l,b;if(r&&(l=Fi,b=$r,we(_,a,l),we(g,a,b),E=r(l),d=r(b),d<E)){_=S,g=v;const F=E;E=d,d=F,l=b}l||(l=Fi,we(_,a,l));const u=Ce(_*2,c),R=e(l,u,E,o+1,s+_/De);let w;if(R===wf){const F=A(_),O=C(_)-F;w=n(F,O,!0,o+1,s+_/De,l)}else w=R&&Jl(_,t,e,n,r,s,o+1);if(w)return!0;b=$r,we(g,a,b);const M=Ce(g*2,c),y=e(b,M,d,o+1,s+g/De);let T;if(y===wf){const F=A(g),O=C(g)-F;T=n(F,O,!0,o+1,s+g/De,b)}else T=y&&Jl(g,t,e,n,r,s,o+1);return!!T}}const ks=new ae.constructor,Aa=new ae.constructor,Pi=new Cu(()=>new Xe),Nr=new Xe,Fr=new Xe,Uc=new Xe,Nc=new Xe;let Fc=!1;function DM(i,t,e,n){if(Fc)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Fc=!0;const r=i._roots,s=t._roots;let o,a=0,c=0;const h=new $t().copy(e).invert();for(let f=0,p=r.length;f<p;f++){ks.setBuffer(r[f]),c=0;const x=Pi.getPrimitive();we(0,ks.float32Array,x),x.applyMatrix4(h);for(let m=0,v=s.length;m<v&&(Aa.setBuffer(s[m]),o=Gn(0,0,e,h,n,a,c,0,0,x),Aa.clearBuffer(),c+=s[m].byteLength/En,!o);m++);if(Pi.releasePrimitive(x),ks.clearBuffer(),a+=r[f].byteLength/En,o)break}return Fc=!1,o}function Gn(i,t,e,n,r,s=0,o=0,a=0,c=0,h=null,f=!1){let p,x;f?(p=Aa,x=ks):(p=ks,x=Aa);const m=p.float32Array,v=p.uint32Array,S=p.uint16Array,_=x.float32Array,g=x.uint32Array,E=x.uint16Array,d=i*2,l=t*2,b=Ce(d,S),u=Ce(l,E);let R=!1;if(u&&b)f?R=r(Ge(t,g),$e(t*2,E),Ge(i,v),$e(i*2,S),c,o+t/De,a,s+i/De):R=r(Ge(i,v),$e(i*2,S),Ge(t,g),$e(t*2,E),a,s+i/De,c,o+t/De);else if(u){const w=Pi.getPrimitive();we(t,_,w),w.applyMatrix4(e);const M=Fe(i),y=Oe(i,v);we(M,m,Nr),we(y,m,Fr);const T=w.intersectsBox(Nr),A=w.intersectsBox(Fr);R=T&&Gn(t,M,n,e,r,o,s,c,a+1,w,!f)||A&&Gn(t,y,n,e,r,o,s,c,a+1,w,!f),Pi.releasePrimitive(w)}else{const w=Fe(t),M=Oe(t,g);we(w,_,Uc),we(M,_,Nc);const y=h.intersectsBox(Uc),T=h.intersectsBox(Nc);if(y&&T)R=Gn(i,w,e,n,r,s,o,a,c+1,h,f)||Gn(i,M,e,n,r,s,o,a,c+1,h,f);else if(y)if(b)R=Gn(i,w,e,n,r,s,o,a,c+1,h,f);else{const A=Pi.getPrimitive();A.copy(Uc).applyMatrix4(e);const C=Fe(i),F=Oe(i,v);we(C,m,Nr),we(F,m,Fr);const N=A.intersectsBox(Nr),O=A.intersectsBox(Fr);R=N&&Gn(w,C,n,e,r,o,s,c,a+1,A,!f)||O&&Gn(w,F,n,e,r,o,s,c,a+1,A,!f),Pi.releasePrimitive(A)}else if(T)if(b)R=Gn(i,M,e,n,r,s,o,a,c+1,h,f);else{const A=Pi.getPrimitive();A.copy(Nc).applyMatrix4(e);const C=Fe(i),F=Oe(i,v);we(C,m,Nr),we(F,m,Fr);const N=A.intersectsBox(Nr),O=A.intersectsBox(Fr);R=N&&Gn(M,C,n,e,r,o,s,c,a+1,A,!f)||O&&Gn(M,F,n,e,r,o,s,c,a+1,A,!f),Pi.releasePrimitive(A)}}return R}const Oc=new class{constructor(){let i=null,t=null,e=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,o)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=o,this.buffer=i=s._roots[o],this.uint16Array=e=new Uint16Array(i),this.uint32Array=t=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=e=null,this.uint32Array=t=null},this.getRangeStart=s=>{let o=s*2;for(;!Ce(o,e);)s=Fe(s),o=s*2;return Ge(s,t)},this.getRangeEnd=s=>{let o=s*2;for(;!Ce(o,e);)s=Oe(s,t),o=s*2;return Ge(s,t)+$e(o,e)};const r=(s,o,a)=>{const c=o*2,h=Ce(c,e);if(!s(a,h,o)&&!h){const p=Fe(o),x=Oe(o,t);r(s,p,a+1),r(s,x,a+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{r(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((o,a,c)=>{if(a){const h=c*2,f=t[c+6],p=e[h+14];return s(o,a,new Float32Array(i,c*4,6),f,p)}else{const h=Au(c,t);return s(o,a,new Float32Array(i,c*4,6),h)}})}}},If=new Xe,Or=new Float32Array(6);class UM{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(t){t={...Sp,...t},"maxLeafSize"in t&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafSize}),PM(this,t)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(t,e,n,r){let s=1/0,o=1/0,a=1/0,c=-1/0,h=-1/0,f=-1/0;for(let p=t,x=t+e;p<x;p++){this.writePrimitiveBounds(p,Or,0);const[m,v,S,_,g,E]=Or;m<s&&(s=m),_>c&&(c=_),v<o&&(o=v),g>h&&(h=g),S<a&&(a=S),E>f&&(f=E)}return n[r+0]=s,n[r+1]=o,n[r+2]=a,n[r+3]=c,n[r+4]=h,n[r+5]=f,n}computePrimitiveBounds(t,e,n){const r=n.offset||0;for(let s=t,o=t+e;s<o;s++){this.writePrimitiveBounds(s,Or,0);const[a,c,h,f,p,x]=Or,m=(a+f)/2,v=(c+p)/2,S=(h+x)/2,_=(f-a)/2,g=(p-c)/2,E=(x-h)/2,d=(s-r)*6;n[d+0]=m,n[d+1]=_+(Math.abs(m)+_)*fa,n[d+2]=v,n[d+3]=g+(Math.abs(v)+g)*fa,n[d+4]=S,n[d+5]=E+(Math.abs(S)+E)*fa}return n}shiftPrimitiveOffsets(t){const e=this._indirectBuffer;if(e)for(let n=0,r=e.length;n<r;n++)e[n]+=t;else{const n=this._roots;for(let r=0;r<n.length;r++){const s=n[r],o=new Uint32Array(s),a=new Uint16Array(s),c=s.byteLength/En;for(let h=0;h<c;h++){const f=De*h,p=2*f;Ce(p,a)&&(o[f+6]+=t)}}}}traverse(t,e=0){Oc.setBVH(this,e),Oc.traverse(t),Oc.reset()}refit(){const t=this._roots;for(let e=0,n=t.length;e<n;e++){const r=t[e],s=new Uint32Array(r),o=new Uint16Array(r),a=new Float32Array(r),c=r.byteLength/En;for(let h=c-1;h>=0;h--){const f=h*De,p=f*2;if(Ce(p,o)){const m=Ge(f,s),v=$e(p,o);this.writePrimitiveRangeBounds(m,v,Or,0),a.set(Or,f)}else{const m=Fe(f),v=Oe(f,s);for(let S=0;S<3;S++){const _=a[m+S],g=a[m+S+3],E=a[v+S],d=a[v+S+3];a[f+S]=_<E?_:E,a[f+S+3]=g>d?g:d}}}}}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{we(0,new Float32Array(n),If),t.union(If)}),t}shapecast(t){let{boundsTraverseOrder:e,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:s,scratchPrimitive:o,iterate:a}=t;if(r&&s){const p=r;r=(x,m,v,S,_)=>p(x,m,v,S,_)?!0:a(x,m,this,s,v,S,o)}else r||(s?r=(p,x,m,v)=>a(p,x,this,s,m,v,o):r=(p,x,m)=>m);let c=!1,h=0;const f=this._roots;for(let p=0,x=f.length;p<x;p++){const m=f[p];if(c=LM(this,p,n,r,e,h),c)break;h+=m.byteLength/En}return c}bvhcast(t,e,n){let{intersectsRanges:r}=n;return DM(this,t,e,r)}}function NM(){return typeof SharedArrayBuffer<"u"}function Pu(i){return i.index?i.index.count:i.attributes.position.count}function Oa(i){return Pu(i)/3}function FM(i,t=ArrayBuffer){return i>65535?new Uint32Array(new t(4*i)):new Uint16Array(new t(2*i))}function OM(i,t){if(!i.index){const e=i.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=FM(e,n);i.setIndex(new Me(r,1));for(let s=0;s<e;s++)r[s]=s}}function BM(i,t,e){const n=Pu(i)/e,r=t||i.drawRange,s=r.start/e,o=(r.start+r.count)/e,a=Math.max(0,s),c=Math.min(n,o)-a;return{offset:Math.floor(a),count:Math.floor(c)}}function zM(i,t){return i.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Lf(i,t,e){const n=BM(i,t,e),r=zM(i,e);if(!r.length)return[n];const s=[],o=n.offset,a=n.offset+n.count,c=Pu(i)/e,h=[];for(const x of r){const{offset:m,count:v}=x,S=m,_=isFinite(v)?v:c-m,g=m+_;S<a&&g>o&&(h.push({pos:Math.max(o,S),isStart:!0}),h.push({pos:Math.min(a,g),isStart:!1}))}h.sort((x,m)=>x.pos!==m.pos?x.pos-m.pos:x.type==="end"?-1:1);let f=0,p=null;for(const x of h){const m=x.pos;f!==0&&m!==p&&s.push({offset:p,count:m-p}),f+=x.isStart?1:-1,p=m}return s}function VM(i,t){const e=i[i.length-1],n=e.offset+e.count>2**16,r=i.reduce((h,f)=>h+f.count,0),s=n?4:2,o=t?new SharedArrayBuffer(r*s):new ArrayBuffer(r*s),a=n?new Uint32Array(o):new Uint16Array(o);let c=0;for(let h=0;h<i.length;h++){const{offset:f,count:p}=i[h];for(let x=0;x<p;x++)a[c+x]=f+x;c+=p}return a}class kM extends UM{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(t){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(t){}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(e.useSharedArrayBuffer&&!NM())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=t,this.resolvePrimitiveIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,e={...Sp,...e},e[wu]||this.init(e)}init(t){const{geometry:e,primitiveStride:n}=this;if(t.indirect){const r=Lf(e,t.range,n),s=VM(r,t.useSharedArrayBuffer);this._indirectBuffer=s}else OM(e,t);super.init(t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Xe))}getRootRanges(t){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Lf(this.geometry,t,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class yi{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,r=-1/0;for(let s=0,o=t.length;s<o;s++){const c=t[s][e];n=c<n?c:n,r=c>r?c:r}this.min=n,this.max=r}setFromPoints(t,e){let n=1/0,r=-1/0;for(let s=0,o=e.length;s<o;s++){const a=e[s],c=t.dot(a);n=c<n?c:n,r=c>r?c:r}this.min=n,this.max=r}isSeparated(t){return this.min>t.max||t.min>this.max}}yi.prototype.setFromBox=function(){const i=new I;return function(e,n){const r=n.min,s=n.max;let o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let h=0;h<=1;h++)for(let f=0;f<=1;f++){i.x=r.x*c+s.x*(1-c),i.y=r.y*h+s.y*(1-h),i.z=r.z*f+s.z*(1-f);const p=e.dot(i);o=Math.min(p,o),a=Math.max(p,a)}this.min=o,this.max=a}}();const HM=function(){const i=new I,t=new I,e=new I;return function(r,s,o){const a=r.start,c=i,h=s.start,f=t;e.subVectors(a,h),i.subVectors(r.end,r.start),t.subVectors(s.end,s.start);const p=e.dot(f),x=f.dot(c),m=f.dot(f),v=e.dot(c),_=c.dot(c)*m-x*x;let g,E;_!==0?g=(p*x-v*m)/_:g=0,E=(p+g*x)/m,o.x=g,o.y=E}}(),Iu=function(){const i=new ct,t=new I,e=new I;return function(r,s,o,a){HM(r,s,i);let c=i.x,h=i.y;if(c>=0&&c<=1&&h>=0&&h<=1){r.at(c,o),s.at(h,a);return}else if(c>=0&&c<=1){h<0?s.at(0,a):s.at(1,a),r.closestPointToPoint(a,!0,o);return}else if(h>=0&&h<=1){c<0?r.at(0,o):r.at(1,o),s.closestPointToPoint(o,!0,a);return}else{let f;c<0?f=r.start:f=r.end;let p;h<0?p=s.start:p=s.end;const x=t,m=e;if(r.closestPointToPoint(p,!0,t),s.closestPointToPoint(f,!0,e),x.distanceToSquared(p)<=m.distanceToSquared(f)){o.copy(x),a.copy(p);return}else{o.copy(f),a.copy(m);return}}}}(),GM=function(){const i=new I,t=new I,e=new In,n=new We;return function(s,o){const{radius:a,center:c}=s,{a:h,b:f,c:p}=o;if(n.start=h,n.end=f,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a||(n.start=h,n.end=p,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a)||(n.start=f,n.end=p,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a))return!0;const S=o.getPlane(e);if(Math.abs(S.distanceToPoint(c))<=a){const g=S.projectPoint(c,t);if(o.containsPoint(g))return!0}return!1}}(),WM=["x","y","z"],pi=1e-15,Df=pi*pi;function Cn(i){return Math.abs(i)<pi}class pn extends ge{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new I),this.satBounds=new Array(4).fill().map(()=>new yi),this.points=[this.a,this.b,this.c],this.plane=new In,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new We,this.needsUpdate=!0}intersectsSphere(t){return GM(t,this)}update(){const t=this.a,e=this.b,n=this.c,r=this.points,s=this.satAxes,o=this.satBounds,a=s[0],c=o[0];this.getNormal(a),c.setFromPoints(a,r);const h=s[1],f=o[1];h.subVectors(t,e),f.setFromPoints(h,r);const p=s[2],x=o[2];p.subVectors(e,n),x.setFromPoints(p,r);const m=s[3],v=o[3];m.subVectors(n,t),v.setFromPoints(m,r);const S=h.length(),_=p.length(),g=m.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,S<pi?_<pi||g<pi?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(n)):_<pi?g<pi?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(t)):g<pi&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}}pn.prototype.closestPointToSegment=function(){const i=new I,t=new I,e=new We;return function(r,s=null,o=null){this.needsUpdate&&this.update();const{start:a,end:c}=r,h=this.points;let f,p=1/0;const x=this.plane.distanceToPoint(a),m=this.plane.distanceToPoint(c);if(x*m<0&&this.plane.intersectLine(r,i)!==null&&this.containsPoint(i))return s&&s.copy(i),o&&o.copy(i),0;for(let v=0;v<3;v++){const S=(v+1)%3;e.start.copy(h[v]),e.end.copy(h[S]),Iu(e,r,i,t),f=i.distanceToSquared(t),f<p&&(p=f,s&&s.copy(i),o&&o.copy(t))}return this.closestPointToPoint(a,i),f=a.distanceToSquared(i),f<p&&(p=f,s&&s.copy(i),o&&o.copy(a)),this.closestPointToPoint(c,i),f=c.distanceToSquared(i),f<p&&(p=f,s&&s.copy(i),o&&o.copy(c)),Math.sqrt(p)}}();pn.prototype.intersectsTriangle=function(){const i=new pn,t=new yi,e=new yi,n=new I,r=new I,s=new I,o=new I,a=new We,c=new We,h=new I,f=new ct,p=new ct;function x(d,l,b,u){const R=n;!d.isDegenerateIntoPoint&&!d.isDegenerateIntoSegment?R.copy(d.plane.normal):R.copy(l.plane.normal);const w=d.satBounds,M=d.satAxes;for(let A=1;A<4;A++){const C=w[A],F=M[A];if(t.setFromPoints(F,l.points),C.isSeparated(t)||(o.copy(R).cross(F),t.setFromPoints(o,d.points),e.setFromPoints(o,l.points),t.isSeparated(e)))return!1}const y=l.satBounds,T=l.satAxes;for(let A=1;A<4;A++){const C=y[A],F=T[A];if(t.setFromPoints(F,d.points),C.isSeparated(t)||(o.crossVectors(R,F),t.setFromPoints(o,d.points),e.setFromPoints(o,l.points),t.isSeparated(e)))return!1}return b&&(u||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),b.start.set(0,0,0),b.end.set(0,0,0)),!0}function m(d,l,b,u,R,w,M,y,T,A,C){let F=M/(M-y);A.x=u+(R-u)*F,C.start.subVectors(l,d).multiplyScalar(F).add(d),F=M/(M-T),A.y=u+(w-u)*F,C.end.subVectors(b,d).multiplyScalar(F).add(d)}function v(d,l,b,u,R,w,M,y,T,A,C){if(R>0)m(d.c,d.a,d.b,u,l,b,T,M,y,A,C);else if(w>0)m(d.b,d.a,d.c,b,l,u,y,M,T,A,C);else if(y*T>0||M!=0)m(d.a,d.b,d.c,l,b,u,M,y,T,A,C);else if(y!=0)m(d.b,d.a,d.c,b,l,u,y,M,T,A,C);else if(T!=0)m(d.c,d.a,d.b,u,l,b,T,M,y,A,C);else return!0;return!1}function S(d,l,b,u){const R=l.degenerateSegment,w=d.plane.distanceToPoint(R.start),M=d.plane.distanceToPoint(R.end);return Cn(w)?Cn(M)?x(d,l,b,u):(b&&(b.start.copy(R.start),b.end.copy(R.start)),d.containsPoint(R.start)):Cn(M)?(b&&(b.start.copy(R.end),b.end.copy(R.end)),d.containsPoint(R.end)):d.plane.intersectLine(R,n)!=null?(b&&(b.start.copy(n),b.end.copy(n)),d.containsPoint(n)):!1}function _(d,l,b){const u=l.a;return Cn(d.plane.distanceToPoint(u))&&d.containsPoint(u)?(b&&(b.start.copy(u),b.end.copy(u)),!0):!1}function g(d,l,b){const u=d.degenerateSegment,R=l.a;return u.closestPointToPoint(R,!0,n),R.distanceToSquared(n)<Df?(b&&(b.start.copy(R),b.end.copy(R)),!0):!1}function E(d,l,b,u){if(d.isDegenerateIntoSegment)if(l.isDegenerateIntoSegment){const R=d.degenerateSegment,w=l.degenerateSegment,M=r,y=s;R.delta(M),w.delta(y);const T=n.subVectors(w.start,R.start),A=M.x*y.y-M.y*y.x;if(Cn(A))return!1;const C=(T.x*y.y-T.y*y.x)/A,F=-(M.x*T.y-M.y*T.x)/A;if(C<0||C>1||F<0||F>1)return!1;const N=R.start.z+M.z*C,O=w.start.z+y.z*F;return Cn(N-O)?(b&&(b.start.copy(R.start).addScaledVector(M,C),b.end.copy(R.start).addScaledVector(M,C)),!0):!1}else return l.isDegenerateIntoPoint?g(d,l,b):S(l,d,b,u);else{if(d.isDegenerateIntoPoint)return l.isDegenerateIntoPoint?l.a.distanceToSquared(d.a)<Df?(b&&(b.start.copy(d.a),b.end.copy(d.a)),!0):!1:l.isDegenerateIntoSegment?g(l,d,b):_(l,d,b);if(l.isDegenerateIntoPoint)return _(d,l,b);if(l.isDegenerateIntoSegment)return S(d,l,b,u)}}return function(l,b=null,u=!1){this.needsUpdate&&this.update(),l.isExtendedTriangle?l.needsUpdate&&l.update():(i.copy(l),i.update(),l=i);const R=E(this,l,b,u);if(R!==void 0)return R;const w=this.plane,M=l.plane;let y=M.distanceToPoint(this.a),T=M.distanceToPoint(this.b),A=M.distanceToPoint(this.c);Cn(y)&&(y=0),Cn(T)&&(T=0),Cn(A)&&(A=0);const C=y*T,F=y*A;if(C>0&&F>0)return!1;let N=w.distanceToPoint(l.a),O=w.distanceToPoint(l.b),B=w.distanceToPoint(l.c);Cn(N)&&(N=0),Cn(O)&&(O=0),Cn(B)&&(B=0);const V=N*O,W=N*B;if(V>0&&W>0)return!1;r.copy(w.normal),s.copy(M.normal);const nt=r.cross(s);let it=0,ht=Math.abs(nt.x);const _t=Math.abs(nt.y);_t>ht&&(ht=_t,it=1),Math.abs(nt.z)>ht&&(it=2);const Tt=WM[it],Y=this.a[Tt],j=this.b[Tt],st=this.c[Tt],lt=l.a[Tt],ut=l.b[Tt],Rt=l.c[Tt];if(v(this,Y,j,st,C,F,y,T,A,f,a))return x(this,l,b,u);if(v(l,lt,ut,Rt,V,W,N,O,B,p,c))return x(this,l,b,u);if(f.y<f.x){const qt=f.y;f.y=f.x,f.x=qt,h.copy(a.start),a.start.copy(a.end),a.end.copy(h)}if(p.y<p.x){const qt=p.y;p.y=p.x,p.x=qt,h.copy(c.start),c.start.copy(c.end),c.end.copy(h)}return f.y<p.x||p.y<f.x?!1:(b&&(p.x>f.x?b.start.copy(c.start):b.start.copy(a.start),p.y<f.y?b.end.copy(c.end):b.end.copy(a.end)),!0)}}();pn.prototype.distanceToPoint=function(){const i=new I;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}}();pn.prototype.distanceToTriangle=function(){const i=new I,t=new I,e=["a","b","c"],n=new We,r=new We;return function(o,a=null,c=null){const h=a||c?n:null;if(this.intersectsTriangle(o,h,!0))return(a||c)&&(a&&h.getCenter(a),c&&h.getCenter(c)),0;let f=1/0;for(let p=0;p<3;p++){let x;const m=e[p],v=o[m];this.closestPointToPoint(v,i),x=v.distanceToSquared(i),x<f&&(f=x,a&&a.copy(i),c&&c.copy(v));const S=this[m];o.closestPointToPoint(S,i),x=S.distanceToSquared(i),x<f&&(f=x,a&&a.copy(S),c&&c.copy(i))}for(let p=0;p<3;p++){const x=e[p],m=e[(p+1)%3];n.set(this[x],this[m]);for(let v=0;v<3;v++){const S=e[v],_=e[(v+1)%3];r.set(o[S],o[_]),Iu(n,r,i,t);const g=i.distanceToSquared(t);g<f&&(f=g,a&&a.copy(i),c&&c.copy(t))}}return Math.sqrt(f)}}();class rn{constructor(t,e,n){this.isOrientedBox=!0,this.min=new I,this.max=new I,this.matrix=new $t,this.invMatrix=new $t,this.points=new Array(8).fill().map(()=>new I),this.satAxes=new Array(3).fill().map(()=>new I),this.satBounds=new Array(3).fill().map(()=>new yi),this.alignedSatBounds=new Array(3).fill().map(()=>new yi),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}rn.prototype.update=function(){return function(){const t=this.matrix,e=this.min,n=this.max,r=this.points;for(let h=0;h<=1;h++)for(let f=0;f<=1;f++)for(let p=0;p<=1;p++){const x=1*h|2*f|4*p,m=r[x];m.x=h?n.x:e.x,m.y=f?n.y:e.y,m.z=p?n.z:e.z,m.applyMatrix4(t)}const s=this.satBounds,o=this.satAxes,a=r[0];for(let h=0;h<3;h++){const f=o[h],p=s[h],x=1<<h,m=r[x];f.subVectors(a,m),p.setFromPoints(f,r)}const c=this.alignedSatBounds;c[0].setFromPointsField(r,"x"),c[1].setFromPointsField(r,"y"),c[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();rn.prototype.intersectsBox=function(){const i=new yi;return function(e){this.needsUpdate&&this.update();const n=e.min,r=e.max,s=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(i.min=n.x,i.max=r.x,a[0].isSeparated(i)||(i.min=n.y,i.max=r.y,a[1].isSeparated(i))||(i.min=n.z,i.max=r.z,a[2].isSeparated(i)))return!1;for(let c=0;c<3;c++){const h=o[c],f=s[c];if(i.setFromBox(h,e),f.isSeparated(i))return!1}return!0}}();rn.prototype.intersectsTriangle=function(){const i=new pn,t=new Array(3),e=new yi,n=new yi,r=new I;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(i.copy(o),i.update(),o=i);const a=this.satBounds,c=this.satAxes;t[0]=o.a,t[1]=o.b,t[2]=o.c;for(let x=0;x<3;x++){const m=a[x],v=c[x];if(e.setFromPoints(v,t),m.isSeparated(e))return!1}const h=o.satBounds,f=o.satAxes,p=this.points;for(let x=0;x<3;x++){const m=h[x],v=f[x];if(e.setFromPoints(v,p),m.isSeparated(e))return!1}for(let x=0;x<3;x++){const m=c[x];for(let v=0;v<4;v++){const S=f[v];if(r.crossVectors(m,S),e.setFromPoints(r,t),n.setFromPoints(r,p),e.isSeparated(n))return!1}}return!0}}();rn.prototype.closestPointToPoint=function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}}();rn.prototype.distanceToPoint=function(){const i=new I;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}}();rn.prototype.distanceToBox=function(){const i=["x","y","z"],t=new Array(12).fill().map(()=>new We),e=new Array(12).fill().map(()=>new We),n=new I,r=new I;return function(o,a=0,c=null,h=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||h)&&(o.getCenter(r),this.closestPointToPoint(r,n),o.closestPointToPoint(n,r),c&&c.copy(n),h&&h.copy(r)),0;const f=a*a,p=o.min,x=o.max,m=this.points;let v=1/0;for(let _=0;_<8;_++){const g=m[_];r.copy(g).clamp(p,x);const E=g.distanceToSquared(r);if(E<v&&(v=E,c&&c.copy(g),h&&h.copy(r),E<f))return Math.sqrt(E)}let S=0;for(let _=0;_<3;_++)for(let g=0;g<=1;g++)for(let E=0;E<=1;E++){const d=(_+1)%3,l=(_+2)%3,b=g<<d|E<<l,u=1<<_|g<<d|E<<l,R=m[b],w=m[u];t[S].set(R,w);const y=i[_],T=i[d],A=i[l],C=e[S],F=C.start,N=C.end;F[y]=p[y],F[T]=g?p[T]:x[T],F[A]=E?p[A]:x[A],N[y]=x[y],N[T]=g?p[T]:x[T],N[A]=E?p[A]:x[A],S++}for(let _=0;_<=1;_++)for(let g=0;g<=1;g++)for(let E=0;E<=1;E++){r.x=_?x.x:p.x,r.y=g?x.y:p.y,r.z=E?x.z:p.z,this.closestPointToPoint(r,n);const d=r.distanceToSquared(n);if(d<v&&(v=d,c&&c.copy(n),h&&h.copy(r),d<f))return Math.sqrt(d)}for(let _=0;_<12;_++){const g=t[_];for(let E=0;E<12;E++){const d=e[E];Iu(g,d,n,r);const l=n.distanceToSquared(r);if(l<v&&(v=l,c&&c.copy(n),h&&h.copy(r),l<f))return Math.sqrt(l)}}return Math.sqrt(v)}}();class XM extends Cu{constructor(){super(()=>new pn)}}const Dn=new XM,Es=new I,Bc=new I;function qM(i,t,e={},n=0,r=1/0){const s=n*n,o=r*r;let a=1/0,c=null;if(i.shapecast({boundsTraverseOrder:f=>(Es.copy(t).clamp(f.min,f.max),Es.distanceToSquared(t)),intersectsBounds:(f,p,x)=>x<a&&x<o,intersectsTriangle:(f,p)=>{f.closestPointToPoint(t,Es);const x=t.distanceToSquared(Es);return x<a&&(Bc.copy(Es),a=x,c=p),x<s}}),a===1/0)return null;const h=Math.sqrt(a);return e.point?e.point.copy(Bc):e.point=Bc.clone(),e.distance=h,e.faceIndex=c,e}const Vo=parseInt(ls)>=169,YM=parseInt(ls)<=161,ji=new I,Zi=new I,$i=new I,ko=new ct,Ho=new ct,Go=new ct,Uf=new I,Nf=new I,Ff=new I,Ts=new I;function jM(i,t,e,n,r,s,o,a){let c;if(s===nn?c=i.intersectTriangle(n,e,t,!0,r):c=i.intersectTriangle(t,e,n,s!==yn,r),c===null)return null;const h=i.origin.distanceTo(r);return h<o||h>a?null:{distance:h,point:r.clone()}}function Of(i,t,e,n,r,s,o,a,c,h,f){ji.fromBufferAttribute(t,s),Zi.fromBufferAttribute(t,o),$i.fromBufferAttribute(t,a);const p=jM(i,ji,Zi,$i,Ts,c,h,f);if(p){if(n){ko.fromBufferAttribute(n,s),Ho.fromBufferAttribute(n,o),Go.fromBufferAttribute(n,a),p.uv=new ct;const m=ge.getInterpolation(Ts,ji,Zi,$i,ko,Ho,Go,p.uv);Vo||(p.uv=m)}if(r){ko.fromBufferAttribute(r,s),Ho.fromBufferAttribute(r,o),Go.fromBufferAttribute(r,a),p.uv1=new ct;const m=ge.getInterpolation(Ts,ji,Zi,$i,ko,Ho,Go,p.uv1);Vo||(p.uv1=m),YM&&(p.uv2=p.uv1)}if(e){Uf.fromBufferAttribute(e,s),Nf.fromBufferAttribute(e,o),Ff.fromBufferAttribute(e,a),p.normal=new I;const m=ge.getInterpolation(Ts,ji,Zi,$i,Uf,Nf,Ff,p.normal);p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1),Vo||(p.normal=m)}const x={a:s,b:o,c:a,normal:new I,materialIndex:0};if(ge.getNormal(ji,Zi,$i,x.normal),p.face=x,p.faceIndex=s,Vo){const m=new I;ge.getBarycoord(Ts,ji,Zi,$i,m),p.barycoord=m}}return p}function Bf(i){return i&&i.isMaterial?i.side:i}function Ba(i,t,e,n,r,s,o){const a=n*3;let c=a+0,h=a+1,f=a+2;const{index:p,groups:x}=i;i.index&&(c=p.getX(c),h=p.getX(h),f=p.getX(f));const{position:m,normal:v,uv:S,uv1:_}=i.attributes;if(Array.isArray(t)){const g=n*3;for(let E=0,d=x.length;E<d;E++){const{start:l,count:b,materialIndex:u}=x[E];if(g>=l&&g<l+b){const R=Bf(t[u]),w=Of(e,m,v,S,_,c,h,f,R,s,o);if(w)if(w.faceIndex=n,w.face.materialIndex=u,r)r.push(w);else return w}}}else{const g=Bf(t),E=Of(e,m,v,S,_,c,h,f,g,s,o);if(E)if(E.faceIndex=n,E.face.materialIndex=0,r)r.push(E);else return E}return null}function Ue(i,t,e,n){const r=i.a,s=i.b,o=i.c;let a=t,c=t+1,h=t+2;e&&(a=e.getX(a),c=e.getX(c),h=e.getX(h)),r.x=n.getX(a),r.y=n.getY(a),r.z=n.getZ(a),s.x=n.getX(c),s.y=n.getY(c),s.z=n.getZ(c),o.x=n.getX(h),o.y=n.getY(h),o.z=n.getZ(h)}function ZM(i,t,e,n,r,s,o,a){const{geometry:c,_indirectBuffer:h}=i;for(let f=n,p=n+r;f<p;f++)Ba(c,t,e,f,s,o,a)}function $M(i,t,e,n,r,s,o){const{geometry:a,_indirectBuffer:c}=i;let h=1/0,f=null;for(let p=n,x=n+r;p<x;p++){let m;m=Ba(a,t,e,p,null,s,o),m&&m.distance<h&&(f=m,h=m.distance)}return f}function KM(i,t,e,n,r,s,o){const{geometry:a}=e,{index:c}=a,h=a.attributes.position;for(let f=i,p=t+i;f<p;f++){let x;if(x=f,Ue(o,x*3,c,h),o.needsUpdate=!0,n(o,x,r,s))return!0}return!1}function JM(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,r=e.attributes.position;let s,o,a,c,h=0;const f=i._roots;for(let x=0,m=f.length;x<m;x++)s=f[x],o=new Uint32Array(s),a=new Uint16Array(s),c=new Float32Array(s),p(0,h),h+=s.byteLength;function p(x,m,v=!1){const S=x*2;if(Ce(S,a)){const _=Ge(x,o),g=$e(S,a);let E=1/0,d=1/0,l=1/0,b=-1/0,u=-1/0,R=-1/0;for(let w=3*_,M=3*(_+g);w<M;w++){let y=n[w];const T=r.getX(y),A=r.getY(y),C=r.getZ(y);T<E&&(E=T),T>b&&(b=T),A<d&&(d=A),A>u&&(u=A),C<l&&(l=C),C>R&&(R=C)}return c[x+0]!==E||c[x+1]!==d||c[x+2]!==l||c[x+3]!==b||c[x+4]!==u||c[x+5]!==R?(c[x+0]=E,c[x+1]=d,c[x+2]=l,c[x+3]=b,c[x+4]=u,c[x+5]=R,!0):!1}else{const _=Fe(x),g=Oe(x,o);let E=v,d=!1,l=!1;if(t){if(!E){const y=_/De+m/En,T=g/De+m/En;d=t.has(y),l=t.has(T),E=!d&&!l}}else d=!0,l=!0;const b=E||d,u=E||l;let R=!1;b&&(R=p(_,m,E));let w=!1;u&&(w=p(g,m,E));const M=R||w;if(M)for(let y=0;y<3;y++){const T=_+y,A=g+y,C=c[T],F=c[T+3],N=c[A],O=c[A+3];c[x+y]=C<N?C:N,c[x+y+3]=F>O?F:O}return M}}}function Un(i,t,e,n,r){let s,o,a,c,h,f;const p=1/e.direction.x,x=1/e.direction.y,m=1/e.direction.z,v=e.origin.x,S=e.origin.y,_=e.origin.z;let g=t[i],E=t[i+3],d=t[i+1],l=t[i+3+1],b=t[i+2],u=t[i+3+2];return p>=0?(s=(g-v)*p,o=(E-v)*p):(s=(E-v)*p,o=(g-v)*p),x>=0?(a=(d-S)*x,c=(l-S)*x):(a=(l-S)*x,c=(d-S)*x),s>c||a>o||((a>s||isNaN(s))&&(s=a),(c<o||isNaN(o))&&(o=c),m>=0?(h=(b-_)*m,f=(u-_)*m):(h=(u-_)*m,f=(b-_)*m),s>f||h>o)?!1:((h>s||s!==s)&&(s=h),(f<o||o!==o)&&(o=f),s<=r&&o>=n)}function QM(i,t,e,n,r,s,o,a){const{geometry:c,_indirectBuffer:h}=i;for(let f=n,p=n+r;f<p;f++){let x=h?h[f]:f;Ba(c,t,e,x,s,o,a)}}function tS(i,t,e,n,r,s,o){const{geometry:a,_indirectBuffer:c}=i;let h=1/0,f=null;for(let p=n,x=n+r;p<x;p++){let m;m=Ba(a,t,e,c?c[p]:p,null,s,o),m&&m.distance<h&&(f=m,h=m.distance)}return f}function eS(i,t,e,n,r,s,o){const{geometry:a}=e,{index:c}=a,h=a.attributes.position;for(let f=i,p=t+i;f<p;f++){let x;if(x=e.resolveTriangleIndex(f),Ue(o,x*3,c,h),o.needsUpdate=!0,n(o,x,r,s))return!0}return!1}function nS(i,t,e,n,r,s,o){ae.setBuffer(i._roots[t]),Un(0,ae.float32Array,n,s,o)&&Ql(0,i,e,n,r,s,o),ae.clearBuffer()}function Ql(i,t,e,n,r,s,o){const{float32Array:a,uint16Array:c,uint32Array:h}=ae,f=i*2;if(Ce(f,c)){const x=Ge(i,h),m=$e(f,c);ZM(t,e,n,x,m,r,s,o)}else{const x=Fe(i);Un(x,a,n,s,o)&&Ql(x,t,e,n,r,s,o);const m=Oe(i,h);Un(m,a,n,s,o)&&Ql(m,t,e,n,r,s,o)}}const iS=["x","y","z"];function rS(i,t,e,n,r,s){ae.setBuffer(i._roots[t]);let o=null;return Un(0,ae.float32Array,n,r,s)&&(o=tu(0,i,e,n,r,s)),ae.clearBuffer(),o}function tu(i,t,e,n,r,s){const{float32Array:o,uint16Array:a,uint32Array:c}=ae;let h=i*2;if(Ce(h,a)){const p=Ge(i,c),x=$e(h,a);return $M(t,e,n,p,x,r,s)}else{const p=Au(i,c),x=iS[p],v=n.direction[x]>=0;let S,_;v?(S=Fe(i),_=Oe(i,c)):(S=Oe(i,c),_=Fe(i));const E=Un(S,o,n,r,s)?tu(S,t,e,n,r,s):null;if(E){const b=E.point[x];if(v?b<=o[_+p]:b>=o[_+p+3])return E}const l=Un(_,o,n,r,s)?tu(_,t,e,n,r,s):null;return E&&l?E.distance<=l.distance?E:l:E||l||null}}const Wo=new Xe,Br=new pn,zr=new pn,ws=new $t,zf=new rn,Xo=new rn;function sS(i,t,e,n){ae.setBuffer(i._roots[t]);const r=eu(0,i,e,n);return ae.clearBuffer(),r}function eu(i,t,e,n,r=null){const{float32Array:s,uint16Array:o,uint32Array:a}=ae;let c=i*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),zf.set(e.boundingBox.min,e.boundingBox.max,n),r=zf),Ce(c,o)){const f=t.geometry,p=f.index,x=f.attributes.position,m=e.index,v=e.attributes.position,S=Ge(i,a),_=$e(c,o);if(ws.copy(n).invert(),e.boundsTree)return we(i,s,Xo),Xo.matrix.copy(ws),Xo.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:E=>Xo.intersectsBox(E),intersectsTriangle:E=>{E.a.applyMatrix4(n),E.b.applyMatrix4(n),E.c.applyMatrix4(n),E.needsUpdate=!0;for(let d=S*3,l=(_+S)*3;d<l;d+=3)if(Ue(zr,d,p,x),zr.needsUpdate=!0,E.intersectsTriangle(zr))return!0;return!1}});{const g=Oa(e);for(let E=S*3,d=(_+S)*3;E<d;E+=3){Ue(Br,E,p,x),Br.a.applyMatrix4(ws),Br.b.applyMatrix4(ws),Br.c.applyMatrix4(ws),Br.needsUpdate=!0;for(let l=0,b=g*3;l<b;l+=3)if(Ue(zr,l,m,v),zr.needsUpdate=!0,Br.intersectsTriangle(zr))return!0}}}else{const f=Fe(i),p=Oe(i,a);return we(f,s,Wo),!!(r.intersectsBox(Wo)&&eu(f,t,e,n,r)||(we(p,s,Wo),r.intersectsBox(Wo)&&eu(p,t,e,n,r)))}}const qo=new $t,zc=new rn,As=new rn,oS=new I,aS=new I,cS=new I,lS=new I;function uS(i,t,e,n={},r={},s=0,o=1/0){t.boundingBox||t.computeBoundingBox(),zc.set(t.boundingBox.min,t.boundingBox.max,e),zc.needsUpdate=!0;const a=i.geometry,c=a.attributes.position,h=a.index,f=t.attributes.position,p=t.index,x=Dn.getPrimitive(),m=Dn.getPrimitive();let v=oS,S=aS,_=null,g=null;r&&(_=cS,g=lS);let E=1/0,d=null,l=null;return qo.copy(e).invert(),As.matrix.copy(qo),i.shapecast({boundsTraverseOrder:b=>zc.distanceToBox(b),intersectsBounds:(b,u,R)=>R<E&&R<o?(u&&(As.min.copy(b.min),As.max.copy(b.max),As.needsUpdate=!0),!0):!1,intersectsRange:(b,u)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:w=>As.distanceToBox(w),intersectsBounds:(w,M,y)=>y<E&&y<o,intersectsRange:(w,M)=>{for(let y=w,T=w+M;y<T;y++){Ue(m,3*y,p,f),m.a.applyMatrix4(e),m.b.applyMatrix4(e),m.c.applyMatrix4(e),m.needsUpdate=!0;for(let A=b,C=b+u;A<C;A++){Ue(x,3*A,h,c),x.needsUpdate=!0;const F=x.distanceToTriangle(m,v,_);if(F<E&&(S.copy(v),g&&g.copy(_),E=F,d=A,l=y),F<s)return!0}}}});{const R=Oa(t);for(let w=0,M=R;w<M;w++){Ue(m,3*w,p,f),m.a.applyMatrix4(e),m.b.applyMatrix4(e),m.c.applyMatrix4(e),m.needsUpdate=!0;for(let y=b,T=b+u;y<T;y++){Ue(x,3*y,h,c),x.needsUpdate=!0;const A=x.distanceToTriangle(m,v,_);if(A<E&&(S.copy(v),g&&g.copy(_),E=A,d=y,l=w),A<s)return!0}}}}}),Dn.releasePrimitive(x),Dn.releasePrimitive(m),E===1/0?null:(n.point?n.point.copy(S):n.point=S.clone(),n.distance=E,n.faceIndex=d,r&&(r.point?r.point.copy(g):r.point=g.clone(),r.point.applyMatrix4(qo),S.applyMatrix4(qo),r.distance=S.sub(r.point).length(),r.faceIndex=l),n)}function hS(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,r=e.attributes.position;let s,o,a,c,h=0;const f=i._roots;for(let x=0,m=f.length;x<m;x++)s=f[x],o=new Uint32Array(s),a=new Uint16Array(s),c=new Float32Array(s),p(0,h),h+=s.byteLength;function p(x,m,v=!1){const S=x*2;if(Ce(S,a)){const _=Ge(x,o),g=$e(S,a);let E=1/0,d=1/0,l=1/0,b=-1/0,u=-1/0,R=-1/0;for(let w=_,M=_+g;w<M;w++){const y=3*i.resolveTriangleIndex(w);for(let T=0;T<3;T++){let A=y+T;A=n?n[A]:A;const C=r.getX(A),F=r.getY(A),N=r.getZ(A);C<E&&(E=C),C>b&&(b=C),F<d&&(d=F),F>u&&(u=F),N<l&&(l=N),N>R&&(R=N)}}return c[x+0]!==E||c[x+1]!==d||c[x+2]!==l||c[x+3]!==b||c[x+4]!==u||c[x+5]!==R?(c[x+0]=E,c[x+1]=d,c[x+2]=l,c[x+3]=b,c[x+4]=u,c[x+5]=R,!0):!1}else{const _=Fe(x),g=Oe(x,o);let E=v,d=!1,l=!1;if(t){if(!E){const y=_/De+m/En,T=g/De+m/En;d=t.has(y),l=t.has(T),E=!d&&!l}}else d=!0,l=!0;const b=E||d,u=E||l;let R=!1;b&&(R=p(_,m,E));let w=!1;u&&(w=p(g,m,E));const M=R||w;if(M)for(let y=0;y<3;y++){const T=_+y,A=g+y,C=c[T],F=c[T+3],N=c[A],O=c[A+3];c[x+y]=C<N?C:N,c[x+y+3]=F>O?F:O}return M}}}function fS(i,t,e,n,r,s,o){ae.setBuffer(i._roots[t]),Un(0,ae.float32Array,n,s,o)&&nu(0,i,e,n,r,s,o),ae.clearBuffer()}function nu(i,t,e,n,r,s,o){const{float32Array:a,uint16Array:c,uint32Array:h}=ae,f=i*2;if(Ce(f,c)){const x=Ge(i,h),m=$e(f,c);QM(t,e,n,x,m,r,s,o)}else{const x=Fe(i);Un(x,a,n,s,o)&&nu(x,t,e,n,r,s,o);const m=Oe(i,h);Un(m,a,n,s,o)&&nu(m,t,e,n,r,s,o)}}const dS=["x","y","z"];function pS(i,t,e,n,r,s){ae.setBuffer(i._roots[t]);let o=null;return Un(0,ae.float32Array,n,r,s)&&(o=iu(0,i,e,n,r,s)),ae.clearBuffer(),o}function iu(i,t,e,n,r,s){const{float32Array:o,uint16Array:a,uint32Array:c}=ae;let h=i*2;if(Ce(h,a)){const p=Ge(i,c),x=$e(h,a);return tS(t,e,n,p,x,r,s)}else{const p=Au(i,c),x=dS[p],v=n.direction[x]>=0;let S,_;v?(S=Fe(i),_=Oe(i,c)):(S=Oe(i,c),_=Fe(i));const E=Un(S,o,n,r,s)?iu(S,t,e,n,r,s):null;if(E){const b=E.point[x];if(v?b<=o[_+p]:b>=o[_+p+3])return E}const l=Un(_,o,n,r,s)?iu(_,t,e,n,r,s):null;return E&&l?E.distance<=l.distance?E:l:E||l||null}}const Yo=new Xe,Vr=new pn,kr=new pn,Rs=new $t,Vf=new rn,jo=new rn;function xS(i,t,e,n){ae.setBuffer(i._roots[t]);const r=ru(0,i,e,n);return ae.clearBuffer(),r}function ru(i,t,e,n,r=null){const{float32Array:s,uint16Array:o,uint32Array:a}=ae;let c=i*2;if(r===null&&(e.boundingBox||e.computeBoundingBox(),Vf.set(e.boundingBox.min,e.boundingBox.max,n),r=Vf),Ce(c,o)){const f=t.geometry,p=f.index,x=f.attributes.position,m=e.index,v=e.attributes.position,S=Ge(i,a),_=$e(c,o);if(Rs.copy(n).invert(),e.boundsTree)return we(i,s,jo),jo.matrix.copy(Rs),jo.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:E=>jo.intersectsBox(E),intersectsTriangle:E=>{E.a.applyMatrix4(n),E.b.applyMatrix4(n),E.c.applyMatrix4(n),E.needsUpdate=!0;for(let d=S,l=_+S;d<l;d++)if(Ue(kr,3*t.resolveTriangleIndex(d),p,x),kr.needsUpdate=!0,E.intersectsTriangle(kr))return!0;return!1}});{const g=Oa(e);for(let E=S,d=_+S;E<d;E++){const l=t.resolveTriangleIndex(E);Ue(Vr,3*l,p,x),Vr.a.applyMatrix4(Rs),Vr.b.applyMatrix4(Rs),Vr.c.applyMatrix4(Rs),Vr.needsUpdate=!0;for(let b=0,u=g*3;b<u;b+=3)if(Ue(kr,b,m,v),kr.needsUpdate=!0,Vr.intersectsTriangle(kr))return!0}}}else{const f=Fe(i),p=Oe(i,a);return we(f,s,Yo),!!(r.intersectsBox(Yo)&&ru(f,t,e,n,r)||(we(p,s,Yo),r.intersectsBox(Yo)&&ru(p,t,e,n,r)))}}const Zo=new $t,Vc=new rn,Cs=new rn,mS=new I,gS=new I,_S=new I,vS=new I;function yS(i,t,e,n={},r={},s=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Vc.set(t.boundingBox.min,t.boundingBox.max,e),Vc.needsUpdate=!0;const a=i.geometry,c=a.attributes.position,h=a.index,f=t.attributes.position,p=t.index,x=Dn.getPrimitive(),m=Dn.getPrimitive();let v=mS,S=gS,_=null,g=null;r&&(_=_S,g=vS);let E=1/0,d=null,l=null;return Zo.copy(e).invert(),Cs.matrix.copy(Zo),i.shapecast({boundsTraverseOrder:b=>Vc.distanceToBox(b),intersectsBounds:(b,u,R)=>R<E&&R<o?(u&&(Cs.min.copy(b.min),Cs.max.copy(b.max),Cs.needsUpdate=!0),!0):!1,intersectsRange:(b,u)=>{if(t.boundsTree){const R=t.boundsTree;return R.shapecast({boundsTraverseOrder:w=>Cs.distanceToBox(w),intersectsBounds:(w,M,y)=>y<E&&y<o,intersectsRange:(w,M)=>{for(let y=w,T=w+M;y<T;y++){const A=R.resolveTriangleIndex(y);Ue(m,3*A,p,f),m.a.applyMatrix4(e),m.b.applyMatrix4(e),m.c.applyMatrix4(e),m.needsUpdate=!0;for(let C=b,F=b+u;C<F;C++){const N=i.resolveTriangleIndex(C);Ue(x,3*N,h,c),x.needsUpdate=!0;const O=x.distanceToTriangle(m,v,_);if(O<E&&(S.copy(v),g&&g.copy(_),E=O,d=C,l=y),O<s)return!0}}}})}else{const R=Oa(t);for(let w=0,M=R;w<M;w++){Ue(m,3*w,p,f),m.a.applyMatrix4(e),m.b.applyMatrix4(e),m.c.applyMatrix4(e),m.needsUpdate=!0;for(let y=b,T=b+u;y<T;y++){const A=i.resolveTriangleIndex(y);Ue(x,3*A,h,c),x.needsUpdate=!0;const C=x.distanceToTriangle(m,v,_);if(C<E&&(S.copy(v),g&&g.copy(_),E=C,d=y,l=w),C<s)return!0}}}}}),Dn.releasePrimitive(x),Dn.releasePrimitive(m),E===1/0?null:(n.point?n.point.copy(S):n.point=S.clone(),n.distance=E,n.faceIndex=d,r&&(r.point?r.point.copy(g):r.point=g.clone(),r.point.applyMatrix4(Zo),S.applyMatrix4(Zo),r.distance=S.sub(r.point).length(),r.faceIndex=l),n)}function kf(i,t,e){return i===null?null:(i.point.applyMatrix4(t.matrixWorld),i.distance=i.point.distanceTo(e.ray.origin),i.object=t,i)}const $o=new rn,Ko=new dr,Hf=new I,Gf=new $t,Wf=new I,kc=["getX","getY","getZ"];class Ra extends kM{static serialize(t,e={}){e={cloneBuffers:!0,...e};const n=t.geometry,r=t._roots,s=t._indirectBuffer,o=n.getIndex(),a={version:1,roots:null,index:null,indirectBuffer:null};return e.cloneBuffers?(a.roots=r.map(c=>c.slice()),a.index=o?o.array.slice():null,a.indirectBuffer=s?s.slice():null):(a.roots=r,a.index=o?o.array:null,a.indirectBuffer=s),a}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};const{index:r,roots:s,indirectBuffer:o}=t;t.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),c(s));const a=new Ra(e,{...n,[wu]:!0});if(a._roots=s,a._indirectBuffer=o||null,n.setIndex){const h=e.getIndex();if(h===null){const f=new Me(t.index,1,!1);e.setIndex(f)}else h.array!==r&&(h.array.set(r),h.needsUpdate=!0)}return a;function c(h){for(let f=0;f<h.length;f++){const p=h[f],x=new Uint32Array(p),m=new Uint16Array(p);for(let v=0,S=p.byteLength/En;v<S;v++){const _=De*v,g=2*_;Ce(g,m)||(x[_+6]=x[_+6]/De-v)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(t,e={}){e.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafTris}),super(t,e)}shiftTriangleOffsets(t){return super.shiftPrimitiveOffsets(t)}writePrimitiveBounds(t,e,n){const r=this.geometry,s=this._indirectBuffer,o=r.attributes.position,a=r.index?r.index.array:null,h=(s?s[t]:t)*3;let f=h+0,p=h+1,x=h+2;a&&(f=a[f],p=a[p],x=a[x]);for(let m=0;m<3;m++){const v=o[kc[m]](f),S=o[kc[m]](p),_=o[kc[m]](x);let g=v;S<g&&(g=S),_<g&&(g=_);let E=v;S>E&&(E=S),_>E&&(E=_),e[n+m]=g,e[n+m+3]=E}return e}computePrimitiveBounds(t,e,n){const r=this.geometry,s=this._indirectBuffer,o=r.attributes.position,a=r.index?r.index.array:null,c=o.normalized;if(t<0||e+t-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const h=o.array,f=o.offset||0;let p=3;o.isInterleavedBufferAttribute&&(p=o.data.stride);const x=["getX","getY","getZ"],m=n.offset;for(let v=t,S=t+e;v<S;v++){const g=(s?s[v]:v)*3,E=(v-m)*6;let d=g+0,l=g+1,b=g+2;a&&(d=a[d],l=a[l],b=a[b]),c||(d=d*p+f,l=l*p+f,b=b*p+f);for(let u=0;u<3;u++){let R,w,M;c?(R=o[x[u]](d),w=o[x[u]](l),M=o[x[u]](b)):(R=h[d+u],w=h[l+u],M=h[b+u]);let y=R;w<y&&(y=w),M<y&&(y=M);let T=R;w>T&&(T=w),M>T&&(T=M);const A=(T-y)/2,C=u*2;n[E+C+0]=y+A,n[E+C+1]=A+(Math.abs(y)+A)*fa}}return n}raycastObject3D(t,e,n=[]){const{material:r}=t;if(r===void 0)return;Gf.copy(t.matrixWorld).invert(),Ko.copy(e.ray).applyMatrix4(Gf),Wf.setFromMatrixScale(t.matrixWorld),Hf.copy(Ko.direction).multiply(Wf);const s=Hf.length(),o=e.near/s,a=e.far/s;if(e.firstHitOnly===!0){let c=this.raycastFirst(Ko,r,o,a);c=kf(c,t,e),c&&n.push(c)}else{const c=this.raycast(Ko,r,o,a);for(let h=0,f=c.length;h<f;h++){const p=kf(c[h],t,e);p&&n.push(p)}}return n}refit(t=null){return(this.indirect?hS:JM)(this,t)}raycast(t,e=ei,n=0,r=1/0){const s=this._roots,o=[],a=this.indirect?fS:nS;for(let c=0,h=s.length;c<h;c++)a(this,c,e,t,o,n,r);return o}raycastFirst(t,e=ei,n=0,r=1/0){const s=this._roots;let o=null;const a=this.indirect?pS:rS;for(let c=0,h=s.length;c<h;c++){const f=a(this,c,e,t,n,r);f!=null&&(o==null||f.distance<o.distance)&&(o=f)}return o}intersectsGeometry(t,e){let n=!1;const r=this._roots,s=this.indirect?xS:sS;for(let o=0,a=r.length;o<a&&(n=s(this,o,t,e),!n);o++);return n}shapecast(t){const e=Dn.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:this.indirect?eS:KM});return Dn.releasePrimitive(e),n}bvhcast(t,e,n){let{intersectsRanges:r,intersectsTriangles:s}=n;const o=Dn.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,h=this.indirect?v=>{const S=this.resolveTriangleIndex(v);Ue(o,S*3,a,c)}:v=>{Ue(o,v*3,a,c)},f=Dn.getPrimitive(),p=t.geometry.index,x=t.geometry.attributes.position,m=t.indirect?v=>{const S=t.resolveTriangleIndex(v);Ue(f,S*3,p,x)}:v=>{Ue(f,v*3,p,x)};if(s){if(!(t instanceof Ra))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const v=(S,_,g,E,d,l,b,u)=>{for(let R=g,w=g+E;R<w;R++){m(R),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let M=S,y=S+_;M<y;M++)if(h(M),o.needsUpdate=!0,s(o,f,M,R,d,l,b,u))return!0}return!1};if(r){const S=r;r=function(_,g,E,d,l,b,u,R){return S(_,g,E,d,l,b,u,R)?!0:v(_,g,E,d,l,b,u,R)}}else r=v}return super.bvhcast(t,e,{intersectsRanges:r})}intersectsBox(t,e){return $o.set(t.min,t.max,e),$o.needsUpdate=!0,this.shapecast({intersectsBounds:n=>$o.intersectsBox(n),intersectsTriangle:n=>$o.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},r={},s=0,o=1/0){return(this.indirect?yS:uS)(this,t,e,n,r,s,o)}closestPointToPoint(t,e={},n=0,r=1/0){return qM(this,t,e,n,r)}}const Ep=1e-6,bS=Ep*.5,Tp=Math.pow(10,-Math.log10(Ep)),MS=bS*Tp;function ti(i){return~~(i*Tp+MS)}function SS(i){return`${ti(i.x)},${ti(i.y)}`}function Xf(i){return`${ti(i.x)},${ti(i.y)},${ti(i.z)}`}function ES(i){return`${ti(i.x)},${ti(i.y)},${ti(i.z)},${ti(i.w)}`}function TS(i,t,e){e.direction.subVectors(t,i).normalize();const n=i.dot(e.direction);return e.origin.copy(i).addScaledVector(e.direction,-n),e}function wp(){return typeof SharedArrayBuffer<"u"}function wS(i){if(i.buffer instanceof SharedArrayBuffer)return i;const t=i.constructor,e=i.buffer,n=new SharedArrayBuffer(e.byteLength),r=new Uint8Array(e);return new Uint8Array(n).set(r,0),new t(n)}function AS(i){return i.index?i.index.count:i.attributes.position.count}function Lu(i){return AS(i)/3}const RS=1e-8,CS=new I;function PS(i){return~~(i/3)}function IS(i){return i%3}function qf(i,t){return i.start-t.start}function Yf(i,t){return CS.subVectors(t,i.origin).dot(i.direction)}function LS(i,t,e,n=RS){i.sort(qf),t.sort(qf);for(let a=0;a<i.length;a++){const c=i[a];for(let h=0;h<t.length;h++){const f=t[h];if(!(f.start>c.end)){if(c.end<f.start||f.end<c.start)continue;if(c.start<=f.start&&c.end>=f.end)s(f.end,c.end)||i.splice(a+1,0,{start:f.end,end:c.end,index:c.index}),c.end=f.start,f.start=0,f.end=0;else if(c.start>=f.start&&c.end<=f.end)s(c.end,f.end)||t.splice(h+1,0,{start:c.end,end:f.end,index:f.index}),f.end=c.start,c.start=0,c.end=0;else if(c.start<=f.start&&c.end<=f.end){const p=c.end;c.end=f.start,f.start=p}else if(c.start>=f.start&&c.end>=f.end){const p=f.end;f.end=c.start,c.start=p}else throw new Error}if(e.has(c.index)||e.set(c.index,[]),e.has(f.index)||e.set(f.index,[]),e.get(c.index).push(f.index),e.get(f.index).push(c.index),o(f)&&(t.splice(h,1),h--),o(c)){i.splice(a,1),a--;break}}}r(i),r(t);function r(a){for(let c=0;c<a.length;c++)o(a[c])&&(a.splice(c,1),c--)}function s(a,c){return Math.abs(c-a)<n}function o(a){return Math.abs(a.end-a.start)<n}}const jf=1e-5,Zf=1e-4;class DS{constructor(){this._rays=[]}addRay(t){this._rays.push(t)}findClosestRay(t){const e=this._rays,n=t.clone();n.direction.multiplyScalar(-1);let r=1/0,s=null;for(let c=0,h=e.length;c<h;c++){const f=e[c];if(o(f,t)&&o(f,n))continue;const p=a(f,t),x=a(f,n),m=Math.min(p,x);m<r&&(r=m,s=f)}return s;function o(c,h){const f=c.origin.distanceTo(h.origin)>jf;return c.direction.angleTo(h.direction)>Zf||f}function a(c,h){const f=c.origin.distanceTo(h.origin),p=c.direction.angleTo(h.direction);return f/jf+p/Zf}}}const Hc=new I,Gc=new I,Jo=new dr;function US(i,t,e){const n=i.attributes,r=i.index,s=n.position,o=new Map,a=new Map,c=Array.from(t),h=new DS;for(let f=0,p=c.length;f<p;f++){const x=c[f],m=PS(x),v=IS(x);let S=3*m+v,_=3*m+(v+1)%3;r&&(S=r.getX(S),_=r.getX(_)),Hc.fromBufferAttribute(s,S),Gc.fromBufferAttribute(s,_),TS(Hc,Gc,Jo);let g,E=h.findClosestRay(Jo);E===null&&(E=Jo.clone(),h.addRay(E)),a.has(E)||a.set(E,{forward:[],reverse:[],ray:E}),g=a.get(E);let d=Yf(E,Hc),l=Yf(E,Gc);d>l&&([d,l]=[l,d]),Jo.direction.dot(E.direction)<0?g.reverse.push({start:d,end:l,index:x}):g.forward.push({start:d,end:l,index:x})}return a.forEach(({forward:f,reverse:p},x)=>{LS(f,p,o,e),f.length===0&&p.length===0&&a.delete(x)}),{disjointConnectivityMap:o,fragmentMap:a}}const NS=new ct,Wc=new I,FS=new pe,Xc=["","",""];class OS{constructor(){this.data=null,this.disjointConnections=null,this.unmatchedDisjointEdges=null,this.unmatchedEdges=-1,this.matchedEdges=-1,this.useDrawRange=!0,this.useAllAttributes=!1,this.matchDisjointEdges=!1,this.degenerateEpsilon=1e-8}getSiblingTriangleIndex(t,e){const n=this.data[t*3+e];return n===-1?-1:~~(n/3)}getSiblingEdgeIndex(t,e){const n=this.data[t*3+e];return n===-1?-1:n%3}getDisjointSiblingTriangleIndices(t,e){const n=t*3+e,r=this.disjointConnections.get(n);return r?r.map(s=>~~(s/3)):[]}getDisjointSiblingEdgeIndices(t,e){const n=t*3+e,r=this.disjointConnections.get(n);return r?r.map(s=>s%3):[]}isFullyConnected(){return this.unmatchedEdges===0}updateFrom(t){const{useAllAttributes:e,useDrawRange:n,matchDisjointEdges:r,degenerateEpsilon:s}=this,o=e?d:E,a=new Map,{attributes:c}=t,h=e?Object.keys(c):null,f=t.index,p=c.position;let x=Lu(t);const m=x;let v=0;n&&(v=t.drawRange.start,t.drawRange.count!==1/0&&(x=~~(t.drawRange.count/3)));let S=this.data;(!S||S.length<3*m)&&(S=new Int32Array(3*m)),S.fill(-1);let _=0,g=new Set;for(let l=v,b=x*3+v;l<b;l+=3){const u=l;for(let R=0;R<3;R++){let w=u+R;f&&(w=f.getX(w)),Xc[R]=o(w)}for(let R=0;R<3;R++){const w=(R+1)%3,M=Xc[R],y=Xc[w],T=`${y}_${M}`;if(a.has(T)){const A=u+R,C=a.get(T);S[A]=C,S[C]=A,a.delete(T),_+=2,g.delete(C)}else{const A=`${M}_${y}`,C=u+R;a.set(A,C),g.add(C)}}}if(r){const{fragmentMap:l,disjointConnectivityMap:b}=US(t,g,s);g.clear(),l.forEach(({forward:u,reverse:R})=>{u.forEach(({index:w})=>g.add(w)),R.forEach(({index:w})=>g.add(w))}),this.unmatchedDisjointEdges=l,this.disjointConnections=b,_=x*3-g.size}this.matchedEdges=_,this.unmatchedEdges=g.size,this.data=S;function E(l){return Wc.fromBufferAttribute(p,l),Xf(Wc)}function d(l){let b="";for(let u=0,R=h.length;u<R;u++){const w=c[h[u]];let M;switch(w.itemSize){case 1:M=ti(w.getX(l));break;case 2:M=SS(NS.fromBufferAttribute(w,l));break;case 3:M=Xf(Wc.fromBufferAttribute(w,l));break;case 4:M=ES(FS.fromBufferAttribute(w,l));break}b!==""&&(b+="|"),b+=M}return b}}}class su extends Ct{constructor(...t){super(...t),this.isBrush=!0,this._previousMatrix=new $t,this._previousMatrix.elements.fill(0),this._halfEdges=null,this._boundsTree=null,this._groupIndices=null,this._hash=null}markUpdated(){this._previousMatrix.copy(this.matrix)}isDirty(){const{matrix:t,_previousMatrix:e}=this,n=t.elements,r=e.elements;for(let s=0;s<16;s++)if(n[s]!==r[s])return!0;return!1}prepareGeometry(){const t=this.geometry,e=t.attributes,n=wp(),r=t.index,s=t.attributes.position,o=r?`${r.uuid}_${r.count}_${r.version}`:"-1_-1_-1",a=`${s.uuid}_${s.count}_${s.version}`,c=`${t.uuid}_${o}_${a}`;if(this._hash===c)return;if(this._hash=c,n)for(const x in e){const m=e[x];if(m.isInterleavedBufferAttribute)throw new Error("Brush: InterleavedBufferAttributes are not supported.");m.array=wS(m.array)}t.boundsTree=new Ra(t,{maxLeafSize:3,indirect:!0,useSharedArrayBuffer:n}),t.halfEdges||(t.halfEdges=new OS),t.halfEdges.updateFrom(t);const h=Lu(t);(!t.groupIndices||t.groupIndices.length!==h)&&(t.groupIndices=new Uint16Array(h));const f=t.groupIndices,p=t.groups;for(let x=0,m=p.length;x<m;x++){const{start:v,count:S}=p[x];for(let _=v/3,g=(v+S)/3;_<g;_++)f[_]=x}}disposeCacheData(){const{geometry:t}=this;t.halfEdges=null,t.boundsTree=null,t.groupIndices=null}}var BS=Object.getOwnPropertyNames,wn=(i,t)=>function(){return t||(0,i[BS(i)[0]])((t={exports:{}}).exports,t),t.exports},za=wn({"node_modules/binary-search-bounds/search-bounds.js"(i,t){function e(c,h,f,p,x){for(var m=x+1;p<=x;){var v=p+x>>>1,S=c[v],_=f!==void 0?f(S,h):S-h;_>=0?(m=v,x=v-1):p=v+1}return m}function n(c,h,f,p,x){for(var m=x+1;p<=x;){var v=p+x>>>1,S=c[v],_=f!==void 0?f(S,h):S-h;_>0?(m=v,x=v-1):p=v+1}return m}function r(c,h,f,p,x){for(var m=p-1;p<=x;){var v=p+x>>>1,S=c[v],_=f!==void 0?f(S,h):S-h;_<0?(m=v,p=v+1):x=v-1}return m}function s(c,h,f,p,x){for(var m=p-1;p<=x;){var v=p+x>>>1,S=c[v],_=f!==void 0?f(S,h):S-h;_<=0?(m=v,p=v+1):x=v-1}return m}function o(c,h,f,p,x){for(;p<=x;){var m=p+x>>>1,v=c[m],S=f!==void 0?f(v,h):v-h;if(S===0)return m;S<=0?p=m+1:x=m-1}return-1}function a(c,h,f,p,x,m){return typeof f=="function"?m(c,h,f,p===void 0?0:p|0,x===void 0?c.length-1:x|0):m(c,h,void 0,f===void 0?0:f|0,p===void 0?c.length-1:p|0)}t.exports={ge:function(c,h,f,p,x){return a(c,h,f,p,x,e)},gt:function(c,h,f,p,x){return a(c,h,f,p,x,n)},lt:function(c,h,f,p,x){return a(c,h,f,p,x,r)},le:function(c,h,f,p,x){return a(c,h,f,p,x,s)},eq:function(c,h,f,p,x){return a(c,h,f,p,x,o)}}}}),Du=wn({"node_modules/two-product/two-product.js"(i,t){t.exports=n;var e=+(Math.pow(2,27)+1);function n(r,s,o){var a=r*s,c=e*r,h=c-r,f=c-h,p=r-f,x=e*s,m=x-s,v=x-m,S=s-v,_=a-f*v,g=_-p*v,E=g-f*S,d=p*S-E;return o?(o[0]=d,o[1]=a,o):[d,a]}}}),Ap=wn({"node_modules/robust-sum/robust-sum.js"(i,t){t.exports=n;function e(r,s){var o=r+s,a=o-r,c=o-a,h=s-a,f=r-c,p=f+h;return p?[p,o]:[o]}function n(r,s){var o=r.length|0,a=s.length|0;if(o===1&&a===1)return e(r[0],s[0]);var c=o+a,h=new Array(c),f=0,p=0,x=0,m=Math.abs,v=r[p],S=m(v),_=s[x],g=m(_),E,d;S<g?(d=v,p+=1,p<o&&(v=r[p],S=m(v))):(d=_,x+=1,x<a&&(_=s[x],g=m(_))),p<o&&S<g||x>=a?(E=v,p+=1,p<o&&(v=r[p],S=m(v))):(E=_,x+=1,x<a&&(_=s[x],g=m(_)));for(var l=E+d,b=l-E,u=d-b,R=u,w=l,M,y,T,A,C;p<o&&x<a;)S<g?(E=v,p+=1,p<o&&(v=r[p],S=m(v))):(E=_,x+=1,x<a&&(_=s[x],g=m(_))),d=R,l=E+d,b=l-E,u=d-b,u&&(h[f++]=u),M=w+l,y=M-w,T=M-y,A=l-y,C=w-T,R=C+A,w=M;for(;p<o;)E=v,d=R,l=E+d,b=l-E,u=d-b,u&&(h[f++]=u),M=w+l,y=M-w,T=M-y,A=l-y,C=w-T,R=C+A,w=M,p+=1,p<o&&(v=r[p]);for(;x<a;)E=_,d=R,l=E+d,b=l-E,u=d-b,u&&(h[f++]=u),M=w+l,y=M-w,T=M-y,A=l-y,C=w-T,R=C+A,w=M,x+=1,x<a&&(_=s[x]);return R&&(h[f++]=R),w&&(h[f++]=w),f||(h[f++]=0),h.length=f,h}}}),zS=wn({"node_modules/two-sum/two-sum.js"(i,t){t.exports=e;function e(n,r,s){var o=n+r,a=o-n,c=o-a,h=r-a,f=n-c;return s?(s[0]=f+h,s[1]=o,s):[f+h,o]}}}),Rp=wn({"node_modules/robust-scale/robust-scale.js"(i,t){var e=Du(),n=zS();t.exports=r;function r(s,o){var a=s.length;if(a===1){var c=e(s[0],o);return c[0]?c:[c[1]]}var h=new Array(2*a),f=[.1,.1],p=[.1,.1],x=0;e(s[0],o,f),f[0]&&(h[x++]=f[0]);for(var m=1;m<a;++m){e(s[m],o,p);var v=f[1];n(v,p[0],f),f[0]&&(h[x++]=f[0]);var S=p[1],_=f[1],g=S+_,E=g-S,d=_-E;f[1]=g,d&&(h[x++]=d)}return f[1]&&(h[x++]=f[1]),x===0&&(h[x++]=0),h.length=x,h}}}),Cp=wn({"node_modules/robust-subtract/robust-diff.js"(i,t){t.exports=n;function e(r,s){var o=r+s,a=o-r,c=o-a,h=s-a,f=r-c,p=f+h;return p?[p,o]:[o]}function n(r,s){var o=r.length|0,a=s.length|0;if(o===1&&a===1)return e(r[0],-s[0]);var c=o+a,h=new Array(c),f=0,p=0,x=0,m=Math.abs,v=r[p],S=m(v),_=-s[x],g=m(_),E,d;S<g?(d=v,p+=1,p<o&&(v=r[p],S=m(v))):(d=_,x+=1,x<a&&(_=-s[x],g=m(_))),p<o&&S<g||x>=a?(E=v,p+=1,p<o&&(v=r[p],S=m(v))):(E=_,x+=1,x<a&&(_=-s[x],g=m(_)));for(var l=E+d,b=l-E,u=d-b,R=u,w=l,M,y,T,A,C;p<o&&x<a;)S<g?(E=v,p+=1,p<o&&(v=r[p],S=m(v))):(E=_,x+=1,x<a&&(_=-s[x],g=m(_))),d=R,l=E+d,b=l-E,u=d-b,u&&(h[f++]=u),M=w+l,y=M-w,T=M-y,A=l-y,C=w-T,R=C+A,w=M;for(;p<o;)E=v,d=R,l=E+d,b=l-E,u=d-b,u&&(h[f++]=u),M=w+l,y=M-w,T=M-y,A=l-y,C=w-T,R=C+A,w=M,p+=1,p<o&&(v=r[p]);for(;x<a;)E=_,d=R,l=E+d,b=l-E,u=d-b,u&&(h[f++]=u),M=w+l,y=M-w,T=M-y,A=l-y,C=w-T,R=C+A,w=M,x+=1,x<a&&(_=-s[x]);return R&&(h[f++]=R),w&&(h[f++]=w),f||(h[f++]=0),h.length=f,h}}}),VS=wn({"node_modules/robust-orientation/orientation.js"(i,t){var e=Du(),n=Ap(),r=Rp(),s=Cp(),o=5,a=11102230246251565e-32,c=(3+16*a)*a,h=(7+56*a)*a;function f(l,b,u,R){return function(M,y,T){var A=l(l(b(y[1],T[0]),b(-T[1],y[0])),l(b(M[1],y[0]),b(-y[1],M[0]))),C=l(b(M[1],T[0]),b(-T[1],M[0])),F=R(A,C);return F[F.length-1]}}function p(l,b,u,R){return function(M,y,T,A){var C=l(l(u(l(b(T[1],A[0]),b(-A[1],T[0])),y[2]),l(u(l(b(y[1],A[0]),b(-A[1],y[0])),-T[2]),u(l(b(y[1],T[0]),b(-T[1],y[0])),A[2]))),l(u(l(b(y[1],A[0]),b(-A[1],y[0])),M[2]),l(u(l(b(M[1],A[0]),b(-A[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),A[2])))),F=l(l(u(l(b(T[1],A[0]),b(-A[1],T[0])),M[2]),l(u(l(b(M[1],A[0]),b(-A[1],M[0])),-T[2]),u(l(b(M[1],T[0]),b(-T[1],M[0])),A[2]))),l(u(l(b(y[1],T[0]),b(-T[1],y[0])),M[2]),l(u(l(b(M[1],T[0]),b(-T[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),T[2])))),N=R(C,F);return N[N.length-1]}}function x(l,b,u,R){return function(M,y,T,A,C){var F=l(l(l(u(l(u(l(b(A[1],C[0]),b(-C[1],A[0])),T[2]),l(u(l(b(T[1],C[0]),b(-C[1],T[0])),-A[2]),u(l(b(T[1],A[0]),b(-A[1],T[0])),C[2]))),y[3]),l(u(l(u(l(b(A[1],C[0]),b(-C[1],A[0])),y[2]),l(u(l(b(y[1],C[0]),b(-C[1],y[0])),-A[2]),u(l(b(y[1],A[0]),b(-A[1],y[0])),C[2]))),-T[3]),u(l(u(l(b(T[1],C[0]),b(-C[1],T[0])),y[2]),l(u(l(b(y[1],C[0]),b(-C[1],y[0])),-T[2]),u(l(b(y[1],T[0]),b(-T[1],y[0])),C[2]))),A[3]))),l(u(l(u(l(b(T[1],A[0]),b(-A[1],T[0])),y[2]),l(u(l(b(y[1],A[0]),b(-A[1],y[0])),-T[2]),u(l(b(y[1],T[0]),b(-T[1],y[0])),A[2]))),-C[3]),l(u(l(u(l(b(A[1],C[0]),b(-C[1],A[0])),y[2]),l(u(l(b(y[1],C[0]),b(-C[1],y[0])),-A[2]),u(l(b(y[1],A[0]),b(-A[1],y[0])),C[2]))),M[3]),u(l(u(l(b(A[1],C[0]),b(-C[1],A[0])),M[2]),l(u(l(b(M[1],C[0]),b(-C[1],M[0])),-A[2]),u(l(b(M[1],A[0]),b(-A[1],M[0])),C[2]))),-y[3])))),l(l(u(l(u(l(b(y[1],C[0]),b(-C[1],y[0])),M[2]),l(u(l(b(M[1],C[0]),b(-C[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),C[2]))),A[3]),l(u(l(u(l(b(y[1],A[0]),b(-A[1],y[0])),M[2]),l(u(l(b(M[1],A[0]),b(-A[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),A[2]))),-C[3]),u(l(u(l(b(T[1],A[0]),b(-A[1],T[0])),y[2]),l(u(l(b(y[1],A[0]),b(-A[1],y[0])),-T[2]),u(l(b(y[1],T[0]),b(-T[1],y[0])),A[2]))),M[3]))),l(u(l(u(l(b(T[1],A[0]),b(-A[1],T[0])),M[2]),l(u(l(b(M[1],A[0]),b(-A[1],M[0])),-T[2]),u(l(b(M[1],T[0]),b(-T[1],M[0])),A[2]))),-y[3]),l(u(l(u(l(b(y[1],A[0]),b(-A[1],y[0])),M[2]),l(u(l(b(M[1],A[0]),b(-A[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),A[2]))),T[3]),u(l(u(l(b(y[1],T[0]),b(-T[1],y[0])),M[2]),l(u(l(b(M[1],T[0]),b(-T[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),T[2]))),-A[3]))))),N=l(l(l(u(l(u(l(b(A[1],C[0]),b(-C[1],A[0])),T[2]),l(u(l(b(T[1],C[0]),b(-C[1],T[0])),-A[2]),u(l(b(T[1],A[0]),b(-A[1],T[0])),C[2]))),M[3]),u(l(u(l(b(A[1],C[0]),b(-C[1],A[0])),M[2]),l(u(l(b(M[1],C[0]),b(-C[1],M[0])),-A[2]),u(l(b(M[1],A[0]),b(-A[1],M[0])),C[2]))),-T[3])),l(u(l(u(l(b(T[1],C[0]),b(-C[1],T[0])),M[2]),l(u(l(b(M[1],C[0]),b(-C[1],M[0])),-T[2]),u(l(b(M[1],T[0]),b(-T[1],M[0])),C[2]))),A[3]),u(l(u(l(b(T[1],A[0]),b(-A[1],T[0])),M[2]),l(u(l(b(M[1],A[0]),b(-A[1],M[0])),-T[2]),u(l(b(M[1],T[0]),b(-T[1],M[0])),A[2]))),-C[3]))),l(l(u(l(u(l(b(T[1],C[0]),b(-C[1],T[0])),y[2]),l(u(l(b(y[1],C[0]),b(-C[1],y[0])),-T[2]),u(l(b(y[1],T[0]),b(-T[1],y[0])),C[2]))),M[3]),u(l(u(l(b(T[1],C[0]),b(-C[1],T[0])),M[2]),l(u(l(b(M[1],C[0]),b(-C[1],M[0])),-T[2]),u(l(b(M[1],T[0]),b(-T[1],M[0])),C[2]))),-y[3])),l(u(l(u(l(b(y[1],C[0]),b(-C[1],y[0])),M[2]),l(u(l(b(M[1],C[0]),b(-C[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),C[2]))),T[3]),u(l(u(l(b(y[1],T[0]),b(-T[1],y[0])),M[2]),l(u(l(b(M[1],T[0]),b(-T[1],M[0])),-y[2]),u(l(b(M[1],y[0]),b(-y[1],M[0])),T[2]))),-C[3])))),O=R(F,N);return O[O.length-1]}}function m(l){var b=l===3?f:l===4?p:x;return b(n,e,r,s)}var v=m(3),S=m(4),_=[function(){return 0},function(){return 0},function(b,u){return u[0]-b[0]},function(b,u,R){var w=(b[1]-R[1])*(u[0]-R[0]),M=(b[0]-R[0])*(u[1]-R[1]),y=w-M,T;if(w>0){if(M<=0)return y;T=w+M}else if(w<0){if(M>=0)return y;T=-(w+M)}else return y;var A=c*T;return y>=A||y<=-A?y:v(b,u,R)},function(b,u,R,w){var M=b[0]-w[0],y=u[0]-w[0],T=R[0]-w[0],A=b[1]-w[1],C=u[1]-w[1],F=R[1]-w[1],N=b[2]-w[2],O=u[2]-w[2],B=R[2]-w[2],V=y*F,W=T*C,nt=T*A,it=M*F,ht=M*C,_t=y*A,yt=N*(V-W)+O*(nt-it)+B*(ht-_t),Tt=(Math.abs(V)+Math.abs(W))*Math.abs(N)+(Math.abs(nt)+Math.abs(it))*Math.abs(O)+(Math.abs(ht)+Math.abs(_t))*Math.abs(B),Y=h*Tt;return yt>Y||-yt>Y?yt:S(b,u,R,w)}];function g(l){var b=_[l.length];return b||(b=_[l.length]=m(l.length)),b.apply(void 0,l)}function E(l,b,u,R,w,M,y){return function(A,C,F,N,O){switch(arguments.length){case 0:case 1:return 0;case 2:return R(A,C);case 3:return w(A,C,F);case 4:return M(A,C,F,N);case 5:return y(A,C,F,N,O)}for(var B=new Array(arguments.length),V=0;V<arguments.length;++V)B[V]=arguments[V];return l(B)}}function d(){for(;_.length<=o;)_.push(m(_.length));t.exports=E.apply(void 0,[g].concat(_));for(var l=0;l<=o;++l)t.exports[l]=_[l]}d()}}),kS=wn({"node_modules/cdt2d/lib/monotone.js"(i,t){var e=za(),n=VS()[3],r=0,s=1,o=2;t.exports=S;function a(_,g,E,d,l){this.a=_,this.b=g,this.idx=E,this.lowerIds=d,this.upperIds=l}function c(_,g,E,d){this.a=_,this.b=g,this.type=E,this.idx=d}function h(_,g){var E=_.a[0]-g.a[0]||_.a[1]-g.a[1]||_.type-g.type;return E||_.type!==r&&(E=n(_.a,_.b,g.b),E)?E:_.idx-g.idx}function f(_,g){return n(_.a,_.b,g)}function p(_,g,E,d,l){for(var b=e.lt(g,d,f),u=e.gt(g,d,f),R=b;R<u;++R){for(var w=g[R],M=w.lowerIds,T=M.length;T>1&&n(E[M[T-2]],E[M[T-1]],d)>0;)_.push([M[T-1],M[T-2],l]),T-=1;M.length=T,M.push(l);for(var y=w.upperIds,T=y.length;T>1&&n(E[y[T-2]],E[y[T-1]],d)<0;)_.push([y[T-2],y[T-1],l]),T-=1;y.length=T,y.push(l)}}function x(_,g){var E;return _.a[0]<g.a[0]?E=n(_.a,_.b,g.a):E=n(g.b,g.a,_.a),E||(g.b[0]<_.b[0]?E=n(_.a,_.b,g.b):E=n(g.b,g.a,_.b),E||_.idx-g.idx)}function m(_,g,E){var d=e.le(_,E,x),l=_[d],b=l.upperIds,u=b[b.length-1];l.upperIds=[u],_.splice(d+1,0,new a(E.a,E.b,E.idx,[u],b))}function v(_,g,E){var d=E.a;E.a=E.b,E.b=d;var l=e.eq(_,E,x),b=_[l],u=_[l-1];u.upperIds=b.upperIds,_.splice(l,1)}function S(_,g){for(var E=_.length,d=g.length,l=[],b=0;b<E;++b)l.push(new c(_[b],null,r,b));for(var b=0;b<d;++b){var u=g[b],R=_[u[0]],w=_[u[1]];R[0]<w[0]?l.push(new c(R,w,o,b),new c(w,R,s,b)):R[0]>w[0]&&l.push(new c(w,R,o,b),new c(R,w,s,b))}l.sort(h);for(var M=l[0].a[0]-(1+Math.abs(l[0].a[0]))*Math.pow(2,-52),y=[new a([M,1],[M,0],-1,[],[])],T=[],b=0,A=l.length;b<A;++b){var C=l[b],F=C.type;F===r?p(T,y,_,C.a,C.idx):F===o?m(y,_,C):v(y,_,C)}return T}}}),HS=wn({"node_modules/cdt2d/lib/triangulation.js"(i,t){var e=za();t.exports=o;function n(a,c){this.stars=a,this.edges=c}var r=n.prototype;function s(a,c,h){for(var f=1,p=a.length;f<p;f+=2)if(a[f-1]===c&&a[f]===h){a[f-1]=a[p-2],a[f]=a[p-1],a.length=p-2;return}}r.isConstraint=function(){var a=[0,0];function c(h,f){return h[0]-f[0]||h[1]-f[1]}return function(h,f){return a[0]=Math.min(h,f),a[1]=Math.max(h,f),e.eq(this.edges,a,c)>=0}}(),r.removeTriangle=function(a,c,h){var f=this.stars;s(f[a],c,h),s(f[c],h,a),s(f[h],a,c)},r.addTriangle=function(a,c,h){var f=this.stars;f[a].push(c,h),f[c].push(h,a),f[h].push(a,c)},r.opposite=function(a,c){for(var h=this.stars[c],f=1,p=h.length;f<p;f+=2)if(h[f]===a)return h[f-1];return-1},r.flip=function(a,c){var h=this.opposite(a,c),f=this.opposite(c,a);this.removeTriangle(a,c,h),this.removeTriangle(c,a,f),this.addTriangle(a,f,h),this.addTriangle(c,h,f)},r.edges=function(){for(var a=this.stars,c=[],h=0,f=a.length;h<f;++h)for(var p=a[h],x=0,m=p.length;x<m;x+=2)c.push([p[x],p[x+1]]);return c},r.cells=function(){for(var a=this.stars,c=[],h=0,f=a.length;h<f;++h)for(var p=a[h],x=0,m=p.length;x<m;x+=2){var v=p[x],S=p[x+1];h<Math.min(v,S)&&c.push([h,v,S])}return c};function o(a,c){for(var h=new Array(a),f=0;f<a;++f)h[f]=[];return new n(h,c)}}}),GS=wn({"node_modules/robust-in-sphere/in-sphere.js"(i,t){var e=Du(),n=Ap(),r=Cp(),s=Rp(),o=6;function a(d){var l=d===3?p:d===4?x:d===5?m:v;return l(n,r,e,s)}function c(){return 0}function h(){return 0}function f(){return 0}function p(d,l,b,u){function R(w,M,y){var T=b(w[0],w[0]),A=u(T,M[0]),C=u(T,y[0]),F=b(M[0],M[0]),N=u(F,w[0]),O=u(F,y[0]),B=b(y[0],y[0]),V=u(B,w[0]),W=u(B,M[0]),nt=d(l(W,O),l(N,A)),it=l(V,C),ht=l(nt,it);return ht[ht.length-1]}return R}function x(d,l,b,u){function R(w,M,y,T){var A=d(b(w[0],w[0]),b(w[1],w[1])),C=u(A,M[0]),F=u(A,y[0]),N=u(A,T[0]),O=d(b(M[0],M[0]),b(M[1],M[1])),B=u(O,w[0]),V=u(O,y[0]),W=u(O,T[0]),nt=d(b(y[0],y[0]),b(y[1],y[1])),it=u(nt,w[0]),ht=u(nt,M[0]),_t=u(nt,T[0]),yt=d(b(T[0],T[0]),b(T[1],T[1])),Tt=u(yt,w[0]),Y=u(yt,M[0]),j=u(yt,y[0]),st=d(d(u(l(j,_t),M[1]),d(u(l(Y,W),-y[1]),u(l(ht,V),T[1]))),d(u(l(Y,W),w[1]),d(u(l(Tt,N),-M[1]),u(l(B,C),T[1])))),lt=d(d(u(l(j,_t),w[1]),d(u(l(Tt,N),-y[1]),u(l(it,F),T[1]))),d(u(l(ht,V),w[1]),d(u(l(it,F),-M[1]),u(l(B,C),y[1])))),ut=l(st,lt);return ut[ut.length-1]}return R}function m(d,l,b,u){function R(w,M,y,T,A){var C=d(b(w[0],w[0]),d(b(w[1],w[1]),b(w[2],w[2]))),F=u(C,M[0]),N=u(C,y[0]),O=u(C,T[0]),B=u(C,A[0]),V=d(b(M[0],M[0]),d(b(M[1],M[1]),b(M[2],M[2]))),W=u(V,w[0]),nt=u(V,y[0]),it=u(V,T[0]),ht=u(V,A[0]),_t=d(b(y[0],y[0]),d(b(y[1],y[1]),b(y[2],y[2]))),yt=u(_t,w[0]),Tt=u(_t,M[0]),Y=u(_t,T[0]),j=u(_t,A[0]),st=d(b(T[0],T[0]),d(b(T[1],T[1]),b(T[2],T[2]))),lt=u(st,w[0]),ut=u(st,M[0]),Rt=u(st,y[0]),qt=u(st,A[0]),Et=d(b(A[0],A[0]),d(b(A[1],A[1]),b(A[2],A[2]))),J=u(Et,w[0]),D=u(Et,M[0]),K=u(Et,y[0]),tt=u(Et,T[0]),xt=d(d(d(u(d(u(l(tt,qt),y[1]),d(u(l(K,j),-T[1]),u(l(Rt,Y),A[1]))),M[2]),d(u(d(u(l(tt,qt),M[1]),d(u(l(D,ht),-T[1]),u(l(ut,it),A[1]))),-y[2]),u(d(u(l(K,j),M[1]),d(u(l(D,ht),-y[1]),u(l(Tt,nt),A[1]))),T[2]))),d(u(d(u(l(Rt,Y),M[1]),d(u(l(ut,it),-y[1]),u(l(Tt,nt),T[1]))),-A[2]),d(u(d(u(l(tt,qt),M[1]),d(u(l(D,ht),-T[1]),u(l(ut,it),A[1]))),w[2]),u(d(u(l(tt,qt),w[1]),d(u(l(J,B),-T[1]),u(l(lt,O),A[1]))),-M[2])))),d(d(u(d(u(l(D,ht),w[1]),d(u(l(J,B),-M[1]),u(l(W,F),A[1]))),T[2]),d(u(d(u(l(ut,it),w[1]),d(u(l(lt,O),-M[1]),u(l(W,F),T[1]))),-A[2]),u(d(u(l(Rt,Y),M[1]),d(u(l(ut,it),-y[1]),u(l(Tt,nt),T[1]))),w[2]))),d(u(d(u(l(Rt,Y),w[1]),d(u(l(lt,O),-y[1]),u(l(yt,N),T[1]))),-M[2]),d(u(d(u(l(ut,it),w[1]),d(u(l(lt,O),-M[1]),u(l(W,F),T[1]))),y[2]),u(d(u(l(Tt,nt),w[1]),d(u(l(yt,N),-M[1]),u(l(W,F),y[1]))),-T[2]))))),et=d(d(d(u(d(u(l(tt,qt),y[1]),d(u(l(K,j),-T[1]),u(l(Rt,Y),A[1]))),w[2]),u(d(u(l(tt,qt),w[1]),d(u(l(J,B),-T[1]),u(l(lt,O),A[1]))),-y[2])),d(u(d(u(l(K,j),w[1]),d(u(l(J,B),-y[1]),u(l(yt,N),A[1]))),T[2]),u(d(u(l(Rt,Y),w[1]),d(u(l(lt,O),-y[1]),u(l(yt,N),T[1]))),-A[2]))),d(d(u(d(u(l(K,j),M[1]),d(u(l(D,ht),-y[1]),u(l(Tt,nt),A[1]))),w[2]),u(d(u(l(K,j),w[1]),d(u(l(J,B),-y[1]),u(l(yt,N),A[1]))),-M[2])),d(u(d(u(l(D,ht),w[1]),d(u(l(J,B),-M[1]),u(l(W,F),A[1]))),y[2]),u(d(u(l(Tt,nt),w[1]),d(u(l(yt,N),-M[1]),u(l(W,F),y[1]))),-A[2])))),dt=l(xt,et);return dt[dt.length-1]}return R}function v(d,l,b,u){function R(w,M,y,T,A,C){var F=d(d(b(w[0],w[0]),b(w[1],w[1])),d(b(w[2],w[2]),b(w[3],w[3]))),N=u(F,M[0]),O=u(F,y[0]),B=u(F,T[0]),V=u(F,A[0]),W=u(F,C[0]),nt=d(d(b(M[0],M[0]),b(M[1],M[1])),d(b(M[2],M[2]),b(M[3],M[3]))),it=u(nt,w[0]),ht=u(nt,y[0]),_t=u(nt,T[0]),yt=u(nt,A[0]),Tt=u(nt,C[0]),Y=d(d(b(y[0],y[0]),b(y[1],y[1])),d(b(y[2],y[2]),b(y[3],y[3]))),j=u(Y,w[0]),st=u(Y,M[0]),lt=u(Y,T[0]),ut=u(Y,A[0]),Rt=u(Y,C[0]),qt=d(d(b(T[0],T[0]),b(T[1],T[1])),d(b(T[2],T[2]),b(T[3],T[3]))),Et=u(qt,w[0]),J=u(qt,M[0]),D=u(qt,y[0]),K=u(qt,A[0]),tt=u(qt,C[0]),xt=d(d(b(A[0],A[0]),b(A[1],A[1])),d(b(A[2],A[2]),b(A[3],A[3]))),et=u(xt,w[0]),dt=u(xt,M[0]),ot=u(xt,y[0]),ft=u(xt,T[0]),U=u(xt,C[0]),P=d(d(b(C[0],C[0]),b(C[1],C[1])),d(b(C[2],C[2]),b(C[3],C[3]))),k=u(P,w[0]),q=u(P,M[0]),Q=u(P,y[0]),X=u(P,T[0]),mt=u(P,A[0]),St=d(d(d(u(d(d(u(d(u(l(mt,U),T[1]),d(u(l(X,tt),-A[1]),u(l(ft,K),C[1]))),y[2]),u(d(u(l(mt,U),y[1]),d(u(l(Q,Rt),-A[1]),u(l(ot,ut),C[1]))),-T[2])),d(u(d(u(l(X,tt),y[1]),d(u(l(Q,Rt),-T[1]),u(l(D,lt),C[1]))),A[2]),u(d(u(l(ft,K),y[1]),d(u(l(ot,ut),-T[1]),u(l(D,lt),A[1]))),-C[2]))),M[3]),d(u(d(d(u(d(u(l(mt,U),T[1]),d(u(l(X,tt),-A[1]),u(l(ft,K),C[1]))),M[2]),u(d(u(l(mt,U),M[1]),d(u(l(q,Tt),-A[1]),u(l(dt,yt),C[1]))),-T[2])),d(u(d(u(l(X,tt),M[1]),d(u(l(q,Tt),-T[1]),u(l(J,_t),C[1]))),A[2]),u(d(u(l(ft,K),M[1]),d(u(l(dt,yt),-T[1]),u(l(J,_t),A[1]))),-C[2]))),-y[3]),u(d(d(u(d(u(l(mt,U),y[1]),d(u(l(Q,Rt),-A[1]),u(l(ot,ut),C[1]))),M[2]),u(d(u(l(mt,U),M[1]),d(u(l(q,Tt),-A[1]),u(l(dt,yt),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),M[1]),d(u(l(q,Tt),-y[1]),u(l(st,ht),C[1]))),A[2]),u(d(u(l(ot,ut),M[1]),d(u(l(dt,yt),-y[1]),u(l(st,ht),A[1]))),-C[2]))),T[3]))),d(d(u(d(d(u(d(u(l(X,tt),y[1]),d(u(l(Q,Rt),-T[1]),u(l(D,lt),C[1]))),M[2]),u(d(u(l(X,tt),M[1]),d(u(l(q,Tt),-T[1]),u(l(J,_t),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),M[1]),d(u(l(q,Tt),-y[1]),u(l(st,ht),C[1]))),T[2]),u(d(u(l(D,lt),M[1]),d(u(l(J,_t),-y[1]),u(l(st,ht),T[1]))),-C[2]))),-A[3]),u(d(d(u(d(u(l(ft,K),y[1]),d(u(l(ot,ut),-T[1]),u(l(D,lt),A[1]))),M[2]),u(d(u(l(ft,K),M[1]),d(u(l(dt,yt),-T[1]),u(l(J,_t),A[1]))),-y[2])),d(u(d(u(l(ot,ut),M[1]),d(u(l(dt,yt),-y[1]),u(l(st,ht),A[1]))),T[2]),u(d(u(l(D,lt),M[1]),d(u(l(J,_t),-y[1]),u(l(st,ht),T[1]))),-A[2]))),C[3])),d(u(d(d(u(d(u(l(mt,U),T[1]),d(u(l(X,tt),-A[1]),u(l(ft,K),C[1]))),M[2]),u(d(u(l(mt,U),M[1]),d(u(l(q,Tt),-A[1]),u(l(dt,yt),C[1]))),-T[2])),d(u(d(u(l(X,tt),M[1]),d(u(l(q,Tt),-T[1]),u(l(J,_t),C[1]))),A[2]),u(d(u(l(ft,K),M[1]),d(u(l(dt,yt),-T[1]),u(l(J,_t),A[1]))),-C[2]))),w[3]),u(d(d(u(d(u(l(mt,U),T[1]),d(u(l(X,tt),-A[1]),u(l(ft,K),C[1]))),w[2]),u(d(u(l(mt,U),w[1]),d(u(l(k,W),-A[1]),u(l(et,V),C[1]))),-T[2])),d(u(d(u(l(X,tt),w[1]),d(u(l(k,W),-T[1]),u(l(Et,B),C[1]))),A[2]),u(d(u(l(ft,K),w[1]),d(u(l(et,V),-T[1]),u(l(Et,B),A[1]))),-C[2]))),-M[3])))),d(d(d(u(d(d(u(d(u(l(mt,U),M[1]),d(u(l(q,Tt),-A[1]),u(l(dt,yt),C[1]))),w[2]),u(d(u(l(mt,U),w[1]),d(u(l(k,W),-A[1]),u(l(et,V),C[1]))),-M[2])),d(u(d(u(l(q,Tt),w[1]),d(u(l(k,W),-M[1]),u(l(it,N),C[1]))),A[2]),u(d(u(l(dt,yt),w[1]),d(u(l(et,V),-M[1]),u(l(it,N),A[1]))),-C[2]))),T[3]),u(d(d(u(d(u(l(X,tt),M[1]),d(u(l(q,Tt),-T[1]),u(l(J,_t),C[1]))),w[2]),u(d(u(l(X,tt),w[1]),d(u(l(k,W),-T[1]),u(l(Et,B),C[1]))),-M[2])),d(u(d(u(l(q,Tt),w[1]),d(u(l(k,W),-M[1]),u(l(it,N),C[1]))),T[2]),u(d(u(l(J,_t),w[1]),d(u(l(Et,B),-M[1]),u(l(it,N),T[1]))),-C[2]))),-A[3])),d(u(d(d(u(d(u(l(ft,K),M[1]),d(u(l(dt,yt),-T[1]),u(l(J,_t),A[1]))),w[2]),u(d(u(l(ft,K),w[1]),d(u(l(et,V),-T[1]),u(l(Et,B),A[1]))),-M[2])),d(u(d(u(l(dt,yt),w[1]),d(u(l(et,V),-M[1]),u(l(it,N),A[1]))),T[2]),u(d(u(l(J,_t),w[1]),d(u(l(Et,B),-M[1]),u(l(it,N),T[1]))),-A[2]))),C[3]),u(d(d(u(d(u(l(X,tt),y[1]),d(u(l(Q,Rt),-T[1]),u(l(D,lt),C[1]))),M[2]),u(d(u(l(X,tt),M[1]),d(u(l(q,Tt),-T[1]),u(l(J,_t),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),M[1]),d(u(l(q,Tt),-y[1]),u(l(st,ht),C[1]))),T[2]),u(d(u(l(D,lt),M[1]),d(u(l(J,_t),-y[1]),u(l(st,ht),T[1]))),-C[2]))),w[3]))),d(d(u(d(d(u(d(u(l(X,tt),y[1]),d(u(l(Q,Rt),-T[1]),u(l(D,lt),C[1]))),w[2]),u(d(u(l(X,tt),w[1]),d(u(l(k,W),-T[1]),u(l(Et,B),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),w[1]),d(u(l(k,W),-y[1]),u(l(j,O),C[1]))),T[2]),u(d(u(l(D,lt),w[1]),d(u(l(Et,B),-y[1]),u(l(j,O),T[1]))),-C[2]))),-M[3]),u(d(d(u(d(u(l(X,tt),M[1]),d(u(l(q,Tt),-T[1]),u(l(J,_t),C[1]))),w[2]),u(d(u(l(X,tt),w[1]),d(u(l(k,W),-T[1]),u(l(Et,B),C[1]))),-M[2])),d(u(d(u(l(q,Tt),w[1]),d(u(l(k,W),-M[1]),u(l(it,N),C[1]))),T[2]),u(d(u(l(J,_t),w[1]),d(u(l(Et,B),-M[1]),u(l(it,N),T[1]))),-C[2]))),y[3])),d(u(d(d(u(d(u(l(Q,Rt),M[1]),d(u(l(q,Tt),-y[1]),u(l(st,ht),C[1]))),w[2]),u(d(u(l(Q,Rt),w[1]),d(u(l(k,W),-y[1]),u(l(j,O),C[1]))),-M[2])),d(u(d(u(l(q,Tt),w[1]),d(u(l(k,W),-M[1]),u(l(it,N),C[1]))),y[2]),u(d(u(l(st,ht),w[1]),d(u(l(j,O),-M[1]),u(l(it,N),y[1]))),-C[2]))),-T[3]),u(d(d(u(d(u(l(D,lt),M[1]),d(u(l(J,_t),-y[1]),u(l(st,ht),T[1]))),w[2]),u(d(u(l(D,lt),w[1]),d(u(l(Et,B),-y[1]),u(l(j,O),T[1]))),-M[2])),d(u(d(u(l(J,_t),w[1]),d(u(l(Et,B),-M[1]),u(l(it,N),T[1]))),y[2]),u(d(u(l(st,ht),w[1]),d(u(l(j,O),-M[1]),u(l(it,N),y[1]))),-T[2]))),C[3]))))),Ft=d(d(d(u(d(d(u(d(u(l(mt,U),T[1]),d(u(l(X,tt),-A[1]),u(l(ft,K),C[1]))),y[2]),u(d(u(l(mt,U),y[1]),d(u(l(Q,Rt),-A[1]),u(l(ot,ut),C[1]))),-T[2])),d(u(d(u(l(X,tt),y[1]),d(u(l(Q,Rt),-T[1]),u(l(D,lt),C[1]))),A[2]),u(d(u(l(ft,K),y[1]),d(u(l(ot,ut),-T[1]),u(l(D,lt),A[1]))),-C[2]))),w[3]),d(u(d(d(u(d(u(l(mt,U),T[1]),d(u(l(X,tt),-A[1]),u(l(ft,K),C[1]))),w[2]),u(d(u(l(mt,U),w[1]),d(u(l(k,W),-A[1]),u(l(et,V),C[1]))),-T[2])),d(u(d(u(l(X,tt),w[1]),d(u(l(k,W),-T[1]),u(l(Et,B),C[1]))),A[2]),u(d(u(l(ft,K),w[1]),d(u(l(et,V),-T[1]),u(l(Et,B),A[1]))),-C[2]))),-y[3]),u(d(d(u(d(u(l(mt,U),y[1]),d(u(l(Q,Rt),-A[1]),u(l(ot,ut),C[1]))),w[2]),u(d(u(l(mt,U),w[1]),d(u(l(k,W),-A[1]),u(l(et,V),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),w[1]),d(u(l(k,W),-y[1]),u(l(j,O),C[1]))),A[2]),u(d(u(l(ot,ut),w[1]),d(u(l(et,V),-y[1]),u(l(j,O),A[1]))),-C[2]))),T[3]))),d(d(u(d(d(u(d(u(l(X,tt),y[1]),d(u(l(Q,Rt),-T[1]),u(l(D,lt),C[1]))),w[2]),u(d(u(l(X,tt),w[1]),d(u(l(k,W),-T[1]),u(l(Et,B),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),w[1]),d(u(l(k,W),-y[1]),u(l(j,O),C[1]))),T[2]),u(d(u(l(D,lt),w[1]),d(u(l(Et,B),-y[1]),u(l(j,O),T[1]))),-C[2]))),-A[3]),u(d(d(u(d(u(l(ft,K),y[1]),d(u(l(ot,ut),-T[1]),u(l(D,lt),A[1]))),w[2]),u(d(u(l(ft,K),w[1]),d(u(l(et,V),-T[1]),u(l(Et,B),A[1]))),-y[2])),d(u(d(u(l(ot,ut),w[1]),d(u(l(et,V),-y[1]),u(l(j,O),A[1]))),T[2]),u(d(u(l(D,lt),w[1]),d(u(l(Et,B),-y[1]),u(l(j,O),T[1]))),-A[2]))),C[3])),d(u(d(d(u(d(u(l(mt,U),y[1]),d(u(l(Q,Rt),-A[1]),u(l(ot,ut),C[1]))),M[2]),u(d(u(l(mt,U),M[1]),d(u(l(q,Tt),-A[1]),u(l(dt,yt),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),M[1]),d(u(l(q,Tt),-y[1]),u(l(st,ht),C[1]))),A[2]),u(d(u(l(ot,ut),M[1]),d(u(l(dt,yt),-y[1]),u(l(st,ht),A[1]))),-C[2]))),w[3]),u(d(d(u(d(u(l(mt,U),y[1]),d(u(l(Q,Rt),-A[1]),u(l(ot,ut),C[1]))),w[2]),u(d(u(l(mt,U),w[1]),d(u(l(k,W),-A[1]),u(l(et,V),C[1]))),-y[2])),d(u(d(u(l(Q,Rt),w[1]),d(u(l(k,W),-y[1]),u(l(j,O),C[1]))),A[2]),u(d(u(l(ot,ut),w[1]),d(u(l(et,V),-y[1]),u(l(j,O),A[1]))),-C[2]))),-M[3])))),d(d(d(u(d(d(u(d(u(l(mt,U),M[1]),d(u(l(q,Tt),-A[1]),u(l(dt,yt),C[1]))),w[2]),u(d(u(l(mt,U),w[1]),d(u(l(k,W),-A[1]),u(l(et,V),C[1]))),-M[2])),d(u(d(u(l(q,Tt),w[1]),d(u(l(k,W),-M[1]),u(l(it,N),C[1]))),A[2]),u(d(u(l(dt,yt),w[1]),d(u(l(et,V),-M[1]),u(l(it,N),A[1]))),-C[2]))),y[3]),u(d(d(u(d(u(l(Q,Rt),M[1]),d(u(l(q,Tt),-y[1]),u(l(st,ht),C[1]))),w[2]),u(d(u(l(Q,Rt),w[1]),d(u(l(k,W),-y[1]),u(l(j,O),C[1]))),-M[2])),d(u(d(u(l(q,Tt),w[1]),d(u(l(k,W),-M[1]),u(l(it,N),C[1]))),y[2]),u(d(u(l(st,ht),w[1]),d(u(l(j,O),-M[1]),u(l(it,N),y[1]))),-C[2]))),-A[3])),d(u(d(d(u(d(u(l(ot,ut),M[1]),d(u(l(dt,yt),-y[1]),u(l(st,ht),A[1]))),w[2]),u(d(u(l(ot,ut),w[1]),d(u(l(et,V),-y[1]),u(l(j,O),A[1]))),-M[2])),d(u(d(u(l(dt,yt),w[1]),d(u(l(et,V),-M[1]),u(l(it,N),A[1]))),y[2]),u(d(u(l(st,ht),w[1]),d(u(l(j,O),-M[1]),u(l(it,N),y[1]))),-A[2]))),C[3]),u(d(d(u(d(u(l(ft,K),y[1]),d(u(l(ot,ut),-T[1]),u(l(D,lt),A[1]))),M[2]),u(d(u(l(ft,K),M[1]),d(u(l(dt,yt),-T[1]),u(l(J,_t),A[1]))),-y[2])),d(u(d(u(l(ot,ut),M[1]),d(u(l(dt,yt),-y[1]),u(l(st,ht),A[1]))),T[2]),u(d(u(l(D,lt),M[1]),d(u(l(J,_t),-y[1]),u(l(st,ht),T[1]))),-A[2]))),w[3]))),d(d(u(d(d(u(d(u(l(ft,K),y[1]),d(u(l(ot,ut),-T[1]),u(l(D,lt),A[1]))),w[2]),u(d(u(l(ft,K),w[1]),d(u(l(et,V),-T[1]),u(l(Et,B),A[1]))),-y[2])),d(u(d(u(l(ot,ut),w[1]),d(u(l(et,V),-y[1]),u(l(j,O),A[1]))),T[2]),u(d(u(l(D,lt),w[1]),d(u(l(Et,B),-y[1]),u(l(j,O),T[1]))),-A[2]))),-M[3]),u(d(d(u(d(u(l(ft,K),M[1]),d(u(l(dt,yt),-T[1]),u(l(J,_t),A[1]))),w[2]),u(d(u(l(ft,K),w[1]),d(u(l(et,V),-T[1]),u(l(Et,B),A[1]))),-M[2])),d(u(d(u(l(dt,yt),w[1]),d(u(l(et,V),-M[1]),u(l(it,N),A[1]))),T[2]),u(d(u(l(J,_t),w[1]),d(u(l(Et,B),-M[1]),u(l(it,N),T[1]))),-A[2]))),y[3])),d(u(d(d(u(d(u(l(ot,ut),M[1]),d(u(l(dt,yt),-y[1]),u(l(st,ht),A[1]))),w[2]),u(d(u(l(ot,ut),w[1]),d(u(l(et,V),-y[1]),u(l(j,O),A[1]))),-M[2])),d(u(d(u(l(dt,yt),w[1]),d(u(l(et,V),-M[1]),u(l(it,N),A[1]))),y[2]),u(d(u(l(st,ht),w[1]),d(u(l(j,O),-M[1]),u(l(it,N),y[1]))),-A[2]))),-T[3]),u(d(d(u(d(u(l(D,lt),M[1]),d(u(l(J,_t),-y[1]),u(l(st,ht),T[1]))),w[2]),u(d(u(l(D,lt),w[1]),d(u(l(Et,B),-y[1]),u(l(j,O),T[1]))),-M[2])),d(u(d(u(l(J,_t),w[1]),d(u(l(Et,B),-M[1]),u(l(it,N),T[1]))),y[2]),u(d(u(l(st,ht),w[1]),d(u(l(j,O),-M[1]),u(l(it,N),y[1]))),-T[2]))),A[3]))))),Dt=l(St,Ft);return Dt[Dt.length-1]}return R}var S=[c,h,f];function _(d){var l=S[d.length];return l||(l=S[d.length]=a(d.length)),l.apply(void 0,d)}function g(d,l,b,u,R,w,M,y){function T(A,C,F,N,O,B){switch(arguments.length){case 0:case 1:return 0;case 2:return u(A,C);case 3:return R(A,C,F);case 4:return w(A,C,F,N);case 5:return M(A,C,F,N,O);case 6:return y(A,C,F,N,O,B)}for(var V=new Array(arguments.length),W=0;W<arguments.length;++W)V[W]=arguments[W];return d(V)}return T}function E(){for(;S.length<=o;)S.push(a(S.length));t.exports=g.apply(void 0,[_].concat(S));for(var d=0;d<=o;++d)t.exports[d]=S[d]}E()}}),WS=wn({"node_modules/cdt2d/lib/delaunay.js"(i,t){var e=GS()[4];za(),t.exports=r;function n(s,o,a,c,h,f){var p=o.opposite(c,h);if(!(p<0)){if(h<c){var x=c;c=h,h=x,x=f,f=p,p=x}o.isConstraint(c,h)||e(s[c],s[h],s[f],s[p])<0&&a.push(c,h)}}function r(s,o){for(var a=[],c=s.length,h=o.stars,f=0;f<c;++f)for(var p=h[f],x=1;x<p.length;x+=2){var m=p[x];if(!(m<f)&&!o.isConstraint(f,m)){for(var v=p[x-1],S=-1,_=1;_<p.length;_+=2)if(p[_-1]===m){S=p[_];break}S<0||e(s[f],s[m],s[v],s[S])<0&&a.push(f,m)}}for(;a.length>0;){for(var m=a.pop(),f=a.pop(),v=-1,S=-1,p=h[f],g=1;g<p.length;g+=2){var E=p[g-1],d=p[g];E===m?S=d:d===m&&(v=E)}v<0||S<0||e(s[f],s[m],s[v],s[S])>=0||(o.flip(f,m),n(s,o,a,v,f,S),n(s,o,a,f,S,v),n(s,o,a,S,m,v),n(s,o,a,m,v,S))}}}}),XS=wn({"node_modules/cdt2d/lib/filter.js"(i,t){var e=za();t.exports=c;function n(h,f,p,x,m,v,S){this.cells=h,this.neighbor=f,this.flags=x,this.constraint=p,this.active=m,this.next=v,this.boundary=S}var r=n.prototype;function s(h,f){return h[0]-f[0]||h[1]-f[1]||h[2]-f[2]}r.locate=function(){var h=[0,0,0];return function(f,p,x){var m=f,v=p,S=x;return p<x?p<f&&(m=p,v=x,S=f):x<f&&(m=x,v=f,S=p),m<0?-1:(h[0]=m,h[1]=v,h[2]=S,e.eq(this.cells,h,s))}}();function o(h,f){for(var p=h.cells(),x=p.length,m=0;m<x;++m){var v=p[m],S=v[0],_=v[1],g=v[2];_<g?_<S&&(v[0]=_,v[1]=g,v[2]=S):g<S&&(v[0]=g,v[1]=S,v[2]=_)}p.sort(s);for(var E=new Array(x),m=0;m<E.length;++m)E[m]=0;var d=[],l=[],b=new Array(3*x),u=new Array(3*x),R=null;f&&(R=[]);for(var w=new n(p,b,u,E,d,l,R),m=0;m<x;++m)for(var v=p[m],M=0;M<3;++M){var S=v[M],_=v[(M+1)%3],y=b[3*m+M]=w.locate(_,S,h.opposite(_,S)),T=u[3*m+M]=h.isConstraint(S,_);y<0&&(T?l.push(m):(d.push(m),E[m]=1),f&&R.push([_,S,-1]))}return w}function a(h,f,p){for(var x=0,m=0;m<h.length;++m)f[m]===p&&(h[x++]=h[m]);return h.length=x,h}function c(h,f,p){var x=o(h,p);if(f===0)return p?x.cells.concat(x.boundary):x.cells;for(var m=1,v=x.active,S=x.next,_=x.flags,g=x.cells,E=x.constraint,d=x.neighbor;v.length>0||S.length>0;){for(;v.length>0;){var l=v.pop();if(_[l]!==-m){_[l]=m,g[l];for(var b=0;b<3;++b){var u=d[3*l+b];u>=0&&_[u]===0&&(E[3*l+b]?S.push(u):(v.push(u),_[u]=m))}}}var R=S;S=v,v=R,S.length=0,m=-m}var w=a(g,_,f);return p?w.concat(x.boundary):w}}}),qS=wn({"node_modules/cdt2d/cdt2d.js"(i,t){var e=kS(),n=HS(),r=WS(),s=XS();t.exports=f;function o(p){return[Math.min(p[0],p[1]),Math.max(p[0],p[1])]}function a(p,x){return p[0]-x[0]||p[1]-x[1]}function c(p){return p.map(o).sort(a)}function h(p,x,m){return x in p?p[x]:m}function f(p,x,m){Array.isArray(x)?(m=m||{},x=x||[]):(m=x||{},x=[]);var v=!!h(m,"delaunay",!0),S=!!h(m,"interior",!0),_=!!h(m,"exterior",!0),g=!!h(m,"infinity",!1);if(!S&&!_||p.length===0)return[];var E=e(p,x);if(v||S!==_||g){for(var d=n(p.length,c(x)),l=0;l<E.length;++l){var b=E[l];d.addTriangle(b[0],b[1],b[2])}return v&&r(p,d),_?S?g?s(d,0,g):d.cells():s(d,1,g):s(d,-1)}else return E}}});const YS=qS();class ur{constructor(t){this.createFn=t,this._pool=[],this._index=0}getInstance(){return this._index>=this._pool.length&&this._pool.push(this.createFn()),this._pool[this._index++]}clear(){this._index=0}reset(){this._pool.length=0,this._index=0}}const $f=1e-16,jS=1e-16,rr=new I,Kf=new I,Jf=new ur(()=>({param:0,index:0})),ZS=new ur(()=>new I);function $S(i,t,e,n){Jf.clear(),t.length=0,e.length=0;for(let h=0,f=i.length;h<f;h++){const p=i[h];c(p.start),c(p.end)}for(let h=0,f=i.length;h<f;h++){const p=i[h];for(let x=h+1;x<f;x++){const m=i[x];p.distanceSqToLine3(m,rr,Kf)<$f*n&&c(Kf)}}const r=[];for(let h=0,f=i.length;h<f;h++){r.length=0;const p=i[h];for(let x=0,m=t.length;x<m;x++){const v=t[x],S=p.closestPointToPointParameter(v,!0);if(p.at(S,rr),v.distanceToSquared(rr)<$f*n){const _=Jf.getInstance();_.param=S,_.index=x,r.push(_)}}r.sort(a);for(let x=0,m=r.length-1;x<m;x++){const v=r[x].index,S=r[x+1].index;v!==S&&e.push([v,S])}}const s=new Set;let o=0;for(let h=0,f=e.length;h<f;h++){const p=e[h],x=Math.min(p[0],p[1]),m=Math.max(p[0],p[1]),v=x+","+m;s.has(v)||(s.add(v),e[o++]=p)}e.length=o;function a(h,f){return h.param-f.param}function c(h){for(let f=0;f<t.length;f++){const p=t[f];if(h===p||h.distanceToSquared(p)<jS*n)return f}return t.push(ZS.getInstance().copy(h)),t.length-1}}class Qf{constructor(){this.trianglePool=new ur(()=>new pn),this.linePool=new ur(()=>new We),this.triangles=[],this.triangleIndices=[],this.constrainedEdges=[],this.triangleConnectivity=[],this.normal=new I,this.projOrigin=new I,this.projU=new I,this.projV=new I,this.baseTri=new pn,this.baseIndices=new Array(3)}initialize(t,e=null,n=null,r=null){this.reset();const{normal:s,baseTri:o,projU:a,projV:c,projOrigin:h,constrainedEdges:f,linePool:p,baseIndices:x}=this;t.getNormal(s),o.copy(t),o.update(),x[0]=e,x[1]=n,x[2]=r,f.length=0;const m=p.getInstance();m.start.copy(o.a),m.end.copy(o.b);const v=p.getInstance();v.start.copy(o.b),v.end.copy(o.c);const S=p.getInstance();S.start.copy(o.c),S.end.copy(o.a),f.push(m,v,S),h.copy(o.a),a.subVectors(o.b,o.a).normalize(),c.crossVectors(s,a).normalize()}addConstraintEdge(t){const{constrainedEdges:e,linePool:n}=this,r=n.getInstance().copy(t);e.push(r)}_to2D(t,e){const{projOrigin:n,projU:r,projV:s}=this;return rr.subVectors(t,n),e.set(rr.dot(r),rr.dot(s),0)}_from2D(t,e,n){const{projOrigin:r,projU:s,projV:o}=this;return n.copy(r).addScaledVector(s,t).addScaledVector(o,e),n}triangulate(){const{triangles:t,trianglePool:e,triangleConnectivity:n,triangleIndices:r,linePool:s,baseTri:o,constrainedEdges:a,baseIndices:c}=this;t.length=0,e.clear();const h=[];for(let g=0,E=a.length;g<E;g++){const d=a[g],l=s.getInstance();this._to2D(d.start,l.start),this._to2D(d.end,l.end),h.push(l)}let f=0;for(let g=0;g<3;g++){const E=this._to2D(o.points[g],rr);f=Math.max(f,Math.abs(E.x),Math.abs(E.y))}const p=[],x=[];$S(h,p,x,f);const m=[];for(let g=0,E=p.length;g<E;g++){const d=p[g];m.push([d.x,d.y])}const v=YS(m,x,{exterior:!1}),S=new Map;for(let g=0,E=x.length;g<E;g++){const d=x[g];S.set(`${d[0]}_${d[1]}`,-1),S.set(`${d[1]}_${d[0]}`,-1)}const _=`${c[0]}_${c[1]}_${c[2]}_`;for(let g=0,E=v.length;g<E;g++){const d=v[g],[l,b,u]=d,R=e.getInstance();this._from2D(m[l][0],m[l][1],R.a),this._from2D(m[b][0],m[b][1],R.b),this._from2D(m[u][0],m[u][1],R.c),t.push(R);const w=[];n.push(w);const M=[];r.push(M);for(let y=0;y<3;y++){const T=d[y];M.push(T<3?c[T]:_+T);const A=d[(y+1)%3],C=`${T}_${A}`;if(S.has(C)){const F=S.get(C);F!==-1&&(w.push(F),n[F].push(g))}else{const F=`${A}_${T}`;S.set(F,g)}}}}reset(){this.trianglePool.clear(),this.linePool.clear(),this.triangles.length=0,this.triangleIndices.length=0,this.triangleConnectivity.length=0,this.constrainedEdges.length=0}}const KS=1e-14,qc=new I,td=new I,ed=new I;function Di(i,t=KS){qc.subVectors(i.b,i.a),td.subVectors(i.c,i.a),ed.subVectors(i.b,i.c);const e=qc.angleTo(td),n=qc.angleTo(ed),r=Math.PI-e-n;return Math.abs(e)<t||Math.abs(n)<t||Math.abs(r)<t||i.a.distanceToSquared(i.b)<t||i.a.distanceToSquared(i.c)<t||i.b.distanceToSquared(i.c)<t}const Yc=1e-10,Ps=1e-10,ui=new We,Ae=new We,hi=new I,nd=new I,id=new I,Qo=new In,jc=new pn;class rd{constructor(){this.trianglePool=new ur(()=>new ge),this.triangles=[],this.normal=new I}initialize(t){this.reset();const{triangles:e,trianglePool:n,normal:r}=this;if(Array.isArray(t))for(let s=0,o=t.length;s<o;s++){const a=t[s];if(s===0)a.getNormal(r);else if(Math.abs(1-a.getNormal(hi).dot(r))>Yc)throw new Error("Triangle Splitter: Cannot initialize with triangles that have different normals.");const c=n.getInstance();c.copy(a),e.push(c)}else{t.getNormal(r);const s=n.getInstance();s.copy(t),e.push(s)}}splitByTriangle(t,e){const{triangles:n}=this;if(e){for(let s=0,o=n.length;s<o;s++){const a=n[s];a.coplanarCount=0}const r=[t.a,t.b,t.c];for(let s=0;s<3;s++){const o=(s+1)%3,a=r[s],c=r[o];t.getNormal(nd).normalize(),hi.subVectors(c,a).normalize(),id.crossVectors(nd,hi),Qo.setFromNormalAndCoplanarPoint(id,a),this.splitByPlane(Qo,t)}}else t.getPlane(Qo),this.splitByPlane(Qo,t)}splitByPlane(t,e){const{triangles:n,trianglePool:r}=this;jc.copy(e),jc.needsUpdate=!0;for(let s=0,o=n.length;s<o;s++){const a=n[s];if(!jc.intersectsTriangle(a,ui,!0))continue;const{a:c,b:h,c:f}=a;let p=0,x=-1,m=!1,v=[],S=[];const _=[c,h,f];for(let g=0;g<3;g++){const E=(g+1)%3;ui.start.copy(_[g]),ui.end.copy(_[E]);const d=t.distanceToPoint(ui.start),l=t.distanceToPoint(ui.end);if(Math.abs(d)<Ps&&Math.abs(l)<Ps){m=!0;break}if(d>0?v.push(g):S.push(g),Math.abs(d)<Ps)continue;let b=!!t.intersectLine(ui,hi);!b&&Math.abs(l)<Ps&&(hi.copy(ui.end),b=!0),b&&!(hi.distanceTo(ui.start)<Yc)&&(hi.distanceTo(ui.end)<Yc&&(x=g),p===0?Ae.start.copy(hi):Ae.end.copy(hi),p++)}if(!m&&p===2&&Ae.distance()>Ps)if(x!==-1){x=(x+1)%3;let g=0;g===x&&(g=(g+1)%3);let E=g+1;E===x&&(E=(E+1)%3);const d=r.getInstance();d.a.copy(_[E]),d.b.copy(Ae.end),d.c.copy(Ae.start),Di(d)||n.push(d),a.a.copy(_[g]),a.b.copy(Ae.start),a.c.copy(Ae.end),Di(a)&&(n.splice(s,1),s--,o--)}else{const g=v.length>=2?S[0]:v[0];if(g===0){let u=Ae.start;Ae.start=Ae.end,Ae.end=u}const E=(g+1)%3,d=(g+2)%3,l=r.getInstance(),b=r.getInstance();_[E].distanceToSquared(Ae.start)<_[d].distanceToSquared(Ae.end)?(l.a.copy(_[E]),l.b.copy(Ae.start),l.c.copy(Ae.end),b.a.copy(_[E]),b.b.copy(_[d]),b.c.copy(Ae.start)):(l.a.copy(_[d]),l.b.copy(Ae.start),l.c.copy(Ae.end),b.a.copy(_[E]),b.b.copy(_[d]),b.c.copy(Ae.end)),a.a.copy(_[g]),a.b.copy(Ae.end),a.c.copy(Ae.start),Di(l)||n.push(l),Di(b)||n.push(b),Di(a)&&(n.splice(s,1),s--,o--)}else p===3&&console.warn("TriangleClipper: Coplanar clip not handled")}}reset(){this.triangles.length=0,this.trianglePool.clear()}}class sd{constructor(){this.coplanarSet=new Map,this.intersectionSet=new Map,this.edgeSet=new Map,this.ids=[]}add(t,e,n=!1){const{intersectionSet:r,coplanarSet:s,ids:o}=this;r.has(t)||(r.set(t,[]),o.push(t)),r.get(t).push(e),n&&(s.has(t)||s.set(t,new Set),s.get(t).add(e))}addIntersectionEdge(t,e){const{edgeSet:n}=this;n.has(t)||n.set(t,new Set),n.get(t).add(e)}getIntersectionEdges(t){return this.edgeSet.get(t)||null}}const Pp=0,Ip=1,JS=2,QS=3,t1=4,Lp=5,Dp=6,Zc=1e-10,e1=1e-15,n1=1e-10,i1=1e-10,od=new We,Hr=new We,ad=new I,cd=new I,ld=new I,$c=new In,Kr=new I,Ca=new I;function r1(i,t){i.getNormal(Kr),t.getNormal(Ca);const e=Kr.dot(Ca);if(Math.abs(1-Math.abs(e))>=n1)return!1;const n=Kr.dot(i.a),r=Kr.dot(t.a);return Math.abs(n-r)<i1}function ud(i,t,e,n){let r=0,s=1;i.delta(ad);const o=[t.a,t.b,t.c];for(let a=0;a<3;a++){const c=o[a],h=o[(a+1)%3];cd.subVectors(h,c),ld.crossVectors(e,cd),$c.setFromNormalAndCoplanarPoint(ld,c);const f=$c.distanceToPoint(i.start),p=$c.normal.dot(ad);if(Math.abs(p)<e1){if(f<-Zc)return null;continue}const x=-f/p;if(p>0?r=Math.max(r,x):s=Math.min(s,x),r>s+Zc)return null}return s-r<Zc?null:(i.at(r,n.start),i.at(s,n.end),n)}function hd(i,t,e){let n=0;i.getNormal(Kr),t.getNormal(Ca);const r=[t.a,t.b,t.c];for(let o=0;o<3;o++){Hr.start.copy(r[o]),Hr.end.copy(r[(o+1)%3]);const a=ud(Hr,i,Kr,od);a!==null&&(n>=e.length&&e.push(new We),e[n].copy(a),n++)}const s=[i.a,i.b,i.c];for(let o=0;o<3;o++){Hr.start.copy(s[o]),Hr.end.copy(s[(o+1)%3]);const a=ud(Hr,t,Ca,od);a!==null&&(n>=e.length&&e.push(new We),e[n].copy(a),n++)}return n}const Gr=new dr,fd=new $t,ta=new We,Kc=[],ea=new ur(()=>new We),Xr=-1,qr=1,da=-2,pa=2,Hs=0,Ki=1,Uu=2;let xa=null;function dd(i){xa=i}function Up(i,t,e=null){i.getMidpoint(Gr.origin),i.getNormal(Gr.direction),e&&(Gr.origin.applyMatrix4(e),Gr.direction.transformDirection(e));const n=t.raycastFirst(Gr,yn);return!!(n&&Gr.direction.dot(n.face.normal)>0)?Xr:qr}function s1(i,t){const e=new sd,n=new sd;return ea.clear(),fd.copy(i.matrixWorld).invert().multiply(t.matrixWorld),i.geometry.boundsTree.bvhcast(t.geometry.boundsTree,fd,{intersectsTriangles(r,s,o,a){if(!Di(r)&&!Di(s)){const h=(r1(r,s)?hd(r,s,Kc):0)>2;if(h||r.intersectsTriangle(s,ta,!0)){const p=i.geometry.boundsTree.resolveTriangleIndex(o),x=t.geometry.boundsTree.resolveTriangleIndex(a);if(e.add(p,x,h),n.add(x,p,h),h){const m=hd(r,s,Kc);for(let v=0;v<m;v++){const S=ea.getInstance().copy(Kc[v]);e.addIntersectionEdge(p,S),n.addIntersectionEdge(x,S)}}else{const m=ea.getInstance().copy(ta),v=ea.getInstance().copy(ta);e.addIntersectionEdge(p,m),n.addIntersectionEdge(x,v)}xa&&(xa.addEdge(ta),xa.addIntersectingTriangles(o,r,a,s))}}return!1}}),{aIntersections:e,bIntersections:n}}function Np(i,t,e=!1){switch(i){case Pp:if(t===qr||t===pa&&!e)return Ki;break;case Ip:if(e){if(t===Xr)return Hs}else if(t===qr||t===da)return Ki;break;case JS:if(e){if(t===qr||t===da)return Ki}else if(t===Xr)return Hs;break;case t1:if(t===Xr)return Hs;if(t===qr)return Ki;break;case QS:if(t===Xr||t===pa&&!e)return Ki;break;case Lp:if(!e&&(t===qr||t===da))return Ki;break;case Dp:if(!e&&(t===Xr||t===pa))return Ki;break;default:throw new Error(`Unrecognized CSG operation enum "${i}".`)}return Uu}class o1{constructor(t){this.triangle=new ge().copy(t),this.intersects={}}addTriangle(t,e){this.intersects[t]=new ge().copy(e)}getIntersectArray(){const t=[],{intersects:e}=this;for(const n in e)t.push(e[n]);return t}}class pd{constructor(){this.data={}}addTriangleIntersection(t,e,n,r){const{data:s}=this;s[t]||(s[t]=new o1(e)),s[t].addTriangle(n,r)}getTrianglesAsArray(t=null){const{data:e}=this,n=[];if(t!==null)t in e&&n.push(e[t].triangle);else for(const r in e)n.push(e[r].triangle);return n}getTriangleIndices(){return Object.keys(this.data).map(t=>parseInt(t))}getIntersectionIndices(t){const{data:e}=this;return e[t]?Object.keys(e[t].intersects).map(n=>parseInt(n)):[]}getIntersectionsAsArray(t=null,e=null){const{data:n}=this,r=new Set,s=[],o=a=>{if(n[a])if(e!==null)n[a].intersects[e]&&s.push(n[a].intersects[e]);else{const c=n[a].intersects;for(const h in c)r.has(h)||(r.add(h),s.push(c[h]))}};if(t!==null)o(t);else for(const a in n)o(a);return s}reset(){this.data={}}}class a1{constructor(){this.enabled=!1,this.triangleIntersectsA=new pd,this.triangleIntersectsB=new pd,this.intersectionEdges=[]}addIntersectingTriangles(t,e,n,r){const{triangleIntersectsA:s,triangleIntersectsB:o}=this;s.addTriangleIntersection(t,e,n,r),o.addTriangleIntersection(n,r,t,e)}addEdge(t){this.intersectionEdges.push(t.clone())}reset(){this.triangleIntersectsA.reset(),this.triangleIntersectsB.reset(),this.intersectionEdges=[]}init(){this.enabled&&(this.reset(),dd(this))}complete(){this.enabled&&dd(null)}}const vn=new $t,Ji=new $t,un=new $t,Ii=new Zt,kn=new ge,Qi=new ge,Hn=new ge,Ci=new ge,or=[],Kn=[],na=new Set,xd=new I,md=new I,gd=new ur(()=>new ge),_d=new I,ia=[];function c1(i,t,e,n,r,s={}){const{useGroups:o=!0}=s,{aIntersections:a,bIntersections:c}=s1(i,t),h=[];let f=null,p;return p=o?0:-1,yd(i,t,a,e,!1,r,p),vd(i,t,a,e,!1,n,r,p),e.findIndex(m=>m!==Dp&&m!==Lp)!==-1&&(r.forEach(m=>m.clearIndexMap()),p=o?i.geometry.groups.length||1:-1,yd(t,i,c,e,!0,r,p),vd(t,i,c,e,!0,n,r,p)),r.forEach(m=>m.clearIndexMap()),or.length=0,{groups:h,materials:f}}function vd(i,t,e,n,r,s,o,a=0){vn.copy(t.matrixWorld).invert().multiply(i.matrixWorld),Ji.copy(vn).invert(),r?un.copy(vn):un.identity();const c=un.determinant()<0;Ii.getNormalMatrix(un).multiplyScalar(c?-1:1);const h=i.geometry.groupIndices,f=i.geometry.index,p=i.geometry.attributes.position,x=t.geometry.boundsTree,m=t.geometry.index,v=t.geometry.attributes.position,S=e.ids;for(let _=0,g=S.length;_<g;_++){const E=S[_],d=a===-1?0:h[E]+a,l=3*E;let b=l+0,u=l+1,R=l+2;f&&(b=f.getX(b),u=f.getX(u),R=f.getX(R)),kn.a.fromBufferAttribute(p,b),kn.b.fromBufferAttribute(p,u),kn.c.fromBufferAttribute(p,R),r&&(kn.a.applyMatrix4(vn),kn.b.applyMatrix4(vn),kn.c.applyMatrix4(vn)),s.reset(),s.initialize(kn,b,u,R),ia.length=0,gd.clear(),kn.getNormal(md);const w=e.coplanarSet.get(E);if(w)for(const A of w){const C=3*A;let F=C+0,N=C+1,O=C+2;m&&(F=m.getX(F),N=m.getX(N),O=m.getX(O));const B=gd.getInstance();B.a.fromBufferAttribute(v,F),B.b.fromBufferAttribute(v,N),B.c.fromBufferAttribute(v,O),r||(B.a.applyMatrix4(Ji),B.b.applyMatrix4(Ji),B.c.applyMatrix4(Ji)),ia.push(B)}if(s.addConstraintEdge){const A=e.getIntersectionEdges(E);if(A)for(const C of A)s.addConstraintEdge(C);s.triangulate()}else{const C=e.intersectionSet.get(E);for(let F=0,N=C.length;F<N;F++){const O=C[F],B=w&&w.has(O),V=3*O;let W=V+0,nt=V+1,it=V+2;m&&(W=m.getX(W),nt=m.getX(nt),it=m.getX(it)),Qi.a.fromBufferAttribute(v,W),Qi.b.fromBufferAttribute(v,nt),Qi.c.fromBufferAttribute(v,it),r||(Qi.a.applyMatrix4(Ji),Qi.b.applyMatrix4(Ji),Qi.c.applyMatrix4(Ji)),s.splitByTriangle(Qi,B)}}const{triangles:M,triangleIndices:y=[],triangleConnectivity:T=[]}=s;for(let A=0,C=o.length;A<C;A++)o[A].initInterpolatedAttributeData(i.geometry,un,Ii,b,u,R);na.clear();for(let A=0,C=M.length;A<C;A++){if(na.has(A))continue;const F=M[A],N=r?null:vn;let O=null;F.getMidpoint(xd);for(let B=0,V=ia.length;B<V;B++){const W=ia[B];if(W.containsPoint(xd)){W.getNormal(_d),O=md.dot(_d)>0?pa:da;break}}O===null&&(O=Up(F,x,N)),or.length=0,Kn.length=0;for(let B=0,V=n.length;B<V;B++){const W=Np(n[B],O,r);W!==Uu&&(or.push(W),Kn.push(o[B]))}if(Kn.length!==0){const B=[A];for(;B.length>0;){const V=B.pop();if(na.has(V))continue;na.add(V);const W=y[V];let nt=null,it=null,ht=null;W&&(nt=W[0],it=W[1],ht=W[2]);const _t=M[V];kn.getBarycoord(_t.a,Ci.a),kn.getBarycoord(_t.b,Ci.b),kn.getBarycoord(_t.c,Ci.c);for(let yt=0,Tt=Kn.length;yt<Tt;yt++){const Y=Kn[yt],st=or[yt]===Hs,lt=c!==st;Y.appendInterpolatedAttributeData(d,Ci.a,nt,lt),lt?(Y.appendInterpolatedAttributeData(d,Ci.c,ht,lt),Y.appendInterpolatedAttributeData(d,Ci.b,it,lt)):(Y.appendInterpolatedAttributeData(d,Ci.b,it,lt),Y.appendInterpolatedAttributeData(d,Ci.c,ht,lt))}}}}}return S.length}function yd(i,t,e,n,r,s,o=0){vn.copy(t.matrixWorld).invert().multiply(i.matrixWorld),r?un.copy(vn):un.identity();const a=un.determinant()<0;Ii.getNormalMatrix(un).multiplyScalar(a?-1:1);const c=t.geometry.boundsTree,h=i.geometry.groupIndices,f=i.geometry.index,x=i.geometry.attributes.position,m=[],v=i.geometry.halfEdges,S=new Set(e.ids),_=Lu(i.geometry);for(let g=0;g<_&&S.size!==_;g++){if(S.has(g))continue;S.add(g),m.push(g);const E=3*g;let d=E+0,l=E+1,b=E+2;f&&(d=f.getX(d),l=f.getX(l),b=f.getX(b)),Hn.a.fromBufferAttribute(x,d),Hn.b.fromBufferAttribute(x,l),Hn.c.fromBufferAttribute(x,b),r&&(Hn.a.applyMatrix4(vn),Hn.b.applyMatrix4(vn),Hn.c.applyMatrix4(vn));const u=Up(Hn,c,r?null:vn);or.length=0,Kn.length=0;for(let R=0,w=n.length;R<w;R++){const M=Np(n[R],u,r);M!==Uu&&(or.push(M),Kn.push(s[R]))}for(;m.length>0;){const R=m.pop();for(let w=0;w<3;w++){const M=v.getSiblingTriangleIndex(R,w);M!==-1&&!S.has(M)&&(m.push(M),S.add(M))}if(Kn.length!==0){const w=3*R;let M=w+0,y=w+1,T=w+2;f&&(M=f.getX(M),y=f.getX(y),T=f.getX(T));const A=o===-1?0:h[R]+o;if(Hn.a.fromBufferAttribute(x,M),Hn.b.fromBufferAttribute(x,y),Hn.c.fromBufferAttribute(x,T),!Di(Hn))for(let C=0,F=Kn.length;C<F;C++){const N=Kn[C],V=or[C]===Hs!==a;N.appendIndexFromGeometry(i.geometry,un,Ii,A,M,V),V?(N.appendIndexFromGeometry(i.geometry,un,Ii,A,T,V),N.appendIndexFromGeometry(i.geometry,un,Ii,A,y,V)):(N.appendIndexFromGeometry(i.geometry,un,Ii,A,y,V),N.appendIndexFromGeometry(i.geometry,un,Ii,A,T,V))}}}}}function l1(i){return i=~~i,i+4-i%4}class u1{constructor(t,e=500){this.expansionFactor=1.5,this.type=t,this.length=0,this.array=null,this.setSize(e)}setType(t){if(t===this.type)return;if(this.length!==0)throw new Error("TypeBackedArray: Cannot change the type while there is used data in the buffer.");const e=this.array.buffer;this.array=new t(e),this.type=t}setSize(t){if(this.array&&t===this.array.length)return;const e=this.type,n=wp()?SharedArrayBuffer:ArrayBuffer,r=new e(new n(l1(t*e.BYTES_PER_ELEMENT)));this.array&&r.set(this.array,0),this.array=r}expand(){const{array:t,expansionFactor:e}=this;this.setSize(t.length*e)}push(...t){let{array:e,length:n}=this;n+t.length>e.length&&(this.expand(),e=this.array);for(let r=0,s=t.length;r<s;r++)e[n+r]=t[r];this.length+=t.length}clear(){this.length=0}}const ln=new I,Jc=new I,Qc=new I,tl=new I,ra=new pe,h1=new pe,f1=new pe,d1=new pe;function p1(i,t,e,n,r,s=!1,o=!1){return r.set(0,0,0,0).addScaledVector(i,n.x).addScaledVector(t,n.y).addScaledVector(e,n.z),s&&r.normalize(),o&&r.multiplyScalar(-1),r}function bd(i,t,e){switch(t){case 1:e.push(i.x);break;case 2:e.push(i.x,i.y);break;case 3:e.push(i.x,i.y,i.z);break;case 4:e.push(i.x,i.y,i.z,i.w);break}}class el extends u1{get count(){return this.length/this.itemSize}constructor(...t){super(...t),this.itemSize=1,this.normalized=!1}}class x1{constructor(){this.attributeData={},this.groupIndices=[],this.forwardIndexMap=new Map,this.invertedIndexMap=new Map,this.interpolatedFields={}}initFromGeometry(t,e){this.clear();const{attributeData:n}=this,r=t.attributes;for(let s=0,o=e.length;s<o;s++){const a=e[s],c=r[a],h=c.array.constructor;n[a]||(n[a]=new el(h)),n[a].setType(h),n[a].itemSize=c.itemSize,n[a].normalized=c.normalized}for(const s in n.attributes)e.includes(s)||n.delete(s)}initInterpolatedAttributeData(t,e,n,r,s,o){const{attributeData:a,interpolatedFields:c}=this,{attributes:h}=t;for(const f in a){const p=h[f];if(!p)throw new Error(`CSG Operations: Attribute ${f} not available on geometry.`);let x,m,v;if(f==="position"?(x=Jc.fromBufferAttribute(p,r).applyMatrix4(e),m=Qc.fromBufferAttribute(p,s).applyMatrix4(e),v=tl.fromBufferAttribute(p,o).applyMatrix4(e)):f==="normal"?(x=Jc.fromBufferAttribute(p,r).applyNormalMatrix(n),m=Qc.fromBufferAttribute(p,s).applyNormalMatrix(n),v=tl.fromBufferAttribute(p,o).applyNormalMatrix(n)):f==="tangent"?(x=Jc.fromBufferAttribute(p,r).transformDirection(e),m=Qc.fromBufferAttribute(p,s).transformDirection(e),v=tl.fromBufferAttribute(p,o).transformDirection(e)):(x=h1.fromBufferAttribute(p,r),m=f1.fromBufferAttribute(p,s),v=d1.fromBufferAttribute(p,o)),!c[f])c[f]=[x.clone(),m.clone(),v.clone()];else{const S=c[f];S[0].copy(x),S[1].copy(m),S[2].copy(v)}}}appendInterpolatedAttributeData(t,e,n=null,r=!1){const{groupIndices:s,attributeData:o,interpolatedFields:a,forwardIndexMap:c,invertedIndexMap:h}=this;for(;s.length<=t;)s.push(new el(Uint32Array));const f=r?h:c,p=s[t];if(n!==null&&f.has(n))p.push(f.get(n));else{f.set(n,o.position.count),p.push(o.position.count);for(const x in a){const m=o[x],v=x==="normal"||x==="tangent",S=r&&v,_=m.itemSize,[g,E,d]=a[x];p1(g,E,d,e,ra,v,S),bd(ra,_,m)}}}appendIndexFromGeometry(t,e,n,r,s,o=!1){const{groupIndices:a,attributeData:c,forwardIndexMap:h,invertedIndexMap:f}=this;for(;a.length<=r;)a.push(new el(Uint32Array));const p=o?f:h,x=a[r];if(s!==null&&p.has(s))x.push(p.get(s));else{p.set(s,c.position.count),x.push(c.position.count);const{attributes:m}=t;for(const v in c){const S=c[v],_=m[v];if(!_)throw new Error(`CSG Operations: Attribute ${v} not available on geometry.`);const g=_.itemSize;v==="position"?(ln.fromBufferAttribute(_,s).applyMatrix4(e),S.push(ln.x,ln.y,ln.z)):v==="normal"?(ln.fromBufferAttribute(_,s).applyNormalMatrix(n),o&&ln.multiplyScalar(-1),S.push(ln.x,ln.y,ln.z)):v==="tangent"?(ln.fromBufferAttribute(_,s).transformDirection(e),o&&ln.multiplyScalar(-1),S.push(ln.x,ln.y,ln.z)):(ra.fromBufferAttribute(_,s),bd(ra,g,S))}}}buildGeometry(t,e){let n=!1;const{groupIndices:r,attributeData:s}=this,{attributes:o,index:a}=t;for(const f in s){const p=s[f],{type:x,itemSize:m,normalized:v,length:S,count:_}=p,g=p.array.buffer;let E=o[f];(!E||E.count<_||E.array.type!==x)&&(E=new Me(new x(S),m,v),t.setAttribute(f,E),n=!0),E.array.set(new x(g,0,S),0),E.needsUpdate=!0}const c=r.reduce((f,p)=>p.count+f,0);(!t.index||a.count<c||a.array.type!==Uint32Array)&&(t.setIndex(new Me(new Uint32Array(c),1)),n=!0),t.clearGroups();let h=0;for(let f=0,p=Math.min(e.length,r.length);f<p;f++){const{index:x,materialIndex:m}=e[f],{count:v}=r[x],S=r[x].array.buffer;v!==0&&(t.index.array.set(new Uint32Array(S,0,v),h),t.addGroup(h,v,m),h+=v)}t.setDrawRange(0,h),t.boundsTree=null,t.boundingBox=null,t.boundingSphere=null,n&&t.dispose()}clearIndexMap(){this.forwardIndexMap.clear(),this.invertedIndexMap.clear()}clear(){const{groupIndices:t,attributeData:e}=this;this.interpolatedFields={};for(const n in e)e[n].clear();t.forEach(n=>{n.clear()}),this.clearIndexMap()}}function m1(i,t){for(const e in i.attributes)t.includes(e)||(i.deleteAttribute(e),i.dispose());return i}function g1(i,t){const e=[];for(let n=0,r=i.length;n<r;n++){const s=i[n],o=t[s.materialIndex];e.push({...s,materialIndex:t.indexOf(o)})}return e}function _1(i,t){const e=[],n=new Map;for(let r=0,s=i.length;r<s;r++){const o=i[r];n.has(o.materialIndex)||(n.set(o.materialIndex,e.length),e.push(t[o.materialIndex])),o.materialIndex=n.get(o.materialIndex)}return e}function v1(i){for(let t=0;t<i.length-1;t++){const e=i[t],n=i[t+1];if(e.materialIndex===n.materialIndex){const r=e.start,s=n.start+n.count;n.start=r,n.count=s-r,i.splice(t,1),t--}}}function Md(i,t){let e=t;return Array.isArray(t)||(e=[],i.forEach(n=>{e[n.materialIndex]=t})),e}class y1{get useCDTClipping(){return this.triangleSplitter instanceof Qf}set useCDTClipping(t){t!==this.useCDTClipping&&(this.triangleSplitter=t?new Qf:new rd)}constructor(){this.triangleSplitter=new rd,this.geometryBuilders=[],this.attributes=["position","uv","normal"],this.useGroups=!0,this.consolidateGroups=!0,this.removeUnusedMaterials=!0,this.debug=new a1}getGroupRanges(t){return!this.useGroups||t.groups.length===0?[{start:0,count:1/0,materialIndex:0}]:t.groups.map(n=>({...n}))}evaluate(t,e,n,r=new su){let s=!0;if(Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r],s=!1),r.length!==n.length)throw new Error("Evaluator: operations and target array passed as different sizes.");t.prepareGeometry(),e.prepareGeometry();const{triangleSplitter:o,geometryBuilders:a,attributes:c,useGroups:h,consolidateGroups:f,removeUnusedMaterials:p,debug:x}=this;for(;a.length<r.length;)a.push(new x1);r.forEach((d,l)=>{a[l].initFromGeometry(t.geometry,c),m1(d.geometry,c)}),x.init(),c1(t,e,n,o,a,{useGroups:h}),x.complete();const m=this.getGroupRanges(t.geometry),v=Md(m,t.material),S=this.getGroupRanges(e.geometry),_=Md(S,e.material);S.forEach(d=>d.materialIndex+=v.length);const g=[...v,..._];let E=[...m,...S].map((d,l)=>({...d,index:l}));return h?h&&f&&(E=g1(E,g),E.sort((d,l)=>d.materialIndex-l.materialIndex)):E=[{start:0,count:1/0,index:0,materialIndex:0}],r.forEach((d,l)=>{const b=d.geometry;a[l].buildGeometry(b,E),t.matrixWorld.decompose(d.position,d.quaternion,d.scale),d.updateMatrix(),d.matrixWorld.copy(t.matrixWorld),h?(d.material=g,f&&v1(b.groups),p&&(d.material=_1(b.groups,g))):d.material=g[0]}),s?r:r[0]}evaluateHierarchy(t,e=new su){t.updateMatrixWorld(!0);const n=(s,o)=>{const a=s.children;for(let c=0,h=a.length;c<h;c++){const f=a[c];f.isOperationGroup?n(f,o):o(f)}},r=s=>{const o=s.children;let a=!1;for(let h=0,f=o.length;h<f;h++){const p=o[h];a=r(p)||a}const c=s.isDirty();if(c&&s.markUpdated(),a&&!s.isOperationGroup){let h;return n(s,f=>{h?h=this.evaluate(h,f,f.operation):h=this.evaluate(s,f,f.operation)}),s._cachedGeometry=h.geometry,s._cachedMaterials=h.material,!0}else return a||c};return r(t),e.geometry=t._cachedGeometry,e.material=t._cachedMaterials,e}reset(){this.triangleSplitter.reset()}}const Nu={box:{label:"Box",size:[2,2,2],make:()=>new Re(1,1,1)},sphere:{label:"Sphere",size:[2,2,2],make:()=>new no(.5,48,32)},cylinder:{label:"Cylinder",size:[2,2,2],make:()=>new ke(.5,.5,1,48)},cone:{label:"Cone",size:[2,2,2],make:()=>new Ta(.5,1,48)},pyramid:{label:"Pyramid",size:[2,2,2],make:()=>new Ta(Math.SQRT1_2,1,4).rotateY(Math.PI/4)},wedge:{label:"Wedge",size:[2,2,2],make:()=>{const i=new rp;return i.moveTo(-.5,-.5),i.lineTo(.5,-.5),i.lineTo(-.5,.5),i.closePath(),new Mu(i,{depth:1,bevelEnabled:!1})}},torus:{label:"Ring",size:[2,.6,2],make:()=>new Li(.35,.15,24,64).rotateX(Math.PI/2)},dome:{label:"Dome",size:[2,1,2],make:()=>{const i=new no(.5,48,24,0,Math.PI*2,0,Math.PI/2),t=new _u(.5,48).rotateX(Math.PI/2);return bM([i,t])}}},b1=new Set(["box","sphere","cylinder","cone","pyramid","torus","dome"]),Fp=["#e8604c","#f2a541","#f4d35e","#5fbf77","#3fa7d6","#6c63ff","#c069c9","#f0f0f0","#8a8f98","#2b2d33"],nl={move:.5,rotate:Bi.degToRad(15),scale:.25},Gs=.05,Fu="shaper3d.autosave.v1",Sd=10,Pa=document.getElementById("viewport"),Nn=new Tb({antialias:!0});Nn.setPixelRatio(Math.min(window.devicePixelRatio,2));Nn.shadowMap.enabled=!0;Nn.shadowMap.type=Cd;Pa.appendChild(Nn.domElement);const Xn=new Wl;Xn.background=new Jt(1842981);const dn=new Pn(45,1,.1,2e3);dn.position.set(12,10,14);Xn.add(new Sm(16777215,3817290,1.6));const ds=new hp(16777215,2.2);ds.position.set(10,22,8);ds.castShadow=!0;ds.shadow.mapSize.set(2048,2048);Object.assign(ds.shadow.camera,{left:-25,right:25,top:25,bottom:-25,near:1,far:80});ds.shadow.bias=-5e-4;Xn.add(ds);const Op=new hp(12571903,.6);Op.position.set(-12,6,-10);Xn.add(Op);const Ou=new Ct(new hs(400,400),new ym({opacity:.28}));Ou.rotation.x=-Math.PI/2;Ou.receiveShadow=!0;Xn.add(Ou);const Bp=new Bm(40,40,4870494,3159359);Bp.position.y=.002;Xn.add(Bp);const zp=new Kd(new Ie().setFromPoints([new I(-20,.004,0),new I(20,.004,0),new I(0,.004,-20),new I(0,.004,20)]),new Ua({vertexColors:!0}));zp.geometry.setAttribute("color",new ie([.85,.3,.3,.85,.3,.3,.3,.5,.9,.3,.5,.9],3));Xn.add(zp);const ro=new ir;Xn.add(ro);const Je=new Vb(dn,Nn.domElement);Je.setSize(1.1);Xn.add(Je.getHelper());const Tn=new Ab(dn,Nn.domElement);Tn.enableDamping=!0;Tn.dampingFactor=.12;Tn.target.set(0,1,0);Tn.maxDistance=400;function Vp(){const i=Pa.clientWidth,t=Pa.clientHeight;!i||!t||(Nn.setSize(i,t),dn.aspect=i/t,dn.updateProjectionMatrix())}new ResizeObserver(Vp).observe(Pa);Vp();Nn.setAnimationLoop(()=>{Tn.update(),Nn.render(Xn,dn)});const xe=[],il={};let kp=0;function M1(i){i.clearGroups(),i.computeBoundingBox();const t=i.boundingBox.getSize(new I),e=i.boundingBox.getCenter(new I);return i.translate(-e.x,-e.y,-e.z),i.scale(1/t.x,1/t.y,1/t.z),i.computeBoundingBox(),i}function S1(i){return il[i]||(il[i]=M1(Nu[i].make())),il[i]}function E1(i){const t=new Ie;return t.setAttribute("position",new ie(i.position,3)),i.normal?t.setAttribute("normal",new ie(i.normal,3)):t.computeVertexNormals(),i.index&&t.setIndex(i.index),t.computeBoundingBox(),t}const Ws=(i,t=1e4)=>Math.round(i*t)/t;function T1(i){return{position:Array.from(i.attributes.position.array,t=>Ws(t,1e5)),normal:i.attributes.normal?Array.from(i.attributes.normal.array,t=>Ws(t,1e4)):void 0,index:i.index?Array.from(i.index.array):void 0}}function Hp(i,t){return t?new jl({color:10134709,transparent:!0,opacity:.32,depthWrite:!1,roughness:.9}):new jl({color:i,roughness:.45,metalness:.05})}function Va(i){const t=i.type==="custom",e=t?E1(i.geometry):S1(i.type),n=new Ct(e,Hp(i.color,i.hole));return n.name=i.name,n.position.fromArray(i.position),n.rotation.set(...i.rotation),n.scale.fromArray(i.scale),n.visible=i.visible!==!1,n.castShadow=!i.hole,n.receiveShadow=!0,n.userData={id:i.id||crypto.randomUUID(),type:i.type,color:i.color,hole:!!i.hole,geomData:t?i.geometry:null,base:e.boundingBox.getSize(new I)},n}function Bu(i){xe.push(i),ro.add(i)}function ka(i){Je.object===i&&Je.detach(),ro.remove(i),xe.splice(xe.indexOf(i),1),i.material.dispose(),i.userData.type==="custom"&&i.geometry.dispose()}function zu(){Je.detach(),[...xe].forEach(ka)}function Vu(i){const t=i.userData;return{id:t.id,name:i.name,type:t.type,color:t.color,hole:t.hole,visible:i.visible,position:i.position.toArray().map(e=>Ws(e)),rotation:[i.rotation.x,i.rotation.y,i.rotation.z].map(e=>Ws(e,1e6)),scale:i.scale.toArray().map(e=>Ws(e)),...t.type==="custom"?{geometry:t.geomData}:{}}}function ku(){return{app:"shaper3d",version:1,objects:xe.map(Vu)}}function Hu(i){zu();for(const t of i.objects)t.type!=="custom"&&!Nu[t.type]||Bu(Va(t))}function Gp(i){return i.scale.clone().multiply(i.userData.base)}function w1(i,t){const e=i.userData.base;i.scale.set(Math.max(Gs,t.x)/(e.x||1),Math.max(Gs,t.y)/(e.y||1),Math.max(Gs,t.z)/(e.z||1))}function Gu(i){const t=new Set(xe.map(n=>n.name));let e=1;for(;t.has(`${i} ${e}`);)e++;return`${i} ${e}`}let jt=[],Jr=!1;const ps=()=>jt[jt.length-1]||null;function qe(i){jt=i.filter(e=>xe.includes(e));for(const e of xe){const n=jt.includes(e);e.material.emissive.set(n?2776319:0),e.material.emissiveIntensity=n?.22:0}const t=ps();t&&t.visible?Je.attach(t):Je.detach(),e0()}function A1(){return jt.map(i=>i.userData.id)}function Wp(i){qe(i.map(t=>xe.find(e=>e.userData.id===t)).filter(Boolean))}const Te={stack:[],index:-1},R1=60;function sn(){const i=JSON.stringify(ku());if(Te.stack[Te.index]!==i){Te.stack=Te.stack.slice(0,Te.index+1),Te.stack.push(i),Te.stack.length>R1&&Te.stack.shift(),Te.index=Te.stack.length-1;try{localStorage.setItem(Fu,i)}catch{}e0()}}function Xp(i){const t=A1();Hu(JSON.parse(i));try{localStorage.setItem(Fu,i)}catch{}Wp(t)}function qp(){Te.index<=0||(Te.index--,Xp(Te.stack[Te.index]))}function ou(){Te.index>=Te.stack.length-1||(Te.index++,Xp(Te.stack[Te.index]))}let sr=!0;function Yp(){Je.setTranslationSnap(sr?nl.move:null),Je.setRotationSnap(sr?nl.rotate:null),Je.setScaleSnap(sr?nl.scale:null)}Yp();function Xs(i){Je.setMode(i),document.querySelectorAll("[data-mode]").forEach(t=>t.classList.toggle("active",t.dataset.mode===i))}function jp(i){const t=Nu[i],e=Tn.target,n=Va({type:i,name:Gu(t.label),color:Fp[kp++%7],hole:!1,position:[Math.round(e.x),t.size[1]/2,Math.round(e.z)],rotation:[0,0,0],scale:t.size});Bu(n),qe([n]),Xs("translate"),sn()}function Zp(){if(!jt.length)return;const i=jt.map(t=>{const e=Vu(t);e.id=void 0,e.name=Gu(t.name.replace(/\s\d+$/,"")),e.position[0]+=1,e.position[2]+=1;const n=Va(e);return Bu(n),n});qe(i),sn()}function $p(){jt.length&&([...jt].forEach(ka),qe([]),sn())}function au(i){if(jt.length){for(const t of jt)t.userData.hole=i,t.material.dispose(),t.material=Hp(t.userData.color,i),t.castShadow=!i;qe(jt),sn()}}function Kp(){jt.length&&au(!jt.every(i=>i.userData.hole))}function Wu(i,t){for(const e of jt)e.userData.color=i,e.userData.hole||e.material.color.set(i);t&&sn()}function C1(){for(const i of jt){i.updateMatrixWorld();const t=new Xe().setFromObject(i);i.position.y-=t.min.y}cs(),sn()}function P1(i){i.updateMatrix();const t=new $t().compose(new I,i.quaternion,i.scale),e=i.geometry.clone();return e.applyMatrix4(t),e}function I1(i){if(i.index){const t=i.index.array;for(let e=0;e<t.length;e+=3)[t[e+1],t[e+2]]=[t[e+2],t[e+1]];return}for(const t of Object.values(i.attributes)){const e=t.array,n=t.itemSize;for(let r=0;r<t.count;r+=3)for(let s=0;s<n;s++){const o=(r+1)*n+s,a=(r+2)*n+s;[e[o],e[a]]=[e[a],e[o]]}}}function Jp(i,t,e){for(const r of Object.keys(t.attributes))r!=="position"&&r!=="normal"&&t.deleteAttribute(r);t.computeBoundingBox();const n=Vu(i);return Va({...n,type:"custom",position:e.toArray(),rotation:[0,0,0],scale:[1,1,1],geometry:T1(t)})}function L1(){if(!jt.length)return;const i=new Xe;jt.forEach(n=>i.expandByObject(n));const t=i.getCenter(new I).x,e=[];for(const n of[...jt]){const r=n.position.clone();r.x=2*t-r.x;const s=n.rotation;if(b1.has(n.userData.type)&&s.x===0&&s.y===0&&s.z===0){n.position.copy(r),e.push(n.userData.id);continue}const o=P1(n);o.scale(-1,1,1),I1(o);const a=Jp(n,o,r);o.dispose();const c=xe.indexOf(n);ka(n),xe.splice(c,0,a),ro.add(a),e.push(a.userData.id)}Wp(e),sn()}function Xu(){if(jt.length<2){bn("Select 2 or more objects to combine (Shift+click or Multi-select).");return}const i=jt.filter(f=>!f.userData.hole),t=jt.filter(f=>f.userData.hole);if(!i.length){bn("Combine needs at least one solid shape — holes cut into solids.");return}const e=new y1;e.attributes=["position","normal"],e.useGroups=!1;const n=f=>{f.updateMatrixWorld();const p=f.geometry.clone();p.applyMatrix4(f.matrixWorld);for(const m of Object.keys(p.attributes))m!=="position"&&m!=="normal"&&p.deleteAttribute(m);p.clearGroups();const x=new su(p);return x.updateMatrixWorld(),x};let r;try{r=n(i[0]);for(const f of i.slice(1))r=e.evaluate(r,n(f),Pp);for(const f of t)r=e.evaluate(r,n(f),Ip)}catch(f){console.error(f),bn("Could not combine these shapes. Try moving them slightly.");return}const s=r.geometry;if(!s.attributes.position||s.attributes.position.count===0){bn("Nothing left — the hole removes the whole shape.");return}s.computeBoundingBox();const o=s.boundingBox.getCenter(new I);s.translate(-o.x,-o.y,-o.z);const a=i[0],c=Jp(a,s,o);c.userData.id=crypto.randomUUID(),c.name=Gu("Group");const h=Math.min(...jt.map(f=>xe.indexOf(f)));[...jt].forEach(ka),xe.splice(h,0,c),ro.add(c),qe([c]),sn(),bn(t.length?"Combined — holes cut out.":"Combined into one object.")}function D1(i){i.visible=!i.visible,!i.visible&&jt.includes(i)&&qe(jt.filter(t=>t!==i)),sn()}const U1={persp:[.62,.5,.72],top:[0,1,1e-4],front:[0,1e-4,1],right:[1,1e-4,0]};function Ha(i=jt.length?jt:xe.filter(t=>t.visible)){const t=new Xe;i.length?i.forEach(o=>t.expandByObject(o)):t.set(new I(-4,0,-4),new I(4,2,4));const e=t.getBoundingSphere(new io),n=dn.position.clone().sub(Tn.target).normalize(),r=Bi.degToRad(dn.fov),s=Math.max(4,e.radius/Math.sin(r/2)*1.15);Tn.target.copy(e.center),dn.position.copy(e.center).addScaledVector(n,s)}function N1(i){const t=Math.max(dn.position.distanceTo(Tn.target),6);dn.position.copy(Tn.target).addScaledVector(new I(...U1[i]).normalize(),t),dn.lookAt(Tn.target)}const Ed=new fp,Td=new ct;let ma=null;Nn.domElement.addEventListener("pointerdown",i=>{ma={x:i.clientX,y:i.clientY,onGizmo:Je.axis!==null}});Nn.domElement.addEventListener("pointerup",i=>{if(!ma)return;const t=ma;if(ma=null,t.onGizmo||Math.hypot(i.clientX-t.x,i.clientY-t.y)>6)return;const e=Nn.domElement.getBoundingClientRect();Td.set((i.clientX-e.left)/e.width*2-1,-((i.clientY-e.top)/e.height)*2+1),Ed.setFromCamera(Td,dn);const n=Ed.intersectObjects(xe.filter(o=>o.visible),!1)[0],r=i.shiftKey||i.ctrlKey||i.metaKey||Jr;if(!n){r||qe([]);return}const s=n.object;qe(r?jt.includes(s)?jt.filter(o=>o!==s):[...jt,s]:[s])});let qs=null;Je.addEventListener("dragging-changed",i=>{Tn.enabled=!i.value,i.value?qs={primary:ps().position.clone(),others:jt.map(t=>t.position.clone())}:(qs=null,sn())});Je.addEventListener("objectChange",()=>{const i=ps();if(i){if(Je.mode==="scale"&&i.scale.set(Math.max(i.scale.x,.01),Math.max(i.scale.y,.01),Math.max(i.scale.z,.01)),Je.mode==="translate"&&qs&&jt.length>1){const t=i.position.clone().sub(qs.primary);jt.forEach((e,n)=>{e!==i&&e.position.copy(qs.others[n]).add(t)})}cs()}});function ga(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),2e3)}function Qp(){ga(new Blob([JSON.stringify(ku())],{type:"application/json"}),"my-design.json"),bn("Design saved.")}function F1(i){const t=new FileReader;t.onload=()=>{try{const e=JSON.parse(t.result);if(!e||!Array.isArray(e.objects))throw new Error("bad file");Hu(e),qe([]),sn(),Ha(),bn(`Opened ${i.name}`)}catch{bn("That file is not a Shaper 3D design.")}},t.readAsText(i)}function O1(){xe.length&&!confirm("Start a new design? (You can still undo this.)")||(zu(),qe([]),sn(),Tn.target.set(0,1,0),dn.position.set(12,10,14))}async function rl(i){const t=xe.filter(s=>s.visible&&!s.userData.hole);if(!t.length){bn("Nothing to export yet — add a solid shape first.");return}const e=xe.some(s=>s.visible&&s.userData.hole),n=new ir,r=new ir;n.add(r);for(const s of t){const o=new Ct(s.geometry,new jl({color:s.userData.color,roughness:.45,metalness:.05}));o.name=s.name,o.position.copy(s.position),o.quaternion.copy(s.quaternion),o.scale.copy(s.scale),r.add(o)}i!=="glb"?(r.scale.setScalar(Sd),i==="stl"&&(r.rotation.x=Math.PI/2)):r.scale.setScalar(Sd/1e3),n.updateMatrixWorld(!0);try{if(i==="stl"){const s=new Zb().parse(n,{binary:!0});ga(new Blob([s],{type:"model/stl"}),"my-design.stl")}else if(i==="obj")ga(new Blob([new $b().parse(n)],{type:"text/plain"}),"my-design.obj");else{const s=await new wa().parseAsync(n,{binary:!0});ga(new Blob([s],{type:"model/gltf-binary"}),"my-design.glb")}bn(e?"Exported. Note: holes only cut after you Combine them.":"Exported.")}catch(s){console.error(s),bn("Export failed.")}finally{n.traverse(s=>s.material&&s.material.dispose())}}const oe=i=>document.getElementById(i),t0=["x","y","z"];for(const i of document.querySelectorAll(".xyz")){const t=i.dataset.prop;t0.forEach((e,n)=>{const r=document.createElement("label");r.innerHTML=`<i class="${e}">${e.toUpperCase()}</i>`;const s=document.createElement("input");s.type="number",s.step=t==="rotation"?"15":"0.5",t==="size"&&(s.min=String(Gs)),s.dataset.prop=t,s.dataset.axis=String(n),s.addEventListener("change",B1),s.addEventListener("keydown",o=>o.key==="Enter"&&s.blur()),r.appendChild(s),i.appendChild(r)})}function B1(i){const t=i.target,e=ps(),n=parseFloat(t.value);if(!e||!Number.isFinite(n)){cs();return}const r=t0[+t.dataset.axis];if(t.dataset.prop==="position")e.position[r]=n;else if(t.dataset.prop==="rotation")e.rotation[r]=Bi.degToRad(n);else{const s=Gp(e),o=Math.max(Gs,n);oe("pLock").checked&&s[r]>0?s.multiplyScalar(o/s[r]):s[r]=o,w1(e,s)}cs(),sn()}const z1=oe("swatches");for(const i of Fp){const t=document.createElement("button");t.className="swatch",t.style.background=i,t.title=i,t.addEventListener("click",()=>{Wu(i,!0),cs()}),z1.appendChild(t)}oe("pColor").addEventListener("input",i=>Wu(i.target.value,!1));oe("pColor").addEventListener("change",i=>Wu(i.target.value,!0));oe("pName").addEventListener("change",i=>{const t=ps();t&&(t.name=i.target.value.trim()||t.name,sn())});const V1=i=>String(Math.round(i*100)/100);function cs(){const i=ps();if(oe("propsEmpty").hidden=!!i,oe("propsBody").hidden=!i,!i)return;const t=document.activeElement,e=(c,h)=>{c!==t&&(c.value=h)},n=oe("multiNote");n.hidden=jt.length<2,n.textContent=`${jt.length} objects selected — numbers below are for "${i.name}". Color and Solid/Hole apply to all.`,e(oe("pName"),i.name),e(oe("pColor"),i.userData.color),oe("pColor").disabled=jt.every(c=>c.userData.hole);const r=jt.every(c=>c.userData.hole),s=jt.some(c=>c.userData.hole);oe("pSolid").classList.toggle("active",!s),oe("pHole").classList.toggle("active",r);const o=Gp(i),a=[i.rotation.x,i.rotation.y,i.rotation.z].map(c=>Bi.radToDeg(c));document.querySelectorAll(".xyz input").forEach(c=>{const h=+c.dataset.axis,f=c.dataset.prop,p=f==="size"?o.getComponent(h):f==="position"?i.position.getComponent(h):a[h];e(c,V1(p))})}function k1(){const i=oe("outliner");if(i.replaceChildren(),oe("objCount").textContent=xe.length?`(${xe.length})`:"",!xe.length){const t=document.createElement("li");t.className="empty",t.textContent="No objects yet.",i.appendChild(t)}for(const t of xe){const e=document.createElement("li");e.classList.toggle("selected",jt.includes(t)),e.classList.toggle("hidden-obj",!t.visible);const n=document.createElement("span");n.className="dot"+(t.userData.hole?" hole":""),t.userData.hole||(n.style.background=t.userData.color);const r=document.createElement("button");r.className="name",r.textContent=t.name,r.addEventListener("click",o=>{if(!t.visible)return;const a=o.shiftKey||o.ctrlKey||o.metaKey||Jr;qe(a?jt.includes(t)?jt.filter(c=>c!==t):[...jt,t]:[t])});const s=document.createElement("button");s.className="eye",s.title=t.visible?"Hide":"Show",s.textContent=t.visible?"👁":"—",s.addEventListener("click",()=>D1(t)),e.append(n,r,s),i.appendChild(e)}}function e0(){cs(),k1(),document.querySelectorAll("[data-needs]").forEach(i=>{i.disabled=jt.length<+i.dataset.needs}),oe("undoBtn").disabled=Te.index<=0,oe("redoBtn").disabled=Te.index>=Te.stack.length-1,oe("hint").classList.toggle("gone",xe.length>0)}let wd;function bn(i){const t=oe("toast");t.textContent=i,t.classList.add("show"),clearTimeout(wd),wd=setTimeout(()=>t.classList.remove("show"),2800)}const Ad={new:O1,open:()=>oe("fileInput").click(),save:Qp,"export-stl":()=>rl("stl"),"export-obj":()=>rl("obj"),"export-glb":()=>rl("glb"),undo:qp,redo:ou,frame:()=>Ha(),snap:()=>{sr=!sr,Yp(),oe("snapBtn").classList.toggle("active",sr),bn(sr?"Snap on":"Snap off — free movement")},multi:()=>{Jr=!Jr,oe("multiBtn").classList.toggle("active",Jr),bn(Jr?"Multi-select on: tap objects to add them":"Multi-select off")},duplicate:Zp,delete:$p,hole:Kp,"set-solid":()=>au(!1),"set-hole":()=>au(!0),combine:Xu,mirror:L1,floor:C1,help:()=>oe("help").hidden=!1,"help-close":()=>oe("help").hidden=!0,"toggle-inspector":()=>document.body.classList.toggle("show-inspector")};document.addEventListener("click",i=>{var e;const t=i.target.closest("button");!t||t.disabled||(t.dataset.action&&Ad[t.dataset.action]?(Ad[t.dataset.action](),(e=t.closest("details"))==null||e.removeAttribute("open")):t.dataset.shape?jp(t.dataset.shape):t.dataset.mode?Xs(t.dataset.mode):t.dataset.view&&N1(t.dataset.view))});oe("help").addEventListener("click",i=>{i.target===oe("help")&&(oe("help").hidden=!0)});oe("fileInput").addEventListener("change",i=>{const t=i.target.files[0];t&&F1(t),i.target.value=""});window.addEventListener("keydown",i=>{if(i.target.closest("input, textarea, select"))return;const t=i.key.toLowerCase(),e=i.ctrlKey||i.metaKey;let n=!0;e&&t==="z"?(i.shiftKey?ou:qp)():e&&t==="y"?ou():e&&t==="d"?Zp():e&&t==="s"?Qp():e?n=!1:t==="w"?Xs("translate"):t==="e"?Xs("rotate"):t==="r"?Xs("scale"):t==="h"?Kp():t==="g"?Xu():t==="f"?Ha():t==="delete"||t==="backspace"?$p():t==="escape"?(qe([]),oe("help").hidden=!0):n=!1,n&&i.preventDefault()});try{const i=localStorage.getItem(Fu);i&&Hu(JSON.parse(i))}catch{zu()}kp=xe.length;qe([]);sn();xe.length&&Ha();window.shaper={scene:Xn,objects:xe,serialize:ku,addShape:jp,combineSelection:Xu,setSelection:qe};
