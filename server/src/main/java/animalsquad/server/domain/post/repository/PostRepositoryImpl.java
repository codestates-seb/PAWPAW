package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.dto.PostSearchDto;
import animalsquad.server.domain.post.entity.Post;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static animalsquad.server.domain.pet.entity.QPet.pet;
import static animalsquad.server.domain.post.entity.QPost.post;

public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public PostRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    /**
     * 게시글 검색
     * 게시글 지역코드별로
     * type = 제목, 내용, 작성자
     */


    //최신 순
    @Override
    public Page<Post> getPostsSortByNewest(PostSearchDto postSearchDto, Pageable pageable) {

        List<Post> results = queryFactory
                .select(post)
                .from(post)
                .join(post.pet, pet)
                .where(codeEq(postSearchDto.getCode()), typeEq(postSearchDto))
                .orderBy(post.id.desc())
                .fetch();


        return null;
    }

    //좋아요 많은 순
    @Override
    public Page<Post> getPostsSortByLikes(PostSearchDto postSearchDto, Pageable pageable) {

        List<Post> results = queryFactory
                .select(post)
                .from(post)
                .join(post.pet, pet)
                .where(codeEq(postSearchDto.getCode()), typeEq(postSearchDto))
                .orderBy(post.likesCnt.desc())
                .fetch();

        return null;
    }


    private BooleanExpression codeEq(Integer code) {
        return code == null ? null : post.code.eq(code);
    }

    private BooleanExpression typeEq(PostSearchDto postSearchDto) {
        String searchType = postSearchDto.getSearchType();

        return StringUtils.hasText(searchType) ? createSearchCondition(searchType, postSearchDto.getSearchContent()) : null;
    }

    private BooleanExpression createSearchCondition(String searchType, String content) {


        switch (searchType) {
            case "title":
                return titleEq(content);
            case "content":
                return contentEq(content);
            case "author":
                return authorEq(content);
            default:
                return null;
        }
    }

    private BooleanExpression titleEq(String title) {
        return post.title.eq(title);
    }

    private BooleanExpression contentEq(String content) {
        return post.contents.eq(content);
    }

    private BooleanExpression authorEq(String author) {
        return pet.petName.eq(author);
    }


}
