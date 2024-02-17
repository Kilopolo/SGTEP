package com.kilopolo.sgtep.exceptions;

import com.kilopolo.sgtep.exceptions.SGTepException;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class HttpException extends SGTepException {

    int httpStatusCode;

    public HttpException(int httpStatusCode, String message) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }

    public HttpException(int httpStatusCode, String message, Throwable cause) {
        super(message, cause);
        this.httpStatusCode = httpStatusCode;
    }

    public int getHttpStatusCode() {
        return httpStatusCode;
    }

    public void sendErrorResponse(HttpServletResponse response) throws IOException {
        response.setStatus(httpStatusCode);
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        out.print(getMessage());
        out.flush();
    }

}
