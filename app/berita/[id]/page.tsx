"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";

const DetailBerita = ({ params }: { params: { id: string } }) => {
  interface NewsDetail {
    title: string;
    publishedAt: string;
    image?: string;
    description: string;
  }

  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) throw new Error("Gagal memuat berita");
        const data = await res.json();
        setNewsDetail(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchNewsDetail();
  }, [params.id]);

  if (error) return <div>Error: {error}</div>;
  if (!newsDetail) return <div>Loading...</div>;

  const publishedDate = new Date(newsDetail.publishedAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Title Section */}
          <div className="text-gray-800 p-4">
            <h1 className="text-3xl font-bold">{newsDetail.title}</h1>
          </div>

          {/* Image Section */}
          <div className="relative overflow-hidden">
            <Image
              src={
                newsDetail.image && newsDetail.image.startsWith("http")
                  ? newsDetail.image
                  : `/${newsDetail.image}`
              }
              alt={newsDetail.title}
              width={80}
              height={80}
              className="object-cover w-full h-[500px] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <AiOutlineCalendar className="text-blue-500" />
                <span>{publishedDate}</span>
              </div>
            </div>

            <div
              className="text-lg text-gray-800 leading-relaxed quill-description"
              dangerouslySetInnerHTML={{ __html: newsDetail.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBerita;
