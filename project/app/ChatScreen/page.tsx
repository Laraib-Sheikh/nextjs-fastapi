"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

interface Message {
  text: string;
  sender: "user" | "bot" | "space";
  liked?: boolean;
  disliked?: boolean;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "What would you like to know?",
      sender: "bot",
      liked: false,
      disliked: false,
    },
  ]);

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
            responseData.step_response.steps.forEach((step: any) => {
              const stepMessage = `Step ${step.step_number}: ${step.description}\nCalculation: ${step.calculation}`;
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: stepMessage,
                  sender: "bot",
                  liked: false,
                  disliked: false,
                },
              ]);
            });
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
    <div className="flex h-screen antialiased text-gray-400 justify-center items-center bg-black">
      <div className="flex flex-col h-full p-6 w-[70%] max-w-screen-md relative bg-black">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4 ">
          <div
            className="flex flex-col flex-auto h-full mb-4 overflow-y-auto justify-normal items-center"
            ref={messageContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mr-5 mt-3 flex items-${
                  msg.sender === "user" ? "end" : "start"
                }`}
                style={{ width: "100%", maxWidth: "70%" }}
              >
                {msg.sender === "bot" && (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div>
                      <img
                        loading="lazy"
                        alt="this is the chatbot icon"
                        src="./asserts/mathgenie.png"
                        className="w-[40cdpx] h-[40px] mr-2 rounded-full"
                      />
                    </div>
                    <div
                      className="bg-white rounded-lg p-3"
                      ref={responseDivRef}
                    >
                      <p>{msg.text}</p>
                      <div className="flex justify-end mt-2">
                        <button
                          className={`text-black mr-2 ${
                            msg.liked ? "text-gray-500" : ""
                          }`}
                          onClick={() => handleLikeClick(index)}
                        >
                          {msg.liked ? <AiFillLike /> : <AiOutlineLike />}
                        </button>
                        <button
                          className={`text-black ${
                            msg.disliked ? "text-gray-500" : ""
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
                    </div>
                  </div>
                )}
                {msg.sender === "user" && (
                  <div
                    className={`flex-grow ml-2 ${
                      msg.sender === "bot"
                        ? "bg-white rounded-lg px-4 py-2 mb-2 max-w-xs message-container"
                        : ""
                    }`}
                    ref={msg.sender === "bot" ? responseDivRef : null}
                    style={{ height: "auto" }}
                  >
                    <span
                      className={
                        msg.sender === "bot" ? "message-text" : "pl-11"
                      }
                    >
                      {msg.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center rounded-xl bg-transparent w-full px-4 py-2">
            <div className="relative w-full max-w-sm">
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
                className="w-full border rounded-xl focus
                    focus
                    pl-4 pr-10 h-auto bg-transparent border-r border-solid border-gray-400"
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
                alt="this is the send message button"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4afbfacca60be05bc7fabdaad63a97ae59653249d419bd638c52fcd44bb18d8d?apiKey=712222130b354692aa9375ac3c42bcf2&"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[19px] fill-zinc-50 cursor-pointer"
                onClick={handleMessageSend}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4 mb-12">
            <button className="flex items-center justify-center bg-[#B9B1F7] rounded-xl text-white px-4 py-1 flex-shrink-0">
              <span>Return to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
