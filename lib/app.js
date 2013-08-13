d3.csv("data/financial.csv", function(data) {
	var dateFormat = d3.time.format("%d/%m/%Y");

	data.forEach(function(e) { 
		e.dd = dateFormat.parse(e.Date); 
	});

	var ndx = crossfilter(data);
	// var all = ndx.groupAll();

	var costByMonth = ndx.dimension(function(d) { 
		return d3.time.month(d.dd);
	});

	var descriptionDimension = ndx.dimension(function(d) { 
		return d.Group;
	});

	var costByMonthGroup = costByMonth.group().reduceSum(function(d) { return d.Cost; });
	var descriptionGroup = descriptionDimension.group();

	dc.barChart("#cost-month-chart")
	    .width(990) // (optional) define chart width, :default = 200
	    .height(250) // (optional) define chart height, :default = 200
	    .transitionDuration(500) // (optional) define chart transition duration, :default = 500
	    // (optional) define margins
	    .margins({top: 20, right: 50, bottom: 30, left: 40})
	    .dimension(costByMonth) // set dimension
	    .group(costByMonthGroup) // set group
	    // (optional) whether chart should rescale y axis to fit data, :default = false
	    .elasticY(true)
	    // (optional) when elasticY is on whether padding should be applied to y axis domain, :default=0
	    // .yAxisPadding(100)
	    // (optional) whether chart should rescale x axis to fit data, :default = false
	    .elasticX(true)
	    // (optional) when elasticX is on whether padding should be applied to x axis domain, :default=0
	    .xAxisPadding(100)
	    // define x scale
	    .x(d3.time.scale().domain([new Date(2013, 0, 1), new Date(2013, 11, 31)]))
	    // (optional) set filter brush rounding
	    // .round(d3.time.days.round)
	    // define x axis units
	    .xUnits(d3.time.months)
	    // (optional) whether bar should be center to its x value, :default=false
	    .centerBar(true)
	    // (optional) set gap between bars manually in px, :default=2
	    .gap(2)
	    // (optional) render horizontal grid lines, :default=false
	    // .renderHorizontalGridLines(true)
	    // (optional) render vertical grid lines, :default=false
	    // .renderVerticalGridLines(true)
	    // (optional) add stacked group and custom value retriever
	    // .stack(monthlyMoveGroup, function(d){return d.value;})
	    // (optional) you can add multiple stacked group with or without custom value retriever
	    // if no custom retriever provided base chart's value retriever will be used
	    // .stack(monthlyMoveGroup)
	    // (optional) whether this chart should generate user interactive brush to allow range
	    // selection, :default=true.
	    .brushOn(false)
	    // (optional) whether svg title element(tooltip) should be generated for each bar using
	    // the given function, :default=no
	    .title(function(d) { return "Cost: " + d.value; })
	    // (optional) whether chart should render titles, :default = false
	    .renderTitle(true);



	dc.pieChart("#description-chart", "chartGroup")
	    .width(550) // (optional) define chart width, :default = 200
	    .height(500) // (optional) define chart height, :default = 200
	    .transitionDuration(500) // (optional) define chart transition duration, :default = 350
	    // (optional) define color array for slices
	    .colors(d3.scale.category20b())
	    // .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
	    // (optional) define color domain to match your data domain if you want to bind data or color
	    .colorDomain([0, 11])
	    // (optional) define color value accessor
	    .colorAccessor(function(d, i){return i;})
	    .radius(180) // define pie radius
	    // (optional) if inner radius is used then a donut chart will
	    // be generated instead of pie chart
	    .innerRadius(40)
	    .dimension(descriptionDimension) // set dimension
	    .group(descriptionGroup) // set group
	    // (optional) by default pie chart will use group.key as it's label
	    // but you can overwrite it with a closure
	    .label(function(d) { return d.data.key; })
	    // (optional) whether chart should render labels, :default = true
	    .renderLabel(true)
	    // (optional) by default pie chart will use group.key and group.value as its title
	    // you can overwrite it with a closure
	    .title(function(d) { return d.data.key; })
	    // (optional) whether chart should render titles, :default = false
	    .renderTitle(true);

	dc.renderAll("chartGroup");
    dc.renderAll();
});