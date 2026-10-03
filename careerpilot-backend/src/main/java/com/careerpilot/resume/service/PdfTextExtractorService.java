package com.careerpilot.resume.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Slf4j
@Service
public class PdfTextExtractorService {

    public String extractTextFromPdf(InputStream inputStream) {
        try (PDDocument document = Loader.loadPDF(inputStream.readAllBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            String extracted = stripper.getText(document);
            return extracted != null ? extracted.trim() : "";
        } catch (Exception e) {
            log.error("Failed to extract text from PDF", e);
            throw new IllegalArgumentException("Could not extract plain text from PDF resume: " + e.getMessage(), e);
        }
    }
}
