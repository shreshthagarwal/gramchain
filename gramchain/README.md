# GramChain

GramChain is a Web3.0 platform that enables users to join community-based savings committees and invest in local startups through tokenized crowdfunding. The platform promotes financial empowerment through trust, transparency, and collective growth.

## Features

- Community-based savings committees
- Tokenized crowdfunding for local startups
- Web3.0 integration with MetaMask
- Role-based access (Investor/Entrepreneur)
- Document upload and verification
- Real-time investment tracking
- Secure authentication with Firebase

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Chakra UI for components
- Firebase for authentication and storage
- Web3.0 integration (ethers.js, web3-react)
- Tailwind CSS for styling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gramchain.git
cd gramchain
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
gramchain/
├── src/
│   ├── app/                    # Next.js 13+ app directory
│   ├── components/             # Reusable components
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utility functions and configurations
│   └── types/                 # TypeScript type definitions
├── public/                    # Static files
└── package.json              # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Firebase](https://firebase.google.com/)
- [ethers.js](https://docs.ethers.org/)
- [web3-react](https://github.com/NoahZinsmeister/web3-react) 