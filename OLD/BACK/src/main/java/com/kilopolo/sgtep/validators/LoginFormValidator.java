package com.kilopolo.sgtep.validators;

import com.kilopolo.sgtep.model.User;
import com.kilopolo.sgtep.service.impl.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;


@Component
public class LoginFormValidator implements Validator {

	@Autowired
	private UsersServiceImpl usersServiceImpl;

	@Override
	public boolean supports(Class<?> aClass) {
		return User.class.equals(aClass);
	}

	@SuppressWarnings("unused")
	@Override
	public void validate(Object target, Errors errors) {
		User user = (User) target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "Error.empty");

		User jpaUser = usersServiceImpl.getUserByEmail(user.getEmail());
		System.out.println(jpaUser.getPassword());
		if (jpaUser != null) {
			if (!jpaUser.getPassword().equals(user.getPassword())) {

				errors.rejectValue("email", "Error.login.email.wrongPassword");
			}
		} else {
			errors.rejectValue("email", "Error.login.email.notRegistered");
		}

	}
}
