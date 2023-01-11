package animalsquad.server.global.exception;


import lombok.Getter;

public enum ExceptionCode {

    PET_EXISTS(409, "Pet exists"),
    PET_NOT_FOUND(404,"Pet not found"),
    INVALID_TOKEN(400, "Invalid token"),
    REFRESH_TOKEN_NOT_FOUND(400, "Refresh token not found"),
    INVALID_REFRESH_TOKEN(400,"Invalid refresh token"),

    ADDRESS_NOT_FOUND(400, "Address not found"),
    FILTER_NAME_INCORRECT(400, "Filter name incorrect"),

    TOKEN_AND_ID_NOT_MATCH(403, "Token and id not match"),
    NOT_HAVE_PERMISSION_TO_EDIT(403, "Not have permission to edit"),

    INFO_MAP_NOT_FOUND(404, "Info map not found"),
    INFO_MAP_COMMENT_NOT_FOUND(404,"Info map comment not found"),

    EXISTS_MY_PLACE(409, "My place exists");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
