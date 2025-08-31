import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { AuthContext } from '../../context/authContext';
import userAPI from '../../helper/userAPI';
import { WebSocketContext } from '../../WebSocketContext';
import { ThemeContext } from '../../context/themeContext';

const ConversationPage = () => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState({});
  const [friend, setFriend] = useState({});
  const messageEndRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { friendId } = useParams();
  const { connectWebSocket, stompClient } = useContext(WebSocketContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';


  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (!stompClient.current) return;
    const subscription = stompClient.current.subscribe(
      `/user/${user.email}/queue/private`,
      (message) => {
        const payload = JSON.parse(message.body);
        setMessages(prev => [...prev, payload]); // ✅ new messages appear live
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, user.email]);

  useEffect(() => {
    const fetchFriendData = async () => {
      if (!user || !friendId) return;
      try {
        const res = await userAPI.post("/getFriendData", {
          addUserId: user.id,
          receiveUserId: friendId,
        });
        if (res.status === 200 && res.data.data) {
          const conversations = res.data.data;
          const allMessages = conversations.flatMap(conv =>
            conv.chatmessagelist.map(msg => ({
              ...msg,
              senderEmail: msg.senderId === conv.sender.id ? conv.sender.email : conv.receiver.email,
              receiverEmail: msg.senderId === conv.sender.id ? conv.receiver.email : conv.sender.email,
            }))
          );

          setMessages(allMessages);
          connectWebSocket(user.email, onConnected, onError, onPrivateMessage);
          if (conversations.length > 0) {
            const firstConv = conversations[0];
            const friendInfo = firstConv.sender.id === user.id
              ? firstConv.receiver
              : firstConv.sender;
            setFriend(friendInfo);
            setReceiver(friendInfo);
          }
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchFriendData();
  }, [user, friendId]);

  const onError = (err) => console.error("WebSocket error:", err);
  const onConnected = (client) => {
    // console.log("WebSocket connected");
    // setUserData(prev => ({ ...prev, connected: true }));
    client.send(
      "/app/message",
      {},
      JSON.stringify({ senderName: user.email, status: "JOIN" })
    );
  };

  const onPrivateMessage = (payloadData) => {
    const normalizedMessage = {
      ...payloadData,
      textContent: payloadData.textContent || payloadData.message,
    };
    if (
      normalizedMessage.senderEmail === user.email ||
      normalizedMessage.receiverEmail === user.email
    ) {
      setMessages((prev) => [...prev, normalizedMessage]);
    }
  };
  const sendPrivateValue = () => {
    if (stompClient.current?.connected && newMessage.trim() !== "") {
      const chatMessage = {
        senderEmail: user.email,
        receiverEmail: receiver.email,
        textContent: newMessage,
        datetime: new Date().toISOString().slice(0, 19),
      };
      stompClient.current.send(
        "/app/private-message",
        {},
        JSON.stringify(chatMessage)
      );
      // setMessages(prev => [...prev, chatMessage]);

      setNewMessage("");
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await userAPI.post(`/messages/${messageId}`); // backend endpoint
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const getPostImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `http://localhost:8080/${url.replace(/^\/+/, "")}`;
  };
  return (
    <div className={`flex flex-col h-screen bg-gray-50 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`flex items-center justify-start px-4 sm:px-6 h-16 shadow-md border-b 
    ${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-300'} backdrop-blur-md`}>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className={`text-2xl font-bold mr-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
        >
          ←
        </button>

        {/* Friend profile image */}
        <img
          src={`http://localhost:8080/uploads/${friend.profile_URl}`}
          alt={friend.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 mr-3"
        />

        {/* Friend name */}
        <h1 className={`text-lg font-semibold truncate ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {friend.name}
        </h1>
      </div>


      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* {messages.map((msg, index) => {
          const messageText = msg.textContent || "";
          const messagePost = msg.sendReceipe || null;
          console.log("Check MessagePost", msg.sendReceipe);

          return (
            <div
              key={index}
              className={`flex ${msg.senderEmail === user.email ? "justify-end" : "justify-start"}`}
            >

              {messageText && (
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl break-words ${msg.senderEmail === user.email
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                    }`}
                >
                  {messageText}
                </div>
              )}
              {messagePost && (

                <article
                  key={messagePost.id}
                  className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer
              ${isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    } transition max-w-[75%]`}
                >
                  <Link
                    to={`/user/ordi/detail/${messagePost.id}`}
                    className="overflow-hidden rounded-3xl block"
                  >
                    <img
                      src={getPostImageURL(messagePost.imageUrls[0])}
                      alt={messagePost.title}
                      className="rounded-3xl w-full object-cover max-h-[200px] transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="p-3">
                    <h3 className="font-semibold text-md">{messagePost.title}</h3>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {messagePost.description}
                    </p>
                  </div>
                </article>
              )}
            </div>
          );
        })} */}
        {messages.map((msg, index) => {
          const messageText = msg.textContent || "";
          const messagePost = msg.sendReceipe || null;
          const isSender = msg.senderEmail === user.email;

          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              {/* Group is on the bubble itself */}
              <div className="relative max-w-[75%] group">
                {isSender && (
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="absolute -top-2 -right-2 p-1 rounded-full 
                       bg-white dark:bg-gray-700 shadow 
                       opacity-0 group-hover:opacity-100 
                       text-gray-500 hover:text-red-600 transition"
                  >
                    🗑
                  </button>
                )}

                {/* ✅ Text Message */}
                {messageText && (
                  <div
                    className={`px-4 py-2 rounded-2xl break-words ${isSender
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                      }`}
                  >
                    {messageText}
                  </div>
                )}

                {/* ✅ Recipe Message */}
                {messagePost && (
                  <article
                    key={messagePost.id}
                    className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer
              ${isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      } transition`}
                  >
                    <Link
                      to={`/user/ordi/detail/${messagePost.id}`}
                      className="overflow-hidden rounded-3xl block"
                    >
                      <img
                        src={getPostImageURL(messagePost.imageUrls[0])}
                        alt={messagePost.title}
                        className="rounded-3xl w-full object-cover max-h-[200px] transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                    <div className="p-3">
                      <h3 className="font-semibold text-md">{messagePost.title}</h3>
                      <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                        {messagePost.description}
                      </p>
                    </div>
                  </article>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>


      <div className="flex items-center px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && sendPrivateValue()}
        />
        <button
          onClick={sendPrivateValue}
          className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
        >
          Send
        </button>
      </div>
    </div >
  );
};
export default ConversationPage;

// -----------------------------------------------------------------------------------------------
