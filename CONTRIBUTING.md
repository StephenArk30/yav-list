```shell
# You need to install pnpm and rush.js first
rush update
rush build

# Develop certain package (yav-list-scroll for example)
# The script only watches the certain package,
# if some files change in the dependency packages,
# remember to run rush build again.
pnpm --filter yav-list-scroll dev
# Entry of "dev" script: demo/index.ts
```
