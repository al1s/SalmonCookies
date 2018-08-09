'use strict';
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

function renderStore(target) {
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
  // parentElm.appendChild(row);
  return row;
}

function addStore(e) {
  e.preventDefault();
  var [storeName, minCust, maxCust, avgCookies] = [
    document.getElementById('storeName').value,
    document.getElementById('minCust').value,
    document.getElementById('maxCust').value,
    document.getElementById('avgCookies').value
  ];
  renderNewStore(
    new Store(storeName, minCust, maxCust, avgCookies),
    storesDescription
  );
  e.target.reset();
}
// add new store to the page
// var storeBelki = new Store('Belki', 33, 55, 5.6);
function renderNewStore(store, dataDescription) {
  store.activitySimulator();
  stores.push(store);
  dataDescription.forEach((table, ndx) => {
    var row = store.renderTo(table.target);
    shadowDOM[ndx].rows.push(row);
    shadowDOM[ndx].body.appendChild(row);
    var footerData = getFooterList(table.target);
    var footer = renderFooter(footerData);
    shadowDOM[ndx].table.removeChild(shadowDOM[ndx].footer);
    shadowDOM[ndx].footer = footer;
    shadowDOM[ndx].table.appendChild(footer);
  });
}

function renderData(data, dataDescription, parentElm) {
  dataDescription.forEach((table, ndx) => {
    // create text header for current table
    parentElm.appendChild(
      createElmWithContent('h2', 'table__text-header', table.name)
    );

    // create table
    var tableElm = parentElm.appendChild(
      createElmWithContent('table', table.styles)
    );

    // collect it separetly from the page to have easy access to it later
    shadowDOM.push({ table: tableElm });

    // generate header and put it to storage
    var headerList = getHeaderTimeList(timeShift);
    shadowDOM[ndx].header = renderHeader(headerList);
    shadowDOM[ndx].body = document.createElement('tbody');

    // generate rows, put it to storage and append to parent element
    shadowDOM[ndx].rows = [];
    // add rows for each store
    data.forEach(store => {
      if (ndx === 0) store.activitySimulator();
      var row = store.renderTo(table.target);
      shadowDOM[ndx].rows.push(row);
      shadowDOM[ndx].body.appendChild(row);
    });

    // generate footer and put it to storage
    var footerList = getFooterList(table.target);
    shadowDOM[ndx].footer = renderFooter(footerList);

    // render to the real DOM
    Object.keys(shadowDOM[ndx]).forEach(elm => {
      if (['header', 'body', 'footer'].includes(elm)) {
        shadowDOM[ndx].table.appendChild(shadowDOM[ndx][elm]);
      }
    });
  });
}

var shadowDOM = [];

function Store(
  name,
  minCust,
  maxCust,
  avgCookies,
  address,
  openHours = '6am - 8pm'
) {
  [
    this.name,
    this.minCustomers,
    this.maxCustomers,
    this.avgCookiesCustBought,
    this.address,
    this.openHours
  ] = [name, minCust, maxCust, avgCookies, address, openHours];
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
var storePike = new Store(
  '1st and Pike',
  23,
  65,
  6.3,
  '1906 Pike Pl, Seattle, WA 98101'
);
var storeSeatac = new Store(
  'SeaTac Airport',
  3,
  24,
  1.2,
  '17801 International Blvd, SeaTac, WA 98158'
);
var storeSeattleCenter = new Store(
  'Seattle Center',
  11,
  24,
  3.7,
  '305 Harrison St, Seattle, WA 98109'
);
var storeCapHill = new Store(
  'Capitol Hill',
  20,
  38,
  6.3,
  '1400 E Prospect St, Seattle, WA 98112'
);
var storeAlki = new Store(
  'Alki',
  2,
  16,
  4.6,
  '2137 California Ave SW, Seattle, WA 98116'
);

var stores = [
  storePike,
  storeSeatac,
  storeSeattleCenter,
  storeCapHill,
  storeAlki
];

var tables = document.getElementById('tables');
var storesDescription = [
  {
    name: 'Cookie sales by store',
    styles: 'table  table__sales',
    target: 'sales'
  },
  {
    name: 'Staff requirements',
    styles: 'table  table__staff',
    target: 'staff'
  }
];

// renderData(stores, storesDescription, tables);
