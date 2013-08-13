d3.csv("data/fitness.csv", function(data) {
	var dateFormat = d3.time.format("%m/%d/%Y");

	data.forEach(function(e) { 
		e.dd = dateFormat.parse(e.Date); 
	});

	var ndx = crossfilter(data);
	var all = ndx.groupAll();

	var volumeByMonth = ndx.dimension(function(d) { 

		return d3.time.day(d.dd); 
	});

	var volumeByMonthGroup = volumeByMonth.group().reduceSum(function(d) { return d.Weight; });

	dc.barChart("#volume-month-chart")
    .width(990) // (optional) define chart width, :default = 200
    .height(250) // (optional) define chart height, :default = 200
    .transitionDuration(500) // (optional) define chart transition duration, :default = 500
    // (optional) define margins
    .margins({top: 10, right: 50, bottom: 30, left: 40})
    .dimension(volumeByMonth) // set dimension
    .group(volumeByMonthGroup) // set group
    // (optional) whether chart should rescale y axis to fit data, :default = false
    .elasticY(true)
    // (optional) when elasticY is on whether padding should be applied to y axis domain, :default=0
    // .yAxisPadding(100)
    // (optional) whether chart should rescale x axis to fit data, :default = false
    .elasticX(true)
    // (optional) when elasticX is on whether padding should be applied to x axis domain, :default=0
    .xAxisPadding(50)
    // define x scale
    .x(d3.time.scale().domain([new Date(2013, 0, 1), new Date(2013, 11, 31)]))
    // (optional) set filter brush rounding
    // .round(d3.time.days.round)
    // define x axis units
    .xUnits(d3.time.days)
    // (optional) whether bar should be center to its x value, :default=false
    .centerBar(true)
    // (optional) set gap between bars manually in px, :default=2
    .gap(1)
    // (optional) render horizontal grid lines, :default=false
    .renderHorizontalGridLines(true)
    // (optional) render vertical grid lines, :default=false
    .renderVerticalGridLines(true)
    // (optional) add stacked group and custom value retriever
    // .stack(monthlyMoveGroup, function(d){return d.value;})
    // (optional) you can add multiple stacked group with or without custom value retriever
    // if no custom retriever provided base chart's value retriever will be used
    // .stack(monthlyMoveGroup)
    // (optional) whether this chart should generate user interactive brush to allow range
    // selection, :default=true.
    .brushOn(true)
    // (optional) whether svg title element(tooltip) should be generated for each bar using
    // the given function, :default=no
    .title(function(d) { return "Value: " + d.value; })
    // (optional) whether chart should render titles, :default = false
    .renderTitle(true);

    dc.renderAll();
});