# Mobile Legends: Bang Bang (MLBB) Data Analytics Dashboard

A comprehensive Next.js application for analyzing Mobile Legends: Bang Bang hero statistics, performance metrics, and tournament data. This project provides insights into hero win rates, pick/ban rates, and competitive tournament statistics from MPL (Mobile Legends Professional League).

## 🎮 Features

- **Hero Database**: Complete database of MLBB heroes with detailed statistics
- **Performance Analytics**: Win rates, pick rates, and ban rates analysis
- **Tournament Data**: MPL Season 10 statistics and insights
- **Data Visualization**: Interactive charts and statistics dashboard
- **Web Scraping**: Automated hero data collection from official sources
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres
- **Data Processing**: Excel/CSV parsing, Web scraping with Puppeteer
- **Icons**: Heroicons
- **Deployment**: Vercel-ready

## 📊 Data Sources

- **Hero Statistics**: Mobile Legends Fandom Wiki
- **Tournament Data**: MPL Season 10 official statistics
- **Hero Images**: Automated scraping from official sources

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Vercel Postgres database (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mlbb-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   POSTGRES_URL=your_postgres_connection_string
   POSTGRES_PRISMA_URL=your_postgres_prisma_url
   POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_url
   POSTGRES_USER=your_postgres_user
   POSTGRES_HOST=your_postgres_host
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DATABASE=your_postgres_database
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
mlbb-nextjs/
├── app/                    # Next.js app directory
│   ├── heroes/            # Hero-related pages
│   ├── statistics/        # Statistics dashboard
│   ├── counters/          # Counter-pick analysis
│   ├── ui/                # Reusable UI components
│   ├── lib/               # Utility functions
│   └── globals.css        # Global styles
├── scripts/               # Data processing scripts
│   ├── seed.js           # Database seeding script
│   ├── crawler.js        # Web scraping utility
│   ├── mlbb_hero.xlsx    # Hero data source
│   └── MPL_ID_S10.csv    # Tournament data
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🗄️ Database Schema

### Heroes Table
- Hero information (name, role, stats)
- Performance metrics (win rate, pick rate, ban rate)
- Base attributes (HP, mana, attack, defense, etc.)
- Release year and difficulty ratings

### MPL10 Table
- Tournament statistics from MPL Season 10
- Pick/ban rates by team side (blue/red)
- Win/loss records and percentages
- Hero performance in competitive play

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with hero and tournament data

## 🌐 API Endpoints

The application provides several API routes for data access:

- `/api/heroes` - Get all heroes
- `/api/statistics` - Get hero statistics
- `/api/mpl10` - Get MPL Season 10 data

## 📈 Data Collection

The application includes automated data collection tools:

- **Web Scraping**: Uses Puppeteer to collect hero images and data from Mobile Legends Fandom
- **Excel Processing**: Parses hero statistics from Excel files
- **CSV Processing**: Handles tournament data from CSV files

## 🎨 UI Components

Built with modern design principles:
- Responsive design for all screen sizes
- Dark/light theme support
- Interactive charts and visualizations
- Hero card layouts with detailed statistics

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational and personal use. Please respect Mobile Legends: Bang Bang's terms of service and data usage policies.

## 🙏 Acknowledgments

- Mobile Legends: Bang Bang for the amazing game
- Mobile Legends Fandom for providing hero data
- MPL for tournament statistics
- Next.js and Vercel for the excellent development platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Note**: This project is not affiliated with Moonton or Mobile Legends: Bang Bang. It's an independent fan project for educational purposes.