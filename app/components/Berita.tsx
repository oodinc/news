"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Berita = () => {
  interface NewsItem {
    id: string;
    title: string;
    publishedAt: string;
    image?: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsResponse = await fetch("/api/news");
      const newsData = await newsResponse.json();

      setNews(newsData);
    };

    fetchData();
  }, []);

  const truncateText = (text: string, length: number) => {
    if (text.length > length) return text.substring(0, length) + "...";
    return text;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <section id="berita" className="py-24">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
            Berita Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="w-full h-56 bg-gray-200">
                  {item.image && (
                    <Image
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `/${item.image}`
                      }
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {truncateText(item.title, 80)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-auto text-right">
                    <Link
                      href={``}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Selengkapnya →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Berita;
