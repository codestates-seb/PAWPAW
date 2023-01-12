package animalsquad.server.global.S3.Service;

import animalsquad.server.global.S3.Component.S3Component;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
@RequiredArgsConstructor

public class AwsS3UploadService implements UploadService {

    private final AmazonS3 amazonS3;
    private final S3Component component;

    @Override
    public  void  uploadFile(InputStream inputStream, ObjectMetadata objectMeTadata, String fileName){
        amazonS3.putObject(new PutObjectRequest(component.getBucket() +"/test" ,fileName,inputStream,objectMeTadata).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    @Override
    public  String getFileUrl(String fileName){
        return amazonS3.getUrl(component.getBucket(),fileName).toString();
    }
}
// uploadFile()은 aws-cloud-starter-aws에서 제공하는 AmazonS3를 이용해서 파일을 업로드하고,
//
//아래 getFileUrl()메소드는 업로드한 파일의 URI를 가져오는 메소드이다.
//
//S3Component는 AWS S3를 위한 설정파일이 담긴 클래스 인데, AWS S3 환경변수를 먼저 프로퍼티에 추가한다.