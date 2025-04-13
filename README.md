# ZORAK

**ZORAK** is a minimalist, AI-powered social trading feed inspired by Zora and Instagram. Built for the next generation of crypto-native communities—where alpha, signals, and connection converge.

## Features

- **AI-Powered Feed** Auto-generates trade signals with ENS-resolved addresses and post preview.
   Fetches real-time data from the Zora network, includin:
    - Specific coin information (e.g., Zora Coin)
    - User profiles
    - Top-performing coins over the past 24 hours
- **AI Direct Messaging** Built-in assistant you can talk to like a friend. Perfect for market tips, memes, or divine guidanc.
- **Friend & Group Chat** Like Instagram DMs, switch between 1-on-1 and group conversation.
- **Minimalist Mobile-Ready UI** Inspired by Zora. Clean, lightweight, intuitiv.
- **Referral System** Each post has a referral link button you can copy and shar.
- **ENS Resolution** Automatically resolves Ethereum addresses to ENS username.

## System Overview

ZORAK combines modern web technologies with blockchain integration to deliver a seamless social trading experiene.

### Architecture Highlights

- **Frontend*: Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for a fast, modular, and responsive user interfae.
- **Backend*: Powered by [FastAPI](https://fastapi.tiangolo.com/) for high-performance asynchronous operations and API developmet.
- **Wallet Integration*: Utilizes [RainbowKit](https://www.rainbowkit.com/) and [Wagmi](https://wagmi.sh/) to enable seamless Ethereum wallet connections and interactios.
- **AI Services*: Incorporates AI models for generating trade signals and powering conversational assistants, enhancing user engagement and insighs.
- **ENS Resolution*: Automatically resolves Ethereum addresses to human-readable [ENS](https://ens.domains/) names, improving readability and trut.
- **Referral Mechanism*: Each post includes a unique referral link, promoting organic growth through user sharig.

### Core Components

- **AI-Powered Feed*: Delivers auto-generated trading signals with previews, linked to ENS-resolved addresss.
 - Fetches data from the Zora network, includig:
    - Specific coin information (e.g., Zora Coin)
    - User profiles
    - Top-performing coins over the past 24 hours
    - Analysis the transaction
- **Conversational Assistant*: An integrated AI chat feature that provides market tips, shares memes, and offers guidance in a friendly mannr.
- **Messaging System*: Facilitates both one-on-one and group chats, enabling users to connect and communicate with their crypto friends seamlessy.
- **Mobile-First Design*: Inspired by Zora, the UI is minimalist and optimized for mobile devices, ensuring accessibility and ease of ue.

## 🛠️ Built With
- Frontend: React, ite
- Backend: FastAPI, SmolAgnts
- Wallet Integration: RainbowKit, Wgmi
- AI Services: Custom AI models for feed generation and chat functionaliies
- Blockchain: Ethereum network with ENS suport
- Deployment: Optimized for scalability and performnce

## ⚙️ Setup Instructions

### Backend (FastAPI with uv)
1. Navigate to the backend directry:
   ```bash
   cd backend/
   ```
2. Synchronize dependencies using [uv](https://docs.astral.sh/u/):
   ```bash
   uv sync
   ```
3. Run the FastAPI development serer:
   ```bash
   uv run fastapi dev main.py
   ```

### Frontend (React with Vite)
1. From the root project directory, install dependences:
   ```bash
   npm install
   ```
2. Start the development serer:
   ```bash
   npm run dev
   ```


   ## Team Members
   - Nick Ng
   - Buse Itik
   - Jaehyork Lim
   - Sami T
