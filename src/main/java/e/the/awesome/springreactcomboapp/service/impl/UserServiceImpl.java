package e.the.awesome.springreactcomboapp.service.impl;

import e.the.awesome.springreactcomboapp.dao.UserAddressRepository;
import e.the.awesome.springreactcomboapp.dao.UserRepository;
import e.the.awesome.springreactcomboapp.model.User;
import e.the.awesome.springreactcomboapp.model.UserAddress;
import e.the.awesome.springreactcomboapp.model.UserDto;
import e.the.awesome.springreactcomboapp.service.UserService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {
	
	private final UserRepository userRepository;

	private final UserAddressRepository userAddressRepository;

	private final BCryptPasswordEncoder bcryptEncoder;

	public UserServiceImpl(UserRepository userRepository,
						   UserAddressRepository userAddressRepository,
						   BCryptPasswordEncoder bcryptEncoder) {
		this.userRepository = userRepository;
		this.userAddressRepository = userAddressRepository;
		this.bcryptEncoder = bcryptEncoder;
	}

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null){
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
	}

	private List<SimpleGrantedAuthority> getAuthority() {
		return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}

	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		userRepository.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(int id) {
		userRepository.deleteById(id);
	}

	@Override
	public User findOne(String userName) {
		Optional<User> user = Optional.ofNullable(userRepository.findByUsername(userName));
		return user.isPresent() ? user.get() : null;
	}

	@Override
	public User findByEmail(String email) {
		return null;
	}

	@Override
	public User findById(int id) {
		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

    @Override
    public UserDto update(UserDto userDto) {
        User user = findById(userDto.getId());
        if(user != null) {
            BeanUtils.copyProperties(userDto, user, "password", "username");
            userRepository.save(user);
        }
        return userDto;
    }

    @Override
    public User save(UserDto user) {
	    User newUser = new User();
	    Optional<UserAddress> optionalAddress = userAddressRepository.findById(user.getUserAddressId());

	    newUser.setUsername(user.getUsername());
	    newUser.setFirstName(user.getFirstName());
	    newUser.setLastName(user.getLastName());
	    newUser.setEmail(user.getEmail());
	    newUser.setPhoneNumber(user.getPhoneNumber());
	    newUser.setPassword(user.getPassword() == null ? null : bcryptEncoder.encode(user.getPassword()));
	    newUser.setAddress(optionalAddress.isPresent() ? optionalAddress.get() : null);

	    return userRepository.save(newUser);
    }
}
