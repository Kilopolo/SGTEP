package com.kilopolo.sgtep.controller;

import java.util.ArrayList;
import java.util.List;

import com.kilopolo.sgtep.model.User;
import com.kilopolo.sgtep.security.RolesService;
import com.kilopolo.sgtep.security.SecurityService;
import com.kilopolo.sgtep.service.UserService;
import com.kilopolo.sgtep.service.impl.UsersServiceImpl;
import com.kilopolo.sgtep.validators.SignUpFormValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



import jakarta.servlet.http.HttpSession;

@Controller
public class UsersController {

	@Autowired
	private UsersServiceImpl usersServiceImpl;

	@Autowired
	private SecurityService securityService;

	@Autowired
	private SignUpFormValidator signUpFormValidator;

	@Autowired
	private RolesService rolesService;

	@Autowired
	private HttpSession httpSession;

	@Autowired
	UserService userservice;
	
	// GESTION DE LOGIN/REGISTRO

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String signup(@ModelAttribute @Validated User user, BindingResult result) {

		// TODO validar datos
		signUpFormValidator.validate(user, result);
		if (result.hasErrors()) {
			return "signup";
		}
		// Asigno rol usuario
		user.setRole(rolesService.getRoles()[0]);
		usersServiceImpl.addUser(user);
		securityService.autoLogin(user.getEmail(), user.getPasswordConfirm());
		return "redirect:/login";
	}

	@RequestMapping(value = "/signup", method = RequestMethod.GET)
	public String signup(Model model) {
		model.addAttribute("user", new User());
		User activeUser = getActiveUser();
		httpSession.setAttribute("activeUser", activeUser);
		return "signup";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Model model) {
		return "login";
	}

	@RequestMapping(value = { "/home" }, method = RequestMethod.GET)
	public String home(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String email = auth.getName();
		User activeUser = usersServiceImpl.getUserByEmail(email);
		httpSession.setAttribute("activeUser", activeUser);

		return "home";
	}

	// GESTION DE USUARIOS

//	@RequestMapping(value = "/user/home")
//	public String getUserHome(Model model) {
//		model.addAttribute("rolesList", rolesService.getRoles());
//		User activeUser = getActiveUser();
//		model.addAttribute("user", activeUser);
//		return "user/home";
//	}

	private User getActiveUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String email = auth.getName();
		User activeUser = usersServiceImpl.getUserByEmail(email);
		return activeUser;
	}
	

	// USER
	// LECTORES
	@GetMapping("/perfil")
	public String mostrarLectores(Model modelo) {
		User activeUser = getActiveUser();
		modelo.addAttribute("user", activeUser);
		return "lector/perfil";
	}
	@GetMapping("/updateperfil/{id}")
	public String updateLector(Model modelo, @PathVariable("id") long id) {
		User user = userservice.getById(id);
		modelo.addAttribute("user", user);
		return "lector/updatePerfil";
	}

}