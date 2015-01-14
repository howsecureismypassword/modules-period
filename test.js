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
buster.testCase("period", {
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
    },

    "Input" : {
        "Strange Inputs": {
            "string": function () {
                assert.exception(function () {
                    period("monkey");
                });
            },

            "object": function () {
                assert.exception(function () {
                    period({});
                });
            },

            "false": function () {
                assert.exception(function () {
                    period(false);
                });
            },

            "Invalid period name": function () {
                assert.exception(function () {
                    period(129, "monkeys");
                });
            }
        },

        "Regular": {
            "129": function () {
                var p = period(129, "seconds").inSeconds();
                assert.same(p, 129);
            }
        },

        "Shortcodes": {
            "ms": function () {
                var p = period(1, "ms").getSingular();
                assert.same(p, "millisecond");
            },

            "s": function () {
                var p = period(1, "s").getSingular();
                assert.same(p, "second");
            },

            "sec": function () {
                var p = period(1, "sec").getSingular();
                assert.same(p, "second");
            },

            "min": function () {
                var p = period(1, "min").getSingular();
                assert.same(p, "minute");
            }
        },

        "Convert to Seconds": {
            "yoctosecond": function () {
                var p = period(1, "yoctosecond").inSeconds();
                assert.same(p, 1e-24);
            },

            "zeptosecond": function () {
                var p = period(1, "zeptosecond").inSeconds();
                assert.same(p, 1e-21);
            },

            "attosecond": function () {
                var p = period(1, "attosecond").inSeconds();
                assert.same(p, 1e-18);
            },

            "femtosecond": function () {
                var p = period(1, "femtosecond").inSeconds();
                assert.same(p, 1e-15);
            },

            "picosecond": function () {
                var p = period(1, "picosecond").inSeconds();
                assert.same(p, 1e-12);
            },

            "nanosecond": function () {
                var p = period(1, "nanosecond").inSeconds();
                assert.same(p, 1e-9);
            },

            "microsecond": function () {
                var p = period(1, "microsecond").inSeconds();
                assert.same(p, 1e-6);
            },

            "millisecond": function () {
                var p = period(1, "millisecond").inSeconds();
                assert.same(p, 1e-3);
            },

            "second": function () {
                var p = period(1, "second").inSeconds();
                assert.same(p, 1);
            },

            "minute": function () {
                var p = period(1, "minute").inSeconds();
                assert.same(p, 60);
            },

            "hour": function () {
                var p = period(1, "hour").inSeconds();
                assert.same(p, 60 * 60);
            },

            "day": function () {
                var p = period(1, "day").inSeconds();
                assert.same(p, 60 * 60 * 24);
            },

            "week": function () {
                var p = period(1, "week").inSeconds();
                assert.same(p, 60 * 60 * 24 * 7);
            },

            "month": function () {
                var p = period(1, "month").inSeconds();
                assert.same(p, 60 * 60 * 24 * 30.4);
            },

            "year": function () {
                var p = period(1, "year").inSeconds();
                assert.same(p, 60 * 60 * 24 * 365.25);
            }
        },

        "Convert from Seconds": {
            "// yoctosecond": function () {
                var p = period(1).inPeriod("yoctosecond");
                assert.same(p, 1 / 1e-24);
            },

            "// zeptosecond": function () {
                var p = period(1).inPeriod("zeptosecond");
                assert.same(p, 1 / 1e-21);
            },

            "// attosecond": function () {
                var p = period(1).inPeriod("attosecond");
                assert.same(p, 1 / 1e-18);
            },

            "// femtosecond": function () {
                var p = period(1).inPeriod("femtosecond");
                assert.same(p, 1 / 1e-15);
            },

            "// picosecond": function () {
                var p = period(1).inPeriod("picosecond");
                assert.same(p, 1 / 1e-12);
            },

            "// nanosecond": function () {
                var p = period(1).inPeriod("nanosecond");
                assert.same(p, 1 / 1e-9);
            },

            "// microsecond": function () {
                var p = period(1).inPeriod("microsecond");
                assert.same(p, 1 / 1e-6);
            },

            "// millisecond": function () {
                var p = period(1).inPeriod("millisecond");
                assert.same(p, 1 / 1e-3);
            },

            "// second": function () {
                var p = period(1, "second").inPeriod("second");
                assert.same(p, 1);
            },

            "// minute": function () {
                var p = period(1).inPeriod("minute");
                assert.same(p, 1 / 60);
            },

            "// hour": function () {
                var p = period(1).inPeriod("hour");
                assert.same(p, 1 / (60 * 60));
            },

            "// day": function () {
                var p = period(1).inPeriod("day");
                assert.same(p, 1 / (60 * 60 * 24));
            },

            "// week": function () {
                var p = period(1).inPeriod("week");
                assert.same(p, 1 / (60 * 60 * 24 * 7));
            },

            "// month": function () {
                var p = period(1).inPeriod("month");
                assert.same(p, 1 / (60 * 60 * 24 * 30.4));
            },

            "// year": function () {
                var p = period(50).inPeriod("year");
                assert.same(p, 50 / (60 * 60 * 24 * 365.25));
            }
        },

        "Other": {
            "sub-yoctosecond": function () {
                var p = period(0.005, "yoctosecond");
                assert.same(p.getLength(), 0.005);
                assert.same(p.getSingular(), "yoctosecond");
            },

            "get period": function () {
                var p = period(23e25, "seconds");
                assert.same(p.getLength(), 7288260197226659000);
                assert.same(p.getSingular(), "year");
            }
        }
    },

    "Options": {
        "No period name": function () {
            var p = period(12).inSeconds();
            assert.same(p, 12);
        }
    }
});