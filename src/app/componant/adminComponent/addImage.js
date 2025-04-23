"use client";
import { useState } from "react";

const AddImage = () => {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL ;


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // عرض معاينة للصورة
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage("يرجى اختيار صورة أولاً");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`${ApiUrl}/addNewImage`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ تم رفع الصورة بنجاح");
        setImage(null);
        setPreview("");
      } else {
        setMessage("❌ فشل رفع الصورة");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("❌ حدث خطأ أثناء رفع الصورة");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-[#433] shadow rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">رفع صورة جديدة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          {loading ? "جاري الرفع..." : "رفع الصورة"}
        </button>
        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AddImage;