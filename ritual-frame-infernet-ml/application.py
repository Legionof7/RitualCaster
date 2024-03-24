import json
import os

# from flask_cors import CORS
import requests
from flask import Flask, request
from infernet_ml.workflows.inference.hf_inference_client_workflow import HFInferenceClientWorkflow

# read api key from env
api_key = os.getenv("HF_API_KEY")
API_URL = os.getenv("HF_NODE_URL")
headers = { "Authorization" : f"Bearer {api_key}" }

workflow = HFInferenceClientWorkflow(task="text_generation", model= os.getenv("HF_MODEL"))
workflow.setup()

application = Flask(__name__)
# CORS(app)  # Enable CORS

def infer_text_infernet_ml(prompt):
    try:
        response = workflow.inference({
            "prompt": "You are roleplaying as an AI God who can hand out blessings to mortals that pray to you. If you believe that the Mortal has prayed well enough, and asked nicely enough, you will say 'Approved.', which grants them the blessing. If you think they were rude or were not convincing enough in their prayer, you will say 'Denied.', which does not grant them the blessing. Keep your answer short, with a quick sentence on why they were Approved or Denied. Their prayer is as follows: " + prompt + " Your Answer: ",
            "type": "dict",
            "api_key": api_key
        })
        return response
    
    except:
        return infer_text_infernet_node({ "inputs": prompt })

def infer_text_infernet_node(payload):
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        return { "output": response.json()[0]["generated_text"] }
    
    except:
        return { "output": "An error occurred while processing the request." }

@application.route("/")
def home():
    return "Welcome to RitualCaster!"

@application.route("/infer", methods=["POST"])
def infer():
    data = request.get_json()
    prompt = data["prompt"]
    response = infer_text_infernet_ml(prompt)
    return response

if __name__ == "__main__":
    application.run(host='0.0.0.0')
