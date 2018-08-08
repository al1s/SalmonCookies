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
  this.tossersPerHour = [];
  this.cookiesBoughtHour = [];
  for (let i = 0; i < 15; i++) {
    var currentHourCookiesSold = Math.floor(
      (Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) +
        this.minCustomers) *
        this.avgCookiesCustBought
    );

    this.cookiesBoughtHour.push(currentHourCookiesSold);
    this.tossersPerHour.push(
      currentHourCookiesSold / tosserCapacity > 2
        ? Math.ceil(currentHourCookiesSold / tosserCapacity)
        : tossersLimit
    );
  }
  this.cookiesTotalDay = this.cookiesBoughtHour.reduce(adder, 0);
}

function createElmWithContent(elmName, elmClass, content) {
  var elm = document.createElement(elmName);
  elm.className = elmClass;
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

function renderStore(parentElm, target) {
  var row = createElmWithContent('tr', 'table__body  row');
  row.appendChild(createElmWithContent('th', 'header__cell', this.name));
  switch (target) {
  case 'cookies':
    var innerArr = this.cookiesBoughtHour;
    var totalElm = this.cookiesTotalDay;
    break;
  case 'tossers':
    var innerArr = this.tossersPerHour;
    var totalElm = this.tossersTotalDay;
    break;
  default:
    var innerArr;
    break;
  }
  innerArr.forEach(elm => {
    var tdElmNode = createElmWithContent('td', 'body__cell', elm);
    row.appendChild(tdElmNode);
  });
  row.appendChild(
    createElmWithContent('td', 'body__cell  table__totals', totalElm)
  );
  parentElm.appendChild(row);
}

function renderHeader(parentElm, headerElmList) {
  var headerDeclaration = createElmWithContent('thead', 'table__header');
  var headerRow = createElmWithContent('tr', 'header__row');
  var headerNodes = headerElmList.map(elm =>
    createElmWithContent('th', 'header__cell', elm)
  );
  headerNodes.forEach(elm => headerRow.appendChild(elm));
  headerDeclaration.appendChild(headerRow);
  parentElm.appendChild(headerDeclaration);
}

function renderFooter(parentElm, footerElmList) {
  var footerDeclaration = createElmWithContent('tfoot', 'footer');
  var footerRow = createElmWithContent('tr', 'footer__row');
  var footerNodes = footerElmList.map(elm =>
    createElmWithContent('td', 'footer__cell  table__totals', elm)
  );
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
  this.tossersPerHour = [];
  this.cookiesTotalDay = 0;
  this.tossersTotalDay = 0;
}

Store.prototype.fillCookiesPerHour = activitySimulator;
Store.prototype.renderTo = renderStore;

var timeShift = 6;
var tossersLimit = 2;
var tosserCapacity = 20;
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

lists.appendChild(
  createElmWithContent('h2', 'table__text-header', 'Cookie sales by store')
);

// render table with cookies
var tableSales = lists.appendChild(
  createElmWithContent('table', 'table  table__sales')
);

// compose header content and render it
var headerList = new Array(15).fill('').map(_ => make12HourLabel(timeShift++));
headerList.unshift('');
headerList.push('Daily Location Total');
renderHeader(tableSales, headerList);
var tableBody = document.createElement('tbody');

// add rows for each store
stores.forEach(elm => {
  elm.fillCookiesPerHour();
  elm.renderTo(tableBody, 'cookies');
});
tableSales.appendChild(tableBody);

// compose footer content and render it
var storeTotalsPerHour = [];

// store all cookies per hour
var cookiesHourStore = stores.map(elm => elm['cookiesBoughtHour']);

// tally up columns
for (let i = 0; i < 15; i++) {
  storeTotalsPerHour.push(
    cookiesHourStore.reduce((total, elm) => total + elm[i], 0)
  );
}
storeTotalsPerHour.push(storeTotalsPerHour.reduce(adder, 0));
storeTotalsPerHour.unshift('Totals');
renderFooter(tableSales, storeTotalsPerHour);

// render table with staff
timeShift = 6;
lists.appendChild(
  createElmWithContent('h2', 'table__text-header', 'Staff requirements')
);
var tableStaff = lists.appendChild(
  createElmWithContent('table', 'table  table__staff')
);

// compose header content and render it
headerList = new Array(15).fill('').map(_ => make12HourLabel(timeShift++));
headerList.unshift('');
headerList.push('Daily Location Total');
renderHeader(tableStaff, headerList);
tableBody = document.createElement('tbody');

// add rows for each store
stores.forEach(elm => {
  elm.renderTo(tableBody, 'tossers');
});
tableStaff.appendChild(tableBody);

// compose footer content and render it
storeTotalsPerHour = [];

// store all cookies per hour
var tossersHourStore = stores.map(elm => elm['tossersPerHour']);

// tally up columns
for (let i = 0; i < 15; i++) {
  storeTotalsPerHour.push(
    tossersHourStore.reduce((total, elm) => total + elm[i], 0)
  );
}
storeTotalsPerHour.push(storeTotalsPerHour.reduce(adder, 0));
storeTotalsPerHour.unshift('Totals');
renderFooter(tableStaff, storeTotalsPerHour);
