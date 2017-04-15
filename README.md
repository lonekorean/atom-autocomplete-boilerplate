# atom-autocomplete-boilerplate

Boilerplate package for creating your own custom autocomplete provider for Atom.

## Introduction

This package is not meant to be used directly. It's a sample package that you can build upon to quickly create a custom autocomplete plug-in for Atom.

## Installation

Atom provides a built-in way to download and install packages, but for local development, you'll want to do it this way.

1. Clone this repo.
2. Make sure you have apm installed.
    - On Mac, you might need to start Atom and go to Atom &gt; Install Shell Commands.
    - On Windows, it's probably already there.
3. Open your terminal, navigate into the repo directory, then run `apm`.
4. Back in Atom, you should now see atom-autocomplete-boilerplate installed.
    - On Mac, you'll find it under Atom &gt; Preferences... &gt; Packages &gt; Community Packages.
    - On Windows, you'll find it under File &gt; Settings &gt; Packages &gt; Community Packages.

## Hacking

Open up the atom-autocomplete-boilerplate project folder in Atom. Poke around in the various files (there aren't that many). Test the autocomplete with the files inside of `/samples`.

After making code changes, you'll need to reload Atom to see those changes take effect.
- On Mac, hit `ctrl` + `option` + `command` + `L`.
- On Windows, hit `ctrl` + `shift` + `F5`.

## Provider Tiers

This package includes three sample providers (Atom parlance for "things that provide suggestions for autocomplete"). You can find them in the `/lib` folder. These are the features that each one introduces.

### basic-provider.js

The absolute simplest provider you can make. Works off a simple array of words.

- Filters suggestions based on what was typed

### intermediate-provider.js

Takes things a little further. Reasonable starting point for a useful provider.

- Only offers suggestions when within certain file types
- Waits until 3 characters are typed before offering suggestions
- Case-insensitive suggestions
- Displays extra data along with suggestions: description, more link, type icon, right text label

### advanced-provider.js

Retrieves snippet suggestions from an external API asynchronously.

- Honors exceptions where suggestions will not be provided (within an HTML comment, in this case)
- Prioritizes its own suggestions above others
- Defines its own rules for determining the prefix used to find suggestions
- Uses JavaScript Promises to fetch suggestions asynchronously
- Retrieves suggestions from an external API instead of a local JSON file
- Suggests snippets (tokenized suggestions that allow users to fill in the blanks)
- Displays a custom icon next to suggestions
- Displays styled label text next to suggestions
- Fires an event handler after a suggestion is inserted
