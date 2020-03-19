# Property based testing with [fast-check](https://github.com/dubzzz/fast-check)
Test example for [goma-1015](http://aster.or.jp/business/contest/rulebooku30.html)

In order to add **fast-check** to you project, you have to run:

```bash
npm install fast-check --save-dev
```

If you want to run the properties of this repository locally:

```bash
git clone https://github.com/freddiefujiwara/fast-check-goma-1015.git
cd fast-check-goma-1015
npm i
npm test
```

## More on Property Based Testing

More details on Property based testing at:
- [John Hughes — Don’t Write Tests](https://www.youtube.com/watch?v=hXnS_Xjwk2Y)
- [Generating test cases so you don’t have to (Spotify)](https://labs.spotify.com/2015/06/25/rapid-check/)

Remember that property based does not replace example based testing.
Nonetheless it can cover a larger range of inputs and potentially catch problems not seen with examples.
