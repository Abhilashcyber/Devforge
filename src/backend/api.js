import axios from "axios";

export const runCode = async (code, language, input = "") => {
  try {
    const response = await axios.post("http://localhost:8000/execute/", {
      code,
      language,
      input,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data?.detail || "Server error" };
    }
    return { error: error.message || "Unknown error" };
  }
};
