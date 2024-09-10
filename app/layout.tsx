import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Better Blog",
  description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur nobis nam voluptate dolore ipsa ea illo quisquam harum. Autem possimus hic quam cum maxime voluptate, veniam aut? Animi, ullam delectus!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}