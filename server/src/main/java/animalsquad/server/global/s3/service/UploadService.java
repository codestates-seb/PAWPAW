package animalsquad.server.global.s3.service;

import com.amazonaws.services.s3.model.ObjectMetadata;

import java.io.InputStream;

public interface UploadService {
    void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName, String folderName);

    String getFileUrl(String fileName, String folderName);
    void deleteFile(String fileName, String folderName);
}

