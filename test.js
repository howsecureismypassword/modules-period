"use strict";

/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var period = require("./period");
var periodDictionary = require("./period-dictionary");

period.setDictionary(periodDictionary);

/**
 * Tests
 */
buster.testCase("named-number", {
    "Basic": {
        "2 yoctoseconds": function () {
            assert.equals(period(1e-24).getPeriod(), { "value": 1, "name": "yoctosecond"});
        },
        "1 Hour": function () {
            assert.equals(period(3600).getPeriod(), { "value": 1, "name": "hour"});
        },
        "3.5 Days": function () {
            assert.equals(period(302400).getPeriod(), { "value": 3.5, "name": "day"});
        },
        "3 Weeks": function () {
            assert.equals(period(1814400).getPeriod(), { "value": 3, "name": "week"});
        },
    },
    "Converting": {
        "24 Hours": function () {
            assert.equals(period(24, "hour").getPeriod(), { "value": 1, "name": "day"});
        },
        "1000 ms": function () {
            assert.equals(period(1000, "ms").getPeriod(), { "value": 1, "name": "second"});
        },
    }
});