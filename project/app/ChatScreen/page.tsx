"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import "./style.css";

interface Message {
  text: string;
  sender: "user" | "bot" | "space";
  liked?: boolean;
  disliked?: boolean;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const responseDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      const container = messageContainerRef.current as HTMLDivElement;
      container.scrollTop = container.scrollHeight;
    }

    if (textAreaRef.current) {
      const textArea = textAreaRef.current as HTMLTextAreaElement;
      const lineHeight = parseInt(window.getComputedStyle(textArea).lineHeight);
      const lines = Math.floor(textArea.scrollHeight / lineHeight);
      if (lines > 3) {
        textArea.style.overflowY = "scroll";
      } else {
        textArea.style.overflowY = "hidden";
      }
    }

    if (textAreaRef.current && responseDivRef.current) {
      const textArea = textAreaRef.current as HTMLTextAreaElement;
      const responseDiv = responseDivRef.current as HTMLDivElement;
      responseDiv.style.width = `${textArea.clientWidth}px`;
    }
  }, [messages, message]);

  const handleMessageSend = async () => {
    if (message.trim() !== "") {
      const userMessage = message;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" },
        { text: "", sender: "space" },
      ]);

      try {
        const baseUrl =
          "https://flask-hello-world-ahmada14s-projects.vercel.app/solver";
        const data = { input: userMessage };

        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        console.log(responseData); // Logging the full response for debugging

        if (
          response.status === 200 &&
          responseData &&
          responseData.response &&
          responseData.response.output
        ) {
          const botResponse = responseData.response.output;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, sender: "bot", liked: false, disliked: false },
          ]);

          if (responseData.step_response && responseData.step_response.steps) {
            const stepsText = responseData.step_response.steps.map(
              (step: any) => (
                <div key={step.step_number}>
                  <p>{`Step ${step.step_number}: ${step.description}`}</p>
                  <p>{`Calculation: ${step.calculation}`}</p>
                </div>
              )
            );

            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: stepsText,
                sender: "bot",
                liked: false,
                disliked: false,
              },
            ]);
          }
        } else {
          throw new Error(
            `Unexpected response format or status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, something went wrong.",
            sender: "bot",
            liked: false,
            disliked: false,
          },
        ]);
      }

      setMessage("");
    }
  };

  const handleLikeClick = (index: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, liked: !msg.liked, disliked: false } : msg
      )
    );
  };

  const handleDislikeClick = (index: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, disliked: !msg.disliked, liked: false } : msg
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSend();
    } else if (e.key === "Enter" && e.shiftKey) {
      setMessage(message);
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-200 justify-center items-center bg-gray-900">
      <div className="flex flex-col h-full p-6 w-[70%] max-w-screen-md relative bg-gray-900 shadow-lg rounded-xl">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4">
          <div
            className="flex flex-col flex-auto h-full mb-4 overflow-y-auto message-container"
            ref={messageContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full mt-3 ${
                  msg.sender === "user" ? "justify-start" : "justify-start"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`${
                      msg.sender === "user" ? "" : "bg-gray-700"
                    } text-white rounded-lg p-3 shadow-md`}
                  >
                    <p>{msg.text}</p>
                    {msg.sender === "bot" && (
                      <div className="flex justify-end mt-2">
                        <button
                          className={`mr-2 ${
                            msg.liked ? "text-blue-400" : "text-gray-400"
                          }`}
                          onClick={() => handleLikeClick(index)}
                        >
                          {msg.liked ? <AiFillLike /> : <AiOutlineLike />}
                        </button>
                        <button
                          className={`${
                            msg.disliked ? "text-red-400" : "text-gray-400"
                          }`}
                          onClick={() => handleDislikeClick(index)}
                        >
                          {msg.disliked ? (
                            <AiFillDislike />
                          ) : (
                            <AiOutlineDislike />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center rounded-xl bg-gray-800 w-full px-4 py-2">
            <div className="relative w-[100%] max-w-md">
              {" "}
              {/* Changed max-w-sm to max-w-md */}
              <textarea
                placeholder="Type your message..."
                style={{
                  color: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  resize: "none",
                  overflowY: "hidden",
                  maxHeight: "130px",
                }}
                className="w-full border rounded-xl focus:outline-none bg-gray-700"
                rows={1}
                ref={textAreaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
              <img
                loading="lazy"
                alt="send message button"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4afbfacca60be05bc7fabdaad63a97ae59653249d419bd638c52fcd44bb18d8d?apiKey=712222130b354692aa9375ac3c42bcf2&"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[19px] cursor-pointer"
                onClick={handleMessageSend}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button className="flex items-center justify-center bg-purple-600 rounded-xl text-white px-4 py-2 shadow-md">
              <span>Test Me</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
