import { Metadata } from "next";
import { redirect } from "next/navigation";

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
    //todo: add open graph image
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
    //todo: add twitter image
    images: [],
  },
};

export default function Home() {
  redirect("https://www.alicealexandra.com");
}
