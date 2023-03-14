import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { Post } from '../Pages/Mypage';
import color from '../util/color';

const { ivory, darkgrey, brown, darkbrown, mediumgrey, bordergrey } = color;

interface MyPagePostProps {
  key: number;
  post: Post;
}

const MypagePost = ({ post }: MyPagePostProps) => {
  return (
    <Container>
      <LeftBox>
        <TitleDateDiv>
          <Link to={`/community/${post.postId}`}>
            <TitleDiv>
              <TitleSpan>{post.title}</TitleSpan>
              {post.commentCnt !== 0 && (
                <CommentSpan>
                  <span className='icon'>
                    <Icon icon='cil:chat-bubble' />
                  </span>
                  <span className='number'>{post.commentCnt}</span>
                </CommentSpan>
              )}
            </TitleDiv>
          </Link>
          <DateDiv>{post.createdAt}</DateDiv>
        </TitleDateDiv>
        <ContentDiv
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.contents, {
              allowedTags: [],
              allowedAttributes: false,
            }),
          }}
        />
      </LeftBox>

      <RightBox>
        <LikeContainer>
          <Icon
            className='icon'
            icon='ph:paw-print-fill'
            color='#FFBF71'
            style={{ fontSize: '15px' }}
          />
          <span>{post.likesCnt}</span>
        </LikeContainer>
      </RightBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid ${bordergrey};
`;

const LeftBox = styled.div`
  flex-grow: 1;
  padding: 10px;
  height: 160px;
`;

const TitleDateDiv = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 8px;
`;

const TitleDiv = styled.div`
  color: ${brown};
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const TitleSpan = styled.span`
  &:hover {
    color: ${darkbrown};
  }
`;

const CommentSpan = styled.span`
  margin-left: 8px;
  font-size: 16px;
  display: flex;

  .number {
    margin-left: 5px;
    font-size: 14px;
  }
`;

const DateDiv = styled.div`
  color: ${mediumgrey};
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ContentDiv = styled.div`
  color: ${darkgrey};
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const RightBox = styled.div`
  padding: 15px 10px;
`;

const LikeContainer = styled.div`
  height: 30px;
  border-radius: 10px;
  background-color: ${ivory};
  padding: 15px 7px;

  display: flex;
  align-items: center;

  .icon {
    margin-right: 5px;
  }

  span {
    font-size: 14px;
  }
`;

export default MypagePost;
