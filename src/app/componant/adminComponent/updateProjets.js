'use client';
import { useState, useEffect } from 'react';

export default function EditProject({data ,projectId }) {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL ;

console.log(projectId)
// console.log(data[0].title)
 const filterData = data.filter(pro => pro._id === projectId );

console.log(filterData[0]?.title);


  const [form, setForm] = useState({
    title: filterData[0]?.title,
    description: filterData[0]?.description,
    date: filterData[0]?.date,
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(form[0]);
//   useEffect(() => {
//     // تحميل البيانات الحالية
//     fetch(`/api/getProject/${projectId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const { title, description, date, image } = data.project;
//         setForm({ title, description, date, image: null });
//         setPreview(image);
//       });
//   }, [projectId]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      const original = filterData[0]; // البيانات الأصلية من قاعدة البيانات
  
      if (form.title !== original.title) {
        formData.append('title', form.title);
      }
      if (form.description !== original.description) {
        formData.append('description', form.description);
      }
      if (form.date !== original.date) {
        formData.append('date', form.date);
      }
      if (form.image) {
        formData.append('image', form.image); // بس لو المستخدم اختار صورة جديدة
      }
  
      if ([...formData.keys()].length === 0) {
        alert('⚠️ لم يتم تعديل أي بيانات!');
        setLoading(false);
        return;
      }
  
      const res = await fetch(`${ApiUrl}/updateProject/${projectId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (res.ok) {
        alert('✅ تم التحديث بنجاح');
      } else {
        const errData = await res.json();
        alert('❌ فشل التحديث: ' + errData.message);
      }
    } catch (error) {
      alert('❌ حصل خطأ أثناء التحديث');
      console.error(error);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 dark:bg-[#243] bg-[#f3cff3]  shadow rounded-2xl mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center dark:bg-[#203a20] bg-[#dfcebe] p-2 rounded-2xl">تعديل المشروع</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="العنوان"
          className="w-full p-2 border rounded-xl"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="الوصف"
          className="w-full p-2 border rounded-xl"
        />
        <input
          name="date"
          type="string"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl"
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl"
        >
          {loading ? 'جاري التحديث...' : 'تحديث المشروع'}
        </button>
      </form>
    </div>
  );
}
