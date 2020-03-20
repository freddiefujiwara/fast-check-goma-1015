# Property based testing with [fast-check](https://github.com/dubzzz/fast-check)
Test example for the password form

## spec
- spec 01 : the passwords is required
- spec 02 : the password should have a minimum of 8 characters and maximum of 20 characters
- spec 03 : the password should be mixed alphabets , numbers and printable symbols


## how to execute
If you want to run the properties of this repository locally:

```bash
git clone https://github.com/freddiefujiwara/fast-check-password-validator-example.git
cd fast-check-password-validator-example
npm i
npm test
```

## More on Property Based Testing

More details on Property based testing at:
- [John Hughes — Don’t Write Tests](https://www.youtube.com/watch?v=hXnS_Xjwk2Y)
- [Generating test cases so you don’t have to (Spotify)](https://labs.spotify.com/2015/06/25/rapid-check/)

Remember that property based does not replace example based testing.
Nonetheless it can cover a larger range of inputs and potentially catch problems not seen with examples.
