import 'dotenv/config';

const nextConfig = {
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
};

export default nextConfig;
