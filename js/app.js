(function(){
	window.onload = function() {
		var myElement = document.getElementById('myElement');
		$('#shapearea').css({'height':($(window).height()/3 * 2) + 'px','width':$(window).width() + 'px' });
		$('#myElement').css({'height': $(window).height()/3});
		// create a simple instance
		// by default, it only adds horizontal recognizers
		var mc = new Hammer(myElement);
		var mySvg = d3.select('#shapearea');
		// Enables Pinch
		mc.get('pinch').set({enable:true});

		// listen to events...
		mc.on("panleft panright panup pandown tap pinch press", function(ev) {
		    myElement.textContent = ev.type +" gesture detected.";
		    // Allows for Up and Down Swipes
		    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		});

		//Creates initial Circle 
		mc.on("tap", function(ev){
			mySvg.append('circle')
			    .attr('r', 50)
			    .attr('cx', $(window).width()/2)
			    .attr('cy', $(window).height()/3 - 50)
			    .attr('fill', '#add8e6')
			    .each(function(){
			    	addHammerListener(this);
			    })
		});

		var addHammerListener = function(that) {
			var objMC = new Hammer(that)
		    // Allows for Up and Down Swipes
		    objMC.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		    //Tap Stop
		    objMC.on("tap", function(ev){
		    	d3.select(that)
		    		.transition()
		    		.duration(0);
		    });

			//Slides Left
			objMC.on("panleft", function(ev) {
			    d3.select(that)
	    			.transition()
	    			.duration(2000)
	  				.attr('cx', 50);
			});

			//Slides Right
			objMC.on("panright", function(ev) {
			    d3.select(that)
	    			.transition()
	    			.duration(2000)
	  				.attr('cx', $(window).width() - 50);
			});

			//Slides Up
			objMC.on("panup", function(ev) {
			    d3.select(that)
	    			.transition()
	    			.duration(2000)
	  				.attr('cy', $(window).height()/30 + 50);
			});

			//Slides Left
			objMC.on("pandown", function(ev) {
			    d3.select(that)
	    			.transition()
	    			.duration(2000)
	  				.attr('cy', $(window).height()/2);
			});

			//Slides back to center
			objMC.on("press", function(ev){
				d3.select(that)
					.transition()
	    			.duration(2000)
				    .attr('fill', '#add8e6')
	    			.attr('cx', $(window).width()/2)
				    .attr('cy', $(window).height()/3 - 50)
			});
		}

		// ** For Selecting ALL circles **

		//Explodes the circles into different colors and locations
		mc.on("pinch", function(ev) {
			var colorScale = d3.scale.category10();
			var numbers = d3.range(1, mySvg.selectAll('circle').size() + 1);

			mySvg.selectAll('circle')
				.data(numbers)
				.transition()
				.duration(2000)
				.attr('fill', function(d) {return colorScale(d%10)})
				.attr('cx', function() {return Math.random() * $(window).width() - 50})
				.attr('cy', function() {return Math.random() * ($(window).height()/2)})
		}); 

		//Slides Left
		mc.on("panleft", function(ev) {
		    mySvg.selectAll('circle')
    			.transition()
    			.duration(2000)
  				.attr('cx', 50);
		});

		//Slides Right
		mc.on("panright", function(ev) {
		    mySvg.selectAll('circle')
    			.transition()
    			.duration(2000)
  				.attr('cx', $(window).width() - 50);
		});

		//Slides Up
		mc.on("panup", function(ev) {
		    mySvg.selectAll('circle')
    			.transition()
    			.duration(2000)
  				.attr('cy', $(window).height()/30 + 50);
		});

		//Slides Left
		mc.on("pandown", function(ev) {
		    mySvg.selectAll('circle')
    			.transition()
    			.duration(2000)
  				.attr('cy', $(window).height()/2);
		});

		//Slides back to center
		mc.on("press", function(ev){
			mySvg.selectAll('circle')
				.transition()
    			.duration(2000)
			    .attr('fill', '#add8e6')
    			.attr('cx', $(window).width()/2)
			    .attr('cy', $(window).height()/3 - 50)
		}); 

 
	}
}());