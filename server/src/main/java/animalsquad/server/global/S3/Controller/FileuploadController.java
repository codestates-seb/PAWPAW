package animalsquad.server.global.S3.Controller;

import animalsquad.server.global.S3.Service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;




@RequiredArgsConstructor
@RestController
public class FileuploadController {
    private final FileUploadService fileUploadService;

    @PostMapping("/api/v1/upload")
    public String uploadImage(@RequestParam (value ="file", required=false) MultipartFile file) throws IllegalAccessException {
        return fileUploadService.uploadImage(file);
    }
}
