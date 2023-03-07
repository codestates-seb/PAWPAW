package animalsquad.server.domain.post.repository;

import animalsquad.server.domain.post.dto.PostSearchDto;
import animalsquad.server.domain.post.entity.Post;
import animalsquad.server.global.exception.BusinessLogicException;
import animalsquad.server.global.exception.ExceptionCode;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static animalsquad.server.domain.pet.entity.QPet.pet;
import static animalsquad.server.domain.post.entity.QPost.post;
import static animalsquad.server.domain.post.entity.QPostComment.postComment;

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
    @Override
    public Page<Post> getPosts(PostSearchDto postSearchDto, Pageable pageable, String sort) {
        List<Post> results = queryFactory
                .select(post)
                .from(post)
                .leftJoin(post.pet, pet).fetchJoin()
                .leftJoin(post.postComments, postComment)
                .where(codeEq(postSearchDto.getCode()), typeEq(postSearchDto))
                .orderBy(getOrderSpecifier(sort).stream().toArray(OrderSpecifier[]::new))
                .groupBy(post.id)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .select(post.count())
                .from(post)
                .where(codeEq(postSearchDto.getCode()), typeEq(postSearchDto))
                .fetchOne();

        return new PageImpl<>(results, pageable, total);
    }


    private BooleanBuilder codeEq(List<Integer> codes) {
        if(codes == null) {
            return null;
        }
        BooleanBuilder builder = new BooleanBuilder();

        for (Integer code : codes) {
            builder.or(post.code.eq(code));
        }

        return builder;
    }

    private BooleanExpression typeEq(PostSearchDto postSearchDto) {
        String searchType = postSearchDto.getSearchType();

        return StringUtils.hasText(searchType) ? createSearchCondition(searchType, postSearchDto.getSearchContent()) : null;
    }

    private BooleanExpression createSearchCondition(String searchType, String content) {

        if (!StringUtils.hasText(content)) {
            throw new BusinessLogicException(ExceptionCode.SEARCH_TYPE_REQUIRES_CONTENT);
        }

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
        return post.title.contains(title);
    }

    private BooleanExpression contentEq(String content) {
        return post.contents.contains(content);
    }

    private BooleanExpression authorEq(String author) {
        return pet.petName.contains(author);
    }

    private List<OrderSpecifier> getOrderSpecifier(String sort) {

        List<OrderSpecifier> orders = new ArrayList<>();

        if (StringUtils.hasText(sort)) {
            Order direction = Order.DESC;

            switch (sort) {
                case "likes":
                    orders.add(new OrderSpecifier(direction, post.likesCnt));
                    orders.add(new OrderSpecifier(direction, post.id));
                    break;
                case "comments":
                    orders.add(new OrderSpecifier(direction, postComment.id.count()));
                    orders.add(new OrderSpecifier(direction, post.id));
                    break;
                case "newest":
                    orders.add(new OrderSpecifier(direction, post.id));
                    break;
                default:
                    throw new BusinessLogicException(ExceptionCode.INVALID_SORT_TYPE);
            }
        }
        return orders;
    }

}
