# atom-autocomplete-boilerplate

Boilerplate package for creating your own custom autocomplete provider for Atom.

## Introduction

This package is not meant to be used directly. Rather, it is a sample package that developers can build upon to quickly create a custom autocomplete plug-in for Atom. But you'll probably still want to install it just to see how it works.

## Installation

1. Clone this repo.
2. Make sure you have apm installed.
    - On Mac, you might need to start Atom and go to Atom &gt; Install Shell Commands.
    - On Windows, then it's probably already there.
3. Open up your terminal, navigate into the repo directory, then run `apm`.
4. Back in Atom, you should now see atom-autocomplete-boilerplate installed.
    - On Mac, you'll find it under Atom &gt; Preferences... &gt; Packages &gt; Community Packages.
    - On Windows, you'll find it under File &gt; Settings &gt; Packages &gt; Community Packages.

## Hacking

Open up the atom-autocomplete-boilerplate folder in Atom. Test the autocomplete with the files inside of /samples.

It's worth poking around in all the files (there aren't that many). There are plenty of comments in them to help you out. Some important files:
- package.json - Make sure you update this before publishing!
- lib/main.js - This is where the providers are declared.
- lib/whatever-provider.js - These do the heavy lifting to provide suggestions for autocomplete.
- data/whatever.json - Source data for suggestions.

## Provider Tiers

This package includes three sample providers (Atom parlance for "things that provide suggestions for autocomplete").

### basic-provider

The absolute simplest provider you can make. Works off a straight up array of words.

- Filters suggestions based on what was typed

### intermediate-provider

Takes things a little further. Reasonable starting point for a useful provider.

- Only offers suggestions when within certain file types
- Waits until 3 characters are typed before offering suggestions
- Case-insensitive suggestions
- Displays various ancillary data along with suggestions: description, more link, type icon, right text label

### advanced-provider

Uses advanced suggestions retrieval and custom options.

- Honors exceptions where suggestions will not be provided (within an HTML comment, in this case)
- Defines its own rules for determing the prefix (the typed bit that is used to find suggestions)
- Uses JavaScript Promises to fetch suggestions asynchronously
- Retrieves suggestions from an external API instead of a local json file
- Suggests snippets (suggestions that allow users to fill in the blanks)
- Displays suggestions with custom icons
- Displays custom styled label text next to the suggestions
