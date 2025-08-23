import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const mockFriends = [
  { id: 1, name: 'Emily Jones', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 2, name: 'Lucas Ramirez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Sophia Williams', avatar: 'https://randomuser.me/api/portraits/women/54.jpg' },
  { id: 4, name: 'Arjun Patel', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
];

const ConversationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const friend = mockFriends.find(f => f.id === Number(id));

  const [messages, setMessages] = useState([
    { id: 1, sender: 'friend', text: 'Hey! How are you?' },
    { id: 2, sender: 'me', text: 'I am good! How about you?' },
    { id: 3, sender: 'friend', text: 'Doing well, thanks!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: newMessage }]);
    setNewMessage('');
  };

  if (!friend) return <div className="text-center mt-20 text-gray-900 dark:text-white">Friend not found.</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with modern back button */}
      <div className="flex items-center px-4 py-3 shadow-md border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <img
          src={friend.avatar}
          alt={friend.name}
          className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300 dark:border-gray-600"
        />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{friend.name}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl break-words ${
                msg.sender === 'me'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationPage;
