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
  var row = createElmWithContent('tr');
  row.className = 'table__body  row';
  row.appendChild(createElmWithContent('th', this.name));
  this.cookiesBoughtHour.forEach(elm => {
    var tdElmNode = createElmWithContent('td', elm);
    row.appendChild(tdElmNode);
  });
  row.appendChild(createElmWithContent('td', this.cookiesTotalDay));
  parentElm.appendChild(row);
}

function renderHeader(parentElm, headerElmList) {
  var headerDeclaration = createElmWithContent('thead');
  var headerRow = createElmWithContent('tr');
  headerRow.className = 'header';
  var headerNodes = headerElmList.map(elm => createElmWithContent('th', elm));
  headerNodes.forEach(elm => headerRow.appendChild(elm));
  headerDeclaration.appendChild(headerRow);
  parentElm.appendChild(headerDeclaration);
}

function renderFooter(parentElm, footerElmList) {
  var footerDeclaration = createElmWithContent('tfoot');
  var footerRow = createElmWithContent('tr');
  footerRow.className = 'footer';
  var footerNodes = footerElmList.map(elm => createElmWithContent('td', elm));
  footerNodes.forEach(elm => footerRow.appendChild(elm));
  footerDeclaration.appendChild(footerRow);
  parentElm.appendChild(footerDeclaration);
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

var timeShift = 6;
var storePike = new Store('1st and Pike', 23, 65, 6.3);
var storeSeatac = new Store('SeaTac Airport', 3, 24, 1.2);
var storeSeattleCenter = new Store('Seattle Center', 11, 24, 3.7);
var storeCapHill = new Store('Capitol Hill', 20, 38, 6.3);
var storeAlki = new Store('Alki', 2, 16, 4.6);

var stores = [
  storePike,
  storeSeatac,
  storeSeattleCenter,
  storeCapHill,
  storeAlki
];

var lists = document.getElementById('list');
var table = lists.appendChild(document.createElement('table'));
table.className = 'table';
var headerList = new Array(15).fill('').map(_ => make12HourLabel(timeShift++));
headerList.unshift('');
headerList.push('Daily Location Total');
renderHeader(table, headerList);
var tableBody = document.createElement('tbody');

stores.forEach(elm => {
  elm.fillCookiesPerHour();
  elm.renderTo(tableBody);
});

table.appendChild(tableBody);
var storeTotalsPerHour = [];
var cookiesHourStore = stores.map(elm => elm['cookiesBoughtHour']);
for (let i = 0; i < 15; i++) {
  storeTotalsPerHour.push(
    cookiesHourStore.reduce((total, elm) => total + elm[i], 0)
  );
}

storeTotalsPerHour.push(storeTotalsPerHour.reduce(adder, 0));
storeTotalsPerHour.unshift('Totals');
renderFooter(table, storeTotalsPerHour);
