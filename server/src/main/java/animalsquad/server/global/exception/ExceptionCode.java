package animalsquad.server.global.exception;


import lombok.Getter;

public enum ExceptionCode {

    PET_EXISTS(409, "Pet exists"),
    PET_ROLE_EXISTS(409, "Pet role exists"),
    PET_NOT_FOUND(404, "Pet not found"),
    INVALID_TOKEN(400, "Invalid token"),
    REFRESH_TOKEN_NOT_FOUND(404, "Refresh token not found"),
    INVALID_REFRESH_TOKEN(400, "Invalid refresh token"),

    FILE_UPLOAD_FAIL(500, "file upload fail"),

    ADDRESS_NOT_FOUND(404, "Address not found"),
    FILTER_NAME_INCORRECT(400, "Filter name incorrect"),

    TOKEN_AND_ID_NOT_MATCH(403, "Token and id not match"),
    NOT_HAVE_PERMISSION_TO_EDIT(403, "Not have permission to edit"),
    ADMIN_CODE_NOT_MATCH(403, "Admin Code not match"),

    INFO_MAP_NOT_FOUND(404, "Info map not found"),
    INFO_MAP_COMMENT_NOT_FOUND(404, "Info map comment not found"),

    EXISTS_MY_PLACE(409, "My place exists"),
    MY_PLACE_NOT_FOUND(404, "My place not found"),
    POST_NOT_FOUND(404, "Post not found"),

    POST_COMMENT_NOT_FOUND(404, "Post comment not found"),

    LIKES_NOT_FOUND(404, "Likes not found"),

    ALREADY_LIKED(400,"Already Liked"),

    INVALID_FILE_TYPE(400, "Invalid file type"),

    SEARCH_TYPE_REQUIRES_CONTENT(400, "Search type requires content"),

    INVALID_SORT_TYPE(400, "Invalid sort type");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
