test('Test incident default values', function() {
	expect(4);
	
	/* STATE */
	//incident state is new
	var expected_state = 1; 
	
	//read incident state value from incident form
	var incident_state = QUIWindow.$("incident.state").value;
	equal(incident_state, expected_state, "Incident state is new" );

	/* IMPACT */
	var expected_impact = 2;

	//read incident impact value from incident form
	var incident_impact = QUIWindow.$("incident.impact").value;
	equal(incident_impact, expected_impact, "Incident impact is low" );	

	/* URGENCY */
	var expected_urgency = 3;

	//read incident urgency value from incident form
	var incident_urgency = QUIWindow.$("incident.urgency").value;
	equal(incident_urgency, expected_urgency, "Incident urgency is low" );

	/* PRIORITY */
	var expected_priority = 5;

	//read incident priority value from incident form
	var incident_priority = QUIWindow.$("incident.priority").value;
	equal(incident_priority, expected_priority, "Incident priority is planning" );		
});   
