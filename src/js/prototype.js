PouchDB.debug.enable('*');

// var notesDB = new PouchDB('notes');

// destroy the DB
// new PouchDB('notes').destroy();

// var note = floe.dashboard.note.new({
//     model: {
//         "text": chance.sentence()
//     }
// });

var journal = floe.dashboard.page(".floec-journal", {
    model: {
        "name": "Alan's Journal"
    },
    listeners: {
        "onCreate.bindSubmitEntryClick": {
            func: "floe.dashboard.page.bindSubmitEntryClick",
            args: "{that}"
        }
    },
    dbOptions: {
        name: "notes"
    }
});


// Note creator

    // var note = floe.dashboard.note.new({
    //     model: {
    //         "text": chance.sentence()
    //     }
    // });


// notesDB.allDocs({include_docs: true}).then(function (response) {
//     console.log(response);
// });
