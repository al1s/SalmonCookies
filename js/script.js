'use strict';
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint prefer-const: 0 */
/* eslint arrow-parens: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-undef: 0 */

// 1. Create an object for each store.
// 2. The object consists of:
//      min cust;
//      max cust;
//      avg cookies per cust;
//      array of cookies bought per hour;
//      total of cookies bought during the day;
//      activitySimulator() to fill prev array;
//      setMetrics() to fill first three vars;
// 3. Print array and total for each object as a list

function adder(a, b) {
  return a + b;
}

function activitySimulator() {
  this.cookiesBoughtHour = [];
  for (let i = 0; i < 15; i++) {
    this.cookiesBoughtHour.push(
      Math.floor(
        (Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) +
          this.minCustomers) *
          this.avgCookiesCustBought
      )
    );
  }
  this.cookiesTotalDay = this.cookiesBoughtHour.reduce(adder, 0);
}

function createElmWithContent(elmName, content) {
  var elm = document.createElement(elmName);
  elm.textContent = content;
  return elm;
}

function make12HourLabel(number) {
  var hour12Label;
  if (number === 0 || number === 24) hour12Label = '12am';
  else if (number === 12) hour12Label = '12pm';
  else if (number > 12 && number < 24) hour12Label = `${number - 12}pm`;
  else if (number > 0 && number < 12) hour12Label = `${number}am`;
  return hour12Label;
}

function renderStore(parentElm, storeObj) {
  var timeShift = 6;
  parentElm.appendChild(createElmWithContent('h2', storeObj.name));
  var listNode = document.createElement('ul');
  storeObj.cookiesBoughtHour.forEach((elm, ndx) => {
    var listElmNode = createElmWithContent(
      'li',
      `${make12HourLabel(ndx + timeShift)}: ${elm} cookies`
    );
    listNode.appendChild(listElmNode);
  });
  listNode.appendChild(
    createElmWithContent('li', `Total: ${storeObj.cookiesTotalDay} cookies`)
  );
  parentElm.appendChild(listNode);
}

var storePike = {
  name: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesCustBought: 6.3,
  cookiesBoughtHour: [],
  cookiesTotalDay: 0,
  fillCookiesPerHour: activitySimulator
};

var storeSeatac = {
  name: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookiesCustBought: 1.2,
  cookiesBoughtHour: [],
  cookiesTotalDay: 0,
  fillCookiesPerHour: activitySimulator
};

var storeSeattleCenter = {
  name: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 24,
  avgCookiesCustBought: 3.7,
  cookiesBoughtHour: [],
  cookiesTotalDay: 0,
  fillCookiesPerHour: activitySimulator
};
var storeCapHill = {
  name: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookiesCustBought: 2.3,
  cookiesBoughtHour: [],
  cookiesTotalDay: 0,
  fillCookiesPerHour: activitySimulator
};
var storeAlki = {
  name: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookiesCustBought: 4.6,
  cookiesBoughtHour: [],
  cookiesTotalDay: 0,
  fillCookiesPerHour: activitySimulator
};

storePike.fillCookiesPerHour();
storeSeatac.fillCookiesPerHour();
storeSeattleCenter.fillCookiesPerHour();
storeCapHill.fillCookiesPerHour();
storeAlki.fillCookiesPerHour();

var lists = document.getElementById('list');
renderStore(lists, storePike);
renderStore(lists, storeSeatac);
renderStore(lists, storeSeattleCenter);
renderStore(lists, storeCapHill);
renderStore(lists, storeAlki);
