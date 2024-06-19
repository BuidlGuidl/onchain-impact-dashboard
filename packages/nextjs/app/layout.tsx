import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthProviders } from "~~/components/ScaffoldEthProviders";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Onchain Impact Dashboard",
    template: "%s | Onchain Impact Dashboard",
  },
  description: "Onchain Impact Dashboard | Powered by BuidlGuidl",
  openGraph: {
    title: {
      default: "Onchain Impact Dashboard App",
      template: "%s | Onchain Impact Dashboard",
    },
    description: "Onchain Impact Dashboard | Powered by BuidlGuidl",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "Onchain Impact Dashboard",
      template: "%s | Onchain Impact Dashboard",
    },
    description: "Onchain Impact Dashboard | Powered by BuidlGuidl",
  },
  icons: {
    icon: [{ url: "/favicon.svg", sizes: "32x32", type: "image/svg" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <ScaffoldEthProviders>{children}</ScaffoldEthProviders>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
