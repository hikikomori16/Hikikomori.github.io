/*
	Copyright (c) 2017 Anton Tupikov  ( antontupikov@gmail.com )
	
	- Delegate
	- trace
	- Tweener
	- Timer
	- SimpleScroll
	- StepScroll
	- Share
	- requestAnimFrame
	- ENTER_FRAME
	- hitTest
*/





var Delegate = {
	create: function(obj, func){
		var f = function()
		{
			var target = arguments.callee.target;
			var func = arguments.callee.func;

			return func.apply(target, arguments);
		};

		f.target = obj;
		f.func = func;

		return f;
	}
}








$("body").append('<div class="at_z"></div><div class="at_log"></div><div class="at_view"></div>');
$(".at_z").css({zIndex: 999, position: "fixed", width: "100%", height: "100%", top: "0px", left: "0px"});
$(".at_log").css({zIndex: 1000, position: "fixed", fontSize: "14px", color: "#0000ff", top: "100px", left: "100px"});

window.enabled = true;

window.trace = function(s, n, l)
{
	if(n)
	{
		$(".at_log").html(s);
	}
	else 
	{
		if(l) $(".at_log").append(s+", ");
		else $(".at_log").append("<br>"+s);
	}
}

window.enable = function()
{
	window.enabled = true;
	$(".at_z").css({display: "none"});
}

window.disable = function()
{
	window.enabled = false;
	$(".at_z").css({display: "inherit"});
}












var Tweener = 
{
	twns : [],
	looping : false,
	_ptime : 0,
	def : {	
		time: 0,
		transition: "easeOutExpo",
		delay: 0,
		onStart: null,
		onStartParams: null,
		onUpdate: null,
		onUpdateParams: null,
		onComplete: null,
		onCompleteParams: null
	}
};





Tweener.addTween = function(o, ps)
{
	var T = Tweener;
	
	function selectTweener(o, ps)
	{
		if(ps.isProp) T.addPropTween(o, ps);
		else if(o instanceof $) T.addCSSTween(o, ps);
		else T.addSimpleTween(o, ps);
	}
	
	if(o instanceof Array) for(var i=0; i<o.length; i++) selectTweener(o[i], ps);
	else selectTweener(o, ps);
}





Tweener.removeTween = function(o)
{
	var T = Tweener;
	
	if(! T.twns.length) return;
	
	function selectTweener(o)
	{
		if(o instanceof $) T.removeCSSTween(o);
		else T.removeSimpleTween(o);
	}
	
	if(o instanceof Array) for(var i=0; i<o.length; i++) selectTweener(o[i]);
	else selectTweener(o);
}





Tweener.addPropTween = function(o, ps)
{
	
	var T = Tweener;
	var int = Math.round;
	var o2 = {_obj:o.get(0)};
	var ps2 = {};
	
	init();
	
	function init( res )
	{		
		for(var p in ps)
		{
			if( isDefProp(p) )
			{
				if( !res ) ps2[p] = ps[p];
			}
			else
			{
				o2[p] = o.prop(p);
				
				ps2[p] = ps[p];
				
				var v0 = parseFloat(o2[p], 10);
				var u0 = (o2[p]+"").substr((v0+"").length);
				
				o2[p] = v0;
				
				if(typeof ps[p] == "string")
				{
					var v1 = parseFloat(ps[p], 10);
					var u1 = ps[p].substr((v1+"").length);
					
					o2["_"+p] = u1;
					ps2[p] = v1;
					
					if(u0 != u1) o2[p] = 0;
				}
			}
		}	
	}
	
	function isDefProp(p)
	{
		return (p == "time"
			|| p == "transition"
			|| p == "delay"
			|| p == "isProp"
			|| p == "onStart"
			|| p == "onStartParams"
			|| p == "onUpdate"
			|| p == "onUpdateParams"
			|| p == "onComplete"
			|| p == "onCompleteParams"
		)
	}
	
	function update()
	{
		for(var p in o2)
		{
			if(p.substr(0,1) == "_") continue;
			
			o.prop(p, (o2["_"+p]) ? o2[p]+o2["_"+p] : o2[p]);
		}
	}
	
	ps2.onStart = function()
	{
		if(ps.delay)
			init(true);
		
		update();
		if(ps.onStart) ps.onStart(ps.onStartParams);
	}
	ps2.onComplete = function()
	{
		update();
		if(ps.onComplete) ps.onComplete(ps.onCompleteParams);
	}
	ps2.onUpdate = function()
	{
		update();
		if(ps.onUpdate) ps.onUpdate(ps.onUpdateParams);
	}
	
	Tweener.addSimpleTween(o2, ps2);
}





Tweener.addCSSTween = function(o, ps)
{
	var T = Tweener;
	var int = Math.round;
	var o2 = {_obj:o.get(0)};
	var ps2 = {};
	
	init();
	
	function init( res )
	{		
		for(var p in ps)
		{
			if( isDefProp(p) )
			{
				if( !res ) ps2[p] = ps[p];
			}
			else
			{
				if( isColorProp(p) )
				{
					o2[p] = null;
					
					var rgb0 = splitRgb(o.css(p));
					var rgb1 = hexToRgb(ps[p]);
					
					o2["_r"+p] = parseInt(rgb0[0], 10);
					o2["_g"+p] = parseInt(rgb0[1], 10);
					o2["_b"+p] = parseInt(rgb0[2], 10);
					
					ps2["_r"+p] = rgb1.r;
					ps2["_g"+p] = rgb1.g;
					ps2["_b"+p] = rgb1.b;
				}
				else if( p == "backgroundPosition" )
				{
					o2[p] = null;
					
					var crds0 = o.css(p).split(" ");
					var crds1 = ps[p].split(" ");
					
					var vX0 = parseFloat(crds0[0], 10);
					var uX0 = crds0[0].substr((vX0+"").length);
					var vY0 = parseFloat(crds0[1], 10);
					var uY0 = crds0[1].substr((vY0+"").length);
					
					var vX1 = parseFloat(crds1[0], 10);
					var uX1 = crds1[0].substr((vX1+"").length);
					var vY1 = parseFloat(crds1[1], 10);
					var uY1 = crds1[1].substr((vY1+"").length);
					
					if(uX0 != uX1) vX0 = 0;
					if(uY0 != uY1) vY0 = 0;
					
					o2["_x"+p] = vX0;
					o2["_y"+p] = vY0;
					
					ps2["_x"+p] = vX1;
					ps2["_y"+p] = vY1;
					
					o2["__x"+p] = uX1;
					o2["__y"+p] = uY1;
				}
				else if( p == "transform" )
				{
					o2[p] = null;
					
					var v0 = o.css(p);
					
					if(ps[p].indexOf("rotate") == 0)
					{
						o2["_r"+p] = splitRotation( v0 == "none" ? "matrix(1, 0, 0, 1, 0, 0)" : v0 );
						
						ps2["_r"+p] = ps[p].replace(/[rotate(deg) ]/g, "");
					}
					else
					{
						var m0 = splitMatrix( v0 == "none" ? "matrix(1, 0, 0, 1, 0, 0)" : v0 );
						var m1 = splitMatrix( ps[p] );
						
						o2["_a"+p] = parseFloat(m0[0], 10);
						o2["_b"+p] = parseFloat(m0[1], 10);
						o2["_c"+p] = parseFloat(m0[2], 10);
						o2["_d"+p] = parseFloat(m0[3], 10);
						o2["_tx"+p] = parseFloat(m0[4], 10);
						o2["_ty"+p] = parseFloat(m0[5], 10);
						
						ps2["_a"+p] = parseFloat(m1[0], 10);
						ps2["_b"+p] = parseFloat(m1[1], 10);
						ps2["_c"+p] = parseFloat(m1[2], 10);
						ps2["_d"+p] = parseFloat(m1[3], 10);
						ps2["_tx"+p] = parseFloat(m1[4], 10);
						ps2["_ty"+p] = parseFloat(m1[5], 10);
					}
				}
				else
				{
					o2[p] = o.css(p);
					
					ps2[p] = ps[p];
					
					var v0 = parseFloat(o2[p], 10);
					var u0 = o2[p].substr((v0+"").length);
					
					o2[p] = v0;
					
					if(typeof ps[p] == "string")
					{
						var v1 = parseFloat(ps[p], 10);
						var u1 = ps[p].substr((v1+"").length);
						
						o2["_"+p] = u1;
						ps2[p] = v1;
						
						if(u0 != u1) o2[p] = 0;
					}
				}
			}
		}	
	}
	
	function splitRotation(m)
	{
		var v = m.split('(')[1].split(')')[0].split(',');
		var a = v[0];
		var b = v[1];
		
		return Math.round(Math.atan2(b, a) * (180/Math.PI));
	}
	
	function splitMatrix(m)
	{
		return m.replace(/[matrix() ]/g, "").split(",");
	}
	
	function splitRgb(rgb)
	{
		return rgb.replace(/[rgba() ]/g, "").split(",");
	}
	
	function hexToRgb(hex)
	{
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
	
	function isColorProp(p)
	{
		return (p == "backgroundColor"
			|| p == "borderBottomColor"
			|| p == "borderLeftColor"
			|| p == "borderRightColor"
			|| p == "borderTopColor"
			|| p == "color"
			|| p == "columnRuleColor"
			|| p == "outlineColor"
			|| p == "textDecorationColor"
			|| p == "textEmphasisColor"
		)
	}
	
	function isDefProp(p)
	{
		return (p == "time"
			|| p == "transition"
			|| p == "delay"
			|| p == "isProp"
			|| p == "onStart"
			|| p == "onStartParams"
			|| p == "onUpdate"
			|| p == "onUpdateParams"
			|| p == "onComplete"
			|| p == "onCompleteParams"
		)
	}
	
	function update()
	{
		var o3 = {};
		
		for(var p in o2)
		{
			if(p.substr(0,1) == "_") continue;
			
			if( isColorProp(p) )
			{
				o3[p] = 'rgb('+int(o2["_r"+p])+', '+int(o2["_g"+p])+', '+int(o2["_b"+p])+')';
			}
			else if( p == "backgroundPosition" )
			{
				o3[p] = o2["_x"+p] + o2["__x"+p] + ' ' + o2["_y"+p] + o2["__y"+p];
			}
			else if( p == "transform" )
			{
				if( o2["_r"+p] != undefined )
				{
					o3[p] = 'rotate('+o2["_r"+p]+'deg)';
				}
				else
				{
					o3[p] = 'matrix('+o2["_a"+p]+', '+o2["_b"+p]+', '+o2["_c"+p]+', '+o2["_d"+p]+', '+o2["_tx"+p]+', '+o2["_ty"+p]+')';
				}
			}
			else
			{
				o3[p] = (o2["_"+p]) ? o2[p]+o2["_"+p] : o2[p];
			}
		}
		
		o.css(o3);
	}
	
	ps2.onStart = function()
	{
		if(ps.delay)
			init(true);
		
		update();
		if(ps.onStart) ps.onStart(ps.onStartParams);
	}
	ps2.onComplete = function()
	{
		update();
		if(ps.onComplete) ps.onComplete(ps.onCompleteParams);
	}
	ps2.onUpdate = function()
	{
		update();
		if(ps.onUpdate) ps.onUpdate(ps.onUpdateParams);
	}
	
	Tweener.addSimpleTween(o2, ps2);
}





Tweener.removeCSSTween = Tweener.removePropTween = function(o)
{
	var T = Tweener;
	
	for(var i=0; i<T.twns.length; i++)
	{
		var t = T.twns[i];
		
		if(t.obj._obj == o.get(0))
		{
			t.ting = false;
			T.twns.splice(i--, 1);
		}
	}
}





Tweener.addSimpleTween = function(o, ps)
{
	var T = Tweener;
	
	var tp = {}, prms = [], tgts = []; 
	for(var p in T.def)  tp[p] = ps[p] ? ps[p] : T.def[p];
	
	for(var p in ps)
	{
		if(T.def[p] !== undefined) continue;
		prms.push(p);
		tgts.push(ps[p]);
	}
	
	T.twns.push(new T.Tween(o, tp, prms, tgts));
	T.loop();
}





Tweener.removeSimpleTween = function(o)
{
	var T = Tweener;
	
	for(var i=0; i<T.twns.length; i++)
	{
		var t = T.twns[i];
		
		if(t.obj == o) 
		{
			t.ting = false;
			T.twns.splice(i--, 1);
		}
	}
}





Tweener.loop = function()
{
	var T = Tweener;
	
	if(!T.looping)
	{
		T._ptime = new Date().getTime();
		requestAnimFrame(T.step);
	}
	T.looping = true; 
}





Tweener.step = function()
{
	var T = Tweener;
	var ptime = T._ptime;
	T._ptime = new Date().getTime();
	var step = (T._ptime - ptime)*0.001;
	
	for(var i=0; i<T.twns.length; i++)
	{
		var t = T.twns[i];
		
		if(t.tp.delay > 0) t.tp.delay -= step;
		else
		{
			if(! t.ting)
			{
				t.ting = true;
				if(t.tp.onStart) t.tp.onStart(t.tp.onStartParams);
			}
			
			if(t.bgns.length==0)
				for(var j=0; j<t.prms.length; j++)
				{
					t.bgns.push(t.obj[t.prms[j]]);
					t.cngs.push(t.tgts[j]-t.bgns[j]);
				}
				
			t.t += step;
			var dur = t.tp.time;
			for(var j=0; j<t.prms.length; j++)
			{
				if(t.t > dur) t.obj[t.prms[j]] = t.bgns[j]+t.cngs[j]; 
				else t.obj[t.prms[j]] = Tweener.easingFunctions[t.tp.transition] (t.t, t.bgns[j], t.cngs[j], dur);
			}
			if(t.tp.onUpdate) t.tp.onUpdate(t.tp.onUpdateParams);
			if(t.t > dur) 
			{
				t.ting = false;
				T.twns.splice(i--, 1);
				if(t.tp.onComplete) t.tp.onComplete(t.tp.onCompleteParams);
			}
		}
	}
	
	if(T.twns.length>0) requestAnimFrame(T.step);
	else T.looping = false;
}





Tweener.Tween = function(obj, tp, prms, tgts)
{
	this.t = 0;			// current time of tween (0 .. dur)
	this.obj = obj;	// object
	this.tp = tp;		// tweening parameters

	this.prms = prms;	// parameter (string)
	this.tgts = tgts;
	this.bgns = [];	// starting value
	this.cngs = [];	// change (total during the whole tween)
	this.ting = false;	// is tweening (boolean)
}





Tweener.easingFunctions = 
{
	/*
		t - current time of tween
		b - starting value of property
		c - change needed in value
		d - total duration of tween
	*/
    easeNone: function(t, b, c, d) {
        return c*t/d + b;
    },    
    easeInQuad: function(t, b, c, d) {
        return c*(t/=d)*t + b;
    },    
    easeOutQuad: function(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },    
    easeInOutQuad: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 *((--t)*(t-2) - 1) + b;
    },    
    easeInCubic: function(t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },    
    easeOutCubic: function(t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },    
    easeInOutCubic: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },    
    easeOutInCubic: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutCubic(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInCubic((t*2)-d, b+c/2, c/2, d);
    },    
    easeInQuart: function(t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },    
    easeOutQuart: function(t, b, c, d) {
        return -c *((t=t/d-1)*t*t*t - 1) + b;
    },    
    easeInOutQuart: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 *((t-=2)*t*t*t - 2) + b;
    },    
    easeOutInQuart: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutQuart(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInQuart((t*2)-d, b+c/2, c/2, d);
    },    
    easeInQuint: function(t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },    
    easeOutQuint: function(t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },    
    easeInOutQuint: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },    
    easeOutInQuint: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutQuint(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInQuint((t*2)-d, b+c/2, c/2, d);
    },    
    easeInSine: function(t, b, c, d) {
        return -c * Math.cos(t/d *(Math.PI/2)) + c + b;
    },    
    easeOutSine: function(t, b, c, d) {
        return c * Math.sin(t/d *(Math.PI/2)) + b;
    },    
    easeInOutSine: function(t, b, c, d) {
        return -c/2 *(Math.cos(Math.PI*t/d) - 1) + b;
    },    
    easeOutInSine: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutSine(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInSine((t*2)-d, b+c/2, c/2, d);
    },    
    easeInExpo: function(t, b, c, d) {
        return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001;
    },    
    easeOutExpo: function(t, b, c, d) {
        return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b;
    },    
    easeInOutExpo: function(t, b, c, d) {
        if(t==0) return b;
        if(t==d) return b+c;
        if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 *(t - 1)) + b - c * 0.0005;
        return c/2 * 1.0005 *(-Math.pow(2, -10 * --t) + 2) + b;
    },    
    easeOutInExpo: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutExpo(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInExpo((t*2)-d, b+c/2, c/2, d);
    },    
    easeInCirc: function(t, b, c, d) {
        return -c *(Math.sqrt(1 -(t/=d)*t) - 1) + b;
    },    
    easeOutCirc: function(t, b, c, d) {
        return c * Math.sqrt(1 -(t=t/d-1)*t) + b;
    },    
    easeInOutCirc: function(t, b, c, d) {
        if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b;
        return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b;
    },    
    easeOutInCirc: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutCirc(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInCirc((t*2)-d, b+c/2, c/2, d);
    },    
    easeInElastic: function(t, b, c, d, a, p) {
        var s;
        if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;
        if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;
    },    
    easeOutElastic: function(t, b, c, d, a, p) {
        var s;
        if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;
        if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);
        return(a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p ) + c + b);
    },    
    easeInOutElastic: function(t, b, c, d, a, p) {
        var s;
        if(t==0) return b;  if((t/=d/2)==2) return b+c;  if(!p) p=d*(.3*1.5);
        if(!a || a < Math.abs(c)) { a=c; s=p/4; }       else s = p/(2*Math.PI) * Math.asin(c/a);
        if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },    
    easeOutInElastic: function(t, b, c, d, a, p) {
        if(t < d/2) return Tweener.easingFunctions.easeOutElastic(t*2, b, c/2, d, a, p);
        return Tweener.easingFunctions.easeInElastic((t*2)-d, b+c/2, c/2, d, a, p);
    },    
    easeInBack: function(t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },    
    easeOutBack: function(t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },    
    easeInOutBack: function(t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        if((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },    
    easeOutInBack: function(t, b, c, d, s) {
        if(t < d/2) return Tweener.easingFunctions.easeOutBack(t*2, b, c/2, d, s);
        return Tweener.easingFunctions.easeInBack((t*2)-d, b+c/2, c/2, d, s);
    },    
    easeInBounce: function(t, b, c, d) {
        return c - Tweener.easingFunctions.easeOutBounce(d-t, 0, c, d) + b;
    },    
    easeOutBounce: function(t, b, c, d) {
        if((t/=d) <(1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if(t <(2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if(t <(2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },    
    easeInOutBounce: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeInBounce(t*2, 0, c, d) * .5 + b;
        else return Tweener.easingFunctions.easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
    },    
    easeOutInBounce: function(t, b, c, d) {
        if(t < d/2) return Tweener.easingFunctions.easeOutBounce(t*2, b, c/2, d);
        return Tweener.easingFunctions.easeInBounce((t*2)-d, b+c/2, c/2, d);
    }
};

Tweener.easingFunctions.linear = Tweener.easingFunctions.easeNone;










var Timer = 
{
	touts : [],
	looping : false,
	_ptime : 0
}





Timer.addTimeout = function(f, d, p)
{
	var T = Timer;
	
	T.touts.push(new T.Timeout(f, d, p));
	T.loop();
}





Timer.loop = function()
{
	var T = Timer;
	
	if(!T.looping)
	{
		T._ptime = new Date().getTime();
		requestAnimFrame(T.step);
	}
	T.looping = true; 
}





Timer.step = function()
{
	var T = Timer;
	var ptime = T._ptime;
	T._ptime = new Date().getTime();
	var step = (T._ptime - ptime)*0.001;
	
	for(var i=0; i<T.touts.length; i++)
	{
		var t = T.touts[i];
		
		if(t.d > 0) t.d -= step;
		else
		{
			T.touts.splice(i--, 1);
			if(t.f) t.f(t.p);
		}
	}
	
	if(T.touts.length>0) requestAnimFrame(T.step);
	else T.looping = false;
}





Timer.Timeout = function(f, d, p)
{
	this.f = f;	
	this.d = d;
	this.p = p;
}










StepScroll = function(scl)
{
	var S = this;
	
	S.enabled = true;
	S.shown = true;
	S.scl = scl;
	S.trk = $(".at_track", scl);
	S.bar = $(".at_bar", scl);
	S.trkH = 0;
	S.barH = 0;
	S.barY = 0;
	S.barMY = 0;
	S.barMinY = 0;
	S.barMaxY = 0;
	
	S.step = 0;
	S.steps = 0;
	
	S.init = function(ps)
	{
		for(var p in ps) S[p] = ps[p];
		
		S.barH = S.trkH / S.steps;
		S.barMaxY = S.trkH - S.barH;
		S.barY = S.step * S.barH;
		
		S.bar.css({left: S.barY+"px"});//top
		
		S.scl.trigger("scroll");
	}
	
	S.show = function()
	{
		if(S.shown) return;
		S.shown = true;
		
		Tweener.removeTween(S.scl);
		Tweener.addTween(S.scl, {opacity: 1, time: 0.3, transition: "easeOutQuart"});
		S.scl.css({visibility: "inherit"});
	}
	
	S.hide = function()
	{
		if(!S.shown) return;
		S.shown = false;
		
		Tweener.removeTween(S.scl);
		Tweener.addTween(S.scl, {opacity: 0, time: 0.13, transition: "easeOutQuart", onComplete: function(){
			S.scl.css({visibility: "hidden"});
		}});
	}
	
	S.toTop = function()
	{
		S.barY = S.barMinY;
		
		S.scroll();
	}
	
	S.onBarDown = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		Tweener.removeTween(S.bar);
		$(window).mouseup(S.onBarUp);
		$(window).mousemove(S.onBarMove);
		
		S.barMY = e.pageX - S.bar.position().left;//pageY top
	}
	
	S.onBarMove = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		S.barY = e.pageX - S.barMY;//e.pageY
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.scroll();
	}
	
	S.onBarUp = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).unbind("mouseup");
		$(window).unbind("mousemove");
		S.snap();
	}
	
	S.onMouseWheel = function(e, d)
	{
		if(! S.enabled || ! window.enabled) return;
		/*
		S.trgY += (d * S.musD);
		S.trgY = Math.max(S.trgY, S.trgMinY);
		S.trgY = Math.min(S.trgY, S.trgMaxY);
		
		S.barY = -Math.ceil(S.trgY * S.k);
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.scroll();
		*/
	}
	
	S.onTrackClick = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		Tweener.removeTween(S.bar);
		S.barY = e.pageX - S.trk.offset().left - S.barH * 0.5;//pageY top
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.scroll(true);
		S.snap();
	}
	
	S.onBarTouchStart = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		Tweener.removeTween(S.bar);
		$(window).bind( "touchmove", S.onBarTouchMove );
		$(window).bind( "touchend", S.onBarTouchEnd );
		
		S.barMY = e.originalEvent.pageX - S.bar.position().left;//pageY top
	}
	
	S.onBarTouchMove = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		S.barY = e.originalEvent.pageX - S.barMY;//pageY
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.scroll();
	}
	
	S.onBarTouchEnd = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).unbind( "touchmove" );
		$(window).unbind( "touchend" );
		S.snap();
	}
	
	S.scroll = function(notScroll)
	{
		if(! notScroll) S.bar.css({left: S.barY+"px"});//top
		
		var curStep = Math.round(S.barY / S.barMaxY * (S.steps-1));
		
		if(curStep != S.step)
		{
			S.step = curStep;
			S.scl.trigger("scroll");
		}
	}
	
	S.snap = function()
	{
		S.barY = S.step * S.barH;
		
		Tweener.addTween(S.bar, {left: S.barY, time: 0.1, transition: "easeOutQuart"});//top
		S.scl.trigger("snap");
	}
	
	S.bar.bind( "touchstart", S.onBarTouchStart );
	S.bar.mousedown( S.onBarDown );
	S.trk.click( S.onTrackClick );
	//$(window).mousewheel( S.onMouseWheel );
}










SimpleScroll = function(trg, scl, hor)
{
	var S = this;
	
	S.overed = false;
	S.enabled = true;
	S.shown = true;
	S.trg = trg;
	S.scl = scl;
	S.trk = $(".at_track", scl);
	S.bar = $(".at_bar", scl);
	S.mskH = 0;
	S.trkH = 0;
	S.trgH = 0;
	S.trgMinY = 0;
	S.trgMaxY = 0;
	S.barH = 0;
	S.k = 0;
	S.trgY = 0;
	S.trgMY = 0;
	S.barY = 0;
	S.barMY = 0;
	S.barMinY = 0;
	S.barMaxY = 0;
	S.musD = 35;
	
	S.TOP = hor ? "left" : "top";
	S.HEIGHT = hor ? "width" : "height";
	S.PAGE_Y = hor ? "pageX" : "pageY";
	
	S.init = function(ps)
	{
		for(var p in ps) S[p] = ps[p];
		
		S.k = S.trkH / (S.trkH + S.trgH - S.mskH);
		S.barH = Math.min(S.trkH, Math.floor(S.trkH * S.k));
		S.trgMinY = S.mskH - S.trgH;
		S.trgY = (S.k < 1) ? Math.max(S.trgY, S.trgMinY) : 0;
		S.barMaxY = S.trkH - S.barH;
		S.barY = (S.k < 1) ? -Math.ceil(S.trgY * S.k) : 0;
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.trk.css(S.HEIGHT, S.trkH+"px");
		S.bar.css(S.HEIGHT, S.barH+"px");
		S.trg.css(S.TOP, S.trgY+"px");
		S.bar.css(S.TOP, S.barY+"px");
		//S.scl.css({visibility: (S.k < 1) ? "inherit" : "hidden"});
		
		if(S.k < 1) S.show();
		else S.hide();
		
		S.scl.trigger("scroll");
	}
	
	S.show = function()
	{
		if(S.shown) return;
		S.shown = true;
		
		Tweener.removeTween(S.scl);
		Tweener.addTween(S.scl, {opacity: 1, time: 0.3, transition: "easeOutQuart"});
		S.scl.css({visibility: "inherit"});
	}
	
	S.hide = function()
	{
		if(!S.shown) return;
		S.shown = false;
		
		Tweener.removeTween(S.scl);
		Tweener.addTween(S.scl, {opacity: 0, time: 0.13, transition: "easeOutQuart", onComplete: function(){
			S.scl.css({visibility: "hidden"});
		}});
	}
	
	S.toTop = function()
	{
		S.barY = S.barMinY;
		S.trgY = S.trgMaxY;
		
		S.scroll();
	}
	
	S.onBarDown = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).mouseup(S.onBarUp);
		$(window).mousemove(S.onBarMove);
		
		S.barMY = e[S.PAGE_Y] - S.bar.position()[S.TOP];;
	}
	
	S.onBarMove = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		S.barY = e[S.PAGE_Y] - S.barMY;
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.trgY = -Math.ceil(S.barY / S.k);
		S.trgY = Math.max(S.trgY, S.trgMinY);
		S.trgY = Math.min(S.trgY, S.trgMaxY);
		
		S.scroll();
	}
	
	S.onBarUp = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).unbind("mouseup");
		$(window).unbind("mousemove");
	}
	
	S.onMouseWheel = function(e, d)
	{
		
		if(! S.enabled || ! window.enabled) return;
		if(! S.overed) return;
		
		S.trgY += (d * S.musD);
		S.trgY = Math.max(S.trgY, S.trgMinY);
		S.trgY = Math.min(S.trgY, S.trgMaxY);
		
		S.barY = -Math.ceil(S.trgY * S.k);
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.scroll();
		e.preventDefault();
	}
	
	S.onTrackClick = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		S.barY = e[S.PAGE_Y] - S.trk.offset()[S.TOP];
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.trgY = -Math.ceil(S.barY / S.k);
		S.trgY = Math.max(S.trgY, S.trgMinY);
		S.trgY = Math.min(S.trgY, S.trgMaxY);
		
		S.scroll();
	}
	
	S.onBarTouchStart = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).bind( "touchmove", S.onBarTouchMove );
		$(window).bind( "touchend", S.onBarTouchEnd );
		S.scl.trigger("touchstart");
		
		S.barMY = e.originalEvent[S.PAGE_Y] - S.bar.position()[S.TOP];
		e.preventDefault();
	}
	
	S.onBarTouchMove = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		S.barY = e.originalEvent[S.PAGE_Y] - S.barMY;
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.trgY = -Math.ceil(S.barY / S.k);
		S.trgY = Math.max(S.trgY, S.trgMinY);
		S.trgY = Math.min(S.trgY, S.trgMaxY);
		
		S.scroll();
		e.preventDefault();
	}
	
	S.onBarTouchEnd = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).unbind( "touchmove" );
		$(window).unbind( "touchend" );
		S.scl.trigger("touchend");
		e.preventDefault();
	}
	
	S.onTrgTouchStart = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).bind( "touchmove", S.onTrgTouchMove );
		$(window).bind( "touchend", S.onTrgTouchEnd );
		S.scl.trigger("touchstart");
		
		S.trgMY = e.originalEvent[S.PAGE_Y] - S.trg.position()[S.TOP];
		e.preventDefault();
	}
	
	S.onTrgTouchMove = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		S.trgY = e.originalEvent[S.PAGE_Y] - S.trgMY;
		S.trgY = Math.max(S.trgY, S.trgMinY);
		S.trgY = Math.min(S.trgY, S.trgMaxY);
		
		S.barY = -Math.ceil(S.trgY * S.k);
		S.barY = Math.max(S.barY, S.barMinY);
		S.barY = Math.min(S.barY, S.barMaxY);
		
		S.scroll();
		e.preventDefault();
	}
	
	S.onTrgTouchEnd = function(e)
	{
		if(! S.enabled || ! window.enabled) return;
		
		$(window).unbind( "touchmove" );
		$(window).unbind( "touchend" );
		S.scl.trigger("touchend");
		e.preventDefault();
	}
	
	S.scroll = function()
	{
		S.bar.css(S.TOP, S.barY+"px");
		S.trg.css(S.TOP, S.trgY+"px");
		S.scl.trigger("scroll");
	}
	
	S.bar.bind( "touchstart", S.onBarTouchStart );
	S.trg.bind( "touchstart", S.onTrgTouchStart );
	S.bar.mousedown( S.onBarDown );
	S.trk.click( S.onTrackClick );
	$(window).mousewheel( S.onMouseWheel );
	
	S.trg.parent().hover(
		function(e){
			S.overed = true;
		},
		function(e){
			S.overed = false;
	});
};










Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	odnoklassniki: function(purl, text) {
		url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		url += '&st.comments=' + encodeURIComponent(text);
		url += '&st._surl='    + encodeURIComponent(purl);
		Share.popup(url);
	},
	facebook: function(purl, ptitle, pimg, text) {
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(ptitle);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(purl);
		url += '&p[images][0]=' + encodeURIComponent(pimg);
		Share.popup(url);
	},
	twitter: function(purl, ptitle) {
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.popup(url);
	},
	mailru: function(purl, ptitle, pimg, text) {
		url  = 'http://connect.mail.ru/share?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&imageurl='    + encodeURIComponent(pimg);
		Share.popup(url)
	},

	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};











/*
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
*/
window.requestAnimFrame = window.requestAnimationFrame || (function() {
	return function(callback, element)
	{
		window.setTimeout(callback, 1000/60);
	};
})();










var ENTER_FRAME = document.createEvent("Event");//new Event("enterFrame");
ENTER_FRAME.initEvent("enterFrame", true, true);

(function enterFrame(){
	dispatchEvent(ENTER_FRAME);
	requestAnimFrame(enterFrame);
})();








$.fn.hitTest = function(x, y){
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
	if(x >= bounds.left){
        if(x <= bounds.right){
            if(y >= bounds.top){
                if(y <= bounds.bottom){
                    return true;
                }
            }
        }
    }
    return false;
}