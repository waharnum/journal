/*
Copyright 2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

/* global fluid, floe, PouchDB */

(function ($, fluid) {

    "use strict";

    // Handles retrieving and displaying goals
    fluid.defaults("floe.dashboard.goals", {
        gradeNames: ["floe.dashboard.page"],
        invokers: {
            "getEntries": {
                funcName: "floe.dashboard.goals.getEntries",
                args: "{that}"
            }
        },
        resources: {
            stringTemplate: "<ol class=\"floec-entryList floe-entryList\">"
        },
        dynamicComponents: {
            entry: {
                options: {
                    resources: {
                        stringTemplate: "<span class=\"floec-goal-icon\">&#10026;</span> <span class=\"floec-note-text\"></span><br><span   class=\"floec-goal-due\"></span>"
                    }
                }
            }
        }
    });

    floe.dashboard.goals.getEntries = function (that) {
        var pageDate = new Date(that.model.currentDate);
        var pageUTCFull = pageDate.toJSON();
        var pageUTCDate = pageUTCFull.slice(0,pageUTCFull.indexOf("T"));

        var startkey = null,
            endkey = null,
            dbName = that.options.dbOptions.localName;

        floe.dashboard.page.retrieveFromPouch(dbName, startkey, endkey, that, floe.dashboard.goals.createEntriesFromPouchResponse);
    };

    floe.dashboard.goals.createEntriesFromPouchResponse = function (that, pouchResponse) {
        var goals = fluid.remove_if(pouchResponse.rows, function (row) {
            var componentType = row.doc.persistenceInformation.typeName;
            return componentType.indexOf("floe.dashboard.goal") === -1;
        });

        // Sort by date
        fluid.stableSort(goals, function (a, b) {
            return new Date(a.doc.due) - new Date(b.doc.due);
        });

        fluid.each(goals, function (row) {
            console.log(row);
            var displayComponentType = row.doc.persistenceInformation.typeName.replace(".persisted", ".displayed");
            var entryContainer = floe.dashboard.page.injectEntryContainer(that);
            that.events.onEntryRetrieved.fire(row.doc, displayComponentType, entryContainer);
        });
    };

})(jQuery, fluid);