"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const DetailBerita = ({ params }: { params: { id: string } }) => {
  const [newsDetail, setNewsDetail] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) throw new Error("Gagal memuat berita");
        const data = await res.json();
        setNewsDetail(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchNewsDetail();
  }, [params.id]);

  if (error) return <div>Error: {error}</div>;
  if (!newsDetail) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {newsDetail.title}
        </h1>
        <p className="text-gray-500 mb-4">
          {new Date(newsDetail.publishedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="w-full h-72 bg-gray-200 mb-6">
          {newsDetail.image && (
            <img
              src={newsDetail.image}
              alt={newsDetail.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div
          className="text-lg text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: newsDetail.description }}
        />
      </div>
    </div>
  );
};

export default DetailBerita;
