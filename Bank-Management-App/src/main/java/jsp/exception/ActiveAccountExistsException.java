package jsp.exception;

public class ActiveAccountExistsException extends RuntimeException {

    public ActiveAccountExistsException(String message) {
        super(message);
    }
}