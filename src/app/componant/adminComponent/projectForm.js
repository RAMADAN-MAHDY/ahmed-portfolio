"use client";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ImagePlus } from "lucide-react";


const ProjectForm = () => {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL ;


  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    date: "",
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("العنوان مطلوب")
      .max(100, "العنوان طويل جدًا"),
    description: Yup.string()
      .required("الوصف مطلوب")
      .max(500, "الوصف طويل جدًا"),
    date: Yup.string().required("التاريخ مطلوب"),
    image: Yup.mixed()
      .required("الصورة مطلوبة")
      .test("fileSize", "حجم الصورة أكبر من 5MB", (value) => {
        return value && value.size <= 5 * 1024 * 1024;
      })
      .test("fileFormat", "الملف غير مدعوم", (value) => {
        return value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", values.date);
    formData.append("image", values.image);
    console.log("formData:", formData);

    try {
      console.log("formData:2", formData);

      const response = await fetch(`${ApiUrl}/add-project`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Success:", data);
      resetForm();
      setImagePreview(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white dark:bg-[#24292485] rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">إضافة مشروع جديد</h2>
        <h3 className="text-sm text-[#ff0000] mb-4"> (تنبيه \ قم باضافة ثلاث مشاريع كحد ادني ليتم عرضهم )</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">العنوان</label>
              <Field
                name="title"
                type="text"
                placeholder="مثال: مشروع تصميم شعار"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-1">الوصف</label>
              <Field
                name="description"
                as="textarea"
                rows="3"
                placeholder="مثال: تصميم شعار احترافي لشركة تقنية"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block mb-1">التاريخ</label>
              <Field
                name="date"
                type="text"
                placeholder="مثال: يناير 2023"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
            <label htmlFor="image" className="flex items-center gap-2 mb-1 ">
  <ImagePlus className="w-5 h-5 text-[#fff]" />
    صورة المشروع
</label>
<input
  className="w-full border px-3 py-2 rounded"
  id="image"
  name="image"
  type="file"
  accept="image/*"
  onChange={(event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }}
/>

              <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">معاينة:</p>
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded" />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSubmitting ? "جاري الرفع..." : "إضافة مشروع"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;
