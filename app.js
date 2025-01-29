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
            const htmlContent = quill.root.innerHTML;

            // بارگذاری فونت فارسی
            fetch("assets/font/base-font.txt")
                .then((response) => response.text())
                .then((data) => {
                    const vazirFont = data.trim();

                    const doc = new window.jspdf.jsPDF({
                        orientation: "portrait",
                        unit: "mm",
                        format: "a4",
                        putOnlyUsedFonts: true,
                        compress: true,
                    });

                    // اضافه کردن فونت فارسی به jsPDF
                    doc.addFileToVFS("Vazir.ttf", vazirFont);
                    doc.addFont("Vazir.ttf", "Vazir", "normal");
                    doc.setFont("Vazir");

                    // استفاده از html2canvas برای رندر کردن محتوای Quill به تصویر
                    html2canvas(quill.root, {
                        useCORS: true, // اجازه دسترسی به منابع خارجی
                        scale: 2, // افزایش کیفیت رندر
                    }).then(function (canvas) {
                        const imgData = canvas.toDataURL("image/png");
                        doc.addImage(imgData, "PNG", 10, 20, 180, 160);
                        doc.save("output.pdf");
                    });
                })
                .catch((error) => console.error("خطا در بارگذاری فونت:", error));
        });
    } else {
        console.error("دکمه 'generate-pdf' پیدا نشد!");
    }
});
