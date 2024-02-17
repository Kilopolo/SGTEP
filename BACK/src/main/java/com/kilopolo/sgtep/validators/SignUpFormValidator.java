package com.kilopolo.sgtep.validators;

import com.kilopolo.sgtep.model.User;
import com.kilopolo.sgtep.service.impl.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;



@Component
public class SignUpFormValidator implements Validator {
	@Autowired
	private UsersServiceImpl usersServiceImpl;

	@Override
	public boolean supports(Class<?> aClass) {
		return User.class.equals(aClass);
	}

	@Override
	public void validate(Object target, Errors errors) {
		User user = (User) target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "Error.empty");

		if (usersServiceImpl.getUserByEmail(user.getEmail()) != null) {
			errors.rejectValue("email", "Error.signup.email.duplicate");
		}
		if (user.getPassword().length() < 1 || user.getPassword().length() > 240){
			errors.rejectValue("password", "Error.signup.password.length");
		}
		if (user.getPasswordConfirm() != null)
			if (!user.getPasswordConfirm().equals(user.getPassword())) {
				errors.rejectValue("passwordConfirm", "Error.signup.passwordConfirm.coincidence");
			}

	}
}