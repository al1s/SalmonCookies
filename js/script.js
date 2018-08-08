'use strict';
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint prefer-const: 0 */
/* eslint arrow-parens: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-undef: 0 */

// Day 1
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
//
// Day 2
// 4. Add constuctor.
// 5. Replace lists with a table
//
// Day 3
// 6. Refactor:
//   1. Keep DOM elements for tables, and parts of them in app
//      to have an ability to add/remove rows, footer, header.
//   2. Render totals on request with additional check whether the DOM for it
//      is already in place or we should create it from scratch.
//   +3. Keep mutable values (state) for each merchant in an object inside
//      the merchant object to provide a universal access to such data. For
//      example, store.operations.sales.hourly/total and
//               store.operations.staff.hourly/total.
//   +4. Put the implementation of header/footer data in the separate functions.

function adder(a, b) {
  return a + b;
}

function activitySimulator() {
  var salesHourly = [];
  var staffHourly = [];
  for (let i = 0; i < 15; i++) {
    var currentSales = Math.floor(
      (Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) +
        this.minCustomers) *
        this.avgCookiesCustBought
    );

    salesHourly.push(currentSales);
    staffHourly.push(
      currentSales / staffCapacity > 2
        ? Math.ceil(currentSales / staffCapacity)
        : staffLimit
    );
  }
  this.operations.sales.hourly = salesHourly;
  this.operations.staff.hourly = staffHourly;

  this.operations.sales.total = salesHourly.reduce(adder, 0);
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
  var innerArr = this.operations[target].hourly;
  var totalElm = this.operations[target].total;
  innerArr.forEach(elm => {
    var tdElmNode = createElmWithContent('td', 'body__cell', elm);
    row.appendChild(tdElmNode);
  });
  row.appendChild(
    createElmWithContent('td', 'body__cell  table__totals', totalElm)
  );
  parentElm.appendChild(row);
  return row;
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
  return headerDeclaration;
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

// compose header content
function getHeaderTimeList(startWithAnHour) {
  var headerList = new Array(15)
    .fill('')
    .map(_ => make12HourLabel(startWithAnHour++));
  headerList.unshift('');
  headerList.push('Daily Location Total');
  return headerList;
}

// compose footer content
function getFooterList(target) {
  var footer = [];
  var salesHourly = stores.map(elm => elm.operations[target].hourly);

  // tally up columns
  for (let i = 0; i < 15; i++) {
    footer.push(salesHourly.reduce((total, elm) => total + elm[i], 0));
  }
  footer.push(footer.reduce(adder, 0));
  footer.unshift('Totals');
  return footer;
}

var shadowDOM = {};

function Store(name, minCust, maxCust, avgCookies) {
  [
    this.name,
    this.minCustomers,
    this.maxCustomers,
    this.avgCookiesCustBought
  ] = [name, minCust, maxCust, avgCookies];
  this.operations = {
    sales: {
      hourly: [],
      total: 0
    },
    staff: {
      hourly: [],
      total: 0
    }
  };
}

Store.prototype.activitySimulator = activitySimulator;
Store.prototype.renderTo = renderStore;

var timeShift = 6;
var staffLimit = 2;
var staffCapacity = 20;
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

var tables = document.getElementById('tables');

tables.appendChild(
  createElmWithContent('h2', 'table__text-header', 'Cookie sales by store')
);

// create table with cookies
var tableSales = tables.appendChild(
  createElmWithContent('table', 'table  table__sales')
);

var headerList = getHeaderTimeList(timeShift);
var tableHeader = renderHeader(tableSales, headerList);
// put tableHeader into an array in shadowDOM.tableName.rows;
console.log(tableHeader);

var tableBody = document.createElement('tbody');

// add rows for each store
stores.forEach(elm => {
  elm.activitySimulator();
  var tableRow = elm.renderTo(tableBody, 'sales');
  // put tableRow into an array in shadowDOM.tableName.rows;
  console.log(tableRow);
});
// put? tableBody into an array in shadowDOM.tableName.rows;
console.log(tableBody);
tableSales.appendChild(tableBody);

var footerList = getFooterList('sales');
renderFooter(tableSales, footerList);

////////////////////////////////////////
// ANOTHER TABLE!!!
///////////////////////////////////////
// render table with staff
tables.appendChild(
  createElmWithContent('h2', 'table__text-header', 'Staff requirements')
);
var tableStaff = tables.appendChild(
  createElmWithContent('table', 'table  table__staff')
);

// compose header content and render it
renderHeader(tableStaff, headerList);
var tableBody = document.createElement('tbody');

// add rows for each store
stores.forEach(elm => {
  elm.renderTo(tableBody, 'staff');
});
tableStaff.appendChild(tableBody);

var footerList = getFooterList('staff');
renderFooter(tableStaff, footerList);
