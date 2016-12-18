var distMatrix={"S":{"T":[5,7],"X":[4,4]},"T":{"X":[3,1],"V":[5,2]},"U":{"S":[7,2],"T":[4,6]},"V":{"U":[4,5]},"X":{"V":[2,1],"W":[5,3]},"W":{"U":[7,5],"S":[8,3]}}
var map=d3.select("#map")
/*drawCircle = (x,y,r,w,h,clr) =>
map.append("circle")
.attr("cx", x)
.attr("cy", y)
.attr("r", r)
.style("fill", clr);*/
for (var i in Object.keys(distMatrix))
{
	var par=Object.keys(distMatrix)[i]
	for (var j in Object.keys(distMatrix[par]))
	{
		var dat=distMatrix[par][Object.keys(distMatrix[par])[j]]
		distMatrix[par][Object.keys(distMatrix[par])[j]].push(dat[1]/dat[0])
	}
}
addSels=(id)=> d3.select('#'+id).selectAll('option')
.data(Object.keys(distMatrix))
.enter()
.append('option')
.text((d)=>d)
.attr('value',(d)=>d)
addSels('list1')
addSels('list2')


map.selectAll('circle')
.data(Object.keys(distMatrix))
.enter()
.append('circle')
.transition()
.duration(250)
.attr("cx", (d,i)=>(map._groups[0][0].clientWidth/2)+50*Math.cos(Math.PI/6+Math.PI/3*i))
.attr("cy", (d,i)=>(map._groups[0][0].clientHeight/2)+50*Math.sin(Math.PI/6+Math.PI/3*i))
.attr('r',15)
.style("fill",(d,i)=>'rgba('+[i*20,200,100][i%3]+','+[i*20,200,100][(i+1)%3]+','+[i*20,200,100][(i+2)%3]+',0.5)')
.attr('id',(d)=>d+'c')


map.selectAll('text')
.data(Object.keys(distMatrix))
.enter()
.append('text')
.transition()
.duration(250)
.attr("x", (d,i)=>map._groups[0][0].clientWidth/2+50*Math.cos(Math.PI/6+Math.PI/3*i))
.attr("y", (d,i)=>map._groups[0][0].clientHeight/2+2.5+50*Math.sin(Math.PI/6+Math.PI/3*i))
.text((d)=>d)
.attr('id',(d)=>d)
.attr('text-anchor','middle')
.attr('stroke','black')
.attr('font-size','10px')
.attr('font-family','sans-serif')
/*
var lineFunction = d3.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");*/
var paths=[]
function f(p1,p2){
		if(p1==p2)return ','+p2;
		if(distMatrix[p1].hasOwnProperty(p2)) {drawPath(p1,p2); return p1+','+p2}
		for(var i in Object.keys(distMatrix[p1])){
		paths=[p1+'->'+Object.keys(distMatrix[p1])[i]+'-->']
		return drawPath(p1,Object.keys(distMatrix[p1])[i])+'-->'+f(Object.keys(distMatrix[p1])[i],p2)
		}
	}

function lestHops(){
	var d=document.getElementById('list1')
	var p1=d.options[d.selectedIndex].value
	var d2=document.getElementById('list2')
	var p2=d2.options[d2.selectedIndex].value
	if(p1!=p2)
	{
		map.selectAll('line').remove()
		map.selectAll('.dots').remove()
		f(p1,p2)
	}
}

function showPaths()
{
	for (var i in Object.keys(distMatrix))
	{
		var par=Object.keys(distMatrix)[i]
		var x1=d3.select('#'+par).attr('x')
		var y1=d3.select('#'+par).attr('y')
		for (var j in Object.keys(distMatrix[par]))
		{
			var chld=Object.keys(distMatrix[par])
			var x2=d3.select('#'+chld).attr('x')
			var y2=d3.select('#'+chld).attr('y')
			map.append('line').transition().duration(250).attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2).attr('stroke','black')
		}
	}
}
var lineData = [ { "x": 0,   "y": 0},  { "x": 0,  "y": 5},
                 { "x": 5,  "y": 0}, { "x": 0,  "y": 0}];
var lineFunction = d3.line()
                    .x((d)=>d.x)
                    .y((d)=>d.y)
function drawPath(p1,p2)
{
		var x1=d3.select('#'+p1).attr('x')
		var y1=d3.select('#'+p1).attr('y')
		var x2=d3.select('#'+p2).attr('x')
		var y2=d3.select('#'+p2).attr('y')
		map.append('line').transition().duration(250).attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2).attr('stroke','black')
		   map.append("circle")
		   //.attr('transform','translate('+x2+','+y2+') '+'rotate('+-90*Math.atan2(y2-y1,x2-x1)/Math.PI+')')
           //.attr("d", lineFunction(lineData))
           .attr('class','dots')
           .attr('cx',x2)
           .attr('cy',y2)
           .attr('r',2)
           .attr("stroke", "transparent")
           .attr("fill", "rgba(255,0,0,0.8)")

}