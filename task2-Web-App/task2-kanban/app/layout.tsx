import Providers from "./Providers";
import type { Metadata } from "next";
import './styles/global.scss';

// Define page metadata (title and description) for SEO and browser tabs
export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Task 2 - Redux + Next.js Kanban Board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
