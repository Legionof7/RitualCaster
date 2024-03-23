# Sample GPT-3

The [sample-gpt3](./projects/sample-gpt3) is a minimalist container that calls the OpenAI GPT-3 API.

## Usage

### Get an API key from OpenAI

First, you'll need to get an API key from OpenAI. You can do this by making an [OpenAI](https://openai.com/) account.
After signing in, head over to [their platform](https://platform.openai.com/api-keys) to make an API key.

Then head over to the `container` directory:

```bash
cd projects/sample-gpt3/container
cp config.example.json config.json
```

Then, edit the `config.json` file and add your API key to the `OPENAI_API_KEY` field.

```
{
// etc. etc.
  "containers": [
    {
      "id": "sample-gpt3",
      "image": "ritualnetwork/infernet-starter-sample-gpt3:latest",
      // etc. etc.
      "env": {
        "OPENAI_API_KEY": "barabeem baraboom (your key goes here!)"
      }
    },
// etc. etc.
}
```

### Deploy infernet node locally

Much like our [hello world](./README.md) project, deploying the infernet node is as simple as running:

```bash
project=sample-gpt3 make deploy-container
```

## Making a Web2 Request

From here, you can directly make a request to the infernet node:

```bash
curl -X POST http://127.0.0.1:4000/api/jobs \
     -H "Content-Type: application/json" \
     -d '{"containers":["sample-gpt3"], "data": {"prompt": "Hello what is the meaning of life"}}'
# {"id":"cab6eea8-8b1e-4144-9a70-f905c5ef375b"}
```

You can then check the status of the job by running:

```bash
curl -X GET http://127.0.0.1:4000/api/jobs\?id\=cab6eea8-8b1e-4144-9a70-f905c5ef375b
# response [{"id":"cab6eea8-8b1e-4144-9a70-f905c5ef375b","result":{"container":"sample-gpt3","output":{"output":"The meaning of life is subjective and can vary from person to person. It often reflects one's values, beliefs, and personal experiences. Some people find meaning in relationships, love, and connection with others. Others find meaning in pursuing their passions or contributing to the greater good of society. Ultimately, it's up to each individual to define their own purpose and find meaning in their own life journey."}},"status":"success"}]```
```

## Making a Web3 Request
Now let's bring this service onchain! First we'll have to deploy the contracts. The [contracts](./projects/sample-gpt3/contracts)
directory contains a simple foundry project with a simple contract called `PromptsGpt`. This contract exposes a single
function `function promptGPT(string calldata prompt)`. Using this function you'll be able to make an infernet request.

**Anvil Logs**: First, it's useful to look at the logs of the anvil node to see what's going on. In a new terminal, run
`docker logs -f anvil-node`.

**Deploying the contracts**: In another terminal, run the following command:

```bash
project=sample-gpt3 make deploy-contracts
```

### Calling the contract
Now, let's call the contract. So far everything's been identical to the [hello world](./README.md) project. The only
difference here is that calling the contract requires an input. We'll pass that input in using an env var named
`prompt`:

```bash
prompt="Can shrimps actually fry rice" project=sample-gpt3 make call-contract
```

On your anvil logs, you should see something like this:

```bash
eth_sendRawTransaction

_____  _____ _______ _    _         _
|  __ \|_   _|__   __| |  | |  /\   | |
| |__) | | |    | |  | |  | | /  \  | |
|  _  /  | |    | |  | |  | |/ /\ \ | |
| | \ \ _| |_   | |  | |__| / ____ \| |____
|_|  \_\_____|  |_|   \____/_/    \_\______|


subscription Id 1
interval 1
redundancy 1
node 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
output: {'output': 'Yes, shrimps can be used to make fried rice. Fried rice is a versatile dish that can be made with various ingredients, including shrimp. Shrimp fried rice is a popular dish in many cuisines, especially in Asian cuisine.'}

    Transaction: 0x9bcab42cf7348953eaf107ca0ca539cb27f3843c1bb08cf359484c71fcf44d2b
    Gas used: 93726

    Block Number: 3
    Block Hash: 0x1cc39d03bb1d69ea7f32db85d2ee684071e28b6d6de9eab6f57e011e11a7ed08
    Block Time: "Fri, 26 Jan 2024 02:30:37 +0000"
```
beautiful, isn't it? 🥰
