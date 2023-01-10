package animalsquad.server.global.exception;


import lombok.Getter;

public enum ExceptionCode {

    PET_EXISTS(409, "Pet exists"),
    PET_NOT_FOUND(404,"Pet not found"),
    INVALID_TOKEN(400, "Invalid token"),
    REFRESH_TOKEN_NOT_FOUND(400, "Refresh token not found"),
    INVALID_REFRESH_TOKEN(400,"Invalid refresh token"),
    FILTER_NAME_INCORRECT(400, "Filter name incorrect");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
