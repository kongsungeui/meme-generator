"use client";

import { useState } from "react";

const CAPTION_IMAGE_URL = "https://api.imgflip.com/caption_image";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface MemeEditorProps {
  meme: Meme;
  onBack: () => void;
  onMemeGenerated: (url: string) => void;
}

export default function MemeEditor({
  meme,
  onBack,
  onMemeGenerated,
}: MemeEditorProps) {
  const [texts, setTexts] = useState<string[]>(
    Array(meme.box_count).fill("")
  );
  const [generating, setGenerating] = useState(false);
  const [generatingSuggestions, setGeneratingSuggestions] = useState(false);

  const updateText = (index: number, value: string) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const handleFeelingLucky = async () => {
    try {
      setGeneratingSuggestions(true);

      const response = await fetch("/api/suggest-meme-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memeName: meme.name,
          textBoxCount: meme.box_count,
        }),
      });

      const data = await response.json();

      if (response.ok && data.suggestions) {
        setTexts(data.suggestions);
      } else {
        alert("텍스트 생성 실패: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
      alert("텍스트 생성 중 오류가 발생했습니다.");
    } finally {
      setGeneratingSuggestions(false);
    }
  };

  const handleGenerate = async () => {
    const username = process.env.NEXT_PUBLIC_IMGFLIP_USERNAME;
    const password = process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD;

    if (!username || !password) {
      console.error("Missing credentials:", {
        hasUsername: !!username,
        hasPassword: !!password,
        env: process.env.NEXT_PUBLIC_IMGFLIP_USERNAME
      });
      alert("ImgFlip 계정 정보가 설정되지 않았습니다.\n\nCloudflare Pages의 경우:\n1. Dashboard > Settings > Environment variables\n2. NEXT_PUBLIC_IMGFLIP_USERNAME 추가\n3. NEXT_PUBLIC_IMGFLIP_PASSWORD 추가\n4. 재배포 필요");
      return;
    }

    if (texts.every(text => !text)) {
      alert("최소 하나의 텍스트를 입력해주세요.");
      return;
    }

    try {
      setGenerating(true);

      const formData = new FormData();
      formData.append("template_id", meme.id);
      formData.append("username", username);
      formData.append("password", password);
      texts.forEach((text, index) => {
        formData.append(`boxes[${index}][text]`, text);
      });

      const response = await fetch(CAPTION_IMAGE_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onMemeGenerated(data.data.url);
      } else {
        alert("밈 생성 실패: " + data.error_message);
      }
    } catch (error) {
      console.error("Error generating meme:", error);
      alert("밈 생성 중 오류가 발생했습니다.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Customize Your Meme
        </h2>
        <div className="inline-block relative">
          <img
            src={meme.url}
            alt={meme.name}
            className="max-h-80 mx-auto rounded-2xl shadow-2xl border-4 border-white"
          />
          <div className="mt-4 px-6 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-full inline-block">
            <p className="text-sm font-semibold">{meme.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-center">
          <button
            onClick={handleFeelingLucky}
            disabled={generatingSuggestions}
            className="px-6 py-3 text-base font-bold text-white bg-linear-to-r from-yellow-500 via-orange-500 to-red-500 rounded-xl transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {generatingSuggestions ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  I&apos;m Feeling Lucky
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>

        {texts.map((text, index) => {
          const colors = [
            { bg: 'from-purple-50 to-pink-50', border: 'border-purple-100', badge: 'bg-purple-500', focus: 'focus:border-purple-500 focus:ring-purple-100' },
            { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100', badge: 'bg-blue-500', focus: 'focus:border-blue-500 focus:ring-blue-100' },
            { bg: 'from-green-50 to-emerald-50', border: 'border-green-100', badge: 'bg-green-500', focus: 'focus:border-green-500 focus:ring-green-100' },
            { bg: 'from-orange-50 to-amber-50', border: 'border-orange-100', badge: 'bg-orange-500', focus: 'focus:border-orange-500 focus:ring-orange-100' },
            { bg: 'from-red-50 to-rose-50', border: 'border-red-100', badge: 'bg-red-500', focus: 'focus:border-red-500 focus:ring-red-100' },
          ];
          const color = colors[index % colors.length];

          return (
            <div key={index} className={`bg-linear-to-br ${color.bg} rounded-2xl p-6 border-2 ${color.border}`}>
              <label
                htmlFor={`text${index}`}
                className="flex items-center gap-2 mb-3 text-gray-800 font-bold text-lg"
              >
                <span className={`${color.badge} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>
                  {index + 1}
                </span>
                Text {index + 1}
              </label>
              <input
                type="text"
                id={`text${index}`}
                value={text}
                onChange={(e) => updateText(index, e.target.value)}
                placeholder={`Enter text ${index + 1}...`}
                className={`w-full px-5 py-4 border-2 ${color.border} rounded-xl text-lg bg-white transition-all focus:outline-none ${color.focus} focus:ring-4`}
              />
            </div>
          );
        })}

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex-1 px-8 py-5 text-lg font-bold text-white bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {generating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Generate Meme"
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          <button
            onClick={onBack}
            className="px-8 py-5 text-lg font-bold text-gray-700 bg-gray-200 rounded-xl transition-all hover:bg-gray-300 hover:scale-105"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
