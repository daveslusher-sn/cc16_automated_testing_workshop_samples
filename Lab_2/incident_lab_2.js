
asyncTest('Test priority changes when urgency does', function() {
	expect(1);
		
	QUIWindow.g_form.setValue("incident.short_description", "Urgency test");	
	QUIWindow.g_form.setValue('incident.caller_id', "46d44a23a9fe19810012d100cca80666"); //Beth Anglin	
	QUIWindow.g_form.setValue("incident.urgency", "1", "1 - High");
	formSaveandAssert(function() {
		var incident_priority = QUIWindow.$("incident.priority").value;
		var expected_priority = 3;
		equal(incident_priority, expected_priority, "Incident priority is moderate" );
		start();
	});
});


asyncTest('Test priority changes when impact does', function() {
	expect(1);

	QUIWindow.g_form.setValue("incident.impact", "1", "1 - High");
	QUIWindow.g_form.setValue("incident.short_description", "Impact test");	
	QUIWindow.g_form.setValue('incident.caller_id', "46d44a23a9fe19810012d100cca80666"); //Beth Anglin
	formSaveandAssert(function() {
		var incident_priority = QUIWindow.$("incident.priority").value;
		var expected_priority = 1;
		equal(incident_priority, expected_priority, "Incident priority is critical" );	
		start(); 
	});	
	
});

