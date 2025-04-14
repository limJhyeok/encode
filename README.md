# ZORAK

**ZORAK** is a minimalist, AI-powered social trading feed inspired by Zora and Instagram. It is built for the next generation of crypto-native communities, where alpha, signals, and connection converge.

## System Overview

ZORAK combines modern web technologies with blockchain integration to deliver a seamless social trading experience.

### Core Components

- **AI Agent-Powered Feed**: Delivers auto-generated trading signals with previews, linked to ENS-resolved addresses.
 - Fetches data from the Zora network, including:
    - Specific coin information (e.g., Zora Coin)
    - User profiles
    - Top-performing coins over the past 24 hours
    - Analysis of the transaction
- **Conversational Assistant**: An integrated AI chat feature that provides market tips, shares memes, and offers guidance in a friendly manner.
- **Messaging System**: Facilitates both one-on-one and group chats, enabling users to connect and communicate with their crypto friends seamlessly.
- **Mobile-First Design**: Inspired by Zora, the UI is minimalist and optimized for mobile devices, ensuring accessibility and ease of use.
   
### 🛠️ Built With
- Frontend: React, Vite
- Backend: FastAPI, SmolAgnts
- Wallet Integration: RainbowKit, Wgmi
- AI Services: Custom AI models for feed generation and chat function
- Blockchain: Ethereum network with ENS support

### Architecture Highlights

- **Frontend**: Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for a fast, modular, and responsive user interface.
- **Backend**: Powered by [FastAPI](https://fastapi.tiangolo.com/) for high-performance asynchronous operations and API developmet.
- **Wallet Integration**: Utilizes [RainbowKit](https://www.rainbowkit.com/) and [Wagmi](https://wagmi.sh/) to enable seamless Ethereum wallet connections and interactios.
- **AI Services**: Incorporates AI models for generating trade signals and powering conversational assistants. Includes an agent system that analyzes real-time Zora coin data and provides feedback through SmolAgents, enhancing user engagement and decision-making.
- **ENS Resolution**: Automatically resolves Ethereum addresses to human-readable [ENS](https://ens.domains/) names, improving readability and trut.
- **Referral Mechanism**: Each post includes a unique referral link, promoting organic growth through user sharing.

## Features

- **AI-Powered Feed** Auto-generates trade signals with ENS-resolved addresses and post preview.
   Fetches real-time data from the Zora network, including:
    - Specific coin information (e.g., Zora Coin)
    - User profiles
    - Top-performing coins over the past 24 hours
- **AI Direct Messaging** Built-in AI agent assistant you can talk to like a friend. Perfect for market tips, memes, or divine guidance.
- **Friend & Group Chat** Like Instagram DMs, switch between 1-on-1 and group conversation.
- **Minimalist Mobile-Ready UI** Inspired by Zora. Clean, lightweight, and intuitive.
- **Referral System** Each post has a referral link button you can copy and share.
- **ENS Resolution** Automatically resolves Ethereum addresses to ENS username.


## ⚙️ Setup Instructions

### Backend (FastAPI with uv)
1. Navigate to the backend directory:
   ```bash
   cd backend/
   ```
2. Synchronize dependencies using [uv](https://docs.astral.sh/u/):
   ```bash
   uv sync
   ```
3. Run the FastAPI development server:
   ```bash
   uv run fastapi dev main.py
   ```

### Frontend (React with Vite)
1. From the root project directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```


## Team Members
- [Nick Ng](https://www.linkedin.com/in/nickncn/)
- [Buse Itik](https://www.linkedin.com/in/buseitik/)
- [Jaehyork Lim](https://www.linkedin.com/in/jaehyork)
- [Sami T](https://www.linkedin.com/in/samitahir1/)
