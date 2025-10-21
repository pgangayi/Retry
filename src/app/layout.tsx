import Navigation from "./components/Navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Retry Farm ERP</title>
        <meta name="description" content="Farm management and enterprise resource planning system" />
      </head>
      <body className="bg-gray-50">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}