var SevenSegmentDigit = function()
{
  const
    Default = {
      HEIGHT: 293,
      SLIT: 5,
      THICKNESS: 27,
      VALUE: 0
    },
    STYLE_CLASS = 'ssd-style',
    XMLNS = 'http://www.w3.org/2000/svg';

  function createSVG(w,h)
  {
    var svg = document.createElementNS(XMLNS,'svg');
    svg.setAttribute('width',w);
    svg.setAttribute('height',h);
    svg.setAttribute('viewBox',[0,0,w,h].join(' '));
    return svg;
  }

  function createPath(d,index)
  {
    var path = document.createElementNS(XMLNS,'path');
    path.setAttribute('d',d);
    path.setAttribute('class','-' + ['a','b','c','d','e','f','g'][index]);
    return path;
  }

  function round(x)
  {
    x = Math.round(x*100);
    var n = x<0;
    x = Math.abs(x).toString();
    while (x.length<3) x = '0' + x;
    var f = x.substr(x.length-2);
    x = x.substr(0,x.length-2);
    if (f!='00') x += '.' + f;
    if (n) x = '-' + x;
    return x;
  }

  function Point(x,y)
  {
    this.x = x;
    this.y = y;
  }

  Point.prototype.svg = function(p)
  {
    if (arguments.length<1) return 'M' + round(this.x) + ' ' + round(this.y);
    var command, values = [];
    if (this.x==p.x)
    {
      if (this.y==p.y) return '';
      command = 'v';
      values.push(this.y-p.y);
    } else if (this.y==p.y)
    {
      command = 'h';
      values.push(this.x-p.x);
    } else {
      command = 'l';
      values.push(this.x-p.x);
      values.push(this.y-p.y);
    }
    return command + values.map(round).join(' ');
  };

  function calculatePoints(height,thickness,slitDiagonal)
  {
    var
      innerSize = (height - thickness * 3) * 0.5,
      width = innerSize + thickness * 2,
      slitHalf = Math.sqrt(slitDiagonal * slitDiagonal * 0.5),
      thicknessHalf = thickness * 0.5,
      heightHalf = height * 0.5,
      segments = [];

    segments.push([]);
    segments[0].push(new Point(slitHalf,0));
    segments[0].push(new Point(width-slitHalf,0));
    segments[0].push(new Point(width-slitHalf-thickness,thickness));
    segments[0].push(new Point(slitHalf+thickness,thickness));

    segments.push([]);
    segments[1].push(new Point(width,slitHalf));
    segments[1].push(new Point(width,heightHalf-slitHalf-thicknessHalf));
    segments[1].push(new Point(width-thicknessHalf,heightHalf-slitHalf));
    segments[1].push(new Point(width-thickness,heightHalf-slitHalf-thicknessHalf));
    segments[1].push(new Point(width-thickness,slitHalf+thickness));

    segments.push([]);
    segments[2].push(new Point(width,height-slitHalf));
    segments[2].push(new Point(width-thickness,height-slitHalf-thickness));
    segments[2].push(new Point(width-thickness,heightHalf+slitHalf+thicknessHalf));
    segments[2].push(new Point(width-thicknessHalf,heightHalf+slitHalf));
    segments[2].push(new Point(width,heightHalf+slitHalf+thicknessHalf));

    segments.push([]);
    segments[3].push(new Point(width-slitHalf,height));
    segments[3].push(new Point(slitHalf,height));
    segments[3].push(new Point(slitHalf+thickness,height-thickness));
    segments[3].push(new Point(width-slitHalf-thickness,height-thickness));

    segments.push([]);
    segments[4].push(new Point(0,height-slitHalf));
    segments[4].push(new Point(0,heightHalf+slitHalf+thicknessHalf));
    segments[4].push(new Point(thicknessHalf,heightHalf+slitHalf));
    segments[4].push(new Point(thickness,heightHalf+slitHalf+thicknessHalf));
    segments[4].push(new Point(thickness,height-slitHalf-thickness));

    segments.push([]);
    segments[5].push(new Point(0,slitHalf));
    segments[5].push(new Point(thickness,slitHalf+thickness));
    segments[5].push(new Point(thickness,heightHalf-slitHalf-thicknessHalf));
    segments[5].push(new Point(thicknessHalf,heightHalf-slitHalf));
    segments[5].push(new Point(0,heightHalf-slitHalf-thicknessHalf));

    segments.push([]);
    segments[6].push(new Point(thicknessHalf+slitHalf,heightHalf));
    segments[6].push(new Point(thickness+slitHalf,heightHalf-thicknessHalf));
    segments[6].push(new Point(width-thickness-slitHalf,heightHalf-thicknessHalf));
    segments[6].push(new Point(width-thicknessHalf-slitHalf,heightHalf));
    segments[6].push(new Point(width-thickness-slitHalf,heightHalf+thicknessHalf));
    segments[6].push(new Point(thickness+slitHalf,heightHalf+thicknessHalf));

    return segments;
  }

  function createStyle()
  {
    if (document.querySelector('style.'+STYLE_CLASS)!=null) return;
    var style = document.createElement('style');
    style.setAttribute('type','text/css');
    style.className = STYLE_CLASS;
    style.innerHTML = 'svg[data-digit] path{opacity:0.1}svg[data-digit="0"] path:not(.-g),svg[data-digit="1"] path.-b,svg[data-digit="1"] path.-c,svg[data-digit="2"] path.-a,svg[data-digit="2"] path.-b,svg[data-digit="2"] path.-d,svg[data-digit="2"] path.-e,svg[data-digit="2"] path.-g,svg[data-digit="3"] path.-a,svg[data-digit="3"] path.-b,svg[data-digit="3"] path.-c,svg[data-digit="3"] path.-d,svg[data-digit="3"] path.-g,svg[data-digit="4"] path.-b,svg[data-digit="4"] path.-c,svg[data-digit="4"] path.-f,svg[data-digit="4"] path.-g,svg[data-digit="5"] path.-a,svg[data-digit="5"] path.-c,svg[data-digit="5"] path.-d,svg[data-digit="5"] path.-f,svg[data-digit="5"] path.-g,svg[data-digit="6"] path:not(.-b),svg[data-digit="7"] path.-a,svg[data-digit="7"] path.-b,svg[data-digit="7"] path.-c,svg[data-digit="8"] path,svg[data-digit="9"] path:not(.-e){opacity:1}';
    document.body.insertBefore(style,document.body.firstChild);
  }

  function makePath(points)
  {
    return points.reduce(function(path,point,index,array)
    {
      path.push(index==0 ? point.svg() : point.svg(array[index-1]));
      return path;
    },[]).join('');
  }

  function getDigit()
  {
    return this.getAttribute('data-digit');
  }

  function setDigit(value)
  {
    this.setAttribute('data-digit',value);
  }

  return {
    create: function(parent,height,thickness,slit,value)
    {
      if (arguments.length<5) value = Default.VALUE;
      if (arguments.length<4) slit = Default.SLIT;
      if (arguments.length<3) thickness = Default.THICKNESS;
      if (arguments.length<2) height = Default.HEIGHT;

      var svg = createSVG((height-thickness*3)*0.5+thickness*2,height);
      setDigit.call(svg,value);
      calculatePoints(height,thickness,slit).map(makePath).map(createPath).forEach(function(path)
      {
        svg.appendChild(path);
      });
      Object.defineProperty(svg,'digit',{get: getDigit, set: setDigit});
      createStyle();
      parent.appendChild(svg);
      return svg;
    }
  };
}();