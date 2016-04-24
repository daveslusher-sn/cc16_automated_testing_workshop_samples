function generateEvent(element) {
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		element.dispatchEvent(evt);
		console.log("Doing dispatchEvent on " + element);
	}
	else {
		element.fireEvent("onchange");
		console.log("Doing  fireEvent on " + element);
		
	}
}

function busyWait(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

function getOptions(element) {
	var values = element.options;
	var options = [];
	for (i=0; i < values.length; i++) {
		options.push(values.item(i).value);
	}
	return options;
}

function contains(array, item) {
	return (array.indexOf(item)) != -1;
}


test('Going to pass', function () {
	expect(1);
	ok(true);
});


test('Test changing to network', function() {
	expect(2);
	
	var cat_box_gf = QUIWindow.g_form.getElement("incident.category");
	
	cat_box_gf.setValue('network');
	generateEvent(cat_box_gf);
	var currentDate = new Date();
	console.log("current seconds before network stop = " + currentDate.getTime());
	var subcat_box_gf = QUIWindow.g_form.getElement("incident.subcategory");
	
	var options = [];
	
	stop();
	setTimeout(function() {
		currentDate = new Date();
		console.log("current seconds after stop in network = " + currentDate.getTime());
		
		options = getOptions(subcat_box_gf);
		console.log("options in network timeout = " + options);
		notEqual(options.indexOf('dns'), -1, "dns is in subcategory");
		equal(options.indexOf('antivirus'), -1, "antivirus is not in subcategory");
		start();
	}, 250);
});

test('Test Changing to Software', function() {
	expect(2);
	
	var cat_box_gf = QUIWindow.g_form.getElement("incident.category");
	var subcat_box_gf = QUIWindow.g_form.getElement("incident.subcategory");
	var currentDate = new Date();
	var options = [];
	
	cat_box_gf.setValue('software');
	generateEvent(cat_box_gf);
	currentDate = new Date();
	console.log("current seconds before software stop = " + currentDate.getTime());
	stop();
	setTimeout(function() {
		currentDate = new Date();
		console.log("current seconds after stop in software = " + currentDate.getTime());
		options = getOptions(subcat_box_gf);
		console.log("options from software setTimeout = " + options);
		notEqual(options.indexOf('os'), -1, "os is in subcategory");
		equal(options.indexOf('antivirus'), -1, "antivirus is not in subcategory");
		start();
	}, 250);
});

test('Test Changing to Hardware', function() {
	expect(2);
	
	var cat_box_gf = QUIWindow.g_form.getElement("incident.category");
	var subcat_box_gf = QUIWindow.g_form.getElement("incident.subcategory");
	var currentDate = new Date();
	var options = [];
	
	cat_box_gf.setValue('hardware');
	generateEvent(cat_box_gf);
	currentDate = new Date();
	console.log("current seconds before hardware stop = " + currentDate.getTime());
	stop();
	setTimeout(function() {
		currentDate = new Date();
		console.log("current seconds after stop in hardware = " + currentDate.getTime());
		options = getOptions(subcat_box_gf);
		console.log("options from hardware setTimeout = " + options);
		notEqual(options.indexOf('keyboard'), -1, "keyboard is in subcategory");
		equal(options.indexOf('antivirus'), -1, "antivirus is not in subcategory");
		start();
	}, 250);
});

test('Test Changing to Database', function() {
	expect(2);
	
	var cat_box_gf = QUIWindow.g_form.getElement("incident.category");
	var subcat_box_gf = QUIWindow.g_form.getElement("incident.subcategory");
	var currentDate = new Date();
	var options = [];
	
	cat_box_gf.setValue('database');
	generateEvent(cat_box_gf);
	console.log("current seconds before database stop = " + currentDate.getTime());
	stop();
	setTimeout(function() {
		currentDate = new Date();
		console.log("current seconds after stop in database = " + currentDate.getTime());
		
		options = getOptions(subcat_box_gf);
		console.log("options from database setTimeout = " + options);
		ok(contains(options,'oracle'), "oracle is in subcategory");
		equal(options.indexOf('antivirus'), -1, "antivirus is not in subcategory");
		start();
	}, 250);
});

test('Test high impact and urgency', function() {
	expect(2);
	
	var impact_box = QUIWindow.g_form.getElement("incident.impact");
	var urgency_box = QUIWindow.g_form.getElement("incident.urgency");
	var priority_box = QUIWindow.g_form.getElement("incident.priority");
	var currentDate = new Date();
	var options = [];
	
	notEqual(priority_box.getValue(), "1", "priority should not be critical on page load");
	
	impact_box.setValue("1");
	urgency_box.setValue("1");
	generateEvent(impact_box);
	generateEvent(urgency_box);
	console.log("current seconds before priority stop = " + currentDate.getTime());
	stop();
	setTimeout(function() {
		currentDate = new Date();
		console.log("current seconds after stop in priority = " + currentDate.getTime());
		
		equal(priority_box.getValue(), "1", "priority should be critical");
		start();
	}, 250);
});

test('Close code and close notes mandatory when state is closed', function(){
	expect(4);
	
	var state_box = QUIWindow.g_form.getElement("incident.state");
	var close_code_div = QUIWindow.document.getElementById("element.incident.close_code");
	var close_notes_div = QUIWindow.document.getElementById("element.incident.close_notes");
	
	
	var close_code_class = close_code_div.className;
	var close_notes_class = close_notes_div.className;
	console.log(close_code_class + " "+ close_notes_class);
	ok(!contains(close_code_class, 'is-required'), "Close Code not required by default");
	ok(!contains(close_notes_class, 'is-required'), "Close notes not required by default");
	state_box.setValue('7'); //Closed
	generateEvent(state_box);
	var currentDate = new Date();
	console.log("current seconds before close stop = " + currentDate.getTime());
	stop();
	setTimeout(function() {
		console.log(close_code_div);
		currentDate = new Date();
		console.log("current seconds after stop in close = " + currentDate.getTime());
		close_code_class = close_code_div.className;
		close_notes_class = close_notes_div.className;
		console.log(close_code_class + " "+ close_notes_class);
		ok(contains(close_code_class, 'is-required'), "Close Code required in Closed");
		ok(contains(close_notes_class, 'is-required'), "Close notes required in Closed");
		start();
	}, 50);
	
});
