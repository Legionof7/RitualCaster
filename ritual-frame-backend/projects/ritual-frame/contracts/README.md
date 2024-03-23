# Sample GPT3

This is a minimalist foundry project that implements
a [callback consumer](https://docs.ritual.net/infernet/sdk/consumers/Callback)
that makes a prompt to OpenAI's GPT-3 API. For an end-to-end flow of how this works, see
the [sample-gpt3 readme](../../../sample-gpt3.md).

## Deploying

The [`Deploy.s.sol`](./script/Deploy.s.sol) deploys the contracts.
The [Makefile](./Makefile) in this project containes
a utility deploy target.

```bash
make deploy
```

## Prompting

The [`CallContract.s.sol`](./script/CallContract.s.sol) calls
the [`promptGPT`](./src/PromptsGPT.sol#L10) function.
The [Makefile](./Makefile) in this project contains a utility call target. You'll need
to pass in the prompt as an
env var.

```bash
prompt="What is 2 * 3?" make call-contract
```
