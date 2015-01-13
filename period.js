"use strict";

var L = require("library");

var periodShortcodes = require("./period-shortcodes");

var periodDictionary, orderedPeriodDictionary;

var getDictionaryName = L.prop(0);
var getDictionaryValue = L.prop(1);

var getPeriodName = function (name) {
    var shortcodes = periodShortcodes;

    name = name || "second";
    name = name.toLowerCase();

    // Check if period name is abbreviated
    if (shortcodes.hasOwnProperty(name)) {
        name = shortcodes[name];
    }

    // Remove any pluralisation
    name = name.replace(/s$/, "");

    if (periodDictionary.hasOwnProperty(name)) {
        return name;
    }

    return null;
};

var getPeriod = function (valueInSeconds) {
    var lastPeriod = L.prop(0, orderedPeriodDictionary),
        value;

    L.forEach(function (period) {
        if (valueInSeconds < getDictionaryValue(period)) {
            return false;
        }

        lastPeriod = period;
    }, orderedPeriodDictionary);

    value = valueInSeconds / getDictionaryValue(lastPeriod);

    return {
        value: value,
        name: getDictionaryName(lastPeriod)
    };
};

var period = function (value, name) {
    if (periodDictionary === undefined) {
        throw new Error("Period Dictionary is not set");
    }

    var self = {},
        periodName, valueInSeconds, period;

    if (!L.isNumber(value)) {
        throw new Error ("Period: Invalid value type");
    }

    periodName = getPeriodName(name);

    if (!periodName) {
        throw new Error ("Period: Invalid period name");
    }

    valueInSeconds = value * periodDictionary[periodName];

    period = getPeriod(valueInSeconds);

    self.inSeconds = function () {
        return valueInSeconds;
    };

    self.valueOf = self.inSeconds;

    self.getPeriod = function () {
        return period;
    };

    self.getPeriodName = function () {
        return period.name;
    };

    self.getPeriodValue = function () {
        return period.value;
    };

    self.inPeriod = function (name) {
        var val = 1;

        name = getPeriodName(name);
        val = periodDictionary[name];

        return valueInSeconds / val;
    };

    return self;
};

period.setDictionary = function (dictionary) {
    periodDictionary = dictionary;
    orderedPeriodDictionary = L.sortBy(1, L.toPairs(periodDictionary));
    return period;
};

module.exports = period;
