// helper just to generate a random string as your JWT KEY

console.log([...Array(30)].map(e => ((Math.random() * 36) | 0).toString(36)).join(''))

// When you are setting up your deployment environment, run the script and then copy the output to set the environment variable.
// i.e. 
// run it in your terminal by... node generateKey.js
// output would be something like: ixzz7ph7goovu62b6hz3k6egyghhbn
// and then set your supersecretkey in the terminal by copying that into... export GIFTR_JWTKEY=ixzz7ph7goovu62b6hz3k6egyghhbn

// NOTE: if you change this key, every token that you generated using your previous key will no longer be validated
// you want this sometimes in situations like security breaches 