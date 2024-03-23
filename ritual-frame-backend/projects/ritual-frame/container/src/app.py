import json
import os
from typing import Any, cast

import requests
from flask import Flask, request

# read api key from env
api_key = os.environ.get("HF_TOKEN", "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")


def query_chatgpt(
    prompt: str, api_key: str = api_key
) -> Any:
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

        data = {
            "inputs": prompt,
        }

        response = requests.post(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
            headers=headers,
            data=json.dumps(data),
        )

        if response.status_code == 200:
            return response.json()
        else:
            return [{"error": response.json()}]
        
    except Exception as e:
        return [{"error": str(e)}]


def create_app() -> Flask:
    app = Flask(__name__)

    @app.route("/")
    def index() -> str:
        return "GPT 3 service!"

    @app.route("/service_output", methods=["POST"])
    def inference() -> dict[str, str]:
        input: dict[str, Any] = cast(dict[str, Any], request.json)
        # print("input is", json.dumps(input, indent=2))
        if input.get("source") == 0:
            encoded: str = input["data"]
            bytearray = bytes.fromhex(encoded)
            prompt = bytearray.decode("utf-8")
        else:
            prompt = input["data"]["prompt"]
            
        response = query_chatgpt(prompt=prompt, api_key=api_key)
        if response[0].get("error"):
            return {"error": response[0]["error"]["error"]}
        return {"output": response[0]["generated_text"]}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=3000)
