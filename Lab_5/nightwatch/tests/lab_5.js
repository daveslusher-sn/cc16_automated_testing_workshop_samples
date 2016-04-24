var baseUrl = 'http://helsinki/';
//var baseUrl = 'https://empjnerius.service-now.com';

var admin_user = 'admin';
var admin_password = 'admin';
var admin_displayname = 'System Administrator';

module.exports = {
	before : function (browser) {
		browser
			.url(baseUrl + '/login.do')
			.login(admin_user, admin_password, admin_displayname);
	}, 

	'Hello Test!': function(browser) {
		browser
			.waitForElementVisible('body', 10000);
	},
	
	'Test Incident Form': function(browser) {
		browser
			.url(baseUrl + '/incident.do')
			.waitForElementVisible('body', 5000)
			.waitForElementVisible('[name=incident\\.number]', 5000)
			.waitForElementVisible('[name=incident\\.category]', 5000);
		browser.useXpath();
		browser.waitForElementVisible('//select[@name=\'incident.subcategory\']',1000);
		browser
			.expect
			.element('//select[@id=\'incident.subcategory\']/option[text()=\'Email\']')
			.present;
		browser
			.waitForElementVisible('//select[@name=\'incident.subcategory\']', 1000)
			.setValue('//select[@name=\'incident.category\']', 'network')
			.pause(1000);
		browser
			.expect
			.element('//select[@id=\'incident.subcategory\']/option[text()=\'DNS\']')
			.present;
		browser.end();
	}
 
};