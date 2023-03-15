package animalsquad.server.global.s3.service;

import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FileUploadService {
    // 추가
    private final UploadService s3Service;

    //Multipart를 통해 전송된 파일을 업로드하는 메소드
    public String uploadImage(MultipartFile file, String folderName) {
        String fileName = createFileName(file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());
        try (InputStream inputStream = file.getInputStream()) {
            s3Service.uploadFile(inputStream, objectMetadata, fileName, folderName);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.FILE_UPLOAD_FAIL);
        }
        return s3Service.getFileUrl(fileName, folderName);
    }

    //기존 확장자명을 유지한 채, 유니크한 파일의 이름을 생성하는 로직
    private String createFileName(String originalFileName)  {
        String fileExtension = getFileExtension(originalFileName).toLowerCase();

        String fileName;

        switch (fileExtension) {
            case "png":
            case "jpg":
            case "jpeg":
                fileName = UUID.randomUUID() + "." + fileExtension;
                break;

            default:
                throw new BusinessLogicException(ExceptionCode.INVALID_FILE_TYPE);

        }

        return fileName;
    }

    //파일의 확장자명을 가져오는 로직
    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } catch (StringIndexOutOfBoundsException e) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FILE_TYPE);
        }
    }
    public void deleteFile(String fileName, String folderName)  {
        s3Service.deleteFile(fileName, folderName);
    }
}