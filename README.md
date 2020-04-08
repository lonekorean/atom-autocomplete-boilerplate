# YGOPro API Autocomplete plugin for Atom

This is an autocomplete plugin for Atom that covers the YGOPro API.

Currently, the translations from the [Chinese docs](https://github.com/247321453/DataEditorX/tree/master/DataEditorX/data) are still weird, and some are just missing, so any help to improve them would be very appreciated.

## Features

- [x] Autocompletes constants, class names and methods.
- [ ] Autocompletes card callbacks (condition, cost, target, operation, etc).
- [x] Provides description for each constant, method, etc.
- [x] Adapts method calls for `.` and `:`.

### Method Calls

If you type the name of a class followed by `.`, e.g. `Card.`, you'll get all the available methods for the Card class.

However, if you want to call those methods from an object, which uses Lua syntatic sugar `:`, you have to name your variables according to the naming convention found in the game files: Card objects are identified by a `c` in the end of the name, Effect objects by an `e`, and Group objects by a `g`. And all of them optionally might have numbers after this identifying letter.

So, for example, if you type `e2:` you get Effect methods, if you type `tc:` you get Card methods, and if you type `eg10:` you get Group methods.
