document.addEventListener("DOMContentLoaded", function () {
    const quill = new Quill("#editor-container", {
        theme: "snow",
        placeholder: "متن خود را وارد کنید...",
        modules: {
            toolbar: [
                ["bold", "italic", "underline"], 
                [{ list: "ordered" }, { list: "bullet" }], 
                [{ direction: "rtl" }], 
                ["clean"],
            ],
        },
    });

    const button = document.getElementById("generate-pdf");

    if (button) {
        button.addEventListener("click", () => {
            const plainText = quill.getText(); // دریافت متن ساده
            const htmlContent = quill.root.innerHTML; // دریافت محتوای HTML

            fetch("assets/font/base-font.txt")
                .then((response) => response.text())
                .then((data) => {
                    const vazirFont = data.trim(); // داده‌های Base64 فونت

                    const doc = new window.jspdf.jsPDF({
                        orientation: "portrait",
                        unit: "mm",
                        format: "a4",
                    });

                    // اضافه کردن فونت
                    doc.addFileToVFS("Vazir.ttf", vazirFont);
                    doc.addFont("Vazir.ttf", "Vazir", "normal");
                    doc.setFont("Vazir");

                    // استفاده از `doc.text` برای متن ساده
                    doc.text(plainText, 190, 20, {
                        align: "right", // جهت راست به چپ
                        maxWidth: 180,
                    });

                    // ذخیره فایل PDF
                    doc.save("output.pdf");
                })
                .catch((error) => console.error("خطا در بارگذاری فونت:", error));
        });
    } else {
        console.error("دکمه 'generate-pdf' پیدا نشد!");
    }
});
