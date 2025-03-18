# Chick

Chrome extension for full text bookmarks and browsing history search.

Start search in google, other search engine or Press e, then space or tab, in the omnibox to start searching your bookmarks and browsing history.

Chick indexes all the text on the bookmarks and browsing history to local.

![](chick.png)

## Install

https://chrome.google.com/webstore/detail/chick/iiekfnbpcjolepcejefknaoblbkegbdf

# Query

## type

```
type:(bookmark|history|pocket)
```

## before

```
before:2018-08-01
```

## after

```
after:2018-08-01
```

## tag

```
#elm
```

## Build

```
yarn install
./build.sh
```

You must have a `elm` binary placed in `/node_modules/` at the root, they can be downloaded for all platforms including Windows [here](https://guide.elm-lang.org/install/elm.html).

However the build fails on Windows.

## TODO

* [ ] Improving search accuracy
* [ ] Add Query
* [ ] Add delete tag

## License

MIT

Copyright © 2018 Takahiro Sato
