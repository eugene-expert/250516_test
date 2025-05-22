# 📝 Nuxt 3 Note-Taking SPA

A fully responsive and scalable single-page application built with Nuxt 3, Tailwind CSS, and Pinia. Designed to match a Figma-based UI for a modern note-taking experience.

## 🚀 Features

- 📒 Create, edit, delete different types of notes:
  - Text Notes
  - Image Notes
  - Checkbox Notes
- 🎨 UI fully styled with Tailwind CSS and Figma tokens
- 🧩 Modular & scalable component structure
- 🗂 Notes stored in global Pinia store
- 💡 Floating labels for inputs (Inter font, primary color `#007AFF`)
- 🖼 Image upload + preview (optional)
- ✅ Dynamic form validation
- 🔽 Custom dropdowns (single & multi-select)
- 💾 Local file-based mock persistence (can be upgraded to API)

---

## 📁 Project Structure

.
├── components/
│ ├── Base/ # Base reusable components (Input, Select, Textarea, Dropdown)
│ ├── Note/ # NoteCard, NoteForm, NoteList
│ └── UI/ # Buttons, Layout, Modal, Header
├── composables/ # Custom composables (e.g., useNotes)
├── pages/
│ └── index.vue # Main SPA page with layout and note logic
├── store/
│ └── notes.ts # Pinia store for managing notes
├── types/
│ └── note.ts # Shared type definitions
├── utils/
│ └── validators.ts # Shared validation helpers
├── public/uploads/ # Image upload folder
└── tailwind.config.js # Tailwind theme configuration



---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/eugene-expert/250516_test.git
cd 250516_test



### 2. Install Dependencies

npm install

### 3. Start the Development Server

npm run dev

### 4. Build for Production

npm run build

### 5. 🎨 Design Tokens

Integrated from Figma:
Primary Color: #007AFF
Secondary: #F5F5F5
Font: Inter
Font Sizes: base: 16px, heading: 24px
Border Radius: button: 12px
Box Shadow: card: 0 4px 8px rgba(0,0,0,0.1)
You can find these in tailwind.config.js.

### 6. ✅ Validation Rules
Title: Required
Type: Required
Content: Required unless note type is image
Image URL: Required only when note type is image

### 7. 📦 Dependencies
Nuxt 3
Tailwind CSS
Pinia
@vueuse/core (optional composables like onClickOutside)

### 8. 🛠 Future Improvements
Backend API integration
User authentication
Drag-and-drop note reordering
Rich text editor for content

### 9. 🧑‍🎨 Author
Made by Yevhenii – Frontend Developer from Kyiv 🇺🇦


---

Let me know if you'd like this README customized further — for example, to include screenshots, deployment instructions (e.g. with Vercel or Netlify), or demo links.
