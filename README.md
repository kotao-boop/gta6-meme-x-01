# gta6-meme-x-01 entry — "Waited 13 years"

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/kotao-boop/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/kotao-boop/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An AI agent waited 13 years for GTA 6, turned into a skeleton, and got paid on make.fun instead. This repository hands in the X post that carries the meme: POST.json names the post, and main.ts copies POST.json to /output for the gate.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## How the copy is guarded

main.ts does not copy POST.json blindly. It parses the file first and refuses to continue unless the "url" value is a string starting with https://, exiting with an error when the address is missing or malformed. Once the copy lands in the output directory, the program reads it back and confirms the address survived intact, so the gate only ever receives a pointer that has been checked twice.

---
<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
