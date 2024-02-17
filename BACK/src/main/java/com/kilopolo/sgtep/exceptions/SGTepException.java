package com.kilopolo.sgtep.exceptions;

public abstract class SGTepException extends RuntimeException{
    public SGTepException() {
        super();
    }

    public SGTepException(String message) {
        super(message);
    }

    public SGTepException(String message, Throwable cause) {
        super(message, cause);
    }

    public SGTepException(Throwable cause) {
        super(cause);
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }

    @Override
    public String getLocalizedMessage() {
        return super.getLocalizedMessage();
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
