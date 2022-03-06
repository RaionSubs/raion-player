import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            "error": {
                "404": "Page not found.",
                "goBack": "Go back"
            },
            "index": {
                "fileMissing": "There are no files to upload.",
                "cancelled": "File selection cancelled.",
                "upload": "Upload",
                "cancel": "Cancel",
                "invalidFileFormat": "Only '.mp4' formats are supported. invalid video format.",
                "largerVideo": "Video can't be larger than 1GB.",
                "startUpload": "Start upload",
                "completedVideo": "Video uploaded successfully.",
                "missingQuery": "Missing videoId.",
                "notFoundVideo": "Video not found."
            }
        
        }
    },
    tr: {
        translation: {
            "error": {
                "404": "Sayfa bulunamadı.",
                "goBack": "Geri dön"
            },
            "index": {
                "fileMissing": "Yüklenecek herhangi bir dosya yok.",
                "cancelled": "Dosya seçimi iptal edildi.",
                "upload": "Yükle",
                "cancel": "İptal et",
                "invalidFileFormat": "Sadece '.mp4' formatları destekleniyor. geçersiz video formatı.",
                "largerVideo": "Video 1GB'dan büyük olamaz.",
                "startUpload": "Yüklemeyi başlat",
                "completedVideo": "Video başarıyla yüklendi.",
                "missingQuery": "Eksik videoId.",
                "notFoundVideo": "Video bulunamadı."
            }
         
        }
    }
};


i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        react: {
            useSuspense: true
        },
        interpolation: { escapeValue: false },
        supportedLngs: ["tr", "en"],
        lng: localStorage.getItem("language") || "en"
    });


export default i18next;