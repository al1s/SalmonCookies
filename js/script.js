'use strict';
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint prefer-const: 0 */
/* eslint arrow-parens: 0 */
/* eslint no-restricted-syntax: 0j */
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
      Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) +
        this.minCustomers
    );
    this.cookiesTotalDay = this.cookiesBoughtHour.reduce(adder, 0);
  }
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
