# DeepFuzzerJS

<img width="480" height="480" alt="image" src="https://github.com/user-attachments/assets/5c16268a-0e83-424f-9993-6769e6d4b273" />


**Author:** Critfinds  
**License:** MIT  

DeepFuzzerJS is an advanced JavaScript fuzzer designed to test the robustness of:

- **WebSocket connections** (`ws://` / `wss://`)  
- **HTTP/HTTPS endpoints** (`http://` / `https://`)  
- **Browser-based interactions**  

It provides flexible modules for fuzzing both WebSocket messages and standard HTTP/HTTPS requests with optional configuration, seeding, and wordlist support.

---

## Features

- Fuzz **WebSocket connections** with custom messages and payloads  
- Fuzz **HTTP/HTTPS endpoints** with GET/POST requests  
- Support for **browser environment fuzzing**  
- Wordlist support for payload testing  
- Configurable seed for reproducible fuzzing  
- CLI interface with clear output

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/critfinds/DeepFuzzerJS.git
cd DeepFuzzerJS
npm install
(Optional) To include SecLists for payload testing:


git clone https://github.com/danielmiessler/SecLists.git wordlists
Usage
WebSocket Fuzzing

# Basic WebSocket fuzzing
node fuzz.js --target ws://example.com --output results_ws.txt

# WebSocket fuzzing with wordlist
node fuzz.js --target ws://example.com --wordlist wordlists/fuzz.txt --output results_ws.txt

# WebSocket fuzzing with seed for reproducibility
node fuzz.js --target ws://example.com --seed 12345 --output results_ws.txt
HTTP/HTTPS Fuzzing

# Basic HTTP/HTTPS fuzzing
node fuzz.js --target https://example.com/api --output results_http.txt

# HTTP/HTTPS fuzzing with wordlist
node fuzz.js --target https://example.com/api --wordlist wordlists/fuzz.txt --output results_http.txt

# HTTP/HTTPS fuzzing with seed for reproducibility
node fuzz.js --target https://example.com/api --seed 12345 --output results_http.txt
Browser Environment Fuzzing

# Enable browser fuzzing
node fuzz.js --target https://example.com --browser --output browser_results.txt
Options
Flag	Description
-u, --target <url>	Target WebSocket or HTTP/HTTPS URL
-o, --output <file>	File to save results
-c, --config <path>	Path to custom configuration JSON
-s, --seed <number>	Seed for reproducible fuzzing
-b, --browser	Enable browser environment fuzzing
-w, --wordlist <path>	Path to wordlist for payload testing

Modules

fuzz.js – Main entry point and CLI interface

wsFuzzer.js – Handles WebSocket fuzzing connections and messages

httpFuzzer.js – Handles HTTP/HTTPS fuzzing requests

browserFuzzer.js – Injects fuzzing payloads in a browser environment

fuzzerWithConfigAndSeed.js – Runs fuzzing using a config file and seed

Contributing
Contributions are welcome!
Open an issue or submit a pull request for enhancements, bug fixes, or additional modules.

License
This project is licensed under the MIT License. See the LICENSE file for details.
