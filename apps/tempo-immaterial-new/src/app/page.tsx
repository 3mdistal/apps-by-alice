import { Metadata } from "next";

const title = "Tempo Immaterial";
const description = "The creative portfolio of Alice Alexandra Moore.";
const siteName = title;

export const metadata: Metadata = {
  title: title,
  description: description,
  creator: "Alice Alexandra Moore",
  openGraph: {
    title: title,
    description: description,
    siteName: siteName,
    //todo: Add open graph image
    images: [],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    siteId: "951191181073027073",
    creator: "@tempoimmaterial",
    creatorId: "951191181073027073",
    //todo: Add twitter image
    images: [],
  },
};

export default function Home() {
  return (
    <main className="flex justify-center items-center h-[100dvh]">
      <Header />
      <Mastodon />
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col justify-center items-center">
      <h1>tempo immaterial</h1>
      <p>work by alice alexandra moore</p>
    </header>
  );
}

function Mastodon() {
  return (
    <div className="hidden">
      <a rel="me" href="https://hachyderm.io/@tempoimmaterial">
        Mastodon
      </a>
    </div>
  );
}
