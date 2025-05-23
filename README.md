# 📝 Nuxt 3 Note-Taking SPA

A scalable single-page application (SPA) built with **Nuxt 3**, **TypeScript**, **Pinia**, and **Tailwind CSS**. It supports various note types: text, image, and checkbox list. Based on a Figma design system.

---

## ✨ Features

- ✅ Add, edit, delete notes
- 🖼️ Image and checkbox-type notes
- 🧩 Modular architecture with Base components
- 🎨 Floating labels on inputs (Figma spec)
- 💠 Tailwind CSS with custom theme
- 🧠 Type-safe with TypeScript
- 📱 Fully responsive layout

---

## 📁 Folder Structure

```text
.
├── components/
│   ├── Base/                 # Reusable atomic UI elements (inputs, buttons)
│   │   ├── BaseButton.vue
│   │   ├── BaseDropdown.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseSelect.vue
│   │   └── BaseTextarea.vue
│   ├── Note/
│   │   ├── NoteCard.vue
│   │   └── NoteForm.vue
│   └── UI/
│       ├── AppHeader.vue
│       ├── AppLayout.vue
│       └── BaseModal.vue
├── composables/
│   └── useNotes.ts
├── pages/
│   └── index.vue
├── public/
│   └── uploads/              # User uploaded image assets
├── store/
│   └── notes.ts              # Pinia store
├── types/
│   └── note.ts               # Global types
├── utils/
│   └── validators.ts         # Input validation utilities
├── app.vue                   # Nuxt 3 root component
├── nuxt.config.ts            # Nuxt configuration
└── tailwind.config.js        # Tailwind customization
```

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/eugene-expert/250516_test.git
cd 250516_test
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

Open the app at `http://localhost:3000`

---

## 🛠️ Build for Production

```bash
npm run build
npm run preview
```

---

## 🧱 Customize the Theme

Tailwind configuration is in `tailwind.config.js`.

```js
theme: {
  extend: {
    colors: {
      primary: '#007AFF',
      secondary: '#F5F5F5',
      text: '#333333',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    borderRadius: {
      button: '12px',
    },
    boxShadow: {
      card: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
  },
}
```

---

## 🌐 Deployment

To deploy on platforms like **Vercel**, **Netlify**, or **Cloudflare Pages**:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `.output/public` directory (or as per hosting docs)

---

## 🧪 Testing (Optional)

You can add unit tests with [Vitest](https://vitest.dev/):

```bash
npm install -D vitest
```

Then create test files like `NoteCard.spec.ts` in the `/tests` folder.

---

## 👥 Contributing

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push and open PR

---

## 📃 License

This project is for test/demo use only. No license is provided.

---

## 📌 Reference

- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Figma](https://www.figma.com/)

---

## 👨‍💻 Author

Built by **Yevhenii** – Frontend Developer (Kyiv, Ukraine)