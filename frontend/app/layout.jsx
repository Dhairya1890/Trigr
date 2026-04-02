import "./globals.css";

export const metadata = {
  title: "Trigr",
  description: "Parametric income insurance platform scaffold"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

