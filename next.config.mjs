import 'dotenv/config';
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
};

export default withNextIntl(nextConfig);
