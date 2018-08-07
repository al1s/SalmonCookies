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
// 4. Add constuctor.
// 5. Replace lists with a table

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

function renderStore(parentElm) {
  var timeShift = 6;
  parentElm.appendChild(createElmWithContent('h2', this.name));
  var listNode = document.createElement('ul');
  this.cookiesBoughtHour.forEach((elm, ndx) => {
    var listElmNode = createElmWithContent(
      'li',
      `${make12HourLabel(ndx + timeShift)}: ${elm} cookies`
    );
    listNode.appendChild(listElmNode);
  });
  listNode.appendChild(
    createElmWithContent('li', `Total: ${this.cookiesTotalDay} cookies`)
  );
  parentElm.appendChild(listNode);
}

function Store(name, minCust, maxCust, avgCookies) {
  [
    this.name,
    this.minCustomers,
    this.maxCustomers,
    this.avgCookiesCustBought
  ] = [name, minCust, maxCust, avgCookies];
  this.cookiesBoughtHour = [];
  this.cookiesTotalDay = 0;
}

Store.prototype.fillCookiesPerHour = activitySimulator;
Store.prototype.renderTo = renderStore;

var storePike = new Store('1st and Pike', 23, 65, 6.3);
var storeSeatac = new Store('SeaTac Airport', 3, 24, 1.2);
var storeSeattleCenter = new Store('Seattle Center', 11, 24, 3.7);
var storeCapHill = new Store('Capitol Hill', 20, 38, 6.3);
var storeAlki = new Store('Alki', 2, 16, 4.6);

storePike.fillCookiesPerHour();
storeSeatac.fillCookiesPerHour();
storeSeattleCenter.fillCookiesPerHour();
storeCapHill.fillCookiesPerHour();
storeAlki.fillCookiesPerHour();

var lists = document.getElementById('list');
storePike.renderTo(lists);
storeSeatac.renderTo(lists);
storeSeattleCenter.renderTo(lists);
storeCapHill.renderTo(lists);
storeAlki.renderTo(lists);
