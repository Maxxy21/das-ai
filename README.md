# Start-Up Collaborative Whiteboard 



This is a collaborative whiteboard application built with Next.js 14, Convex,Clerk TailwindCSS,OpenaAI and ShadcnUI. It allows users to create, edit, and collaborate on whiteboards in real-time. The app also includes features such as real-time database, authentication, organizations, invites,
favoriting AI chat, and more.



Features:

- 🛠️ Whiteboard from scratch
- 🤖 AI powered chat interface
- 🧰 Toolbar with Text, Shapes, Sticky Notes & Pencil
- 🪄 Layering functionality
- 🎨 Coloring system
- ↩️ Undo & Redo functionality
- ⌨️ Keyboard shortcuts
- 🤝 Real-time collaboration
- 💾 Real-time database
- 🔐 Auth, organisations and invites
- ⭐️ Favoriting functionality
- 🌐 Next.js 14 framework
- 💅 TailwindCSS & ShadcnUI styling

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/Maxxy21/das-for-miro.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVEBLOCKS_SECRET_KEY=
PINECONE_SECRET_KEY=
```

### Setup Convex

```shell
npx convex dev

```

### Start the app

```shell
npm run dev
```
