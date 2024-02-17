package com.kilopolo.sgtep.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import com.capgemini.bibliotecaSpring.service.security.UserDetailsServiceImpl;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired
	UserDetailsService userDetailsServiceImpl;

	/**
	 * Configura el encriptador de contraseñas a utilizar en la aplicación.
	 * 
	 * @return el encriptador de contraseñas BCryptPasswordEncoder.
	 */
	@Bean
	public PasswordEncoder encoder() {
		PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		return encoder;
	}

	/**
	 * Configura el AuthenticationManager a utilizar en la autenticación.
	 * 
	 * @param auth la configuración de autenticación.
	 * @return el AuthenticationManager configurado.
	 * @throws Exception si ocurre algún error al obtener el AuthenticationManager.
	 */
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
		return auth.getAuthenticationManager();
	}

	/**
	 * Configura las reglas de autorización para las rutas de la aplicación.
	 * 
	 * @param http el objeto HttpSecurity a configurar.
	 * @return el SecurityFilterChain configurado.
	 * @throws Exception si ocurre algún error al configurar las reglas de
	 *                   autorización.
	 */

	@SuppressWarnings("removal")
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().requestMatchers("/admin/**").hasRole("ADMIN")
				.requestMatchers("/user/**").hasRole("USER")
//		.requestMatchers("/**").hasRole("USER")
//		.requestMatchers("/**/**").hasRole("USER")
				.requestMatchers("/anonymous*").anonymous().requestMatchers("/login*").permitAll();
		http.authorizeRequests(auth -> auth
				.requestMatchers("/css/**", "/img/**", "/script/**", "/login/**", "/failure-login/**").permitAll())
				.formLogin(
						(form) -> form.loginPage("/login").loginProcessingUrl("/login").defaultSuccessUrl("/home", true)
								// ... other configuration
								.permitAll());

//                .requestMatchers("/user/list").hasAuthority("ADMIN")
//                .requestMatchers("/autor/**").hasAuthority("ADMIN")
//                .requestMatchers("/libro/add/*").hasAuthority("ADMIN")
//                .requestMatchers("/report/download/*").hasAuthority("ADMIN").requestMatchers("/report/downloadBetweenDates")
//                .hasAuthority("ADMIN").requestMatchers("/tutor/downloadActiveTutors").hasAuthority("ADMIN")
//                .requestMatchers("/tutor/details/*").hasAnyAuthority("ADMIN")
//
//                .requestMatchers("/student/details/*").hasAnyAuthority("ADMIN", "TUTOR").requestMatchers("/report/details/*")
//                .hasAnyAuthority("ADMIN", "TUTOR")
//
//                .requestMatchers("/tutorial/details/*").hasAuthority("ESTUDIANTE")
//
//                .requestMatchers("/system/**").hasAuthority("ADMIN").requestMatchers("/user/**").hasAuthority("ADMIN")
//                .requestMatchers("/tutorialGroups/**").hasAuthority("ADMIN").requestMatchers("/admin/**").hasAuthority("ADMIN")
//                .requestMatchers("/tutor/**").hasAuthority("TUTOR").requestMatchers("/tutorial/**").hasAuthority("TUTOR")
//                .requestMatchers("/report/**").hasAuthority("TUTOR").requestMatchers("/student/**").hasAuthority("ESTUDIANTE")
//
//                .requestMatchers("/changePasswordUserInSession").authenticated()

//                .anyRequest().authenticated()).formLogin(login -> login.loginPage("/login").permitAll()
//                .defaultSuccessUrl("/home").failureUrl("/failure-login")).logout(logout -> logout.logoutSuccessUrl("/login")
//                .permitAll());

		return http.build();
	}

	/**
	 * Configura el objeto WebMvcConfigurer para permitir todas las peticiones CORS.
	 * 
	 * @return el WebMvcConfigurer configurado.
	 */
	@Bean
	WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("*");
			}
		};
	}

//	@Bean
//	public InMemoryUserDetailsManager userDetailsService() {
//		UserDetails user1 = User.withUsername("david").password(encoder().encode("1234")).roles("USER")
//				.build();
//
//		UserDetails admin = User.withUsername("admindavid").password(encoder().encode("1234")).roles("ADMIN")
//				.build();
//		return new InMemoryUserDetailsManager(user1, admin);
//	}

	/*
	 * @Bean public InMemoryUserDetailsManager userDetailsService() { UserDetails
	 * user1 =
	 * User.withUsername("david").password(encoder().encode("1234")).roles("USER")
	 * .build();
	 * 
	 * UserDetails admin =
	 * User.withUsername("admindavid").password(encoder().encode("1234")).roles(
	 * "ADMIN") .build(); return new InMemoryUserDetailsManager(user1, admin); }
	 */
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

		authProvider.setUserDetailsService(userDetailsServiceImpl);
		authProvider.setPasswordEncoder(encoder());

		return authProvider;
	}

}