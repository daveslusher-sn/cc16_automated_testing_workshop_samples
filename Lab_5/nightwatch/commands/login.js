exports.command = function(username, password, displayname) {

	this
		.waitForElementVisible('body', 5000)
		.waitForElementVisible('input[id=user_name]', 5000)
		.waitForElementVisible('input[id=user_password]', 5000)
		.setValue('input[name=user_name]', username)
		.setValue('input[name=user_password]', password)
		.waitForElementVisible('button[id=sysverb_login]', 1000)
		.click('button[id=sysverb_login]')
		.pause(1000)
		.acceptAlert()
		.assert.urlContains('nav_to.do')
		.assert.containsText('span.user-name', displayname)

	return this;
}