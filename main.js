const typeScriptCodeGenerator = require("./typeScriptCodeGenerator")

function _handleGen(base, path, options) {
    // window.alert('Hello World!');
    // If options is not passed, get from preference
    options = options || getGenOptions()
    // If base is not assigned, popup ElementPicker
    if (!base) {
        app.elementPickerDialog.showDialog('Select a base model to generate codes', null, type.UMLPackage).then(function ({ buttonId, returnValue }) {
            if (buttonId === 'ok') {
                base = returnValue
                console.log(base);
                // If path is not assigned, popup Open Dialog to select a folder
                if (!path) {
                    var files = app.dialogs.showOpenDialog('Select a folder where generated codes to be located', null, null, { properties: ['openDirectory'] })
                    if (files && files.length > 0) {
                        path = files[0]
                        console.log(path);
                        typeScriptCodeGenerator.generate(base, path, options);
                    }
                } else {
                    typeScriptCodeGenerator.generate(base, path, options)
                }
            }
        })
    } else {
        // If path is not assigned, popup Open Dialog to select a folder
        if (!path) {
            var files = app.dialogs.showOpenDialog('Select a folder where generated codes to be located', null, null, { properties: ['openDirectory'] })
            if (files && files.length > 0) {
                path = files[0]
                console.log(path);
                typeScriptCodeGenerator.generate(base, path, options);
            }
        } else {
            console.log(path);
            typeScriptCodeGenerator.generate(base, path, options);
        }
    }
}

function getGenOptions() {
    return {
        tsDoc: app.preferences.get("typescript.gen.tsDoc"),
        indentSpaces: app.preferences.get("typescript.gen.indentSpaces"),
        copyright: app.preferences.get("typescript.gen.copyright"),
        comments: app.preferences.get("typescript.gen.comments")
    };
}

function init() {
     app.commands.register('typescript:generate', _handleGen)
}

exports.init = init