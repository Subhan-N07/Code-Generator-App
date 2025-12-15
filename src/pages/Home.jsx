import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import Editor from "@monaco-editor/react";
import { BsStars } from "react-icons/bs";
import { IoCopy, IoCloseSharp } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const OPTIONS = [
  { value: "html-css", label: "HTML + CSS" },
  { value: "html-tailwind", label: "HTML + Tailwind CSS" },
  { value: "html-bootstrap", label: "HTML + Bootstrap" },
  { value: "html-css-js", label: "HTML + CSS + JS" },
];

const Home = () => {
  const [framework, setFramework] = useState(OPTIONS[0]);
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("code");
  const [showResult, setShowResult] = useState(false);
  const [fullPreview, setFullPreview] = useState(false);

  // ❗ Hard-coded API key (not recommended for production)
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCjt4BcQlluwT4FeegZ8MzvJN8RLYbeUa0",
  });

  const cleanMarkdown = (text) =>
    text.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "");

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your component");
      return;
    }

    try {
      setLoading(true);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an expert UI developer.

Generate a modern, animated, fully responsive UI component.

Framework: ${framework.value}
Component description: ${prompt}

Rules:
- Return ONLY code
- Wrap code in markdown fenced blocks
- Provide a SINGLE HTML file
        `,
      });

      setCode(cleanMarkdown(response.text));
      setShowResult(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied");
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GenUI.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl p-6 space-y-5">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BsStars /> AI Component Generator
          </h2>

          <Select
            value={framework}
            options={OPTIONS}
            onChange={setFramework}
            className="text-red-600 "
            classNamePrefix="react-select"
          />

          <textarea
            className="w-full min-h-[200px] bg-black text-white p-4 rounded-md border border-gray-700"
            placeholder="Describe your UI component..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={generateCode}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-lg w-full font-medium cursor-pointer"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Generate"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 ">
          <div className="flex justify-between items-center p-3 border-b border-gray-700 ">
            <div className="flex gap-3 ">
              <button
                onClick={() => setTab("code")}
                className={`text-sm ${
                  tab === "code" ? "text-indigo-400" : "text-gray-400"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setTab("preview")}
                className={`text-sm ${
                  tab === "preview" ? "text-indigo-400" : "text-gray-400"
                }`}
              >
                Preview
              </button>
            </div>

            {showResult && (
              <div className="flex gap-3 text-gray-300">
                <button onClick={copyCode}>
                  <IoCopy />
                </button>
                <button onClick={downloadFile}>
                  <PiExportBold />
                </button>
                <button onClick={() => setFullPreview(true)}>
                  <ImNewTab />
                </button>
              </div>
            )}
          </div>

          {!showResult ? (
            <div className="p-6 text-gray-500 text-center">
              Generated code will appear here.
            </div>
          ) : tab === "code" ? (
            <Editor
              height="60vh"
              language="html"
              theme="vs-dark"
              value={code}
            />
          ) : (
            <iframe srcDoc={code} className="w-full h-[60vh] bg-white" />
          )}
        </div>
      </div>

      {/* FULL SCREEN PREVIEW */}
      {fullPreview && (
        <div className="fixed inset-0 bg-black z-50">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setFullPreview(false)}
          >
            <IoCloseSharp size={24} />
          </button>
          <iframe srcDoc={code} className="w-full h-full bg-white" />
        </div>
      )}
    </>
  );
};

export default Home;
