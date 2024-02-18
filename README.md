# tokenscript

## Style dictionary

Style dictionary is software transforming tokens in variables for different platforms.

Actually working with `./working-tokens-example/` folder but not working with `./tokens/` folder.

We can change the target folder by setting the `tokenPath` variable in `./build-tokens.cjs`

**About the issue** => Seems to be a problem with our tokens that are referencing none-existing values

eg. `error: Reference doesn't exist: tries to reference Regular, which is not defined`