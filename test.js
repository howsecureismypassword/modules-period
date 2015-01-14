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
            assert.equals(period(1e-24).getLength(), 1);
            assert.equals(period(1e-24).getSingular(), "yoctosecond");
        },
        "1 Hour": function () {
            assert.equals(period(3600).getLength(), 1);
            assert.equals(period(3600).getSingular(), "hour");
        },
        "3.5 Days": function () {
            assert.equals(period(302400).getLength(), 3.5);
            assert.equals(period(302400).getPlural(), "days");
        },
        "3 Weeks": function () {
            assert.equals(period(1814400).getLength(), 3);
            assert.equals(period(1814400).getPlural(), "weeks");
        },
    },
    "Converting": {
        "24 Hours": function () {
            assert.equals(period(24, "hour").getLength(), 1);
            assert.equals(period(24, "hour").getSingular(), "day");
        },
        "1000 ms": function () {
            assert.equals(period(1000, "ms").getLength(), 1);
            assert.equals(period(1000, "ms").getSingular(), "second");
        },
        "1e20s": function () {
            assert.equals(period(1e20).getLength(), 3168808781402.895);
            assert.equals(period(1e20).getPlural(), "years");
        },
    }
});