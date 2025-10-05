# 🌞 Stellar Stories: Sunny's Space Adventure

An interactive educational web application that teaches children about space weather through engaging storytelling combined with real NASA data.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NASA API](https://img.shields.io/badge/NASA_API-0B3D91?style=for-the-badge&logo=nasa&logoColor=white)

## ✨ Features

- 📖 **Interactive Storytelling**: Follow Sunny the Solar Flare on an educational adventure
- 🛰️ **Real NASA Data**: Live space weather data from NASA DONKI and APOD APIs
- 🎙️ **Text-to-Speech**: Built-in narration for accessibility and engagement
- 🧠 **Educational Quizzes**: Interactive questions to reinforce learning
- 🌌 **Beautiful Animations**: Smooth transitions and engaging visual effects
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ♿ **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- NASA API Key (free from [api.nasa.gov](https://api.nasa.gov))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stellar-stories
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NASA_API_KEY=your_nasa_api_key_here
   NEXT_PUBLIC_APP_NAME="Stellar Stories"
   NEXT_PUBLIC_APP_DESCRIPTION="Interactive space weather stories with real NASA data"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛰️ NASA APIs Used

### DONKI (Space Weather Database)
- **Purpose**: Real-time Coronal Mass Ejection (CME) data
- **Endpoint**: `https://api.nasa.gov/DONKI/CME`
- **Features**: Live space weather events, severity classification, impact forecasts

### APOD (Astronomy Picture of the Day)
- **Purpose**: Daily space images and educational content
- **Endpoint**: `https://api.nasa.gov/planetary/apod`
- **Features**: High-quality space photography with explanations

## 🎯 Educational Goals

### Primary Learning Objectives
- Understanding space weather phenomena
- Learning about solar flares and CMEs
- Discovering how space weather affects Earth
- Appreciating the beauty of auroras
- Understanding the role of scientists in monitoring space weather

### Age Group
- **Primary**: Ages 8-14
- **Secondary**: Anyone interested in space science!

## 🏗️ Project Structure

```
stellar-stories/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── src/
│   ├── components/        # React components
│   │   ├── modals/        # Modal components
│   │   └── pages/         # Page components
│   └── hooks/             # Custom React hooks
├── public/                # Static assets
└── ...config files
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FFD166` (Solar Yellow)
- **Secondary**: `#06D6A0` (Aurora Green)
- **Accent**: `#118AB2` (Space Blue)
- **Background**: Gradient from `#0B132B` to `#2A1B3D`

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 400, 600, 700, 800, 900

### Animations
- Framer Motion for smooth page transitions
- CSS animations for space-themed effects
- Interactive hover states and micro-interactions

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NASA_API_KEY` | Your NASA API key | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_DESCRIPTION` | App description | No |

### NASA API Setup
1. Visit [api.nasa.gov](https://api.nasa.gov)
2. Sign up for a free account
3. Generate your API key
4. Add it to your `.env.local` file

> **Note**: You can use `DEMO_KEY` for testing, but it has strict rate limits.

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer: Not supported

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** for providing excellent open APIs
- **OpenAI** for educational content inspiration
- **Framer Motion** for beautiful animations
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first styling approach

## 📧 Support

If you have questions or need help:
- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/stellar-stories/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/stellar-stories/discussions)

---

Made with ❤️ for space education and inspired by NASA's mission to explore and understand our universe.

🌟 **Star this repository** if you found it helpful!