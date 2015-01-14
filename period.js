"use strict";

var L = require("library");

var periodsDictionary, orderedPeriodsDictionary;

var getDictionaryValue = L.prop("seconds");

var getPeriodInSeconds = function (name) {
    name = name || "second";
    name = name.toLowerCase();

    if (periodsDictionary.hasOwnProperty(name)) {
        return periodsDictionary[name];
    }

    return null;
};

var getPeriod = function (valueInSeconds) {
    var lastPeriod = L.prop(0, orderedPeriodsDictionary),
        value;

    L.forEach(function (period) {
        if (valueInSeconds < getDictionaryValue(period)) {
            return false;
        }

        lastPeriod = period;
    }, orderedPeriodsDictionary);

    value = valueInSeconds / getDictionaryValue(lastPeriod);

    return {
        value: value,
        name: value === 1 ? lastPeriod.singular : lastPeriod.plural
    };
};

var extractNames = function (periodsDictionary, item) {
    var value = getDictionaryValue(item);

    if (item.hasOwnProperty("singular")) {
        periodsDictionary[item.singular] = value;
    }

    if (item.hasOwnProperty("plural")) {
        periodsDictionary[item.plural] = value;
    }

    if (item.hasOwnProperty("abbreviations") && L.isArray(item.abbreviations)) {
        L.forEach(function (name) {
            periodsDictionary[name] = value;
        }, item.abbreviations);
    }

    return periodsDictionary;
};

var period = function (value, name) {
    if (periodsDictionary === undefined) {
        throw new Error("Period Dictionary is not set");
    }

    var self = {},
        periodInSeconds, valueInSeconds, period;

    if (!L.isNumber(value)) {
        throw new Error ("Period: Invalid value type");
    }

    periodInSeconds = getPeriodInSeconds(name);

    if (!periodInSeconds) {
        throw new Error ("Period: Invalid period name");
    }

    valueInSeconds = value * periodInSeconds;

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

    return self;
};

period.setDictionary = function (dictionary) {
    orderedPeriodsDictionary = L.sortBy("seconds", dictionary);
    periodsDictionary = L.reduce(extractNames, {}, dictionary);
    return period;
};

module.exports = period;
