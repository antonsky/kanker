// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://userscripts.org/
// @copyright  2012+, You
// ==/UserScript==

// A GAME
// handles bossfights and buys scientists for BC if BC currency is selected

var farmBoss = setInterval(function(){
	var timediff = 3000;
	var dick = new Date().getTime();
	if (!game.bossScenario.active && (dick - game.bossLastGenerated) > game.bossCooldown + timediff) $('#randomBossPortal a[name="bossPortal"]').click();
	if (game.bossScenario.active && game.bossScenario.scenario_ID == 2 && (dick - game.bossScenario.boss.vars.lastAttack) > 10000 + timediff)  $('#randomBossArea button[name="attack_randomboss"]').click();
	if (popupStack.length > 4) popupStack=[];
},1000);

$('#popup p[name="title"]').bind('DOMNodeInserted', function() {
	var jspls = this;
    pop = ["ACTIVITY PASSED!", "WHOOPS!", /^SCENARIO #[0-9]$/, "Battle Report", /^WAVE #[0-9] COMPLETE!$/, "SUMMON BOSS"];
	pop.forEach(function(x,y){ 
		if (!(jspls.innerHTML.search(x))) {
			(y<5) ? setTimeout(function(){ $('#popup button[name="continue"]').click() },10)
				: setTimeout(function(){ $('#popup span[name="buttons"]').children()[1].click() },10);
			(y==0 && !$('#employment span[name="scientists_price"]').text().search(/^[0-9]* BC$/)) ? ( $('#employment button[name="hiremax_scientists"]').click(), 
				setTimeout(function(){ ($('#popup p[name="title"]').text() === 'ARE YOU SURE?') ? $('#popup span[name="buttons"]').children()[1].click() : "" },10) ) : "";
		}
	});
});