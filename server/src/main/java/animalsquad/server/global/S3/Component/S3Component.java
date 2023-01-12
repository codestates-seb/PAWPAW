package animalsquad.server.global.S3.Component;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// S3Component에서 @ConfigurationProperties를 통해 프로퍼티의 값을 불러온다.
@Getter
@Setter
@ConfigurationProperties(prefix= "cloud.aws.s3")
@Component
public class S3Component {

    private String bucket;

}
