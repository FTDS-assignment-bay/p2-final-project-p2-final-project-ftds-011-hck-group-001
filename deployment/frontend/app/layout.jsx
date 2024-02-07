import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: "/favico.ico",
  },
  title: "Customer Segmentation by RFM and Clustering Analysis",
  description:
    "Deployment of Customer Segmentation by RFM and Clustering Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
