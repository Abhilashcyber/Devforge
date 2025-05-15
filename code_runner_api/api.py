from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sys
import io
import contextlib

app = FastAPI()


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Literal
import subprocess
import tempfile
import os

app = FastAPI()

class CodeExecutionRequest(BaseModel):
    input: str
    code: str
    language: Literal["python", "cpp", "javascript"]  # Restrict values


@app.post("/execute/")
def execute_code(request: CodeExecutionRequest):
    lang = request.language.lower()
    code = request.code
    user_input = request.input

    with tempfile.TemporaryDirectory() as tmpdir:
        if lang == "python":
            file_path = os.path.join(tmpdir, "main.py")
            with open(file_path, "w") as f:
                f.write(code)
            cmd = ["python3", file_path]

        elif lang == "cpp":
            source_path = os.path.join(tmpdir, "main.cpp")
            binary_path = os.path.join(tmpdir, "main.out")
            with open(source_path, "w") as f:
                f.write(code)
            compile_proc = subprocess.run(["g++", source_path, "-o", binary_path], capture_output=True, text=True)
            if compile_proc.returncode != 0:
                return {"error": "Compilation failed", "details": compile_proc.stderr}
            cmd = [binary_path]

        elif lang == "javascript":
            file_path = os.path.join(tmpdir, "main.js")
            with open(file_path, "w") as f:
                f.write(code)
            cmd = ["node", file_path]

        else:
            raise HTTPException(status_code=400, detail="Unsupported language")

        try:
            result = subprocess.run(
                cmd,
                input=user_input,
                text=True,
                capture_output=True,
                timeout=5
            )
            return {
                "stdout": result.stdout,
                "stderr": result.stderr,
                "exit_code": result.returncode
            }

        except subprocess.TimeoutExpired:
            return {"error": "Execution timed out"}
        except Exception as e:
            return {"error": str(e)}
