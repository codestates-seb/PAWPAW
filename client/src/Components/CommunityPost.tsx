import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import color from '../util/color';
import { Icon } from '@iconify/react';
import sanitizeHtml from 'sanitize-html';
import { PostData } from '../Pages/Community';

const { darkgrey, brown, mediumgrey, bordergrey, ivory } = color;

type PProps = {
  key: number;
  post: PostData;
};

const CommunityPost = ({ post }: PProps) => {
  return (
    <Container>
      <LeftBox>
        <TitleDateDiv>
          <Link to={`/community/${post.id}`}>
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
        <ContentBox
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.content, {
              allowedTags: [],
              allowedAttributes: false,
            }),
          }}
        />
      </LeftBox>

      <RightBox>
        <Link to={`/mypage/${post.petId}`}>
          <NameDiv>{post.petName}</NameDiv>
        </Link>
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
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${bordergrey};
`;

const LeftBox = styled.div`
  flex-grow: 1;
  min-height: 160px;
  padding: 10px;
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
    color: #dfb895;
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
  margin-left: 14px;
`;

const ContentBox = styled.div`
  color: ${darkgrey};
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const RightBox = styled.div`
  padding: 15px 10px;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameDiv = styled.div`
  margin-right: 3px;
  padding: 0px 5px;
  height: 30px;
  color: ${mediumgrey};
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    color: ${darkgrey};
  }
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

export default CommunityPost;
